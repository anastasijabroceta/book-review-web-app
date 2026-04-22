import { Link, useParams } from 'react-router-dom';
import './AuthorDetails.css';

const AuthorDetails = () => {
  
  const author = {
    name: "Меша",
    surname: "Селимовић",
    status: "Преминуо",
    bio: "Меша Селимовић је био истакнути југословенски писац. Његов роман 'Дервиш i смрт' један је од најзначајнијих књижевних дела на овим просторима. Кроз своје ликове, Селимовић истражује дубоке унутрашње сукобе, питања вере, власти и људске етике у тешким историјским временима.",
    birthDate: "26. април 1910.",
    awards: 12,
    soldCopies: "5.000.000+",
    managerPhone: "+381 60 123-4567",
    books: [
      { id: '101', title: 'Дервиш и смрт' },
      { id: '102', title: 'Тврђава' },
      { id: '103', title: 'Острво' },
      { id: '104', title: 'Круг' },
      { id: '105', title: 'Магла и мјесечина' }
    ],
    averageRating: 4.8
  };

  return (
    <div className="author-details-wrapper">
      <div className="author-details-page">

        <section className="author-split-hero">
          <div className="author-info-main-card">
            <div className="status-badge-absolute">{author.status}</div>
            <div className="author-image-circle-large"></div>
            <div className="author-text-meta">
              <h1>{author.name} {author.surname}</h1>
              <p className="birth-info">Рођен: <strong>{author.birthDate}</strong></p>
            </div>
          </div>

          <div className="author-rating-card-isolated">
            <h3>Оцените аутора</h3>
            <div className="interactive-stars-box">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star-large">★</span>
              ))}
            </div>
            <button className="confirm-rating-btn">
              Потврди оцену
            </button>
            <div className="current-avg-display">
              <span>Просечна оцена: <strong>{author.averageRating}</strong></span>
            </div>
          </div>
        </section>

        <section className="author-stats-banner-modern">
          <div className="stat-unit">
            <span className="unit-val">{author.awards}</span>
            <span className="unit-label">Награда</span>
          </div>
          <div className="stat-unit">
            <span className="unit-val">{author.soldCopies}</span>
            <span className="unit-label">Продато примерака</span>
          </div>
          <div className="stat-unit">
            <span className="unit-val">{author.books.length}</span>
            <span className="unit-label">Написаних књига</span>
          </div>
        </section>

        <div className="details-content-grid">
          <article className="bio-container-card">
            <h2>Биографија</h2>
            <p className="bio-text-justify">{author.bio}</p>
            <div className="contact-info-footer">
              <span className="contact-icon">📞</span>
              Контакт менаџера: <strong>{author.managerPhone}</strong>
            </div>
          </article>

          <aside className="books-list-container">
            <div className="books-card-side">
              <h3>Листа свих књига</h3>
              <div className="books-scroll-area">
                <div className="books-functional-links">
                  {author.books.map((book) => (
                    <Link key={book.id} to={`/book/${book.id}`} className="author-book-link">
                      <span className="book-icon-bullet">📖</span>
                      <span className="book-title-text">{book.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        <section className="author-gallery-footer">
          <h2 className="gallery-header-title">Галерија слика</h2>
          <div className="gallery-grid-simple">
            <div className="gallery-img-box"></div>
            <div className="gallery-img-box"></div>
            <div className="gallery-img-box"></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthorDetails;