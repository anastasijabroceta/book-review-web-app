import React from 'react';
import './AuthorStats.css';

const AuthorStats = () => {
  return (
    <div className="stats-full-width">
      <div className="stats-content">
        <div className="stat-item">
          <span className="stat-number">500+</span>
          <span className="stat-desc">Аутора у бази</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">1200+</span>
          <span className="stat-desc">Објављених рецензија</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">30+</span>
          <span className="stat-desc">Књижевних награда</span>
        </div>
      </div>
    </div>
  );
};

export default AuthorStats;