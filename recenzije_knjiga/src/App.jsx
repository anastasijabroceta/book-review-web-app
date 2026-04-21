import { Button } from 'bootstrap';
import { useState } from 'react'
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import RecommendedBooks from './components/RecommendedBooks';
import FamousBooks from './components/FamousBooks';
import Footer from './components/Footer';
function App() {
  return (
    <div className='App'>
      <header id='header'>
        <Header/>
        <HeroSection/>
      </header>
      <RecommendedBooks/>
      <FamousBooks/>
      <Footer/>
    </div>
  );
}

export default App;
