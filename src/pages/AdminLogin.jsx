import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import './Blog.css'; // Reusing design tokens

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@gmail.com' && password === 'raju@1234') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent section-padding">
      <div className="w-full max-w-md">
        <div className="glass-panel p-10 text-center">
          <div className="w-20 h-20 bg-brand-lime/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="text-brand-lime" size={32} />
          </div>
          
          <h1 className="heading-md mb-2">Admin Portal</h1>
          <p className="text-muted mb-8">Please sign in to manage Magnus Corps.</p>

          <form onSubmit={handleLogin} className="text-left">
            <div className="flex flex-col gap-2 mb-6">
              <label className="text-sm font-bold text-muted px-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                <input 
                  type="email" 
                  className="form-input pl-12" 
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-8">
              <label className="text-sm font-bold text-muted px-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                <input 
                  type="password" 
                  className="form-input pl-12" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm mb-6 px-1">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="btn btn-primary w-full py-4 text-lg">
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
