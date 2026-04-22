import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./BookDetails.css";

import AnaKarenjina from "../assets/ana_karenjina.jpg";
import Zlocin from "../assets/zlocin_i_kazna.jpg";
import Book1984 from "../assets/1984.jpg";
import Poreklo from "../assets/poreklo.jpg";
import VelelepotaSekunde from "../assets/velelepota_sekunde.jpg";
import VintagePhoto from "../assets/vintage_photo.png";
const books = [
  {
    id: 1,
    title: "Ана Карењина",
    author: "Лав Толстој",
    authorId: "a1",
    genre: "Роман",
    format: "Тврди повез",
    price: "1.290 РСД",
    pages: 864,
    isbn: "978-86-7543-555-2",
    rating: 4.9,
    description:
      "Трагична љубавна прича која истовремено слика руско друштво и дубоко проучава људску природу.",
    image: AnaKarenjina,
  },
  {
    id: 2,
    title: "Злочин и казна",
    author: "Фјодор Достојевски",
    authorId: "a2",
    genre: "Психолошки роман",
    format: "Меки повез",
    price: "1.590 РСД",
    pages: 528,
    isbn: "9788675431234",
    rating: 4.8,
    description:
      "Један од најдубљих романа о кривици, савести, моралу и унутрашњем преиспитивању човека.",
    image: Zlocin,
  },
  {
    id: 3,
    title: "1984",
    author: "Џорџ Орвел",
    authorId: "a3",
    genre: "Дистопија",
    format: "Тврди повез",
    price: "1.450 РСД",
    pages: 328,
    isbn: "979-86-7543-555-2",
    rating: 4.7,
    description:
      "Моћна дистопија о надзору, страху, манипулацији језиком и губитку личне слободе.",
    image: Book1984,
  },
  {
    id: 4,
    title: "Поријекло",
    author: "Ден Браун",
    authorId: "a4",
    genre: "Литература",
    format: "Тврди повез",
    price: "1.350 РСД",
    pages: 480,
    isbn: "978-86-7543-555-2",
    rating: 4.6,
    description:
      "Поријекло је роман о тајни и заговору који се одвија у свету банкира и политичара.",
    image: Poreklo,
  },
  {
    id: 5,
    title: "Велелепота секунде",
    author: "Ненад Гугл",
    authorId: "a5",
    genre: "Роман",
    format: "Тврди повез",
    price: "1.290 РСД",
    pages: 227,
    isbn: "978-86-81746-01-1",
    rating: 4.8,
    description:
      "„Велелепота секунде” вас води кроз бујицу снажних емоција, од туге и немоћи до охрабрења и узвишености, откривајући како свака секунда може бити испуњена вечном величином.",
    image: VelelepotaSekunde,
  },
];

const BookDetails = () => {
  const { id } = useParams();
  const book = books.find((b) => b.id === Number(id));

  const [reviews, setReviews] = useState([
    "Одлична књига, оставила је снажан утисак на мене. Толстој маестрално описује емоције и људске односе.",
    "Један од најбољих романа које сам прочитао. Препоручујем свима!",
  ]);

  const [newReview, setNewReview] = useState("");

  if (!book) {
    return (
      <section className="book-details-page">
        <div className="book-details-wrapper">
          <h2>Књига није пронађена.</h2>
        </div>
      </section>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newReview.trim() === "") return;

    setReviews([newReview, ...reviews]);
    setNewReview("");
  };

  return (
    <section className="book-details-page">
      <div className="book-details-wrapper">
        <div className="book-hero-card">
          <div className="book-cover-column">
            <div className="book-cover-3d-wrap">
              <img
                src={book.image}
                alt={book.title}
                className="book-cover-3d"
              />
            </div>
          </div>

          <div className="book-main-info">
            <span className="book-chip">{book.genre}</span>

            <h1 className="book-main-title">{book.title}</h1>

            <Link to={`/authors/${book.authorId}`} className="book-author-link">
              {book.author}
            </Link>

            <div className="book-divider"></div>

            <p className="book-main-description">{book.description}</p>

            <div className="book-meta-grid">
              <div className="book-meta-card">
                <span>Формат</span>
                <strong>{book.format}</strong>
              </div>

              <div className="book-meta-card">
                <span>Цена</span>
                <strong>{book.price}</strong>
              </div>

              <div className="book-meta-card">
                <span>Страна</span>
                <strong>{book.pages}</strong>
              </div>

              <div className="book-meta-card">
                <span>ISBN</span>
                <strong>{book.isbn}</strong>
              </div>
            </div>

            <div className="book-rating-panel">
              <div className="book-rating-left">
                <span className="rating-label">Оцена</span>
                <strong>{book.rating} / 5</strong>
              </div>

              <div className="book-stars">★★★★★</div>
            </div>
          </div>
        </div>

        <div className="review-section-card">
          <h2 className="review-section-title">Остави рецензију</h2>
             <div className="review-form-shell">
    <img
      src={VintagePhoto}
      alt=""
      className="review-section-image"
    />

  
          <form onSubmit={handleSubmit} className="review-form">
            <textarea
              placeholder="Напиши своје мишљење о књизи..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />

            <button type="submit" className="submit-review-btn">
              Пошаљи рецензију
            </button>
          </form>
          </div>

          <div className="reviews-block" id="reviews">
            <h3 className="reviews-heading">Рецензије ({reviews.length})</h3>

            {reviews.map((review, index) => (
              <div className="single-review-card" key={index}>
                <div className="review-avatar">{index % 2 === 0 ? "Ј" : "М"}</div>

                <div className="review-content">
                  <div className="review-top-line">
                    <strong>{index % 2 === 0 ? "Јелена М." : "Марко П."}</strong>
                    <span className="review-stars">★★★★★</span>
                  </div>

                  <p>{review}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;