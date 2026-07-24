import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, Play, X } from 'lucide-react';
import { ConversionBlock } from '../components/ConversionBlock';

// Import high-quality local assets
import homeHeroBg from '../assets/home/home_banner.png';
import impactPortrait from '../assets/intro_portrait.png';
import impactHome from '../assets/home/impact.png';
import introGroupLeader from '../assets/intro_group_leader.png';
import unityUtsavBanner from '../assets/UnityUtsav/bannerUU.png';
import educationalSupportImg from '../assets/programs/EducationalSupport.png';
import reliefAidImg from '../assets/programs/ReliefHumanitarianAid.png';
import northeastTourismImg from '../assets/programs/NortheastTourism.png';
import contact1 from '../assets/contact1.png';
import LocalProducts from '../assets/programs/LocalProducts.png';
import freeUpscCoachingImg from '../assets/programs/FreeUPSCcoachingtostudentsofArunachalNagalandandManipur.jpeg';
import assamRiflesLogo from '../assets/partner/Assam_rifles.png';
import homeAffairsLogo from '../assets/partner/Home_Affairs.png';
import neDonerLogo from '../assets/partner/NE_doner.png';
import scienceTechnoLogo from '../assets/partner/science_techno.png';
import storiesOfChangeImg from '../assets/UnityUtsav/stoories_of_chnage.png';

// Free Medical Check-up Camp Assets
import medicalCamp01 from '../assets/programs/Free Medical Check-up Camp/photo_01.jpeg';
import medicalCamp02 from '../assets/programs/Free Medical Check-up Camp/photo_02.jpeg';
import medicalCamp03 from '../assets/programs/Free Medical Check-up Camp/photo_03.jpeg';
import medicalCamp04 from '../assets/programs/Free Medical Check-up Camp/photo_04.jpeg';
import medicalCamp05 from '../assets/programs/Free Medical Check-up Camp/photo_05.jpeg';

// 6-Day Uttarakhand Cultural Exchange Assets
import uttarakhandExchangeBanner from '../assets/7day/photo_01.jpeg';
import uttarakhandExchange02 from '../assets/7day/photo_02.jpeg';
import uttarakhandExchange03 from '../assets/7day/photo_03.jpeg';
import uttarakhandExchange04 from '../assets/7day/photo_04.jpeg';
import uttarakhandExchange05 from '../assets/7day/photo_05.jpeg';
import uttarakhandExchange06 from '../assets/7day/photo_06.jpeg';
import uttarakhandExchange07 from '../assets/7day/photo_07.jpeg';
import uttarakhandExchange08 from '../assets/7day/photo_08.jpeg';
import uttarakhandExchange09 from '../assets/7day/photo_09.jpeg';
import uttarakhandExchange10 from '../assets/7day/photo_10.jpeg';

// Dalai Lama Spiritual Journey Assets
import dalaiLama01 from '../assets/DalaiLama/photo_01.jpeg';
import dalaiLama02 from '../assets/DalaiLama/photo_02.jpeg';
import dalaiLama03 from '../assets/DalaiLama/photo_03.jpeg';
import dalaiLama04 from '../assets/DalaiLama/photo_04.jpeg';
import dalaiLama05 from '../assets/DalaiLama/photo_05.jpeg';
import dalaiLama06 from '../assets/DalaiLama/photo_06.jpeg';
import dalaiLama07 from '../assets/DalaiLama/photo_07.jpeg';
import dalaiLama08 from '../assets/DalaiLama/photo_08.jpeg';
import dalaiLama09 from '../assets/DalaiLama/photo_09.jpeg';
import dalaiLama10 from '../assets/DalaiLama/photo_10.jpeg';

// Environmental Awareness Initiative Assets
import envAwareness01 from '../assets/Environmental Awareness Initiative/photo_01.jpeg';
import envAwareness02 from '../assets/Environmental Awareness Initiative/photo_02.jpeg';
import envAwareness03 from '../assets/Environmental Awareness Initiative/photo_03.jpeg';
import envAwareness04 from '../assets/Environmental Awareness Initiative/photo_04.jpeg';
import envAwareness05 from '../assets/Environmental Awareness Initiative/photo_05.jpeg';

// NEASW Recognised by the Vice President of India Assets
import vpRecognition01 from '../assets/NEASW Recognised by the Vice President of India/photo_01.jpeg';
import vpRecognition02 from '../assets/NEASW Recognised by the Vice President of India/photo_02.jpeg';
import vpRecognition03 from '../assets/NEASW Recognised by the Vice President of India/photo_03.jpeg';

// Walong Naman Yatra 2019 Assets
import walong01 from '../assets/Walong Naman Yatra 2019/photo_01.jpeg';
import walong02 from '../assets/Walong Naman Yatra 2019/photo_02.jpeg';

// Raksha Bandhan at the Border Assets
import borderRaksha01 from '../assets/Raksha Bandhan at the Border/photo_01.jpeg';
import borderRaksha02 from '../assets/Raksha Bandhan at the Border/photo_02.jpeg';
import borderRaksha03 from '../assets/Raksha Bandhan at the Border/photo_03.jpeg';
import borderRaksha04 from '../assets/Raksha Bandhan at the Border/photo_04.jpeg';

// COVID-19 Food Relief Drive Assets
import covidRelief01 from '../assets/COVID-19 Food Relief Drive/photo_01.jpeg';
import covidRelief02 from '../assets/COVID-19 Food Relief Drive/photo_02.jpeg';
import covidRelief03 from '../assets/COVID-19 Food Relief Drive/photo_03.jpeg';

// Reaching Remote Communities Assets
import remoteOutreach01 from '../assets/Reaching Remote Communities/photo_01.jpeg';
import remoteOutreach02 from '../assets/Reaching Remote Communities/photo_02.jpeg';
import remoteOutreach03 from '../assets/Reaching Remote Communities/photo_03.jpeg';
import remoteOutreach04 from '../assets/Reaching Remote Communities/photo_04.jpeg';

interface Initiative {
  title: string;
  description: string;
  image: string;
  video?: string;
  images?: string[];
  autoSlide?: boolean;
}

