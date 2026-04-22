import React from "react";
import "./AllBooks.css";
import { Link } from "react-router-dom";
import AnaKarenjina from "../assets/ana_karenjina.jpg";
import Zlocin from "../assets/zlocin_i_kazna.jpg";
import Book1984 from "../assets/1984.jpg";
import Poreklo from "../assets/poreklo.jpg";
import VelelepotaSekunde from "../assets/velelepota_sekunde.jpg";
const books = [
  {
    id: 1,
    title: "Ана Карењина",
    author: "Лав Толстој",
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
    genre: "Литература",
    format: "Тврди повез",
    price: "1.350 РСД",
    pages: 480,
    isbn: "978-86-7543-555-2",
    rating: 4.6,
    description:
      "Поријекло је роман о тајни и заговору који се одвија у свету банкира и политичара.",
    image:  Poreklo,
  },
  {
    id: 5,
    title: "Велелепота секунде",
    author: "Ненад Гугл",
    genre: "Роман",
    format: "Тврди повез",
    price: "1.290 РСД",
    pages: 227,
    isbn: "978-86-81746-01-1",
    rating: 4.8,
    description:
    "“Велелепота секунде” вас води кроз бујицу снажних емоција, од туге и немоћи до охрабрења и узвишености, откривајући како свака секунда може бити испуњена вечном величином. У тешком и смутном времену где је човештво изгубљено, овај роман приказује преображење човека и неогранчени потенцијал у нашем развоју.",
    image: VelelepotaSekunde,
  }

];

const AllBooks = () => {
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
                  <img src={book.image} alt={book.title} className="book-row-image" />
                </div>

                <div className="book-row-content">
                  <div className="book-row-top">
                    <div>
                      <span className="book-row-tag">{book.genre}</span>
                      <h2>{book.title}</h2>
                      <p className="book-row-author">{book.author}</p>
                    </div>

                    <div className="book-row-rating">⭐ {book.rating}</div>
                  </div>

                  <p className="book-row-description">{book.description}</p>

                  <div className="book-row-meta">
                    <div className="meta-box">
                      <span>Формат</span>
                      <strong>{book.format}</strong>
                    </div>
                    <div className="meta-box">
                      <span>Цена</span>
                      <strong>{book.price}</strong>
                    </div>
                    <div className="meta-box">
                      <span>Страна</span>
                      <strong>{book.pages}</strong>
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