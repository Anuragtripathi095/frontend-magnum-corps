import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, Plus, Trash2, ExternalLink, Mail, Phone, Calendar, LogOut, Pencil } from 'lucide-react';
import './Blog.css'; // Reusing some shared styles
import API_URL from '../config/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('blogs');
  const [blogs, setBlogs] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'blogs') {
        const res = await fetch(`${API_URL}/api/blogs`);
        const data = await res.json();
        setBlogs(data);
      } else {
        const res = await fetch(`${API_URL}/api/contact`);
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
    setLoading(false);
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await fetch(`${API_URL}/api/blogs/${id}`, { method: 'DELETE' });
      setBlogs(blogs.filter(b => b._id !== id));
    } catch (err) {
      alert("Error deleting blog");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    window.location.href = '/admin/login';
  };

  return (
    <div className="admin-page section" style={{ paddingTop: '60px', minHeight: '100vh', background: 'transparent' }}>
      <div className="container max-w-[1400px]">
        
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="heading-lg mb-2">Admin Panel</h1>
            <p className="text-muted">Manage your content and customer inquiries.</p>
          </div>
          <div className="flex gap-4">
            <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition">
              <LogOut size={18} /> Logout
            </button>
            <Link to="/admin/new-blog" className="btn btn-primary">
              <Plus size={20} /> Create New Blog
            </Link>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('blogs')}
            className={`px-8 py-3 rounded-xl font-bold transition ${activeTab === 'blogs' ? 'bg-brand-lime text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}
          >
            <div className="flex items-center gap-2">
              <FileText size={18} /> Blogs
            </div>
          </button>
          <button 
            onClick={() => setActiveTab('leads')}
            className={`px-8 py-3 rounded-xl font-bold transition ${activeTab === 'leads' ? 'bg-brand-lime text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}
          >
            <div className="flex items-center gap-2">
              <Users size={18} /> Leads
            </div>
          </button>
        </div>

        {/* Content Section */}
        <div className="glass-panel" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
          {loading ? (
            <div className="text-center py-20">
               <div className="animate-spin inline-block w-8 h-8 border-4 border-brand-lime border-t-transparent rounded-full mb-4"></div>
               <p className="text-muted">Loading data...</p>
            </div>
          ) : activeTab === 'blogs' ? (
            <div className="overflow-x-auto">
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <th style={{ padding: '1rem' }} className="text-muted">Title</th>
                    <th style={{ padding: '1rem' }} className="text-muted">Category</th>
                    <th style={{ padding: '1rem' }} className="text-muted">Date</th>
                    <th style={{ padding: '1rem' }} className="text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map(blog => (
                    <tr key={blog._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem' }} className="font-bold">{blog.title}</td>
                      <td style={{ padding: '1rem' }}>
                         <span className="text-xs px-2 py-1 bg-brand-lime/10 text-brand-lime rounded">{blog.category}</span>
                      </td>
                      <td style={{ padding: '1rem' }} className="text-muted">{new Date(blog.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '1rem' }}>
                        <div className="flex gap-5" style={{ gap: '24px' }}>
                          <Link to="/blog" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition">
                            <ExternalLink size={16} />
                          </Link>
                          <Link to={`/admin/edit-blog/${blog._id}`} className="p-2 bg-brand-lime/10 hover:bg-brand-lime/20 rounded-lg text-brand-lime transition">
                            <Pencil size={16} />
                          </Link>
                          <button onClick={() => deleteBlog(blog._id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-500 transition">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {blogs.length === 0 && (
                    <tr><td colSpan="4" className="text-center py-10 text-muted">No blogs found. Created your first post!</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <th style={{ padding: '1rem' }} className="text-muted">Name</th>
                    <th style={{ padding: '1rem' }} className="text-muted">Contact Info</th>
                    <th style={{ padding: '1rem' }} className="text-muted">Message</th>
                    <th style={{ padding: '1rem' }} className="text-muted">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map(lead => (
                    <tr key={lead._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem' }} className="font-bold">{lead.name}</td>
                      <td style={{ padding: '1rem' }}>
                        <div className="flex flex-col gap-1 text-sm">
                          <span className="flex items-center gap-1"><Mail size={12}/> {lead.email}</span>
                          {lead.phone && <span className="flex items-center gap-1"><Phone size={12}/> {lead.phone}</span>}
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }} className="text-sm">
                        <div style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {lead.message}
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }} className="text-muted text-sm">{new Date(lead.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {leads.length === 0 && (
                    <tr><td colSpan="4" className="text-center py-10 text-muted">No leads submitted yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
