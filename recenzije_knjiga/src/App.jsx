import { Button } from 'bootstrap';
import { useState } from 'react'
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import RecommendedBooks from './components/RecommendedBooks';

function App() {
  return (
    <div className='App'>
      <header id='header'>
        <Header/>
        <HeroSection/>
      </header>
      <RecommendedBooks/>
    </div>
  );
}

export default App;
