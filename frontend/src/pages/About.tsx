import React from 'react';
import homeTopBanner from '../assets/home_top_banner.png';
import introPortrait from '../assets/intro_portrait.png';
import introGroupLeader from '../assets/intro_group_leader.png';
import introChildrenClassroom from '../assets/intro_children_classroom.png';
import introGroupSchool from '../assets/intro_group_school.png';
import introStage from '../assets/intro_stage.png';
import offerEmpower from '../assets/offer_empower.png';
import offerConnect from '../assets/offer_connect.png';
import offerTransform from '../assets/offer_transform.png';
import { ConversionBlock } from '../components/ConversionBlock';

interface AboutProps {
  setCurrentPage: (page: string) => void;
}

export const About: React.FC<AboutProps> = ({ setCurrentPage }) => {
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

      {/* 2. Intro Collage Grid */}
      <section className="container" style={{ padding: '90px 24px' }}>
        <div className="intro-collage-layout" style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '50px',
          alignItems: 'start',
        }}>
          {/* Left Text & Portrait column */}
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
            <img 
              src={introPortrait} 
              alt="Volunteer Portrait" 
              style={{ 
                width: '100%', 
                borderRadius: 'var(--border-radius-card)', 
                objectFit: 'cover', 
                height: '420px',
                border: '1px solid var(--border-color)' 
              }} 
            />
          </div>

          {/* Right Collage column: 3 columns of varying heights */}
          <div className="collage-container" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            alignItems: 'start',
          }}>
            {/* Collage Column 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <img src={introGroupSchool} alt="Traditional Dress Group" style={{ width: '100%', borderRadius: 'var(--border-radius-card)', height: '220px', objectFit: 'cover' }} />
              <img src={introGroupSchool} alt="School Group" style={{ width: '100%', borderRadius: 'var(--border-radius-card)', height: '160px', objectFit: 'cover' }} />
            </div>
            {/* Collage Column 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <img src={introGroupLeader} alt="Group Leader" style={{ width: '100%', borderRadius: 'var(--border-radius-card)', height: '320px', objectFit: 'cover' }} />
              <img src={introStage} alt="Stage Performance" style={{ width: '100%', borderRadius: 'var(--border-radius-card)', height: '170px', objectFit: 'cover' }} />
            </div>
            {/* Collage Column 3 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <img src={introChildrenClassroom} alt="Children in Classroom" style={{ width: '100%', borderRadius: 'var(--border-radius-card)', height: '320px', objectFit: 'cover' }} />
            </div>
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
            <img src={offerEmpower} alt="Empower" style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: 'var(--border-radius-card)', marginBottom: '20px', border: '1px solid var(--border-color)' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '10px', fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}>Empower</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Create opportunities for individuals and communities through education, mentorship and leadership development.
            </p>
          </div>
          {/* Column 2: Connect */}
          <div>
            <img src={offerConnect} alt="Connect" style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: 'var(--border-radius-card)', marginBottom: '20px', border: '1px solid var(--border-color)' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '10px', fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}>Connect</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Bringing people together through cultural exchange, sports, and collaborative initiatives that promote unity and understanding.
            </p>
          </div>
          {/* Column 3: Transform */}
          <div>
            <img src={offerTransform} alt="Transform" style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: 'var(--border-radius-card)', marginBottom: '20px', border: '1px solid var(--border-color)' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '10px', fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}>Transform</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Driving sustainable social change through welfare programs, community outreach and sustainable development efforts.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Meet Our Leadership */}
      <section style={{ backgroundColor: '#F5F5F5', padding: '100px 24px' }}>
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
                title: "Delhi Chapter",
                members: [
                  { name: "Joyson Mazumdar", role: "President", image: introPortrait },
                  { name: "Ningthem Meitei", role: "Vice President", image: introGroupLeader },
                  { name: "Alila Sangma", role: "General Secretary", image: introChildrenClassroom },
                  { name: "Kethosezo Angami", role: "Treasurer", image: introStage }
                ]
              },
              {
                title: "Nagaland Chapter",
                members: [
                  { name: "Zuboni Humtsoe", role: "Chapter Head", image: introPortrait },
                  { name: "Imotemjen Longkumer", role: "Secretary", image: introGroupLeader },
                  { name: "Vezosa Yietsu", role: "Coordinator", image: introChildrenClassroom },
                  { name: "Sentila Ao", role: "Advisor", image: introStage }
                ]
              },
              {
                title: "Manipur Chapter",
                members: [
                  { name: "Thanglenmang Haokip", role: "Chapter Head", image: introPortrait },
                  { name: "Nganba Singh", role: "Joint Secretary", image: introGroupLeader },
                  { name: "Hoinu Kipgen", role: "Treasurer", image: introChildrenClassroom },
                  { name: "RK Sanayaima", role: "Executive Member", image: introStage }
                ]
              },
              {
                title: "Arunachal Pradesh Chapter",
                members: [
                  { name: "Tasso Robin", role: "Chapter Head", image: introPortrait },
                  { name: "Likha Taji", role: "Secretary", image: introGroupLeader },
                  { name: "Yomge Riba", role: "Coordinator", image: introChildrenClassroom },
                  { name: "Koj Tari", role: "Executive Member", image: introStage }
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
                    <div key={mIdx} style={{ 
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
          .intro-collage-layout {
            grid-template-columns: 1fr 1fr !important;
          }
          .offer-intro-grid {
            grid-template-columns: 1fr 1.5fr !important;
          }
        }
      `}</style>
    </div>
  );
};
