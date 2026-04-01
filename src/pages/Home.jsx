import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';
import { useScrollAnim, useStaggeredScrollAnim } from '../hooks/useScrollAnim';
import { 
  ArrowRight, ArrowUpRight, CheckCircle2, TrendingUp, Presentation, Users, Rss, 
  Target, PenTool, Layout, MonitorSmartphone, Share2, Search,
  AlertCircle, ChevronLeft, ChevronRight, Star, X, Play, User, Mail, Phone, Tag, MessageSquare, Send
} from 'lucide-react';
import './Home.css';
import './Contact.css'; // Reuse form styles
import { Reveal, StaggerContainer, TiltCard, Parallax } from '../components/MotionWrapper';
import { motion } from 'framer-motion';
import MarqueeModule from "react-fast-marquee";
const Marquee = MarqueeModule.default || MarqueeModule;
import yashikaImg from '../assets/yashika_tour.png';
import API_URL from '../config/api';

const PROJECT_KEYWORDS = [
  'ELITE PERFORMANCE', 'ROI-DRIVEN', 'STRATEGY FIRST', 'MARKET DOMINANCE',
  'CLARITY OVER NOISE', 'PREDICTABLE GROWTH', 'FOUNDER-LEVEL EXECUTION'
];

const TypewriterText = () => (
  <>
    <Typewriter
      words={['Not jargon', 'Not gyaan', 'Just Results']}
      loop={0}
      cursor
      cursorStyle="|"
      typeSpeed={80}
      deleteSpeed={50}
      delaySpeed={2000}
    />
  </>
);

const Home = () => {
  const navigate = useNavigate();
  // Reveal Observers
  // Reveal Observers (Unused, migrating to Framer Motion)
  // const heroRef = useStaggeredScrollAnim();
  // ... removed

  // Video Modal State
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Carousel Pause State
  const [isPausedLeft, setIsPausedLeft] = useState(false);
  const [isPausedRight, setIsPausedRight] = useState(false);
  const [isPausedBrand, setIsPausedBrand] = useState(false);

  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  // Blogs State
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;

  // FAQ State
  const [faqs, setFaqs] = useState([]);
  const [faqLoading, setFaqLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState(null);

  // Projects State
  const [projects, setProjects] = useState([]);
  const projectScrollRef = useCallback(node => {
    if (node !== null) {
      // Logic for auto-scroll could go here if needed, 
      // but for now we'll focus on manual buttons as requested.
    }
  }, []);
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

  // Fetch blogs on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}/api/blogs`);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setBlogsLoading(false);
      }
    };

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

    fetchBlogs();
    fetchFaqs();
    fetchProjects();
  }, []);

  // Pagination Logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', message: 'Sending...' });
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setStatus({ state: 'success', message: 'Thanks for reaching out! We will contact you soon.' });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus({ state: 'error', message: data.message || 'Failed to send message.' });
      }
    } catch (error) {
       setStatus({ state: 'error', message: 'Network error. Please try again later.' });
    }
  };

  return (
    <div className="home page-wrapper" style={{ position: 'relative', overflowX: 'hidden' }}>
      
      {/* Global 3D background is now handled in App.jsx */}

      {/* 1. HERO SECTION */}
      <section className="hero-section flex items-center">
        <div className="container">
          {/* Word-by-word staggered reveal + Typewriter effect */}
          <motion.div
            className="text-center max-w-7xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } }
            }}
          >
            <h1 className="heading-xl hero-title" style={{ lineHeight: 1.1, color: 'white' }}>
              {['Digital', 'Marketing', 'Agency', 'in', 'India', 'That', 'Helps', 'Businesses', 'Get', 'Their', 'Real'].map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  style={{ marginRight: '0.35em' }}
                  variants={{
                    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
                    visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
                  }}
                  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                >
                  <span className="green-shimmer">{word}</span>
                </motion.span>
              ))}
              <motion.span
                className="inline-block"
                style={{ marginRight: '0.35em' }}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              >
                Customers
              </motion.span>
              <br />
              <motion.span
                className="inline-block mt-4"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 }
                }}
                transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 1, 0.5, 1] }}
              >
                <span style={{ color: 'var(--color-brand-lime)', fontWeight: 900 }}>
                  <TypewriterText />
                </span>
              </motion.span>
            </h1>
          </motion.div>
          
          <Reveal delay={0.2}>
            <p className="hero-subtitle text-muted text-center mt-6 mb-12 max-w-2xl mx-auto">
              You're here because you need leads that convert, revenue that grows, and confidence that your money isn't being wasted.
            </p>
          </Reveal>
          <div className="flex justify-center flex-wrap items-center gap-8 mb-8 relative z-10">
            {/* Premium Rotating Play Button */}
            <div className="rotating-play-btn-wrapper" onClick={() => setIsVideoOpen(true)}>
              <div className="rotating-play-btn">
                <div className="play-icon-circle">
                  <Play size={24} fill="currentColor" color="black" />
                </div>
                <svg viewBox="0 0 100 100" className="rotating-text-svg">
                  <path id="circlePathPlay" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="transparent"/>
                  <text>
                    <textPath xlinkHref="#circlePathPlay" className="play-text-path">
                      * LEARN MORE * LEARN MORE * LEARN MORE
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>

            {/* Book Strategy Call in Center-Right */}
            <Link to="/contact" className="flex items-center gap-4 bg-[#1a1a1a] hover:bg-[#252525] transition py-3 px-8 rounded-full border border-white/5 shadow-2xl">
              <span className="font-bold text-sm">Book Your Free Strategy Call Now</span>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-brand-lime)' }}>
                <ArrowRight size={20} color="black" style={{ transform: 'rotate(-45deg)' }} />
              </div>
            </Link>
          </div>
          {/* Hero image removed to be used as global background */}
        </div>
      </section>

      {/* INFINITE MARQUEE SECTION */}
      <div 
        className="brand-marquee" 
        onClick={() => setIsPausedBrand(!isPausedBrand)}
        onMouseEnter={() => setIsPausedBrand(true)}
        onMouseLeave={() => setIsPausedBrand(false)}
        style={{ cursor: 'pointer' }}
      >
        <div className={`marquee-container ${isPausedBrand ? 'paused' : ''}`}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="marquee-text">
              <span>Social Media Marketing</span> <b>*</b> 
              <span>WhatsApp & Retargeting Automation</span> <b>*</b>
              <span>Search Engine Optimization</span> <b>*</b>
              <span>Performance Marketing</span> <b>*</b>
              <span>Website Designing</span> <b>*</b>
              <span>Content Writing</span> <b>*</b>
            </div>
          ))}
        </div>
      </div>

      {/* 2. THE WAKE UP CALL (Refined Magnus Style) */}
      <section className="section overflow-hidden">
        <div className="container">
          <div className="magnus-grid cols-60-40">
            <motion.div
              initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              <span className="text-brand-lime font-bold uppercase tracking-widest text-sm">* ALREADY KNOW THIS TRUTH—</span>
              <h2 className="heading-lg mb-8 mt-4">
                Branding theory doesn't pay salaries. <span className="text-brand-lime">Customers do.</span>
              </h2>
              <p className="text-lg text-muted mb-8 font-medium">
                You're not here to hear fancy marketing terms or "trust the process" advice. You're here because you need leads that convert, revenue that grows, and confidence that your money isn't being wasted. And you need it before cash runs out. That's exactly where we come in.
              </p>
              <p className="text-lg text-muted mb-12">
                Instead of throwing every channel at you, we focus on what will bring your next set of customers first—then scale only what works. Our approach is simple:
              </p>
              
              <div className="grid sm:grid-cols-2 gap-x-8">
                {[
                  'Find the fastest path to customers',
                  'Test with minimal risk',
                  'Fix conversion leaks',
                  'Build systems that grow predictably'
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="checkmark-item"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.12, ease: [0.25, 1, 0.5, 1] }}
                  >
                    <div className="checkmark-bullet"></div>
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.85, x: 80, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="circle-text-container">
                <div className="circle-text">
                  <svg viewBox="0 0 100 100">
                    <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent"/>
                    <text>
                      <textPath xlinkHref="#circlePath">
                        Search Engine Optimization Agency Since 2008 •
                      </textPath>
                    </text>
                  </svg>
                </div>
              </div>
              <img src="/images/marketing_growth.png" alt="Marketing Success Visualization" className="img-magnus" />
            </motion.div>
          </div>

          <motion.div
            className="lime-border-box mt-16 grid md:grid-cols-3 gap-8 text-center"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            {[
              { icon: <AlertCircle size={32} />, line1: 'No Unnecessary', line2: 'Experiments.' },
              { icon: <Layout size={32} />, line1: 'No Copy-Paste', line2: 'Strategies.' },
              { icon: <TrendingUp size={32} />, line1: 'No Burning Money To', line2: '"Learn Marketing."' }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 1, 0.5, 1] }}
              >
                <div className="icon-circle-lime">{item.icon}</div>
                <h3 className="text-xl font-bold">{item.line1}<br/>{item.line2}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2.1 CLEAR DIRECTION SECTION */}
      <section className="section overflow-hidden bg-black-40">
        <div className="container">
          <div className="magnus-grid cols-50-50 align-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -60, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="floating-asset-container mb-8">
                <div className="hex-mesh-asset float-slow"></div>
              </div>
              <h2 className="heading-lg mb-8" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}>
                Your Startup Doesn't Need More <span className="text-brand-lime">Marketing.</span><br/>
                It Needs <span className="text-brand-lime">Clear Direction.</span>
              </h2>
              <Link to="/about" className="flex items-center gap-4 bg-[#1a1a1a] hover:bg-[#252525] transition py-3 px-8 rounded-full border border-white/5 shadow-2xl w-fit">
                <span className="font-bold text-sm">More About</span>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-brand-lime)' }}>
                  <ArrowRight size={20} color="black" style={{ transform: 'rotate(-45deg)' }} />
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="vertical-timeline">
                {[
                  { title: 'Marketing nahi, clarity chahiye.', desc: "Most new startups don't shut down because the product is weak. They shut down because marketing becomes a black hole—money goes in, results don't come out." },
                  { title: 'You try ads.', desc: 'Clicks aate hain, leads convert nahi hote. You start SEO. Months nikal jaate hain, results ka wait khatam hi nahi hota.' },
                  { title: 'You talk to agencies.', desc: 'Har jagah ek hi jawab — “Trust the process.” Meanwhile, paisa ja raha hai, pressure badh raha hai, aur certainty zero.' },
                  { title: "The Real Problem Isn’t Marketing Effort.", desc: 'The real problem is lack of direction.' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="timeline-item"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15, ease: [0.25, 1, 0.5, 1] }}
                  >
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-muted">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM DIAGNOSIS (Refined Magnus Style) */}
      <section className="section bg-surface/30">
        <div className="container">
          <div className="magnus-grid cols-40-60">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: -80, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            >
              <img src="/images/marketing_fails.png" alt="Marketing Complexity Collage" className="img-magnus" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 60, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="accent-border-box">
                <h2 className="heading-lg mb-8 uppercase" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                  Why Most Digital Marketing Fails for <br/><span className="text-brand-lime">Your Business</span>
                </h2>
                
                <div className="space-y-6 text-muted text-lg leading-relaxed">
                  <p>It’s not because marketing doesn’t work — it’s because it’s done without direction.</p>
                  <p>Most businesses jump into digital marketing with high hopes and limited budgets, trying to do SEO, ads, social media, and everything else at the same time. Instead of results, this only creates noise. When resources are spread thin, no single channel gets enough fuel to perform.</p>
                  <p>Another common issue is the absence of a clear funnel. Traffic comes in, but there’s no defined journey from visitor to lead to paying customer. Without this structure, even good traffic fails to convert.</p>
                  <p>We also see businesses relying on freelancers without ownership or accountability, leading to inconsistent execution and missed opportunities. Add to that the habit of copying competitors blindly—without understanding margins, customer lifetime value, or unit economics—and marketing turns into guesswork.</p>
                  <p className="text-white font-bold border-t border-white/10 pt-6 mt-6">The outcome is predictable: money gets spent, results stay unclear, and the startup stagnates.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES */}
      <section className="section text-center relative z-10">
        <div className="container">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          >
           <h2 className="heading-lg mb-4">Our Core Digital Marketing Services (Startup-First Approach)</h2>
           <p className="text-muted max-w-2xl mx-auto">We don't sell packages. We design growth systems based on your stage. Every service below is executed with budget sensitivity, ROI focus, and clear accountability.</p>
          </motion.div>
        </div>

        <div className="container">
          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {[
                { icon: <Search size={32} />, title: 'Search Engine Optimisation', desc: 'Focuses on buyer-intent keywords, local visibility, and "near me" searches that bring real inquiries. Content that ranks with purpose. Best for: Sustainable, compounding growth.' },
                { icon: <Target size={32} />, title: 'Performance Marketing', desc: 'Lead- and sales-focused ad campaigns (Google & Meta). Low-budget testing, precise targeting, and clear conversion tracking. Best for: Founders who need customers now.' },
                { icon: <Share2 size={32} />, title: 'Social Media Marketing', desc: 'Built around consistency, clarity, and conversion. Platform-specific strategies that support your overall growth funnel. Best for: Staying relevant and building trust.' },
                { icon: <PenTool size={32} />, title: 'Content Writing', desc: 'Intent blogs, website copy, ads, and landing pages designed to educate, rank, and convert every word aligned with goals. Best for: Clear messaging & SEO.' },
                { icon: <TrendingUp size={32} />, title: 'Search Intelligence', desc: 'Beyond traditional SEO. We analyze real search behavior, competitor gaps, and intent signals to position your brand. Best for: Sharper competitive advantage.' },
                { icon: <MonitorSmartphone size={32} />, title: 'Website Designing', desc: 'Fast, conversion-focused websites that explain your business clearly and build instant trust. CTA crafted to support marketing. Best for: Visitors into leads.' }
              ].map((service, idx) => (
                <TiltCard key={idx}>
                  <Reveal delay={idx * 0.1}>
                    <div className="glass-panel h-full">
                       <span className="text-brand-lime mb-4 block">{service.icon}</span>
                       <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                       <p className="text-muted text-sm" dangerouslySetInnerHTML={{ __html: service.desc }}></p>
                    </div>
                  </Reveal>
                </TiltCard>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* 5. APPROACH (Premium Dual-Column) */}
      <section className="section overflow-hidden">
        <div className="container">
          <div className="magnus-grid cols-50-50 align-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -60, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              <div>
                <span className="text-brand-lime font-bold uppercase tracking-widest text-sm">* OUR PROVEN APPROACH—</span>
                <h2 className="heading-lg mb-8 mt-4">Growth doesn't come from <span className="text-brand-lime">doing more.</span></h2>
                <p className="text-lg text-muted mb-12">It comes from doing the right things in the right order. From First Lead to Scalable Revenue.</p>
                
                <div className="vertical-glow-timeline">
                   {[
                     { num: '01', title: 'Clarity — Identify the Fastest Revenue Opportunity', desc: 'Identify demand, intent & market gaps. Find the fastest revenue channel.' },
                     { num: '02', title: 'Validation — Test with Minimum Spend', desc: 'Instead of scaling blindly, we validate assumptions with controlled testing (keywords, audiences, and messaging).' },
                     { num: '03', title: "Optimization — Strengthen What's Already Working", desc: 'Fix funnel leaks & improve conversions. Make every rupee work harder.' },
                     { num: '04', title: 'Scale — Grow with Confidence', desc: 'Once results are proven and systems are stable, we scale. Increase budgets on what works.' }
                   ].map((step, i) => (
                     <motion.div
                       key={i}
                       className="timeline-step"
                       initial={{ opacity: 0, y: 30 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.5, delay: i * 0.12, ease: [0.25, 1, 0.5, 1] }}
                     >
                        <div className="step-number">{step.num}</div>
                        <div className="step-body">
                           <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                           <p className="text-sm text-muted">{step.desc}</p>
                        </div>
                     </motion.div>
                   ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.85, x: 80, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="floating-glow-lime"></div>
              <img src="/images/home-approach.png" alt="Startup Growth Strategy" className="img-magnus-arch" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US (Arch-Cards Grid) */}
      <section className="section bg-black/60 relative overflow-hidden">
        <motion.div
          className="container text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        >
           <span className="text-brand-lime font-bold uppercase tracking-widest text-sm">* WHY CHOOSE US—</span>
           <h2 className="heading-lg mt-4 mb-6">How We're Different From Other Agencies.</h2>
           <p className="text-muted max-w-2xl mx-auto">Our Core Belief: Startups don't need "everything." They need the right thing first.</p>
        </motion.div>
        
        <div className="container">
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: <Users size={32} color="black" />, title: 'Founder-level strategy, senior execution', desc: 'Your growth is guided by experienced strategists who understand business trade-offs, not by junior interns.' },
                { icon: <Target size={32} color="black" />, title: 'ROI Over Vanity Metrics', desc: 'Traffic and likes mean nothing without revenue. Our focus stays on leads, conversions, and ROI.' },
                { icon: <TrendingUp size={32} color="black" />, title: 'Complete transparency', desc: 'You see exactly how budgets are allocated—no hidden metrics, no vague reports.' },
                { icon: <CheckCircle2 size={32} color="black" />, title: 'Tested, Transparent, Reliable', desc: "Every campaign goes through quality checks and honest reporting. You'll always know what's working." },
                { icon: <ArrowRight size={32} color="black" />, title: 'One objective at a time', desc: 'Each phase has a single measurable goal—so focus stays sharp and results stay visible.' },
                { icon: <AlertCircle size={32} color="black" />, title: 'Honest recommendations', desc: "If an experiment won't deliver ROI at your stage, we clearly say no—even if it costs us a sale." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="h-full"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
                >
                  <div className="arch-card h-full">
                     <div className="arch-card-icon">{item.icon}</div>
                     <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                     <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* 7. TESTIMONIAL TICKER (Premium Marquee) */}
      <section className="section overflow-hidden relative py-24">
        <Reveal>
          <div className="container mb-12">
             <span className="text-brand-lime font-bold uppercase tracking-widest text-sm">* TESTIMONIALS—</span>
             <h2 className="heading-lg mt-4">Real Growth. Real Stories.</h2>
          </div>
        </Reveal>
        
        <div className="testimonial-ticker-container">
          <div 
            className={`testimonial-track track-left ${isPausedLeft ? 'paused' : ''}`}
            onClick={() => setIsPausedLeft(!isPausedLeft)}
            onMouseEnter={() => setIsPausedLeft(true)}
            onMouseLeave={() => setIsPausedLeft(false)}
          >
            {[...Array(2)].fill([
              { name: 'Sarah Mitchell', title: 'Marketing Director' },
              { name: 'John Anderson', title: 'CEO' },
              { name: 'Emma Davis', title: 'Product Manager' },
              { name: 'Michael Brown', title: 'Business Owner' }
            ]).flat().map((t, i) => (
              <div key={i} className="testimonial-slide glass-panel">
                <div className="text-brand-lime mb-4"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
                <p className="text-sm italic mb-6">"The results exceeded our expectations! Their digital marketing strategies helped us reach a broader audience and significantly boosted our sales."</p>
                <h4 className="font-bold text-white">{t.name}</h4>
                <p className="text-xs text-brand-lime uppercase tracking-widest mt-1">{t.title}</p>
              </div>
            ))}
          </div>
          <div 
            className={`testimonial-track track-right mt-12 ${isPausedRight ? 'paused' : ''}`}
            onClick={() => setIsPausedRight(!isPausedRight)}
            onMouseEnter={() => setIsPausedRight(true)}
            onMouseLeave={() => setIsPausedRight(false)}
          >
            {[...Array(2)].fill([
              { name: 'Lisa Chen', title: 'Founder' },
              { name: 'David Wilson', title: 'Operations Manager' },
              { name: 'Sarah Mitchell', title: 'Marketing Director' },
              { name: 'John Anderson', title: 'CEO' }
            ]).flat().map((t, i) => (
              <div key={i} className="testimonial-slide glass-panel">
                <div className="text-brand-lime mb-4"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
                <p className="text-sm italic mb-6">"The team transformed our brand's presence with creativity and precision. Predictable growth is finally a reality for us."</p>
                <h4 className="font-bold text-white">{t.name}</h4>
                <p className="text-xs text-brand-lime uppercase tracking-widest mt-1">{t.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7.1 IMPACT PORTFOLIO SECTION */}
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

      {/* 8. LATEST NEWS (Refined Cards) */}
      <section className="section">
         <div className="container text-center relative z-10">
            <Reveal>
              <span className="text-brand-lime font-bold uppercase tracking-widest text-sm">* LATEST NEWS—</span>
              <h2 className="heading-lg mt-4 mb-12">Insights on Digital Innovation</h2>
            </Reveal>
            
            <StaggerContainer>
              <div className="grid md:grid-cols-3 gap-8 text-left">
                 {blogsLoading ? (
                   [...Array(3)].map((_, i) => (
                     <div key={i} className="news-card glass-panel h-80 animate-pulse bg-white/5 rounded-2xl"></div>
                   ))
                 ) : blogs.length > 0 ? (
                   currentBlogs.map((post, i) => (
                     <motion.div
                       key={post._id}
                       initial={{ opacity: 0, y: 30 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
                       whileHover={{ scale: 1.02, y: -6 }}
                     >
                       <Link 
                         to={post._id ? `/blog/${post._id}` : "/blog"} 
                         className="news-card glass-panel group block h-full no-underline"
                         style={{ display: 'block', textDecoration: 'none' }}
                       >
                         <div className="news-image-wrapper">
                            <img 
                              src={post.imagePath?.startsWith('http') ? post.imagePath : `${API_URL}${post.imagePath}`} 
                              alt={post.title} 
                              className="news-img" 
                            />
                            <div className="news-overlay"></div>
                         </div>
                         <div className="p-8 flex flex-col h-full">
                            <h3 className="font-bold text-2xl mb-8 group-hover:text-brand-lime transition line-clamp-2">
                              {post.title}
                            </h3>
                            <div className="mt-auto">
                              <div className="blog-read-more inline-flex items-center">
                                Read More <ArrowUpRight size={20} className="ml-2" />
                              </div>
                            </div>
                         </div>
                       </Link>
                     </motion.div>
                   ))
                 ) : (
                   <p className="col-span-full text-muted text-center py-10">No blogs published yet. Contact us to learn more!</p>
                 )}
              </div>

              {/* Pagination UI */}
              {!blogsLoading && blogs.length > blogsPerPage && (
                <div className="blog-pagination mt-12 flex justify-center gap-4">
                  <button 
                    className={`page-arrow ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button 
                      key={i} 
                      className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button 
                    className={`page-arrow ${currentPage === totalPages ? 'disabled' : ''}`}
                    onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </StaggerContainer>
         </div>
      </section>

      {/* 8.1 FAQ SECTION (Expertise Hub) */}
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
      </section>

      {/* 9. LET'S COLLABORATE (Premium Form) */}
      <section className="section overflow-hidden" id="contact">
        <div className="container relative z-10">
           <div className="magnus-grid cols-40-60 gap-16 align-center">
              <Reveal>
                <div>
                  <span className="text-brand-lime font-bold uppercase tracking-widest text-sm">* LET'S COLLABORATE—</span>
                  <h2 className="heading-lg mt-4 mb-6">Let's Work Together on <span className="text-brand-lime">Predictable Growth</span></h2>
                  <p className="text-lg text-muted mb-12">Not gyaan. Not jargon. Just clarity and predictable growth. We build systems that grow predictably.</p>
                  
                  <div className="flex gap-12 mt-12">
                    <div>
                       <p className="text-brand-lime font-bold mb-1 uppercase tracking-widest text-xs">Call Us</p>
                       <p className="text-xl font-bold">+91 8318176163</p>
                    </div>
                    <div>
                       <p className="text-brand-lime font-bold mb-1 uppercase tracking-widest text-xs">Email Us</p>
                       <p className="text-xl font-bold">info@magnuscorps.com</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="inline-contact-premium glass-panel p-10" style={{ position: 'relative', overflow: 'hidden' }}>
                   {/* Premium Background Glow */}
                   <div className="absolute top-0 right-0 w-64 h-64 bg-brand-lime/5 rounded-full blur-[100px] pointer-events-none"></div>
                   
                   <h2 className="heading-md mb-8"><span className="green-shimmer">Ready to scale your startup?</span></h2>
                   
                   <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                      <div className="grid md:grid-cols-2 gap-6">
                         <div className="form-group-premium">
                            <label className="form-label flex items-center gap-3">
                               <User size={16} className="text-brand-lime" />
                               NAME
                            </label>
                            <input type="text" name="name" required value={formData.name} onChange={handleChange} className="form-input-premium" placeholder="Your Name" />
                         </div>
                         <div className="form-group-premium">
                            <label className="form-label flex items-center gap-3">
                               <Mail size={16} className="text-brand-lime" />
                               EMAIL
                            </label>
                            <input type="email" name="email" required value={formData.email} onChange={handleChange} className="form-input-premium" placeholder="you@company.com" />
                         </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                         <div className="form-group-premium">
                            <label className="form-label flex items-center gap-3">
                               <Phone size={16} className="text-brand-lime" />
                               PHONE NUMBER
                            </label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-input-premium" placeholder="+91 xxxxx xxxxx" />
                         </div>
                         <div className="form-group-premium">
                            <label className="form-label flex items-center gap-3">
                               <Tag size={16} className="text-brand-lime" />
                               SUBJECT
                            </label>
                            <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="form-input-premium" placeholder="Project Inquiry" />
                         </div>
                      </div>
 
                      <div className="form-group-premium">
                         <label className="form-label flex items-center gap-3">
                            <MessageSquare size={16} className="text-brand-lime" />
                            MESSAGE
                         </label>
                         <textarea name="message" required rows="4" value={formData.message} onChange={handleChange} className="form-input-premium" placeholder="Tell us about your current marketing challenges..."></textarea>
                      </div>
 
                      {status.state !== 'idle' && status.state !== 'loading' && (
                        <div className="status-message flex gap-2 items-center p-4 rounded-lg bg-black/40 text-brand-lime border border-brand-lime/20">
                          {status.state === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                          {status.message}
                        </div>
                      )}
 
                      <button type="submit" className="btn btn-primary mt-4 flex items-center justify-center gap-3" disabled={status.state === 'loading'} style={{ width: '100%', height: '60px', fontSize: '1.1rem' }}>
                         {status.state === 'loading' ? 'Sending...' : (
                           <>
                             <span>Send Message</span>
                             <Send size={18} />
                           </>
                         )}
                      </button>
                   </form>
                </div>
              </Reveal>
           </div>
        </div>
      </section>

      {/* VIDEO MODAL overlay */}
      {isVideoOpen && (
        <div className="video-modal-overlay" onClick={() => setIsVideoOpen(false)}>
          <div className="video-modal-content" onClick={e => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setIsVideoOpen(false)}>
              <X size={32} />
            </button>
            <div className="video-responsive-container">
              <iframe 
                src="https://www.youtube.com/embed/R0tyGMh54vw?autoplay=1" 
                title="Magnus Corps Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
