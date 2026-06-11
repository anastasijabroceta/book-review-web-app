import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './AuthorDetails.css';
import { ref, get, push, set } from "firebase/database"; 
import { db } from "../firebase"; 

const AuthorDetails = () => {
  const { id } = useParams(); 
  const [author, setAuthor] = useState(null);
  const [authorBooks, setAuthorBooks] = useState([]); 
  const [loading, setLoading] = useState(true);

  const [prosecnaOcena, setProsecnaOcena] = useState("0.0");
  const [izabranaOcena, setIzabranaOcena] = useState(0); 
  const [hoverOcena, setHoverOcena] = useState(0); 
  const [ulogovaniKorisnik, setUlogovaniKorisnik] = useState(null);
  const [porukaOcenjivanja, setPorukaOcenjivanja] = useState(""); 

  const fetchAllDetails = async () => {
    try {
      const authorSnapshot = await get(ref(db, `autori/${id}`));
      
      const booksSnapshot = await get(ref(db, "knjige"));

      const ratingsSnapshot = await get(ref(db, "ocene"));

      if (authorSnapshot.exists()) {
        setAuthor({
          id: id,
          ...authorSnapshot.val()
        });
      }

      if (booksSnapshot.exists() && authorSnapshot.exists()) {
        const allBooks = booksSnapshot.val();
        
        const cistIdAutora = id.replace(/\D/g, ""); 

        const filteredBooks = Object.keys(allBooks)
          .map(key => ({ id: key, ...allBooks[key] }))
          .filter(book => {
            if (!book.idAutora) return false;
            const cistBookIdAutora = String(book.idAutora).replace(/\D/g, "");
            return book.idAutora === id || cistBookIdAutora === cistIdAutora;
          });
        
        setAuthorBooks(filteredBooks);
      }

      if (ratingsSnapshot.exists()) {
        const allRatings = ratingsSnapshot.val();
        const cistIdAutora = id.replace(/\D/g, "");

        const filteredRatings = Object.values(allRatings).filter(rating => {
          if (!rating.idAutora) return false;
          const cistRatingIdAutora = String(rating.idAutora).replace(/\D/g, "");
          return rating.idAutora === id || cistRatingIdAutora === cistIdAutora;
        });

        if (filteredRatings.length > 0) {
          const suma = filteredRatings.reduce((sum, curr) => sum + Number(curr.vrednost), 0);
          const prosek = (suma / filteredRatings.length).toFixed(1);
          setProsecnaOcena(prosek);
        } else {
          setProsecnaOcena("0.0");
        }
      } else {
        setProsecnaOcena("0.0");
      }

    } catch (error) {
      console.log("Greška pri učitavanju detalja autora:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const proveriLogin = () => {
      const korisnikId = localStorage.getItem("ulogovaniKorisnikId");
      if (korisnikId) {
        setUlogovaniKorisnik({ id: korisnikId });
      } else {
        setUlogovaniKorisnik(null);
      }
    };

    if (id) {
      fetchAllDetails();
      proveriLogin();
    }
  }, [id]);

  const handlePotvrdiOcenu = async () => {
    if (!ulogovaniKorisnik) {
      setPorukaOcenjivanja("⚠️ Морате бити улоговани!");
      setTimeout(() => setPorukaOcenjivanja(""), 3000);
      return;
    }

    if (izabranaOcena === 0) {
      setPorukaOcenjivanja("✨ Изаберите оцену (1-5)!");
      setTimeout(() => setPorukaOcenjivanja(""), 3000);
      return;
    }

    const idKorisnika = ulogovaniKorisnik.id;

    const novaOcena = {
      idAutora: id,
      idKorisnika: idKorisnika || "anoniman_korisnik",
      vrednost: Number(izabranaOcena),
      datum: new Date().toISOString().split('T')[0]
    };

    try {
      const oceneRef = ref(db, "ocene");
      const novaOcenaRef = push(oceneRef);
      await set(novaOcenaRef, novaOcena);

      setPorukaOcenjivanja("✅ Успешно сте оценили аутора!");
      setTimeout(() => setPorukaOcenjivanja(""), 3000);
      
      fetchAllDetails(); 
    } catch (error) {
      console.error("Greška pri upisu ocene u bazu:", error);
      setPorukaOcenjivanja("❌ Грешка при чувању оцене.");
      setTimeout(() => setPorukaOcenjivanja(""), 3000);
    }
  };

  const formatirajDatum = (izvorniDatum) => {
    if (!izvorniDatum) return "Непознато";
    const delovi = izvorniDatum.split("-");
    if (delovi.length !== 3) return izvorniDatum; 
    return `${delovi[2]}. ${delovi[1]}. ${delovi[0]}.`;
  };

  if (loading) {
    return <p className="loading-text">Учитавање детаља о аутору...</p>;
  }

  if (!author) {
    return (
      <div className="not-found-wrapper">
        <h1>Аутор није пронађен</h1>
        <Link to="/authors">Назад на листу аутора</Link>
      </div>
    );
  }

  const slikaAutora = author.slike && author.slike[0] ? author.slike[0] : "";

  return (
    <div className="author-details-wrapper">
      <div className="author-details-page">
        
        <section className="author-split-hero">
          <div className="author-info-main-card">
            <div className="status-badge-absolute">{author.status || "Активан"}</div>
            <div 
              className="author-image-circle-large"
              style={{ backgroundImage: `url(${slikaAutora})` }}
            ></div>
            <div className="author-text-meta">
              <span className="subtitle-gold">КЊИЖЕВНИ ВЕЛИКАН</span>
              <h1>{author.ime} <br/> {author.prezime}</h1>
              <p className="birth-info">📅 Рођен(а): <strong>{formatirajDatum(author.datumRodjenja)}</strong></p>
            </div>
          </div>

          <div className="author-rating-card-isolated">
            <h3>Оцените аутора</h3>
            
            <div className="interactive-stars-box">
              {[1, 2, 3, 4, 5].map((zvezdica) => (
                <span 
                  key={zvezdica}
                  className={`star-large ${zvezdica <= (hoverOcena || izabranaOcena) ? "active-star" : ""}`}
                  onClick={() => setIzabranaOcena(zvezdica)}
                  onMouseEnter={() => setHoverOcena(zvezdica)}
                  onMouseLeave={() => setHoverOcena(0)}
                >
                  ★
                </span>
              ))}
            </div>

            <button className="confirm-rating-btn" onClick={handlePotvrdiOcenu}>
              ПОТВРДИ ОЦЕНУ
            </button>

            {porukaOcenjivanja && (
              <div className="rating-status-message">
                {porukaOcenjivanja}
              </div>
            )}
            
            <div className="current-avg-display">
              Просечна оцена: <strong>{prosecnaOcena}</strong>
            </div>
          </div>
        </section>

        <section className="author-stats-banner-modern">
          <div className="stat-unit">
            <span className="unit-val">{author.brojOsvojenihNagrada || 0}</span>
            <span className="unit-label">Награда</span>
          </div>
          <div className="stat-unit">
            <span className="unit-val">
              {author.brojProdatihPrimeraka ? author.brojProdatihPrimeraka.toLocaleString() : 0}
            </span>
            <span className="unit-label">Продато примерака</span>
          </div>
          <div className="stat-unit">
            <span className="unit-val">{authorBooks.length}</span>
            <span className="unit-label">Написаних књига</span>
          </div>
        </section>

        <div className="details-content-grid">
          <div className="bio-container-card">
            <h2 className="classic-title">Биографија</h2>
            <p className="bio-text-justify">{author.biografija || "Нема унете биографије."}</p>
          </div>

          <div className="books-list-container">
            <div className="books-card-side">
              <h2 className="classic-title">Листа свих књига</h2>
              <div className="books-scroll-area">
                {authorBooks.length > 0 ? (
                  authorBooks.map((book) => (
                    <Link key={book.id} to={`/book/${book.id}`} className="author-book-link">
                      <span className="book-icon-bullet">📖</span>
                      <span className="book-title-text">{book.naziv || book.naslov}</span>
                    </Link>
                  ))
                ) : (
                  <p>Нема пронађених књига за овог аутора.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <section className="author-quote-break">
          <div className="quote-content">
            <span className="quote-icon">“</span>
            <p>Књиге су огледало душе, а писана реч живи вечно, преносећи мудрост кроз векове.</p>
          </div>
        </section>

        <section className="author-gallery">
          <h2 className="classic-title">Галерија слика</h2>
          <div className="gallery-grid-modern">
            <div className="gallery-img-box" style={{ backgroundImage: `url(${author.slike?.[0] || ''})` }}></div>
            <div className="gallery-img-box" style={{ backgroundImage: `url(${author.slike?.[1] || author.slike?.[0] || ''})`, opacity: author.slike?.[1] ? 1 : 0.4 }}></div>
            <div className="gallery-img-box" style={{ backgroundImage: `url(${author.slike?.[2] || author.slike?.[0] || ''})`, opacity: author.slike?.[2] ? 1 : 0.4 }}></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthorDetails;