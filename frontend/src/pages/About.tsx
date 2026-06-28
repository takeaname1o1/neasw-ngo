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

      {/* 4. Conversion Banner (Dark) */}
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
