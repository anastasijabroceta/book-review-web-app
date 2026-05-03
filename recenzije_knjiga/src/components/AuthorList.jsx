import React from 'react';
import './AuthorList.css';
import HeroAuthors from './HeroAuthors';
import SearchAuthors from './SearchAuthors';
import FeaturedAuthor from './FeaturedAuthor';
import AuthorStats from './AuthorStats';
import { Link } from 'react-router-dom';
import img1 from "../assets/mesa_selimovic.jpg";
import img2 from "../assets/ivo_andric.jpg";
import img3 from "../assets/nenad_gugl.jpg";
import img4 from "../assets/milos_crnjanski.jpg";
import img5 from "../assets/desanka_maksimovic.jpg";
import img6 from "../assets/borislav_pekic.jpg";

const authorsData = [
  { id: 1, name: "Меша Селимовић", info: "12 Рецензија", bookCount: "5 Књига", books: "Тврђава, Дервиш и смрт", image: img1 },
  { id: 2, name: "Иво Андрић", info: "24 Рецензије", bookCount: "8 Књига", books: "На Дрини ћуприја, Проклета авлија", image: img2 },
  { id: 3, name: "Ненад Гугл", info: "8 Рецензија", bookCount: "3 Књиге", books: "Умро сам у петак, Велелепота секунде", image: img3 },
  { id: 4, name: "Милош Црњански", info: "15 Рецензија", bookCount: "6 Књига", books: "Сеобе, Роман о Лондону", image: img4 },
  { id: 5, name: "Десанка Максимовић", info: "40 Рецензија", bookCount: "12 Књига", books: "Тражим помиловање", image: img5 },
  { id: 6, name: "Борислав Пекић", info: "18 Рецензија", bookCount: "7 Књига", books: "Беснило, Златно руно", image: img6 }
];

function AuthorList() {
  
  return (

    <section className="authors-page">

      <HeroAuthors />

      <FeaturedAuthor />

      <AuthorStats />

      <SearchAuthors />

      <div className="authors-grid-container">
        <div className="authors-grid">
          {authorsData.map(author => (
            <div key={author.id} className="author-card-modern">

              <div className="book-count-badge">
                {author.bookCount}
              </div>

              <div className="author-avatar-container">
                <div 
                className="author-image-circle" 
                style={{ 
                  backgroundImage: `url(${author.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'top' 
                }}
              ></div>
              </div>

              <div className="author-content-modern">
                <h3>{author.name}</h3>
                <p className="author-meta">Најпознатија дела: <i>{author.books}</i></p>
                <hr className="card-separator" />
                <div className="author-stats-row">
                  <span className="stat-label">Активност:</span>
                  <span className="stat-value">{author.info}</span>
                </div>
                <Link 
                  to={`/author/${author.id}`} 
                  className="hero-btn primary-btn full-width" 
                  style={{ textDecoration: 'none', textAlign: 'center', display: 'block' }}
                >
                  Види профил
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

export default AuthorList;