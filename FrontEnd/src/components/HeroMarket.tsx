import React from "react";
import CurvyEdge from "./CurvyEdge";

const HeroMarket = () => {
  return (
    <header className="hero hero-section position-relative">
      <div className="hero-overlay" />
      <div className="container hero-content text-center text-white">
        <small className="text-uppercase breadcrumb">Home / Marketplace</small>
        <h1 className="display-5 fw-bold">Marketplace</h1>
      </div>

      <CurvyEdge color="#fff" />
    </header>
  );
};

export default HeroMarket;
