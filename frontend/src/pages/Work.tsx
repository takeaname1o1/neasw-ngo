import React from 'react';
import { ConversionBlock } from '../components/ConversionBlock';

// Import high-quality local assets
import intro_children_classroom from '../assets/intro_children_classroom.png';
import intro_group_leader from '../assets/intro_group_leader.png';
import intro_group_school from '../assets/intro_group_school.png';
import intro_portrait from '../assets/intro_portrait.png';
import intro_stage from '../assets/intro_stage.png';
import offer_connect from '../assets/offer_connect.png';
import offer_empower from '../assets/offer_empower.png';
import offer_transform from '../assets/offer_transform.png';
import contact1 from '../assets/contact1.png';
import contact2 from '../assets/contact2.png';
import contact3 from '../assets/contact3.png';
import assam_rifles_logo from '../assets/assam_rifles_logo.png';
import mha_logo from '../assets/mha_logo.png';
import home_top_banner from '../assets/home_top_banner.png';

// EYE Assets
import eye1 from '../assets/EYE/1.png';
import eye2 from '../assets/EYE/2.png';
import eye3 from '../assets/EYE/3.png';

// CWS Assets
import cws1 from '../assets/CWS/1.png';
import cws2 from '../assets/CWS/2.png';
import cws3 from '../assets/CWS/3.png';

// RHA Assets
import rha1 from '../assets/RHA/1.png';
import rha2 from '../assets/RHA/2.png';
import rha3 from '../assets/RHA/3.png';

// NT Assets
import nt1 from '../assets/NT/1.png';
import nt2 from '../assets/NT/2.png';
import nt3 from '../assets/NT/3.png';

// CPH Assets
import cph1 from '../assets/CPH/1.jpg';
import cph2 from '../assets/CPH/2.png';
import cph3 from '../assets/CPH/3.png';

// OP Assets
import op1 from '../assets/OP/1.png';
import op2 from '../assets/OP/2.png';
import op3 from '../assets/OP/3.png';

interface WorkProps {
  setCurrentPage: (page: string) => void;
}

