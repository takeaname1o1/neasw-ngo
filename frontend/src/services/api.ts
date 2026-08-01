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
  const response = await fetch('/api/about/leadership');
  return handleResponse<LeadershipMember[]>(response, 'Failed to fetch leadership members');
}

export async function getVolunteerPlans(): Promise<VolunteerPlan[]> {
  const response = await fetch('/api/join/volunteer-plans');
  return handleResponse<VolunteerPlan[]>(response, 'Failed to fetch volunteer plans');
}

export async function submitContactForm(data: ContactFormSubmit): Promise<{ status: string; id?: number; message: string }> {
  const response = await fetch('/api/contact/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<{ status: string; id?: number; message: string }>(response, 'Failed to submit contact form');
}

export async function getContactInfo(): Promise<ContactInfo> {
  const response = await fetch('/api/contact/info');
  return handleResponse<ContactInfo>(response, 'Failed to fetch contact info');
}

