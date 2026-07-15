import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { ConversionBlock } from '../components/ConversionBlock';

// Import high-quality local assets
import homeHeroBg from '../assets/home/home_banner.png'; 
import impactPortrait from '../assets/intro_portrait.png';
import impactHome from '../assets/home/impact.png';
import introGroupLeader from '../assets/intro_group_leader.png';
import unityUtsavBanner from '../assets/UnityUtsav/bannerUU.png';
import introChildrenClassroom from '../assets/intro_children_classroom.png';
import educationalSupportImg from '../assets/programs/EducationalSupport.png';
import reliefAidImg from '../assets/programs/ReliefHumanitarianAid.png';
import northeastTourismImg from '../assets/programs/NortheastTourism.png';
import contact1 from '../assets/contact1.png';
import contact2 from '../assets/contact2.png';
import assamRiflesLogo from '../assets/partner/Assam_rifles.png';
import homeAffairsLogo from '../assets/partner/Home_Affairs.png';
import neDonerLogo from '../assets/partner/NE_doner.png';
import scienceTechnoLogo from '../assets/partner/science_techno.png';

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
              NEASW works with students. youth leaders, communities and institutions to promote education, cultural preservation, social welfare and national integration.
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
              About Us
            </button>
          </div>
          
          {/* Center Image */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img 
              src={impactHome} 
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
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>Youth Leadership</h4>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>Empowering young people through sports, cultural exchange, leadership programs, and skill development opportunities.</p>
            </div>
            <div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>Relief & Humanitarian Support</h4>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>Providing timely assistance during emergencies and supporting vulnerable communities with essential resources.</p>
            </div>
            <div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>Cultural Preservation</h4>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>Promoting and celebrating the rich traditions, languages, and heritage of Northeast India through events and exchanges.</p>
            </div>
          </div>
        </div>

        {/* Partners Strip */}
        <div style={{ 
          borderTop: '1px solid var(--border-color)', 
          paddingTop: '60px', 
          marginTop: '45px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '35px',
          alignItems: 'center' 
        }}>
          <span style={{ 
            fontWeight: 700, 
            textTransform: 'uppercase', 
            fontSize: '0.8rem', 
            color: 'var(--text-muted)', 
            letterSpacing: '0.12em',
            position: 'relative',
            display: 'inline-block',
            paddingBottom: '10px',
            margin: 0
          }}>
            Our Partners
            <span style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '24px',
              height: '2px',
              backgroundColor: '#000000',
              borderRadius: '2px'
            }}></span>
          </span>
          
          <div 
            className="partner-logo-grid"
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              gap: '24px', 
              width: '100%',
              maxWidth: '1200px',
              boxSizing: 'border-box'
            }}
          >
            {[
              { logo: assamRiflesLogo, alt: "Assam Rifles" },
              { logo: homeAffairsLogo, alt: "Ministry of Home Affairs" },
              { logo: neDonerLogo, alt: "Ministry of Development of North Eastern Region" },
              { logo: scienceTechnoLogo, alt: "Department of Science & Technology" }
            ].map((partner, index) => (
              <div 
                key={index}
                className="partner-logo-card"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  borderRadius: '16px',
                  padding: '20px 32px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100px',
                  flex: '1 1 0px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.015)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
              >
                <img 
                  src={partner.logo} 
                  alt={partner.alt} 
                  style={{ 
                    maxHeight: '100%', 
                    maxWidth: '100%', 
                    objectFit: 'contain', 
                    filter: 'grayscale(100%) opacity(50%)',
                    transition: 'all 0.3s ease',
                  }} 
                />
              </div>
            ))}
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
              Guided by a passionate team committed to building a stronger, united and empowered Northeast.
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
              View All
            </button>
          </div>
        </div>
      </section>

      {/* 4. Flagship Initiatives */}
      <section style={{ padding: '90px 0', overflow: 'hidden' }}>
        <div className="container" style={{ marginBottom: '50px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-title)', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '8px' }}>Our Flagship Initiatives</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', margin: 0 }}>Major platforms that bring youth together, colobrate culture and drive national integration.</p>
        </div>
        
        {/* Carousel Mockup */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', padding: '0 24px', position: 'relative' }}>
          <div style={{ flexShrink: 0, width: '20%', height: '220px', borderRadius: '16px', overflow: 'hidden', opacity: 0.3 }}>
            <img src={contact2} alt="Initiative Left" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flexShrink: 0, width: '55%', height: '380px', borderRadius: '16px', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '24px' }}>
             <img src={unityUtsavBanner} alt="Initiative Center" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
             <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(transparent, rgba(0,0,0,0.6))', zIndex: 2 }}></div>
             <div style={{ zIndex: 3, display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
               <h3 style={{ fontSize: '1.85rem', fontWeight: 600, fontFamily: 'var(--font-title)', color: '#ffffff', margin: 0 }}>Unity Utsav</h3>
               <p style={{ fontSize: '0.98rem', color: '#e2e8f0', margin: 0, lineHeight: 1.45, fontWeight: 400 }}>The largest student cultural and sports festival for Northeasterns in Delhi.</p>
             </div>
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
            <img src={educationalSupportImg} alt="Educational Support" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Educational Support</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.45 }}>Scholarships, learning resources, digital literacy initiatives, and guidance for students from underserved communities.</p>
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
            <img src={northeastTourismImg} alt="Northeast Tourism" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Northeast Tourism</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.45 }}>Promoting the natural beauty. culture, and hidden gems of Northeast India. Discover destinations, experiences, and responsible tourism opportunities.</p>
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
            <img src={reliefAidImg} alt="Relief Operations" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Relief & Humanitarian Aid</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.45 }}>Providing emergency assistance, relief materials, and support to communities affected by disasters and crises.</p>
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
              <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Local Products</h4>
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
        .partner-logo-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06) !important;
          border-color: rgba(0, 0, 0, 0.12) !important;
        }
        .partner-logo-card:hover img {
          filter: grayscale(0%) opacity(100%) !important;
        }
        @media (max-width: 992px) {
          .partner-logo-grid {
            flex-wrap: wrap !important;
          }
          .partner-logo-card {
            flex: 1 1 calc(50% - 12px) !important;
            min-width: 180px !important;
            height: 90px !important;
          }
        }
        @media (max-width: 480px) {
          .partner-logo-card {
            flex: 1 1 100% !important;
            height: 80px !important;
          }
        }
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
