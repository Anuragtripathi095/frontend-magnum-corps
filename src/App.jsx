import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Background3D from './components/Background3D';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import AdminDashboard from './pages/AdminDashboard';
import BlogEditor from './pages/BlogEditor';
import ProjectEditor from './pages/ProjectEditor';
import FAQEditor from './pages/FAQEditor';
import BlogPost from './pages/BlogPost';
import AdminLogin from './pages/AdminLogin';
import CustomCursor from './components/CustomCursor';

// Helper component to handle conditional layout
const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdminPath) {
      document.body.style.paddingTop = '0';
    } else {
      document.body.style.paddingTop = '70px';
    }
    
    return () => {
      document.body.style.paddingTop = '';
    };
  }, [isAdminPath]);

  return (
    <div className="flex flex-col min-h-screen relative">
      <CustomCursor />
      <Background3D />
      {!isAdminPath && <Navbar />}
      <main style={{ flexGrow: 1, position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/new-blog" element={
            <ProtectedRoute>
              <BlogEditor />
            </ProtectedRoute>
          } />
          <Route path="/admin/edit-blog/:id" element={
            <ProtectedRoute>
              <BlogEditor />
            </ProtectedRoute>
          } />
          <Route path="/admin/new-project" element={
            <ProtectedRoute>
              <ProjectEditor />
            </ProtectedRoute>
          } />
          <Route path="/admin/edit-project/:id" element={
            <ProtectedRoute>
              <ProjectEditor />
            </ProtectedRoute>
          } />
          <Route path="/admin/new-faq" element={
            <ProtectedRoute>
              <FAQEditor />
            </ProtectedRoute>
          } />
          <Route path="/admin/edit-faq/:id" element={
            <ProtectedRoute>
              <FAQEditor />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      {!isAdminPath && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

