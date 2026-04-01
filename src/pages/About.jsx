import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Target, Telescope, ShieldCheck,
  Layers, Cpu, Zap, Star, ChevronLeft, ChevronRight, X
} from 'lucide-react';
import MarqueeModule from "react-fast-marquee";
const Marquee = MarqueeModule.default || MarqueeModule;
import { Reveal, StaggerContainer, TiltCard } from '../components/MotionWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import whyChooseImg from '../assets/why_choose_graphic.png';
import yashikaImg from '../assets/yashika_tour.png';
import drSainiImg from '../assets/dr_saini.png';
import API_URL from '../config/api';
import './About.css';

const TESTIMONIALS = [
  { name: 'Sarah Mitchell', title: 'Marketing Director', text: "The team transformed our brand's online presence with creativity and precision. Their strategic approach resulted in a significant increase in lead generation." },
  { name: 'John Anderson', title: 'CEO', text: "Most businesses jump into digital marketing with high hopes, but these guys delivered results. They understood our business model and urgency from day one." },
  { name: 'Emma Davis', title: 'Product Manager', text: "Finally, an agency that values strategy over noise. Their performance marketing campaigns have been a game changer for our Q3 growth." },
  { name: 'David Chen', title: 'StartUp Founder', text: "Clarity over complexity. That's what Magnus Corps brought to our acquisition funnel. We saw a 40% improvement in conversion within the first month." }
];

const PROJECT_KEYWORDS = [
  'ELITE PERFORMANCE', 'ROI-DRIVEN', 'STRATEGY FIRST', 'MARKET DOMINANCE',
  'CLARITY OVER NOISE', 'PREDICTABLE GROWTH', 'FOUNDER-LEVEL EXECUTION'
];


