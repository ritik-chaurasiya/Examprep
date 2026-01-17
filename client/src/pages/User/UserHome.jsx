import React, { useEffect, useState } from "react";
import axios from "axios";

const UserHome = () => {
  const examineId = localStorage.getItem("userId");

  const [totalExams, setTotalExams] = useState(0);
  const [passed, setPassed] = useState(0);
  const [failed, setFailed] = useState(0);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const resultRes = await axios.get(
        `https://examprep-bxeo.onrender.com/api/dashboard/examinee-result/${examineId}`
      );

      console.log("RESULT API:", resultRes.data);

      let results = [];

      // ✅ normalize response
      if (Array.isArray(resultRes.data)) {
        results = resultRes.data;
      } else if (Array.isArray(resultRes.data?.message)) {
        results = resultRes.data.message;
      } else if (typeof resultRes.data?.message === "object") {
        results = [resultRes.data.message];
      }

      const totalAttempted = results.length;

      let passedCount = 0;
      let failedCount = 0;

      results.forEach(r => {
        const status = r.status?.toLowerCase();

        if (status === "passed") passedCount++;
        else if (status === "failed") failedCount++;
      });

      setTotalExams(totalAttempted);
      setPassed(passedCount);
      setFailed(failedCount);

    } catch (error) {
      console.error("Dashboard error:", error);
      setTotalExams(0);
      setPassed(0);
      setFailed(0);
    }
  };


  const percentage = totalExams
    ? Math.round((passed / totalExams) * 100)
    : 0;

  return (
    <div className="dashboard-bg">
      <div className="container py-4">

        <h3 className="fw-bold text-primary mb-4">
          👋 Welcome Back
        </h3>

        {/* Stats Cards */}
        <div className="row g-3 mb-4">

          <div className="col-12 col-md-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <i className="fa-solid fa-file-lines fa-2x text-primary mb-2"></i>
                <h6>Total Exams</h6>
                <h2 className="fw-bold">{totalExams}</h2>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <i className="fa-solid fa-circle-check fa-2x text-success mb-2"></i>
                <h6>Passed</h6>
                <h2 className="fw-bold text-success">{passed}</h2>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <i className="fa-solid fa-circle-xmark fa-2x text-danger mb-2"></i>
                <h6>Failed</h6>
                <h2 className="fw-bold text-danger">{failed}</h2>
              </div>
            </div>
          </div>

        </div>

        {/* Performance */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h6 className="fw-bold mb-2">Overall Performance</h6>
            <div className="progress" style={{ height: "22px" }}>
              <div
                className={`progress-bar ${percentage >= 50 ? "bg-success" : "bg-danger"}`}
                style={{ width: `${percentage}%` }}
              >
                {percentage}%
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="card shadow-sm">
          <div className="card-body">
            <h6 className="fw-bold mb-3">🕒 Recent Activities</h6>

            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <span>📝 Exam Attempted</span>
                <small className="text-muted">Just now</small>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>🏆 Result Declared</span>
                <small className="text-muted">1 hour ago</small>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>✅ Passed Mathematics Exam</span>
                <small className="text-muted">Yesterday</small>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>👤 Profile Updated</span>
                <small className="text-muted">2 days ago</small>
              </li>
            </ul>

          </div>
        </div>

      </div>
    </div>
  );
};

export default UserHome;
