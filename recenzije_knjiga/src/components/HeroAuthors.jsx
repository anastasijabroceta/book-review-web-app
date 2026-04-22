import React from 'react';
import './HeroAuthors.css';
import heroAuthors from "../assets/hero-authors.jpg";

function HeroAuthors() {
  return (
    <div className="authors-hero" style={{ backgroundImage: `url(${heroAuthors})` }}>
      <div className="authors-hero-overlay">
        <div className="section-header">
          <h5 className="authors-subtitle">Наши Ствараоци</h5>
          <h1 className="authors-main-title">Упознајте Ауторе</h1>
        </div>
      </div>
    </div>
  );
}

export default HeroAuthors;