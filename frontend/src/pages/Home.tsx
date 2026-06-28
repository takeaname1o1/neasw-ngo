import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { ConversionBlock } from '../components/ConversionBlock';

// Import high-quality local assets
import homeHeroBg from '../assets/home_top_banner.png'; 
import impactPortrait from '../assets/intro_portrait.png';
import introGroupLeader from '../assets/intro_group_leader.png';
import introStage from '../assets/intro_stage.png';
import introChildrenClassroom from '../assets/intro_children_classroom.png';
import contact1 from '../assets/contact1.png';
import contact2 from '../assets/contact2.png';
import contact3 from '../assets/contact3.png';
import assamRiflesLogo from '../assets/assam_rifles_logo.png';
import mhaLogo from '../assets/mha_logo.png';

interface HomeProps {
  setCurrentPage: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('Core Packages');

  const faqData: { [key: string]: { q: string; a: string }[] } = {
    'Core Packages': [
      { q: "What kind of social packages does NEASW offer?", a: "We provide a range of social initiatives including educational aid, cultural exchanges, and grassroots development. Programs range from a few weeks to several months depending on your commitment level." },
      { q: "Can I customize my involvement package?", a: "Yes, you can work directly with our coordinators to customize your sponsorship scope, volunteer timeline, or program focus areas." }
    ],
    'Booking & Payment': [
      { q: "How can I submit my donation payment?", a: "Donations can be safely processed via our online banking gateway or direct bank transfers. We are fully transparent about allocation." },
      { q: "Are donations tax-exempt under section 80G?", a: "Yes, all donations qualify for tax exemptions under registration rules. Receipts are sent immediately." }
    ],
    'Volunteer Services': [
      { q: "How long do your internship roles last?", a: "Our typical volunteer and internship projects run from 4 weeks up to 6 months." },
      { q: "Is training provided for field operations?", a: "Yes, comprehensive local briefings, safety workshops, and community immersion training are provided." }
    ],
    'Field Work': [
      { q: "Are meals included in the field packages?", a: "Meals and basic local homestay accommodations are provided for active field coordinators during volunteer rounds." },
      { q: "What regions do the field programs cover?", a: "We cover remote hill circles and rural villages across the Northeast states, including Assam, Meghalaya, and Nagaland." }
    ],
    'Student Support': [
      { q: "What level of support staff is included?", a: "Our programs include dedicated academic mentors, local translation support, and administrative staff." },
      { q: "Are there age limits for volunteering?", a: "Volunteers must be at least 18 years old. We welcome youth, professionals, and senior citizens alike." }
    ]
  };

