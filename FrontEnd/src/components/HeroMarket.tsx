import React from 'react'

export default function HeroMarket() {
  return (
    <header className="hero hero-marketplace">
      <div className="hero-overlay" />
      <div className="container hero-content text-center text-white">
        <small className="text-uppercase breadcrumb">Home / Marketplace</small>
        <h1 className="display-5 fw-bold">Marketplace</h1>
      </div>

      <div className="hero-edge">
        <svg viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path
            d="M0,20 C150,80 350,0 600,30 C850,60 1050,10 1200,70 L1200,100 L0,100 Z"
            fill="#fff"
          />
        </svg>
      </div>
    </header>
  )
}
