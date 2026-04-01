import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Image as ImageIcon, X, ExternalLink, Download, Eye } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import API_URL from '../config/api';

// Custom Blot for embedded HTML
import Quill from 'quill';
const BlockEmbed = Quill.import('blots/block/embed');
class HtmlEmbed extends BlockEmbed {
  static blotName = 'htmlembed';
  static tagName = 'div';
  static create(value) {
    const node = super.create();
    node.setAttribute('data-html', value);
    node.classList.add('html-embed-container');
    node.innerHTML = value;
    return node;
  }
  static value(node) {
    return node.getAttribute('data-html');
  }
}
if (!Quill.imports['formats/htmlembed']) {
  Quill.register(HtmlEmbed);
}

// Register custom formats
const Inline = Quill.import('blots/inline');
class CustomCode extends Inline {
  static blotName = 'customcode';
  static tagName = 'code';
}
if (!Quill.imports['formats/customcode']) {
  Quill.register(CustomCode);
}

const ProjectEditor = () => {
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    technology: '',
    link: '',
    description: '',
    image: null
  });
  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      fetchProjectData();
    }

    // Add custom toolbar button labels
    const toolbar = document.querySelector('.ql-toolbar');
    if (toolbar) {
      setTimeout(() => {
        const buttons = {
          'export-pdf': '📄 PDF',
          'export-word': '📄 Word',
          'export-html': '🌐 HTML',
          'search': '🔍 Search',
          'special-chars': 'Ω',
          'hr': '—',
          'source': '<>'
        };
        
        Object.entries(buttons).forEach(([className, label]) => {
          const btn = toolbar.querySelector(`.ql-${className}`);
          if (btn) {
            btn.setAttribute('title', label);
            btn.textContent = label;
          }
        });
        
        // Style custom buttons
        const customButtons = toolbar.querySelectorAll('[class*="ql-export-"], [class*="ql-search"], [class*="ql-special"], [class*="ql-hr"], [class*="ql-source"]');
        customButtons.forEach(btn => {
          btn.style.fontSize = '12px';
          btn.style.padding = '2px 6px';
          btn.style.whiteSpace = 'nowrap';
        });
      }, 0);
    }
  }, [id, isEditMode]);

  const fetchProjectData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/projects/${id}`);
      const data = await res.json();
      if (res.ok) {
        setFormData({
          name: data.name,
          technology: data.technology,
          link: data.link || '',
          description: data.description || '',
          image: null
        });
        if (data.imagePath) {
          setPreview(data.imagePath.startsWith('http') ? data.imagePath : `${API_URL}${data.imagePath}`);
        }
      }
    } catch (err) {
      console.error("Error fetching project data:", err);
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
        const imageUrl = data.url.startsWith('http') ? data.url : `${API_URL}${data.url}`;
        editor.insertEmbed(range.index, 'image', imageUrl);
      } catch (err) {
        console.error("Upload failed:", err);
      }
    };
  };

  const exportToPDF = () => {
    const editor = quillRef.current.getEditor();
    const content = editor.root.innerHTML;
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>${formData.name}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            h1, h2, h3 { color: #333; }
            img { max-width: 100%; height: auto; }
          </style>
        </head>
        <body>
          <h1>${formData.name}</h1>
          <p><strong>Technology:</strong> ${formData.technology}</p>
          <div>${content}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const exportToWord = () => {
    const editor = quillRef.current.getEditor();
    const content = editor.root.innerHTML;
    const docContent = `
      <html xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Calibri, sans-serif; margin: 40px; }
            h1, h2, h3 { color: #1f4788; }
          </style>
        </head>
        <body>
          <h1>${formData.name}</h1>
          <p><strong>Technology:</strong> ${formData.technology}</p>
          <div>${content}</div>
        </body>
      </html>
    `;
    const blob = new Blob([docContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${formData.name}.doc`;
    link.click();
  };

  const exportToHTML = () => {
    const editor = quillRef.current.getEditor();
    const content = editor.root.innerHTML;
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${formData.name}</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; line-height: 1.6; }
            h1, h2, h3 { color: #333; }
            img { max-width: 100%; height: auto; }
          </style>
        </head>
        <body>
          <h1>${formData.name}</h1>
          <p><strong>Technology:</strong> ${formData.technology}</p>
          <hr>
          <div>${content}</div>
        </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${formData.name}.html`;
    link.click();
  };

  const searchInEditor = () => {
    const searchTerm = prompt("Search in content:");
    if (searchTerm) {
      const editor = quillRef.current.getEditor();
      const text = editor.getText();
      if (text.includes(searchTerm)) {
        alert(`Found "${searchTerm}" in content!`);
      } else {
        alert(`"${searchTerm}" not found in content.`);
      }
    }
  };

  const insertHorizontalLine = () => {
    const editor = quillRef.current.getEditor();
    const range = editor.getSelection();
    editor.insertText(range.index, '\n');
    editor.insertEmbed(range.index + 1, 'hr', true);
    editor.setSelection(range.index + 2);
  };

  const htmlEmbedHandler = () => {
    const htmlCode = prompt("Enter HTML code to embed:");
    if (htmlCode) {
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection();
      editor.insertEmbed(range.index, 'htmlembed', htmlCode);
    }
  };

  const insertSpecialChars = () => {
    const chars = prompt("Enter special characters or symbols (e.g., © ® ™ € £ ¥):");
    if (chars) {
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection();
      editor.insertText(range.index, chars);
    }
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        // Export/File options
        ['export-pdf', 'export-word', 'export-html'],
        // Find/Search
        ['search'],
        // Text Formatting - Paragraph/Heading
        [{ 'header': ['1', '2', '3', '4', '5', '6', false] }, { 'font': [] }],
        // Basic text formatting
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        ['code-block'],
        // Clear formatting
        ['clean'],
        // Color and background
        [{ 'color': [] }, { 'background': [] }],
        // Lists and alignment
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'align': [] }],
        // Insert elements - Links, images, etc
        ['link', 'image', 'blockquote', 'table'],
        ['video', 'htmlembed'],
        // Special characters and HR
        ['special-chars', 'hr']
      ],
      handlers: {
        image: imageHandler,
        'export-pdf': exportToPDF,
        'export-word': exportToWord,
        'export-html': exportToHTML,
        'special-chars': insertSpecialChars,
        'htmlembed': htmlEmbedHandler,
        'search': searchInEditor,
        'hr': insertHorizontalLine
      }
    },
    table: true
  }), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('technology', formData.technology);
    data.append('link', formData.link);
    data.append('description', formData.description);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const url = isEditMode ? `${API_URL}/api/projects/${id}` : `${API_URL}/api/projects`;
      const method = isEditMode ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method: method,
        body: data
      });
      if (res.ok) {
        alert(isEditMode ? "Project Updated!" : "Project Created!");
        navigate('/admin');
      } else {
        alert(isEditMode ? "Error updating project." : "Error creating project.");
      }
    } catch (err) {
      alert("Error submitting form");
    }
    setLoading(false);
  };

  return (
    <div className="admin-page section" style={{ paddingTop: '80px', minHeight: '100vh', background: 'transparent' }}>
      <div className="container max-w-[1400px]">
        <Link to="/admin" className="flex items-center gap-2 text-muted hover:text-white transition mb-8">
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="heading-md">{isEditMode ? 'Edit Project' : 'Advanced Project Editor'}</h1>
          {isEditMode && formData.link && (
            <a href={formData.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline flex items-center gap-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <ExternalLink size={16} /> View Project
            </a>
          )}
        </div>

        <form onSubmit={handleSubmit} className="glass-panel project-editor-form">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted">Project Name</label>
              <input 
                name="name" 
                className="form-input" 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="Name of your awesome project"
                required 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted">Tech Stack</label>
              <input 
                name="technology" 
                className="form-input" 
                value={formData.technology} 
                onChange={handleInputChange} 
                placeholder="React, Node.js, etc."
                required 
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-8">
            <label className="text-xs font-bold uppercase tracking-wider text-muted">Project URL (Optional)</label>
            <input 
              name="link" 
              className="form-input" 
              value={formData.link} 
              onChange={handleInputChange} 
              placeholder="https://your-project.com"
            />
          </div>

          <div className="flex flex-col gap-2 mb-8">
            <label className="text-xs font-bold uppercase tracking-wider text-muted">Cover Image</label>
            <div className={`border-2 border-dashed ${preview ? 'border-brand-lime/50' : 'border-white/10'} rounded-2xl p-8 text-center relative transition-all bg-white/5 hover:bg-white/10`}>
              {preview ? (
                <div className="relative inline-block w-full max-w-sm">
                   <img src={preview} alt="preview" className="rounded-xl w-full h-auto shadow-2xl" />
                   <button type="button" onClick={() => {setPreview(null); setFormData(p=>({...p, image:null}))}} className="absolute -top-3 -right-3 p-2 bg-red-500 rounded-full text-white shadow-lg"><X size={16} /></button>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-brand-lime/10 flex items-center justify-center text-brand-lime">
                      <ImageIcon size={24} />
                    </div>
                    <div>
                      <p className="text-white font-medium">Click to upload project cover</p>
                      <p className="text-muted text-xs mt-1">Recommended: high resolution (PNG, JPG)</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </div>
                </label>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-10 editor-container">
            <label className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Detailed Project Description</label>
            <ReactQuill 
              theme="snow" 
              ref={quillRef}
              value={formData.description} 
              onChange={(description) => setFormData(prev => ({ ...prev, description }))}
              modules={modules}
              formats={['header', 'font', 'bold', 'italic', 'underline', 'strike', 'script', 'code-block', 'color', 'background', 'list', 'indent', 'align', 'link', 'image', 'blockquote', 'table', 'video', 'htmlembed']}
              style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
            />
          </div>

          <div className="flex gap-4 editor-actions">
            <button 
              type="submit" 
              disabled={loading} 
              className="btn btn-primary flex-1 py-4 text-base font-bold uppercase tracking-widest editor-submit-btn"
            >
              <Save size={18} className="inline mr-2" />
              {loading ? (isEditMode ? 'Saving Changes...' : 'Saving Project...') : (isEditMode ? 'Update Project' : 'Save Project')}
            </button>
            <Link to="/admin" className="btn btn-outline py-4 px-8 text-base font-bold uppercase tracking-widest editor-cancel-btn" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              Discard
            </Link>
          </div>
        </form>
      </div>

      <style>{`
        .ql-editor { 
          min-height: 500px; 
          font-size: 1.15rem; 
          color: #fff; 
          line-height: 1.8;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .ql-toolbar.ql-snow { 
          background: #111 !important; 
          border-color: rgba(255,255,255,0.1) !important; 
          border-radius: 12px 12px 0 top; 
          padding: 0.5rem !important;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
        }
        
        .ql-container.ql-snow { 
          border-color: rgba(255,255,255,0.1) !important; 
          border-radius: 0 0 12px 12px; 
          background: #050505;
        }
        
        .ql-toolbar.ql-snow .ql-formats {
          margin-right: 15px !important;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .ql-snow .ql-stroke { stroke: #e0e0e0 !important; }
        .ql-snow .ql-fill { fill: #e0e0e0 !important; }
        .ql-snow .ql-picker { color: #e0e0e0 !important; font-size: 0.9rem; margin-right: 10px !important; }
        .ql-snow .ql-picker-label { color: #e0e0e0 !important; }
        
        .ql-snow .ql-picker-options { 
          background-color: #1a1a1a !important; 
          border-color: rgba(255,255,255,0.1) !important;
          max-height: 300px;
          overflow-y: auto;
        }
        
        .ql-snow .ql-picker-options .ql-selected { 
          background-color: rgba(200, 255, 0, 0.2) !important; 
          color: #c8ff00 !important;
        }
        
        .ql-snow .ql-picker-item { 
          color: #e0e0e0 !important;
          padding: 0.5rem !important;
        }
        .ql-snow .ql-picker-item:hover,
        .ql-snow .ql-picker-item.ql-selected { 
          color: #c8ff00 !important;
          background: rgba(200, 255, 0, 0.1) !important;
        }
        
        .ql-toolbar.ql-snow button,
        .ql-toolbar.ql-snow button:hover {
          width: 28px;
          height: 28px;
          padding: 2px;
          border-radius: 4px;
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }
        
        .ql-toolbar.ql-snow button:hover {
          background-color: rgba(200, 255, 0, 0.1);
          border-color: rgba(200, 255, 0, 0.3);
        }
        
        .ql-toolbar.ql-snow button.ql-active {
          background-color: rgba(200, 255, 0, 0.2);
          border-color: #c8ff00;
        }
        
        .ql-snow.ql-toolbar button:hover .ql-stroke,
        .ql-snow.ql-toolbar button.ql-active .ql-stroke { stroke: #c8ff00 !important; }
        
        .ql-snow.ql-toolbar button:hover .ql-fill,
        .ql-snow.ql-toolbar button.ql-active .ql-fill { fill: #c8ff00 !important; }
        
        .ql-toolbar .ql-export-pdf,
        .ql-toolbar .ql-export-word,
        .ql-toolbar .ql-export-html,
        .ql-toolbar .ql-search,
        .ql-toolbar .ql-special-chars,
        .ql-toolbar .ql-hr,
        .ql-toolbar .ql-source {
          width: auto !important;
          min-width: 50px;
          padding: 3px 10px !important;
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 6px !important;
          font-size: 11px !important;
          font-weight: 600 !important;
          color: #e0e0e0 !important;
          margin: 0 2px !important;
          transition: all 0.2s ease;
        }
        
        .ql-toolbar .ql-export-pdf:hover, .ql-toolbar .ql-export-word:hover, .ql-toolbar .ql-export-html:hover, .ql-toolbar .ql-search:hover {
          background: rgba(200, 255, 0, 0.1) !important;
          border-color: #c8ff00 !important;
          color: #c8ff00 !important;
        }

        .ql-snow .ql-code-block {
          background-color: #0a0a0a;
          color: #c8ff00;
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid rgba(200, 255, 0, 0.2);
        }
        
        .html-embed-container {
          padding: 1rem;
          margin: 1rem 0;
          background: rgba(200, 255, 0, 0.05);
          border: 1px dashed rgba(200, 255, 0, 0.3);
          border-radius: 8px;
        }
        
        .ql-snow blockquote {
          border-left: 4px solid #c8ff00;
          background-color: rgba(200, 255, 0, 0.03);
          padding: 1rem;
          border-radius: 4px;
        }

        /* Responsive Improvements */
        @media (max-width: 768px) {
          .project-editor-form {
            padding: 1.5rem !important;
          }
          .ql-editor {
            min-height: 350px;
            font-size: 1rem;
          }
          .heading-md {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .project-editor-form {
            padding: 1rem !important;
          }
          .editor-actions {
            flex-direction: column;
          }
          .editor-submit-btn, .editor-cancel-btn {
            width: 100%;
            font-size: 0.9rem;
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectEditor;
