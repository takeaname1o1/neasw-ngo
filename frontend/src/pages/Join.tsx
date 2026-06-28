import React, { useEffect, useState } from 'react';
import { Loader, X } from 'lucide-react';
import { getVolunteerPlans, submitContactForm } from '../services/api';
import type { VolunteerPlan } from '../services/api';
import joinBackground from '../assets/JoinNEASW.png';

export const Join: React.FC = () => {
  const [plans, setPlans] = useState<VolunteerPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Modal registration state
  const [selectedPlan, setSelectedPlan] = useState<VolunteerPlan | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    getVolunteerPlans()
      .then((data) => {
        setPlans(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load plans:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const fallbackPlans = [
    {
      id: 1,
      duration_months: 6,
      title: "6 Months Plan",
      features: [
        "Volunteer Certificate",
        "Practical field experience",
        "Skill-building workshops",
        "Networking opportunities"
      ]
    },
    {
      id: 2,
      duration_months: 12,
      title: "12 Months Plan",
      features: [
        "Everything in 6 months plan +",
        "Leadership opportunities",
        "Recommendation Letter",
        "Internship Certificate",
        "Event management experience"
      ]
    },
    {
      id: 3,
      duration_months: 24,
      title: "24 Months Plan",
      features: [
        "Everything in 12 months plan +",
        "Project Coordinator eligibility",
        "Sponsored training opportunities",
        "Priority for paid projects (when available)",
        "Official NEASW Ambassador status",
        "Exclusive invitations to partner events"
      ]
    }
  ];

  const displayPlans = error || plans.length === 0 ? fallbackPlans : plans;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage(null);
    setSubmitError(null);

    try {
      const response = await submitContactForm({
        name,
        email,
        phone_number: phone,
        organization_name: `Volunteer Application (${selectedPlan?.title})`,
        preferred_date: date,
        message: `Registered interest for the ${selectedPlan?.title} (${selectedPlan?.duration_months} months).`,
      });

      setSubmitMessage(response.message || "Registration successful!");
      setName('');
      setEmail('');
      setPhone('');
      setDate('');
      setTimeout(() => {
        setSelectedPlan(null);
        setSubmitMessage(null);
      }, 3000);
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit application.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      backgroundColor: '#0a0d14',
      minHeight: '100vh',
      padding: '120px 24px 60px 24px',
      color: '#ffffff',
      fontFamily: 'var(--font-body)',
    }}>
      <div className="join-card-container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        borderRadius: '32px',
        overflow: 'hidden',
        backgroundImage: `url(${joinBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
      }}>
        {/* Dark overlay for contrast */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(10, 13, 20, 0.45)',
          zIndex: 1,
        }} />

        {/* Content Wrapper */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          padding: '80px 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '60px', maxWidth: '800px' }}>
            <h1 style={{
              fontFamily: 'var(--font-title)',
              fontSize: '4.2rem',
              fontWeight: 500,
              lineHeight: 1.1,
              marginBottom: '16px',
              color: '#ffffff',
            }}>
              Join To make an Impact
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(255, 255, 255, 0.85)',
              lineHeight: 1.5,
              fontWeight: 400,
            }}>
              Join thousands of students, volunteers and community leaders creating meaningful change.
            </p>
          </div>

          {/* 3-column volunteer plans grid */}
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px', gap: '10px' }}>
              <Loader className="animate-spin" size={24} style={{ color: '#ffffff' }} />
              <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Loading volunteer plans...</span>
            </div>
          ) : (
            <div className="plans-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px',
              width: '100%',
              alignItems: 'stretch',
            }}>
              {displayPlans.map((plan) => {
                const isHighlight = plan.duration_months === 12;
                return (
                  <div
                    key={plan.id}
                    style={{
                      backgroundColor: isHighlight ? 'rgba(255, 255, 255, 0.12)' : '#ffffff',
                      backdropFilter: isHighlight ? 'blur(16px)' : 'none',
                      WebkitBackdropFilter: isHighlight ? 'blur(16px)' : 'none',
                      border: isHighlight ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                      color: isHighlight ? '#ffffff' : '#000000',
                      padding: '50px 30px',
                      borderRadius: '4px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                    }}
                  >
                    <div>
                      {/* Big number and title */}
                      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                        <span style={{
                          fontSize: '4.5rem',
                          fontFamily: 'var(--font-title)',
                          fontWeight: 500,
                          lineHeight: '1',
                        }}>
                          {plan.duration_months}
                        </span>
                        <span style={{
                          fontSize: '1.8rem',
                          fontFamily: 'var(--font-title)',
                          fontWeight: 500,
                          marginTop: '5px',
                        }}>
                          {plan.title}
                        </span>
                      </div>

                      <hr style={{
                        borderColor: isHighlight ? 'rgba(255, 255, 255, 0.2)' : '#e2e8f0',
                        margin: '20px 0',
                      }} />

                      {/* Description */}
                      <p style={{
                        fontSize: '0.925rem',
                        lineHeight: 1.5,
                        color: isHighlight ? 'rgba(255, 255, 255, 0.8)' : 'var(--text-muted)',
                        marginBottom: '30px',
                      }}>
                        {plan.duration_months === 6 
                          ? "Build skills through meaningful volunteering." 
                          : plan.duration_months === 12 
                          ? "Grow your experience and expand your impact." 
                          : "Become a leader in community transformation."}
                      </p>

                      {/* Features list */}
                      <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: '0 0 40px 0',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px',
                      }}>
                        {plan.features.map((feat, fIdx) => {
                          let displayFeat = feat;
                          if (feat.toLowerCase().startsWith('everything in 6 months plan')) {
                            displayFeat = 'Everything in 6 months plan +';
                          } else if (feat.toLowerCase().startsWith('everything in 12 months plan')) {
                            displayFeat = 'Everything in 12 months plan +';
                          }
                          return (
                            <li key={fIdx} style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '8px',
                              fontSize: '0.925rem',
                              lineHeight: 1.4,
                              color: isHighlight ? '#ffffff' : '#000000',
                            }}>
                              <span>→</span>
                              <span>{displayFeat}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* CTA button */}
                    <button
                      onClick={() => setSelectedPlan(plan)}
                      style={{
                        width: '100%',
                        padding: '14px',
                        backgroundColor: isHighlight ? '#ffffff' : '#000000',
                        color: isHighlight ? '#000000' : '#ffffff',
                        border: 'none',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: '0.925rem',
                        fontFamily: 'var(--font-body)',
                        transition: 'opacity 0.2s',
                        borderRadius: '0px',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                      onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      Explore Now
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Registration Modal Overlay */}
      {selectedPlan && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          padding: '20px',
        }}>
          <div className="card-panel" style={{
            maxWidth: '500px',
            width: '100%',
            padding: '50px 40px',
            backgroundColor: '#ffffff',
            position: 'relative',
            borderRadius: '8px',
            color: '#000000',
          }}>
            <button
              onClick={() => setSelectedPlan(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              <X size={22} />
            </button>

            <h3 style={{ fontSize: '1.75rem', marginBottom: '8px', color: '#000000', fontFamily: 'var(--font-title)' }}>Register Interest</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '30px' }}>
              Applying for the <strong>{selectedPlan.title}</strong> volunteer program.
            </p>

            {submitMessage ? (
              <div style={{
                padding: '20px',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                border: '1px solid #000000',
                color: '#000000',
                textAlign: 'center',
                fontWeight: 600,
              }}>
                {submitMessage}
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem', color: '#4a5568', fontWeight: 600, textTransform: 'uppercase' }}>Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    className="input-underlined"
                    style={{ borderBottom: '1px solid #a0aec0', color: '#000000' }}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem', color: '#4a5568', fontWeight: 600, textTransform: 'uppercase' }}>Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    className="input-underlined"
                    style={{ borderBottom: '1px solid #a0aec0', color: '#000000' }}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem', color: '#4a5568', fontWeight: 600, textTransform: 'uppercase' }}>Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    className="input-underlined"
                    style={{ borderBottom: '1px solid #a0aec0', color: '#000000' }}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem', color: '#4a5568', fontWeight: 600, textTransform: 'uppercase' }}>Preferred Start Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    className="input-underlined"
                    style={{ borderBottom: '1px solid #a0aec0', color: '#000000' }}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                {submitError && (
                  <div style={{ color: 'red', fontSize: '0.9rem', marginTop: '10px' }}>
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer',
                    marginTop: '10px',
                  }}
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {styleTag}
      
      <style>{`
        @media (max-width: 768px) {
          .join-card-container {
            border-radius: 16px !important;
          }
          .join-card-container > div {
            padding: 40px 20px !important;
          }
          .plans-grid {
            gap: 20px !important;
          }
          h1 {
            font-size: 2.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

const styleTag = (
  <style>{`
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .animate-spin {
      animation: spin 1s linear infinite;
    }
  `}</style>
);
