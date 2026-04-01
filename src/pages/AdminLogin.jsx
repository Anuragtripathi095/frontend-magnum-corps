import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import './AdminDashboard.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate a small delay for premium feel
    setTimeout(() => {
      if (email === 'admin@gmail.com' && password === 'raju@1234') {
        localStorage.setItem('isAdminAuthenticated', 'true');
        navigate('/admin');
      } else {
        setError('Invalid credentials. Please try again.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="adm-root adm-login-container min-h-screen">
      <div className="adm-login-card animate-fade-in">
        {/* Left Side: Brand & Identity */}
        <div className="adm-login-brand">
          <div className="adm-brand-glow"></div>
          <div className="adm-login-icon-wrapper">
            <Lock size={42} strokeWidth={2.5} />
          </div>
          <h1 className="adm-login-title">Admin Portal</h1>
          <p className="adm-login-subtitle">Secure access to Magnus Corps management system.</p>
        </div>

        {/* Right Side: Authentication Form */}
        <div className="adm-login-form-area">
          <form onSubmit={handleLogin}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
              <p className="text-muted text-sm">Please enter your credentials to unlock the dashboard.</p>
            </div>

            <div className="adm-input-group">
              <label className="adm-input-label">Email Address</label>
              <div className="adm-input-wrapper">
                <Mail className="adm-input-icon" size={20} />
                <input 
                  type="email" 
                  className="adm-login-input" 
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="adm-input-group">
              <label className="adm-input-label">Password</label>
              <div className="adm-input-wrapper">
                <Lock className="adm-input-icon" size={20} />
                <input 
                  type="password" 
                  className="adm-login-input" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm mb-6 px-1 animate-fade-in">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <button 
              type="submit" 
              className={`adm-login-btn ${isLoading ? 'opacity-70' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="adm-spinner" style={{width: '24px', height: '24px', borderWidth: '2px'}}></div>
              ) : (
                <>
                  Unlock Dashboard
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

