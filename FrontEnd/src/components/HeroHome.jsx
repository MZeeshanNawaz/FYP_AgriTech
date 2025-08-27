import React from "react"

export default function HeroHome() {
  return (
    <header className="hero-home position-relative">
      <div className="hero-overlay" />
      <div className="container hero-content text-white">
        <p className="small text-uppercase fw-semibold mb-2">Empowering Farmers with</p>
        <h1 className="display-4 fw-bold">AgriTech</h1>
        <p className="lead mb-4" style={{ maxWidth: "520px" }}>
          Detect diseases early, plan with accurate weather forecasts, and get smart fertilizer application – all in one platform.
        </p>
        <a href="#intro" className="btn btn-success btn-lg rounded-pill px-4">
          Discover More
        </a>
      </div>
    </header>
  )
}
