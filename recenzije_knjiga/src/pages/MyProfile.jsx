import React, { useState } from "react";
import "./MyProfile.css";
import MyReviews from "../components/MyReviews";
import User from "../assets/user.png";
const MyProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const user = {
    ime: "Ана",
    prezime: "Петровић",
    email: "ana@email.com",
    adresa: "Бања Лука",
    zanimanje: "Студент",
    datumRodjenja: "12.05.2002.",
    avatar: User,
  };

  return (
    <main className="profile-page">
      <section className="profile-shell">
        <aside className="profile-side">
          <img src={user.avatar} alt="Корисник" className="side-avatar" />

          <h2>{user.ime} {user.prezime}</h2>
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
              onClick={() => setActiveTab("reviews")}
            >
              Оцене
            </button>
          </nav>
        </aside>

        <section className="profile-main">
          <div className="profile-heading">
            <p>Кориснички профил</p>
            <h1>{user.ime} {user.prezime}</h1>
          </div>

          <div className="profile-divider"></div>

          <div className="profile-content-holder">
            {activeTab === "profile" && (
              <section className="profile-info-box slide-card">
                <h2>Основни подаци</h2>

                <div className="profile-info-grid">
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
            
          </div>
        </section>
      </section>
    </main>
  );
};

export default MyProfile;