import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logoNESFSW from '../assets/logo_NESFSW.png';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isHome = currentPage === 'home' || currentPage === 'join';

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'work', label: 'Our Work' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header style={{
      backgroundColor: isHome ? 'transparent' : 'var(--bg-primary)',
      borderBottom: isHome ? 'none' : '1px solid var(--border-color)',
      position: isHome ? 'absolute' : 'sticky',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      transition: 'var(--transition-smooth)',
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        height: '75px',
      }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', justifySelf: 'start' }} onClick={() => handleNavClick('home')}>
          <img src={logoNESFSW} alt="NEASW Logo" style={{ height: '65px', width: 'auto', objectFit: 'contain' }} />
        </div>

        {/* Desktop Nav (Pills centered) */}
        <nav style={{ display: 'none', gap: '12px', justifySelf: 'center' }} className="desktop-nav">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            
            const btnBg = isActive
              ? (isHome ? '#ffffff' : 'var(--text-primary)')
              : 'transparent';
              
            const btnColor = isActive
              ? (isHome ? '#000000' : 'var(--bg-primary)')
              : (isHome ? '#ffffff' : 'var(--text-primary)');
              
            const btnBorder = isActive
              ? (isHome ? '1px solid #ffffff' : '1px solid var(--text-primary)')
              : (isHome ? '1px solid #ffffff' : '1px solid var(--border-color)');

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  backgroundColor: btnBg,
                  color: btnColor,
                  border: btnBorder,
                  borderRadius: '9999px',
                  padding: '8px 24px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: '0.925rem',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)',
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* CTA Button / Mobile Toggle (Right aligned) */}
        <div style={{ justifySelf: 'end', display: 'flex', alignItems: 'center' }}>
          {currentPage !== 'join' && (
            <button
              onClick={() => handleNavClick('join')}
              style={{
                display: 'none',
                padding: '8px 18px',
                fontSize: '0.85rem',
                borderRadius: '9999px',
                backgroundColor: isHome ? 'var(--bg-primary)' : 'var(--text-primary)',
                color: isHome ? 'var(--text-primary)' : 'var(--bg-primary)',
                border: isHome ? 'none' : '1px solid var(--text-primary)',
              }}
              className="desktop-cta btn"
            >
              Join NEASW
            </button>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: isHome ? 'var(--text-white)' : 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            className="mobile-toggle"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '75px',
          left: 0,
          right: 0,
          backgroundColor: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border-color)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 99,
        }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: currentPage === item.id ? 'var(--color-forest)' : 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '1.05rem',
                textAlign: 'left',
                padding: '8px 0',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              {item.label}
            </button>
          ))}
          {currentPage !== 'join' && (
            <button
              onClick={() => handleNavClick('join')}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '10px', borderRadius: '9999px' }}
            >
              Join NEASW
            </button>
          )}
        </div>
      )}

      {/* CSS overrides inside Header for clean responsive desktop nav visibility */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-cta {
            display: inline-flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
