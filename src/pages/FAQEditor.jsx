import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { ArrowLeft, Save, HelpCircle, X, ExternalLink, Download } from 'lucide-react';
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

const FAQEditor = () => {
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    status: 'Active'
  });
  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      fetchFAQData();
    }

    // Cleaned up unused custom button logic
  }, [id, isEditMode]);

  const fetchFAQData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/faqs/${id}`);
      const data = await res.json();
      if (res.ok) {
        setFormData({
          question: data.question,
          answer: data.answer,
          status: data.status || 'Active'
        });
      }
    } catch (err) {
      console.error("Error fetching FAQ data:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': ['1', '2', '3', false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image', 'blockquote', 'code-block']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditMode ? `${API_URL}/api/faqs/${id}` : `${API_URL}/api/faqs`;
      const method = isEditMode ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert(isEditMode ? "FAQ Updated!" : "FAQ Created!");
        navigate('/admin');
      } else {
        alert(isEditMode ? "Error updating FAQ." : "Error creating FAQ.");
      }
    } catch (err) {
      alert("Error submitting form");
    }
    setLoading(false);
  };

  return (
    <div className="admin-page section" style={{ paddingTop: '80px', minHeight: '100vh', background: 'transparent' }}>
      <div className="container max-w-[1200px]">
        <Link to="/admin" className="flex items-center gap-2 text-muted hover:text-white transition mb-8">
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="heading-md">{isEditMode ? 'Edit FAQ' : 'Add New FAQ'}</h1>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel faq-editor-form" style={{ padding: '3rem', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex flex-col gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted">Question</label>
              <input 
                name="question" 
                className="form-input" 
                value={formData.question} 
                onChange={handleInputChange} 
                placeholder="Enter the frequency asked question..."
                required 
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted">Status</label>
              <select 
                name="status" 
                className="form-input" 
                value={formData.status} 
                onChange={handleInputChange}
                style={{ appearance: 'auto' }}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-10 editor-container">
            <label className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Answer (Rich Text)</label>
            <ReactQuill 
              theme="snow" 
              ref={quillRef}
              value={formData.answer} 
              onChange={(answer) => setFormData(prev => ({ ...prev, answer }))}
              modules={modules}
              style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
            />
          </div>

          <div className="flex gap-4 editor-actions">
            <button 
              type="submit" 
              disabled={loading} 
              className="btn btn-primary flex-1 py-4 text-base font-bold uppercase tracking-widest shadow-lg shadow-brand-lime/20 editor-submit-btn"
            >
              {loading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update FAQ' : 'Create FAQ')}
            </button>
            <Link to="/admin" className="btn btn-outline py-4 px-8 text-base font-bold uppercase tracking-widest editor-cancel-btn" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              Discard
            </Link>
          </div>
        </form>
      </div>

      <style>{`
        .ql-editor { 
          min-height: 250px; 
          font-size: 1.1rem; 
          color: #fff; 
          line-height: 1.7;
          font-family: inherit;
        }
        
        .ql-toolbar.ql-snow { 
          background: #151515 !important; 
          border-color: rgba(255,255,255,0.1) !important; 
          border-radius: 12px 12px 0 top; 
          padding: 0.75rem !important;
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
        
        .ql-snow .ql-stroke { stroke: #e0e0e0 !important; }
        .ql-snow .ql-fill { fill: #e0e0e0 !important; }
        .ql-snow.ql-toolbar button:hover .ql-stroke,
        .ql-snow.ql-toolbar button.ql-active .ql-stroke { stroke: #c8ff00 !important; }
        
        .html-embed-container {
          padding: 1rem;
          margin: 1rem 0;
          background: rgba(200, 255, 0, 0.05);
          border: 1px dashed rgba(200, 255, 0, 0.3);
          border-radius: 8px;
        }

        /* Custom Buttons Styling */
        .ql-toolbar.ql-snow button[class^="ql-export-"],
        .ql-toolbar.ql-snow button.ql-search,
        .ql-toolbar.ql-snow button.ql-special-chars,
        .ql-toolbar.ql-snow button.ql-hr,
        .ql-toolbar.ql-snow button.ql-source {
          width: auto !important;
          min-width: 50px;
          padding: 3px 10px !important;
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 6px !important;
          font-size: 11px !important;
          font-weight: 600 !important;
          color: #e0e0e0 !important;
          margin-right: 5px !important;
          transition: all 0.2s ease;
        }

        .ql-toolbar.ql-snow button[class^="ql-export-"]:hover,
        .ql-toolbar.ql-snow button.ql-search:hover {
          background: rgba(200, 255, 0, 0.1) !important;
          border-color: #c8ff00 !important;
          color: #c8ff00 !important;
        }

        /* Prevent overlapping with dropdowns */
        .ql-toolbar.ql-snow .ql-formats {
          margin-right: 15px !important;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .ql-snow .ql-picker {
          margin-right: 10px !important;
        }

        /* Responsive Improvements */
        @media (max-width: 768px) {
          .faq-editor-form {
            padding: 1.5rem !important;
          }
          .ql-editor {
            min-height: 250px;
            font-size: 1rem;
          }
          .heading-md {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .faq-editor-form {
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
          .ql-toolbar.ql-snow {
            overflow-x: auto;
            white-space: nowrap;
          }
          .ql-toolbar.ql-snow::-webkit-scrollbar { height: 4px; }
          .ql-toolbar.ql-snow::-webkit-scrollbar-thumb { background: rgba(200, 255, 0, 0.3); border-radius: 2px; }
        }
      `}</style>
    </div>
  );
};

export default FAQEditor;
