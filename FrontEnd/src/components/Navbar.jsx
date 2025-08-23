import React from 'react'

export default function Navbar({ search, setSearch }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
      <div className="container">
        <a className="navbar-brand d-lg-none" href="#">
          <img src="/Logo.png" alt="Agritech" style={{ height: 28 }} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#">About</a></li>
            <li className="nav-item"><a className="nav-link active" href="#">Services</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Blog</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
          </ul>

          {/* 🔍 Search Box */}
          <form className="d-flex ms-auto me-2" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control form-control-sm me-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
            />
            <button className="btn btn-sm btn-outline-secondary" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </div>
    </nav>
  )
}
