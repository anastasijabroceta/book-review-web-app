import React, { useEffect } from "react";
import "./LoginModal.css";

const RegisterModal = ({ isOpen, onClose }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registracija");
  };

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>Регистрација</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Име" required />
          <input type="text" placeholder="Презиме" required />
          <input type="email" placeholder="Email" required />
          <input type="date" placeholder="Датум рођења" required />
          <input type="text" placeholder="Адреса" required />
          <input type="text" placeholder="Занимање" required />

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