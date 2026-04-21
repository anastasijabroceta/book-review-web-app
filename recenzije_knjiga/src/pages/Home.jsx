import React from "react";
import HeroSection from "../components/HeroSection";
import FamousBooks from "../components/FamousBooks";
import ScrollReveal from "../components/ScrollReveal";
import RecommendedBooks from "../components/RecommendedBooks";


const Home = () => {
  return (
    <>
      <HeroSection />
      <RecommendedBooks />
      <FamousBooks />
    </>
  );
};

export default Home;