import React from 'react';
import './SearchAuthors.css';

const SearchAuthors = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => {
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="search-group">
            <label>Претрага по статусу</label>
            <select 
              className="search-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Сви статуси</option>
              <option value="Активан">Активан</option>
              <option value="У пензији">У пензији</option>
              <option value="Преминуо">Преминуо</option>
            </select>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SearchAuthors;