const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isTestimonialsPaused, setIsTestimonialsPaused] = useState(false);
  const [testimonialDirection, setTestimonialDirection] = useState("left");

  // FAQ State
  const [faqs, setFaqs] = useState([]);
  const [faqLoading, setFaqLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState(null);
  const [projects, setProjects] = useState([]);
  const scrollRef = useRef(null);

  const scrollProjects = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 330 : 420; // Card width + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Fetch FAQs and Projects on component mount
  React.useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(`${API_URL}/api/faqs`);
        const data = await response.json();
        setFaqs(data.filter(f => f.status === 'Active'));
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setFaqLoading(false);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/api/projects`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchFaqs();
    fetchProjects();
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const nextProject = useCallback(() => {
    if (projects.length === 0) return;
    setProjectIndex((prev) => (prev + 1) % projects.length);
  }, [projects]);

  const prevProject = useCallback(() => {
    if (projects.length === 0) return;
    setProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects]);

  // No manual timer needed for infinite fast-marquee
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
              {
                icon: <ShieldCheck size={30} />, title: 'Core Values', desc: (
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

          <div className="project-carousel-wrapper relative mx-auto w-full max-w-[1400px] px-12 sm:px-16 md:px-24">
            {/* NAVIGATION BUTTONS */}
            <button
              className="project-nav-btn left"
              onMouseEnter={() => setIsTestimonialsPaused(true)}
              onMouseLeave={() => setIsTestimonialsPaused(false)}
              onClick={(e) => {
                e.stopPropagation();
                setTestimonialDirection("right");
              }}
            >
              <ChevronLeft size={24} />
            </button>

            <div className="testimonial-slider-container overflow-hidden py-8 w-full"
              onMouseEnter={() => setIsTestimonialsPaused(true)}
              onMouseLeave={() => setIsTestimonialsPaused(false)}>
              <Marquee
                speed={40}
                direction={testimonialDirection}
                pauseOnHover={true}
                play={!isTestimonialsPaused}
                gradient={true}
                gradientColor={[0, 0, 0]}
                gradientWidth={100}
                className="testimonial-marquee-track"
                autoFill={true}
              >
                {/* Double the testimonials to create a seamless loop */}
                {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
                  <div key={idx} className="testimonial-slide glass-panel mx-4" style={{ width: '450px', flexShrink: 0 }}>
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
              </Marquee>
            </div>

            <button
              className="project-nav-btn right"
              onMouseEnter={() => setIsTestimonialsPaused(true)}
              onMouseLeave={() => setIsTestimonialsPaused(false)}
              onClick={(e) => {
                e.stopPropagation();
                setTestimonialDirection("left");
              }}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* 4.1 PROJECT PORTFOLIO SECTION */}
      <section className="section bg-[#050507] overflow-hidden" style={{ padding: '6rem 0' }}>
        <div className="container">
          <Reveal>
            <div className="text-center mb-24">
              <span className="text-brand-lime font-bold uppercase tracking-widest text-sm">* IMPACT PORTFOLIO—</span>
              <h2 className="heading-xl mt-6">Proof of <span className="text-brand-lime">Performance</span></h2>
              <p className="text-xl text-muted max-w-4xl mx-auto mt-6 leading-relaxed">We don't just build websites; we build systems that grow startups and established brands predictably.</p>
            </div>
          </Reveal>
        </div>

        {/* KEYWORD TICKER (Marquee) */}
        <div className="project-keyword-ticker mb-16 overflow-hidden">
          <div className="project-keyword-track flex items-center">
            {[...PROJECT_KEYWORDS, ...PROJECT_KEYWORDS, ...PROJECT_KEYWORDS].map((word, i) => (
              <div key={i} className="keyword-item whitespace-nowrap flex items-center">
                <span>{word}</span>
                <b>*</b>
              </div>
            ))}
          </div>
        </div>

        {/* HORIZONTAL PROJECT CARDS - SMART CAROUSEL */}
        <div className="project-slider-section-inner relative group">
          <div className="project-carousel-wrapper relative mx-auto w-full max-w-[1400px]">
            {/* NAVIGATION BUTTONS */}
            <button
              className="project-nav-btn left"
              aria-label="Previous Project"
              onClick={() => scrollProjects('left')}
            >
              <ChevronLeft size={24} />
            </button>

            <div
              className="project-slider-container"
              ref={scrollRef}
            >
              <div className="project-stepped-track">
                {projects.map((project, i) => {
                  let imgSrc = yashikaImg;
                  if (project.imagePath) {
                    if (project.imagePath.startsWith('/src/')) imgSrc = project.imagePath;
                    else if (project.imagePath.startsWith('http')) imgSrc = project.imagePath;
                    else imgSrc = `${API_URL}${project.imagePath}`;
                  }

                  return (
                    <div
                      key={i}
                      className="project-portfolio-card"
                    >
                      <div className="project-card-inner">
                        <div className="project-img-frame">
                          <img src={imgSrc} alt={project.name} className="project-main-img" />
                        </div>
                        <div className="project-content-below text-center">
                          <span className="text-brand-lime font-bold tracking-widest text-[10px] uppercase mb-2 block">{project.technology}</span>
                          <h3 className="project-title-large">{project.name}</h3>
                          <p className="text-white/50 text-sm mt-3 leading-relaxed line-clamp-2 px-4">{project.description}</p>
                          <div className="mt-8">
                            {project.link && (
                              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-view-btn">
                                <span>View Project</span>
                                <ArrowRight size={16} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <button
              className="project-nav-btn right"
              aria-label="Next Project"
              onClick={() => scrollProjects('right')}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* 4.1 FAQ SECTION (Expertise Hub) */}
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
            {/* Above Text Animation & Visual Grid */}
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

            {/* Bridge Text Section */}
            <Reveal delay={0.4}>
              <div className="faq-bridge-text text-center mb-16">
                <span className="text-brand-lime font-bold uppercase tracking-[0.3em] text-xs">* SELECT A TOPIC TO LEARN MORE—</span>
              </div>
            </Reveal>

            {/* Centered FAQ Accordion */}
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

            {/* Below Text Animation */}
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
      </section >

      {/* 5. FINAL CTA SECTION */}
      < section className="section text-center relative z-10" >
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
      </section >

    </div >
  );
};

export default About;
