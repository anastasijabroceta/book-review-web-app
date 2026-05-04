import React from "react";
import { Link } from "react-router-dom";

const MyRatings = () => {
  const ratings = [
    { id: 1, authorId: 1, authorName: "Меша Селимовић", stars: 5 },
    { id: 2, authorId: 2, authorName: "Иво Андрић", stars: 4 },
  ];

  return (
    <div className="slide-card">
      <h2>Моје оцене</h2>

      {ratings.map((rating) => (
        <article key={rating.id} className="rating-item">
          <Link to={`/author/${rating.authorId}`}>
            {rating.authorName}
          </Link>

          <span>
            {"★".repeat(rating.stars)}
            {"☆".repeat(5 - rating.stars)}
          </span>
        </article>
      ))}
    </div>
  );
};

export default MyRatings;