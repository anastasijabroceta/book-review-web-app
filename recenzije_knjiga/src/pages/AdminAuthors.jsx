import React, { useState, useEffect } from "react";
import "./AdminBooks.css"; 
import { ref, get, push, update, remove } from "firebase/database"; 
import { db } from "../firebase"; 

const emptyForm = {
  ime: "", 
  prezime: "", 
  status: "Активан", 
  datumRodjenja: "", 
  brojOsvojenihNagrada: "", 
  brojProdatihPrimeraka: "", 
  kontaktTelefonMenadzera: "", 
  biografija: "", 
  slike: "" 
};

const AdminAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(""); 
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthors();
  }, []);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+381 \d{2} \d{2,3}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const validateCyrillicName = (name) => {
    const cyrillicRegex = /^[А-ШЂЈЉЊЋЏа-шђјљњћџ][а-шђјљњћџА-ШЂЈЉЊЋЏа-шђјљњћџ\s-]+$/;
    return cyrillicRegex.test(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCyrillicName(formData.ime.trim())) {
      setError("Име мора бити написано ћирилицом, почети великим словом и садржати само слова.");
      return;
    }

    if (!validateCyrillicName(formData.prezime.trim())) {
      setError("Презиме мора бити написано ћирилицом, почети великим словом и садржати само слова.");
      return;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(formData.datumRodjenja)) {
      setError("Датум рођења мора бити у формату ГГГГ-ММ-ДД (нпр. 1950-05-25).");
      return;
    }

    if (Number(formData.brojOsvojenihNagrada) < 0) {
      setError("Број освојених награда не може бити негативан број.");
      return;
    }
    if (Number(formData.brojProdatihPrimeraka) < 0) {
      setError("Број продатих примерака не може бити негативан број.");
      return;
    }

    if (formData.kontaktTelefonMenadzera && !validatePhone(formData.kontaktTelefonMenadzera)) {
      setError("Формат телефона мора бити: +381 XX XXX-XXXX (нпр. +381 64 123-4567).");
      return;
    }

    if (!formData.biografija.trim()) {
      setError("Биографија аутора је обавезна.");
      return;
    }

    try {
      setError("");

      const authorData = {
        ime: formData.ime.trim(),
        prezime: formData.prezime.trim(),
        status: formData.status,
        datumRodjenja: formData.datumRodjenja,
        brojOsvojenihNagrada: Number(formData.brojOsvojenihNagrada || 0),
        brojProdatihPrimeraka: Number(formData.brojProdatihPrimeraka || 0),
        kontaktTelefonMenadzera: formData.kontaktTelefonMenadzera,
        biografija: formData.biografija.trim(),
        slike: formData.slike ? [formData.slike.trim()] : [""]
      };

      if (editingId) {
        await update(ref(db, `autori/${editingId}`), authorData);
        setEditingId(null);
      } else {
        await push(ref(db, "autori"), authorData);
      }
      
      setFormData(emptyForm);
      fetchAuthors();
    } catch (error) {
      console.log("Greška pri čuvanju podataka:", error);
      setError("Дошло је до грешке при чувању аутора.");
    }
  };

  const handleEdit = (author) => {
    setEditingId(author.id);
    setFormData({
      ime: author.ime || "",
      prezime: author.prezime || "",
      status: author.status || "Активан",
      datumRodjenja: author.datumRodjenja || "",
      brojOsvojenihNagrada: author.brojOsvojenihNagrada || "",
      brojProdatihPrimeraka: author.brojProdatihPrimeraka || "",
      kontaktTelefonMenadzera: author.kontaktTelefonMenadzera || "",
      biografija: author.biografija || "",
      slike: Array.isArray(author.slike) ? author.slike[0] : (author.slike || "")
    });
    setError("");
  };

  const handleDelete = async (id) => {
    try {
      await remove(ref(db, `autori/${id}`));
      setShowModal(false);
      setSelectedId(null);
      setEditingId(null);
      setFormData(emptyForm);
      fetchAuthors(); 
    } catch (error) {
      console.log("Greška pri brisanju autora:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
  };

  if (loading) {
    return <p className="loading-text">Учитавање административног панела...</p>;
  }

  return (
    <>
      <section className="admin-books-page">
        <div className="admin-books-container">
          <div className="admin-books-form-card">
            <h2>{editingId ? "Измени аутора" : "Додај новог аутора"}</h2>
            
            <form className="admin-books-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <input 
                  type="text" 
                  name="ime"
                  placeholder="Име (Ћирилица, велико слово)" 
                  value={formData.ime} 
                  onChange={handleChange} 
                  required 
                />
                <input 
                  type="text" 
                  name="prezime"
                  placeholder="Презиме (Ћирилица, велико слово)" 
                  value={formData.prezime} 
                  onChange={handleChange} 
                  required 
                />
                
                <select 
                  name="status"
                  value={formData.status} 
                  onChange={handleChange} 
                  required
                >
                  <option value="Активан">Активан</option>
                  <option value="У пензији">У пензији</option>
                  <option value="Преминуо">Преминуо</option>
                </select>

                <input 
                  type="text" 
                  name="datumRodjenja"
                  placeholder="Датум рођења (ГГГГ-ММ-ДД)" 
                  value={formData.datumRodjenja} 
                  onChange={handleChange} 
                  required 
                />
                <input 
                  type="number" 
                  name="brojOsvojenihNagrada"
                  placeholder="Број награда" 
                  value={formData.brojOsvojenihNagrada} 
                  onChange={handleChange} 
                  required 
                />
                <input 
                  type="number" 
                  name="brojProdatihPrimeraka"
                  placeholder="Број продатих примерака" 
                  value={formData.brojProdatihPrimeraka} 
                  onChange={handleChange} 
                  required 
                />
                <input 
                  type="text" 
                  name="kontaktTelefonMenadzera"
                  placeholder="Телефон менаџера" 
                  value={formData.kontaktTelefonMenadzera} 
                  onChange={handleChange} 
                  required
                />
                <input 
                  type="text" 
                  name="slike"
                  placeholder="Линк до слике аутора (URL)" 
                  value={formData.slike} 
                  onChange={handleChange} 
                />
              
                <textarea 
                  name="biografija"
                  placeholder="Биографија аутора..." 
                  value={formData.biografija} 
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <p className="form-error">{error}</p>}

              <div className="form-actions">
                <button type="submit" className="featured-more-btn-admin">
                  {editingId ? "Сачувај измене" : "Додај аутора"}
                </button>
                {editingId && (
                  <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
                    Откажи
                  </button>
                )}
              </div>
            </form>
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
                      <td>{Number(a.brojProdatihPrimeraka || 0).toLocaleString()}</td>
                      <td>{a.kontaktTelefonMenadzera || "/"}</td> 
                      <td className="actions-cell">
                        <button className="edit-btn" onClick={() => handleEdit(a)}>
                          Измени
                        </button>
                        <button className="delete-btn" onClick={() => { setSelectedId(a.id); setShowModal(true); }}>
                          Обриши
                        </button>
                      </td>
                    </tr>
                  ))}
                  {authors.length === 0 && (
                    <tr>
                      <td colSpan="7">Нема аутора у бази.</td>
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
            <p>Да ли сте сигурни да желите да обришете аутора?</p>
            <button onClick={() => handleDelete(selectedId)}>Да</button>
            <button onClick={() => { setShowModal(false); setSelectedId(null); }}>Не</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminAuthors;