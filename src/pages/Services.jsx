import { Rss, Target, PenTool, Layout, MonitorSmartphone, Share2, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal, StaggerContainer, TiltCard } from '../components/MotionWrapper';
import { motion } from 'framer-motion';
import whyChooseImg from '../assets/why_choose_graphic.png';
import './Services.css';

const Services = () => {
  const services = [
    { title: 'Search Engine Optimisation', desc: 'Focuses on buyer-intent keywords that bring real inquiries.', icon: <Rss size={48} className="text-primary" /> },
    { title: 'Performance Marketing', desc: 'Design and manage lead-focused campaigns avoiding wasted budget.', icon: <Target size={48} className="text-primary" /> },
    { title: 'Social Media Marketing', desc: 'Keep your business visible to the right audience with consistency.', icon: <Share2 size={48} className="text-primary" /> },
    { title: 'Content Writing', desc: 'Content designed to educate, rank, and convert every word aligned with your goals.', icon: <PenTool size={48} className="text-primary" /> },
    { title: 'Search Intelligence', desc: 'Beyond traditional SEO. We analyze real search behavior and competitor gaps.', icon: <Layout size={48} className="text-primary" /> },
    { title: 'Website Designing', desc: 'Fast, conversion-focused websites that explain your business clearly and build instant trust.', icon: <MonitorSmartphone size={48} className="text-primary" /> }
  ];

  return (
    <div className="services-page page-wrapper">
      {/* 1. HEADER HERO */}
      <header className="services-header">
        <div className="container overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="breadcrumb">
              <Link to="/">Home</Link> 
              <span className="sep">*</span> 
              <span>Services</span>
            </div>
            <h1 className="services-header-title">
              <span className="green-shimmer">Our Services</span>
            </h1>
          </motion.div>
        </div>

        {/* NEON TICKER */}
        <div className="ticker-bar">
          <div className="ticker-content">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex">
                <span className="ticker-item">* SEO Optimization</span>
                <span className="ticker-item">* Performance Ads</span>
                <span className="ticker-item">* Content Strategy</span>
                <span className="ticker-item">* UI/UX Design</span>
                <span className="ticker-item">* Social Growth</span>
                <span className="ticker-item">* Brand Identity</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* 2. SERVICES GRID */}
      <section className="section bg-black/40" style={{ paddingBottom: 0 }}>
        <div className="container">
          <motion.div
            className="text-center mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          >
            <h2 className="heading-lg mb-4">Startup-First Growth Solutions</h2>
            <p className="text-muted text-lg">We don't sell packages. We design growth systems based on your stage, budget, and urgency.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {services.map((item, idx) => (
               <motion.div
                 key={idx}
                 initial={{ opacity: 0, y: 50, scale: 0.9 }}
                 whileInView={{ opacity: 1, y: 0, scale: 1 }}
                 viewport={{ once: true, margin: '-60px' }}
                 transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.25, 1, 0.5, 1] }}
               >
                 <div className="glass-panel h-full" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                   <div className="icon-box text-brand-lime">{item.icon}</div>
                   <div>
                     <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                     <p className="text-muted mb-6 leading-relaxed">{item.desc}</p>
                     <ul className="space-y-3 mb-8">
                       <li className="flex items-center gap-3 text-sm text-white/80 font-semibold"><CheckCircle2 className="text-brand-lime" size={18}/> ROI Focused Execution</li>
                       <li className="flex items-center gap-3 text-sm text-white/80 font-semibold"><CheckCircle2 className="text-brand-lime" size={18}/> Transparent Data Reporting</li>
                     </ul>
                     <Link to="/contact" className="inline-flex items-center gap-2 text-brand-lime font-bold hover:gap-4 transition-all">
                        Get Started <ArrowRight size={18} />
                     </Link>
                   </div>
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="section bg-[#07070a] relative why-choose-section overflow-hidden" style={{ paddingTop: 0 }}>
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-lime/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-lime/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-brand-lime rounded-full shadow-[0_0_10px_var(--color-brand-lime)] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-brand-lime/50 rounded-full blur-[1px] shadow-[0_0_15px_var(--color-brand-lime)] pointer-events-none"></div>

        <div className="container relative z-10">
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
                  We focus on measurable impact — not vanity. Our team pairs commercial thinking with hands-on execution so your marketing drives predictable business outcomes. Every plan is customised to your budget, timelines, and KPIs.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 items-center mt-8" style={{ gap: '4rem' }}>
            <div className="flex flex-col justify-center gap-6">
              {[
                { title: 'Insight-Led Decisions', desc: "We turn raw data into clear experiments. Fast tests, decisive scaling, and straightforward metrics ensure you're investing only in what moves the needle." },
                { title: 'Transparent, Value-First Pricing', desc: "Pricing that's easy to understand and aligned with performance. Choose the model that fits your stage — hands-on short-term engagement or predictable support for longer growth cycles." },
                { title: 'Responsible & Accountable', desc: "Clear agreements, secure data practices, and honest reporting. If something underperforms, we own it, fix it, and share the learnings — no excuses, only progress." }
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
                 <img src={whyChooseImg} alt="Business growth and momentum" className="why-choose-graphic" />
                 <div className="why-choose-img-inner-shadow"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. CTA SECTION */}
      <section className="section text-center relative z-10" style={{ paddingTop: '4rem' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="glass-panel py-16 px-8" style={{ border: '1px solid var(--color-brand-lime)' }}>
              <h2 className="heading-lg mb-6">Ready to scale your startup?</h2>
              <p className="text-muted mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                Let's identify your fastest revenue opportunity together. No jargon, just results.
              </p>
              <Link to="/contact" className="btn btn-primary btn-lg">Book a Free Clarity Call</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
