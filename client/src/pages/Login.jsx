import React, { useState } from "react";
import axios from "axios";
import loginImage from "../assets/images/login1.png";
import { Link } from "react-router";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://examprep-bxeo.onrender.com/api/examinee/login", data);

      if (res.data.message === "Login Successfully") {
        localStorage.setItem("userRole", res.data.user.role);
        localStorage.setItem("userEmail", res.data.user.email);
        localStorage.setItem("userId", res.data.user.id);
        window.location.href = "/userdash/";
      } else {
        toast.error("Invalid credentials. Please try again.");
        setData({ email: "", password: "" });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again.");
    }
  };

  return (

    <div
      className="min-vh-100 d-flex align-items-center justify-content-center py-5"
      style={{
        background:
          "linear-gradient(135deg, #0F172A 0%, #312E81 50%, #7C3AED 100%)"
      }}
    >
      <div className="container">
        <div
          className="row g-0 bg-white shadow-lg mx-auto"
          style={{
            maxWidth: "1000px",
            borderRadius: "25px",
            overflow: "hidden",
            minHeight: "650px"
          }}
        >
          {/* Left Side */}
          <div
            className="col-md-5 d-none d-md-flex flex-column justify-content-center align-items-center text-white p-4"
            style={{
              background: "linear-gradient(135deg,#4F46E5,#7C3AED)"
            }}
          >
            <img
              src={loginImage}
              alt="login"
              className="img-fluid mb-4"
              style={{
                maxWidth: "280px",
                width: "100%"
              }}
            />

            <h2 className="fw-bold">ExamPrep AI</h2>

            <p className="text-center opacity-75">
              Learn smarter and prepare better with AI-powered exams.
            </p>
          </div>

          {/* Right Side */}
          <div
            className="col-md-7 col-12 d-flex align-items-center justify-content-center bg-white"
          >
            <div className="w-100 p-4 p-md-5">

              <h2 className="fw-bold mb-2">Welcome Back </h2>

              <p className="text-muted mb-4">
                Sign in to continue your learning journey.
              </p>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Email Address
                  </label>

                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <FaEnvelope />
                    </span>

                    <input
                      type="email"
                      className="form-control py-3"
                      placeholder="Enter your email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Password
                  </label>

                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <FaLock />
                    </span>

                    <input
                      type="password"
                      className="form-control py-3"
                      placeholder="Enter your password"
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-between mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                    />
                    <label className="form-check-label">
                      Remember me
                    </label>
                  </div>

                  <Link
                    to="/forgot-password"
                    className="text-decoration-none"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <button
                  className="btn btn-primary w-100 py-3 fw-bold"
                  style={{
                    borderRadius: "15px",
                    background: "linear-gradient(90deg,#4F46E5,#7C3AED)",
                    border: "none"
                  }}
                >
                  Login
                </button>

                <div className="text-center mt-4">
                  Don't have an account?{" "}
                  <Link to="/register">Register</Link>
                </div>

                <div className="text-center mt-2">
                  Admin Access?{" "}
                  <Link to="/adlogin">Admin Login</Link>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;
