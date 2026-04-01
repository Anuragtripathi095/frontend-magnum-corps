import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <footer className="footer section">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 footer-grid">
          {/* Brand & Intro */}
          <div className="footer-col" style={{ gridColumn: 'span 2' }}>
            <p className="text-muted" style={{ maxWidth: '400px' }}>
              Not gyaan. Not jargon. Just clarity and predictable growth.
              We build systems that grow predictably.
            </p>
            <div className="social-links flex gap-3 mt-6">
              {/* Behance */}
              <a href="https://www.behance.net/magnuscorps" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Behance">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.803 5.731c.589 0 1.119.051 1.605.155.483.103.895.273 1.243.508.343.235.611.543.804.916.19.37.284.816.284 1.329 0 .57-.128 1.045-.388 1.42-.259.374-.644.683-1.151.929.695.202 1.213.554 1.557 1.056.342.496.516 1.09.516 1.772 0 .568-.105 1.063-.318 1.488-.212.422-.505.773-.876 1.047-.369.27-.801.474-1.297.604-.493.133-1.015.197-1.565.197H1V5.731h6.803zm-.351 4.972c.465 0 .842-.114 1.128-.339.285-.23.428-.578.428-1.05 0-.267-.049-.49-.146-.67-.097-.18-.231-.325-.4-.43-.168-.103-.361-.177-.578-.218-.215-.043-.444-.063-.687-.063H3.421v2.77h4.031zm.187 5.239c.267 0 .521-.025.76-.076.24-.053.45-.136.634-.254.181-.118.326-.275.435-.471.108-.198.163-.445.163-.742 0-.59-.166-1.022-.496-1.291-.33-.27-.771-.404-1.326-.404H3.421v3.238h4.218zm9.645.829c.314.307.765.459 1.352.459.423 0 .786-.107 1.093-.318.305-.212.493-.437.564-.672h2.214c-.354 1.089-.895 1.869-1.626 2.338-.729.469-1.613.703-2.649.703-.719 0-1.368-.116-1.947-.35-.578-.232-1.069-.563-1.471-.991-.402-.428-.712-.941-.929-1.538-.218-.596-.326-1.251-.326-1.963 0-.69.109-1.33.33-1.916.218-.585.533-1.093.94-1.518.409-.426.897-.758 1.462-.997.567-.239 1.196-.357 1.892-.357.774 0 1.45.149 2.031.449.578.3 1.058.706 1.435 1.218.378.512.649 1.099.814 1.759.164.659.219 1.358.164 2.095h-6.603c.035.637.239 1.133.55 1.399zm3.59-4.705c-.25-.275-.656-.414-1.218-.414-.353 0-.647.057-.885.175-.234.115-.424.259-.569.431-.142.173-.245.357-.306.551-.06.195-.097.378-.108.549h3.627c-.096-.563-.291-.997-.541-1.292zm-4.056-5.09h4.822v1.154h-4.822V6.976z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/magnuscorps/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/magnuscorps/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
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
                <Phone size={16} className="text-primary" />
                <a href="tel:+918318176163">+91 8318176163</a>
              </li>
              <li className="flex items-center gap-2 mt-2">
                <Mail size={16} className="text-primary" />
                <a href="mailto:info@magnuscorps.com">info@magnuscorps.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Full-Width Newsletter Section */}
        <div className="footer-newsletter-row mt-16 mb-8 py-10 px-8 glass-panel-deep rounded-3xl border border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
            <div className="newsletter-text text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Subscribe Our Newsletter</h3>
              <p className="text-muted text-sm">Stay ahead of the curve with predictable growth insights.</p>
            </div>
            <form onSubmit={handleSubscribe} className="newsletter-form-wide flex-1 max-w-lg w-full">
              <div className="newsletter-input-group-wide flex p-1 rounded-full bg-white/5 border border-white/10 focus-within:border-brand-lime transition-all">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-none outline-none px-6 py-3 text-white flex-1 min-w-0"
                  required
                />
                <button
                  type="submit"
                  className={`px-8 py-3 rounded-full bg-brand-lime text-black font-bold h-full whitespace-nowrap transition-all ${status === 'loading' ? 'opacity-70' : 'hover:scale-105 hover:shadow-[0_0_20px_rgba(190,255,53,0.3)]'}`}
                  disabled={status !== 'idle'}
                >
                  {status === 'success' ? 'Subscribed!' : status === 'loading' ? '...' : 'Subscribe'}
                </button>
              </div>
              {status === 'success' && (
                <p className="text-brand-lime text-center mt-3 text-sm animate-fade-in">
                  Welcome aboard! You're now in the loop.
                </p>
              )}
            </form>
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
