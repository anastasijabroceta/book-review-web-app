import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './AuthorDetails.css';
import img1 from "../assets/mesa_selimovic.jpg";
import img2 from "../assets/ivo_andric.jpg";
import img3 from "../assets/nenad_gugl.jpg";
import img4 from "../assets/milos_crnjanski.jpg";
import img5 from "../assets/desanka_maksimovic.jpg";
import img6 from "../assets/borislav_pekic.jpg";

const authorsData = [
  { 
    id: 1, 
    name: "Меша", 
    surname: "Селимовић", 
    status: "Преминуо", 
    mainQuote: "Човјек је несавршено биће, а све што он створи, носи печат његове несавршености.",
    bio: "Меша Селимовић је био истакнути југословенски писац. Његов роман 'Дервиш i смрт' један је од најзначајнијих књижевних дела на овим просторима. Кроз своје ликове, Селимовић истражује дубоке унутрашње сукобе, питања вере, власти и људске етике у тешким историјским временима.", 
    birthDate: "26. април 1910.", 
    awards: 12, 
    soldCopies: "5.000.000+", 
    managerPhone: "+381 60 123-4567", 
    image: img1, 
    books: [{ id: '101', title: 'Дервиш и смрт' }, { id: '102', title: 'Тврђава' }], 
    averageRating: 4.8 
  },
  { 
    id: 2, 
    name: "Иво", 
    surname: "Андрић", 
    status: "Преминуо", 
    mainQuote: "Све су Дрине овог свијета криве; никада се оне неће моћи потпуно исправити, али никада не смијемо престати да их исправљамо.",
    bio: "Једини југословенски добитник Нобелове награде за књижевност. Његова дела попут 'На Дрини ћуприја' приказала су историју Балкана, преплитање култура и судбине људи кроз векове на овим просторима.", 
    birthDate: "9. октобар 1892.", 
    awards: 24, 
    soldCopies: "10.000.000+", 
    managerPhone: "+381 61 222-3333", 
    image: img2, 
    books: [{ id: '201', title: 'На Дрини ћуприја' }, { id: '202', title: 'Проклета авлија' }], 
    averageRating: 4.9 
  },
  { 
    id: 3, 
    name: "Ненад", 
    surname: "Гугл", 
    status: "Активан", 
    mainQuote: "Живот се не мери бројем удаха које направимо, већ тренуцима који нам одузимају дах.",
    bio: "Савремени српски писац и професор који својим делима 'Умро сам у петак' и 'Велелепота секунде' инспирише младе генерације да истражују дубљи смисао живота и духовности.", 
    birthDate: "1982.", 
    awards: 8, 
    soldCopies: "100.000+", 
    managerPhone: "+381 63 444-5555", 
    image: img3, 
    books: [{ id: '301', title: 'Умро сам у петак' }, { id: '302', title: 'Велелепота секунде' }], 
    averageRating: 4.7 
  },
  { 
    id: 4, 
    name: "Милош", 
    surname: "Црњански", 
    status: "Преминуо", 
    mainQuote: "Бескрајни плави круг. У њему, звезда.",
    bio: "Један од најзначајнијих стваралаца српске књижевности 20. века. Песник, приповедач и романсијер који је увео модернизам у нашу литературу кроз дела као што су 'Сеобе'.", 
    birthDate: "26. октобар 1893.", 
    awards: 15, 
    soldCopies: "3.000.000+", 
    managerPhone: "+381 64 666-7777", 
    image: img4, 
    books: [{ id: '401', title: 'Сеобе' }, { id: '402', title: 'Роман о Лондону' }], 
    averageRating: 4.8 
  },
  { 
    id: 5, 
    name: "Десанка", 
    surname: "Максимовић", 
    status: "Преминуо", 
    mainQuote: "Не, немој ми прићи! Хоћу из далека да волим и желим ока твоја два.",
    bio: "Најомиљенија српска песникиња чији су стихови обележили детињство и младост многих генерација. Њена поезија одише љубављу, родољубљем и дубоком хуманошћу.", 
    birthDate: "16. мај 1898.", 
    awards: 40, 
    soldCopies: "8.000.000+", 
    managerPhone: "+381 65 888-9999", 
    image: img5, 
    books: [{ id: '501', title: 'Тражим помиловање' }, { id: '502', title: 'Крвава бајка' }], 
    averageRating: 5.0 
  },
  { 
    id: 6, 
    name: "Борислав", 
    surname: "Пекић", 
    status: "Преминуо", 
    mainQuote: "Треба гледати право. Јер да се требало гледати иза себе, добили бисмо очи на потиљку.",
    bio: "Један од најважнијих писаца модерне српске књижевности. Његов опус обухвата монументалне романе који истражују историју, политику и судбину појединца у заједници.", 
    birthDate: "4. фебруар 1930.", 
    awards: 18, 
    soldCopies: "2.500.000+", 
    managerPhone: "+381 69 000-1111", 
    image: img6, 
    books: [{ id: '601', title: 'Беснило' }, { id: '602', title: 'Златно руно' }], 
    averageRating: 4.9 
  }
];

const AuthorDetails = () => {
  const { id } = useParams();
  const author = authorsData.find(a => a.id === parseInt(id));

  if (!author) return <div className="error-view"><h2>Аутор није пронађен.</h2></div>;

  return (
    <div className="author-details-wrapper">
      <div className="author-details-page">
        
        <section className="author-split-hero">
          <div className="author-info-main-card">
            <div className="status-badge-absolute">{author.status}</div>
            <div 
              className="author-image-circle-large"
              style={{ backgroundImage: `url(${author.image})`, backgroundSize: 'cover', backgroundPosition: 'top' }}
            ></div>
            <div className="author-text-meta">
              <span className="subtitle-gold">КЊИЖЕВНИ ВЕЛИКАН</span>
              <h1>{author.name} <br/> {author.surname}</h1>
              <p className="birth-info">📅 Рођен: <strong>{author.birthDate}</strong></p>
            </div>
          </div>

          <div className="author-rating-card-isolated">
            <h3>Оцените аутора</h3>
            <div className="interactive-stars-box">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star-large">★</span>
              ))}
            </div>
            <button className="confirm-rating-btn">ПОТВРДИ ОЦЕНУ</button>
            <div className="current-avg-display" style={{marginTop: '15px', fontSize: '0.9rem', color: '#5d4037'}}>
              Просечна оцена: <strong>{author.averageRating}</strong>
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
            <h2 className="classic-title">Биографија</h2>
            <p className="bio-text-justify">{author.bio}</p>
          </article>

          <aside className="books-list-container">
            <div className="books-card-side">
              <h2 className="classic-title">Листа свих књига</h2>
              <div className="books-scroll-area">
                {author.books.map((book) => (
                  <Link key={book.id} to={`/book/${book.id}`} className="author-book-link">
                    <span className="book-icon-bullet" style={{marginRight: '15px'}}>📖</span>
                    <span className="book-title-text">{book.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <section className="author-quote-break">
          <div className="quote-content">
            <span className="quote-icon">“</span>
            <p>{author.mainQuote}</p>
          </div>
        </section>

        <section className="author-gallery-footer">
          <h2 className="classic-title" style={{marginBottom: '40px'}}>Галерија слика</h2>
          <div className="gallery-grid-modern">
            <div className="gallery-img-box" style={{ backgroundImage: `url(${author.image})` }}></div>
            <div className="gallery-img-box" style={{ opacity: 0.6 }}></div>
            <div className="gallery-img-box" style={{ opacity: 0.6 }}></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthorDetails;