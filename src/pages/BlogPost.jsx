import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { Reveal, StaggerContainer, TiltCard, Parallax, Magnetic, ReadingProgressBar } from '../components/MotionWrapper';
import { motion } from 'framer-motion';
import './BlogPost.css';
import API_URL from '../config/api';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [toc, setToc] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [loading, setLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1025);
  const contentRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1025px)');
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPost();
    fetchRecent();
  }, [id]);

  // Intersection Observer for ScrollSpy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66% 0px' }
    );

    const headings = contentRef.current?.querySelectorAll('h2, h3');
    headings?.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [post]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`${API_URL}/api/blogs`);
      const data = await res.json();
      const current = data.find(p => p._id === id);
      setPost(current);
      if (current) generateTOC(current.content);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const fetchRecent = async () => {
    try {
      const res = await fetch(`${API_URL}/api/blogs`);
      const data = await res.json();
      setRecentPosts(data.slice(0, 4));
    } catch (err) {
      console.error(err);
    }
  };

  const generateTOC = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const headings = Array.from(doc.querySelectorAll('h2, h3')).map((h, i) => {
      const id = `heading-${i}`;
      return {
        id,
        text: h.innerText,
        level: h.tagName.toLowerCase()
      };
    });
    setToc(headings);
  };

  const sanitizedContent = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    doc.querySelectorAll('h2, h3').forEach((h, i) => {
      h.setAttribute('id', `heading-${i}`);
    });
    return DOMPurify.sanitize(doc.body.innerHTML);
  };

  if (loading) return <div className="loading-state">Loading...</div>;
  if (!post) return <div className="error-state">Post not found.</div>;

  return (
    <div className="blog-post-page">
      <ReadingProgressBar />
      {/* Premium Post Hero Section */}
      <section className="post-header-hero relative overflow-hidden">
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-brand-lime/5 rounded-full blur-[120px] pointer-events-none"
          animate={{ y: [0, 50, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="container">
          <div className="post-hero-grid">
            {/* Left side: Heading and Breadcrumbs */}
            <Parallax offset={30}>
              <Reveal>
                <div className="post-hero-content">
                  <h1 className="post-hero-title">{post.title}</h1>
                  
                  <div className="post-breadcrumbs mt-8">
                    <Link to="/">Home</Link>
                    <span className="breadcrumb-star">*</span>
                    <Link to="/blog">Blog</Link>
                    <span className="breadcrumb-star">*</span>
                    <span className="current-crumb">{post.title}</span>
                  </div>
                </div>
              </Reveal>
            </Parallax>

            {/* Right side: Stylized Featured Image */}
            <Reveal delay={0.2}>
              <TiltCard className="post-hero-image-container">
                {post.imagePath && (
                  <div className="premium-image-frame">
                    <img 
                      src={post.imagePath.startsWith('http') ? post.imagePath : `${API_URL}${post.imagePath}`} 
                      alt={post.title} 
                    />
                    <div className="image-glow-overlay"></div>
                  </div>
                )}
              </TiltCard>
            </Reveal>
          </div>
        </div>

        {/* Ticker Footer (Branding Bar) */}
        <div className="branding-bar-ticker">
           <div className="ticker-scroll-container">
              <motion.div 
                className="ticker-track"
                animate={{ x: [0, -500] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <span className="ticker-text">{post.category} That Meets Google's E-E-A-T Standards —</span>
                <span className="ticker-text">{post.category} That Meets Google's E-E-A-T Standards —</span>
                <span className="ticker-text">{post.category} That Meets Google's E-E-A-T Standards —</span>
                <span className="ticker-text">{post.category} That Meets Google's E-E-A-T Standards —</span>
              </motion.div>
           </div>
        </div>
      </section>

      <div className="container" style={{ paddingTop: '5rem', paddingBottom: '6rem' }}>
        <div className="blog-post-grid">
          
          {/* Main Content (Left) */}
          <main className="post-main">
            <div 
              className="post-content rich-text" 
              ref={contentRef}
              dangerouslySetInnerHTML={{ __html: sanitizedContent(post.content) }} 
            />
          </main>

          {/* Sticky Sidebar (Right) */}
          <aside
            className="post-sidebar"
            style={isDesktop ? {
              position: 'sticky',
              top: '100px',
              alignSelf: 'start',
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            } : {
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            {/* Table of Contents */}
            <div className="sidebar-card">
              <h3 className="sidebar-card-title">Table of Contents</h3>
              <nav className="toc-nav">
                {toc.length > 0 ? (
                  <ul>
                    {toc.map((item) => (
                      <li key={item.id} className={`toc-item ${item.level} ${activeId === item.id ? 'active' : ''}`}>
                        <a href={`#${item.id}`}>{item.text}</a>
                      </li>
                    ))}
                  </ul>
                ) : <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>No headings found.</p>}
              </nav>
            </div>

            {/* Recent Blogs */}
            <div className="sidebar-card">
              <h3 className="sidebar-card-title">Recent Blogs</h3>
              <div className="recent-posts-list">
                {recentPosts.filter(p => p._id !== id).map(rp => (
                  <Link to={`/blog/${rp._id}`} key={rp._id} className="recent-post-link">
                    <p className="rp-title">{rp.title}</p>
                    <span className="rp-date" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                      {new Date(rp.createdAt).toLocaleDateString()}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* Footer Newsletter CTA */}
      <section className="bg-black/80 py-20">
         <div className="container">
            <div className="glass-panel p-12 text-center" style={{ borderColor: 'var(--color-brand-lime)' }}>
               <h2 className="heading-md mb-6">Stay for the Gyaan, Scale with Magnus.</h2>
               <p className="text-muted mb-8 max-w-xl mx-auto">Get absolute SEO and Performance Marketing insights delivered to your inbox weekly.</p>
               <div className="max-w-md mx-auto flex gap-4">
                  <input className="form-input" placeholder="Work Email" />
                  <Magnetic>
                    <button className="btn btn-primary px-8 h-full">Join Now</button>
                  </Magnetic>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default BlogPost;
