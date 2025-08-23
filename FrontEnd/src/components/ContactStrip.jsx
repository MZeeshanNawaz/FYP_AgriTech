import React from 'react'

export default function ContactStrip() {
  return (
    <div className="contact-strip bg-light py-2">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <img src="/Logo.png" alt="logo" className="logo-img" style={{height:50}} />
          <div className="d-none d-md-flex gap-3 align-items-center">
            <a className="text-muted small" href="#"><i className="fa-brands fa-twitter"></i></a>
            <a className="text-muted small" href="#"><i className="fa-brands fa-facebook"></i></a>
            <a className="text-muted small" href="#"><i className="fa-brands fa-pinterest"></i></a>
            <a className="text-muted small" href="#"><i className="fa-brands fa-instagram"></i></a>
          </div>
        </div>

        <div className="d-flex gap-4 align-items-center small text-muted">
          <div><i className="fa-solid fa-phone"></i> &nbsp; +92 301-1654141</div>
          <div><i className="fa-regular fa-envelope"></i> &nbsp; needhelp@agritech.com</div>
          <div><i className="fa-solid fa-location-dot"></i> &nbsp; Lahore, Pakistan</div>
        </div>
      </div>
    </div>
  )
}
