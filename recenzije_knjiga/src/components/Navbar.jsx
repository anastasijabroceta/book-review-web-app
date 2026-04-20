import logo from "../assets/logo.png";
function Navbar() {
  return (
    <div className="nav-wrapper">
  <nav className="custom-navbar">
    <div className="nav-left">
      <img src={logo} alt="Књигоказ" className="logo-img" />
    </div>

    <div className="nav-center">
      <button className="nav-btn">Каталог</button>
      <button className="nav-btn">Аутори</button>
      <button className="nav-btn">Рецензије</button>
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