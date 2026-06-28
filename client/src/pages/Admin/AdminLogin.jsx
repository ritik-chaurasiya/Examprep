import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminLogin = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(
            "https://examprep-bxeo.onrender.com/api/admin/login",
            form
        );

        if (res.data.message === "Login Successfully") {
            localStorage.setItem("role", res.data.admin.role);
            localStorage.setItem("email", res.data.admin.email);
            window.location.href = "/admin";
        } else {
          toast.error("Your email or password are incorrect");
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
              maxWidth: "950px",
              borderRadius: "25px",
              overflow: "hidden",
              minHeight: "550px"
            }}
          >
            {/* Left Side */}
            <div
              className="col-md-5 d-none d-md-flex flex-column justify-content-center align-items-center text-white p-5"
              style={{
                background: "linear-gradient(135deg,#4F46E5,#7C3AED)"
              }}
            >
              <h1 className="fw-bold mb-3">Welcome Back Admin!</h1>

              <h5 className="text-center opacity-75">
                Your command center awaits.
              </h5>

              <p className="text-center opacity-75 mt-3">
                Manage users, monitor exams, and track performance — all in one place.
              </p>
            </div>

            {/* Right Side */}
            <div className="col-md-7 col-12 d-flex align-items-center bg-white">
              <div className="w-100 p-4 p-md-5">

                <h2 className="fw-bold mb-2" style={{ color: "#312E81" }}>
                  Admin Login
                </h2>

                <p className="text-muted mb-4">
                  Sign in to access the admin dashboard.
                </p>

                <form onSubmit={handleSubmit}>

                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Email Address
                    </label>

                    <input
                      type="email"
                      className="form-control py-3"
                      placeholder="Enter your email"
                      name="email"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Password
                    </label>

                    <input
                      type="password"
                      className="form-control py-3"
                      placeholder="Enter your password"
                      name="password"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Button */}
                  <button
                    className="btn w-100 py-3 fw-bold text-white"
                    style={{
                      borderRadius: "15px",
                      background: "linear-gradient(90deg,#4F46E5,#7C3AED)",
                      border: "none"
                    }}
                  >
                    Login
                  </button>

                  {/* Divider */}
                  <div className="text-center text-muted my-4">
                    or
                  </div>

                  {/* Google Button */}
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100 py-3"
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google"
                      width="20"
                      className="me-2"
                    />
                    Sign in with Google
                  </button>

                  {/* Student Login */}
                  <div className="text-center mt-4">
                    Login by Student?{" "}
                    <a
                      href="/"
                      className="text-decoration-none fw-semibold"
                      style={{ color: "#4F46E5" }}
                    >
                      Sign In
                    </a>
                  </div>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AdminLogin;
