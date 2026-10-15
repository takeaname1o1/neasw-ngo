# NorthEast Association for Social Welfare (NEASW)

The NorthEast Association for Social Welfare website presents the organisation’s community work, cultural initiatives, leadership, and volunteering opportunities across Northeast India and beyond. It combines a React single-page application with a FastAPI service that stores enquiries and volunteer applications in PostgreSQL on Neon (with SQLite for offline development) and supports Brevo HTTPS email notifications (with optional SMTP).

## Features

- **Home:** rotating banners, initiative and programme galleries, leadership carousel, FAQs, and partner links.
- **About:** organisation background, areas of work, and a chapter-based leadership directory.
- **Our Work:** programme descriptions and photography covering community welfare, education, healthcare, environmental awareness, tourism, and cultural preservation.
- **Join NEASW:** 6-, 12-, and 24-month volunteer plans with an application modal.
- **Contact:** enquiry form, image gallery, contact details, and social links.
- **Shared interface:** responsive layouts, navigation, footer, and calls to action.

Contact enquiries and volunteer applications use the same submission endpoint and database table. Volunteer applications record the selected plan in the organisation and message fields.

## Architecture and stack

```text
Browser: React + TypeScript
    │
    ├── Local: /api → Vite development proxy
    └── Hosted: configured API URL or deployed Render backend
                │
                ▼
         FastAPI + Pydantic
                │
                ├── SQLAlchemy → Neon PostgreSQL / local SQLite
                └── HTTPX → Brevo HTTPS notifications (optional SMTP)
```

| Layer | Implementation |
| --- | --- |
| Frontend | React 19, TypeScript 6, Vite 8 |
| UI | Plain CSS, inline styles, and Lucide React icons |
| Navigation | React state in `App.tsx`; no URL-based router |
| HTTP client | Browser `fetch` with a shared API helper |
| Backend | FastAPI, Uvicorn, Pydantic v2, and pydantic-settings |
| Persistence | SQLAlchemy 2, Psycopg 3, and Neon PostgreSQL; local SQLite fallback |
| Email | Brevo HTTPS API via HTTPX; optional FastAPI-Mail SMTP provider |
| Frontend checks | TypeScript build checks and Oxlint |

Navigation switches among five views without changing the browser URL. Refreshing the application returns to Home; individual views do not have deep links.

## Repository layout

```text
.
├── backend/
│   ├── app/
│   │   ├── api/endpoints.py       # REST endpoints
│   │   ├── core/                 # Settings, database sessions, and seeding
│   │   ├── models/               # SQLAlchemy models and Pydantic schemas
│   │   ├── services/             # Brevo HTTPS and optional SMTP notifications
│   │   └── main.py               # FastAPI app, CORS, and startup lifecycle
│   ├── .env.example              # Email configuration template
│   ├── requirements.txt          # Python dependencies
│   ├── run.py                    # Development server on port 8000
│   └── update_leadership.py      # Replace database leadership from JSON
├── frontend/
│   ├── src/
│   │   ├── assets/               # Images, programme notes, and leader.json
│   │   ├── components/           # Header, footer, and conversion block
│   │   ├── pages/                # Home, About, Work, Join, and Contact
│   │   ├── services/api.ts       # API types, URL selection, and fallback
│   │   ├── App.tsx               # View selection and shared layout
│   │   └── index.css             # Shared styles and design tokens
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.ts            # Development /api proxy
│   └── vercel.json               # API rewrite and SPA fallback
├── neon.ts                       # Neon service and branch configuration
├── package.json                  # Root build/dev commands and Neon tooling
├── run.sh                        # Combined local development launcher
├── vercel.json                   # Duplicate root deployment configuration
├── TECHNICAL_DOCUMENTATION.md     # Additional implementation notes
├── layout.md                     # Layout reference
├── mobile_friendly_suggestions.md
└── previews.html                 # Standalone design preview
```

## Local development

### Prerequisites

- **Node.js 20.19+ within Node 20, or Node.js 22.12+**, with npm, as required by the locked Vite and React plugin packages.
- **Python 3.10+**, with pip and virtual environment support.
- **Bash and `lsof`** if using the combined launcher.

The commands below assume a Linux or macOS shell and start from the repository root.

### Start the services separately

