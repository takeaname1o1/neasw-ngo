import React, { useEffect, useState } from 'react';
import { getContactInfo } from '../services/api';
import type { ContactInfo } from '../services/api';

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
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '40px',
        }}>
          {/* Contact column */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              fontWeight: 700,
              marginBottom: '20px',
              color: '#ffffff',
            }}>
              Contact
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', color: '#a0aec0', padding: 0 }}>
              {contactInfo?.phones.map((phone, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  📞 {phone}
                </li>
              )) || (
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  📞 +91 876 676 8888
                </li>
              )}
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                ✉️ <a href="mailto:ne.association.for.socialwelfare@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>ne.association.for.socialwelfare@gmail.com</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                📸 <a href={contactInfo?.socials.instagram || "https://www.instagram.com/neasw__?igsh=MW9xa3MyM3U2bGczOQ=="} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>@neasw__</a>
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
              Our Location
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', color: '#a0aec0', padding: 0 }}>
              {contactInfo?.locations.map((loc, idx) => (
                <li key={idx}>{loc}</li>
              )) || (
                <>
                  <li>Delhi</li>
                  <li>Nagaland</li>
                  <li>Arunachal Pradesh</li>
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
