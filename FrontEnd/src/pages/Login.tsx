import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const location = useLocation();

  // handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login form submitted");
    // You can add login API call here
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center min-vh-100">
      <div className="login-card d-flex rounded shadow overflow-hidden">
        {/* Left image */}
        <div className="login-image d-none d-md-block">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTshHMu6YHykL6VXh6Ka4lfLN0xQAgqXi02OA&s"
            alt="Login Visual"
          />
        </div>

        {/* Right form */}
        <div className="login-form p-5">
          <h2 className="welcome-text">
            Welcome,<span> back!</span>
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
          <form onSubmit={handleSubmit}>
            <div className="mb-3 position-relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="form-control"
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="mb-3">
              <a href="#" className="forgot-link">
                Forgot Password? Click here
              </a>
            </div>

            <button type="submit" className="btn btn-login w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
