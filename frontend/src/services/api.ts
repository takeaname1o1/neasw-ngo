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
  emails: string[];
  phones: string[];
  locations: string[];
  socials: {
    instagram?: string;
  };
}

export async function getLeadership(): Promise<LeadershipMember[]> {
  const response = await fetch('/api/about/leadership');
  if (!response.ok) {
    throw new Error('Failed to fetch leadership members');
  }
  return response.json();
}

export async function getVolunteerPlans(): Promise<VolunteerPlan[]> {
  const response = await fetch('/api/join/volunteer-plans');
  if (!response.ok) {
    throw new Error('Failed to fetch volunteer plans');
  }
  return response.json();
}

export async function submitContactForm(data: ContactFormSubmit): Promise<{ status: string; id?: number; message: string }> {
  const response = await fetch('/api/contact/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.detail || 'Failed to submit contact form');
  }
  return response.json();
}

export async function getContactInfo(): Promise<ContactInfo> {
  const response = await fetch('/api/contact/info');
  if (!response.ok) {
    throw new Error('Failed to fetch contact info');
  }
  return response.json();
}
