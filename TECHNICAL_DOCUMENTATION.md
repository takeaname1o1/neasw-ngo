# NorthEast Association for Social Welfare — Technical documentation

This document describes the implemented application. See [README.md](README.md)
for installation, environment variables, and hosting settings, and the
[Excel export guide](docs/EXCEL_EXPORT_GUIDE.md) for the admin download workflow.

## Architecture

The frontend is a React 19 / TypeScript 6 application built with Vite 8. The
Python backend uses FastAPI, Pydantic v2, SQLAlchemy 2, and Psycopg 3. Production
submissions are stored in Neon PostgreSQL; local development can use SQLite.
Email uses Brevo's HTTPS API by default. Excel generation uses openpyxl and lxml.

Public API requests use `frontend/src/services/api.ts`: an explicit
`VITE_API_BASE_URL`, the local `/api` proxy, or the configured Render backend.
That client can retry against the Render backend on a network error or 404.
Admin requests use the separate `services/admin.ts` client and always stay on
same-origin `/api/admin`, with cookies and the admin request header. They never
use the public client's cross-host fallback.

Locally, Vite proxies `/api` to port 8000. The committed Vercel configurations
proxy `/api/:path*` to the Render backend and serve `index.html` for other paths.
The same-origin proxy is required for the admin cookie and Excel download even
when public API calls use an absolute backend URL.

## Source map

| File | Responsibility |
| --- | --- |
| `backend/app/main.py` | App lifecycle, routers, CORS, private response headers |
| `backend/app/api/endpoints.py` | Public content and submission endpoints |
| `backend/app/api/admin.py` | Admin login, sessions, logout, listing and export |
| `backend/app/core/config.py` | Validated environment settings and credential loading |
| `backend/app/core/database.py` | Engines, sessions, startup schema recovery |
| `backend/app/core/admin_security.py` | Bounded process-local sessions and login attempts |
| `backend/app/core/admin_logging.py` | Removes admin query strings from Uvicorn access logs |
| `backend/app/core/site_content.py` | Loads version-controlled public content |
| `backend/app/data/site_content.json` | Leadership directory and volunteer plans |
| `backend/app/models/db_models.py` | The submissions ORM model |
| `backend/app/models/schemas.py` | Public API payload validation and receipt classification |
| `backend/app/services/email_service.py` | Brevo HTTPS and optional legacy SMTP delivery |
| `backend/app/services/submission_queries.py` | Shared list/export filtering and ordering |
| `backend/app/services/export_service.py` | XLSX generation, limits, and temporary-file lifecycle |
| `frontend/src/App.tsx` | Public view selection and admin path detection |
| `frontend/src/pages/Admin.tsx` | Admin login, search, dates, pagination and export UI |
| `frontend/src/services/admin.ts` | Private JSON requests and binary download handling |

## Lifecycle and persistence

On startup the backend reaps stale export files, initializes the database, loads
static content, and schedules an optional startup email. `MAIL_ENABLED=False`
disables that email and all submission emails.

`DATABASE_URL` selects the runtime connection. PostgreSQL URLs are normalized to
the Psycopg driver, with TLS required by default, a small connection pool,
connection health checks, and automatic prepared statements disabled for pooler
compatibility. `DATABASE_URL_UNPOOLED`, when present, is used for PostgreSQL
startup schema operations. Without `DATABASE_URL`, SQLite lives at
`backend/neasw.db` using an absolute path resolved from the backend source.

The only application table is **`contact_submissions`**:

| Field | Meaning |
| --- | --- |
| `id` | Integer submission reference |
| `name`, `email`, `phone_number` | Submitted contact details |
| `organization_name` | Optional organisation or selected volunteer plan text |
| `preferred_date` | Optional original date text |
| `message` | Submitted message |
| `created_at` | UTC creation timestamp |

Startup creates this table if missing and restores a missing PostgreSQL `public`
schema. It also drops four retired application tables: `leadership_members`,
`volunteer_plans`, `admin_sessions`, and `admin_login_attempts`. It preserves
existing submissions and unrelated tables. There is no general schema migration
framework; `create_all` does not change existing columns or restore deleted data.

Leadership and volunteer plans come from `site_content.json`, without database
queries. `backend/update_leadership.py` refreshes that file from the frontend
leadership JSON and preserves plans. Commit and deploy content updates.

