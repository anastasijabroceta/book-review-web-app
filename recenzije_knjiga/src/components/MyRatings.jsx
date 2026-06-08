import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ref, get } from "firebase/database"; // Uvozimo Firebase funkcije za čitanje podataka
import { db } from "../firebase"; // Uvozimo konekciju sa našom bazom

const MyRatings = ({ korisnikId }) => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRatings = async () => {
      try {
        // 1. Povlačimo sve ocene i sve autore iz Firebase-a istovremeno
        const ratingsSnapshot = await get(ref(db, "ocene"));
        const authorsSnapshot = await get(ref(db, "autori"));

        if (ratingsSnapshot.exists()) {
          const ratingsData = ratingsSnapshot.val();
          const authorsData = authorsSnapshot.exists() ? authorsSnapshot.val() : {};

          // 2. Prolazimo kroz sve ocene iz baze, spajamo ih sa autorima i filtriramo
          const filteredRatings = Object.keys(ratingsData)
            .map((key) => {
              const ratingItem = ratingsData[key];
              const author = authorsData[ratingItem.idAutora]; // Spajanje preko ID-ja autora

              return {
                id: key,
                ...ratingItem,
                // Ako autor postoji u bazi spajamo ime i prezime, u suprotnom ispisujemo default tekst
                authorName: author ? `${author.ime} ${author.prezime}` : "Непознат аутор",
              };
            })
            // Ključni korak: zadržavamo samo ocene trenutno ulogovanog korisnika
            .filter((rating) => rating.idKorisnika === korisnikId);

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

  // Pomoćna funkcija za lepši prikaz datuma
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
          // ISPRAVLJENO: Koristimo rating.vrednost jer se tako ključ zove u vašem JSON-u
          const ocenaBroj = Number(rating.vrednost || 0); 
          
          return (
            <div key={rating.id} className="rating-item" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #eee1d2" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <Link to={`/author/${rating.idAutora}`} style={{ color: "#4f3929", textDecoration: "none", fontWeight: "bold" }}>
                  {rating.authorName}
                </Link>
                {rating.datum && (
                  <span style={{ fontSize: "12px", color: "#a08c7c" }}>
                    Датум: {formatirajDatum(rating.datum)}
                  </span>
                )}
              </div>

              {/* Iscrtavanje zlatnih zvezdica na osnovu tačne vrednosti iz baze */}
              <span style={{ color: "#ffb400", letterSpacing: "2px", fontSize: "18px" }}>
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