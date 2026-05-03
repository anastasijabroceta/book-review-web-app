import { Button } from 'bootstrap';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import RecommendedBooks from './components/RecommendedBooks';
import FamousBooks from './components/FamousBooks';
import AuthorList from './components/AuthorList';
import Home from './pages/Home';
import Footer from './components/Footer';
import AllBooks from './pages/AllBooks';
import BookDetails from './pages/BookDetails';
import ScrollToTop from "./components/ScrollToTop";
import HeroAuthors from "./components/HeroAuthors";
import AuthorDetails from './components/AuthorDetails';
import AdminBooks from './pages/AdminBooks';
import LoginModal from './components/LoginModal';
function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Router>
        <ScrollToTop />

        <div className="App">
          <header id="header">
            <Header onLoginClick={() => setShowLogin(true)} />
          </header>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/authors" element={<AuthorList />} />
            <Route path="/author/:id" element={<AuthorDetails />} />
            <Route path="/books" element={<AllBooks />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/admin" element={<AdminBooks />} />
          </Routes>
        </div>
      </Router>

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      />

      <footer id="footer">
        <Footer />
      </footer>
    </>
  );
}
export default App;