import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Grid, Mail, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and sidebar on route change
  useEffect(() => {
    setIsOpen(false);
    setIsSidebarOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'nav-scrolled' : ''} ${isOpen ? 'nav-open' : ''}`}>
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
          
          <button className="grid-menu-btn" onClick={toggleSidebar}>
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
        <div className="mobile-menu flex flex-col">
          <Link to="/services" className="mobile-nav-link">Services</Link>
          <Link to="/about" className="mobile-nav-link">About Us</Link>
          <Link to="/contact" className="mobile-nav-link">Contact Us</Link>
          <Link to="/blog" className="mobile-nav-link">Blog</Link>
        </div>
      )}
      {/* Sidebar Popup */}
      <div className={`nav-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-glow-bg"></div>
        <div className="sidebar-header">
          <Link to="/" onClick={toggleSidebar}>
            <img src="/images/magnus_logo.png" alt="Magnus Corps Logo" className="sidebar-logo" />
          </Link>
          <button className="sidebar-close" onClick={toggleSidebar}>
            <X size={30} />
          </button>
        </div>

        <div className="sidebar-content">
          <div className="sidebar-welcome mb-8">
            <span className="text-brand-lime font-bold uppercase tracking-widest text-xs">* MAGNUS CORPS HUB —</span>
            <h2 className="text-3xl font-bold mt-2">Get in <span className="text-brand-lime">Touch</span></h2>
            <p className="text-muted text-sm mt-3">Ready to build something predictable? Our team is available for direct support and strategy inquiries.</p>
          </div>

          <div className="sidebar-contact-container">
            <a href="tel:+918318176163" className="sidebar-contact-card glass-panel-deep">
              <div className="card-icon-box">
                <Phone size={28} />
              </div>
              <div className="card-info">
                <h3>Direct Line</h3>
                <p>+91 8318176163</p>
                <span className="card-label">Available 10AM - 8PM</span>
              </div>
            </a>

            <a href="mailto:info@magnuscorps.com" className="sidebar-contact-card glass-panel-deep">
              <div className="card-icon-box">
                <Mail size={28} />
              </div>
              <div className="card-info">
                <h3>Our Email</h3>
                <p>info@magnuscorps.com</p>
                <span className="card-label">Strategic Inquiries Only</span>
              </div>
            </a>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-footer-divider"></div>
          <p>© 2024 Magnus Corps. All rights reserved.</p>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </nav>
  );
};

export default Navbar;
