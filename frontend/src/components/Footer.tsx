import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { getContactInfo } from '../services/api';
import type { ContactInfo } from '../services/api';

const InstagramIcon: React.FC<{ size?: number; color?: string; style?: React.CSSProperties }> = ({ size = 18, color = "currentColor", style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  useEffect(() => {
    getContactInfo()
      .then(setContactInfo)
      .catch((err) => console.error("Failed to load footer contact info:", err));
  }, []);

  return (
    <footer style={{
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: '60px 0 30px 0',
      fontFamily: 'var(--font-body)',
      fontSize: '0.9rem',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '40px',
        }}>
          {/* Brand & Motto column */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-title)',
              fontSize: '1.1rem',
              fontWeight: 600,
              marginBottom: '12px',
              color: '#ffffff',
            }}>
              NEASW Welfare Foundation
            </h4>
            <p style={{
              color: '#48bb78',
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: '0.95rem',
              margin: '0 0 16px 0',
              letterSpacing: '0.02em',
            }}>
              Motto: “Unity & Service”
            </p>
            <p style={{ color: '#a0aec0', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
              Empowering communities, preserving culture, and uniting youth across Northeast India and beyond.
            </p>
          </div>

          {/* Contact & HQ column */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              fontWeight: 700,
              marginBottom: '20px',
              color: '#ffffff',
            }}>
              Contact & HQ
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', color: '#a0aec0', padding: 0 }}>
              {contactInfo?.phones.map((phone, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={16} style={{ flexShrink: 0 }} /> {phone}
                </li>
              )) || (
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={16} style={{ flexShrink: 0 }} /> +91 6009-313275
                </li>
              )}
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} style={{ flexShrink: 0 }} /> <a href="mailto:ne.association.for.socialwelfare@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>ne.association.for.socialwelfare@gmail.com</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <InstagramIcon size={16} style={{ color: '#e1306c', flexShrink: 0 }} /> <a href={contactInfo?.socials.instagram || "https://www.instagram.com/neasw__?igsh=MW9xa3MyM3U2bGczOQ=="} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>@neasw__</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '4px', lineHeight: '1.4' }}>
                <MapPin size={16} style={{ flexShrink: 0, marginTop: '2px' }} /> <span><strong>Headquarters:</strong> {contactInfo?.headquarters || "50, Pandit Deen Dayal Upadhyaya Marg, Mata Sundari Railway Colony, Mandi House, Delhi, India 110002"}</span>
              </li>
            </ul>
          </div>

          {/* Our Location column */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              fontWeight: 700,
              marginBottom: '20px',
              color: '#ffffff',
            }}>
              Regional Presence
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', color: '#a0aec0', padding: 0 }}>
              {contactInfo?.locations.map((loc, idx) => (
                <li key={idx}>{loc}</li>
              )) || (
                <>
                  <li>Delhi</li>
                  <li>Nagaland</li>
                  <li>Arunachal Pradesh</li>
                  <li>Manipur</li>
                </>
              )}
            </ul>
          </div>

          {/* Our Partners column */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              fontWeight: 700,
              marginBottom: '20px',
              color: '#ffffff',
            }}>
              Our Partners
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', color: '#a0aec0', padding: 0 }}>
              {contactInfo?.partners?.map((partner, idx) => (
                <li key={idx}>
                  <a href={partner.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'} onMouseOut={(e) => e.currentTarget.style.color = '#a0aec0'}>
                    {partner.name}
                  </a>
                </li>
              )) || (
                <>
                  <li><a href="https://assamrifles.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Assam Rifles</a></li>
                  <li><a href="https://www.mha.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Ministry of Home Affairs</a></li>
                  <li><a href="https://mdoner.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Ministry of DoNER</a></li>
                  <li><a href="https://dst.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Dept of Science & Technology</a></li>
                </>
              )}
            </ul>
          </div>
        </div>

        <hr style={{ borderColor: 'rgba(255, 255, 255, 0.1)', margin: '30px 0 20px 0' }} />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#718096',
          fontSize: '0.8rem',
          flexWrap: 'wrap',
          gap: '15px',
        }}>
          <div>
            © 2026 NEASW Welfare Foundation
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: 'inherit' }}>Terms of Use</a>
            <a href="#" style={{ color: 'inherit' }}>Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