In one terminal, prepare and start the backend:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
cp .env.example .env
# Edit .env with your Brevo API key, verified sender, and notification recipient.
python run.py
```

The backend automatically loads Neon variables from the repository root’s ignored `.env.local`, if present. Without `DATABASE_URL`, it uses local SQLite. The backend runs at `http://localhost:8000`. Interactive API documentation is available at `http://localhost:8000/docs`, with the OpenAPI schema at `http://localhost:8000/openapi.json`.

The example configuration disables email (`MAIL_ENABLED=False`) until credentials are configured. On Render Free, use `MAIL_PROVIDER=brevo`, set `BREVO_API_KEY`, and then set `MAIL_ENABLED=True`. Notifications use HTTPS instead of blocked SMTP ports. The provider receives the submission details for the admin email. Database storage does not depend on email delivery; a missing key, provider rejection, or timeout is logged without undoing the saved submission. Legacy SMTP requires `MAIL_PROVIDER=smtp` and SMTP credentials on a host that permits it.

In a second terminal, install and start the frontend:

```bash
cd frontend
npm ci
npm run dev -- --port 3000
```

Open the URL printed by Vite, normally `http://localhost:3000`. Without the explicit port, `npm run dev` normally uses port 5173. The Vite development server proxies `/api` to `http://127.0.0.1:8000`.

### Combined launcher

After configuring `backend/.env`, you can start both services from the repository root:

```bash
./run.sh
```

The script creates `backend/.venv` if needed, installs Python dependencies on every launch, installs frontend dependencies if `node_modules` is absent, and launches the backend on port 8000 and Vite on port 3000. It binds both services to all network interfaces.

**The launcher forcibly terminates processes occupying ports 8000 and 3000 using `kill -9`.** Use the separate-terminal commands when those ports belong to other work. Ctrl+C triggers the launcher’s backend cleanup handler.

## Configuration

### Backend environment

Settings are defined in `backend/app/core/config.py`. Case-sensitive process environment variables take precedence over dotenv files. Files load in this order, with later files overriding earlier ones: root `.env`, root `.env.local` (Neon CLI output), `backend/.env`, and `backend/.env.local`. These paths are resolved from the source location, independently of the working directory.

| Variable | Default / purpose |
| --- | --- |
| `DATABASE_URL` | Pooled Neon PostgreSQL URL; defaults to an absolute `backend/neasw.db` SQLite URL when omitted |
| `DATABASE_URL_UNPOOLED` | Optional direct Neon URL used for table creation; uses `DATABASE_URL` if omitted |
| `MAIL_ENABLED` | Global email switch; `True` in code, `False` in the example until credentials are configured |
| `MAIL_PROVIDER` | `brevo` (default) for HTTPS, or `smtp` for legacy SMTP |
| `BREVO_API_KEY` | Private Brevo API key; required for the Brevo provider, redacted in settings representations |
| `PROJECT_NAME` | `NorthEast Association for Social Welfare API` |
| `API_V1_STR` | `/api`; changing this also requires updating frontend routing |
| `CORS_ORIGINS` | JSON array of allowed origins; currently includes `*`, the organisation’s domains, and localhost ports 3000 and 5173 |
| `MAIL_USERNAME`, `MAIL_PASSWORD` | SMTP login; the password defaults to empty |
| `MAIL_FROM`, `MAIL_FROM_NAME` | Verified sender address and display name; defaults to `notifications@neaswwelfarefoundation.in` / `NorthEast Association for Social Welfare` |
| `MAIL_SERVER`, `MAIL_PORT` | `smtp.zoho.in`, `587` |
| `MAIL_STARTTLS`, `MAIL_SSL_TLS` | `True`, `False` |
| `USE_CREDENTIALS`, `VALIDATE_CERTS` | Both `True` |
| `MAIL_TO_ADMIN` | Notification recipient; defaults to `neaswsubmission@zohomail.in` |

The email configuration example is in `backend/.env.example`. Local `.env` files and SQLite databases are ignored by Git.

### Frontend API routing

`frontend/src/services/api.ts` chooses the API base URL in this order:

1. `VITE_API_BASE_URL`, if supplied.
2. `/api` when the browser hostname is `localhost` or `127.0.0.1`.
3. `https://neasw-ngo.onrender.com/api` for other hostnames.

For a custom API, set the value in `frontend/.env.local` before starting Vite or building:

```dotenv
VITE_API_BASE_URL=https://your-backend.example.com/api
```

Include `/api` and omit the trailing slash. Vite embeds this value at build time. For access through a LAN IP, explicitly set `VITE_API_BASE_URL=/api` to use the development proxy.

