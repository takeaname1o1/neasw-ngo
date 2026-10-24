// Always use the same-origin proxy. Never fall back to another host with credentials.
export class AdminError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function adminResponse(path: string, options: RequestInit = {}): Promise<Response> {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  headers.set('X-Admin-Request', '1');
  const response = await fetch(`/api/admin${path}`, {
    ...options, credentials: 'same-origin', cache: 'no-store', headers,
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const detail = typeof data.detail === 'string' ? data.detail : 'Unable to complete the request';
    throw new AdminError(detail, response.status);
  }
  return response;
}

export async function adminRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  return (await adminResponse(path, options)).json() as Promise<T>;
}

export async function downloadSubmissions(filters: string, signal: AbortSignal): Promise<void> {
  const response = await adminResponse(`/submissions/export?${filters}`, { signal });
  if (response.headers.get('Content-Type')?.split(';')[0] !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    throw new AdminError('The server did not return an Excel file. Please try again.', 502);
  }
  const blob = await response.blob();
  if (signal.aborted) return;
  const provided = response.headers.get('Content-Disposition')?.match(/filename="([^"]+)"/)?.[1];
  const filename = provided && /^neasw-submissions-[\d-]+-UTC\.xlsx$/.test(provided)
    ? provided : `neasw-submissions-${new Date().toISOString().slice(0, 19).replace('T', '-').replace(/:/g, '')}-UTC.xlsx`;
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  try { anchor.click(); }
  finally {
    anchor.remove();
    // Give the browser time to consume the URL after the click dispatch.
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

export interface Submission {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  organization_name: string | null;
  preferred_date: string | null;
  message: string;
  created_at: string | null;
}

export interface SubmissionPage {
  items: Submission[];
  total: number;
  page: number;
  page_size: number;
}
