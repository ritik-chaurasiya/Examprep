import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    address: '',
    password: '',
    college: '',
    qualification: '',
    session: '',
  });

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const handlefetch = async () => {
      try {
        const res = await axios.get("https://examprep-bxeo.onrender.com/api/session");
        setSessions(res.data.data);
      } catch (er) {
        console.log(er);
      }
    };
    handlefetch();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://examprep-bxeo.onrender.com/api/examinee', formData);
      alert('Examinee Registered!');
      setFormData({
        name: '',
        email: '',
        number: '',
        address: '',
        password: '',
        college: '',
        qualification: '',
        session: '',
      });
    } catch (error) {
      console.error('Submission error:', error);
      alert("Failed to Register");
    }
  };

  const styles = {
    page: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #4a3365ff, #ac66e9ff, #3c2e58ff)',
      fontFamily: 'Segoe UI, sans-serif',
    },
    card: {
      width: '1050px',
      height: 'auto',
      display: 'flex',
      borderRadius: '18px',
      overflow: 'hidden',
      boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
      backgroundColor: '#fff',
    },
    leftPanel: {
      flex: 0.7,
      background: 'linear-gradient(135deg,#570c78ff, #593a78, #8b44d2ff)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1px',
      textAlign: 'center',
    },
    abstractCircles: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'rgba(239, 104, 248, 0.15)',
      zIndex: 0,
    },
    bigCircle: {
      width: '140px',
      height: '140px',
      top: '18%',
      left: '10%',
    },
    smallCircle: {
      width: '90px',
      height: '90px',
      bottom: '12%',
      right: '65%',
    },
    welcomeText: {
      fontSize: '28px',
      fontWeight: '700',
      marginBottom: '15px',
    },
    subText: {
      fontSize: '15px',
      opacity: 0.9,
      maxWidth: '280px',
    },
    rightPanel: {
      flex: 1,
      backgroundColor: '#fff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '30px',
    },
    formBox: {
      width: '100%',
      maxWidth: '600px',
    },
    row: {
      display: 'flex',
      gap: '10px',
      marginBottom: '10px',
    },
    input: {
      flex: 1,
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '14px',
      outline: 'none',
    },
    select: {
      flex: 1,
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '14px',
    },
    textArea: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '14px',
      resize: 'vertical',
      marginBottom: '10px',
    },
    heading: {
      fontSize: '40px',
      marginBottom: '2px',
      fontWeight: '600',
      display: 'inline-block',

      borderBottom: '4px solid',
      color: '#4a0b65ff',

    },
    submitBtn: {
      width: '100%',
      padding: '10px',
      border: 'none',
      borderRadius: '6px',
      background: 'linear-gradient(to right, #3a0451ff, #7827c0ff)',
      color: '#fff',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '10px',
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
          <div style={{ ...styles.abstractCircles, ...styles.bigCircle }} />
          <div style={{ ...styles.abstractCircles, ...styles.smallCircle }} />
          <div style={styles.welcomeText}>Welcome to ExamPrep</div>
          <div style={styles.subText}>
            Register now and unlock your personalized dashboard to manage exams, view results, and access all your academic details in one place.
          </div>
        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel}>
          <form onSubmit={handleSubmit} style={styles.formBox}>
            <div style={{ textAlign: 'center' }}>
              <div className='border-b-2' style={styles.heading}>Registration Page</div>
            </div>
            <br />
            <div style={styles.row}>
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required style={styles.input} />
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required style={styles.input} />
            </div>

            <div style={styles.row}>
              <input type="tel" name="number" placeholder="Phone Number" value={formData.number} onChange={handleChange} required style={styles.input} />
              <select name="session" value={formData.session} onChange={handleChange} required style={styles.select}>
                <option value="">Select Session</option>
                {sessions.map((item) => (
                  <option value={item._id} key={item._id}>{item.name}</option>
                ))}
              </select>
            </div>

            <div style={styles.row}>
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={styles.input} />
            </div>

            <textarea name="address" placeholder="Address" rows="3" value={formData.address} onChange={handleChange} required style={styles.textArea}></textarea>

            <div style={styles.row}>
              <input type="text" name="college" placeholder="College Name" value={formData.college} onChange={handleChange} required style={styles.input} />
              <input type="text" name="qualification" placeholder="Qualification" value={formData.qualification} onChange={handleChange} required style={styles.input} />
            </div>

            <button type="submit" style={styles.submitBtn}>Register Here</button>

            <div style={styles.checkbox} className="check">

              <label htmlFor="exampleCheck1" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                
                Are you going to login page? <Link to="/">login here</Link>.
              </label>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Registration;
