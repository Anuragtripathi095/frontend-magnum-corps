import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Grid } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="container flex justify-between items-center">
        <Link to="/" className="brand flex items-center">
          <img src="/images/magnus_logo.png" alt="Magnus Corps Logo" style={{ height: '100px', width: 'auto', display: 'block' }} />
        </Link>
        
        {/* Desktop Links - Centered */}
        <div className="desktop-links flex items-center gap-10">
          <Link to="/services" className={`nav-link-magnus ${location.pathname === '/services' ? 'active' : ''}`}>Services</Link>
          <Link to="/about" className={`nav-link-magnus ${location.pathname === '/about' ? 'active' : ''}`}>About Us</Link>
          <Link to="/contact" className={`nav-link-magnus ${location.pathname === '/contact' ? 'active' : ''}`}>Contact Us</Link>
          <Link to="/blog" className={`nav-link-magnus ${location.pathname === '/blog' ? 'active' : ''}`}>Blog</Link>
        </div>

        {/* Desktop Actions - Right */}
        <div className="desktop-actions flex items-center gap-5">
          <a href="tel:+918318176163" className="nav-cta-btn">
            <div className="cta-icon-circle">
              <Phone size={16} fill="white" color="white" />
            </div>
            <span className="cta-number">+91 8318176163</span>
          </a>
          
          <button className="grid-menu-btn">
            <Grid size={20} color="white" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu flex flex-col items-center">
          <Link to="/" className="mobile-nav-link">Home</Link>
          <Link to="/about" className="mobile-nav-link">About</Link>
          <Link to="/services" className="mobile-nav-link">Services</Link>
          <Link to="/contact" className="mobile-nav-link">Contact</Link>
          <Link to="/blog" className="mobile-nav-link">Blog</Link>
          <Link to="/contact" className="btn btn-primary mobile-btn" style={{ background: 'var(--color-brand-lime)', color: 'black', border: 'none' }}>Get a Proposal</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
