import "./AllBooks.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../firebase";

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Сви жанрови");
  const [selectedFormat, setSelectedFormat] = useState("Сви формати");
  const [selectedAuthor, setSelectedAuthor] = useState("Сви аутори");

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

  const genres = ["Сви жанрови", ...new Set(books.map((book) => book.zanr))];

  const formats = [
    "Сви формати",
    ...new Set(books.map((book) => book.format)),
  ];

  const authors = [
    "Сви аутори",
    ...new Set(books.map((book) => book.autorImePrezime)),
  ];

  const highlightText = (text) => {
    if (!searchTerm.trim() || !text) return text;

    const escapedSearch = searchTerm.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    const regex = new RegExp(`(${escapedSearch})`, "gi");

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

  const filteredBooks = books.filter((book) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      book.naziv?.toLowerCase().includes(search) ||
      book.autorImePrezime?.toLowerCase().includes(search) ||
      book.isbn?.toLowerCase().includes(search) ||
      book.opis?.toLowerCase().includes(search) ||
      String(book.brojStrana).includes(search) ||
      String(book.cena).includes(search);

    const matchesGenre =
      selectedGenre === "Сви жанрови" || book.zanr === selectedGenre;

    const matchesFormat =
      selectedFormat === "Сви формати" || book.format === selectedFormat;

    const matchesAuthor =
      selectedAuthor === "Сви аутори" ||
      book.autorImePrezime === selectedAuthor;

    return matchesSearch && matchesGenre && matchesFormat && matchesAuthor;
  });

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
              <input
                type="text"
                placeholder="Назив, аутор, ISBN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>Жанр</label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                {genres.map((genre) => (
                  <option key={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Формат</label>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
              >
                {formats.map((format) => (
                  <option key={format}>{format}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Аутор</label>
              <select
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
              >
                {authors.map((author) => (
                  <option key={author}>{author}</option>
                ))}
              </select>
            </div>

            <button
              className="apply-btn"
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedGenre("Сви жанрови");
                setSelectedFormat("Сви формати");
                setSelectedAuthor("Сви аутори");
              }}
            >
              Ресетуј
            </button>
          </aside>

          <div className="books-list">
            {filteredBooks.map((book) => (
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

                      <h2>{highlightText(book.naziv)}</h2>

                      <p className="book-row-author">
                        {highlightText(book.autorImePrezime)}
                      </p>
                    </div>

                    <div className="book-row-rating">⭐ {book.rating}</div>
                  </div>

                  <p className="book-row-description">
                    {highlightText(book.opis)}
                  </p>

                  <div className="book-row-meta">
                    <div className="meta-box">
                      <span>Формат</span>
                      <strong>{book.format}</strong>
                    </div>

                    <div className="meta-box">
                      <span>Цена</span>
                      <strong>{highlightText(String(book.cena))}</strong>
                    </div>

                    <div className="meta-box">
                      <span>Страна</span>
                      <strong>{highlightText(String(book.brojStrana))}</strong>
                    </div>

                    <div className="meta-box">
                      <span>ISBN</span>
                      <strong>{highlightText(book.isbn)}</strong>
                    </div>
                  </div>

                  <div className="book-row-actions">
                    <Link to={`/book/${book.id}`} className="primary-book-btn">
                      Детаљи
                    </Link>
                    {/*<button
  type="button"
  onClick={() =>
    setBooks(
      [...books].sort((a, b) =>
        b.naziv.localeCompare(a.naziv, "sr")
      )
    )
  }
>
  Сортирај Ш-А
</button>*/}

                    
                  </div>
                </div>
              </article>
            ))}

            {filteredBooks.length === 0 && (
              <p>Нема књига које одговарају изабраним филтерима.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllBooks;