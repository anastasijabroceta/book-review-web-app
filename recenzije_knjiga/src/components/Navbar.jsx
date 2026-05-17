import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";

function Navbar({ onLoginClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="nav-wrapper">
      <nav className="custom-navbar">
        <div className="nav-left">
          <img src={logo} alt="Књигоказ" className="logo-img" />
        </div>

        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div className={`nav-center ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={closeMenu}>
            <button className="nav-btn">Почетна</button>
          </Link>

          <Link to="/books" onClick={closeMenu}>
            <button className="nav-btn">Књиге</button>
          </Link>

          <Link to="/authors" onClick={closeMenu}>
            <button className="nav-btn">Аутори</button>
          </Link>

          <Link to="/admin" onClick={closeMenu}>
            <button className="nav-btn">Администратор</button>
          </Link>

          <Link to="/my-profile" onClick={closeMenu}>
            <button className="nav-btn">Мој профил</button>
          </Link>

          <button
            className="login-btn mobile-login"
            onClick={() => {
              onLoginClick();
              closeMenu();
            }}
          >
            Пријава
          </button>
        </div>

        <div className="nav-right">
          <button className="login-btn" onClick={onLoginClick}>
            Пријава
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;