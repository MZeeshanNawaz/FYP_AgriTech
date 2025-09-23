import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false); 
  const location = useLocation();

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center min-vh-100">
      <div className="login-card d-flex rounded shadow overflow-hidden">
        
        {/* Left image */}
        <div className="login-image d-none d-md-block">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTshHMu6YHykL6VXh6Ka4lfLN0xQAgqXi02OA&s"
            alt="Register Visual"
          />
        </div>

        {/* Right form */}
        <div className="login-form p-5">
          <h2 className="welcome-text">
            Register<span> now!</span>
          </h2>

          {/* Tabs */}
          <div className="form-tabs mb-4 d-flex gap-4">
            <Link
              to="/login"
              className={location.pathname === "/login" ? "active" : ""}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={location.pathname === "/register" ? "active" : ""}
            >
              Register
            </Link>
          </div>

          {/* Form */}
          <form>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Enter your username"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control"
              />
            </div>
            <div className="mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="form-control"
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="form-control"
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="mb-3">
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <Link to="/login" className="forgot-link">
                Have an account? Click here
              </Link>
            </div>

            <button type="submit" className="btn btn-login w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
