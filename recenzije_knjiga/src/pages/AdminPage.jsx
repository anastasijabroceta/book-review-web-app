import React, { useState } from "react";
import AdminBooks from "./AdminBooks";
import AdminAuthors from "./AdminAuthors";
import "./AdminPage.css";
import adminHeroImg from "../assets/hero-admin.jpg"; 

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("books");

  return (
    <div className="admin-page-wrapper">
      <div 
        className="admin-hero-banner" 
        style={{ backgroundImage: `url(${adminHeroImg})` }}
      >
        <div className="admin-hero-overlay">
          <div className="admin-hero-content">
            <span className="admin-subtitle-text">Администраторски панел</span>
            <h1 className="admin-main-title-text">
              {activeTab === "books" ? "Управљање књигама" : "Управљање ауторима"}
            </h1>
          </div>
        </div>
      </div>

      <div className="admin-nav-container">
        <div className="admin-tabs-box">
          <button 
            className={`admin-tab-btn ${activeTab === "books" ? "active" : ""}`}
            onClick={() => setActiveTab("books")}
          >
            Управљање књигама
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === "authors" ? "active" : ""}`}
            onClick={() => setActiveTab("authors")}
          >
            Управљање ауторима
          </button>
        </div>
      </div>

      <div className="admin-main-content">
        <div className="admin-description-wrapper">
          <p className="admin-description-text">
            {activeTab === "books" 
              ? "Додавање, измена и преглед свих књига у нашој дигиталној библиотеци."
              : "Ажурирајте податке о писцима, њихове биографије и статус активности."}
          </p>
        </div>
        {activeTab === "books" ? <AdminBooks /> : <AdminAuthors />}
      </div>
    </div>
  );
};

export default AdminPage;