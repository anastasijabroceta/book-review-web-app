import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./BookDetails.css";
import { ref, get } from "firebase/database";
import { db } from "../firebase";
import { useEffect } from "react";
import VintagePhoto from "../assets/vintage_photo.png";


const BookDetails = () => {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [authorName, setAuthorName] = useState("");
  const [reviews, setReviews] = useState([
    "Одлична књига, оставила је снажан утисак на мене. Толстој маестрално описује емоције и људске односе.",
    "Један од најбољих романа које сам прочитао. Препоручујем свима!",
  ]);

  const [newReview, setNewReview] = useState("");

  useEffect(() => {
  const fetchBook = async () => {
    try {
      const bookSnapshot = await get(ref(db, `knjige/${id}`));

      if (bookSnapshot.exists()) {
        const bookData = bookSnapshot.val();

        setBook({
          id: id,
          ...bookData,
        });

        const authorSnapshot = await get(
          ref(db, `autori/${bookData.idAutora}`)
        );

        if (authorSnapshot.exists()) {
          const authorData = authorSnapshot.val();

          setAuthorName(
            `${authorData.ime} ${authorData.prezime}`
          );
        }
      } else {
        setBook(null);
      }
    } catch (error) {
      console.log("Greška pri učitavanju knjige:", error);
    }
  };

  fetchBook();
}, [id]);

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
                src={book.slike?.[0]}
                alt={book.naziv}
                className="book-cover-3d"
              />
            </div>
          </div>

          <div className="book-main-info">
            <span className="book-chip">{book.zanr}</span>

            <h1 className="book-main-title">{book.naziv}</h1>

           <Link className="book-author-link">
  {authorName}
</Link>

            <div className="book-divider"></div>

            <p className="book-main-description">{book.opis}</p>

            <div className="book-meta-grid">
              <div className="book-meta-card">
                <span>Формат</span>
                <strong>{book.format}</strong>
              </div>

              <div className="book-meta-card">
                <span>Цена</span>
                <strong>{book.cena}</strong>
              </div>

              <div className="book-meta-card">
                <span>Страна</span>
                <strong>{book.brojStrana}</strong>
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