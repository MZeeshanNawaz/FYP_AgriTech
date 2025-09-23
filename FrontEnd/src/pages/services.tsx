import React from "react";
import CurvyEdge from "../components/CurvyEdge";

const Services = () => {
  return (
    <div className="services-page">
      <header className="hero hero-section position-relative">
        <div className="hero-overlay" />
        <div className="container hero-content text-center text-white">
          <small className="text-uppercase breadcrumb">Home / Services</small>
          <h1 className="display-5 fw-bold">Our Services</h1>
        </div>

        <CurvyEdge color="#fff" />
      </header>

      {/* Services Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="text-success">🌾 Our Services</h6>
            <h2 className="fw-bold">
              Empowering farmers through smart, AI-driven <br />
              agricultural tools — all in one platform.
            </h2>
          </div>

          {/* AI Chatbot Assistance */}
          <div className="row align-items-center mb-5">
            <div className="col-md-2 text-center fs-1 text-primary">
              <i className="fas fa-robot"></i>
            </div>
            <div className="col-md-10">
              <h4 className="fw-bold">AI Chatbot Assistance</h4>
              <p>
                Get farming answers 24/7 — instantly. Our intelligent chatbot helps
                farmers with queries about maize diseases, fertilizer use, and
                weather. It supports Urdu and English.
              </p>
              <ul className="list-unstyled text-success">
                <li>✔ Available anytime</li>
                <li>✔ Voice & text support</li>
                <li>✔ Regionally localized responses</li>
              </ul>
            </div>
          </div>

          {/* Farmer Marketplace */}
          <div className="row align-items-center mb-5">
            <div className="col-md-2 text-center fs-1 text-warning">
              <i className="fas fa-store"></i>
            </div>
            <div className="col-md-10">
              <h4 className="fw-bold">Farmer Marketplace</h4>
              <p>
                Buy and sell with confidence. AgriTech connects farmers directly
                with buyers, suppliers, and agri-dealers. No middlemen, no hidden
                fees.
              </p>
              <ul className="list-unstyled text-success">
                <li>✔ Sell maize and crops easily</li>
                <li>✔ Find fertilizers, seeds, tools</li>
                <li>✔ Local and national access</li>
              </ul>
            </div>
          </div>

          {/* Disease Detection */}
          <div className="row align-items-center mb-5">
            <div className="col-md-2 text-center fs-1 text-danger">
              <i className="fas fa-virus"></i>
            </div>
            <div className="col-md-10">
              <h4 className="fw-bold">Disease Detection</h4>
              <p>
                Snap. Detect. Treat — Across Major Crops. Upload a photo of your
                crop leaf and get real-time diagnosis for maize, wheat, and rice.
              </p>
              <ul className="list-unstyled text-success">
                <li>✔ Instant multi-crop diagnosis</li>
                <li>✔ High-accuracy visual analysis using AI</li>
                <li>✔ Tailored treatment & fertilizer advice</li>
              </ul>
            </div>
          </div>

          {/* Weather Forecasting */}
          <div className="row align-items-center mb-5">
            <div className="col-md-2 text-center fs-1 text-info">
              <i className="fas fa-cloud-sun-rain"></i>
            </div>
            <div className="col-md-10">
              <h4 className="fw-bold">Weather Forecasting</h4>
              <p>
                Plan smart with hyper-local forecasts. Our system provides
                location-specific 5-day forecasts to help schedule irrigation,
                spraying, and harvesting.
              </p>
              <ul className="list-unstyled text-success">
                <li>✔ Accurate weather updates</li>
                <li>✔ Crop-specific planning</li>
                <li>✔ Integrated with disease & fertilizer advice</li>
              </ul>
            </div>
          </div>

          {/* Help Section */}
          <div className="text-center p-5 bg-light rounded shadow-sm">
            <i className="fas fa-comments fs-1 text-primary mb-3"></i>
            <h4 className="fw-bold">Need Help Choosing a Service?</h4>
            <p>
              Try our chatbot or visit the Help Center to learn how each service
              fits your farming goals.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;