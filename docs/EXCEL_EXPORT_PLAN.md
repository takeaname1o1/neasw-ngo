# Excel export implementation plan

Status: implemented and verified locally on 2026-10-24. Render deployment and an authorised production export remain pending.

## Goal

Let a signed-in administrator download contact enquiries and volunteer applications as a genuine `.xlsx` workbook from the Submissions dashboard. Use the existing `contact_submissions` table. Add no tables or Neon services, and leave the existing email flow unchanged.

## Current project

- `backend/app/api/admin.py` exposes authenticated, searchable submissions with 20 records per page by default.
- `frontend/src/pages/Admin.tsx` provides login, search, refresh, and pagination.
- `frontend/src/services/admin.ts` sends same-origin requests with the admin session cookie and `X-Admin-Request: 1`. Its current helper always parses JSON, so it cannot download a workbook unchanged.
- Admin sessions and login limits are process-local; deployment already requires one API worker.
- The database contains eight submission fields. It does not store an explicit submission type, so export must not invent a reliable enquiry/volunteer classification.

## Proposed user experience

1. Add **Export Excel** beside the dashboard's Search and Refresh actions.
2. Export all records matching the **applied** search and date filters, across all pages. With no filters, export all submissions within the configured export limits.
3. Show a short scope hint: “Exports all matching submissions, including other pages.”
4. Show “Preparing Excel…” while the request runs; disable duplicate export clicks.
5. Download `neasw-submissions-YYYY-MM-DD-HHMMSS-UTC.xlsx` when ready.
6. If the session expires, show the existing sign-in screen. Show other failures inline without downloading an error response as an Excel file.
7. An empty result produces a valid, header-only workbook with an export summary saying zero records.

## Workbook contents

Main worksheet: **Submissions**, ordered by `created_at DESC, id DESC`, matching the dashboard.

| Column | Source | Excel representation |
| --- | --- | --- |
| Submission ID | `id` | Integer |
| Name | `name` | Literal text |
| Email | `email` | Literal text |
| Phone number | `phone_number` | Text, preserving `+` and leading zeros |
| Organisation / plan | `organization_name` | Text; blank if missing |
| Preferred date | `preferred_date` | Original text; the database does not enforce a date format |
| Message | `message` | Wrapped literal text, preserving line breaks |
| Submitted at (UTC) | `created_at` | Excel datetime explicitly labelled UTC; blank if missing |

Use a bold header, frozen top row, autofilter, fixed readable column widths, and capped message row heights. Avoid expensive content-wide width calculations.

Add an **Export info** worksheet with generation time, applied filters, row count, and timezone. For text longer than Excel's 32,767-character cell limit, preserve the full value as ordered chunks in a **Long text** worksheet and put a clear reference in the main sheet. Do not silently truncate data.

All user-controlled values must be written as literal string cells, never formulas or hyperlinks. This includes values beginning with `=`, `+`, `-`, or `@`; preserve the original text rather than changing phone numbers or message content.

## Backend outline

### Endpoint and filtering

- Add `GET /api/admin/submissions/export`.
- Reuse `require_admin`, the router's `browser_guard`, and its same-origin/header requirements. No public download URL, query-string credential, or external API fallback.
- Accept `search` with the existing 200-character limit, plus optional ISO `date_from` and `date_to` filters. Define date bounds as UTC calendar days; implement the upper bound as the next day's exclusive boundary.
- Extract a shared query builder for list and export so search fields and ordering stay consistent. Extend the list endpoint to accept the same date filters and reset dashboard pagination when filters change.
- Fetch the eight selected columns in batches; do not use `.all()` to materialise every ORM object. Keep the database session open through generation, then close it before serving the completed file.
- Use one consistent read transaction for row-limit checks and exported results, avoiding count/export drift during concurrent submissions. Export reads records; it never modifies them.

### Workbook generation and resource limits

- Add `openpyxl` to `backend/requirements.txt` and put generation in `backend/app/services/export_service.py`.
- Use write-only workbook generation and a private temporary directory; use bounded database batches. Generate the complete XLSX before starting the download because its ZIP archive must be finalised.
- Proposed initial guardrails: `EXPORT_MAX_ROWS=25000`, a 25 MiB completed-file limit, and one active export per API process. Make limits configurable and validate their ranges.
- Reject an over-limit request with a clear validation error instructing the admin to narrow the search/date range. Never silently export only the first N matching records.
- Return `429` with `Retry-After` when another export is in progress. Release the generation slot on both success and failure.
- Return the file with `FileResponse`, the XLSX media type, and an attachment filename generated by the server.
- Retain `Cache-Control: no-store`, `Pragma: no-cache`, and `X-Content-Type-Options: nosniff`.
- Remove temporary files after the response, and ensure cleanup also covers generation errors, interrupted requests, and stale files after an interrupted process. Files must not be under a publicly served directory.
- Log outcome, row count, duration, and failure class only. Do not log exported content, raw search terms, emails, or credentials.

## Frontend outline

- Add a binary download helper to `frontend/src/services/admin.ts`. Share request headers, cookie handling, and JSON-error parsing with `adminRequest`; do not pass the XLSX response through `response.json()`.
- Fetch the export through the website's same-origin `/api/admin` route so the existing proxy and cookie work. A plain download anchor cannot supply `X-Admin-Request: 1`.
- Use the server attachment filename, with a safe generated fallback. Create a Blob URL, trigger the download, then revoke the URL and remove the temporary anchor.
- Add date inputs, applied-filter state, export loading state, accessible status text, and an inline export error to `Admin.tsx`.
- Support cancellation when signing out or leaving the admin view. Avoid updating an unmounted component.
- Update `Admin.css` so the actions wrap cleanly on mobile and date filters remain labelled.

