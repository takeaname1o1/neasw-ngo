# NEASW Welfare Foundation

The NEASW Welfare Foundation website presents the organisation’s community work, cultural initiatives, leadership, and volunteering opportunities across Northeast India and beyond. It combines a React single-page application with a FastAPI service that stores enquiries and volunteer applications in PostgreSQL on Neon (with SQLite for offline development) and supports SMTP notifications.

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
                └── FastAPI-Mail → SMTP notifications
```

| Layer | Implementation |
| --- | --- |
| Frontend | React 19, TypeScript 6, Vite 8 |
| UI | Plain CSS, inline styles, and Lucide React icons |
| Navigation | React state in `App.tsx`; no URL-based router |
| HTTP client | Browser `fetch` with a shared API helper |
| Backend | FastAPI, Uvicorn, Pydantic v2, and pydantic-settings |
| Persistence | SQLAlchemy 2, Psycopg 3, and Neon PostgreSQL; local SQLite fallback |
| Email | FastAPI-Mail with configurable SMTP; defaults target Zoho |
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
│   │   ├── services/             # SMTP email notifications
│   │   └── main.py               # FastAPI app, CORS, and startup lifecycle
│   ├── .env.example              # SMTP configuration template
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
# Edit .env with your SMTP account and intended notification recipient.
python run.py
```

The backend automatically loads Neon variables from the repository root’s ignored `.env.local`, if present. Without `DATABASE_URL`, it uses local SQLite. The backend runs at `http://localhost:8000`. Interactive API documentation is available at `http://localhost:8000/docs`, with the OpenAPI schema at `http://localhost:8000/openapi.json`.

The example configuration disables SMTP (`MAIL_ENABLED=False`), which is appropriate for Render Free. Startup and submission notifications are skipped when disabled or when no password is configured. To use SMTP on a host that permits it, set `MAIL_ENABLED=True` and valid credentials and a recipient you control. Database submissions do not depend on email delivery.

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
| `MAIL_ENABLED` | `True` in code; the example sets `False` for Render Free |
| `PROJECT_NAME` | `NEASW Welfare Foundation API` |
| `API_V1_STR` | `/api`; changing this also requires updating frontend routing |
| `CORS_ORIGINS` | JSON array of allowed origins; currently includes `*`, the organisation’s domains, and localhost ports 3000 and 5173 |
| `MAIL_USERNAME`, `MAIL_PASSWORD` | SMTP login; the password defaults to empty |
| `MAIL_FROM`, `MAIL_FROM_NAME` | Sender address and display name |
| `MAIL_SERVER`, `MAIL_PORT` | `smtp.zoho.in`, `587` |
| `MAIL_STARTTLS`, `MAIL_SSL_TLS` | `True`, `False` |
| `USE_CREDENTIALS`, `VALIDATE_CERTS` | Both `True` |
| `MAIL_TO_ADMIN` | Notification recipient; defaults to `neaswsubmission@zohomail.in` |

The SMTP example is in `backend/.env.example`. Local `.env` files and SQLite databases are ignored by Git.

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

These tests do not connect to Neon. After changes, also check all five views, responsive navigation, galleries, volunteer plan loading, and form validation. Verify actual submissions only against the intended API and SMTP recipient. The repository root also provides `npm run build`, `npm run dev`, and `npm run lint` wrappers for the frontend commands.

## Neon setup on Render Free

This checkout is configured for Neon project `empty-lab-47800504`, branch `production`, in organisation `org-bold-snow-12527053`. `neon.ts` declares a database-only setup; the existing FastAPI backend remains on Render. Do not enable other Neon services for this app.

```bash
npm install -g neon@latest
neon login
neon init -y --org-id org-bold-snow-12527053 --project-id empty-lab-47800504 --branch production --services postgres
neon deploy
```

`neon deploy` writes `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, and `NEON_BRANCH` into the ignored root `.env.local` (or `.env` if present). Keep this file private. Install frontend dependencies with `npm ci --prefix frontend` and use `npm run build` from the root.

In **Render → Python backend service → Environment**, privately copy the two database URL values, set `MAIL_ENABLED=False`, save, and deploy the updated backend code. Use `backend` as the root directory, `pip install -r requirements.txt` as the build command, and `uvicorn app.main:app --host 0.0.0.0 --port "$PORT"` as the start command. Copy the full values without wrapping quotes. Keep database URLs server-side; never prefix them with `VITE_`.

To view enquiries, open the Neon console’s SQL Editor on the `production` branch and run:

```sql
SELECT id, name, email, phone_number, organization_name,
       preferred_date, message, created_at
FROM contact_submissions
ORDER BY id DESC
LIMIT 50;
```

The connection change does not import previous Render SQLite records. Retain independent database exports/backups; the free plan has usage limits and a limited restore window. A public submissions-listing endpoint is intentionally not added because enquiries contain private contact details.

## Deployment

### Backend service

Configure a Python service with `backend` as its working directory:

```bash
python -m pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port "$PORT"
```

Set `PORT` through the hosting environment, or substitute the port your service expects. Set both Neon database URLs under the Render backend service’s **Environment** tab, along with `MAIL_ENABLED=False` for Render Free and a JSON array of frontend origins in `CORS_ORIGINS`. Do not set database credentials on the static frontend service. The development entry point `python run.py` enables reload and fixes the port at 8000; use the Uvicorn command above for hosting.

On Render Free, use Neon via `DATABASE_URL`: database storage then lives outside the temporary Render filesystem and survives backend restarts and redeployments. SQLite on Render Free remains temporary. No hosting manifest currently configures the Render service; use its dashboard settings. Neon deployment provisions database services only; it does not deploy the Python app to Render or set Render environment variables.

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

- There is no admin interface, authentication, enquiry-listing API, or implemented payment processing flow.
- SMTP notifications run in the application process without a durable queue or retry mechanism. A notification failure does not undo a saved submission.
- The current CORS configuration includes a wildcard while enabling credentials; configure explicit trusted origins for a hosted environment.
- Some display content has local fallbacks, so a rendered page alone does not establish backend health.

See [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md) for additional implementation notes. The source files remain authoritative where older notes differ.
