import React from 'react'

export default function Footer({ subscribeEmail, setSubscribeEmail, handleSubscribe }) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-3">
              <img src="/Logo.png" alt="Agritech" className="footer-logo mb-3" />
              <p className="small footer-desc">Feel free to contact us</p>

              <div className="socials mt-3">
                <a href="#" className="social-btn"><i className="fa-brands fa-twitter"></i></a>
                <a href="#" className="social-btn"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#" className="social-btn"><i className="fa-brands fa-pinterest-p"></i></a>
                <a href="#" className="social-btn"><i className="fa-brands fa-instagram"></i></a>
              </div>
            </div>

            <div className="col-lg-2">
              <h6 className="footer-heading">Explore</h6>
              <ul className="list-unstyled footer-links small">
                <li><a href="#"><i className="fa-solid fa-chevron-right me-2 fa-xs"></i>About</a></li>
                <li><a href="#"><i className="fa-solid fa-chevron-right me-2 fa-xs"></i>Services</a></li>
                <li><a href="#"><i className="fa-solid fa-chevron-right me-2 fa-xs"></i>Marketplace</a></li>
                <li><a href="#"><i className="fa-solid fa-chevron-right me-2 fa-xs"></i>Blog</a></li>
                <li><a href="#"><i className="fa-solid fa-chevron-right me-2 fa-xs"></i>Contact</a></li>
              </ul>
            </div>

            <div className="col-lg-4">
              <h6 className="footer-heading">Blog</h6>

              <div className="footer-blog-item">
                <a href="#" className="d-block blog-title">Smart Fertilizer Advice Tailored to Your Crop’s Health</a>
                <div className="blog-meta small">July 25, 2025</div>
              </div>

              <div className="footer-blog-item mt-3">
                <a href="#" className="d-block blog-title">Grow Smarter with AI-Based Fertilizer Planning</a>
                <div className="blog-meta small">July 30, 2025</div>
              </div>
            </div>

            <div className="col-lg-3">
              <h6 className="footer-heading">Contact</h6>
              <div className="contact-list small">
                <div className="mb-2"><i className="fa-solid fa-phone me-2"></i> +92 301-1654141</div>
                <div className="mb-2"><i className="fa-regular fa-envelope me-2"></i> needhelp@agritech.com</div>
                <div className="mb-2"><i className="fa-solid fa-location-dot me-2"></i>Johar Town<br/>Lahore, Pakistan</div>

                <div className="mt-3">
                  <div className="input-group subscribe-group">
                    <input
                      value={subscribeEmail}
                      onChange={(e) => setSubscribeEmail(e.target.value)}
                      type="email"
                      className="form-control form-control-sm"
                      placeholder="Your Email Address"
                    />
                    <button 
                      className="btn subscribe-btn" 
                      type="button" 
                      onClick={handleSubscribe}
                    >
                      <i className="fa-solid fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
                <div className="mt-3 small text-muted">Business hours: Mon - Sat, 9:00 AM - 6:00 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="copyright small">© All Copyright 2025 by Agritech</div>
          <div className="small footer-bottom-links">
            <a href="#" className="me-3">Terms of Use</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