**The shared client retries against the hard-coded Render backend after a network error or HTTP 404 from another API base, including for form submissions.** This also applies during local development; setting a custom base does not disable fallback. Keep the intended backend running and review this behavior before submitting test or private data.

The Home leadership carousel makes its own relative `/api/about/leadership` request and does not use `VITE_API_BASE_URL`. Keep a same-origin API proxy or rewrite available for that request.

## API

All application routes use the default `/api` prefix.

| Method | Endpoint | Behavior |
| --- | --- | --- |
| GET | `/` | API welcome message |
| GET | `/api/about/leadership` | Leadership records with `id`, `name`, `position`, and `chapter` |
| GET | `/api/join/volunteer-plans` | Volunteer plans with `id`, `duration_months`, `title`, and `features` |
| GET | `/api/contact/info` | Contact details, locations, Instagram link, and partner links |
| POST | `/api/contact/submit` | Validate and persist an enquiry, then queue an admin email |

Submission payload:

```json
{
  "name": "Example Volunteer",
  "email": "volunteer@example.com",
  "phone_number": "+91 9000000000",
  "organization_name": "Example organisation",
  "preferred_date": "2026-11-01",
  "message": "I would like to learn about volunteering."
}
```

`submission_type` is optional and defaults to `contact`. The Join form sends `volunteer`, and the Contact form sends `contact`. Both queue an admin notification and a separate receipt email to the person submitting after database storage; the receipt uses wording appropriate to the submission type. Older cached Join forms that omit `submission_type` are recognised by their volunteer application organisation/message markers; an explicit `contact` value always takes precedence.

`name`, `email`, `phone_number`, and `message` are required. `organization_name` and `preferred_date` are optional. Email uses Pydantic’s `EmailStr` validation; the preferred date is stored as a string. A successful submission returns `status`, the saved record’s `id`, and a confirmation `message`. It confirms database storage, not email delivery.

To check the local API without creating a record or sending a submission email:

```bash
curl http://localhost:8000/
curl http://localhost:8000/api/about/leadership
curl http://localhost:8000/api/join/volunteer-plans
curl http://localhost:8000/api/contact/info
```

## Data and content maintenance

The configured `DATABASE_URL` selects Neon PostgreSQL or SQLite. Ordinary `postgres://` and `postgresql://` URLs are normalised to SQLAlchemy’s `postgresql+psycopg` driver. PostgreSQL defaults to TLS (`sslmode=require`), a small connection pool, connection health checks, and disabled automatic prepared statements for PgBouncer compatibility. Keep the Neon URL’s TLS parameters intact. There is no migration framework yet; `create_all` creates missing tables but does not alter existing columns.

At application startup, the backend creates missing tables using `DATABASE_URL_UNPOOLED` when supplied, then seeds through the application connection:

- `contact_submissions`: enquiry and application fields, plus a UTC creation timestamp.
- `leadership_members`: name, position, and chapter.
- `volunteer_plans`: unique duration, title, and JSON feature list.

The seeder inserts 6-, 12-, and 24-month plans only if the plan table is empty. It replaces the leadership table with the default 18-member roster when the existing record count is four or fewer. It does not synchronise later edits to an already populated database.

To replace database leadership from `frontend/src/assets/team/leader.json`, initialise the database by starting the backend first, then run from `backend/`:

```bash
python update_leadership.py
```

This script deletes existing leadership rows and inserts the JSON roster in one transaction against the configured database, including Neon. The About directory, Home fallback roster, backend seed roster, and JSON file are separate content sources; changes to one do not automatically update the others. Footer API contact data lives in `backend/app/api/endpoints.py`; additional contact copy is embedded in frontend components.

## Build and checks

Run from `frontend/`:

```bash
npm run lint       # Oxlint
npm run build      # TypeScript project build, then Vite production bundle
npm run preview    # Serve the built dist/ directory locally
```

`npm run preview` serves the frontend build; the configured `/api` proxy belongs to the development server. Provide an API URL for the build and a same-origin rewrite where needed.

Database configuration regression checks are available from `backend/`:

```bash
.venv/bin/python -m unittest discover -s tests -v
```

These tests do not connect to Neon. After changes, also check all five views, responsive navigation, galleries, volunteer plan loading, and form validation. Verify actual submissions only against the intended API and email recipient. The repository root also provides `npm run build`, `npm run dev`, and `npm run lint` wrappers for the frontend commands.

## Neon setup on Render Free

This checkout is configured for Neon project `empty-lab-47800504`, branch `production`, in organisation `org-bold-snow-12527053`. `neon.ts` declares a database-only setup; the existing FastAPI backend remains on Render. Do not enable other Neon services for this app.

```bash
npm install -g neon@latest
neon login
neon init -y --org-id org-bold-snow-12527053 --project-id empty-lab-47800504 --branch production --services postgres
neon deploy
```

`neon deploy` writes `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, and `NEON_BRANCH` into the ignored root `.env.local` (or `.env` if present). Keep this file private. Install frontend dependencies with `npm ci --prefix frontend` and use `npm run build` from the root.

In **Render → Python backend service → Environment**, privately copy the two database URL values, configure Brevo as described below (or keep `MAIL_ENABLED=False` until ready), save, and deploy the updated backend code. Use `backend` as the root directory, `pip install -r requirements.txt` as the build command, and `uvicorn app.main:app --host 0.0.0.0 --port "$PORT"` as the start command. Copy the full values without wrapping quotes. Keep database URLs server-side; never prefix them with `VITE_`.

To view enquiries, open the Neon console’s SQL Editor on the `production` branch and run:

```sql
SELECT id, name, email, phone_number, organization_name,
       preferred_date, message, created_at
FROM contact_submissions
ORDER BY id DESC
LIMIT 50;
```

The connection change does not import previous Render SQLite records. Retain independent database exports/backups; the free plan has usage limits and a limited restore window. A public submissions-listing endpoint is intentionally not added because enquiries contain private contact details.

## Private submissions dashboard

Open `/admin/login` on the website, sign in, and view records at `/admin/submissions`.
The read-only dashboard includes search, newest-first ordering, and 20 records per
page. It displays both enquiries and volunteer applications from `contact_submissions`.

For local development, the backend supports the existing `USER` and `PASSWORD`
entries in the ignored root `.env.local`. `USER` is read only from dotenv files to
avoid accidentally using the operating system's username. Preferred credentials
are `ADMIN_USERNAME` and `ADMIN_PASSWORD`, which override those legacy entries.
Credentials are backend-only; never use `VITE_` prefixes or commit them.

For deployment, set **`ADMIN_USERNAME` and `ADMIN_PASSWORD` in Render's backend
Environment settings** using the values you chose locally, then redeploy the backend
and frontend. Root `.env.local` is ignored by Git and is not uploaded automatically.
The backend creates the additional `admin_sessions` and `admin_login_attempts`
tables at startup using the existing database configuration. No Neon Auth service
is required.

Sessions expire after eight hours (`ADMIN_SESSION_SECONDS=28800`, configurable
from 300 to 86400 seconds). Only a random opaque token is placed in the HttpOnly,
SameSite=Lax cookie; the database stores its hash. Logout revokes that session;
changing either credential invalidates all existing sessions. Password verification
uses scrypt and constant-time comparisons. Responses containing admin data use
`Cache-Control: no-store`. Login attempts are limited to five per client address
and thirty overall per 15 minutes; attempts include successful logins. Rate-limit
records persist in the database. When a trusted hosting proxy supplies client
addresses, configure Uvicorn to trust only that proxy; otherwise multiple users
may share the proxy's limit.

`ADMIN_COOKIE_SECURE=True` is the default and must remain enabled on hosted HTTPS.
For local HTTP testing only, set `ADMIN_COOKIE_SECURE=False` in a backend dotenv
file and restart the backend. Admin requests always use the website's same-origin
`/api` proxy, independent of the public API fallback settings. Keep the Vercel
rewrite pointing at the correct backend. Add your exact frontend origin to
`CORS_ORIGINS` if it differs from the configured production and localhost origins.
Admin requests require the `X-Admin-Request: 1` header and reject untrusted browser
origins to protect the login/logout flows against cross-site requests.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/admin/login` | Verify username/password and set the session cookie |
| GET | `/api/admin/session` | Check the current admin session |
| POST | `/api/admin/logout` | Revoke the session and clear the cookie |
| GET | `/api/admin/submissions` | Authenticated records; `page`, `page_size` (max 100), and `search` |

Auth and records tests use temporary SQLite with fake credentials, never Neon.
Install their extra dependency with `.venv/bin/pip install -r requirements-dev.txt`:

