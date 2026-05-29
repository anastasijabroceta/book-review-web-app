import React, { useEffect, useState } from "react";
import "./MyProfile.css";
import MyReviews from "../components/MyReviews";
import MyRatings from "../components/MyRatings";
import User from "../assets/user.png";
import { ref, get } from "firebase/database";
import { db } from "../firebase";

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const handleLogout = () => {
  localStorage.removeItem("ulogovaniKorisnikId");
  localStorage.removeItem("ulogovaniKorisnickoIme");

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

        const snapshot = await get(ref(db, `korisnici/${korisnikId}`));

        if (snapshot.exists()) {
          setUser({
            id: korisnikId,
            avatar: User,
            ...snapshot.val(),
          });
        } else {
          setUser(null);
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

            {activeTab === "reviews" && <MyReviews />}
            {activeTab === "ratings" && <MyRatings />}
          </div>
        <div className="logout-divider">
  <button
    className="logout-button"
    onClick={handleLogout}
  >
    Одјави се
  </button>
</div>
        </section>
        
        
      </section>
    </main>
  );
};

export default MyProfile;