  return (
    <div className="fade-in-section" style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      
      {/* 1. Hero Section */}
      <section style={{
        height: '85vh',
        minHeight: '600px',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${homeHeroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        <div style={{ textAlign: 'center', zIndex: 2, padding: '0 20px' }}>
          <h1 style={{
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            color: '#ffffff',
            lineHeight: 1.05,
            letterSpacing: '0.02em',
            margin: 0,
            textTransform: 'uppercase',
            fontWeight: 500,
          }}>
            NEASW <br/> WELFARE <br/> FOUNDATION
          </h1>
        </div>
        {/* Slider Pagination Mockup */}
        <div style={{ position: 'absolute', bottom: '40px', display: 'flex', gap: '8px', background: '#ffffff', padding: '10px 20px', borderRadius: '30px', alignItems: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#000000' }}></span>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#cccccc' }}></span>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#cccccc' }}></span>
          <span style={{ marginLeft: '10px', fontSize: '1.2rem', lineHeight: 1, cursor: 'pointer' }}>→</span>
        </div>
      </section>

      {/* 2. Creating Impact Section */}
      <section className="container" style={{ padding: '90px 24px' }}>
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '3rem', 
          fontFamily: 'var(--font-title)', 
          marginBottom: '60px',
          fontWeight: 500,
          color: 'var(--text-primary)',
          lineHeight: 1.15,
        }}>
          Creating Impact Across <br/> the Northeast
        </h2>
        
        <div className="home-impact-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '50px',
          alignItems: 'center',
          marginBottom: '60px',
          textAlign: 'left',
        }}>
          {/* Left Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)', lineHeight: 1.3 }}>Empowering Communities, Creating Lasting Change</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, fontSize: '1.05rem' }}>
              At NEASW Welfare Foundation, we are committed to uplifting the regions of the Northeast people through sustainable social initiatives.
            </p>
            <button 
              onClick={() => {
                setCurrentPage('work');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ 
                padding: '12px 28px', 
                background: '#000000', 
                color: '#ffffff', 
                borderRadius: '30px', 
                border: 'none', 
                cursor: 'pointer',
                fontWeight: 600,
                alignSelf: 'flex-start',
                transition: 'opacity 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              Read More
            </button>
          </div>
          
          {/* Center Image */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img 
              src={impactPortrait} 
              alt="Impact" 
              style={{ 
                width: '100%', 
                maxWidth: '320px', 
                height: '380px', 
                objectFit: 'cover', 
                borderRadius: '24px',
                border: '1px solid var(--border-color)',
              }} 
            />
          </div>

          {/* Right Stats/Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>50+ Members</h4>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>A strong network of volunteers dedicated to grassroots development.</p>
            </div>
            <div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>Cultural Awareness</h4>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>Preserving and promoting the rich heritage of Northeast India.</p>
            </div>
            <div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>Annual Revenue</h4>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>Transparent fund allocation for community welfare programs.</p>
            </div>
          </div>
        </div>

        {/* Partners Strip */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '40px', flexWrap: 'wrap', gap: '24px' }}>
          <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>Our Partners</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
            <img src={assamRiflesLogo} alt="Assam Rifles" style={{ height: '40px', objectFit: 'contain', filter: 'grayscale(100%) opacity(40%)' }} />
            <img src={mhaLogo} alt="MHA" style={{ height: '40px', objectFit: 'contain', filter: 'grayscale(100%) opacity(40%)' }} />
          </div>
        </div>
      </section>

      {/* 3. Meet Our Leadership (Dark Section) */}
      <section style={{ backgroundColor: '#0a0d14', color: '#ffffff', padding: '90px 24px' }}>
        <div className="container home-leadership-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '50px', alignItems: 'center' }}>
          {/* Overlapping images stack */}
          <div className="leadership-collage" style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
             <img src={introGroupLeader} alt="Leader 1" style={{ width: '110px', height: '170px', objectFit: 'cover', borderRadius: '16px', border: '2px solid #0a0d14' }} />
             <img src={impactPortrait} alt="Leader 2" style={{ width: '130px', height: '190px', objectFit: 'cover', borderRadius: '16px', border: '2px solid #0a0d14', marginTop: '-30px' }} />
             <img src={contact1} alt="Leader 3" style={{ width: '110px', height: '170px', objectFit: 'cover', borderRadius: '16px', border: '2px solid #0a0d14' }} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <h2 style={{ fontSize: '2.8rem', fontFamily: 'var(--font-title)', marginBottom: '20px', fontWeight: 500, color: '#ffffff' }}>Meet Our Leadership</h2>
            <p style={{ color: '#a0aec0', lineHeight: 1.6, marginBottom: '30px', fontSize: '1.05rem' }}>
              Meet the dedicated individuals who drive our mission forward and inspire change across communities.
            </p>
            <button 
              onClick={() => {
                setCurrentPage('join');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ 
                padding: '12px 28px', 
                background: '#ffffff', 
                color: '#000000', 
                borderRadius: '30px', 
                border: 'none', 
                cursor: 'pointer', 
                fontWeight: 600,
                transition: 'opacity 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              Join Us
            </button>
          </div>
        </div>
      </section>

      {/* 4. Flagship Initiatives */}
      <section style={{ padding: '90px 0', overflow: 'hidden' }}>
        <div className="container" style={{ marginBottom: '50px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-title)', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '8px' }}>Our Flagship Initiatives</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', margin: 0 }}>Discover programs that create tangible differences across communities.</p>
        </div>
        
        {/* Carousel Mockup */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', padding: '0 24px', position: 'relative' }}>
          <div style={{ flexShrink: 0, width: '20%', height: '220px', borderRadius: '16px', overflow: 'hidden', opacity: 0.3 }}>
            <img src={contact2} alt="Initiative Left" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flexShrink: 0, width: '55%', height: '380px', borderRadius: '16px', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '24px' }}>
             <img src={introStage} alt="Initiative Center" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
             <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(transparent, rgba(0,0,0,0.6))', zIndex: 2 }}></div>
             <h3 style={{ fontSize: '1.65rem', fontWeight: 600, fontFamily: 'var(--font-title)', color: '#ffffff', zIndex: 3, margin: 0 }}>Unity Chorus</h3>
          </div>
          <div style={{ flexShrink: 0, width: '20%', height: '220px', borderRadius: '16px', overflow: 'hidden', opacity: 0.3 }}>
            <img src={introChildrenClassroom} alt="Initiative Right" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* 5. Explore Our Programs */}
      <section className="container" style={{ padding: '80px 24px', backgroundColor: '#fafafa', borderRadius: '40px', marginBottom: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-title)', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '8px' }}>Explore Our Programs</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', margin: 0 }}>Initiatives focused on education, welfare, and sustainability.</p>
        </div>

        <div className="home-programs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Program Card 1 */}
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', display: 'flex', gap: '20px', border: '1px solid var(--border-color)', textAlign: 'left' }}>
            <img src={introChildrenClassroom} alt="Educational Support" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Educational Support</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.45 }}>Providing scholarships and resources to underprivileged students.</p>
              <a 
                href="#learn" 
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('work');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ fontSize: '0.85rem', fontWeight: 600, color: '#000000', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                Learn More <ChevronRight size={16}/>
              </a>
            </div>
          </div>
          
          {/* Program Card 2 */}
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', display: 'flex', gap: '20px', border: '1px solid var(--border-color)', textAlign: 'left' }}>
            <img src={contact3} alt="Artisanal Markets" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Artisanal Markets</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.45 }}>Empowering local craftsmen by providing platforms for their goods.</p>
              <a 
                href="#learn" 
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('work');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ fontSize: '0.85rem', fontWeight: 600, color: '#000000', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                Learn More <ChevronRight size={16}/>
              </a>
            </div>
          </div>

          {/* Program Card 3 */}
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', display: 'flex', gap: '20px', border: '1px solid var(--border-color)', textAlign: 'left' }}>
            <img src={introStage} alt="Relief Operations" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Relief Operations</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.45 }}>Crisis logistics coordinate distribution of essential aid.</p>
              <a 
                href="#learn" 
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('work');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ fontSize: '0.85rem', fontWeight: 600, color: '#000000', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                Learn More <ChevronRight size={16}/>
              </a>
            </div>
          </div>

          {/* Program Card 4 */}
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', display: 'flex', gap: '20px', border: '1px solid var(--border-color)', textAlign: 'left' }}>
            <img src={contact2} alt="Eco-Tourism homestays" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Eco-Tourism Homestays</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.45 }}>Promoting community homestays and regional eco circuits.</p>
              <a 
                href="#learn" 
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('work');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ fontSize: '0.85rem', fontWeight: 600, color: '#000000', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                Learn More <ChevronRight size={16}/>
              </a>
            </div>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button 
            onClick={() => {
              setCurrentPage('work');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ 
              padding: '12px 36px', 
              background: '#000000', 
              color: '#ffffff', 
              borderRadius: '30px', 
              border: 'none', 
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'opacity 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            View All
          </button>
        </div>
      </section>

      {/* 6. Stories of Change (Testimonials) */}
      <section style={{ backgroundColor: '#0a0d14', color: '#ffffff', padding: '90px 24px' }}>
        <div className="container">
          <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-title)', fontWeight: 500, color: '#ffffff', marginBottom: '40px', textAlign: 'center' }}>Stories of Change</h2>
          
          <div className="home-testimonial-card" style={{ background: '#f8f9fa', color: '#000000', borderRadius: '24px', padding: '50px 40px', display: 'flex', gap: '40px', alignItems: 'center', textAlign: 'left' }}>
            <img src={contact1} alt="Testimonial Profile" style={{ width: '260px', height: '260px', objectFit: 'cover', borderRadius: '16px', flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: '1.45rem', fontWeight: 500, lineHeight: 1.4, marginBottom: '24px', fontFamily: 'var(--font-title)', color: '#000000' }}>
                "Every effort helped me connect with fellow students from across the Northeast, and that changed my view of unity."
              </p>
              <div>
                <strong style={{ display: 'block', fontSize: '1.1rem', color: '#000000' }}>R. B. Sangma</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>Volunteer | 2022 Batch</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Frequently Asked Questions */}
      <section className="container" style={{ padding: '90px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-title)', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '8px' }}>Frequently Asked Questions</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', margin: 0 }}>Answers to the questions we get asked the most.</p>
        </div>

        <div className="home-faq-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', alignItems: 'start' }}>
          {/* FAQ Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {Object.keys(faqData).map((cat, idx) => {
              const isActive = activeCategory === cat;
              return (
                <button 
                  key={idx} 
                  onClick={() => {
                    setActiveCategory(cat);
                    setActiveFaq(0);
                  }}
                  style={{ 
                    textAlign: 'center', 
                    padding: '12px 20px', 
                    background: isActive ? '#000000' : 'transparent', 
                    color: isActive ? '#ffffff' : '#666666', 
                    border: '1px solid ' + (isActive ? '#000000' : '#dddddd'), 
                    borderRadius: '30px', 
                    cursor: 'pointer', 
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* FAQ Accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
            {faqData[activeCategory].map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  style={{ 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '16px', 
                    padding: '24px', 
                    cursor: 'pointer',
                    backgroundColor: isOpen ? '#fafafa' : '#ffffff',
                    transition: 'background-color 0.2s',
                  }} 
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                    <span>{faq.q}</span>
                    <span style={{ fontSize: '1.35rem', color: '#666666' }}>{isOpen ? '−' : '+'}</span>
                  </div>
                  {isOpen && (
                    <p style={{ marginTop: '16px', color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.5, margin: '16px 0 0 0' }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Conversion Banner (Dark) */}
      <ConversionBlock setCurrentPage={setCurrentPage} />

      {/* Responsive Styles Injection */}
      <style>{`
        @media (min-width: 992px) {
          .home-impact-grid {
            grid-template-columns: 1.1fr 0.9fr 1.1fr !important;
          }
          .home-leadership-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .home-faq-grid {
            grid-template-columns: 240px 1fr !important;
          }
          .home-faq-grid > div:first-child {
            flex-direction: column !important;
            justify-content: start !important;
          }
        }
        @media (max-width: 768px) {
          .home-testimonial-card {
            flex-direction: column !important;
            padding: 30px 20px !important;
            text-align: center !important;
          }
          .home-testimonial-card img {
            width: 100% !important;
            max-width: 220px !important;
            height: 220px !important;
          }
          .home-programs-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
