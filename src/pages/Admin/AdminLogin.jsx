import React, { useState } from "react";
import axios from "axios";

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
            alert("Your email or password are incorrect");
        }
    };

    return (
        <>
            {/* INTERNAL CSS */}
            <style>
                {`
        * {
          box-sizing: border-box;
        }

        .login-page {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #4a3365ff, #ac66e9ff, #3c2e58ff);
          font-family: 'Segoe UI', sans-serif;
          padding: 20px;
        }

        .login-card {
          width: 900px;
          height: 520px;
          display: flex;
          border-radius: 18px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 25px 60px rgba(0,0,0,0.35);
        }

        .left-panel {
          flex: 1;
          background: linear-gradient(135deg, #570c78ff, #593a78, #8b44d2ff);
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          padding: 30px;
        }

        .circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(239, 104, 248, 0.15);
        }

        .big-circle {
          width: 140px;
          height: 140px;
          top: 18%;
          left: 10%;
        }

        .small-circle {
          width: 90px;
          height: 90px;
          bottom: 12%;
          right: 10%;
        }

        .subheading {
          font-size: 34px;
          color: #d4a3ff;
          z-index: 1;
        }

        .welcome-text {
          font-size: 22px;
          font-weight: 600;
          color: #9582bc;
          z-index: 1;
          margin: 5px 0;
        }

        .sub-text {
          font-size: 15px;
          text-align: center;
          opacity: 0.9;
          z-index: 1;
        }

        .right-panel {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 30px;
        }

        .form-box {
          width: 100%;
          max-width: 300px;
        }

        .heading {
          font-size: 38px;
          font-weight: 600;
          color: #4a0b65;
          text-align: center;
          border-bottom: 4px solid #4a0b65;
          margin-bottom: 20px;
        }

        .form-box label {
          font-size: 14px;
          font-weight: 500;
        }

        .form-box input {
          width: 100%;
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          margin-bottom: 12px;
          outline: none;
        }

        .submit-btn {
          width: 100%;
          padding: 11px;
          border: none;
          border-radius: 6px;
          background: linear-gradient(to right, #3a0451ff, #7827c0ff);
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        .or-divider {
          text-align: center;
          font-size: 13px;
          color: #999;
          margin: 12px 0;
        }

        .google-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 8px;
          cursor: pointer;
          margin-bottom: 10px;
        }

        .google-btn img {
          width: 16px;
        }

        .create-account {
          text-align: center;
          font-size: 13px;
        }

        .create-account a {
          color: #8e2de2;
          text-decoration: none;
          font-weight: 500;
          margin-left: 5px;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .login-card {
            flex-direction: column;
            height: auto;
            width: 100%;
            max-width: 400px;
          }

          .left-panel {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .heading {
            font-size: 30px;
          }
        }
        `}
            </style>

            {/* JSX */}
            <div className="login-page">
                <div className="login-card">
                    <div className="left-panel">
                        <div className="circle big-circle"></div>
                        <div className="circle small-circle"></div>

                        <h2 className="subheading">Welcome Back Admin!!</h2>
                        <p className="welcome-text">Your command center awaits.</p>
                        <p className="sub-text">
                            Manage users, monitor exams, and track performance — all in one
                            place.
                        </p>
                    </div>

                    <div className="right-panel">
                        <form className="form-box" onSubmit={handleSubmit}>
                            <h2 className="heading">Admin Login</h2>

                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                required
                                onChange={handleChange}
                            />

                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••"
                                required
                                onChange={handleChange}
                            />

                            <button className="submit-btn">Log In</button>

                            <div className="or-divider">or</div>

                            <div className="google-btn">
                                <img
                                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                                    alt="Google"
                                />
                                Sign in with Google
                            </div>

                            <div className="create-account">
                                Login by Student?
                                <a href="/">Sign in</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminLogin;
