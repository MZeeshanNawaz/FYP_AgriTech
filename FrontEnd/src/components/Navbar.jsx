import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ search, setSearch }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
      <div className="container">

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/marketplace">Services</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/blog">Blog</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
          </ul>

          {/* Login/Register */}
          <div className="d-flex me-3">
            <Link className="btn btn-link btn-sm text-success" to="/login">Login</Link>
            <Link className="btn btn-success btn-sm ms-2 px-3 rounded-pill" to="/register">Register</Link>
          </div>

          {/* Search */}
          <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control form-control-sm me-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
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