interface HomeProps {
  setCurrentPage: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('Core Packages');
  const [activeInitiative, setActiveInitiative] = useState(0);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [activeMedicalPhoto, setActiveMedicalPhoto] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveMedicalPhoto((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const initiatives: Initiative[] = [
    {
      title: "Unity Utsav",
      description: "The largest student cultural and sports festival for Northeasterns in Delhi.",
      image: unityUtsavBanner,
    },
    {
      title: "Uttarakhand Cultural Exchange",
      description: "A 6-day cultural exchange program fostering dialogue, cultural exchange, and national integration in Uttarakhand.",
      image: uttarakhandExchangeBanner,
      images: [
        uttarakhandExchangeBanner,
        uttarakhandExchange02,
        uttarakhandExchange03,
        uttarakhandExchange04,
        uttarakhandExchange05,
        uttarakhandExchange06,
        uttarakhandExchange07,
        uttarakhandExchange08,
        uttarakhandExchange09,
        uttarakhandExchange10
      ]
    },
    {
      title: "Spiritual Journey to Meet the Dalai Lama",
      description: "From 8th Nov to 10th Nov 2025, students from Sikkim and Arunachal Pradesh embarked on a spiritual journey to meet His Holiness the Dalai Lama, a global spiritual leader and symbol of peace.",
      image: dalaiLama01,
      images: [
        dalaiLama01,
        dalaiLama02,
        dalaiLama03,
        dalaiLama04,
        dalaiLama05,
        dalaiLama06,
        dalaiLama07,
        dalaiLama08,
        dalaiLama09,
        dalaiLama10
      ]
    },
    {
      title: "Environmental Awareness Initiative",
      description: "On 3 June 2026, NEASW supported a drawing and painting competition at GUPS, Kamhua Noknu themed 'Protect Earth, Conserve Nature' with over 300 students participating.",
      image: envAwareness01,
      images: [
        envAwareness01,
        envAwareness02,
        envAwareness03,
        envAwareness04,
        envAwareness05
      ],
    },
    {
      title: "NEASW Recognised by the Vice President of India",
      description: "NEASW participated in the National Tribal Youth Conclave 2026 at Bharat Mandapam, Delhi, receiving recognition from the Hon'ble Vice President of India, Shri C.P. Radhakrishnan, for contributions to the welfare and upliftment of Northeast India.",
      image: vpRecognition01,
      images: [
        vpRecognition01,
        vpRecognition02,
        vpRecognition03
      ]
    },
    {
      title: "Walong Naman Yatra 2019",
      description: "In 2019, NEASW undertook the Walong Naman Yatra to the historic Namti Plains, Walong (Arunachal Pradesh) to pay tribute to the brave soldiers of the 1962 Indo-China War.",
      image: walong01,
      images: [
        walong01,
        walong02
      ]
    },
    {
      title: "Raksha Bandhan at the Border",
      description: "Celebrated Raksha Bandhan with the armed forces at the Indo-Myanmar border in Arunachal Pradesh and Nagaland to tighten the bond between armed forces and indigenous people, fostering understanding and unity.",
      image: borderRaksha01,
      images: [
        borderRaksha01,
        borderRaksha02,
        borderRaksha03,
        borderRaksha04
      ]
    },
    {
      title: "COVID-19 Food Relief Drive",
      description: "During the COVID-19 lockdown, volunteers organized grassroots relief efforts to distribute rice and essential food supplies to stranded students and professionals from the Northeast, as well as masks in Kaho, Arunachal.",
      image: covidRelief01,
      images: [
        covidRelief01,
        covidRelief02,
        covidRelief03
      ]
    },
    {
      title: "Reaching Remote Communities",
      description: "Outreach program in Anjaw district, Arunachal Pradesh, covering underprivileged areas and supporting local youth.",
      image: remoteOutreach01,
      images: [
        remoteOutreach01,
        remoteOutreach02,
        remoteOutreach03,
        remoteOutreach04
      ]
    }
  ];

  // 1. Auto-switch internal photo slides for all initiatives with multiple images
  React.useEffect(() => {
    let interval: any;
    const currentInitiative = initiatives[activeInitiative];
    if (currentInitiative?.images && currentInitiative.images.length > 1 && !isVideoPlaying) {
      const imgs = currentInitiative.images;
      interval = setInterval(() => {
        setActivePhotoIndex((prev) => (prev + 1) % imgs.length);
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeInitiative, isVideoPlaying]);

  // 2. Auto-switch main initiative slides
  React.useEffect(() => {
    let interval: any;
    if (!isVideoPlaying) {
      interval = setInterval(() => {
        setActivePhotoIndex(0);
        setActiveInitiative((prev) => (prev + 1) % initiatives.length);
      }, 12000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeInitiative, isVideoPlaying, initiatives.length]);

  const handlePlayPauseVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(e => console.log("Video play failed:", e));
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const handleNextInitiative = () => {
    setIsVideoPlaying(false);
    setActivePhotoIndex(0);
    setActiveInitiative((prev) => (prev + 1) % initiatives.length);
  };

  const handlePrevInitiative = () => {
    setIsVideoPlaying(false);
    setActivePhotoIndex(0);
    setActiveInitiative((prev) => (prev - 1 + initiatives.length) % initiatives.length);
  };

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
            NEASW <br /> WELFARE <br /> FOUNDATION
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
          Creating Impact Across <br /> the Northeast
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
        <div className="carousel-mockup" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', padding: '0 24px', position: 'relative', maxWidth: '1200px', margin: '0 auto' }}>
          {/* Prev Button */}
          <button
            onClick={handlePrevInitiative}
            style={{
              position: 'absolute',
              left: '10px',
              zIndex: 10,
              background: '#ffffff',
              border: '1px solid var(--border-color)',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Left card (inactive) */}
          <div
            onClick={handlePrevInitiative}
            className="carousel-side-card"
            style={{ flexShrink: 0, width: '20%', height: '220px', borderRadius: '16px', overflow: 'hidden', opacity: 0.3, cursor: 'pointer', transition: 'var(--transition-smooth)' }}
          >
            <img src={initiatives[(activeInitiative - 1 + initiatives.length) % initiatives.length].image} alt="Previous Initiative" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Center Card */}
          <div className="carousel-center-card" style={{ flexShrink: 0, width: '55%', height: '380px', borderRadius: '16px', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '24px', transition: 'var(--transition-smooth)' }}>
            {/* If video exists and is playing, show video, otherwise show image */}
            {initiatives[activeInitiative].video && isVideoPlaying ? (
              <video
                ref={videoRef}
                src={initiatives[activeInitiative].video}
                controls
                autoPlay
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
              />
            ) : (
              <>
                <img
                  src={initiatives[activeInitiative].images ? initiatives[activeInitiative].images[activePhotoIndex] : initiatives[activeInitiative].image}
                  alt={initiatives[activeInitiative].title}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
                />

                {/* Inner photo gallery navigation */}
                {initiatives[activeInitiative].images && (
                  <>
                    {/* Counter Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      background: 'rgba(0,0,0,0.65)',
                      color: '#ffffff',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      zIndex: 4,
                      fontFamily: 'var(--font-body)',
                      letterSpacing: '0.05em'
                    }}>
                      {activePhotoIndex + 1} / {initiatives[activeInitiative].images.length}
                    </div>

                    {/* Inner Left Arrow */}
                    {activePhotoIndex > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsVideoPlaying(false);
                          setActivePhotoIndex(prev => prev - 1);
                        }}
                        style={{
                          position: 'absolute',
                          left: '20px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          zIndex: 4,
                          background: 'rgba(255,255,255,0.9)',
                          border: 'none',
                          borderRadius: '50%',
                          width: '38px',
                          height: '38px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        }}
                      >
                        <ChevronLeft size={18} style={{ color: '#000000' }} />
                      </button>
                    )}

                    {/* Inner Right Arrow */}
                    {activePhotoIndex < initiatives[activeInitiative].images.length - 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsVideoPlaying(false);
                          setActivePhotoIndex(prev => prev + 1);
                        }}
                        style={{
                          position: 'absolute',
                          right: '20px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          zIndex: 4,
                          background: 'rgba(255,255,255,0.9)',
                          border: 'none',
                          borderRadius: '50%',
                          width: '38px',
                          height: '38px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        }}
                      >
                        <ChevronRight size={18} style={{ color: '#000000' }} />
                      </button>
                    )}
                  </>
                )}

                {initiatives[activeInitiative].video && activePhotoIndex === 0 && (
                  <button
                    onClick={handlePlayPauseVideo}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 4,
                      background: 'rgba(255,255,255,0.9)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '64px',
                      height: '64px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    }}
                  >
                    <Play size={28} fill="#000000" style={{ color: '#000000', marginLeft: '3px' }} />
                  </button>
                )}
              </>
            )}

            {/* Text Overlay (hide when video is playing to not cover video controls) */}
            {(!initiatives[activeInitiative].video || !isVideoPlaying) && (
              <>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(transparent, rgba(0,0,0,0.75))', zIndex: 2 }}></div>
                <div style={{ zIndex: 3, display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                  <h3 style={{ fontSize: '1.85rem', fontWeight: 600, fontFamily: 'var(--font-title)', color: '#ffffff', margin: 0 }}>{initiatives[activeInitiative].title}</h3>
                  <p style={{ fontSize: '0.98rem', color: '#e2e8f0', margin: 0, lineHeight: 1.45, fontWeight: 400 }}>{initiatives[activeInitiative].description}</p>
                </div>
              </>
            )}
          </div>

          {/* Right card (inactive) */}
          <div
            onClick={handleNextInitiative}
            className="carousel-side-card"
            style={{ flexShrink: 0, width: '20%', height: '220px', borderRadius: '16px', overflow: 'hidden', opacity: 0.3, cursor: 'pointer', transition: 'var(--transition-smooth)' }}
          >
            <img src={initiatives[(activeInitiative + 1) % initiatives.length].image} alt="Next Initiative" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Next Button */}
          <button
            onClick={handleNextInitiative}
            style={{
              position: 'absolute',
              right: '10px',
              zIndex: 10,
              background: '#ffffff',
              border: '1px solid var(--border-color)',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Carousel Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
          {initiatives.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsVideoPlaying(false);
                setActiveInitiative(index);
              }}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: activeInitiative === index ? 'var(--text-primary)' : 'var(--border-color)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'var(--transition-smooth)',
              }}
            />
          ))}
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
          <div className="program-card" style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', display: 'flex', gap: '20px', border: '1px solid var(--border-color)', textAlign: 'left' }}>
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
                Learn More <ChevronRight size={16} />
              </a>
            </div>
          </div>

          {/* Program Card 2 */}
          <div className="program-card" style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', display: 'flex', gap: '20px', border: '1px solid var(--border-color)', textAlign: 'left' }}>
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
                Learn More <ChevronRight size={16} />
              </a>
            </div>
          </div>

          {/* Program Card 3 */}
          <div className="program-card" style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', display: 'flex', gap: '20px', border: '1px solid var(--border-color)', textAlign: 'left' }}>
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
                Learn More <ChevronRight size={16} />
              </a>
            </div>
          </div>

          {/* Program Card 4 */}
          <div className="program-card" style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', display: 'flex', gap: '20px', border: '1px solid var(--border-color)', textAlign: 'left' }}>
            <img src={LocalProducts} alt="Local Products" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Local Products</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.45 }}>Supporting local farmers and communities by offering pure, natural, and organic products made in the Northeast.</p>
              <a
                href="#learn"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('work');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ fontSize: '0.85rem', fontWeight: 600, color: '#000000', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                Learn More <ChevronRight size={16} />
              </a>
            </div>
          </div>

