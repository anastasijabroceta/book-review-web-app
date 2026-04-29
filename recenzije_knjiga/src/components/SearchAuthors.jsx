import React from 'react';
import './SearchAuthors.css';

const SearchAuthors = () => {
  return (
    <section className="search-tool-section">
      <h1 className="section-title">Сви наши аутори</h1>
      <div className="search-width-control"> 
        <div className="search-container">
          <div className="search-group">
            <label>Претрага по имену</label>
            <input 
              type="text" 
              placeholder="Унесите име аутора..." 
              className="search-input" 
            />
          </div>

          <div className="search-group">
            <label>Претрага по статусу</label>
            <select className="search-select">
              <option value="">Сви статуси</option>
              <option value="aktivan">Активан</option>
              <option value="penzija">У пензији</option>
              <option value="preminuo">Преминуо</option>
            </select>
          </div>

          <button className="search-btn-action">Претражи</button>
        </div>
      </div>
    </section>
  );
};

export default SearchAuthors;