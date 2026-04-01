import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Reveal, StaggerContainer, TiltCard, Parallax, Magnetic } from '../components/MotionWrapper';
import { motion } from 'framer-motion';
import './Blog.css';
import API_URL from '../config/api';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', message: 'Subscribing...' });
    try {
      const res = await fetch(`${API_URL}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ state: 'success', message: 'Welcome to the inner circle!' });
        setEmail('');
      } else {
        setStatus({ state: 'error', message: data.message || 'Something went wrong.' });
      }
    } catch (err) {
      setStatus({ state: 'error', message: 'Connection error. Try again?' });
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <form className="flex flex-col md:flex-row gap-4" onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Enter your work email" 
          className="form-input" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
          disabled={status.state === 'loading'}
        />
        <button 
          type="submit" 
          className="btn btn-primary px-10 whitespace-nowrap"
          disabled={status.state === 'loading'}
        >
          {status.state === 'loading' ? 'Processing...' : 'Subscribe Now'}
        </button>
      </form>
      {status.state !== 'idle' && status.state !== 'loading' && (
        <p className={`mt-4 text-sm font-medium ${status.state === 'success' ? 'text-brand-lime' : 'text-red-400'}`}>
          {status.message}
        </p>
      )}
    </div>
  );
};

const Blog = () => {
  // Reveal Observers (Unused, migrating to Framer Motion)
  // ... removed
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [faqs, setFaqs] = useState([]);
  const [faqLoading, setFaqLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/blogs`)
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });

    fetch(`${API_URL}/api/faqs`)
      .then(res => res.json())
      .then(data => {
        setFaqs(data.filter(f => f.status === 'Active'));
        setFaqLoading(false);
      })
      .catch(err => {
        console.error("Error fetching FAQs:", err);
        setFaqLoading(false);
      });
  }, []);

  const tickerItems = [
    "Google AI Overviews: SEO Strategy Guide",
    "Social Media Marketing in 2025",
    "20 Proven CRO Tips",
    "Local Performance Marketing",
    "Content Strategy Secrets",
    "Scaling Startups with Paid Ads"
  ];


  return (
    <div className="blog-page page-wrapper">
      
      {/* 1. HERO SECTION */}
      <header className="blog-hero relative overflow-hidden">
        {/* Animated Background Decor */}
        <motion.div 
          className="absolute top-1/4 -left-20 w-80 h-80 bg-brand-lime/10 rounded-full blur-[100px] pointer-events-none"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="container blog-hero-content relative z-10">
          <Parallax offset={50}>
            <Reveal>
              <h1 className="blog-hero-title">
                <span className="green-shimmer">Latest blog</span>
              </h1>
              <div className="blog-breadcrumb">
                <Link to="/">Home</Link> 
                <span className="sep">*</span> 
                <span>Blog</span>
              </div>
            </Reveal>
          </Parallax>
        </div>

        {/* MARQUEE TICKER */}
        <div className="blog-ticker">
          <div className="blog-ticker-track">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex">
                {tickerItems.map((item, idx) => (
                  <span key={idx} className="blog-ticker-item">
                    {item} <span className="mx-4 opacity-30">•</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* 2. BLOG CONTENT SECTION */}
      <section className="blog-content-section">
        <div className="container">
          
          <StaggerContainer>
            <div className="blog-grid">
              {loading ? (
                <div className="col-span-full text-center py-20">
                  <div className="animate-spin inline-block w-8 h-8 border-4 border-brand-lime border-t-transparent rounded-full mb-4"></div>
                  <p className="text-muted">Loading our latest insights...</p>
                </div>
              ) : blogs.map((post, index) => (
                <Reveal key={post._id} delay={index * 0.1}>
                    <article className="blog-card h-full flex flex-col">
                      <div className="blog-card-image overflow-hidden">
                        <motion.img 
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          src={post.imagePath.startsWith('http') ? post.imagePath : `${API_URL}${post.imagePath}`} 
                          alt={post.title} 
                        />
                      </div>
                      <div className="blog-card-body flex-1 flex flex-col">
                        <h3 className="blog-card-title flex-1">{post.title}</h3>
                        <div className="mt-auto pt-4">
                          <Link to={`/blog/${post._id}`} className="blog-read-more inline-flex items-center">
                            Read More <ArrowUpRight size={20} className="ml-2" />
                          </Link>
                        </div>
                      </div>
                    </article>
                </Reveal>
              ))}
              {!loading && blogs.length === 0 && (
                <div className="col-span-full text-center py-20">
                  <p className="text-muted">Check back soon for new articles!</p>
                </div>
              )}
            </div>
          </StaggerContainer>

          {/* PAGINATION */}
          <div className="blog-pagination reveal-up">
            <button className="page-arrow">
              <ChevronLeft size={20} />
            </button>
            <button className="page-number active">1</button>
            <button className="page-number">2</button>
            <button className="page-number">3</button>
            <button className="page-arrow">
              <ChevronRight size={20} />
            </button>
          </div>
          
        </div>
      </section>

      {/* 2.1 FAQ SECTION (Expertise Hub) */}
      <section className="section faq-section-wrapper overflow-hidden">
        <div className="container relative z-10">
          <div className="faq-section-separator top"></div>
          
          <div className="text-center mb-20">
            <Reveal>
              <span className="text-brand-lime font-bold uppercase tracking-widest text-sm">* EXPERTISE HUB & FAQ—</span>
              <h2 className="heading-xl mt-6">Still Have <span className="text-brand-lime">Questions?</span></h2>
              <p className="text-xl text-muted max-w-4xl mx-auto mt-6 leading-relaxed">Everything you need to know about how Magnus Corps drives predictable growth for your startup.</p>
            </Reveal>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="magnus-grid cols-60-40 gap-16 align-center mb-24">
              <Reveal delay={0.1}>
                <div className="faq-context-above text-left">
                  <h3 className="text-4xl font-bold mb-6"><span className="green-shimmer">Clarity is our first priority.</span></h3>
                  <p className="text-xl text-muted leading-relaxed">
                    We believe that marketing shouldn't be a black hole. Whether you're curious about our ROI timelines or our founder-level execution, we've broken down the most common questions from startups below.
                  </p>
                  <p className="text-lg text-muted mt-6 italic">
                    "Still have questions? Our expertise hub is built to give founders the absolute transparent answers they deserve."
                  </p>
                </div>
              </Reveal>

              <div className="faq-column-right">
                <Reveal delay={0.3}>
                  <div className="faq-visual-wrapper">
                    <div className="faq-img-glow"></div>
                    <img 
                      src="/assets/magnus-faq-visual.png" 
                      alt="Magnus Corps FAQ Visual" 
                      className="img-magnus-arch faq-main-img" 
                    />
                    <div className="faq-floating-badge glass-panel">
                      <span className="text-brand-lime font-bold">99%</span>
                      <p className="text-xs text-muted">Client Clarity</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            <Reveal delay={0.4}>
              <div className="faq-bridge-text text-center mb-16">
                <span className="text-brand-lime font-bold uppercase tracking-[0.3em] text-xs">* SELECT A TOPIC TO LEARN MORE—</span>
              </div>
            </Reveal>

            <div className="max-w-7xl mx-auto">
              {faqLoading ? (
                <div className="flex flex-col gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="faq-skeleton animate-pulse h-20 bg-white/5 rounded-2xl"></div>
                  ))}
                </div>
              ) : faqs.length > 0 ? (
                <div className="faq-scroll-box glass-panel-deep">
                  <div className="faq-accordion">
                    {faqs.map((faq, index) => (
                      <motion.div 
                        key={faq._id}
                        className={`faq-item glass-panel ${activeFaq === index ? 'active' : ''}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <button 
                          className="faq-question" 
                          onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                        >
                          <span className="question-text">{faq.question}</span>
                          <div className="faq-icon-wrapper">
                            {activeFaq === index ? <X size={20} /> : <ChevronRight size={20} />}
                          </div>
                        </button>
                        <motion.div 
                          className="faq-answer"
                          initial={false}
                          animate={{ height: activeFaq === index ? 'auto' : 0, opacity: activeFaq === index ? 1 : 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="faq-answer-inner pt-2 pb-8 px-8 text-muted leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }}>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-center text-muted">No FAQs available at the moment. Please contact us for more info.</p>
              )}
            </div>

            <Reveal delay={0.2}>
              <div className="faq-context-below mt-20 text-center">
                <div className="inline-block p-1 rounded-full bg-brand-lime/10 border border-brand-lime/20 mb-6 px-6">
                  <span className="text-brand-lime font-bold text-sm tracking-widest uppercase">The Bottom Line →</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">We build systems that <span className="text-brand-lime">grow predictably.</span></h3>
                <p className="text-muted max-w-2xl mx-auto">
                  If your question isn't listed here, it just means your business has specific needs that deserve a one-on-one strategy call. Let's find your fastest path to customers together.
                </p>
              </div>
            </Reveal>
          </div>
          
          <div className="faq-section-separator bottom mt-24"></div>
        </div>
      </section>

      {/* 3. NEWSLETTER CTA */}
      <section className="section bg-black-40">
        <div className="container">
          <div className="glass-panel text-center py-16" style={{ border: '1px solid var(--color-brand-lime)' }}>
             <h2 className="heading-md mb-6">Stay ahead of the curve.</h2>
             <p className="text-muted mb-10 max-w-2xl mx-auto">Subscribe to our newsletter for weekly insights on AI search, performance marketing, and high-conversion strategy.</p>
             
             <NewsletterForm />
          </div>
        </div>
      </section>

    </div>
  );
};

export default Blog;
