import React from "react";

const ContactStrip: React.FC = () => {
  return (
    <div className="contact-strip bg-light py-2">
      <div className="container">

        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2">

          {/* Left section */}
          <div className="d-flex align-items-center gap-3">
            <img
              src="/Logo.png"
              alt="logo"
              className="logo-img"
              style={{ height: 50 }}
            />

            <div className="d-none d-md-flex gap-3 align-items-center">
              <a className="text-muted small" href="#"><i className="fa-brands fa-twitter"></i></a>
              <a className="text-muted small" href="#"><i className="fa-brands fa-facebook"></i></a>
              <a className="text-muted small" href="#"><i className="fa-brands fa-pinterest"></i></a>
              <a className="text-muted small" href="#"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>

          {/* Right section */}
          <div className="d-flex flex-column flex-md-row gap-2 gap-md-4 align-items-start align-items-md-center small text-muted">
            <div>
              <i className="fa-solid fa-phone"></i> &nbsp; +92 301-1654141
            </div>
            <div>
              <i className="fa-regular fa-envelope"></i> &nbsp; needhelp@agritech.com
            </div>
            <div>
              <i className="fa-solid fa-location-dot"></i> &nbsp; Lahore, Pakistan
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactStrip;
