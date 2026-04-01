import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, HelpCircle, Mail, Bell, Briefcase, FileText,
  Plus, Trash2, ExternalLink, Phone, LogOut, Pencil, ChevronRight, X,
  Search, Users
} from 'lucide-react';
import API_URL from '../config/api';
import './AdminDashboard.css';

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard',   icon: LayoutDashboard },
  { key: 'faq',       label: 'FAQ',         icon: HelpCircle },
  { key: 'contact',   label: 'Contact',     icon: Mail },
  { key: 'newsletter',label: 'NewsLetter',  icon: Bell },
  { key: 'projects',  label: 'Projects',    icon: Briefcase },
  { key: 'blogs',     label: 'Blogs',       icon: FileText },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [blogs, setBlogs]         = useState([]);
  const [leads, setLeads]         = useState([]);
  const [projects, setProjects]   = useState([]);
  const [faqs, setFaqs]           = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading]     = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [lastSeenAt, setLastSeenAt] = useState(
    () => parseInt(localStorage.getItem('adminLastSeenNotif') || '0', 10)
  );
  const notifRef = useRef(null);

  useEffect(() => {
    if (activeTab === 'blogs') fetchBlogs();
    if (activeTab === 'contact') fetchLeads();
    if (activeTab === 'projects') fetchProjects();
    if (activeTab === 'faq') fetchFAQs();
    if (activeTab === 'newsletter') fetchNewsletters();
    if (activeTab === 'dashboard') { fetchBlogs(); fetchLeads(); fetchProjects(); fetchFAQs(); fetchNewsletters(); }
  }, [activeTab]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API_URL}/api/blogs`);
      const data = await res.json();
      setBlogs(data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API_URL}/api/contact`);
      const data = await res.json();
      setLeads(data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API_URL}/api/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API_URL}/api/faqs`);
      const data = await res.json();
      setFaqs(data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const fetchNewsletters = async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API_URL}/api/newsletter`);
      const data = await res.json();
      setNewsletters(data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const deleteBlog = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    await fetch(`${API_URL}/api/blogs/${id}`, { method: 'DELETE' });
    setBlogs(blogs.filter(b => b._id !== id));
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    await fetch(`${API_URL}/api/projects/${id}`, { method: 'DELETE' });
    setProjects(projects.filter(p => p._id !== id));
  };

  const deleteFAQ = async (id) => {
    if (!window.confirm('Delete this FAQ?')) return;
    await fetch(`${API_URL}/api/faqs/${id}`, { method: 'DELETE' });
    setFaqs(faqs.filter(f => f._id !== id));
  };

  const deleteNewsletter = async (id) => {
    if (!window.confirm('Remove this subscriber?')) return;
    await fetch(`${API_URL}/api/newsletter/${id}`, { method: 'DELETE' });
    setNewsletters(newsletters.filter(n => n._id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    window.location.href = '/admin/login';
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') { closeSidebar(); setIsNotifOpen(false); }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    ...leads.slice(0, 10).map(l => ({
      id: l._id, type: 'contact', tab: 'contact', icon: <Mail size={16} />,
      title: `New contact from ${l.name}`,
      subtitle: l.email,
      time: new Date(l.createdAt)
    })),
    ...newsletters.slice(0, 10).map(n => ({
      id: n._id, type: 'newsletter', tab: 'newsletter', icon: <Bell size={16} />,
      title: 'New newsletter subscriber',
      subtitle: n.email,
      time: new Date(n.subscribedAt)
    }))
  ].sort((a, b) => b.time - a.time).slice(0, 10);

  const unreadContactCount = leads.filter(l => new Date(l.createdAt).getTime() > lastSeenAt).length;
  const unreadNewsletterCount = newsletters.filter(n => new Date(n.subscribedAt).getTime() > lastSeenAt).length;
  const totalUnread = unreadContactCount + unreadNewsletterCount;

  const openNotifications = () => {
    const next = !isNotifOpen;
    setIsNotifOpen(next);
    if (next && (leads.length > 0 || newsletters.length > 0)) {
      const allTimes = [
        ...leads.map(l => new Date(l.createdAt).getTime()),
        ...newsletters.map(n => new Date(n.subscribedAt).getTime())
      ].filter(t => !isNaN(t));

      if (allTimes.length > 0) {
        const maxTime = Math.max(...allTimes);
        setLastSeenAt(maxTime);
        localStorage.setItem('adminLastSeenNotif', maxTime.toString());
      }
    }
  };

  const statCards = [
    { label: 'Contact',    value: leads.length,       icon: '✉️' },
    { label: 'Project',    value: projects.length,    icon: '🛍️' },
    { label: 'Blog',       value: blogs.length,       icon: '📅' },
    { label: 'FAQ',        value: faqs.length,        icon: '❓' },
    { label: 'Newsletter', value: newsletters.length, icon: '👥' },
  ];

  /* ─── Render helpers ─── */
  const renderDashboard = () => (
    <>
      <div className="adm-stat-grid">
        {statCards.map(s => (
          <div key={s.label} className="adm-stat-card">
            <div className="adm-stat-icon">{s.icon}</div>
            <div className="adm-stat-info">
              <span className="adm-stat-label">{s.label}</span>
              <span className="adm-stat-value">{s.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="adm-section-title">Recent Blogs</div>
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Title</th><th>Category</th><th>Date</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.slice(0, 5).map(blog => (
              <tr key={blog._id}>
                <td className="adm-td-bold" data-label="Title">{blog.title}</td>
                <td data-label="Category"><span className="adm-badge">{blog.category}</span></td>
                <td className="adm-td-muted" data-label="Date">{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td data-label="Actions">
                  <div className="adm-actions">
                    <Link to={`/blog/${blog._id}`} className="adm-btn-icon adm-btn-view"><ExternalLink size={15}/></Link>
                    <Link to={`/admin/edit-blog/${blog._id}`} className="adm-btn-icon adm-btn-edit"><Pencil size={15}/></Link>
                    <button onClick={() => deleteBlog(blog._id)} className="adm-btn-icon adm-btn-del"><Trash2 size={15}/></button>
                  </div>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && <tr><td colSpan="4" className="adm-empty">No blogs yet.</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="adm-section-title">Recent Contacts</div>
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Phone</th><th>Message</th><th>Date</th></tr>
          </thead>
          <tbody>
            {leads.slice(0, 5).map(lead => (
              <tr key={lead._id}>
                <td className="adm-td-bold" data-label="Name">{lead.name}</td>
                <td className="adm-td-muted" data-label="Email">{lead.email}</td>
                <td className="adm-td-muted" data-label="Phone">{lead.phone || '—'}</td>
                <td className="adm-td-clip" data-label="Message">{lead.message}</td>
                <td className="adm-td-muted" data-label="Date">{new Date(lead.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {leads.length === 0 && <tr><td colSpan="5" className="adm-empty">No contacts yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderBlogs = () => (
    <>
      <div className="adm-tab-header">
        <span className="adm-section-title" style={{margin:0}}>All Blogs</span>
        <Link to="/admin/new-blog" className="adm-create-btn"><Plus size={16}/> New Blog</Link>
      </div>
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr><th>Title</th><th>Category</th><th>Date</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog._id}>
                <td className="adm-td-bold" data-label="Title">{blog.title}</td>
                <td data-label="Category"><span className="adm-badge">{blog.category}</span></td>
                <td className="adm-td-muted" data-label="Date">{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td data-label="Actions">
                  <div className="adm-actions">
                    <Link to={`/blog/${blog._id}`} className="adm-btn-icon adm-btn-view"><ExternalLink size={15}/></Link>
                    <Link to={`/admin/edit-blog/${blog._id}`} className="adm-btn-icon adm-btn-edit"><Pencil size={15}/></Link>
                    <button onClick={() => deleteBlog(blog._id)} className="adm-btn-icon adm-btn-del"><Trash2 size={15}/></button>
                  </div>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && <tr><td colSpan="4" className="adm-empty">No blogs found.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderContact = () => (
    <>
      <div className="adm-section-title">Contact Submissions</div>
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Phone</th><th>Subject</th><th>Message</th><th>Date</th></tr>
          </thead>
          <tbody>
            {leads.map(lead => {
              const isUnread = new Date(lead.createdAt).getTime() > lastSeenAt;
              return (
                <tr key={lead._id} className={isUnread ? 'adm-unread-row' : ''}>
                  <td className="adm-td-bold" data-label="Name">
                    {lead.name}
                    {isUnread && <span className="adm-new-tag">New</span>}
                  </td>
                  <td className="adm-td-muted" data-label="Email">{lead.email}</td>
                  <td className="adm-td-muted" data-label="Phone">{lead.phone || '—'}</td>
                  <td className="adm-td-muted" data-label="Subject">{lead.subject || '—'}</td>
                  <td className="adm-td-clip" data-label="Message">{lead.message}</td>
                  <td className="adm-td-muted" data-label="Date">{new Date(lead.createdAt).toLocaleDateString()}</td>
                </tr>
              );
            })}
            {leads.length === 0 && <tr><td colSpan="6" className="adm-empty">No contact submissions yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderProjects = () => (
    <>
      <div className="adm-tab-header">
        <span className="adm-section-title" style={{margin:0}}>All Projects</span>
        <Link to="/admin/new-project" className="adm-create-btn"><Plus size={16}/> Add Project</Link>
      </div>
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Technology</th>
              <th>Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project._id}>
                <td className="adm-td-muted" data-label="#">{index + 1}</td>
                <td data-label="Image">
                  {project.imagePath ? (
                    <img 
                      src={project.imagePath.startsWith('http') ? project.imagePath : `${API_URL}${project.imagePath}`} 
                      alt={project.name}
                      style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ width: 40, height: 40, borderRadius: 6, background: '#e0e0e0' }}></div>
                  )}
                </td>
                <td className="adm-td-bold" data-label="Name">{project.name}</td>
                <td data-label="Stack"><span className="adm-badge">{project.technology}</span></td>
                <td className="adm-td-muted" data-label="Link">
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: '#4f8ef7', textDecoration: 'none' }}>
                      View →
                    </a>
                  ) : (
                    '—'
                  )}
                </td>
                <td data-label="Actions">
                  <div className="adm-actions">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="adm-btn-icon adm-btn-view" title="View Live">
                        <ExternalLink size={15}/>
                      </a>
                    )}
                    <Link to={`/admin/edit-project/${project._id}`} className="adm-btn-icon adm-btn-edit" title="Edit">
                      <Pencil size={15}/>
                    </Link>
                    <button onClick={() => deleteProject(project._id)} className="adm-btn-icon adm-btn-del" title="Delete">
                      <Trash2 size={15}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && <tr><td colSpan="6" className="adm-empty">No projects yet. Click "Add Project" to create one.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderFAQ = () => (
    <>
      <div className="adm-tab-header">
        <span className="adm-section-title" style={{margin:0}}>FAQs</span>
        <Link to="/admin/new-faq" className="adm-create-btn"><Plus size={16}/> Add FAQ</Link>
      </div>
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq, index) => (
              <tr key={faq._id}>
                <td className="adm-td-muted" data-label="#">{index + 1}</td>
                <td className="adm-td-bold" data-label="Question" style={{ maxWidth: '300px' }}>{faq.question}</td>
                <td className="adm-td-clip" data-label="Answer">
                  <div dangerouslySetInnerHTML={{ __html: faq.answer.substring(0, 100) + (faq.answer.length > 100 ? '...' : '') }} />
                </td>
                <td data-label="Status">
                  <span className={`adm-badge ${faq.status === 'Inactive' ? 'bg-red-500/10 text-red-500 border-red-500/20' : ''}`}>
                    {faq.status || 'Active'}
                  </span>
                </td>
                <td data-label="Action">
                  <div className="adm-actions">
                    <Link to={`/admin/edit-faq/${faq._id}`} className="adm-btn-icon adm-btn-edit" title="Edit">
                      <Pencil size={15}/>
                    </Link>
                    <button onClick={() => deleteFAQ(faq._id)} className="adm-btn-icon adm-btn-del" title="Delete">
                      <Trash2 size={15}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {faqs.length === 0 && <tr><td colSpan="5" className="adm-empty">No FAQs yet. Click "Add FAQ" to create one.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderNewsletter = () => (
    <>
      <div className="adm-tab-header">
        <span className="adm-section-title" style={{margin:0}}>All NewsLetter</span>
      </div>
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Subscribed On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {newsletters.map((sub, index) => {
              const isUnread = new Date(sub.subscribedAt).getTime() > lastSeenAt;
              return (
                <tr key={sub._id} className={isUnread ? 'adm-unread-row' : ''}>
                  <td className="adm-td-muted" data-label="ID">{index + 1}</td>
                  <td className="adm-td-bold" data-label="Email" style={{color: '#beff35'}}>
                    {sub.email}
                    {isUnread && <span className="adm-new-tag">New</span>}
                  </td>
                  <td className="adm-td-muted" data-label="Subscribed On">
                    {new Date(sub.subscribedAt).toLocaleDateString()}
                  </td>
                  <td data-label="Action">
                    <div className="adm-actions">
                      <button onClick={() => deleteNewsletter(sub._id)} className="adm-btn-icon adm-btn-del" title="Remove">
                        <Trash2 size={15}/>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {newsletters.length === 0 && <tr><td colSpan="4" className="adm-empty">No subscribers yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderComingSoon = (name) => (
    <div className="adm-coming-soon">
      <span className="adm-coming-icon">🚧</span>
      <h3>{name}</h3>
      <p>This section is coming soon.</p>
    </div>
  );

  const renderContent = () => {
    if (loading) return (
      <div className="adm-loading">
        <div className="adm-spinner" />
        <p>Loading…</p>
      </div>
    );
    switch (activeTab) {
      case 'dashboard':  return renderDashboard();
      case 'blogs':      return renderBlogs();
      case 'contact':    return renderContact();
      case 'projects':   return renderProjects();
      case 'faq':        return renderFAQ();
      case 'newsletter': return renderNewsletter();
      default:           return null;
    }
  };

  const activeNav = NAV_ITEMS.find(n => n.key === activeTab);

  return (
    <>
      <div 
        className={`adm-sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} 
        onClick={closeSidebar}
      />
      <div className="adm-root">
        {/* ── Sidebar ── */}
        <aside className={`adm-sidebar ${isSidebarOpen ? 'is-open' : ''}`}>
        <button className="adm-sidebar-close-btn" onClick={closeSidebar} title="Close sidebar">
          <X size={20} />
        </button>


        <p className="adm-menu-label">MENU…</p>

        <nav className="adm-nav">
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
            let badge = 0;
            if (key === 'contact') badge = unreadContactCount;
            if (key === 'newsletter') badge = unreadNewsletterCount;

            return (
              <button
                key={key}
                onClick={() => { setActiveTab(key); closeSidebar(); }}
                className={`adm-nav-item ${activeTab === key ? 'adm-nav-active' : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={18} />
                  <span>{label}</span>
                </div>
                {badge > 0 && <span className="adm-sidebar-badge">{badge}</span>}
              </button>
            );
          })}
        </nav>

        <button onClick={handleLogout} className="adm-logout-btn">
          <LogOut size={16} /> Logout
        </button>
      </aside>

      {/* ── Main area ── */}
      <div className="adm-main">
        {/* Top bar */}
        <header className="adm-topbar">
          <div className="adm-topbar-left">
            <button className="adm-menu-toggle adm-icon-btn" onClick={toggleSidebar}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <button className="adm-icon-btn"><Search size={18} /></button>
            <input className="adm-search" placeholder={`admin, ${activeNav?.label?.toLowerCase()}…`} />
          </div>
          <div className="adm-topbar-right">
            <div className="adm-notif-wrapper" ref={notifRef}>
              <button className="adm-icon-btn adm-notif-btn" onClick={openNotifications}>
                <Bell size={18} />
                <span className={`adm-badge-dot ${totalUnread === 0 ? 'adm-badge-zero' : ''}`}>{totalUnread}</span>
              </button>

              {isNotifOpen && (
                <div className="adm-notif-dropdown">
                  <div className="adm-notif-header">
                    <span className="adm-notif-title-main">Notifications</span>
                    <span className="adm-notif-new">{totalUnread} new</span>
                  </div>
                  <div className="adm-notif-list">
                    {notifications.length === 0 ? (
                      <div className="adm-notif-empty">No recent activity</div>
                    ) : notifications.map(notif => (
                      <div
                        key={notif.id}
                        className={`adm-notif-item ${notif.time.getTime() > lastSeenAt ? 'unread' : ''}`}
                        onClick={() => { setActiveTab(notif.tab); setIsNotifOpen(false); }}
                      >
                        <div className="adm-notif-icon-box">{notif.icon}</div>
                        <div className="adm-notif-text">
                          <p className="adm-notif-title">{notif.title}</p>
                          <p className="adm-notif-sub">{notif.subtitle}</p>
                          <span className="adm-notif-time">{notif.time.toLocaleDateString()}</span>
                        </div>
                        {notif.time.getTime() > lastSeenAt && <span className="adm-notif-dot" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="adm-avatar">A</div>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="adm-breadcrumb">
          <h2 className="adm-page-title">{activeNav?.label}</h2>
          <div className="adm-crumbs">
            <span>MagnusCorps</span>
            <ChevronRight size={14} />
            <span className="adm-crumb-active">{activeNav?.label}</span>
          </div>
        </div>

        {/* Page content */}
        <div className="adm-content">
          {renderContent()}
        </div>
      </div>
      </div>
    </>
  );
};

export default AdminDashboard;
