import React from "react";
import CurvyEdge from "../components/CurvyEdge";

export default function Contact() {
  return (
    <div className="contact-page">
      {/* Hero */}
      <header className="hero contact-hero position-relative text-center text-white">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <small className="text-uppercase breadcrumb">Home / Contact</small>
          <h1 className="display-5 fw-bold">Contact</h1>
        </div>
        <CurvyEdge color="#fff" />
      </header>

      {/* Info Cards */}
      <section className="container py-5">
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="contact-card about p-4 rounded shadow-sm">
              <h5>About</h5>
              <p>
                Have questions about your crops? Our experts and AI tools are here to help you
                make smarter farming decisions.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="contact-card contact p-4 rounded shadow-sm">
              <h5>Contact</h5>
              <p>0301-1654141</p>
              <p>needhelp@agritech.com</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="contact-card address p-4 rounded shadow-sm">
              <h5>Address</h5>
              <p>Khayaban-e-Jinnah Road, Johar Town</p>
              <p>Lahore, Pakistan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map + Form */}
      <section className="container py-5">
        <div className="row g-4">
          <div className="col-lg-6">
            <iframe
              title="AgriTech Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6803.507345595621!2d74.2718766!3d31.4674961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904fc4f6c1a0d%3A0x9a2b8efb2b7a523f!2sKhayaban-e-Jinnah%20Rd%2C%20Johar%20Town%2C%20Lahore!5e0!3m2!1sen!2s!4v1704888888888!5m2!1sen!2s"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="col-lg-6">
            <div className="contact-form-box p-4 h-100 rounded shadow-sm">
              <h6 className="text-success">Contact us</h6>
              <h3 className="fw-bold mb-4">Write a Message</h3>
              <form>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Name" required />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Email Address" required />
                </div>
                <div className="mb-3">
                  <textarea rows={4} className="form-control" placeholder="Write a Message" required />
                </div>
                <button type="submit" className="btn btn-success px-4">Send a Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
