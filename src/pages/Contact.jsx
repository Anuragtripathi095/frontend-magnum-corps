import { useState } from 'react';
import { Mail, Phone, Clock, AlertCircle, CheckCircle2, MapPin, Star, ArrowRight, User, Tag, MessageSquare, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Contact.css';
import API_URL from '../config/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', message: ''
  });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', message: 'Sending message...' });
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setStatus({ state: 'success', message: 'Thanks for reaching out! We will contact you soon.' });
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      } else {
        setStatus({ state: 'error', message: data.message || 'Failed to send message.' });
      }
    } catch (error) {
       setStatus({ state: 'error', message: 'Network error. Please try again later.' });
    }
  };

  return (
    <div className="contact-page page-wrapper">
      {/* 1. HEADER HERO */}
      <header className="contact-header">
        <div className="container overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="breadcrumb">
              <Link to="/">Home</Link> 
              <span className="sep">*</span> 
              <span>Contact us</span>
            </div>
            <h1 className="contact-header-title">
              <span className="green-shimmer">Let's Collaborate</span>
            </h1>
          </motion.div>
        </div>

        {/* NEON TICKER */}
        <div className="ticker-bar">
          <div className="ticker-content">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex">
                <span className="ticker-item">* Strategic Growth</span>
                <span className="ticker-item">* Performance Marketing</span>
                <span className="ticker-item">* Custom Solutions</span>
                <span className="ticker-item">* Dedicated Support</span>
                <span className="ticker-item">* Data-Driven ROI</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="section bg-black-40">
        <div className="container">
          <div className="magnus-grid cols-40-60 gap-12">
            
            {/* Contact Info — slides from left */}
            <motion.div
              initial={{ opacity: 0, x: -60, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-muted mb-10 leading-relaxed">Ready to move from guesswork to growth? Let's identify your fastest revenue opportunity together.</p>
              
              <div className="space-y-6">
                {[
                  { icon: <Mail size={24} />, label: 'Email Us', value: 'info@magnuscorps.com' },
                  { icon: <Phone size={24} />, label: 'Call Us', value: '+91 8318176163' },
                  { icon: <MapPin size={24} />, label: 'Location', value: 'India, Anywhere Digital' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.12, ease: [0.25, 1, 0.5, 1] }}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-brand-lime flex items-center justify-center text-black">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-muted">{item.label}</p>
                      <p className="font-bold">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-12 glass-panel p-6 border-l-4 border-l-brand-lime"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
              >
                <div className="flex items-center gap-1 text-brand-lime mb-3">
                  <Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} />
                </div>
                <p className="text-sm italic">"The team at Magnus transformed our brand's presence with creativity and precision. Highly recommended for startups!"</p>
              </motion.div>
            </motion.div>

            {/* Contact Form — slides from right */}
            <motion.div
              initial={{ opacity: 0, x: 60, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            >
               <div className="inline-contact glass-panel p-8" style={{ background: 'rgba(20,20,20,0.6)' }}>
                 <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid md:grid-cols-2 gap-6">
                       <div className="form-group mb-0">
                          <label className="flex items-center gap-3 mb-2 font-bold text-sm uppercase tracking-wider text-muted">
                            <User size={16} className="text-brand-lime" /> Name
                          </label>
                          <input type="text" name="name" required value={formData.name} onChange={handleChange} className="form-input" placeholder="Your Name" />
                       </div>
                       <div className="form-group mb-0">
                          <label className="flex items-center gap-3 mb-2 font-bold text-sm uppercase tracking-wider text-muted">
                            <Mail size={16} className="text-brand-lime" /> Email
                          </label>
                          <input type="email" name="email" required value={formData.email} onChange={handleChange} className="form-input" placeholder="you@company.com" />
                       </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                       <div className="form-group mb-0">
                          <label className="flex items-center gap-3 mb-2 font-bold text-sm uppercase tracking-wider text-muted">
                            <Phone size={16} className="text-brand-lime" /> Phone Number
                          </label>
                          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-input" placeholder="+91 xxxxx xxxxx" />
                       </div>
                       <div className="form-group mb-0">
                          <label className="flex items-center gap-3 mb-2 font-bold text-sm uppercase tracking-wider text-muted">
                            <Tag size={16} className="text-brand-lime" /> Company Name
                          </label>
                          <input type="text" name="company" value={formData.company} onChange={handleChange} className="form-input" placeholder="Your Startup Inc." />
                       </div>
                    </div>

                    <div className="form-group mb-0">
                       <label className="flex items-center gap-3 mb-2 font-bold text-sm uppercase tracking-wider text-muted">
                          <MessageSquare size={16} className="text-brand-lime" /> Message
                       </label>
                       <textarea name="message" required rows="4" value={formData.message} onChange={handleChange} className="form-input" placeholder="Tell us about your current marketing challenges..."></textarea>
                    </div>

                    {status.state !== 'idle' && status.state !== 'loading' && (
                      <div className={`status-message flex gap-2 items-center p-4 rounded-lg bg-black-40 text-brand-lime border border-brand-lime/20 mb-4`}>
                        {status.state === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                        {status.message}
                      </div>
                    )}

                    <button type="submit" className="btn btn-primary mt-2 flex items-center justify-center gap-3 w-full py-4 text-lg" disabled={status.state === 'loading'}>
                       {status.state === 'loading' ? 'Sending...' : (
                         <>
                           <span>Send Message</span>
                           <Send size={18} />
                         </>
                       )}
                    </button>
                 </form>
               </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
