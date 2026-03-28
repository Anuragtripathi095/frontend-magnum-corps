import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Image as ImageIcon, X } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './Blog.css';
import API_URL from '../config/api';

const BlogEditor = () => {
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'SEO Strategy',
    excerpt: '',
    content: '',
    author: 'Magnus Team',
    image: null
  });
  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      fetchBlogData();
    }
  }, [id]);

  const fetchBlogData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/blogs/${id}`);
      const data = await res.json();
      if (res.ok) {
        setFormData({
          title: data.title,
          category: data.category,
          excerpt: data.excerpt,
          content: data.content,
          author: data.author || 'Magnus Team',
          image: null
        });
        if (data.imagePath) {
          setPreview(data.imagePath.startsWith('http') ? data.imagePath : `${API_URL}${data.imagePath}`);
        }
      }
    } catch (err) {
      console.error("Error fetching blog data:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('image', file);

      try {
        const res = await fetch(`${API_URL}/api/upload`, {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'image', data.url);
      } catch (err) {
        console.error("Upload failed:", err);
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('excerpt', formData.excerpt);
    data.append('content', formData.content);
    data.append('author', formData.author);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const url = isEditMode ? `${API_URL}/api/blogs/${id}` : `${API_URL}/api/blogs`;
      const method = isEditMode ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method: method,
        body: data
      });
      if (res.ok) {
        alert(isEditMode ? "Blog Post Updated!" : "Blog Post Created!");
        navigate('/admin');
      } else {
        alert(isEditMode ? "Error updating blog." : "Error creating blog.");
      }
    } catch (err) {
      alert("Error submitting form");
    }
    setLoading(false);
  };

  return (
    <div className="admin-page section" style={{ paddingTop: '60px', minHeight: '100vh', background: 'transparent' }}>
      <div className="container max-w-[1400px]">
        <Link to="/admin" className="flex items-center gap-2 text-muted hover:text-white transition mb-6">
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>
        
        <h1 className="heading-lg mb-8">{isEditMode ? 'Edit Blog Post' : 'Advanced Blog Editor'}</h1>

        <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '3rem', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-muted">Blog Title</label>
              <input name="title" className="form-input" value={formData.title} onChange={handleInputChange} required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-muted">Category</label>
              <select name="category" className="form-input" value={formData.category} onChange={handleInputChange}>
                <option>SEO Strategy</option>
                <option>Social Media</option>
                <option>AI Search</option>
                <option>Performance Marketing</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-8">
            <label className="text-sm font-bold text-muted">Excerpt (For the card)</label>
            <textarea name="excerpt" className="form-input" rows="2" value={formData.excerpt} onChange={handleInputChange} required />
          </div>

          <div className="flex flex-col gap-2 mb-8">
            <label className="text-sm font-bold text-muted">Featured Image (Main Thumbnail)</label>
            <div className={`border-2 border-dashed ${preview ? 'border-brand-lime' : 'border-white/10'} rounded-2xl p-6 text-center relative`}>
              {preview ? (
                <div className="relative inline-block w-full max-w-xs">
                   <img src={preview} alt="preview" className="rounded-xl w-full h-auto" />
                   <button onClick={() => setPreview(null)} className="absolute -top-3 -right-3 p-1 bg-red-500 rounded-full"><X size={16} /></button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <div className="flex flex-col items-center gap-2">
                    <ImageIcon size={24} className="text-brand-lime" />
                    <p className="text-muted text-xs">Upload Main Photo</p>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </div>
                </label>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-10 editor-container">
            <label className="text-sm font-bold text-muted mb-2">Rich Post Content (Add images using the toolbar!)</label>
            <ReactQuill 
              theme="snow" 
              ref={quillRef}
              value={formData.content} 
              onChange={(content) => setFormData(prev => ({ ...prev, content }))}
              modules={modules}
              style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary w-full py-4 text-lg">
            {loading ? (isEditMode ? 'Updating...' : 'Publishing...') : (isEditMode ? 'Update Blog Post' : 'Publish Advanced Blog Post')}
          </button>
        </form>
      </div>

      <style>{`
        .ql-editor { 
          min-height: 400px; 
          font-size: 1.15rem; 
          color: #fff; 
          line-height: 1.6;
        }
        .ql-toolbar.ql-snow { 
          background: #111 !important; 
          border-color: rgba(255,255,255,0.1) !important; 
          border-radius: 12px 12px 0 0; 
          padding: 1rem !important;
        }
        .ql-container.ql-snow { 
          border-color: rgba(255,255,255,0.1) !important; 
          border-radius: 0 0 12px 12px; 
          background: #050505;
        }
        
        /* Toolbar Icon Colors */
        .ql-snow .ql-stroke { stroke: #e0e0e0 !important; }
        .ql-snow .ql-fill { fill: #e0e0e0 !important; }
        .ql-snow .ql-picker { color: #e0e0e0 !important; }
        .ql-snow .ql-picker-options { 
          background-color: #1a1a1a !important; 
          border-color: rgba(255,255,255,0.1) !important;
        }
        
        /* Hover effects */
        .ql-snow.ql-toolbar button:hover .ql-stroke,
        .ql-snow.ql-toolbar button.ql-active .ql-stroke { stroke: var(--color-brand-lime) !important; }
        .ql-snow.ql-toolbar button:hover .ql-fill,
        .ql-snow.ql-toolbar button.ql-active .ql-fill { fill: var(--color-brand-lime) !important; }
        
        .ql-snow .ql-picker.ql-expanded .ql-picker-label { color: var(--color-brand-lime) !important; }
      `}</style>
    </div>
  );
};

export default BlogEditor;
