import React, { useState, useEffect } from "react";
import "./AdminBooks.css"; 
import { ref, get, push, update, remove } from "firebase/database"; 
import { db } from "../firebase"; 

const AdminAuthors = () => {
  const [authors, setAuthors] = useState([]);
  
  // ISPRAVLJENO: Dodata su polja 'biografija' i 'brojProdatihPrimeraka'
  const [formData, setFormData] = useState({ 
    ime: "", 
    prezime: "", 
    status: "", 
    datumRodjenja: "", 
    brojOsvojenihNagrada: "", 
    brojProdatihPrimeraka: "", 
    kontaktTelefonMenadzera: "", 
    biografija: "", 
    slike: "" 
  });
  
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. READ: Učitavanje autora iz Firebase-a
  const fetchAuthors = async () => {
    try {
      const snapshot = await get(ref(db, "autori"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const authorsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setAuthors(authorsArray);
      } else {
        setAuthors([]);
      }
    } catch (error) {
      console.log("Greška pri učitavanju autora:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  // 2. CREATE & UPDATE: Čuvanje podataka
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sva brojčana polja pretvaramo u Number, a sliku pakujemo u niz kako baza zahteva
      const podatkeZaSlanje = {
        ...formData,
        brojOsvojenihNagrada: Number(formData.brojOsvojenihNagrada || 0),
        brojProdatihPrimeraka: Number(formData.brojProdatihPrimeraka || 0),
        slike: formData.slike ? [formData.slike] : [""] 
      };

      if (editingId) {
        await update(ref(db, `autori/${editingId}`), podatkeZaSlanje);
        setEditingId(null);
      } else {
        await push(ref(db, "autori"), podatkeZaSlanje);
      }
      
      // Resetovanje svih polja forme
      setFormData({ 
        ime: "", 
        prezime: "", 
        status: "", 
        datumRodjenja: "", 
        brojOsvojenihNagrada: "", 
        brojProdatihPrimeraka: "", 
        kontaktTelefonMenadzera: "", 
        biografija: "", 
        slike: "" 
      });
      fetchAuthors();
    } catch (error) {
      console.log("Greška pri čuvanju podataka:", error);
    }
  };

  // 3. DELETE: Brisanje autora
  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await remove(ref(db, `autori/${selectedId}`));
      setShowModal(false);
      setSelectedId(null);
      fetchAuthors(); 
    } catch (error) {
      console.log("Greška pri brisanju autora:", error);
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center", padding: "50px" }}>Учитавање административног панела...</p>;
  }

  return (
    <div className="admin-books-page">
      <div className="admin-books-container">

        <div className="admin-books-form-card">
          <h2>{editingId ? "Измени податке аутора" : "Додај новог аутора"}</h2>
          <form className="admin-books-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <input 
                type="text" 
                placeholder="Име" 
                value={formData.ime} 
                onChange={e => setFormData({...formData, ime: e.target.value})} 
                required 
              />
              <input 
                type="text" 
                placeholder="Презиме" 
                value={formData.prezime} 
                onChange={e => setFormData({...formData, prezime: e.target.value})} 
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
                placeholder="Датум рођења (ГГГГ-ММ-ДД)" 
                value={formData.datumRodjenja} 
                onChange={e => setFormData({...formData, datumRodjenja: e.target.value})} 
                required 
              />
              <input 
                type="number" 
                placeholder="Број награда" 
                value={formData.brojOsvojenihNagrada} 
                onChange={e => setFormData({...formData, brojOsvojenihNagrada: e.target.value})} 
                required 
              />
              {/* NOVO POLJE: Broj prodatih primeraka */}
              <input 
                type="number" 
                placeholder="Број продатих примерака" 
                value={formData.brojProdatihPrimeraka} 
                onChange={e => setFormData({...formData, brojProdatihPrimeraka: e.target.value})} 
                required 
              />
              <input 
                type="text" 
                placeholder="Телефон менаџера" 
                value={formData.kontaktTelefonMenadzera} 
                onChange={e => setFormData({...formData, kontaktTelefonMenadzera: e.target.value})} 
              />
              <input 
                type="text" 
                placeholder="Линк do слике аутора (URL)" 
                value={formData.slike} 
                onChange={e => setFormData({...formData, slike: e.target.value})} 
              />
            </div>

            {/* NOVO POLJE: Biografija u vidu textarea za lakši unos dužeg teksta */}
            <div style={{ marginTop: "15px" }}>
              <textarea 
                placeholder="Биографија аутора..." 
                value={formData.biografija} 
                onChange={e => setFormData({...formData, biografija: e.target.value})}
                style={{ width: "100%", minHeight: "100px", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", fontFamily: "inherit" }}
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
                <th>Аутор</th>
                <th>Статус</th>
                <th>Рођен</th>
                <th>Награде</th>
                <th>Продато примерака</th>
                <th>Контакт</th>
                <th>Акције</th>
              </tr>
            </thead>
            <tbody>
              {authors.map(a => (
                <tr key={a.id}>
                  <td>{a.ime} {a.prezime}</td>
                  <td>{a.status}</td>
                  <td>{a.datumRodjenja}</td>
                  <td>{a.brojOsvojenihNagrada}</td>
                  {/* Prikaz novog polja u tabeli */}
                  <td>{Number(a.brojProdatihPrimeraka || 0).toLocaleString()}</td>
                  <td>{a.kontaktTelefonMenadzera || "/"}</td> 
                  <td className="actions-cell">
                    <button className="edit-btn" onClick={() => { 
                      setEditingId(a.id); 
                      setFormData({ 
                        ime: a.ime || "", 
                        prezime: a.prezime || "", 
                        status: a.status || "", 
                        datumRodjenja: a.datumRodjenja || "", 
                        brojOsvojenihNagrada: a.brojOsvojenihNagrada || 0, 
                        brojProdatihPrimeraka: a.brojProdatihPrimeraka || 0, 
                        kontaktTelefonMenadzera: a.kontaktTelefonMenadzera || "", 
                        biografija: a.biografija || "", 
                        slike: Array.isArray(a.slike) ? a.slike[0] : (a.slike || "") 
                      }); 
                    }}>Измени</button>
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
            <button onClick={handleDelete}>Да</button>
            <button onClick={() => { setShowModal(false); setSelectedId(null); }}>Не</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAuthors;