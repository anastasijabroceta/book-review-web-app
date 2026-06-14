import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./BookDetails.css";
import { ref, get, set } from "firebase/database";
import { db } from "../firebase";
import VintagePhoto from "../assets/vintage_photo.png";

const BookDetails = () => {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [authorName, setAuthorName] = useState("");
  const [reviews, setReviews] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");

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
          setAuthorName(`${authorData.ime} ${authorData.prezime}`);
        }
      } else {
        setBook(null);
      }

      const reviewsSnapshot = await get(ref(db, "recenzije"));
      const usersSnapshot = await get(ref(db, "korisnici"));

      if (reviewsSnapshot.exists()) {
        const reviewsData = reviewsSnapshot.val();
        const usersData = usersSnapshot.exists() ? usersSnapshot.val() : {};

        const reviewsArray = Object.keys(reviewsData)
          .map((key) => {
            const review = reviewsData[key];
            const korisnik = usersData[review.idKorisnika];

            return {
              id: key,
              ...review,
              korisnikIme: korisnik
                ? `${korisnik.ime} ${korisnik.prezime}`
                : "Непознат корисник",
            };
          })
          .filter((review) => review.idKnjige === id);

        setReviews(reviewsArray);
      } else {
        setReviews([]);
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

  const handleSubmit = async (e) => {
  e.preventDefault();

  const korisnikId = localStorage.getItem("ulogovaniKorisnikId");

  if (!korisnikId) {
   setPopupMessage(
  "Морате бити пријављени да бисте оставили рецензију."
);
    return;
  }

  if (newReview.trim() === "") {
   setPopupMessage(
  "Рецензија не може бити празна."
);
    return;
  }

  try {
    const korisnikSnapshot = await get(ref(db, `korisnici/${korisnikId}`));

    if (!korisnikSnapshot.exists()) {
     setPopupMessage(
  "Корисник није пронађен."
);
      return;
    }

    const korisnik = korisnikSnapshot.val();

    const recenzijeSnapshot = await get(ref(db, "recenzije"));
    const recenzijeData = recenzijeSnapshot.exists()
      ? recenzijeSnapshot.val()
      : {};

    const noviBroj = Object.keys(recenzijeData).length + 1;
    const novaRecenzijaId = `rec${String(noviBroj).padStart(3, "0")}`;

    const novaRecenzija = {
      idKnjige: id,
      idKorisnika: korisnikId,
      tekst: newReview.trim(),
      datum: new Date().toISOString().split("T")[0],
    };

    await set(ref(db, `recenzije/${novaRecenzijaId}`), novaRecenzija);

    setReviews([
      {
        id: novaRecenzijaId,
        ...novaRecenzija,
        korisnikIme: `${korisnik.ime} ${korisnik.prezime}`,
      },
      ...reviews,
    ]);

    setNewReview("");
  } catch (error) {
    console.log("Грешка при додавању рецензије:", error);
    setPopupMessage("Дошло је до грешке при додавању рецензије.");
  }
};

  return (
    <section className="book-details-page">
      {popupMessage && (
  <div className="custom-popup-overlay">
    <div className="custom-popup">
      <h3>Обавештење</h3>

      <p>{popupMessage}</p>

      <button
        onClick={() => setPopupMessage("")}
        className="popup-btn"
      >
        У реду
      </button>
      
    </div>
  </div>
)}
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

            <Link to={`/author/${book.idAutora}`} className="book-author-link">
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

         {reviews.map((review) => (
  <div className="single-review-card" key={review.id}>
    <div className="review-avatar">
      {review.korisnikIme?.charAt(0)}
    </div>

    <div className="review-content">
      <div className="review-top-line">
        <strong>{review.korisnikIme}</strong>
        <span className="review-stars">★★★★★</span>
      </div>

      <p>{review.tekst}</p>
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