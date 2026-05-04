import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";
import MyProfile from "../pages/MyProfile";
function Navbar({ onLoginClick }) {
  return (
    <div className="nav-wrapper">
      <nav className="custom-navbar">
        <div className="nav-left">
          <img src={logo} alt="Књигоказ" className="logo-img" />
        </div>

        <div className="nav-center">
          <Link to="/">
            <button className="nav-btn">Почетна</button>
          </Link>

          <Link to="/authors">
            <button className="nav-btn">Аутори</button>
          </Link>

          <Link to="/books">
            <button className="nav-btn">Књиге</button>
          </Link>

          <Link to="/admin">
            <button className="nav-btn">Администратор</button>
          </Link>
          <Link to="/my-profile">
            <button className="nav-btn">Мој профил</button>
          </Link>
        </div>

        <div className="nav-right">
          <button className="login-btn" onClick={onLoginClick}>
            <p>Пријава</p>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;