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

// WWO Assets
import wwo1 from '../assets/WWO/1.png';
import wwo2 from '../assets/WWO/2.png';
import wwo3 from '../assets/WWO/3.png';

// OS Collage Assets
import os1 from '../assets/OS/1.jpg';
import os2 from '../assets/OS/2.jpg';
import os3 from '../assets/OS/3.png';
import os4 from '../assets/OS/4.png';
import os5 from '../assets/OS/5.png';
import os6 from '../assets/OS/6.png';

// Delhi Chapter Leadership Images
import pratikPresident from '../assets/delhi_chapter/Pratik Thaomung_Delhi chapter_President.jpeg';
import lanchenbiVP from '../assets/delhi_chapter/Lanchenbi Urungpurel_Delhi chapter_VP.jpeg';
import boazLepcha from '../assets/delhi_chapter/BOAZ Lepcha_Delhi chapter.jpeg';
import michiSheela from '../assets/delhi_chapter/Michi Sheela_Delhi chapter.jpeg';
import pemaKhandu from '../assets/delhi_chapter/Pema Khandu Thungon_Delhi chapter.jpeg';
import tashiChotton from '../assets/delhi_chapter/Tashi Chotton_Delhi chapter.jpeg';

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
        {/* Intro text spanning the top-left */}
        <div style={{ textAlign: 'left', marginBottom: '60px', maxWidth: '562px' }}>
          <p style={{
            fontSize: '32px',
            lineHeight: '38px',
            color: '#000000',
            fontWeight: 500,
            fontFamily: 'var(--font-body)',
            margin: 0
          }}>
            At NEASW Welfare Foundation, we are committed to empowering communities, preserving cultural heritage, and creating opportunities for youth through meaningful social initiatives.
          </p>
        </div>

        {/* 4-Column Collage Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          alignItems: 'start'
        }}>
          {/* Column 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '40px' }}>
            <img 
              src={os1} 
              alt="Youth member portrait" 
              className="collage-image"
              style={{
                width: '100%',
                maxWidth: '293px',
                height: '352px',
                objectFit: 'cover'
              }} 
            />
          </div>

          {/* Column 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '20px' }}>
            <img 
              src={os2} 
              alt="Members in traditional attire" 
              className="collage-image"
              style={{
                width: '100%',
                maxWidth: '288px',
                height: '258px',
                objectFit: 'cover'
              }} 
            />
            <img 
              src={os5} 
              alt="Community group photo" 
              className="collage-image"
              style={{
                width: '100%',
                maxWidth: '387px',
                height: '261px',
                objectFit: 'cover'
              }} 
            />
          </div>

          {/* Column 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <img 
              src={os3} 
              alt="Shawl presentation ceremony" 
              className="collage-image"
              style={{
                width: '100%',
                maxWidth: '302px',
                height: '423px',
                objectFit: 'cover'
              }} 
            />
            <img 
              src={os6} 
              alt="Stage gathering" 
              className="collage-image"
              style={{
                width: '100%',
                maxWidth: '290px',
                height: '211px',
                objectFit: 'cover'
              }} 
            />
          </div>

          {/* Column 4 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '30px' }}>
            <img 
              src={os4} 
              alt="Children studying in classroom" 
              className="collage-image"
              style={{
                width: '100%',
                maxWidth: '262px',
                height: '309px',
                objectFit: 'cover'
              }} 
            />
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
                  { name: "Pratik Thaomung", role: "President", image: pratikPresident },
                  { name: "Lanchenbi Urungpurel", role: "Vice President", image: lanchenbiVP },
                  { name: "Michi Sheela", role: "Secretary", image: michiSheela },
                  { name: "Boaz Lepcha", role: "Joint Secretary", image: boazLepcha },
                  { name: "Pema Khandu Thungon", role: "Treasurer", image: pemaKhandu },
                  { name: "Tashi Chotton", role: "Coordinator", image: tashiChotton }
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
        .collage-image {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
          border-radius: 12px;
          box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 0, 0, 0.04);
        }
        .collage-image:hover {
          transform: translateY(-4px) scale(1.015);
          box-shadow: 0px 16px 36px rgba(0, 0, 0, 0.16);
        }

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