## Public submission and email flow

| Method | Path | Behaviour |
| --- | --- | --- |
| GET | `/` | API welcome message |
| GET | `/api/about/leadership` | Static leadership records |
| GET | `/api/join/volunteer-plans` | Static 6-, 12-, and 24-month plans |
| GET | `/api/contact/info` | Contact details and partner links |
| POST | `/api/contact/submit` | Validate, save, and queue admin and submitter emails |

`name`, `email`, `phone_number`, and `message` are required. Email is validated
with `EmailStr`. Organisation and preferred date are optional; preferred date is
stored as text. `submission_type` accepts `contact` or `volunteer` and defaults to
`contact`. Legacy volunteer markers are recognised only when that field is
omitted. This classification selects receipt wording but is **not stored as a
database column**.

The endpoint commits the record before scheduling separate background tasks for
the admin notification and the appropriate submitter receipt. Volunteer receipts
acknowledge an application; contact receipts acknowledge an enquiry. Neither
confirms a placement or booking. Admin notifications use the submitter's email
as Reply-To; receipts use the admin email as Reply-To.

With `MAIL_PROVIDER=brevo`, HTTPX sends to Brevo over HTTPS using `BREVO_API_KEY`
and the shared sender settings. The request timeout is 15 seconds, with a
5-second connection timeout. The verified sender defaults to
`notifications@neaswwelfarefoundation.in`. `MAIL_PROVIDER=smtp` selects the
optional FastAPI-Mail implementation on a host that permits SMTP. Brevo errors
do not trigger an SMTP fallback.

Tasks run inside the API process without a durable queue or automatic retry.
Database success does not prove email delivery. Check Render application logs
for queue/acceptance errors and Brevo transactional logs for delivery events.
An enabled deployment startup can also send an admin notification. A form
submission normally uses two email sends, while an Excel export sends none.

## Admin authentication and filtering

Open `/admin/login`, then use `/admin/submissions`. The frontend renders these
paths separately from its public state-based navigation.

| Method | Path | Behaviour |
| --- | --- | --- |
| POST | `/api/admin/login` | Validate credentials and issue an opaque session cookie |
| GET | `/api/admin/session` | Check the current session |
| POST | `/api/admin/logout` | Revoke the session and clear its cookie |
| GET | `/api/admin/submissions` | Read a filtered page of submissions |
| GET | `/api/admin/submissions/export` | Download all matching rows as XLSX within limits |

Set backend-only `ADMIN_USERNAME` and `ADMIN_PASSWORD`. Local legacy `USER` and
`PASSWORD` entries are supported in dotenv files; the operating system's `USER`
is not treated as an admin credential. Missing credentials fail closed.

Password checks use scrypt and constant-time comparisons. Cookies are HttpOnly,
SameSite=Lax, scoped to `/api/admin`, and Secure by default. Sessions expire after
eight hours by default. Only token hashes and credential tags are kept in memory.
Logout, expiry, credential changes, and process restarts invalidate sessions.
Login attempts are limited to five per client and thirty globally per 15 minutes,
including successful attempts. The session store is capped at 128 sessions.

Every admin route requires `X-Admin-Request: 1`; an Origin header, when present,
must match an explicit `CORS_ORIGINS` entry. The default origins are the production
domain, its `www` variant, and `http://localhost` on ports 3000 and 5173. For local
HTTP testing only, set `ADMIN_COOKIE_SECURE=False`. Use the configured localhost
origin; `127.0.0.1` is not in the default origin list.

List and export share `submission_query`:

- `search`: up to 200 characters, trimmed, using case-insensitive SQL `ILIKE`
  patterns across name, email, phone, organisation, and message. `%` and `_`
  retain SQL pattern wildcard behaviour.
- `date_from`, `date_to`: optional ISO `YYYY-MM-DD` dates covering whole UTC days.
  The upper bound is the next day's exclusive midnight. Reversed dates and
  `date_to=9999-12-31` are rejected.
- Ordering: `created_at DESC, id DESC` for stable ties.
- Listing: `page` starts at 1; `page_size` defaults to 20 and is capped at 100.
  Exports ignore pagination.

