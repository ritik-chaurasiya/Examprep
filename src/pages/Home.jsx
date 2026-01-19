import React from "react";
import { useNavigate } from "react-router";

const Home= () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(to right, #4a3365ff, #ac66e9ff, #3c2e58ff)", // adjust to match admin dashboard colors
    },
    card: {
       width: '1050px',
      height: '450px',
      display: 'flex',
      borderRadius: '18px',
      overflow: 'hidden',
      boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
      backgroundColor: '#fff',
    },
    left: {
      flex: 1,
      backgroundColor: "#ffffff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    },
    right: {
      flex: 1,
      backgroundColor: "#593a78", // admin dashboard theme blue
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    },
    heading: {
      fontSize: "22px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    subText: {
      fontSize: "14px",
      marginBottom: "20px",
      textAlign: "center",
      maxWidth: "80%",
    },
    button: {
      padding: "8px 20px",
      border: "none",
      borderRadius: "5px",
      fontSize: "14px",
      fontWeight: "bold",
      cursor: "pointer",
    },
    userBtn: {
      backgroundColor: "#593a78",
      color: "#fff",
    },
    adminBtn: {
      backgroundColor: "#fff",
      color: "#593a78",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Left Panel - User */}
        <div style={styles.left}>
          <div style={styles.heading}>ExamPrep</div>
          <div style={styles.subText}>Access your exam dashboard and practice tests</div>
          <button
            style={{ ...styles.button, ...styles.userBtn }}
            onClick={() => navigate("/userdash/")}
          >
            USER DASHBOARD
          </button>
        </div>

        {/* Right Panel - Admin */}
        <div style={styles.right}>
          <div style={styles.heading}>ExamPrep Admin</div>
          <div style={styles.subText}>Manage exams, results, and user reports</div>
          <button
            style={{ ...styles.button, ...styles.adminBtn }}
            onClick={() => navigate("/admin/")}
          >
            ADMIN DASHBOARD
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
