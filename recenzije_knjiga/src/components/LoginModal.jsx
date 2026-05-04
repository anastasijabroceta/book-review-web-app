import React, { useEffect } from "react";
import "./LoginModal.css";

const LoginModal = ({isOpen, onClose, onSwitchToRegister}) => {

  // Sprečava skrolovanje pozadine kada je modal otvoren
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
    console.log("Kliknuta prijava");
  };

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>Пријава</h2>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Корисничко име" required />
          <input type="password" placeholder="Лозинка" required />

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