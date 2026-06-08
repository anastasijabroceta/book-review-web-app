import React, { useEffect, useState } from "react";
import "./MyProfile.css";
import MyRatings from "../components/MyRatings";
import User from "../assets/user.png";
import { ref, get } from "firebase/database";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [myReviews, setMyReviews] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("ulogovaniKorisnikId");
    localStorage.removeItem("ulogovaniKorisnickoIme");
    // Dodajemo i ove za svaki slučaj ako smo ih postavili na drugim stranicama
    localStorage.removeItem("ulogovaniKorisnik");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  useEffect(() => {
    const fetchLoggedUser = async () => {
      try {
        const korisnikId = localStorage.getItem("ulogovaniKorisnikId");

        if (!korisnikId) {
          setUser(null);
          return;
        }

        const userSnapshot = await get(ref(db, `korisnici/${korisnikId}`));

        if (userSnapshot.exists()) {
          setUser({
            id: korisnikId,
            avatar: User,
            ...userSnapshot.val(),
          });
        } else {
          setUser(null);
          return;
        }

        const reviewsSnapshot = await get(ref(db, "recenzije"));
        const booksSnapshot = await get(ref(db, "knjige"));

        if (reviewsSnapshot.exists()) {
          const reviewsData = reviewsSnapshot.val();
          const booksData = booksSnapshot.exists() ? booksSnapshot.val() : {};

          const reviewsArray = Object.keys(reviewsData)
            .map((key) => {
              const review = reviewsData[key];
              const book = booksData[review.idKnjige];

              return {
                id: key,
                ...review,
                nazivKnjige: book ? book.naziv : "Непозната књига",
                slikaKnjige: book?.slike?.[0],
              };
            })
            .filter((review) => review.idKorisnika === korisnikId);

          setMyReviews(reviewsArray);
        } else {
          setMyReviews([]);
        }
      } catch (error) {
        console.log("Greška pri učitavanju korisnika:", error);
      }
    };

    fetchLoggedUser();
  }, []);

  if (!user) {
    return (
      <main className="profile-page">
        <section className="profile-shell">
          <section className="profile-main">
            <div className="profile-heading">
              <p>Кориснички профил</p>
              <h1>Нисте пријављени</h1>
            </div>
          </section>
        </section>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <section className="profile-shell">
        <aside className="profile-side">
          <img src={user.avatar} alt="Корисник" className="side-avatar" />

          <h2>
            {user.ime} {user.prezime}
          </h2>
          <p>{user.email}</p>

          <nav className="side-menu">
            <button
              className={activeTab === "profile" ? "active" : ""}
              onClick={() => setActiveTab("profile")}
            >
              Профил
            </button>

            <button
              className={activeTab === "reviews" ? "active" : ""}
              onClick={() => setActiveTab("reviews")}
            >
              Рецензије
            </button>

            <button
              className={activeTab === "ratings" ? "active" : ""}
              onClick={() => setActiveTab("ratings")}
            >
              Оцене
            </button>
          </nav>
        </aside>

        <section className="profile-main">
          <div className="profile-heading">
            <p>Кориснички профил</p>
            <h1>
              {user.ime} {user.prezime}
            </h1>
          </div>

          <div className="profile-divider"></div>

          <div className="profile-content-holder">
            {activeTab === "profile" && (
              <section className="profile-info-box slide-card">
                <h2>Основни подаци</h2>

                <div className="profile-info-grid">
                  <div>
                    <span>Корисничко име</span>
                    <p>{user.korisnickoIme}</p>
                  </div>

                  <div>
                    <span>Email</span>
                    <p>{user.email}</p>
                  </div>

                  <div>
                    <span>Адреса</span>
                    <p>{user.adresa}</p>
                  </div>

                  <div>
                    <span>Занимање</span>
                    <p>{user.zanimanje}</p>
                  </div>

                  <div>
                    <span>Датум рођења</span>
                    <p>{user.datumRodjenja}</p>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "reviews" && (
              <section className="profile-info-box slide-card">
                <h2>Моје рецензије</h2>

                {myReviews.length === 0 ? (
                  <p>Још увек нисте оставили ниједну рецензију.</p>
                ) : (
                  <div className="my-reviews-list">
                    {myReviews.map((review) => (
                      <div className="my-review-card" key={review.id}>
                        {review.slikaKnjige && (
                          <img
                            src={review.slikaKnjige}
                            alt={review.nazivKnjige}
                            className="my-review-book-img"
                          />
                        )}

                        <div>
                          <h3>{review.nazivKnjige}</h3>
                          <p>{review.tekst}</p>

                          {review.datum && (
                            <span>Датум: {review.datum}</span>
                          )}

                          <br />

                          <Link to={`/book/${review.idKnjige}`}>
                            Погледај књигу
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {activeTab === "ratings" && <MyRatings korisnikId={user.id} />}
          </div>

          <div className="logout-divider">
            <button className="logout-button" onClick={handleLogout}>
              Одјави се
            </button>
          </div>
        </section>
      </section>
    </main>
  );
};

export default MyProfile;