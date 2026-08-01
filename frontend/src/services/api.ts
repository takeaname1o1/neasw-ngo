export interface LeadershipMember {
  id?: number;
  name: string;
  position: string;
  chapter: string;
}

export interface VolunteerPlan {
  id?: number;
  duration_months: number;
  title: string;
  features: string[];
}

export interface ContactFormSubmit {
  name: string;
  email: string;
  phone_number: string;
  organization_name?: string;
  preferred_date?: string;
  message: string;
}

export interface ContactInfo {
  motto?: string;
  headquarters?: string;
  emails: string[];
  phones: string[];
  locations: string[];
  socials: {
    instagram?: string;
  };
  partners?: { name: string; url: string }[];
}

const RENDER_BACKEND_URL = 'https://neasw-ngo.onrender.com/api';
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || '/api';

async function fetchWithFallback(endpoint: string, options?: RequestInit): Promise<Response> {
  const primaryUrl = `${API_BASE_URL}${endpoint}`;
  try {
    const res = await fetch(primaryUrl, options);
    if (res.status === 404 && API_BASE_URL === '/api') {
      console.warn(`Primary endpoint ${primaryUrl} returned 404. Falling back to Render backend directly.`);
      return await fetch(`${RENDER_BACKEND_URL}${endpoint}`, options);
    }
    return res;
  } catch (err) {
    if (API_BASE_URL === '/api') {
      console.warn(`Primary fetch to ${primaryUrl} failed. Falling back to Render backend directly:`, err);
      return await fetch(`${RENDER_BACKEND_URL}${endpoint}`, options);
    }
    throw err;
  }
}

async function handleResponse<T>(response: Response, defaultErrorMsg: string): Promise<T> {
  const rawText = await response.text();

  if (!response.ok) {
    let errorDetail = defaultErrorMsg;
    if (rawText) {
      try {
        const parsed = JSON.parse(rawText);
        errorDetail = parsed.detail || parsed.message || defaultErrorMsg;
      } catch {
        errorDetail = `${defaultErrorMsg} (HTTP ${response.status}): ${rawText.slice(0, 100)}`;
      }
    } else {
      errorDetail = `${defaultErrorMsg} (HTTP ${response.status} Empty Response)`;
    }
    throw new Error(errorDetail);
  }

  if (!rawText || !rawText.trim()) {
    return {} as T;
  }

  try {
    return JSON.parse(rawText);
  } catch (err) {
    console.error('Failed to parse JSON response. Raw text:', rawText);
    throw new Error(`Invalid JSON response from server: ${err instanceof Error ? err.message : String(err)}`);
  }
}

export async function getLeadership(): Promise<LeadershipMember[]> {
  const response = await fetchWithFallback('/about/leadership');
  return handleResponse<LeadershipMember[]>(response, 'Failed to fetch leadership members');
}

export async function getVolunteerPlans(): Promise<VolunteerPlan[]> {
  const response = await fetchWithFallback('/join/volunteer-plans');
  return handleResponse<VolunteerPlan[]>(response, 'Failed to fetch volunteer plans');
}

export async function submitContactForm(data: ContactFormSubmit): Promise<{ status: string; id?: number; message: string }> {
  const response = await fetchWithFallback('/contact/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<{ status: string; id?: number; message: string }>(response, 'Failed to submit contact form');
}

export async function getContactInfo(): Promise<ContactInfo> {
  const response = await fetchWithFallback('/contact/info');
  return handleResponse<ContactInfo>(response, 'Failed to fetch contact info');
}


