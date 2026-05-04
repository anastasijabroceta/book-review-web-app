import React from "react";
import { Link } from "react-router-dom";

const MyReviews = () => {
  const reviews = [
    {
      id: 1,
      tekst: "Књига је веома занимљива, емотивна и оставља снажан утисак.",
      bookId: 1,
      bookTitle: "Ана Карењина",
    },
    {
      id: 2,
      tekst: "Тежак, али изузетно квалитетан роман.",
      bookId: 2,
      bookTitle: "Злочин и казна",
    },
  ];

  return (
    <div className="slide-card">
      <h2>Моје рецензије</h2>

      {reviews.map((review) => (
        <article key={review.id} className="review-item">
          <p>„{review.tekst}”</p>

          <Link to={`/book/${review.bookId}`}>
            Погледај књигу: {review.bookTitle}
          </Link>
        </article>
      ))}
    </div>
  );
};

export default MyReviews;