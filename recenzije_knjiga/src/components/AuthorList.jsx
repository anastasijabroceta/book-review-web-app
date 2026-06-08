import React, { useEffect, useState } from 'react';
import './AuthorList.css';
import HeroAuthors from './HeroAuthors';
import SearchAuthors from './SearchAuthors';
import FeaturedAuthor from './FeaturedAuthor';
import AuthorStats from './AuthorStats';
import { Link } from 'react-router-dom';
import { ref, get } from "firebase/database"; 
import { db } from "../firebase"; 

function AuthorList() {
  const [authors, setAuthors] = useState([]); 
  const [books, setBooks] = useState({}); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorsAndBooks = async () => {
      try {
        const authorsSnapshot = await get(ref(db, "autori"));
        const booksSnapshot = await get(ref(db, "knjige"));

        if (booksSnapshot.exists()) {
          setBooks(booksSnapshot.val());
        }

        if (authorsSnapshot.exists()) {
          const authorsDataFromDB = authorsSnapshot.val();

          const authorsArray = Object.keys(authorsDataFromDB).map((key) => ({
            id: key, 
            ...authorsDataFromDB[key]
          }));

          setAuthors(authorsArray);
        } else {
          setAuthors([]);
        }
      } catch (error) {
        console.log("Greška pri učitavanju podataka iz baze:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorsAndBooks();
  }, []);

  // Помоћна функција која претвара ГГГГ-ММ-ДД у ДД. ММ. ГГГГ.
  const formatirajDatum = (izvorniDatum) => {
    if (!izvorniDatum) return "Непознато";
    
    // Делимо стринг тамо где су цртице (нпр. "1749-08-28" постаје ["1749", "08", "28"])
    const delovi = izvorniDatum.split("-");
    
    // Ако датум није у добром формату, враћамо га онако како јесте
    if (delovi.length !== 3) return izvorniDatum; 
    
    // Спајамо их у редослед: дан. месец. година.
    return `${delovi[2]}.${delovi[1]}.${delovi[0]}.`;
  };

  if (loading) {
    return <p style={{ textAlign: "center", padding: "50px" }}>Учитавање аутора...</p>;
  }

  return (
    <section className="authors-page">
      <HeroAuthors />

      <FeaturedAuthor />

      <AuthorStats />

      <SearchAuthors />

      <div className="authors-grid-container">
        <div className="authors-grid">
          {authors.map(author => {
            // Бројање књига из базе
            const sveKnjigeIzBaze = Object.values(books);
            const brojKnjigaOvogAutora = sveKnjigeIzBaze.filter(
              (book) => book.idAutora === author.id
            ).length;

            // Извлачење прве слике
            const slikaAutora = author.slike && author.slike[0] ? author.slike[0] : "";

            return (
              <div key={author.id} className="author-card-modern">

                <div className="book-count-badge">
                  {brojKnjigaOvogAutora} књига
                </div>

                <div className="author-avatar-container">
                  <div 
                    className="author-image-circle" 
                    style={{ backgroundImage: `url(${slikaAutora})` }}
                  ></div>
                </div>

                <div className="author-content-modern">
                  <h3>{author.ime} {author.prezime}</h3>
                  
                  {/* Прослеђујемо датум из базе кроз нашу функцију за лепши формат */}
                  <p className="author-meta">Рођен(а): <i>{formatirajDatum(author.datumRodjenja)}</i></p>
                  
                  <hr className="card-separator" />

                  <div className="author-stats-row">
                    <span className="stat-label">Активност:</span>
                    <span className="stat-value">{author.status || "Активан"}</span>
                  </div>

                  <Link to={`/author/${author.id}`} className="author-btn">
                    Види профил
                  </Link>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AuthorList;