## Files to change

| File | Work |
| --- | --- |
| `backend/app/api/admin.py` | Shared filtering, optional list date filters, authenticated export route |
| `backend/app/services/export_service.py` | Workbook generation, text handling, limits, temporary-file lifecycle |
| `backend/app/core/config.py` | Validated export limit settings |
| `backend/requirements.txt` | XLSX writer dependency |
| `backend/tests/test_export.py` | Export, authentication, filtering, safety, and cleanup tests |
| `frontend/src/services/admin.ts` | Shared admin transport and binary download helper |
| `frontend/src/pages/Admin.tsx` | Export action, date filters, status/error handling |
| `frontend/src/pages/Admin.css` | Responsive export/filter controls |
| `README.md`, `backend/.env.example` | Admin export instructions, limits, and optional settings |

## Verification and acceptance criteria

- [x] Unauthenticated, expired, forged, and logged-out sessions cannot export.
- [x] Missing admin request headers and untrusted origins are rejected; private response headers remain present.
- [x] A download contains every matching record across multiple dashboard pages, in the expected order.
- [x] List and export agree for search, UTC date boundaries, combined filters, and empty results.
- [x] Leading-zero phone numbers, international names, line breaks, blank values, and dates survive workbook round-trip checks.
- [x] Formula-like strings are stored with string cell types and no active formulas or hyperlinks.
- [x] Oversized field content is recoverable from the continuation worksheet without silent loss.
- [x] Workbook/file limits, simultaneous requests, and generation failures return readable errors and clean up files/locks.
- [x] Export causes no database writes, schema changes, email sends, or exposure of admin security state.
- [x] Existing backend tests pass, followed by `npm run build` and `npm run lint`; document any existing lint warnings.
- [x] Browser test: sign in against isolated synthetic data, apply filters, export, open the workbook in Excel or LibreOffice, and verify the result. Test responsive controls and an expired session.
- [x] Verify performance against representative synthetic data up to the configured limit before deploying to Render Free.

Backend test command, from `backend/`:

```bash
.venv/bin/python -m unittest discover -s tests -v
```

## Rollout

1. Implement the backend service and tests against isolated data.
2. Add frontend controls and download handling; complete browser and workbook checks.
3. Update usage documentation and commit the reviewed feature.
4. Deploy backend and frontend. Keep the single-worker Render start command and existing Neon/Brevo settings.
5. Verify one authorised production export without sharing its contents or committing downloaded files.

This is a readable data export, not a PostgreSQL backup. It does not include schema, roles, or restore history. Scheduled exports, email attachments, cloud file storage, and a public export endpoint are outside the initial scope.

## References

- [openpyxl write-only mode](https://openpyxl.readthedocs.io/en/stable/optimized.html)
- [Starlette file responses](https://www.starlette.dev/responses/)

## Execution results — 2026-10-24

- Implemented the authenticated binary endpoint, dashboard action, shared UTC filters,
  literal-text workbook generation, long-text continuation, private file cleanup,
  and validated resource limits. Database tables and email behaviour are unchanged.
- Added a source-character budget alongside the completed-file cap. It rejects
  unusually large input before fetching text, at `EXPORT_MAX_FILE_MB * 1,048,576`
  characters. The XML writer's private-directory adapter is covered by tests and
  intentionally constrained to openpyxl 3.1.x.
- Uvicorn admin access logs omit query strings, including search terms. Export
  outcome logs contain counts, timing and error classes only. External hosting
  proxies have independent access-log policies.
- Backend: `Ran 53 tests ... OK`, against isolated SQLite and mocked services.
  Tests cover auth/revocation, guards, filters, order across pages, text safety,
  long fields, source/file/row limits, concurrent-slot rejection, failure and
  disconnect cleanup, stale-file reaping, and absence of database writes.
- `npm run build`: passed (`tsc -b && vite build`).
- `npm run lint`: passed with the same six pre-existing exhaustive-deps warnings
  in Contact.tsx and Home.tsx; no new warnings. Existing local dotenv parse
  warnings and a Starlette/httpx deprecation notice do not fail backend tests.
- Browser: signed in with isolated synthetic credentials, applied a UTC date
  range, and downloaded the workbook through the actual Export Excel action.
  The 10-row file contained IDs 20 through 11, literal leading-zero phones,
  and UTC timestamps. LibreOffice headless opened and re-saved it as XLSX;
  a second workbook read confirmed those values. The final search-filtered
  one-record download also passed. The default narrow viewport had no horizontal
  overflow (350 px document/content width); controls wrapped. Explicit viewport
  emulation in the in-app browser reported inconsistent dimensions, so this
  result uses the measured default viewport. A backend restart invalidated the
  old browser session and returned the preview to sign-in; expired export
  requests are also covered by the API tests.
- Performance: 25,000 synthetic records with roughly 500-character messages,
  generated in **11.26 seconds**, output **1.12 MiB**, peak process RSS **130.7 MiB**
  (baseline peak **105.0 MiB**) on the development machine. Workbook row count
  and cleanup were verified. This is a local SQLite benchmark, not a Render or
  Neon performance guarantee.
- No production data was read, exported or changed, and no real email was sent.

### Remaining deployment steps

1. Deploy the pushed commit to both the backend and frontend. Backend dependency
   installation must include the updated requirements file.
2. Retain one Uvicorn worker and the existing Neon/Brevo/admin environment values.
   The three export limit variables are optional; their defaults suit Render Free.
3. Sign in again after the backend restarts, then verify a small authorised
   production export. This step requires access to the hosted admin session;
   deployment and production verification were not performed locally.
