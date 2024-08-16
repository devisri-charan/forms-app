import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import PostSubmissionPage from './pages/PostSubmissionPage';
import Form from './pages/Form';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600">
        <ConditionalNavbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/forms/:formId" element={<Form />} />
            <Route path="/form/:formId/submitted" element={<PostSubmissionPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

function ConditionalNavbar() {
  const location = useLocation();
  const showNavbar = location.pathname === '/dashboard' || location.pathname.startsWith('/form');

  return showNavbar ? <Navbar /> : null;
}

export default App;
