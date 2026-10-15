// Always use the same-origin proxy. Never fall back to another host with credentials.
export class AdminError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function adminRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`/api/admin${path}`, {
    ...options,
    credentials: 'same-origin',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json', 'X-Admin-Request': '1', ...options.headers },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new AdminError(typeof data.detail === 'string' ? data.detail : 'Unable to complete the request', response.status);
  }
  return data as T;
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
