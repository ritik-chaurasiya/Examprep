import React, { useState } from "react";
import axios from "axios";
import loginImage from "../assets/images/login1.png";
import { Link } from "react-router";

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
        alert("Invalid credentials. Please try again.");
        setData({ email: "", password: "" });
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #4a3365, #ac66e9, #3c2e58)",
      display: "flex",
      alignItems: "center",
      padding: "20px",
    },
    card: {
      borderRadius: "18px",
      overflow: "hidden",
      boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
    },
    leftPanel: {
      background:
        "linear-gradient(135deg, #570c78, #593a78, #8b44d2)",
      color: "#fff",
      textAlign: "center",
      padding: "40px 20px",
    },
    rightPanel: {
      padding: "40px 25px",
    },
    heading: {
      fontSize: "36px",
      fontWeight: "700",
      color: "#4a0b65",
      borderBottom: "4px solid",
      display: "inline-block",
      marginBottom: "25px",
    },
    input: {
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
    submitBtn: {
      background:
        "linear-gradient(to right, #3a0451, #7827c0)",
      color: "#fff",
      fontWeight: "600",
      border: "none",
      padding: "10px",
      borderRadius: "6px",
      width: "100%",
    },
  };

  return (
    <div style={styles.page}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card" style={styles.card}>
              <div className="row g-0">

                {/* LEFT PANEL */}
                <div className="col-12 col-md-6" style={styles.leftPanel}>
                  <img
                    src={loginImage}
                    alt="login"
                    className="img-fluid mb-3"
                    style={{ maxWidth: "300px" }}
                  />
                  <h4 className="fw-bold">Welcome to ExamPrep</h4>
                  <p className="opacity-75">
                    Login to access exams, results and dashboard
                  </p>
                </div>

                {/* RIGHT PANEL */}
                <div className="col-12 col-md-6 bg-white" style={styles.rightPanel}>
                  <form onSubmit={handleSubmit}>
                    <div className="text-center">
                      <div style={styles.heading}>User Login</div>
                    </div>

                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control mb-3"
                      style={styles.input}
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      required
                    />

                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control mb-3"
                      style={styles.input}
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                      required
                    />

                    <button type="submit" style={styles.submitBtn}>
                      Login
                    </button>

                    <div className="mt-3 text-center small">
                      Don’t have an account?{" "}
                      <Link to="/register">Register</Link>
                    </div>

                    <div className="text-center small mt-1">
                      Are you admin?{" "}
                      <Link to="/adlogin">Admin Login</Link>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
