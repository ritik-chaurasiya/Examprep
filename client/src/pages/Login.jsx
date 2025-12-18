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
      const res = await axios.post("http://localhost:5000/api/examinee/login", data);

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
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #4a3365ff, #ac66e9ff, #3c2e58ff)",
      fontFamily: "Segoe UI, sans-serif"
    },
    card: {
      width: "900px",
      height: "520px",
      display: "flex",
      borderRadius: "18px",
      overflow: "hidden",
      boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
      backgroundColor: "#fff"
    },
    leftPanel: {
      flex: 1,
      background: "linear-gradient(135deg, #570c78ff, #593a78, #8b44d2ff)",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      padding: "30px"
    },
    abstractCircles: {
      position: "absolute",
      borderRadius: "50%",
      background: "rgba(239, 104, 248, 0.15)",
      zIndex: 0
    },
    bigCircle: {
      width: "140px",
      height: "140px",
      top: "18%",
      left: "10%"
    },
    smallCircle: {
      width: "90px",
      height: "90px",
      bottom: "12%",
      right: "10%"
    },
    subheading: {
      color: "#d4a3ffff",
      fontSize: "30px",
      marginBottom: "1px"
    },
    welcomeText: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "5px",
      zIndex: 1,
      color: "#9582bcff"
    },
    subText: {
      fontSize: "15px",
      opacity: 0.9,
      zIndex: 1,
      textAlign: "center"
    },
    rightPanel: {
      flex: 1,
      backgroundColor: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px"
    },
    formBox: {
      width: "100%",
      maxWidth: "300px"
    },
    heading: {
      fontSize: "40px",
      marginBottom: "2px",
      fontWeight: "600",
      display: "inline-block",
      borderBottom: "4px solid",
      color: "#4a0b65ff"
    },
    label: {
      fontSize: "15px",
      fontWeight: "500",
      marginBottom: "1px"
    },
    input: {
      width: "100%",
      padding: "10px 8px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "14px",
      marginBottom: "10px",
      outline: "none"
    },
    submitBtn: {
      width: "100%",
      padding: "11px",
      border: "none",
      borderRadius: "6px",
      background: "linear-gradient(to right, #3a0451ff, #7827c0ff)",
      color: "#fff",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      marginBottom: "10px",
      marginTop: "5px"
    },
    checkbox: {
      marginTop: "8px",
      fontSize: "13px"
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Left Panel */}
        <div style={styles.leftPanel}>
          <img
            src={loginImage}
            alt="Login Illustration"
            style={{ width: "340px", marginBottom: "5px", zIndex: 1 }}
          />

          <div style={styles.subheading}>Welcome to Examprep! </div>
          <div style={styles.welcomeText}>"Your Journey Starts Here"</div>
          <div style={styles.subText}>
            "Login to view your exams, results, and profile — all in one smart dashboard."
          </div>
        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel}>
          <form onSubmit={handleSubmit} style={styles.formBox} method="POST">
            <div style={{ textAlign: "center" }}>
              <div className="border-b-2" style={styles.heading}>
                User Login
              </div>
            </div>
            <br />

            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              required
              onChange={handleChange}
              value={data.email}
              style={styles.input}
            />

            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••"
              required
              onChange={handleChange}
              value={data.password}
              style={styles.input}
            />

            <button type="submit" style={styles.submitBtn}>
              Login
            </button>

            <div style={styles.checkbox}>
              <input type="checkbox" id="exampleCheck1" />
              <label htmlFor="exampleCheck1">
                {" "}
                Don't have an account? <Link to="/register">Register here</Link>.
              </label>
            </div>

            <div style={styles.checkbox}>
              <input type="checkbox" id="exampleCheck1" />
              <label htmlFor="exampleCheck1">
                {" "}
                Are you admin? <Link to="/adlogin">Admin Login</Link>.
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
