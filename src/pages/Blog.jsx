import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal, StaggerContainer, TiltCard, Parallax, Magnetic } from '../components/MotionWrapper';
import { motion } from 'framer-motion';
import './Blog.css';
import API_URL from '../config/api';

const Blog = () => {
  // Reveal Observers (Unused, migrating to Framer Motion)
  // ... removed
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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

      {/* 3. NEWSLETTER CTA */}
      <section className="section bg-black/40">
        <div className="container">
          <div className="glass-panel text-center py-16" style={{ border: '1px solid var(--color-brand-lime)' }}>
             <h2 className="heading-md mb-6">Stay ahead of the curve.</h2>
             <p className="text-muted mb-10 max-w-2xl mx-auto">Subscribe to our newsletter for weekly insights on AI search, performance marketing, and high-conversion strategy.</p>
             <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Enter your work email" className="form-input" required />
                <button type="submit" className="btn btn-primary px-10">Subscribe Now</button>
             </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Blog;
