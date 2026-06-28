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

      const examineId = localStorage.getItem("userId");

      console.log("USER ID =", examineId);

      const res = await axios.get(
        `https://examprep-bxeo.onrender.com/api/dashboard/examinee-result/${examineId}`
      );

      console.log(res.data);

      setTotalExams(res.data.totalExams);
      setPassed(res.data.passed);
      setFailed(res.data.failed);

      console.log("USER ID =", examineId);
      console.log(res.data);

    } catch (error) {

      console.log(error);

    }
  };
  

  


  const percentage = totalExams
    ? Math.round((passed / totalExams) * 100)
    : 0;

  return (
    // <div className="dashboard-bg">
    //   <div className="container py-4">

    //     <h3 className="fw-bold text-primary mb-4">
    //       👋 Welcome Back
    //     </h3>

    //     {/* Stats Cards */}
    //     <div className="row g-3 mb-4">

    //       <div className="col-12 col-md-4">
    //         <div className="card shadow-sm text-center">
    //           <div className="card-body">
    //             <i className="fa-solid fa-file-lines fa-2x text-primary mb-2"></i>
    //             <h6>Total Exams</h6>
    //             <h2 className="fw-bold">{totalExams}</h2>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="col-12 col-md-4">
    //         <div className="card shadow-sm text-center">
    //           <div className="card-body">
    //             <i className="fa-solid fa-circle-check fa-2x text-success mb-2"></i>
    //             <h6>Passed</h6>
    //             <h2 className="fw-bold text-success">{passed}</h2>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="col-12 col-md-4">
    //         <div className="card shadow-sm text-center">
    //           <div className="card-body">
    //             <i className="fa-solid fa-circle-xmark fa-2x text-danger mb-2"></i>
    //             <h6>Failed</h6>
    //             <h2 className="fw-bold text-danger">{failed}</h2>
    //           </div>
    //         </div>
    //       </div>

    //     </div>

    //     {/* Performance */}
    //     <div className="card shadow-sm mb-4">
    //       <div className="card-body">
    //         <h6 className="fw-bold mb-2">Overall Performance</h6>
    //         <div className="progress" style={{ height: "22px" }}>
    //           <div
    //             className={`progress-bar ${percentage >= 50 ? "bg-success" : "bg-danger"}`}
    //             style={{ width: `${percentage}%` }}
    //           >
    //             {percentage}%
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Recent Activities */}
    //     <div className="card shadow-sm">
    //       <div className="card-body">
    //         <h6 className="fw-bold mb-3">🕒 Recent Activities</h6>

    //         <ul className="list-group list-group-flush">
    //           <li className="list-group-item d-flex justify-content-between">
    //             <span>📝 Exam Attempted</span>
    //             <small className="text-muted">Just now</small>
    //           </li>
    //           <li className="list-group-item d-flex justify-content-between">
    //             <span>🏆 Result Declared</span>
    //             <small className="text-muted">1 hour ago</small>
    //           </li>
    //           <li className="list-group-item d-flex justify-content-between">
    //             <span>✅ Passed Mathematics Exam</span>
    //             <small className="text-muted">Yesterday</small>
    //           </li>
    //           <li className="list-group-item d-flex justify-content-between">
    //             <span>👤 Profile Updated</span>
    //             <small className="text-muted">2 days ago</small>
    //           </li>
    //         </ul>

    //       </div>
    //     </div>

    //   </div>
    // </div>

    <div
      className="dashboard-bg"
      style={{
        minHeight: "100vh",
        background: "#f4f7fe"
      }}
    >
      <div className="container-fluid py-4">

        {/* Welcome Card */}
        <div
          className="card border-0 shadow-lg mb-4"
          style={{
            borderRadius: "25px",
            background: "linear-gradient(90deg,#4F46E5,#7C3AED)"
          }}
        >
          <div className="card-body">

            <h2 className="text-white fw-bold">
              👋 Welcome Back
            </h2>

            <p className="text-light mb-0">
              Track your exams and performance
            </p>

          </div>
        </div>


        {/* Statistics */}
        <div className="row g-4 mb-4">

          <div className="col-md-4">
            <div className="card border-0 shadow h-100 rounded-4">
              <div className="card-body d-flex align-items-center">

                <div
                  className="rounded-circle d-flex justify-content-center align-items-center"
                  style={{
                    width: "70px",
                    height: "70px",
                    background: "#EEF2FF"
                  }}
                >
                  <i className="fa-solid fa-file-lines fs-2 text-primary"></i>
                </div>

                <div className="ms-4">
                  <h2 className="fw-bold">{totalExams}</h2>
                  <h6 className="text-muted">Total Exams</h6>
                </div>

              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow h-100 rounded-4">
              <div className="card-body d-flex align-items-center">

                <div
                  className="rounded-circle d-flex justify-content-center align-items-center"
                  style={{
                    width: "70px",
                    height: "70px",
                    background: "#DCFCE7"
                  }}
                >
                  <i className="fa-solid fa-circle-check fs-2 text-success"></i>
                </div>

                <div className="ms-4">
                  <h2 className="fw-bold">{passed}</h2>
                  <h6 className="text-muted">Passed Exams</h6>
                </div>

              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow h-100 rounded-4">
              <div className="card-body d-flex align-items-center">

                <div
                  className="rounded-circle d-flex justify-content-center align-items-center"
                  style={{
                    width: "70px",
                    height: "70px",
                    background: "#FEE2E2"
                  }}
                >
                  <i className="fa-solid fa-circle-xmark fs-2 text-danger"></i>
                </div>

                <div className="ms-4">
                  <h2 className="fw-bold">{failed}</h2>
                  <h6 className="text-muted">Failed Exams</h6>
                </div>

              </div>
            </div>
          </div>

        </div>


        {/* Performance Card */}
        <div className="card border-0 shadow rounded-4 mb-4">
          <div className="card-body">

            <h5 className="fw-bold mb-4">
              Overall Performance
            </h5>

            <div className="progress" style={{ height: "25px" }}>

              <div
                className={`progress-bar fw-bold ${percentage >= 50 ? "bg-success" : "bg-danger"
                  }`}
                style={{ width: `${percentage}%` }}
              >
                {percentage}%
              </div>

            </div>

          </div>
        </div>


        {/* Bottom Cards */}
        <div className="row g-4">

          {/* Recent Activities */}
          <div className="col-lg-7">

            <div className="card border-0 shadow rounded-4 h-100">

              <div className="card-body">

                <h5 className="fw-bold mb-4">
                  🕒 Recent Activities
                </h5>

                <div className="list-group">

                  <div className="list-group-item border-0">
                    📝 Exam Attempted
                    <small className="float-end text-muted">
                      Just Now
                    </small>
                  </div>

                  <div className="list-group-item border-0">
                    🏆 Result Declared
                    <small className="float-end text-muted">
                      1 Hour Ago
                    </small>
                  </div>

                  <div className="list-group-item border-0">
                    ✅ Passed Mathematics Exam
                    <small className="float-end text-muted">
                      Yesterday
                    </small>
                  </div>

                  <div className="list-group-item border-0">
                    👤 Profile Updated
                    <small className="float-end text-muted">
                      2 Days Ago
                    </small>
                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* Performance Summary */}
          <div className="col-lg-5">

            <div className="card border-0 shadow rounded-4 h-100">

              <div className="card-body text-center">

                <i
                  className="fa-solid fa-trophy"
                  style={{
                    fontSize: "80px",
                    color: "#F59E0B"
                  }}
                ></i>

                <h3 className="fw-bold mt-4">
                  Keep Improving 🚀
                </h3>

                <p className="text-muted">
                  Complete more exams and improve your overall score.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default UserHome;
