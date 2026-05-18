import React from "react";
import "./AllBooks.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../firebase";


const AllBooks = () => {
  const [books, setBooks] = useState([]);

 useEffect(() => {
  const fetchBooks = async () => {
    try {
      const booksSnapshot = await get(ref(db, "knjige"));
      const authorsSnapshot = await get(ref(db, "autori"));

      if (booksSnapshot.exists() && authorsSnapshot.exists()) {
        const booksData = booksSnapshot.val();
        const authorsData = authorsSnapshot.val();

        const booksArray = Object.keys(booksData).map((key) => {
          const book = booksData[key];
          const author = authorsData[book.idAutora];

          return {
            id: key,
            ...book,
            autorImePrezime: author
              ? `${author.ime} ${author.prezime}`
              : "Непознат аутор",
          };
        });

        setBooks(booksArray);
      }
    } catch (error) {
      console.log("Greška pri učitavanju knjiga:", error);
    }
  };

  fetchBooks();
}, []);

  return (
    <section className="allbooks">
      <div className="allbooks-container">
        <div className="allbooks-header tracking-in-expand">
          <h1>Све књиге</h1>
          <p>Истражи каталог и пронађи своје омиљене наслове</p>
        </div>

        <div className="allbooks-layout">
          <aside className="filters">
            <h3>Филтери</h3>

            <div className="filter-group">
              <label>Претрага</label>
              <input type="text" placeholder="Назив, аутор, ISBN..." />
            </div>

            <div className="filter-group">
              <label>Жанр</label>
              <select>
                <option>Сви жанрови</option>
                <option>Класик</option>
                <option>Психолошки роман</option>
                <option>Дистопија</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Формат</label>
              <select>
                <option>Сви формати</option>
                <option>Тврди повез</option>
                <option>Меки повез</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Аутор</label>
              <select>
                <option>Сви аутори</option>
                <option>Антуан де Сент-Екзупери</option>
                <option>Фјодор Достојевски</option>
                <option>Џорџ Орвел</option>
              </select>
            </div>

            <button className="apply-btn" type="button">
              Примени
            </button>
          </aside>

          <div className="books-list">
            {books.map((book) => (
              <article className="book-row-card" key={book.id}>
                <div className="book-row-image-wrap">
                  <img
  src={book.slike?.[0]}
  alt={book.naziv}
  className="book-row-image"
/>
                </div>

                <div className="book-row-content">
                  <div className="book-row-top">
                    <div>
                      <span className="book-row-tag">{book.zanr}</span>
                      <h2>{book.naziv}</h2>
                      <p className="book-row-author">{book.autorImePrezime}</p>
                    </div>

                    <div className="book-row-rating">⭐ {book.rating}</div>
                  </div>

                  <p className="book-row-description">{book.opis}</p>

                  <div className="book-row-meta">
                    <div className="meta-box">
                      <span>Формат</span>
                      <strong>{book.format}</strong>
                    </div>
                    <div className="meta-box">
                      <span>Цена</span>
                      <strong>{book.cena}</strong>
                    </div>
                    <div className="meta-box">
                      <span>Страна</span>
                      <strong>{book.brojStrana}</strong>
                    </div>
                    <div className="meta-box">
                      <span>ISBN</span>
                      <strong>{book.isbn}</strong>
                    </div>
                  </div>

                  <div className="book-row-actions">
                    <Link to={`/book/${book.id}`} className="primary-book-btn">
  Детаљи
</Link>
                    <button className="secondary-book-btn">Рецензије</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllBooks;