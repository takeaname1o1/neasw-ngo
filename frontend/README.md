# NEASW frontend

React 19, TypeScript 6, and Vite 8 power the public website and private submissions
dashboard. See the [project README](../README.md) for backend setup and environment
variables, and [technical documentation](../TECHNICAL_DOCUMENTATION.md) for the
request and data flows.

## Development

From this directory:

```bash
npm ci
npm run dev -- --port 3000
```

Run the backend separately on port 8000, then open `http://localhost:3000`.
`vite.config.ts` proxies `/api` to `http://127.0.0.1:8000`. Public views use React
state navigation; `/admin`, `/admin/login`, and `/admin/submissions` render the
admin interface directly.

For local admin login over HTTP, set backend `ADMIN_COOKIE_SECURE=False` and
configure `ADMIN_USERNAME` / `ADMIN_PASSWORD`. Keep Secure cookies enabled on
hosted HTTPS. The default allowed development origins use `localhost` on ports
3000 and 5173; using a different browser origin requires a matching backend
`CORS_ORIGINS` entry.

## API clients

| Client | Routing |
| --- | --- |
| `src/services/api.ts` | Public data/forms: build-time `VITE_API_BASE_URL`, local `/api`, or Render; can fall back to Render on a network error or 404 |
| `src/services/admin.ts` | Admin JSON and XLSX: always same-origin `/api/admin`, session cookie, `X-Admin-Request: 1`, no cross-host fallback |

Never put database URLs, admin credentials, or the Brevo API key in `VITE_`
variables. An absolute public API URL does not replace the admin proxy. The Home
leadership carousel also makes a relative API request.

## Admin Excel export

Sign in at `/admin/login`. Enter an optional search and UTC date range, click
**Search**, then **Export Excel**. The download includes all matching pages for
the applied filters; editing fields without applying them does not change its
scope. Empty results download a valid workbook with zero rows.

The button prevents duplicate requests and shows progress. An expired session
returns to sign-in; other errors appear inline. Downloads validate the response
content type, use a safe filename, and clean up temporary Blob URLs. Requests
are aborted on sign-out or unmount.

See the [Excel export guide](../docs/EXCEL_EXPORT_GUIDE.md) for workbook contents,
server limits, and troubleshooting.

## Checks and deployment

```bash
npm run build    # TypeScript checks, then production bundle in dist/
npm run lint     # Oxlint
npm run preview  # Preview the production frontend locally
```

The development server's `/api` proxy is not configured for preview. Supply a
same-origin API proxy when testing the built admin interface.

The committed Vercel settings use this directory as the project root,
`npm run build`, and `dist`. `vercel.json` proxies `/api/:path*` to the Render
backend before the SPA fallback. Keep it aligned with the root Vercel config
when changing backends. Another frontend host needs equivalent API proxying and
SPA route handling.

Deploy backend and frontend together for the Excel feature. The Python backend
must install its updated requirements and retain one worker / one instance.
No new frontend environment variables are needed for exports.
