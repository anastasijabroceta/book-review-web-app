import React from "react";
import "./FamousBooks.css";
import MaliPrinc from "../assets/mali_princ.jpg";
import ZlocinIKazna from "../assets/zlocin_i_kazna.jpg";
import Image1984 from "../assets/1984.jpg";

const FamousBooks = () => {
  return (
    <section className="famous-books">
      <div className="frame">
        <div className="famous-books-heading">
          <p className="famous-books-label">Књижевни класици</p>
          <h2 className="famous-books-title">
            Познате књиге које и даље живе кроз читаоце
          </h2>
          <p className="famous-books-subtitle">
            Издвојени наслови, кратке рецензије и цитати који су обележили
            књижевност.
          </p>
        </div>

        <div className="famous-book-row">
          <div className="famous-book-side">
            <div className="famous-book-card">
              <img src={MaliPrinc} alt="Мали принц" className="famous-book-cover" />
              <div className="famous-book-content">
                <span className="famous-book-tag">Класик</span>
                <h3 className="famous-book-title">Мали принц</h3>
                <p className="famous-book-author">Антуан де Сент-Екзупери</p>
              </div>
            </div>

            <div className="famous-quote quote-one">
              <p>„Човек само срцем добро види. Суштина се очима не да сагледати.”</p>
            </div>
          </div>

          <div className="famous-review-card">
            <p className="review-label">Издвојена рецензија</p>
            <h3>Дубока филозофска књига о љубави, пријатељству и смислу живота</h3>
            <p>
              Наизглед дечја прича о дечаку са друге планете, али заправо дубока
              филозофска књига о љубави, пријатељству и смислу живота. Једноставна
              форма скрива слојевиту симболику која погађа и децу и одрасле.
            </p>
          </div>
        </div>

        <div className="famous-book-row reverse">
          <div className="famous-book-side">
            <div className="famous-book-card">
              <img src={ZlocinIKazna} alt="Злочин и казна" className="famous-book-cover" />
              <div className="famous-book-content">
                <span className="famous-book-tag">Обавезно штиво</span>
                <h3 className="famous-book-title">Злочин и казна</h3>
                <p className="famous-book-author">Федор Достојевски</p>
              </div>
            </div>

            <div className="famous-quote quote-two">
              <p>„Човек је тајна. Треба је одгонетнути.”</p>
            </div>
          </div>

          <div className="famous-review-card">
            <p className="review-label">Издвојена рецензија</p>
            <h3>Психолошки роман о кривици, савести и унутрашњем паду човека</h3>
            <p>
              Психолошки роман о студенту Раскољникову који почини убиство
              верујући да има морално право на то. Књига истражује кривицу,
              савест и искупљење, и сматра се једним од најдубљих романа о
              људској психологији.
            </p>
          </div>
        </div>

        <div className="famous-book-row">
          <div className="famous-book-side">
            <div className="famous-book-card">
              <img src={Image1984} alt="1984" className="famous-book-cover" />
              <div className="famous-book-content">
                <span className="famous-book-tag">Дистопија</span>
                <h3 className="famous-book-title">1984</h3>
                <p className="famous-book-author">Џорџ Орвел</p>
              </div>
            </div>

            <div className="famous-quote quote-three">
              <p>„Рат је мир. Слобода је ропство. Незнање је моћ.”</p>
            </div>
          </div>

          <div className="famous-review-card">
            <p className="review-label">Издвојена рецензија</p>
            <h3>Визија света у коме надзор, страх и језик обликују стварност</h3>
            <p>
              Дистопијски роман о тоталитарној држави где је све под надзором.
              Појмови попут „Велики брат” и „новоговор” постали су део
              свакодневног језика.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamousBooks;