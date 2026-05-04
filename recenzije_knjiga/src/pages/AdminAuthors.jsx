import React, { useState } from "react";
import "./AdminBooks.css"; 

const initialAuthors = [
  { id: 1, name: "Меша", surname: "Селимовић", status: "Преминуо", birthDate: "26.04.1910.", awards: "12", phone: "+381 60 123-4567" },
  { id: 2, name: "Иво", surname: "Андрић", status: "Преминуо", birthDate: "09.10.1892.", awards: "24", phone: "+381 61 222-3333" },
  { id: 3, name: "Десанка", surname: "Максимовић", status: "Преминуо", birthDate: "16.05.1898.", awards: "15", phone: "+381 62 444-5555" },
  { id: 4, name: "Борислав", surname: "Пекић", status: "Преминуо", birthDate: "04.02.1930.", awards: "18", phone: "+381 63 777-8888" }
];

const AdminAuthors = () => {
  const [authors, setAuthors] = useState(initialAuthors);
  const [formData, setFormData] = useState({ name: "", surname: "", status: "", birthDate: "", awards: "", phone: "" });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setAuthors(authors.map(a => a.id === editingId ? { ...formData, id: editingId } : a));
      setEditingId(null);
    } else {
      setAuthors([...authors, { ...formData, id: Date.now() }]);
    }
    setFormData({ name: "", surname: "", status: "Преминуо", birthDate: "", awards: "", phone: "" });
  };

  return (
    <div className="admin-books-page">
      <div className="admin-books-container">

        <div className="admin-books-form-card">
          
          <h2>{editingId ? "Измени податке" : "Додај новог аутора"}</h2>
          <form className="admin-books-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <input 
                type="text" 
                placeholder="Име" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                required 
              />
              <input 
                type="text" 
                placeholder="Презиме" 
                value={formData.surname} 
                onChange={e => setFormData({...formData, surname: e.target.value})} 
                required 
              />
              <input 
                type="text" 
                placeholder="Статус (Активан / Преминуо)" 
                value={formData.status} 
                onChange={e => setFormData({...formData, status: e.target.value})} 
                required 
              />
              <input 
                type="text" 
                placeholder="Датум рођења" 
                value={formData.birthDate} 
                onChange={e => setFormData({...formData, birthDate: e.target.value})} 
                required 
              />
              <input 
                type="number" 
                placeholder="Број награда" 
                value={formData.awards} 
                onChange={e => setFormData({...formData, awards: e.target.value})} 
                required 
              />
              <input 
                type="text" 
                placeholder="Телефон менаџера" 
                value={formData.phone} 
                onChange={e => setFormData({...formData, phone: e.target.value})} 
                required 
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="featured-more-btn-admin">
                {editingId ? "Сачувај измене" : "Додај аутора"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="admin-books-table-card">
        <h2>Листа аутора</h2>
        <div className="table-wrapper">
          <table className="admin-books-table">
            <thead>
              <tr>
                <th>Аутор</th><th>Статус</th><th>Рођен</th><th>Награде</th><th>Контакт</th><th>Акције</th>
              </tr>
            </thead>
            <tbody>
              {authors.map(a => (
                <tr key={a.id}>
                  <td>{a.name} {a.surname}</td>
                  <td>{a.status}</td>
                  <td>{a.birthDate}</td>
                  <td>{a.awards}</td>
                  <td>{a.phone}</td>
                  <td className="actions-cell">
                    <button className="edit-btn" onClick={() => { setEditingId(a.id); setFormData(a); }}>Измени</button>
                    <button className="delete-btn" onClick={() => { setSelectedId(a.id); setShowModal(true); }}>Обриши</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal-box">
            <p>Сигурни сте да желите обрисати аутора?</p>
            <button onClick={() => { setAuthors(authors.filter(a => a.id !== selectedId)); setShowModal(false); }}>Да</button>
            <button onClick={() => setShowModal(false)}>Не</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAuthors;