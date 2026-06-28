import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";

const Report = () => {
  const [data, setData] = useState([]);

  const handlefetch = async () => {
    try {
      const res = await axios.get('https://examprep-bxeo.onrender.com/api/exams/report');
      setData(res.data);
    } catch (er) {
      toast.warning("Sorry, fetching reports failed");
    }
  };

  useEffect(() => {
    handlefetch();
  }, []);

  const handlePrint = (item) => {
    const percentage = ((item.score / item.totalMarks) * 100).toFixed(2);

    const printWindow = window.open("", "", "width=1000,height=800");
    printWindow.document.write(`
<html>
<head>
<title>Exam Result</title>

<style>

body{
font-family:'Times New Roman',serif;
padding:40px;
color:#000;
}

.header{
text-align:center;
border-bottom:3px solid black;
padding-bottom:10px;
margin-bottom:20px;
}

.header h1{
font-size:30px;
margin:0;
}

.header h2{
font-size:20px;
margin:8px 0;
}

.header p{
margin:3px 0;
}

.info{
margin-top:20px;
}

.info table{
width:100%;
border-collapse:collapse;
}

.info td{
padding:8px;
}

.result{
margin-top:30px;
width:100%;
border-collapse:collapse;
}

.result th,
.result td{
border:1px solid black;
padding:10px;
text-align:center;
}

.result th{
background:#ececec;
}

.footer{
margin-top:80px;
display:flex;
justify-content:space-between;
}

.sign{
width:200px;
text-align:center;
}

.line{
border-top:1px solid black;
margin-bottom:8px;
}

</style>
</head>

<body>

<div class="header">

<h1>ExamPrep AI</h1>

<h2>Statement of Examination Result</h2>

<p>Academic Session 2025-26</p>

</div>

<div class="info">

<table>

<tr>
<td><b>Student Name :</b></td>
<td>${item.examineeName}</td>

<td><b>Email :</b></td>
<td>${item.examineeEmail}</td>
</tr>

<tr>
<td><b>Examination :</b></td>
<td>${item.examTitle}</td>

<td><b>Date :</b></td>
<td>${new Date(item.attemptedAt).toLocaleDateString()}</td>
</tr>

</table>

</div>

<table class="result">

<tr>
<th>Total Marks</th>
<th>Passing Marks</th>
<th>Obtained Marks</th>
<th>Percentage</th>
<th>Result</th>
</tr>

<tr>
<td>${item.totalMarks}</td>
<td>${item.passingMarks}</td>
<td>${item.score}</td>
<td>${((item.score / item.totalMarks) * 100).toFixed(2)}%</td>
<td>${item.status}</td>
</tr>

</table>

<div class="footer">

<div class="sign">
<div class="line"></div>
Student Signature
</div>

<div class="sign">
<div class="line"></div>
Controller of Examination
</div>

</div>

</body>
</html>
`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="container-fluid p-3">

      <div
        className="card border-0 shadow-lg"
        style={{
          borderRadius: "25px",
          background: "rgba(255,255,255,.95)"
        }}
      >
        <div className="card-body">

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">

            <div className="d-flex align-items-center">
              <div
                className="rounded-circle d-flex justify-content-center align-items-center me-3"
                style={{
                  width: "60px",
                  height: "60px",
                  background:
                    "linear-gradient(90deg,#4F46E5,#7C3AED)"
                }}
              >
                <i className="fa-solid fa-chart-column text-white fs-3"></i>
              </div>

              <div>
                <h3
                  className="fw-bold mb-0"
                  style={{ color: "#312E81" }}
                >
                  Examinee Results
                </h3>

                <small className="text-muted">
                  View and print student results
                </small>
              </div>
            </div>

            <span
              className="badge fs-6 px-3 py-2"
              style={{
                background:
                  "linear-gradient(90deg,#4F46E5,#7C3AED)"
              }}
            >
              Total Records : {data.length}
            </span>

          </div>

          {/* Table */}
          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead
                className="text-white"
                style={{
                  background:
                    "linear-gradient(90deg,#4F46E5,#7C3AED)"
                }}
              >
                <tr>
                  <th>S.No.</th>
                  <th>Exam Name</th>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Total</th>
                  <th>Passing</th>
                  <th>Score</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {data.length > 0 ? (

                  data.map((item, i) => (

                    <tr key={item._id}>

                      <td>{i + 1}</td>

                      <td className="fw-bold text-primary">
                        {item.examTitle}
                      </td>

                      <td>{item.examineeName}</td>

                      <td className="text-break">
                        {item.examineeEmail}
                      </td>

                      <td>
                        <span className="badge bg-info px-3 py-2">
                          {item.totalMarks}
                        </span>
                      </td>

                      <td>
                        <span className="badge bg-warning text-dark px-3 py-2">
                          {item.passingMarks}
                        </span>
                      </td>

                      <td>
                        <span className="badge bg-secondary px-3 py-2">
                          {item.score}
                        </span>
                      </td>

                      <td>

                        <span
                          className={`badge px-3 py-2 ${item.status === "Pass"
                            ? "bg-success"
                            : "bg-danger"
                            }`}
                        >
                          {item.status}
                        </span>

                      </td>

                      <td>
                        {new Date(item.attemptedAt).toLocaleDateString()}
                      </td>

                      <td>

                        <button
                          className="btn btn-sm text-white"
                          style={{
                            background:
                              "linear-gradient(90deg,#4F46E5,#7C3AED)",
                            borderRadius: "10px"
                          }}
                          onClick={() => handlePrint(item)}
                        >
                          <i className="fa-solid fa-print me-2"></i>
                          Print
                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td colSpan="10">

                      <div className="text-center py-5">

                        <i
                          className="fa-solid fa-file-circle-xmark mb-3"
                          style={{
                            fontSize: "70px",
                            color: "#7C3AED"
                          }}
                        ></i>

                        <h4 className="text-secondary">
                          No Records Found
                        </h4>

                        <p className="text-muted">
                          Result data will appear here.
                        </p>

                      </div>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>
      </div>

    </div>

  );
};

export default Report;
