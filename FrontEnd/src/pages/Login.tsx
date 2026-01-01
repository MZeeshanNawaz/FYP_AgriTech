import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      navigate("/"); // redirect after login
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
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
            <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>
              Login
            </Link>
            <Link to="/register" className={location.pathname === "/register" ? "active" : ""}>
              Register
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3 position-relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="form-control"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <button type="submit" className="btn btn-login w-100" disabled={loading}>
              {loading ? "Processing..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
