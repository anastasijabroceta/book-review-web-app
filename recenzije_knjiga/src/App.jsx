import { Button } from 'bootstrap';
import { useState } from 'react'
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import RecommendedBooks from './components/RecommendedBooks';
import AuthorList from './components/AuthorList';

function App() {
  return (
    <div className='App'>
      <header id='header'>
        <Header/>
        <HeroSection/>
      </header>
      <RecommendedBooks/>
      <AuthorList/>
    </div>
  );
}

export default App;
