import React, { useEffect, useState } from "react";
import "./AdminBooks.css";
import { ref, get, set, remove, update } from "firebase/database";
import { db } from "../firebase";

const emptyForm = {
  naziv: "",
  idAutora: "",
  zanr: "",
  format: "",
  cena: "",
  brojStrana: "",
  isbn: "",
  opis: "",
  slike: "",
};

const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState({});
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchBooksAndAuthors();
  }, []);

  const fetchBooksAndAuthors = async () => {
    try {
      const booksSnapshot = await get(ref(db, "knjige"));
      const authorsSnapshot = await get(ref(db, "autori"));

      const booksData = booksSnapshot.exists() ? booksSnapshot.val() : {};
      const authorsData = authorsSnapshot.exists() ? authorsSnapshot.val() : {};

      setAuthors(authorsData);

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
    } catch (error) {
      console.log("Greška pri učitavanju knjiga:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateISBN = (isbn) => {
    const isbnRegex = /^(97[89])[-]?\d{1,5}[-]?\d{1,7}[-]?\d{1,7}[-]?\d$/;
    return isbnRegex.test(isbn);
  };

  const generateBookId = () => {
    const numbers = books.map((book) =>
      Number(book.id.replace("knj", ""))
    );

    const maxNumber = numbers.length > 0 ? Math.max(...numbers) : 0;

    return `knj${String(maxNumber + 1).padStart(3, "0")}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateISBN(formData.isbn)) {
      setError("ISBN није у исправном формату.");
      return;
    }

    if (!formData.idAutora) {
      setError("Морате изабрати аутора.");
      return;
    }

    try {
      setError("");

      const bookData = {
        naziv: formData.naziv,
        idAutora: formData.idAutora,
        zanr: formData.zanr,
        format: formData.format,
        cena: Number(formData.cena),
        brojStrana: Number(formData.brojStrana),
        isbn: formData.isbn,
        opis: formData.opis,
        slike: formData.slike
          .split(",")
          .map((url) => url.trim())
          .filter((url) => url !== ""),
      };

      if (editingId) {
        await update(ref(db, `knjige/${editingId}`), bookData);
      } else {
        const noviId = generateBookId();
        await set(ref(db, `knjige/${noviId}`), bookData);
      }

      setFormData(emptyForm);
      setEditingId(null);
      fetchBooksAndAuthors();
    } catch (error) {
      console.log("Greška pri čuvanju knjige:", error);
      setError("Дошло је до грешке при чувању књиге.");
    }
  };

  const handleEdit = (book) => {
    setEditingId(book.id);

    setFormData({
      naziv: book.naziv || "",
      idAutora: book.idAutora || "",
      zanr: book.zanr || "",
      format: book.format || "",
      cena: book.cena || "",
      brojStrana: book.brojStrana || "",
      isbn: book.isbn || "",
      opis: book.opis || "",
      slike: book.slike ? book.slike.join(", ") : "",
    });

    setError("");
  };

  const handleDelete = async (id) => {
    try {
      await remove(ref(db, `knjige/${id}`));

      setShowModal(false);
      setSelectedId(null);
      setEditingId(null);
      setFormData(emptyForm);

      fetchBooksAndAuthors();
    } catch (error) {
      console.log("Greška pri brisanju knjige:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
  };

  return (
    <>
      <section className="admin-books-page">
        <div className="admin-books-container">
          <div className="admin-books-form-card">
            <h2>{editingId ? "Измени књигу" : "Додај нову књигу"}</h2>

            <form className="admin-books-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <input
                  type="text"
                  name="naziv"
                  placeholder="Назив"
                  value={formData.naziv}
                  onChange={handleChange}
                  required
                />

                <select
                  name="idAutora"
                  value={formData.idAutora}
                  onChange={handleChange}
                  required
                >
                  <option value="">Изабери аутора</option>
                  {Object.keys(authors).map((authorId) => (
                    <option key={authorId} value={authorId}>
                      {authors[authorId].ime} {authors[authorId].prezime}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  name="zanr"
                  placeholder="Жанр"
                  value={formData.zanr}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="format"
                  placeholder="Формат"
                  value={formData.format}
                  onChange={handleChange}
                  required
                />

                <input
                  type="number"
                  name="cena"
                  placeholder="Цена"
                  value={formData.cena}
                  onChange={handleChange}
                  required
                />

                <input
                  type="number"
                  name="brojStrana"
                  placeholder="Број страна"
                  value={formData.brojStrana}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="isbn"
                  placeholder="ISBN"
                  value={formData.isbn}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="slike"
                  placeholder="URL слике, више URL-ова одвојити зарезом"
                  value={formData.slike}
                  onChange={handleChange}
                />

                <textarea
                  name="opis"
                  placeholder="Опис"
                  value={formData.opis}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <p className="form-error">{error}</p>}

              <div className="form-actions">
                <button type="submit" className="featured-more-btn-admin">
                  {editingId ? "Сачувај измене" : "Додај књигу"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCancelEdit}
                  >
                    Откажи
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="admin-books-table-card">
            <h2>Све књиге</h2>

            <div className="table-wrapper">
              <table className="admin-books-table">
                <thead>
                  <tr>
                    <th>Назив</th>
                    <th>Аутор</th>
                    <th>Жанр</th>
                    <th>Формат</th>
                    <th>Цена</th>
                    <th>Страна</th>
                    <th>ISBN</th>
                    <th>Акције</th>
                  </tr>
                </thead>

                <tbody>
                  {books.map((book) => (
                    <tr key={book.id}>
                      <td data-label="Назив">{book.naziv}</td>
                      <td data-label="Аутор">{book.autorImePrezime}</td>
                      <td data-label="Жанр">{book.zanr}</td>
                      <td data-label="Формат">{book.format}</td>
                      <td data-label="Цена">{book.cena}</td>
                      <td data-label="Страна">{book.brojStrana}</td>
                      <td data-label="ISBN">{book.isbn}</td>
                      <td data-label="Акције" className="actions-cell">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(book)}
                        >
                          Измени
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => {
                            setSelectedId(book.id);
                            setShowModal(true);
                          }}
                        >
                          Обриши
                        </button>
                      </td>
                    </tr>
                  ))}

                  {books.length === 0 && (
                    <tr>
                      <td colSpan="8">Нема књига у бази.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal-box">
            <p>Да ли сте сигурни да желите да обришете књигу?</p>

            <button onClick={() => handleDelete(selectedId)}>
              Да
            </button>

            <button
              onClick={() => {
                setShowModal(false);
                setSelectedId(null);
              }}
            >
              Не
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminBooks;