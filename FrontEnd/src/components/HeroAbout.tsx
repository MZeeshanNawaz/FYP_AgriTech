import React from "react";
import CurvyEdge from "./CurvyEdge"; 

const HeroAbout = () => {
  return (
    <header className="hero hero-section position-relative">
      <div className="hero-overlay" />
      <div className="container hero-content text-center text-white">
        <small className="text-uppercase breadcrumb">Home / About</small>
        <h1 className="display-5 fw-bold">About Us</h1>
      </div>

      <CurvyEdge color="#fff" />
    </header>
  );
};

export default HeroAbout;
