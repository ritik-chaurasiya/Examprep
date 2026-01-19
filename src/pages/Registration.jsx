import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
    password: "",
    college: "",
    qualification: "",
    session: "",
  });

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios
      .get("https://examprep-bxeo.onrender.com/api/session")
      .then((res) => setSessions(res.data.data || []))
      .catch(console.log);
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://examprep-bxeo.onrender.com/api/examinee",
        formData
      );
      alert("Examinee Registered!");
      setFormData({
        name: "",
        email: "",
        number: "",
        address: "",
        password: "",
        college: "",
        qualification: "",
        session: "",
      });
    } catch {
      alert("Registration Failed");
    }
  };

  return (
    <>
      {/* INTERNAL CSS */}
      <style>{`
        .register-bg {
          min-height: 100vh;
          background: linear-gradient(135deg,#4a3365,#ac66e9,#3c2e58);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .register-card {
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0,0,0,0.35);
        }

        .left-panel {
          background: linear-gradient(135deg,#570c78,#593a78,#8b44d2);
          color: white;
        }

        .left-panel h2 {
          font-weight: 700;
        }

        .form-control, .form-select {
          border-radius: 6px;
        }

        .register-btn {
          background: linear-gradient(to right,#3a0451,#7827c0);
          border: none;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .left-panel {
            text-align: center;
            padding: 30px 20px;
          }
        }
      `}</style>

      <div className="register-bg">
        <div className="container">
          <div className="row register-card bg-white">

            {/* LEFT PANEL */}
            <div className="col-lg-5 d-none d-lg-flex left-panel flex-column justify-content-center p-5">
              <h2>Welcome to ExamPrep</h2>
              <p className="mt-3">
                Register now and unlock your personalized dashboard to manage
                exams, results, and academic progress.
              </p>
            </div>

            {/* RIGHT PANEL */}
            <div className="col-lg-7 p-4 p-md-5">
              <h3 className="text-center mb-4" style={{ color: "#4a0b65" }}>
                Registration Page
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      className="form-control"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      className="form-control"
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      className="form-control"
                      name="number"
                      placeholder="Phone Number"
                      value={formData.number}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <select
                      className="form-select"
                      name="session"
                      value={formData.session}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Session</option>
                      {sessions.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <textarea
                      className="form-control"
                      rows="3"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      className="form-control"
                      name="college"
                      placeholder="College"
                      value={formData.college}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      className="form-control"
                      name="qualification"
                      placeholder="Qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn register-btn text-white w-100 py-2"
                    >
                      Register Here
                    </button>
                  </div>
                </div>
              </form>

              <p className="text-center mt-3">
                Already have an account? <Link to="/">Login</Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