Private responses set `Cache-Control: no-store`, `Pragma: no-cache`, and
`X-Content-Type-Options: nosniff`. Uvicorn admin access logs omit query strings;
external proxies have separate logging policies.

## Excel export implementation

The **Search** action applies the current search/date fields and resets pagination.
**Export Excel** uses those applied filters, including results on other pages.
The button shows a preparing state and prevents duplicate clicks. Logout or
leaving the admin view aborts the frontend request. HTTP errors are displayed
inline; a 401 returns to sign-in. The client checks the XLSX content type before
creating a temporary Blob URL, triggers the download, and then revokes the URL.

The backend acquires a process-local export slot before generation. PostgreSQL
uses a repeatable-read, read-only transaction; SQLite uses an explicit read
transaction. Count and source-text budget checks use the same snapshot as the
selected rows. The eight columns are streamed in batches of 500. The transaction
is rolled back to end the read before the completed workbook is served.

The write-only workbook has **Submissions** and **Export info** sheets. It uses
literal string cells, text-formatted phone numbers, UTC-labelled datetimes,
frozen headers, autofilter and fixed widths. Values exceeding 32,767 UTF-16 units
are preserved in ordered **Long text** chunks. XML-incompatible characters are
shown as explicit `\uNNNN` escapes. An empty result remains a valid workbook.
No inferred enquiry/volunteer type or admin security state is exported.

Defaults are 25,000 rows, 25 MiB output, and one active export per process.
`EXPORT_MAX_FILE_MB` also limits source text to that value multiplied by
1,048,576 characters, checked before fetching the text. These settings are
validated at startup. Over-limit requests fail with 422 and instructions to
narrow the filters; they never return partial data. Occupied slots return 429
with `Retry-After: 30`.

The completed ZIP and intermediate XML live under a private system temporary
directory, outside static hosting. `ExportResponse` cleans up files and releases
the slot after transfer, including failed sends. Generation failures clean up
before returning an error. Stale directories older than one hour are reaped at
startup or the next export; an advisory lock protects active downloads. The
writer uses openpyxl 3.1 internals to keep XML in the same directory, so its
version is deliberately constrained to `<3.2`. The file-lock implementation uses
POSIX `fcntl`, suitable for the Linux Render runtime and local Linux/macOS.

See the [export guide](docs/EXCEL_EXPORT_GUIDE.md) for usage, limits and errors,
and the [implementation record](docs/EXCEL_EXPORT_PLAN.md) for verification results.

## Development, deployment and verification

Use the [README setup commands](README.md#local-development) to run the backend
on port 8000 and Vite on port 3000. `run.sh` also starts both, but forcibly kills
existing processes on those ports; separate terminals avoid that side effect.

Deploy the Python service with root directory `backend`, build command
`pip install -r requirements.txt`, and start command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port "$PORT" --workers 1
```

Use **one API worker and one service instance**: sessions, login limits, and
export slots are process-local. Keep Neon URLs, admin credentials, and the Brevo
key in backend environment settings. SQLite files on the host are not a durable
replacement for Neon storage. No new Neon services or database tables are
required by the dashboard or export feature.

For Vercel, use root directory `frontend`, build command `npm run build`, and
output directory `dist`. Keep root and frontend `vercel.json` rewrites aligned.
When moving hosts, update the public API base/fallback and the same-origin proxy;
changing `VITE_API_BASE_URL` alone does not move admin requests.

From the repository root:

```bash
npm ci --prefix frontend
npm run build
npm run lint
cd backend
.venv/bin/python -m pip install -r requirements-dev.txt
.venv/bin/python -m unittest discover -s tests -v
```

The feature verification on 2026-10-24 passed 53 backend tests, the production
build, browser downloads, and a LibreOffice round trip against synthetic data.
Lint had six existing hook warnings. Tests use isolated databases and mocked
email services, not production records. A local 25,000-row benchmark generated
1.12 MiB in 11.26 seconds with peak RSS of 130.7 MiB; hosted performance is not
established by that measurement.

Feature commit `8f52bf5` was pushed to `master`. Hosted deployment and an
authorised production export were not verified in that implementation session.
After deploying both services, sign in again and verify a small export against
the intended environment. Export files contain private contact data and are
readable reports, not PostgreSQL restore backups.
