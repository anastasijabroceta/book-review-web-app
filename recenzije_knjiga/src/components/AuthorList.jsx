import React from 'react';
import './AuthorList.css';
import HeroAuthors from './HeroAuthors';
import { Link } from 'react-router-dom';

const authorsData = [
  { id: 1, name: "Меша Селимовић", info: "12 Рецензија", bookCount: 5, books: "Тврђава, Дервиш и смрт" },
  { id: 2, name: "Иво Андрић", info: "24 Рецензије", bookCount: 8, books: "На Дрини ћуприја, Проклета авлија" },
  { id: 3, name: "Ненад Гугл", info: "8 Рецензија", bookCount: 3, books: "Умро сам у петак, Велелепота секунде" }
];

function AuthorList() {
  const getBookLabel = (count) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return "Књига";
    if (lastDigit === 1) return "Књига";
    if (lastDigit >= 2 && lastDigit <= 4) return "Књиге";
    return "Књига";
  };

  return (

    <section className="authors-page">

      <HeroAuthors />

      <div className="authors-grid-container">
        <div className="authors-grid">
          {authorsData.map(author => (
            <div key={author.id} className="author-card-modern">

              <div className="book-count-badge">
                {author.bookCount} {getBookLabel(author.bookCount)}
              </div>

              <div className="author-avatar-container">
                <div className="author-image-circle"></div>
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