```bash
cd backend
.venv/bin/python -m unittest discover -s tests -v
```

## Deployment

### Backend service

Configure a Python service with `backend` as its working directory:

```bash
python -m pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port "$PORT"
```

Set `PORT` through the hosting environment, or substitute the port your service expects. Set both Neon database URLs under the Render backend service’s **Environment** tab, along with the Brevo configuration below (or `MAIL_ENABLED=False` to disable email) and a JSON array of frontend origins in `CORS_ORIGINS`. Do not set database credentials on the static frontend service. The development entry point `python run.py` enables reload and fixes the port at 8000; use the Uvicorn command above for hosting.

On Render Free, use Neon via `DATABASE_URL`: database storage then lives outside the temporary Render filesystem and survives backend restarts and redeployments. SQLite on Render Free remains temporary. No hosting manifest currently configures the Render service; use its dashboard settings. Neon deployment provisions database services only; it does not deploy the Python app to Render or set Render environment variables.

### Brevo email on Render Free

The sender `notifications@neaswwelfarefoundation.in` must be verified and its domain authenticated in Brevo. Generate an **API key**, not an SMTP key. Complete any required Brevo account/phone verification before sending.

Set these variables privately on the **Python backend service**, then redeploy the updated code:

```dotenv
MAIL_ENABLED=True
MAIL_PROVIDER=brevo
BREVO_API_KEY=<your private Brevo API key>
MAIL_FROM=notifications@neaswwelfarefoundation.in
MAIL_FROM_NAME=NorthEast Association for Social Welfare
MAIL_TO_ADMIN=neaswsubmission@zohomail.in
```

`MAIL_ENABLED=False` disables both providers, even when an API key is present. SMTP username/password settings are not used by the Brevo provider. Brevo failures never fall back to SMTP. Never commit or expose the API key in frontend variables.

Both startup notifications and contact/volunteer notifications use `https://api.brevo.com/v3/smtp/email` over HTTPS with a 15-second request timeout and a 5-second connection timeout. Contact notifications use the verified sender above and the submitter's email as Reply-To. User input is escaped in HTML. The backend logs provider acceptance, HTTP error status, or network failure without logging keys or submission bodies. Render/Uvicorn logs include the submission reference and which submitter confirmation was queued. Brevo messages carry `admin_notification`, `volunteer_confirmation`, `contact_confirmation`, or `startup_notification` tags; rejection logs include the category and a sanitised provider error code. No automatic retries are made, to avoid duplicate sends after ambiguous timeouts.

After deployment, check Render logs and **Brevo → Transactional → Logs**. Provider acceptance means Brevo queued the message; inspect delivery events to confirm delivery. Submitting either website form should save the record in Neon and send two emails: an admin notification and a separate receipt to the person submitting, with the reference number and the admin address as Reply-To. Volunteer receipts confirm application receipt, not a placement; contact receipts acknowledge the enquiry, not a confirmed booking. Both registrations and contact enquiries use two email sends each. Admin notification failure does not prevent the submitter confirmation, and either email failing leaves the submission saved. Deploy both the backend and frontend for the Join form’s `submission_type=volunteer` marker to take effect. Each backend startup can also send a notification; these count toward your email allowance. Configuration and HTTP failure cases are covered by mocked tests and do not send real emails.

### Frontend on Vercel

Use these repository settings:

| Setting | Value |
| --- | --- |
| Root directory | `frontend` |
| Build command | `npm run build` |
| Output directory | `dist` |

`frontend/vercel.json` rewrites `/api/:path*` to `https://neasw-ngo.onrender.com/api/:path*` and sends other paths to `index.html`. A duplicate configuration exists at the repository root; keep both consistent when changing the backend destination.

When deploying to another backend, set `VITE_API_BASE_URL` before the frontend build and update the API rewrite for the Home leadership request. The hard-coded fallback in `frontend/src/services/api.ts` must also be reviewed when changing environments.

## Current limitations

- Payment processing is not implemented.
- Email notifications run in the application process without a durable queue or automatic retry mechanism. A notification failure does not undo a saved submission. Brevo API acceptance does not guarantee inbox delivery; check transactional logs in Brevo for delivery events.
- CORS permits explicit trusted frontend origins; add any additional deployment origins to `CORS_ORIGINS`.
- Some display content has local fallbacks, so a rendered page alone does not establish backend health.

See [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md) for additional implementation notes. The source files remain authoritative where older notes differ.