          {/* Program Card 5 */}
          <div className="program-card" style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', display: 'flex', gap: '20px', border: '1px solid var(--border-color)', textAlign: 'left' }}>
            <img src={freeUpscCoachingImg} alt="Free UPSC Coaching" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Free UPSC Coaching</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.45 }}>Providing free UPSC civil services coaching to deserving students from Arunachal Pradesh, Nagaland, and Manipur to support their administrative career aspirations.</p>
              <a
                href="#learn"
                onClick={(e) => {
                  e.preventDefault();
                  setShowLightbox(true);
                }}
                style={{ fontSize: '0.85rem', fontWeight: 600, color: '#000000', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                Learn More <ChevronRight size={16} />
              </a>
            </div>
          </div>

          {/* Program Card 6 (Auto-sliding Photo Gallery) */}
          <div className="program-card" style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', display: 'flex', gap: '20px', border: '1px solid var(--border-color)', textAlign: 'left' }}>
            <img
              src={
                activeMedicalPhoto === 0 ? medicalCamp01 :
                  activeMedicalPhoto === 1 ? medicalCamp02 :
                    activeMedicalPhoto === 2 ? medicalCamp03 :
                      activeMedicalPhoto === 3 ? medicalCamp04 :
                        medicalCamp05
              }
              alt="Free Medical Check-up Camp"
              style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px', flexShrink: 0, transition: 'all 0.5s ease-in-out' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Free Medical Check-up Camp</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.45 }}>On 22nd Nov 2025, a free medical check-up camp was organized at the SPUNER office in Delhi to support the health and well-being of all Northeasterners.</p>
              <a
                href="#learn"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('work');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ fontSize: '0.85rem', fontWeight: 600, color: '#000000', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                Learn More <ChevronRight size={16} />
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
      <section style={{ backgroundColor: '#000000', color: '#ffffff', padding: '90px 24px' }}>
        <div className="container">
          {/* Header Layout */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '48px',
            flexWrap: 'wrap',
            gap: '24px'
          }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontFamily: 'var(--font-title)',
              fontWeight: 400,
              color: '#ffffff',
              margin: 0,
              lineHeight: 1.1
            }}>
              Stories of Change
            </h2>
            <p style={{
              color: '#8a92a6',
              fontSize: '1.05rem',
              maxWidth: '320px',
              lineHeight: 1.45,
              margin: 0,
              textAlign: 'left'
            }}>
              Real stories from real people whose lives have been touched by NEASW Welfare Foundation.
            </p>
          </div>

          {/* Main Card with Background Image */}
          <div style={{
            position: 'relative',
            backgroundImage: `url(${storiesOfChangeImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '32px',
            minHeight: '520px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            padding: '40px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
          }} className="stories-banner-card">

            {/* White Testimonial Card Overlay */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.5)',
              color: '#000000',
              borderRadius: '24px',
              padding: '24px 28px',
              maxWidth: '380px',
              width: '100%',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)'
            }}>
              <p style={{
                fontSize: '1.15rem',
                fontWeight: 500,
                lineHeight: 1.4,
                margin: 0,
                color: '#000000',
                fontFamily: 'var(--font-body)'
              }}>
                “Unity Utsav helped me connect with fellow students from across the Northeast and strengthened my sense of identity.”
              </p>
              <div>
                <span style={{
                  display: 'block',
                  fontSize: '1rem',
                  color: '#4a5568',
                  marginBottom: '2px',
                  fontWeight: 600
                }}>
                  - Lhingneihoi Chongloi
                </span>
                <span style={{
                  color: '#4a5568',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}>
                  Participant &nbsp;|&nbsp; Unity Utsav
                </span>
              </div>
            </div>
          </div>

          {/* View All Button */}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              onClick={() => {
                setCurrentPage('work');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                padding: '12px 36px',
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

      {/* Lightbox Modal for UPSC Coaching Program Poster */}
      {showLightbox && (
        <div
          onClick={() => setShowLightbox(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90%',
              maxHeight: '90%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowLightbox(false)}
              style={{
                position: 'absolute',
                top: '-50px',
                right: '0',
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '1rem',
                fontWeight: 500,
                outline: 'none'
              }}
            >
              Close <X size={20} />
            </button>

            {/* Poster Image */}
            <img
              src={freeUpscCoachingImg}
              alt="Free UPSC Coaching Poster"
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 12px 40px rgba(0,0,0,0.5)'
              }}
            />
          </div>
        </div>
      )}

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
            justify-content: center !important;
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
          .carousel-side-card {
            display: none !important;
          }
          .carousel-center-card {
            width: 100% !important;
            height: 320px !important;
          }
          .program-card {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          .program-card img {
            width: 100% !important;
            max-width: 100% !important;
            height: 200px !important;
          }
          .program-card > div {
            align-items: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </div>
  );
};
