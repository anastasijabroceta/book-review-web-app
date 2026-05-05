import React from 'react';
import './FeaturedAuthor.css';
import { Link } from 'react-router-dom';
import heroAuthors from "../assets/mesa_selimovic.jpg";

const FeaturedAuthor = () => {
  return (
    <section className="featured-author-section">
      <div className="featured-card">
        <div className="featured-badge">Аутор месеца</div>
        <div className="featured-content">

          <div className="featured-image-box">
            <img src={heroAuthors} alt="Меша Селимовић" className="featured-author-img" />
          </div>

          <div className="featured-text">
            <h3>Меша Селимовић</h3>
            <p className="quote">"Човјек је несавршено биће, а све што он створи, носи печат његове несавршености."</p>
            <p className="description">
              Овог месеца славимо стваралаштво писца који је заронио у најдубље тмине људске душе. 
              Његова дела су ванвременски мостови између прошлости и садашњости.
            </p>
            <Link to="/author/1" className="featured-more-btn">
              Прочитај биографију
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedAuthor;