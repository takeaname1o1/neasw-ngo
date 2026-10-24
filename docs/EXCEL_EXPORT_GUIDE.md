# Export enquiries and volunteer applications to Excel

The private admin dashboard exports the existing `contact_submissions` data.
You do not need the Render shell, a database download endpoint, or extra Neon
services. Feature commit: `8f52bf5` on `master`.

## Download a workbook

1. Open `/admin/login` on the website and sign in with the configured admin account.
2. On Submissions, optionally enter a search and **From date (UTC)** / **To date (UTC)**.
3. Click **Search** to apply those fields. Clear them and click Search for all records.
4. Click **Export Excel** and wait for “Excel download ready.”
5. Open the downloaded `neasw-submissions-YYYY-MM-DD-HHMMSS-UTC.xlsx` file in Excel
   or LibreOffice.

The export includes **all matching pages**, regardless of the page currently
shown. Unapplied field edits do not change the export. Both dates include the
whole UTC calendar day; the dashboard displays record times in your browser's
local timezone. For example, `2026-10-21` through `2026-10-21` selects that UTC
day, including its last instant and excluding midnight on October 22 UTC.

Search checks name, email, phone, organisation and message. It uses SQL `ILIKE`
patterns, so `%` and `_` act as wildcards. Search is limited to 200 characters.

## Workbook contents

| Worksheet | Contents |
| --- | --- |
| **Submissions** | ID, name, email, phone, organisation / plan, preferred date, message, submitted-at UTC timestamp |
| **Export info** | Generation time, row count, applied filters, timezone and text-handling notes |
| **Long text** | Created only when a value exceeds the cell limit; preserves submission ID, field, chunk number and text |

Records are newest first, with descending IDs breaking timestamp ties. Phone
numbers remain text, including leading zeros and `+`. Preferred dates retain
the original entered text. Messages preserve line breaks. Headers are frozen
and filterable. Empty results contain the headers and a zero count.

User text is stored as literal text rather than active formulas or hyperlinks.
Excel's cell limit is 32,767 UTF-16 units; longer values are split into ordered
chunks on **Long text**, with a reference in the main cell. Join the chunks in
numeric order for that submission ID and field to recover the full text.
XML-incompatible characters are represented by explicit `\uNNNN` escapes.

Both enquiries and volunteer applications are included. There is no persisted
submission-type field, so the workbook does not guess a reliable type. It does
not include leadership content, volunteer plan definitions, admin sessions,
credentials or email delivery history.

## Limits and troubleshooting

The default maximum is **25,000 matching rows**, **25 MiB output**, and **one
active export per API process**, including its file transfer. The size setting
also limits total source text to 26,214,400 characters at the default value.
An oversized export fails without silently dropping records. Narrow the search
or date range and export separate periods.

| Problem | What to check |
| --- | --- |
| Export button missing | Deploy the frontend build containing the feature; reload the page |
| 401 / returned to sign-in | Sign in again; expiry, logout, credential changes and backend restarts invalidate sessions |
| 403 / origin not allowed | Use the dashboard, which supplies `X-Admin-Request: 1`; check that the frontend origin exactly matches backend `CORS_ORIGINS` |
| 422 / invalid filters or export too large | Correct the ISO date range, keep search within 200 characters, or narrow the results; `date_to=9999-12-31` is unsupported |
| 429 / another export in progress | Wait for the active export to finish; the response provides `Retry-After: 30` |
| 500 / unable to prepare Excel | Check backend logs for an export failure class and available temporary storage; retry with fewer matching rows |
| Network failure or “server did not return an Excel file” | Check backend availability and the frontend's same-origin `/api/admin` proxy; a SPA HTML response is not a workbook |
| File has fewer rows than expected | Check applied filters and UTC boundaries; pagination does not limit exports |

Optional backend settings and validated ranges:

| Setting | Default | Range |
| --- | --- | --- |
| `EXPORT_MAX_ROWS` | `25000` | 1–100000 |
| `EXPORT_MAX_FILE_MB` | `25` | 1–100 MiB; also source characters = value × 1,048,576 |
| `EXPORT_MAX_CONCURRENT` | `1` | 1–2 |

Keep defaults on Render Free unless hosted measurements justify a change.
Changing these settings requires a backend restart. Keep **one Uvicorn worker
and one service instance**, because admin sessions, login limits and export
slots are held in process memory.

## Deployment and verification

The feature was implemented and verified locally; hosted deployment was not
verified in that session. Deploy both the backend and frontend containing
`8f52bf5` or a later commit:

- Backend: install the updated `backend/requirements.txt`, including openpyxl and
  lxml. Retain existing Neon, Brevo and admin variables; export limit variables
  are optional. Use `--workers 1` in the Uvicorn start command.
- Frontend: build and deploy with the same-origin `/api` rewrite before the SPA
  fallback. Setting `VITE_API_BASE_URL` alone does not configure admin routing.
- Sign in again after restart, apply a small known date range, export it, and
  compare the IDs and count with the dashboard and Export info sheet.

The [implementation record](EXCEL_EXPORT_PLAN.md#execution-results--2026-10-24)
contains the 53-test result, browser/LibreOffice checks, and local 25,000-row
benchmark. Those measurements do not establish Render performance or production
delivery.

Exports do not modify the database or send email. Temporary server files are
private and removed after transfer or failure, with stale crash files reaped on
startup or a later export. The downloaded workbook remains on your computer and
contains private contact information. It is a readable report, not a PostgreSQL
restore backup.