export const Work: React.FC<WorkProps> = ({ setCurrentPage }) => {
  const sections = [
    {
      title: "Education &\nYouth Empowerment",
      desc: "We focus on providing scholarships, direct institutional mentorship, and bridging educational gaps for rural pupils. By establishing localized community learning centers, we ensure youth gain critical computing and leadership skills.\n\nOur programs run in active coordination with community leaders to build robust learning environments. Through scholarships and digital literacy programs, we are equipping the next generation with the tools they need to succeed in a modern workforce.",
      theme: "dark",
      imagePos: "right",
      images: [
        eye1,
        eye2,
        eye3
      ],
      collageType: "horizontal"
    },
    {
      title: "Community Welfare\n& Social Impact",
      desc: "Working closely with local authorities and communities, we aim to uplift marginalized groups through targeted social welfare programs. This includes health camps, sanitation drives, and awareness campaigns.\n\nBy engaging with both the youth and elders, we create a sustainable ecosystem of mutual support. Our initiatives are designed to foster long-term resilience and community bonding.",
      theme: "light",
      imagePos: "left",
      images: [
        cws1,
        cws2,
        cws3
      ],
      collageType: "vertical"
    },
    {
      title: "Relief &\nHumanitarian Aid",
      desc: "In times of crisis, we deliver essential food supplies, medical kits, and clothing. Working in active coordination with security bodies like the Assam Rifles, we coordinate distribution logistics into remote hills.\n\nOur rapid response teams are trained to navigate difficult terrains to ensure that aid reaches the most vulnerable populations promptly and effectively, helping rebuild lives after natural disasters.",
      theme: "dark",
      imagePos: "right",
      images: [
        rha1,
        rha2,
        rha3
      ],
      collageType: "horizontal"
    },
    {
      title: "Northeast Tourism",
      desc: "We promote community-owned eco-tourism circuits and sustainable homestays. By highlighting the hidden gems of the Northeast, we bring ethical tourism to remote areas.\n\nThis not only boosts the local economy but also creates a platform for cultural exchange. Visitors get to experience the authentic lifestyle, pristine landscapes, and warm hospitality of the indigenous communities.",
      theme: "light",
      imagePos: "left",
      images: [
        nt1,
        nt2,
        nt3
      ],
      collageType: "vertical"
    },
    {
      title: "Cultural Preservation\n& Heritage",
      desc: "We celebrate the indigenous history, heritage, and values of the Northeast states. Through support for local festivals, traditional arts assemblies, and artisan clusters, we help keep rich tribal legacies alive.\n\nOur documentation projects and youth cultural exchange programs ensure that ancestral knowledge, languages, and art forms are passed down safely to future generations without losing their essence.",
      theme: "dark",
      imagePos: "right",
      images: [
        cph1,
        cph2,
        cph3
      ],
      collageType: "horizontal"
    },
    {
      title: "Organic Products",
      desc: "We create market access for organic farmers and indigenous weavers to sell high-quality, fair-trade goods directly to larger markets. By eliminating middlemen, we ensure fair compensation.\n\nOur product lines include organic spices, handloom textiles, and handcrafted utility items. Every purchase directly supports the livelihood of rural artisans and promotes sustainable agricultural practices.",
      theme: "light",
      imagePos: "left",
      images: [
        op1,
        op2,
        op3
      ],
      collageType: "vertical"
    }
  ];

  return (
    <div className="fade-in-section" style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      
      {/* Hero Section */}
      <header className="container" style={{ padding: '65px 24px 80px 24px' }}>
        <div className="work-hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '50px',
        }}>
          
          {/* Left Column - Text */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left' }}>
            <h1 style={{
              fontFamily: 'var(--font-title)',
              fontSize: '4rem',
              lineHeight: 1.1,
              fontWeight: 500,
              color: 'var(--text-primary)',
              margin: '0 0 24px 0',
            }}>
              Empowering lives.<br/>Building stronger<br/>communities.
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              margin: 0,
              maxWidth: '420px',
            }}>
              We focus on providing scholarships, direct institutional mentorship, and bridging educational gaps for rural pupils.
            </p>
          </div>

          {/* Middle Column - Small Stat */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '30px', textAlign: 'left' }}>
            <div>
              <p style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#a0aec0',
                textTransform: 'uppercase',
                margin: '0 0 10px 0',
              }}>
                Our Impact Metrics
              </p>
              <h3 style={{
                fontFamily: 'var(--font-title)',
                fontSize: '3rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
                margin: '0 0 4px 0',
                lineHeight: 1,
              }}>
                12+
              </h3>
              <p style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                margin: 0,
                color: 'var(--text-secondary)',
              }}>
                Years of impact
              </p>
            </div>
            <img 
              src={intro_portrait} 
              alt="Hands working" 
              style={{
                width: '100%',
                height: '190px',
                objectFit: 'cover',
                borderRadius: '16px',
              }}
            />
          </div>

          {/* Right Column - Large Image & Stat */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <img 
              src={intro_children_classroom} 
              alt="Classroom" 
              style={{
                width: '100%',
                height: '270px',
                objectFit: 'cover',
                borderRadius: '16px',
              }}
            />
            <div>
              <h3 style={{
                fontFamily: 'var(--font-title)',
                fontSize: '2.5rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
                margin: '0 0 4px 0',
                lineHeight: 1,
              }}>
                10,000+
              </h3>
              <p style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                margin: 0,
              }}>
                Students assisted
              </p>
            </div>
          </div>
          
        </div>
      </header>

      {/* Alternating Content Sections */}
      <main style={{ display: 'flex', flexDirection: 'column' }}>
        {sections.map((section, index) => {
          const dividerColor = section.theme === 'dark' ? '#0a0d14' : '#ffffff';
          const isImageLeft = section.imagePos === 'left';
          
          return (
            <section 
              key={index} 
              className="work-section-grid"
              style={{
                width: '100%',
                display: 'grid',
                backgroundColor: section.theme === 'dark' ? '#0a0d14' : '#ffffff',
                color: section.theme === 'dark' ? '#ffffff' : '#000000',
              }}
            >
              
              {/* Text Content */}
              <div 
                className="work-text-col"
                style={{
                  padding: '80px 40px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: 'left',
                  order: isImageLeft ? 2 : 1,
                }}
              >
                <h2 style={{
                  fontFamily: 'var(--font-title)',
                  fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                  whiteSpace: 'pre-line',
                  marginBottom: '24px',
                  lineHeight: 1.15,
                  fontWeight: 500,
                  color: section.theme === 'dark' ? '#ffffff' : '#000000',
                }}>
                  {section.title}
                </h2>
                <p style={{
                  lineHeight: 1.7,
                  fontSize: '1.1rem',
                  whiteSpace: 'pre-line',
                  margin: 0,
                  color: section.theme === 'dark' ? '#a0aec0' : '#4a5568',
                }}>
                  {section.desc}
                </p>
              </div>

              {/* Collage Container */}
              <div 
                style={{
                  height: '550px',
                  width: '100%',
                  order: isImageLeft ? 1 : 2,
                  overflow: 'hidden',
                }}
              >
                {section.collageType === 'horizontal' ? (
                  // Horizontal Split Collage (Top half large, bottom half split)
                  <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
                    <img 
                      src={section.images[0]} 
                      alt="Collage Top" 
                      style={{ width: '100%', height: '50%', objectFit: 'cover', borderBottom: `4px solid ${dividerColor}` }} 
                    />
                    <div style={{ display: 'flex', width: '100%', height: '50%' }}>
                      <img 
                        src={section.images[1]} 
                        alt="Collage Bottom Left" 
                        style={{ width: '50%', height: '100%', objectFit: 'cover', borderRight: `2px solid ${dividerColor}` }} 
                      />
                      <img 
                        src={section.images[2]} 
                        alt="Collage Bottom Right" 
                        style={{ width: '50%', height: '100%', objectFit: 'cover', borderLeft: `2px solid ${dividerColor}` }} 
                      />
                    </div>
                  </div>
                ) : (
                  // Vertical Split Collage (Left half large, right half split)
                  <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                    <img 
                      src={section.images[0]} 
                      alt="Collage Left" 
                      style={{ width: '50%', height: '100%', objectFit: 'cover', borderRight: `4px solid ${dividerColor}` }} 
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', width: '50%', height: '100%' }}>
                      <img 
                        src={section.images[1]} 
                        alt="Collage Right Top" 
                        style={{ width: '100%', height: '50%', objectFit: 'cover', borderBottom: `2px solid ${dividerColor}` }} 
                      />
                      <img 
                        src={section.images[2]} 
                        alt="Collage Right Bottom" 
                        style={{ width: '100%', height: '50%', objectFit: 'cover', borderTop: `2px solid ${dividerColor}` }} 
                      />
                    </div>
                  </div>
                )}
              </div>
              
            </section>
          );
        })}
      </main>

      {/* Call to Action Section */}
      <ConversionBlock setCurrentPage={setCurrentPage} />

      <style>{`
        @media (min-width: 992px) {
          .work-hero-grid {
            grid-template-columns: 1.3fr 0.8fr 1fr !important;
          }
          .work-section-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .work-text-col {
            padding: 80px 100px !important;
          }
        }
        @media (max-width: 991px) {
          .work-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .work-section-grid {
            grid-template-columns: 1fr !important;
          }
          .work-text-col {
            padding: 60px 24px !important;
            order: 1 !important; /* Always show text above collage on mobile */
          }
          div[style*="order: 1"], div[style*="order: 2"] {
            order: unset !important;
          }
        }
      `}</style>

    </div>
  );
};
