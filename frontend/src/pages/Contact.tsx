import React, { useState, useEffect } from 'react';
import { Phone, Camera, Mail } from 'lucide-react';
import { submitContactForm } from '../services/api';
import { ConversionBlock } from '../components/ConversionBlock';
import contact1 from '../assets/contact1.png';
import contact2 from '../assets/contact2.png';
import contact3 from '../assets/contact3.png';
import tibe from '../assets/tibe.jpeg';

interface ContactProps {
  setCurrentPage: (page: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ setCurrentPage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [orgName, setOrgName] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const images = [contact1, tibe, contact2, contact3];
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await submitContactForm({
        name,
        email,
        phone_number: phone,
        organization_name: orgName || undefined,
        preferred_date: date || undefined,
        message,
      });

      setSuccess(response.message || "Thank you! Your spot has been reserved.");
      setName('');
      setEmail('');
      setPhone('');
      setOrgName('');
      setDate('');
      setMessage('');
    } catch (err: any) {
      setError(err.message || "Failed to submit message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fade-in-section" style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      
      {/* 1. Header Title */}
      <section style={{ padding: '60px 0 20px 0', textAlign: 'left' }}>
        <div className="container">
          <h1 style={{
            fontSize: '5rem',
            fontFamily: 'var(--font-title)',
            fontWeight: 500,
            color: 'var(--text-primary)',
            margin: 0,
            lineHeight: 1,
          }}>
            Contact Us
          </h1>
        </div>
      </section>

      {/* 2. Grid containing Form (left) & Portrait Image (right) */}
      <section className="container" style={{ padding: '20px 24px 60px 24px' }}>
        <div className="contact-main-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'stretch',
        }}>
          {/* Left Form Card */}
          <div className="contact-form-panel" style={{
            backgroundColor: '#fafafa',
            border: '1px solid var(--border-color)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.01)',
            borderRadius: '24px',
            padding: '50px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            {success ? (
              <div style={{
                padding: '30px',
                textAlign: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.03)',
                borderRadius: '12px',
                border: '1px solid #000000',
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>✓</div>
                <p style={{ fontWeight: 600, color: '#000000', margin: 0 }}>{success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px', textAlign: 'left' }}>
                {/* Name / Email row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.8rem', color: '#4a5568', fontWeight: 600, textTransform: 'uppercase' }}>Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      style={{
                        backgroundColor: '#f1f2f4',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        fontSize: '0.95rem',
                        fontFamily: 'var(--font-body)',
                        color: '#000000',
                      }}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.8rem', color: '#4a5568', fontWeight: 600, textTransform: 'uppercase' }}>Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      style={{
                        backgroundColor: '#f1f2f4',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        fontSize: '0.95rem',
                        fontFamily: 'var(--font-body)',
                        color: '#000000',
                      }}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Phone Number / Organization Name row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.8rem', color: '#4a5568', fontWeight: 600, textTransform: 'uppercase' }}>Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      style={{
                        backgroundColor: '#f1f2f4',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        fontSize: '0.95rem',
                        fontFamily: 'var(--font-body)',
                        color: '#000000',
                      }}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.8rem', color: '#4a5568', fontWeight: 600, textTransform: 'uppercase' }}>Organization Name</label>
                    <input
                      type="text"
                      value={orgName}
                      style={{
                        backgroundColor: '#f1f2f4',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        fontSize: '0.95rem',
                        fontFamily: 'var(--font-body)',
                        color: '#000000',
                      }}
                      onChange={(e) => setOrgName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Preferred date / Subject row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.8rem', color: '#4a5568', fontWeight: 600, textTransform: 'uppercase' }}>Preferred date</label>
                    <input
                      type="date"
                      value={date}
                      style={{
                        backgroundColor: '#f1f2f4',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        fontSize: '0.95rem',
                        fontFamily: 'var(--font-body)',
                        color: '#000000',
                      }}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.8rem', color: '#4a5568', fontWeight: 600, textTransform: 'uppercase' }}>Subject</label>
                    <input
                      type="text"
                      style={{
                        backgroundColor: '#f1f2f4',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        fontSize: '0.95rem',
                        fontFamily: 'var(--font-body)',
                        color: '#000000',
                      }}
                    />
                  </div>
                </div>

                {/* Message / Special Requests */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.8rem', color: '#4a5568', fontWeight: 600, textTransform: 'uppercase' }}>Message / Special Requests</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    style={{
                      backgroundColor: '#f1f2f4',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      fontSize: '0.95rem',
                      fontFamily: 'var(--font-body)',
                      color: '#000000',
                      resize: 'none',
                    }}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                {error && (
                  <div style={{ color: 'red', fontSize: '0.9rem' }}>
                    {error}
                  </div>
                )}

                {/* Buttons block */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      padding: '14px 28px',
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      borderRadius: '9999px',
                      border: 'none',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '0.925rem',
                      fontFamily: 'var(--font-body)',
                      transition: 'opacity 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    {submitting ? 'Reserving...' : 'Reserve a Spot'}
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1.25rem',
                      transition: 'opacity 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    ↗
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Image Card Carousel */}
          <div style={{
            borderRadius: '24px',
            overflow: 'hidden',
            position: 'relative',
            height: '100%',
            minHeight: '480px',
          }}>
            {[contact1, tibe, contact2, contact3].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`NEASW Impact ${index + 1}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '24px',
                  opacity: currentImageIndex === index ? 1 : 0,
                  transition: 'opacity 1s ease-in-out',
                }}
              />
            ))}
            {/* Carousel Navigation Indicators */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '8px',
              zIndex: 2,
              backgroundColor: 'rgba(0,0,0,0.3)',
              padding: '6px 12px',
              borderRadius: '20px',
              backdropFilter: 'blur(4px)',
            }}>
              {[contact1, tibe, contact2, contact3].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  style={{
                    width: currentImageIndex === index ? '20px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: currentImageIndex === index ? '#ffffff' : 'rgba(255,255,255,0.5)',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Channels info block (Phone, Social, Mail) */}
      <section className="container" style={{ padding: '60px 24px', borderTop: '1px solid var(--border-color)' }}>
        <div className="contact-channels" style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          gap: '40px',
          justifyContent: 'space-evenly',
          alignItems: 'flex-start',
        }}>
          {/* Phone */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center', flex: 1 }}>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              backgroundColor: '#f1f2f4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Phone size={26} strokeWidth={1.5} style={{ color: '#000000' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, fontFamily: 'var(--font-title)', margin: 0, color: '#000000', textAlign: 'center' }}>Call & Whatsapp</h3>
              <p style={{ color: '#718096', fontSize: '1rem', margin: 0, textAlign: 'center' }}>+91 876 676 8888</p>
              <p style={{ color: '#718096', fontSize: '1rem', margin: 0, textAlign: 'center' }}>+91 876 676 8888</p>
            </div>
          </div>

          {/* Social */}
          <a 
            href="https://www.instagram.com/neasw__?igsh=MW9xa3MyM3U2bGczOQ==" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center', flex: 1, textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              backgroundColor: '#f1f2f4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s'
            }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f1f2f4'}
            >
              <Camera size={26} strokeWidth={1.5} style={{ color: '#000000' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, fontFamily: 'var(--font-title)', margin: 0, color: '#000000', textAlign: 'center' }}>Instagram</h3>
              <p style={{ color: '#718096', fontSize: '1rem', margin: 0, textAlign: 'center' }}>@neasw__</p>
            </div>
          </a>

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center', flex: 1 }}>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              backgroundColor: '#f1f2f4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Mail size={26} strokeWidth={1.5} style={{ color: '#000000' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, fontFamily: 'var(--font-title)', margin: 0, color: '#000000', textAlign: 'center' }}>Write Us</h3>
              <p style={{ color: '#718096', fontSize: '1rem', margin: 0, textAlign: 'center' }}>neasw.welfare@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Support Northeast promotions banner container */}
      <section className="container" style={{ padding: '60px 24px' }}>
        <div style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '24px',
          padding: '60px 40px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: '40px', maxWidth: '750px' }}>
            <h2 style={{
              fontFamily: 'var(--font-title)',
              fontSize: '2.5rem',
              fontWeight: 500,
              marginBottom: '12px',
              color: 'var(--text-primary)',
            }}>
              Discover, Experience & Support Northeast
            </h2>
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-muted)',
              lineHeight: 1.5,
            }}>
              Explore Northeast India's natural beauty and support local communities by choosing organic products.
            </p>
          </div>

          {/* Double promo grid */}
          <div className="promo-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            width: '100%',
          }}>
            {/* Promo Card 1 */}
            <div style={{
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '20px',
              backgroundColor: '#ffffff',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, textAlign: 'left' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  Plan Your Northeast Adventure
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.5, margin: 0 }}>
                  From stunning landscapes to vibrant cultures, discover the unexplored beauty of the Northeast.
                </p>
              </div>
              <img
                src={contact2}
                alt="Northeast Landscape"
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                }}
              />
            </div>

            {/* Promo Card 2 */}
            <div style={{
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '20px',
              backgroundColor: '#ffffff',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, textAlign: 'left' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  Choose Organic, Choose Better
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.5, margin: 0 }}>
                  Support local farmers and bring home pure, natural and organic products from the Northeast.
                </p>
              </div>
              <img
                src={contact3}
                alt="Organic Cardamom Box"
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Reusable Conversion Banner */}
      <ConversionBlock setCurrentPage={setCurrentPage} />

      <style>{`
        @media (min-width: 992px) {
          .contact-main-grid {
            grid-template-columns: 1.3fr 1fr !important;
          }
        }
        @media (max-width: 768px) {
          h1 {
            font-size: 3.5rem !important;
          }
          .promo-grid {
            grid-template-columns: 1fr !important;
          }
          .contact-channels {
            flex-direction: column !important;
            align-items: center !important;
            gap: 30px !important;
          }
          .contact-form-panel {
            padding: 30px 20px !important;
          }
        }
      `}</style>
    </div>
  );
};
