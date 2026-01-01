import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
        phone,
      });

      alert("Registration Successful");
      navigate("/login");

    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed");
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
            <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>
              Login
            </Link>
            <Link to="/register" className={location.pathname === "/register" ? "active" : ""}>
              Register
            </Link>
          </div>

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Enter your username"
                className="form-control"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-3">
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
                placeholder="Enter your password"
                className="form-control"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="form-control"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />

              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="mb-3">
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="form-control"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <Link to="/login" className="forgot-link">
                Have an account? Click here
              </Link>
            </div>

            <button type="submit" className="btn btn-login w-100" disabled={loading}>
              {loading ? "Processing..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
