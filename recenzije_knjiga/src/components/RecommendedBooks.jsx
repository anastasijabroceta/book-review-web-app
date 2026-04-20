import "./RecommendedBooks.css";
import ScrollReveal from "./ScrollReveal";

import bookOne from "../assets/book-one.jpg";
import bookTwo from "../assets/book-two.jpg";
import bookThree from "../assets/book-three.jpg";

function RecommendedBooks() {
  return (
    <section className="book-highlights">
      <div className="book-highlights-container">
        <ScrollReveal className="highlights-text" delay={0}>
          <p className="highlights-label">Издвојено за читање</p>

          <h2 className="highlights-title">
            Књиге, цитати и препоруке
            <br />
            које остају са тобом
          </h2>

          <p className="highlights-description">
            Откриј пажљиво одабране наслове, снажне књижевне мисли и
            препоруке које те воде до следеће омиљене књиге.
          </p>

          <div className="highlights-actions">
            <button className="highlights-btn primary-btn">
              Погледај препоруке
            </button>
            <button className="highlights-btn secondary-btn">
              Истражи цитате
            </button>
          </div>
        </ScrollReveal>

        <div className="highlights-visual">
          <ScrollReveal className="main-card" delay={100}>
            <img
              src={bookOne}
              alt="Препоручена књига"
              className="main-card-image"
            />
          </ScrollReveal>

          <ScrollReveal className="floating-card quote-card" delay={220}>
            <p className="quote-mark">“</p>
            <p className="quote-text">
              Књиге и врата су иста ствар. Отвориш их, и кренеш кроз други свет.
            </p>
          </ScrollReveal>

          <ScrollReveal className="floating-card mini-book-card" delay={340}>
            <img src={bookTwo} alt="Књига" className="mini-book-image" />
            <div>
              <p className="mini-card-label">Истакнути наслов</p>
              <h4>Велелепота секунде</h4>
            </div>
          </ScrollReveal>

          <ScrollReveal className="floating-card note-card" delay={460}>
            <p className="note-label">Цитат недеље</p>
            <p className="note-text">„Живот је књига. Ми пишемо странице.”</p>
          </ScrollReveal>

          <ScrollReveal className="floating-card small-cover-card" delay={580}>
            <img
              src={bookThree}
              alt="Корице књиге"
              className="small-cover-image"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default RecommendedBooks;