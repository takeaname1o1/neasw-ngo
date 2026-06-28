import React from 'react';

interface ConversionBlockProps {
  setCurrentPage: (page: string) => void;
}

export const ConversionBlock: React.FC<ConversionBlockProps> = ({ setCurrentPage }) => {
  return (
    <section style={{
      backgroundColor: '#0a0d14',
      color: '#ffffff',
      padding: '90px 0',
      textAlign: 'left',
    }}>
      <div className="container offer-conversion-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '60px',
        alignItems: 'center',
      }}>
        {/* Left info segment */}
        <div>
          <h2 style={{
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            lineHeight: 1.15,
            marginBottom: '20px',
            color: '#ffffff',
            fontWeight: 400,
          }}>
            Building A Stronger <br /> Northeast Together
          </h2>
          <p style={{
            color: '#a0aec0',
            fontSize: '1.1rem',
            lineHeight: 1.6,
            maxWidth: '480px',
            margin: 0,
          }}>
            Join thousands of students, volunteers and community leaders creating meaningful change.
          </p>
        </div>

        {/* Right Action cards stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Volunteer card */}
          <div
            onClick={() => {
              setCurrentPage('join');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 'var(--border-radius-card)',
              padding: '30px',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#ffffff';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>Become a Volunteer</h3>
              <span style={{ fontSize: '1.35rem', color: '#ffffff' }}>↗</span>
            </div>
            <p style={{ color: '#a0aec0', fontSize: '0.875rem', lineHeight: 1.5, margin: 0 }}>
              Join our network of dedicated volunteers and help make a difference through community service, mentoring, and cultural exchange.
            </p>
          </div>

          {/* Partner card */}
          <div
            onClick={() => {
              setCurrentPage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 'var(--border-radius-card)',
              padding: '30px',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#ffffff';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>Partner With Us</h3>
              <span style={{ fontSize: '1.35rem', color: '#ffffff' }}>↗</span>
            </div>
            <p style={{ color: '#a0aec0', fontSize: '0.875rem', lineHeight: 1.5, margin: 0 }}>
              Collaborate with us on projects, sponsorships, and initiatives that support local communities.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .offer-conversion-grid {
            grid-template-columns: 1.2fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
