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

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); 


  const highlightText = (text) => {
    if (!searchTerm.trim() || !text) return text;

    const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");

    return String(text)
      .split(regex)
      .map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <mark className="search-highlight" key={index}>
            {part}
          </mark>
        ) : (
          part
        )
      );
  };

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

  const formatirajDatum = (izvorniDatum) => {
    if (!izvorniDatum) return "Непознато";
    const delovi = izvorniDatum.split("-");
    if (delovi.length !== 3) return izvorniDatum; 
    return `${delovi[2]}.${delovi[1]}.${delovi[0]}.`;
  };

  const filteredAuthors = authors.filter(author => {
    const imePrezime = `${author.ime} ${author.prezime}`.toLowerCase();
    const matchesSearch = imePrezime.includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "" || author.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <p className="loading-text">Учитавање аутора...</p>;
  }

  return (
    <section className="authors-page">
      <HeroAuthors />

      <FeaturedAuthor />

      <AuthorStats />

      <SearchAuthors 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        statusFilter={statusFilter} 
        setStatusFilter={setStatusFilter} 
      />

      <div className="authors-grid-container">
        <div className="authors-grid">
          {filteredAuthors.map(author => {
            const sveKnjigeIzBaze = Object.values(books);
            const cistIdAutora = author.id.replace(/\D/g, "");

            const brojKnjigaOvogAutora = sveKnjigeIzBaze.filter((book) => {
              if (!book.idAutora) return false;
              const cistBookIdAutora = String(book.idAutora).replace(/\D/g, "");
              return book.idAutora === author.id || cistBookIdAutora === cistIdAutora;
            }).length;

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
                  <h3>{highlightText(`${author.ime} ${author.prezime}`)}</h3>
                  
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

          {filteredAuthors.length === 0 && (
            <p className="no-results-message">
              Нема аутора који испуњавају задате критеријуме претраге.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default AuthorList;