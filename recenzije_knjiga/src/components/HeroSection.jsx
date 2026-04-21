import "./HeroSection.css";
import heroBooks from "../assets/hero-books.jpg";

const HeroSection = () => {
  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${heroBooks})` }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <p className="hero-subtitle">Добро дошли у Књигоказ</p>
        <h1 className="hero-title">
          Откриј књиге, ауторе и
          <br />
          рецензије које инспиришу
        </h1>
        <p className="hero-text">
          Истражи каталог, пронађи омиљене писце и сачувај своје утиске на једном месту.
        </p>

        <div className="hero-buttons">
          <button className="hero-btn primary-btn">Претражи књиге</button>
          <button className="hero-btn secondary-btn">Погледај рецензије</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;