import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyRatings.css";
import { ref, get } from "firebase/database";
import { db } from "../firebase"; 

const MyRatings = ({ korisnikId }) => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRatings = async () => {
      try {
        const ratingsSnapshot = await get(ref(db, "ocene"));
        const authorsSnapshot = await get(ref(db, "autori"));

        if (ratingsSnapshot.exists()) {
          const ratingsData = ratingsSnapshot.val();
          const authorsData = authorsSnapshot.exists() ? authorsSnapshot.val() : {};

          const filteredRatings = Object.keys(ratingsData)
            .map((key) => {
              const ratingItem = ratingsData[key];
              const author = authorsData[ratingItem.idAutora]; 

              return {
                id: key,
                ...ratingItem,
                authorName: author ? `${author.ime} ${author.prezime}` : "Непознат аутор",
              };
            })
            .filter((rating) => String(rating.idKorisnika) === String(korisnikId));

          setRatings(filteredRatings);
        } else {
          setRatings([]);
        }
      } catch (error) {
        console.log("Greška pri učitavanju ocena autora:", error);
      } finally {
        setLoading(false);
      }
    };

    if (korisnikId) {
      fetchMyRatings();
    }
  }, [korisnikId]);

  const formatirajDatum = (izvorniDatum) => {
    if (!izvorniDatum) return "";
    const delovi = izvorniDatum.split("-");
    if (delovi.length !== 3) return izvorniDatum; 
    return `${delovi[2]}. ${delovi[1]}. ${delovi[0]}.`;
  };

  if (loading) {
    return <p>Учитавање оцена...</p>;
  }

  return (
    <div className="slide-card">
      <h2>Моје оцене аутора</h2>

      {ratings.length === 0 ? (
        <p>Још увек нисте оценили ниједног аутора.</p>
      ) : (
        ratings.map((rating) => {
          const ocenaBroj = Number(rating.vrednost || 0); 
          
          return (
            <div key={rating.id} className="rating-item">
              <div className="rating-info">
                <Link to={`/author/${rating.idAutora}`} className="rating-author-link">
                  {rating.authorName}
                </Link>
                {rating.datum && (
                  <span className="rating-date">
                    Датум: {formatirajDatum(rating.datum)}
                  </span>
                )}
              </div>

              <span className="rating-stars">
                {"★".repeat(ocenaBroj)}
                {"☆".repeat(5 - ocenaBroj)}
              </span>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyRatings;