import React, { useEffect } from "react";
import "../styles/style.css";
import HeroAbout from "../components/HeroAbout"; // use your existing hero component

const TEAM = [
  {
    id: 1,
    name: "Husnain Khalid",
    role: "Backend Developer",
    img: "https://i.postimg.cc/66mDh1wd/IMG-20250831-WA0029.jpg",
  },
  {
    id: 2,
    name: "Zeeshan Nawaz",
    role: "Frontend Developer / ML Engineer",
    img: "https://i.postimg.cc/JhqqY9WP/IMG-20250825-WA0007.jpg",
  },
  {
    id: 3,
    name: "Okasha Javaid",
    role: "UI/UX designer",
    img: "https://i.postimg.cc/Hxr6JBfz/IMG-20250831-WA0025-1.jpg",
  },
];

export default function About() {
  return (
    <>
      {/* Hero (kept in a separate component for consistency) */}
      <HeroAbout />

      {/* Intro / Who we are */}
      <section className="about-intro py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 text-center">
              <div className="intro-images position-relative">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Farming"
                  className="img-fluid rounded-circle shadow"
                  style={{ width: 360, height: 360, objectFit: "cover" }}
                />
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-2PyfTqvWOEW9mL6uL1n_UgSJvfoLxZNMQg&s"
                  alt="Crop hand"
                  className="intro-small-img rounded-circle shadow position-absolute"
                  style={{
                    width: 120,
                    height: 120,
                    bottom: -30,
                    left: -40,
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <p className="text-uppercase text-warning small fw-bold mb-2">Our Introduction</p>
              <h2 className="fw-bold mb-3">AI-Empowered Agri-Tech Platform for Farmers</h2>
              <h6 className="text-success mb-3">Why AgriTech?</h6>
              <p className="mb-4">
                AgriTech is built for local farmers — combining disease detection, weather forecasts,
                and a marketplace so smallholders can make timely, profitable decisions.
              </p>

              <div className="d-flex gap-4 mb-4 flex-wrap">
                <div className="d-flex align-items-center">
                  <i className="fa-solid fa-leaf text-success me-2" />
                  <div>
                    <div className="fw-bold">Crop Monitoring</div>
                    <small className="text-muted">Early warnings & health checks</small>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <i className="fa-solid fa-lightbulb text-success me-2" />
                  <div>
                    <div className="fw-bold">Expert Advice</div>
                    <small className="text-muted">Localized fertilizer tips</small>
                  </div>
                </div>
              </div>

              <a href="#what-we-do" className="btn btn-success rounded-pill px-4">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section id="what-we-do" className="py-5 bg-light">
        <div className="container text-center">
          <p className="text-uppercase text-warning small fw-bold">What We Do</p>
          <h2 className="fw-bold mb-5">Our Services</h2>

          <div className="row g-4">
            <div className="col-sm-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm service-card p-3">
                <div className="mb-3 display-6">
                  <i className="fa-solid fa-microscope text-success" />
                </div>
                <h6 className="fw-bold">AI Disease Detection</h6>
                <p className="small text-muted">Upload leaf photos and get instant diagnosis.</p>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm service-card p-3">
                <div className="mb-3 display-6">
                  <i className="fa-solid fa-cloud-sun-rain text-success" />
                </div>
                <h6 className="fw-bold">Real-Time Weather</h6>
                <p className="small text-muted">Accurate, location-based forecasts for planning.</p>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm service-card p-3">
                <div className="mb-3 display-6">
                  <i className="fa-solid fa-comments text-success" />
                </div>
                <h6 className="fw-bold">24/7 Chatbot Support</h6>
                <p className="small text-muted">Practical advice and quick answers in Urdu/English.</p>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm service-card p-3">
                <div className="mb-3 display-6">
                  <i className="fa-solid fa-shop text-success" />
                </div>
                <h6 className="fw-bold">Farmer Marketplace</h6>
                <p className="small text-muted">Sell your harvest directly — fair prices, less middlemen.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why AgriTech */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Why AgriTech?</h2>
          <div className="row g-4 justify-content-center">
            <div className="col-md-8">
              <p className="text-muted">
                Farmers face late diagnosis, unpredictable weather, and fragmented markets.
                AgriTech combines AI, local expertise and a marketplace to reduce uncertainty,
                save inputs and increase income.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <p className="text-warning fw-semibold">Team</p>
          <h2 className="fw-bold mb-5">Meet Our Team</h2>

          <div className="row g-4">
            {TEAM.map((m) => (
              <div className="col-md-4" key={m.id}>
                <div className="card border-0 shadow-sm">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="card-img-top"
                    style={{ height: 260, objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h6 className="fw-bold mb-0">{m.name}</h6>
                    <small className="text-muted">{m.role}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
