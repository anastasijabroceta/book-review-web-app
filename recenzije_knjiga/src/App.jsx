import { Button } from 'bootstrap';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import RecommendedBooks from './components/RecommendedBooks';
import FamousBooks from './components/FamousBooks';
import AuthorList from './components/AuthorList';

function App() {
  return (
    <Router>
      <div className='App'>
        <header id='header'>
          <Header />
        </header>

        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <RecommendedBooks />
              <FamousBooks />
            </>
          } />

          <Route path="/authors" element={<AuthorList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;