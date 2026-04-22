import React, { useState } from "react";
import "./AdminBooks.css";

const initialBooks = [
  {
    id: 1,
    title: "Ана Карењина",
    author: "Лав Толстој",
    genre: "Роман",
    format: "Тврди повез",
    price: "1290",
    pages: "864",
    isbn: "978-86-7543-555-2",
  },
  {
    id: 2,
    title: "Злочин и казна",
    author: "Фјодор Достојевски",
    genre: "Психолошки роман",
    format: "Меки повез",
    price: "1590",
    pages: "528",
    isbn: "9788675431234",
  },
];

const emptyForm = {
  title: "",
  author: "",
  genre: "",
  format: "",
  price: "",
  pages: "",
  isbn: "",
};

const AdminBooks = () => {
  const [books, setBooks] = useState(initialBooks);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateISBN(formData.isbn)) {
      setError("ISBN није у исправном формату.");
      return;
    }

    setError("");

    if (editingId !== null) {
      setBooks((prev) =>
        prev.map((book) =>
          book.id === editingId ? { ...book, ...formData } : book
        )
      );
      setEditingId(null);
    } else {
      const newBook = {
        id: Date.now(),
        ...formData,
      };
      setBooks((prev) => [...prev, newBook]);
    }

    setFormData(emptyForm);
  };

  const handleEdit = (book) => {
    setEditingId(book.id);
    setFormData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      format: book.format,
      price: book.price,
      pages: book.pages,
      isbn: book.isbn,
    });
    setError("");
  };

  const handleDelete = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));

    if (editingId === id) {
      setEditingId(null);
      setFormData(emptyForm);
      setError("");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
  };

  return (
    <section className="admin-books-page">
      <div className="admin-books-container">
        <div className="admin-books-header">
          <h1>Управљање књигама</h1>
          <p>Додавање, измена, преглед и брисање књига на једном месту.</p>
        </div>

        <div className="admin-books-form-card">
          <h2>{editingId !== null ? "Измени књигу" : "Додај нову књигу"}</h2>

          <form className="admin-books-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <input
                type="text"
                name="title"
                placeholder="Назив"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="author"
                placeholder="Аутор"
                value={formData.author}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="genre"
                placeholder="Жанр"
                value={formData.genre}
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
                name="price"
                placeholder="Цена"
                value={formData.price}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="pages"
                placeholder="Број страна"
                value={formData.pages}
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
            </div>

            {error && <p className="form-error">{error}</p>}

            <div className="form-actions">
              <button type="submit" className="save-btn">
                {editingId !== null ? "Сачувај измене" : "Додај књигу"}
              </button>

              {editingId !== null && (
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
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>{book.format}</td>
                    <td>{book.price}</td>
                    <td>{book.pages}</td>
                    <td>{book.isbn}</td>
                    <td className="actions-cell">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(book)}
                      >
                        Измени
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(book.id)}
                      >
                        Обриши
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminBooks;