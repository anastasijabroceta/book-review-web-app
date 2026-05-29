import React, { useEffect, useState } from "react";
import "./LoginModal.css";
import { ref, get } from "firebase/database";
import { db } from "../firebase";

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
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

    try {
      const snapshot = await get(ref(db, "korisnici"));

      if (!snapshot.exists()) {
        setErrorMessage("Нема регистрованих корисника.");
        return;
      }

      const korisnici = snapshot.val();

      const pronadjeniKorisnik = Object.entries(korisnici).find(
        ([id, korisnik]) =>
          korisnik.korisnickoIme === korisnickoIme &&
          korisnik.lozinka === lozinka
      );

      if (!pronadjeniKorisnik) {
        setErrorMessage("Погрешно корисничко име или лозинка.");
        return;
      }

      const [korisnikId, korisnikPodaci] = pronadjeniKorisnik;

      localStorage.setItem("ulogovaniKorisnikId", korisnikId);
      localStorage.setItem(
        "ulogovaniKorisnickoIme",
        korisnikPodaci.korisnickoIme
      );

      onClose();
      window.location.reload();
    } catch (error) {
      console.log("Грешка при пријави:", error);
      setErrorMessage("Дошло је до грешке при пријави.");
    }
  };

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>Пријава</h2>

        {errorMessage && (
          <div className="custom-error-popup">
            <span>{errorMessage}</span>

            <button
              type="button"
              onClick={() => setErrorMessage("")}
            >
              ✕
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
            Пријави се
          </button>

          <button
            type="button"
            className="login-close-btn"
            onClick={onClose}
          >
            Затвори
          </button>

          <div className="register">
            <p>
              Немате профил?{" "}
              <span
                className="register-link"
                onClick={onSwitchToRegister}
              >
                Региструјте се
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;