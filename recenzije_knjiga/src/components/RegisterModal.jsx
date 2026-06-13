import React, { useEffect, useState } from "react";
import "./LoginModal.css";
import { ref, get, set } from "firebase/database";
import { db } from "../firebase";

const RegisterModal = ({ isOpen, onClose }) => {
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [email, setEmail] = useState("");
  const [datumRodjenja, setDatumRodjenja] = useState("");
  const [adresa, setAdresa] = useState("");
  const [zanimanje, setZanimanje] = useState("");
  const [korisnickoIme, setKorisnickoIme] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrorMessage("Унесите исправан email.");
      return;
    }

    if (lozinka.length < 6) {
      setErrorMessage("Лозинка мора имати најмање 6 карактера.");
      return;
    }

    try {
      const snapshot = await get(ref(db, "korisnici"));
      const korisnici = snapshot.exists() ? snapshot.val() : {};

      const korisniciArray = Object.values(korisnici);

      const emailPostoji = korisniciArray.some(
        (korisnik) => korisnik.email === email
      );

      const korisnickoImePostoji = korisniciArray.some(
        (korisnik) => korisnik.korisnickoIme === korisnickoIme
      );

      if (emailPostoji) {
        setErrorMessage("Корисник са овим email-ом већ постоји.");
        return;
      }

      if (korisnickoImePostoji) {
        setErrorMessage("Корисничко име је већ заузето.");
        return;
      }

      const noviBroj = Object.keys(korisnici).length + 1;
      const noviId = `kor${String(noviBroj).padStart(3, "0")}`;

      const noviKorisnik = {
        adresa,
        datumRodjenja,
        email,
        ime,
        korisnickoIme,
        lozinka,
        prezime,
        zanimanje,
      };

      await set(ref(db, `korisnici/${noviId}`), noviKorisnik);

      localStorage.setItem("ulogovaniKorisnikId", noviId);
      localStorage.setItem("ulogovaniKorisnickoIme", korisnickoIme);

      setErrorMessage("Успешна регистрација!");
      onClose();
      window.location.reload();
    } catch (error) {
      console.log("Грешка при регистрацији:", error);
      setErrorMessage("Дошло је до грешке при регистрацији.");
    }
  };

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>Регистрација</h2>

        {errorMessage && (
          <div className="custom-error-popup">
            <span>{errorMessage}</span>
            <button type="button" onClick={() => setErrorMessage("")}>✕</button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Име"
            value={ime}
            onChange={(e) => setIme(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Презиме"
            value={prezime}
            onChange={(e) => setPrezime(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="date"
            value={datumRodjenja}
            onChange={(e) => setDatumRodjenja(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Адреса"
            value={adresa}
            onChange={(e) => setAdresa(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Занимање"
            value={zanimanje}
            onChange={(e) => setZanimanje(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Корисничко име"
            value={korisnickoIme}
            onChange={(e) => setKorisnickoIme(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Лозинка"
            value={lozinka}
            onChange={(e) => setLozinka(e.target.value)}
            required
          />

          <button type="submit" className="login-submit-btn">
            Региструј се
          </button>

          <button
            type="button"
            className="login-close-btn"
            onClick={onClose}
          >
            Затвори
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;