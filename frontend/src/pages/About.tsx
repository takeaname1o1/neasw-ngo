import React from 'react';
import homeTopBanner from '../assets/home_top_banner.png';
import { ConversionBlock } from '../components/ConversionBlock';

// WWO Assets
import wwo1 from '../assets/WWO/1.png';
import wwo2 from '../assets/WWO/2.png';
import wwo3 from '../assets/WWO/3.png';

// New Team Leadership Images
import leader1 from '../assets/team/1.jpg';
import leader2 from '../assets/team/2.jpg';
import leader3 from '../assets/team/3.jpg';
import leader4 from '../assets/team/4.jpg';
import leader5 from '../assets/team/5.jpg';
import leader6 from '../assets/team/6.jpg';
import leader7 from '../assets/team/7.jpg';
import leader8 from '../assets/team/8.jpg';
import leader9 from '../assets/team/9.jpg';
import leader10 from '../assets/team/10.jpg';
import leader11 from '../assets/team/11.jpg';
import leader12 from '../assets/team/12.jpg';
import leader13 from '../assets/team/13.jpg';
import leader14 from '../assets/team/14.jpg';
import leader15 from '../assets/team/15.jpg';
import leader16 from '../assets/team/16.jpg';
import leader17 from '../assets/team/17.jpg';
import leader18 from '../assets/team/18.jpg';

interface AboutProps {
  setCurrentPage: (page: string) => void;
}

