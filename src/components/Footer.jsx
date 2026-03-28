import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Share2, Globe, MessageCircle } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer section">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 footer-grid">
          {/* Brand & Intro */}
          <div className="footer-col" style={{ gridColumn: 'span 2' }}>
            <Link to="/" className="footer-brand" style={{ marginBottom: '1.5rem', display: 'block' }}>
              <img src="/images/magnus_logo_h.png" alt="Magnus Corps Logo" style={{ height: '40px', width: 'auto' }} />
            </Link>
            <p className="text-muted" style={{ maxWidth: '400px' }}>
              Not gyaan. Not jargon. Just clarity and predictable growth.
              We build systems that grow predictably.
            </p>
            <div className="social-links flex gap-4 mt-6">
              <a href="#" className="social-icon"><Share2 size={20} /></a>
              <a href="#" className="social-icon"><Globe size={20} /></a>
              <a href="#" className="social-icon"><MessageCircle size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
             <h4 className="footer-heading">Contact Us</h4>
             <ul className="footer-info">
               <li className="flex items-center gap-2">
                 <Phone size={16} className="text-primary"/> 
                 <a href="tel:+918318176163">+91 8318176163</a>
               </li>
               <li className="flex items-center gap-2 mt-2">
                 <Mail size={16} className="text-primary" />
                 <a href="mailto:info@magnuscorps.com">info@magnuscorps.com</a>
               </li>
             </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="text-muted text-center">
            &copy; {new Date().getFullYear()} Magnus Corps. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
