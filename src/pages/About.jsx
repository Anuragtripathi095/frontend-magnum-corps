import { Link } from 'react-router-dom';
import { 
  ArrowRight, Target, Telescope, ShieldCheck, 
  Layers, Cpu, Zap, Star
} from 'lucide-react';
import { Reveal, StaggerContainer, TiltCard } from '../components/MotionWrapper';
import { motion } from 'framer-motion';
import whyChooseImg from '../assets/why_choose_graphic.png';
import './About.css';

const About = () => {
  return (
    <div className="about-page page-wrapper">
      
      {/* 1. HEADER HERO */}
      <header className="about-header">
        <div className="container overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="breadcrumb">
              <Link to="/">Home</Link> 
              <span className="sep">*</span> 
              <span>About Us</span>
            </div>
            <h1 className="about-header-title">
              <span className="green-shimmer">About us</span>
            </h1>
          </motion.div>
        </div>

        {/* NEON TICKER */}
        <div className="ticker-bar">
          <div className="ticker-content">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex">
                <span className="ticker-item">* Strategy Consulting</span>
                <span className="ticker-item">* Analytics & Reporting</span>
                <span className="ticker-item">* Custom Branding</span>
                <span className="ticker-item">* Website Design</span>
                <span className="ticker-item">* Digital Marketing</span>
                <span className="ticker-item">* Performance Growth</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* 2. INTRODUCTION SECTION */}
      <section className="intro-section relative">
        <div className="silver-globe-container">
          <div className="silver-globe float-slow"></div>
        </div>
        
        <div className="container">
          <div className="magnus-grid cols-50-50 align-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -60, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="intro-badge">
                <Star size={14} fill="currentColor" /> ABOUT MAGNUS CORPS
              </div>
              <h2 className="intro-heading">
                Crafting <span>focused digital</span> growth experiences that bring customers — not confusion
              </h2>
              <p className="text-muted text-lg mb-10 max-w-xl leading-relaxed">
                We don't chase trends or buzzwords. We build digital systems that help businesses acquire customers, validate demand, and scale with clarity.
              </p>
              <div className="flex gap-6 items-center">
                <Link to="/contact" className="magnus-premium-btn">
                  <span className="btn-text">Contact Us</span>
                  <div className="btn-icon">
                    <ArrowRight size={22} color="black" className="arrow-icon" />
                  </div>
                  <div className="btn-glow"></div>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="vertical-features">
                {[
                  { icon: <Cpu size={32} />, title: 'Your Growth, Our Responsibility', desc: "We don't measure success by impressions or reports. We measure it by leads generated, customers acquired, and revenue growth. If it doesn't move your business forward, we don't recommend it." },
                  { icon: <Layers size={32} />, title: 'Builders Of Practical Digital Systems', desc: "At Magnus Corps, we design digital strategies that work in the real world. Every campaign, funnel, and message is built to solve one problem first: How do we get your next customer — fast and sustainably?" },
                  { icon: <Zap size={32} />, title: 'Strategy Before Channels', desc: "We don't start with SEO, ads, or social media. We start with clarity — understanding your business model, margins, and urgency. Only then do we select the channels that will deliver the fastest ROI." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="feature-item"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15, ease: [0.25, 1, 0.5, 1] }}
                  >
                    <div className="feature-dot"></div>
                    <div className="feature-content">
                      <div className="feature-icon-box">{item.icon}</div>
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION SECTION */}
      <section className="vision-grid bg-surface/20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Target size={30} />, title: 'Our Mission', desc: 'To empower startups and established businesses with clarity and predictable growth by building high-performing digital marketing systems that turn visitors into loyal customers.' },
              { icon: <Telescope size={30} />, title: 'Our Vision', desc: 'To be the most trusted performance-first digital marketing partner in India, known for results over vanity metrics and strategy over noise.' },
              { icon: <ShieldCheck size={30} />, title: 'Core Values', desc: (
                  <ul className="value-list">
                    <li><span className="dot"></span> Clarity over complexity</li>
                    <li><span className="dot"></span> Results over vanity metrics</li>
                    <li><span className="dot"></span> Transparency in action</li>
                    <li><span className="dot"></span> Strategy-first approach</li>
                    <li><span className="dot"></span> Continuous optimization</li>
                  </ul>
                )
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 1, 0.5, 1] }}
              >
                <div className="vision-card h-full">
                  <div className="icon-circle">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <div className="text-muted leading-relaxed">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="section bg-[#07070a] relative why-choose-section overflow-hidden" style={{ paddingTop: '4rem' }}>
        {/* Abstract floating lights */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-lime/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-lime/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="container relative z-10">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row mb-16 items-start" style={{ gap: '4rem' }}>
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -50, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              >
                <div className="flex items-center gap-2 text-brand-lime font-bold tracking-widest text-lg uppercase mb-6">
                  <span className="leading-none mt-1" style={{ fontSize: '2rem' }}>*</span> Why Choose Us
                </div>
                <h2 className="heading-xl leading-[1.15]" style={{ letterSpacing: '-0.02em', fontWeight: '400' }}>
                  Practical expertise <span className="text-brand-lime font-bold">that accelerates</span> your digital momentum
                </h2>
              </motion.div>
            </div>
            <div className="flex-1 lg:mt-12">
              <motion.div
                initial={{ opacity: 0, x: 50, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
              >
                <p className="text-white/80 leading-relaxed font-light" style={{ fontSize: '1.25rem' }}>
                  We focus on measurable impact — not vanity. Our team pairs commercial thinking with hands-on execution so your marketing drives predictable business outcomes.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 items-center mt-8" style={{ gap: '4rem' }}>
            <div className="flex flex-col justify-center gap-6">
              {[
                { title: 'Insight-Led Decisions', desc: "We turn raw data into clear experiments. Fast tests, decisive scaling, and straightforward metrics ensure you're investing only in what moves the needle." },
                { title: 'Transparent, Value-First Pricing', desc: "Pricing that's easy to understand and aligned with performance. Choose the model that fits your stage." },
                { title: 'Responsible & Accountable', desc: "Clear agreements, secure data practices, and honest reporting. If something underperforms, we own it, fix it, and share the learnings." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="why-choose-card"
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 1, 0.5, 1] }}
                >
                  <h3 className="font-bold mb-3 text-white tracking-wide" style={{ fontSize: '1.5rem' }}>{item.title}</h3>
                  <p className="text-white/70 leading-relaxed font-light" style={{ fontSize: '1.1rem' }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.85, x: 80, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="why-choose-img-wrapper" style={{ width: '100%', maxWidth: '550px' }}>
                 <div className="why-choose-img-overlay"></div>
                 <img 
                   src={whyChooseImg} 
                   alt="Business growth and momentum" 
                   className="why-choose-graphic" 
                 />
                 <div className="why-choose-img-inner-shadow"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIAL CAROUSEL SECTION */}
      <section className="section bg-black/30" style={{ paddingTop: '4rem' }}>
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          >
             <h2 className="heading-lg mb-4">What Our Clients Say</h2>
             <p className="text-muted">Real Growth. Real Stories. Our work speaks for itself through the success of our partners.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="testimonial-slider-container">
              <motion.div 
                className="testimonial-slider-track"
                animate={{ x: [0, -1000] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                {[...Array(4)].map((_, group) => (
                  <div key={group} className="flex gap-8">
                    {[
                      { name: 'Sarah Mitchell', title: 'Marketing Director', text: "The team transformed our brand's online presence with creativity and precision. Their strategic approach resulted in a significant increase in lead generation." },
                      { name: 'John Anderson', title: 'CEO', text: "Most businesses jump into digital marketing with high hopes, but these guys delivered results. They understood our business model and urgency from day one." },
                      { name: 'Emma Davis', title: 'Product Manager', text: "Finally, an agency that values strategy over noise. Their performance marketing campaigns have been a game changer for our Q3 growth." }
                    ].map((t, idx) => (
                      <div key={idx} className="testimonial-slide glass-panel">
                        <div className="stars mb-4" style={{ color: 'var(--color-brand-lime)' }}>
                          <Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} />
                        </div>
                        <p className="text-lg italic mb-6">"{t.text}"</p>
                        <div>
                          <h4 className="font-bold text-white">{t.name}</h4>
                          <p className="text-sm text-brand-lime">{t.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. FINAL CTA SECTION */}
      <section className="section text-center relative z-10">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="glass-panel py-16 px-8" style={{ border: '1px solid var(--color-brand-lime)' }}>
              <h2 className="heading-lg mb-6">Founder-level strategy, senior execution</h2>
              <p className="text-muted mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                Your growth is guided by experienced strategists who understand business trade-offs, not by junior interns following checklists.
              </p>
              <Link to="/contact" className="btn btn-primary btn-lg">Start Driving Growth Now</Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default About;