export const About: React.FC<AboutProps> = ({ setCurrentPage }) => {
  React.useEffect(() => {
    if (localStorage.getItem('scrollToLeadership') === 'true') {
      localStorage.removeItem('scrollToLeadership');
      setTimeout(() => {
        const element = document.getElementById('meet-our-leadership');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 250);
    }
  }, []);

  return (
    <div className="fade-in-section" style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      
      {/* 1. Edge-to-Edge Hero Banner */}
      <section style={{
        height: '75vh',
        minHeight: '520px',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${homeTopBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(3.75rem, 9vw, 7rem)',
            fontWeight: 400,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            margin: 0,
          }}>
            Our Story
          </h1>
        </div>
      </section>

      {/* 2. Intro Section */}
      <section className="container" style={{ padding: '90px 24px' }}>
        <div className="intro-collage-layout" style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '50px',
          alignItems: 'start',
        }}>
          {/* Text & Portrait column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', textAlign: 'left' }}>
            <p style={{
              fontSize: '1.45rem',
              lineHeight: 1.5,
              color: 'var(--text-primary)',
              fontWeight: 500,
              fontFamily: 'var(--font-body)',
              letterSpacing: '-0.015em',
            }}>
              At NEASW Welfare Foundation, we are committed to empowering communities, preserving cultural heritage, and creating opportunities for youth through meaningful social initiatives.
            </p>
        
          </div>
        </div>
      </section>

      {/* 3. What We Offer */}
      <section className="container" style={{ padding: '90px 24px', borderTop: '1px solid var(--border-color)' }}>
        {/* Intro Grid */}
        <div className="offer-intro-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '40px',
          marginBottom: '60px',
          alignItems: 'start',
        }}>
          {/* Left col */}
          <div style={{ textAlign: 'left' }}>
            <span style={{
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              display: 'block',
              marginBottom: '10px',
            }}>
              The Impact
            </span>
            <h2 style={{
              fontSize: '3.5rem',
              fontFamily: 'var(--font-title)',
              fontWeight: 500,
              lineHeight: 1.1,
              color: 'var(--text-primary)',
            }}>
              What <br /> We Offer
            </h2>
          </div>

          {/* Right col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <h4 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              lineHeight: 1.4,
            }}>
              Transforming lives through community-driven initiatives.
            </h4>
            <h3 style={{
              fontSize: '1.65rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              lineHeight: 1.3,
            }}>
              Empowering Communities. Preserving Heritage. Inspiring Change.
            </h3>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.98rem',
              lineHeight: 1.7,
            }}>
              Since 2014, NEASW has connected thousands of Northeastern people through sports, cultural exchange, social welfare programs, and grassroots development initiatives, creating lasting impact where it is needed most. From youth leadership programs and educational support to cultural preservation and humanitarian assistance, our work is dedicated to building stronger, connected communities across India.
            </p>
          </div>
        </div>

        {/* Three Columns Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px',
          textAlign: 'left',
        }}>
          {/* Column 1: Empower */}
          <div>
            <img src={wwo1} alt="Empower" style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: 'var(--border-radius-card)', marginBottom: '20px', border: '1px solid var(--border-color)' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '10px', fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}>Empower</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Create opportunities for individuals and communities through education, mentorship and leadership development.
            </p>
          </div>
          {/* Column 2: Connect */}
          <div>
            <img src={wwo2} alt="Connect" style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: 'var(--border-radius-card)', marginBottom: '20px', border: '1px solid var(--border-color)' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '10px', fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}>Connect</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Bringing people together through cultural exchange, sports, and collaborative initiatives that promote unity and understanding.
            </p>
          </div>
          {/* Column 3: Transform */}
          <div>
            <img src={wwo3} alt="Transform" style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: 'var(--border-radius-card)', marginBottom: '20px', border: '1px solid var(--border-color)' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '10px', fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}>Transform</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Driving sustainable social change through welfare programs, community outreach and sustainable development efforts.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Meet Our Leadership */}
      <section id="meet-our-leadership" style={{ backgroundColor: '#F5F5F5', padding: '100px 24px' }}>
        <div className="container">
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start', 
            flexWrap: 'wrap', 
            gap: '30px', 
            marginBottom: '80px' 
          }}>
            <h2 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontFamily: 'var(--font-title)', 
              fontWeight: 400, 
              color: '#000000', 
              margin: 0, 
              maxWidth: '450px', 
              lineHeight: 1.15,
              textAlign: 'left'
            }}>
              Meet Our Leadership
            </h2>
            <p style={{ 
              fontSize: '1.25rem', 
              color: '#404040', 
              maxWidth: '560px', 
              margin: 0, 
              lineHeight: 1.45,
              textAlign: 'left',
              fontFamily: 'var(--font-body)'
            }}>
              Guided by a passionate team committed to building a stronger, united and empowered Northeast.
            </p>
          </div>

          {/* Chapters and Leadership Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
            {[
              {
                title: "Executive Board",
                members: [
                  { name: "Nyaken Riba", role: "Director & Founder", image: leader1 },
                  { name: "Kiren Acharya", role: "Overall Gen Sec", image: leader2 }
                ]
              },
              {
                title: "Delhi Chapter",
                members: [
                  { name: "Pratik Thaomung", role: "President", image: leader3 },
                  { name: "Lanchenbi Urungpurel", role: "Vice President", image: leader4 },
                  { name: "Krishanu Pratim Medhi", role: "General Secretary", image: leader5 },
                  { name: "Boaz Lepcha", role: "Joint Secretary", image: leader6 },
                  { name: "Michi Sheela", role: "Joint Secretary", image: leader7 },
                  { name: "Pema Khandu Thungon", role: "Convenor", image: leader8 },
                  { name: "Tashi Chotton", role: "Delhi Chapter Coordinator", image: leader9 }
                ]
              },
              {
                title: "Nagaland Chapter",
                members: [
                  { name: "Shomwang Wangnao", role: "President", image: leader10 },
                  { name: "S. Birila Brianna", role: "Vice President & Legal Advisor", image: leader11 },
                  { name: "Mangam Walem", role: "Finance Incharge", image: leader12 },
                  { name: "Tokheto", role: "Media Secretary", image: leader13 },
                  { name: "Manai Konyak", role: "Technical Support Specialist", image: leader14 }
                ]
              },
              {
                title: "Manipur Chapter",
                members: [
                  { name: "Rajkumar Napoleon Singh", role: "Core Member", image: leader15 },
                  { name: "Thongbam Aarti Chanu", role: "Core Member", image: leader16 }
                ]
              },
              {
                title: "Arunachal Chapter",
                members: [
                  { name: "Komok Hassen", role: "Core Member", image: leader17 },
                  { name: "Kina Khishum", role: "Core Member", image: leader18 }
                ]
              }
            ].map((chapter, idx) => (
              <div key={idx} style={{ textAlign: 'left' }}>
                <h3 style={{ 
                  fontSize: '2rem', 
                  fontWeight: 500, 
                  fontFamily: 'var(--font-body)', 
                  color: '#000000', 
                  marginBottom: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  {chapter.title} <span style={{ fontWeight: 300 }}>→</span>
                </h3>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
                  gap: '40px 30px' 
                }}>
                  {chapter.members.map((member, mIdx) => (
                    <div key={mIdx} className="member-card" style={{ 
                      position: 'relative', 
                      width: '100%', 
                      maxWidth: '283px', 
                      margin: '0 auto', 
                      height: '426px' 
                    }}>
                      {/* Card Backplate */}
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '318px',
                        backgroundColor: '#ffffff',
                        borderRadius: '45px',
                        zIndex: 1
                      }} />
                      
                      {/* Image on Top */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '318px',
                        borderRadius: '18px',
                        overflow: 'hidden',
                        zIndex: 2,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
                      }}>
                        <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      
                      {/* Text details inside the backplate */}
                      <div style={{
                        position: 'absolute',
                        bottom: '24px',
                        left: '24px',
                        right: '24px',
                        zIndex: 3,
                        textAlign: 'left'
                      }}>
                        <span style={{ 
                          display: 'block', 
                          fontSize: '14px', 
                          color: '#555555', 
                          fontFamily: 'var(--font-body)', 
                          marginBottom: '4px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          {member.role}
                        </span>
                        <h4 style={{ 
                          fontSize: '22px', 
                          fontFamily: 'var(--font-title)', 
                          color: '#000000', 
                          margin: 0, 
                          fontWeight: 500, 
                          lineHeight: 1.25 
                        }}>
                          {member.name}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Conversion Banner (Dark) */}
      <ConversionBlock setCurrentPage={setCurrentPage} />

      {/* Responsive Styles Injection */}
      <style>{`
        @media (min-width: 992px) {
          .offer-intro-grid {
            grid-template-columns: 1fr 1.5fr !important;
          }
        }
        @media (max-width: 480px) {
          .member-card {
            max-width: 100% !important;
            height: 380px !important;
          }
          .member-card > div:nth-child(1),
          .member-card > div:nth-child(2) {
            height: 280px !important;
          }
        }
      `}</style>
    </div>
  );
};