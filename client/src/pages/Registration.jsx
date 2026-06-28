import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { toast } from "react-toastify";

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
      toast.success("Examinee Registered!");
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
      toast.error("Registration Failed");
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
          className="row justify-content-center"
        >
          <div className="col-lg-8 col-md-10">
            <div
              className="card border-0 shadow-lg rounded-4"
              style={{
                maxWidth: "850px",
                width: "100%",
                background: "rgba(255,255,255,.97)"
              }}
            >
              <div className="card-body p-4 p-md-5">

                <div className="text-center mb-4">
                  <h2 className="fw-bold text-dark">
                    Create Account 
                  </h2>

                  <p className="text-secondary">
                    Start your learning journey with ExamPrep AI
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">

                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control form-control-lg rounded-3"
                        placeholder="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="email"
                        className="form-control form-control-lg rounded-3"
                        placeholder="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control form-control-lg rounded-3"
                        placeholder="Phone Number"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <select
                        className="form-control form-control-lg rounded-3"
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

                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control form-control-lg rounded-3"
                        placeholder="College"
                        name="college"
                        value={formData.college}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control form-control-lg rounded-3"
                        placeholder="Qualification"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <input
                        type="password"
                        className="form-control form-control-lg rounded-3"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <textarea
                        className="form-control form-control-lg rounded-3"
                        rows="3"
                        placeholder="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <button
                        className="btn w-100 py-3 fw-semibold rounded-3"
                        style={{
                          background: "linear-gradient(90deg,#4F46E5,#7C3AED)",
                          color: "#fff"
                        }}
                      >
                        Register Here
                      </button>
                    </div>

                  </div>
                </form>

                <div className="text-center mt-4">
                  <span className="text-muted">
                    Already have an account?
                  </span>

                  <Link
                    to="/"
                    className="text-decoration-none fw-semibold ms-2"
                  >
                    Sign In
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default Registration;
