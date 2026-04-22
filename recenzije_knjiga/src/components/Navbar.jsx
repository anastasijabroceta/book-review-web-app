import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";

function Navbar() {
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
          <button className="nav-btn">Рецензије</button>
          </Link>
          <button className="nav-btn">О нама</button>
        </div>

        <div className="nav-right">
          <button className="login-btn"><p>Пријава</p></button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;