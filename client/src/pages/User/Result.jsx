import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Result = () => {
  const [data, setData] = useState([])
  const userId = localStorage.getItem('userId')

  const handlefetch = async () => {
    const res = await axios.get(`https://examprep-bxeo.onrender.com/api/exams/examinee-result/${userId}`);
    console.log("res", res)
    setData(Array.isArray(res.data.message) ? res.data.message : [res.data.message]);
  }

  useEffect(() => {
    handlefetch()
  }, [])

  // Function to print individual result
  const handlePrint = (item) => {
    const printWindow = window.open("", "_blank", "width=800,height=600");

    const percentage = ((item.score / item.totalMarks) * 100).toFixed(2);

    const grade =
      percentage >= 90
        ? "A+"
        : percentage >= 80
          ? "A"
          : percentage >= 70
            ? "B+"
            : percentage >= 60
              ? "B"
              : percentage >= 50
                ? "C"
                : "D";

    printWindow.document.write(`
<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">

<title>ExamPrep AI Result</title>

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
}

body{
font-family:'Segoe UI',sans-serif;
background:#eceff8;
padding:35px;
}

.container{
max-width:900px;
margin:auto;
background:#fff;
border-radius:18px;
overflow:hidden;
box-shadow:0 15px 40px rgba(0,0,0,.15);
}

.header{
background:linear-gradient(135deg,#4F46E5,#7C3AED);
padding:35px;
color:#fff;
position:relative;
}

.header h1{
font-size:34px;
margin-bottom:8px;
letter-spacing:1px;
}

.header h3{
font-size:17px;
font-weight:400;
opacity:.95;
}

.logo{
position:absolute;
right:40px;
top:25px;
font-size:65px;
opacity:.18;
}

.title{
padding:25px;
text-align:center;
border-bottom:3px solid #7C3AED;
}

.title h2{
font-size:30px;
color:#4F46E5;
margin-bottom:8px;
}

.title p{
font-size:15px;
color:#666;
}

.section{
padding:30px;
}

.info-grid{
display:grid;
grid-template-columns:1fr 1fr;
gap:18px;
margin-bottom:30px;
}

.info-card{
background:#f8f9ff;
border-left:5px solid #7C3AED;
padding:15px 20px;
border-radius:10px;
}

.info-card h5{
font-size:14px;
color:#777;
margin-bottom:6px;
}

.info-card p{
font-size:18px;
font-weight:bold;
color:#222;
}

.summary-title{
text-align:center;
font-size:25px;
font-weight:bold;
color:#4F46E5;
margin-bottom:20px;
}

table{
width:100%;
border-collapse:collapse;
margin-top:15px;
}

th{
background:#4F46E5;
color:white;
padding:15px;
font-size:15px;
}

td{
padding:15px;
border:1px solid #ddd;
font-size:15px;
}

tr:nth-child(even){
background:#fafafa;
}

.value{
font-weight:bold;
text-align:center;
}

</style>

</head>

<body>

<div class="container">

<div class="header">

<div class="logo">🎓</div>

<h1>ExamPrep AI</h1>

<h3>Online Examination Management System</h3>

</div>

<div class="title">

<h2>EXAM RESULT SCORE CARD</h2>

<p>This is an official computer generated examination result.</p>

</div>

<div class="section">

<div class="info-grid">

<div class="info-card">

<h5>Candidate Name</h5>

<p>${item.examineeId?.name || item.examineeId}</p>

</div>

<div class="info-card">

<h5>Candidate ID</h5>

<p>${item.examineeId?._id || item.examineeId}</p>

</div>

<div class="info-card">

<h5>Examination</h5>

<p>${item.examId?.title}</p>

</div>

<div class="info-card">

<h5>Date of Examination</h5>

<p>${new Date(item.createdAt).toLocaleDateString()}</p>

</div>

</div>

<div class="summary-title">

Performance Summary

</div>

<table>

<tr>

<th>Description</th>

<th>Details</th>

</tr>

<tr>

<td>Total Marks</td>

<td class="value">${item.totalMarks}</td>

</tr>

<tr>

<td>Obtained Marks</td>

<td class="value">${item.score}</td>

</tr>

<tr>

<td>Passing Marks</td>

<td class="value">${item.passingMarks}</td>

</tr>

<tr>

<td>Percentage</td>

<td class="value">${percentage}%</td>

</tr>

<tr>

<td>Grade</td>

<td class="value">${grade}</td>

</tr>
<tr>

<td><strong>Result</strong></td>

<td class="value">

<span
style="
padding:10px 28px;
border-radius:25px;
color:white;
font-weight:bold;
background:${item.status === "Passed" ? "#198754" : "#dc3545"};
">

${item.status.toUpperCase()}

</span>

</td>

</tr>

</table>

<!-- Remarks -->

<div
style="
margin-top:35px;
padding:20px;
border-radius:12px;
background:${item.status === "Passed" ? "#EAF8EF" : "#FDECEC"};
border-left:6px solid ${item.status === "Passed" ? "#198754" : "#dc3545"};
"
>

<h3
style="
margin-bottom:10px;
color:${item.status === "Passed" ? "#198754" : "#dc3545"};
"
>
${item.status === "Passed"
        ? "🎉 Congratulations!"
        : "⚠ Better Luck Next Time"}
</h3>

<p
style="
font-size:16px;
line-height:1.8;
color:#555;
"
>

${item.status === "Passed"
        ? `Congratulations <strong>${item.examineeId?.name || ""}</strong>,
you have successfully passed the examination with
<strong>${percentage}%</strong>. Keep up the excellent performance and continue
your learning journey with ExamPrep AI.`
        : `You scored <strong>${item.score}</strong> marks (${percentage}%).
Unfortunately, you did not achieve the minimum passing marks.
We encourage you to review the topics and appear again with better preparation.`}

</p>

</div>

<!-- Signature -->

<div
style="
display:flex;
justify-content:space-between;
margin-top:70px;
"
>

<div style="text-align:center;">

<div
style="
width:180px;
border-top:2px solid #444;
padding-top:8px;
font-weight:bold;
"
>

Candidate Signature

</div>

</div>

<div style="text-align:center;">

<div
style="
width:180px;
border-top:2px solid #444;
padding-top:8px;
font-weight:bold;
"
>

Exam Controller

</div>

</div>

</div>

<!-- Footer -->

<div
style="
margin-top:45px;
padding:25px;
background:#F4F4FF;
text-align:center;
border-top:3px solid #7C3AED;
"
>

<h2
style="
color:#4F46E5;
margin-bottom:8px;
"
>

ExamPrep AI

</h2>

<p
style="
color:#666;
margin-bottom:8px;
"
>

Online Examination Management System

</p>

<p
style="
font-size:14px;
color:#888;
"
>

Generated on :
${new Date().toLocaleString()}

</p>

<p
style="
margin-top:12px;
font-size:13px;
color:#999;
"
>

This is a computer-generated examination result.
No signature or seal is required for verification.

</p>

</div>

</div>

<script>

window.onload = function(){

window.print();

window.onafterprint = function(){

window.close();

}

}

</script>

</body>

</html>

`);

    printWindow.document.close();
  }

  return (
    <div
      className="container-fluid py-4"
      style={{
        background: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      <div className="row justify-content-center">

        <div className="col-12">

          {/* Header */}

          <div
            className="card border-0 shadow-lg mb-4"
            style={{
              borderRadius: "25px",
              background: "linear-gradient(90deg,#4F46E5,#7C3AED)",
            }}
          >
            <div className="card-body">

              <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center">

                <div>

                  <h2 className="text-white fw-bold mb-1">
                    <i className="fa-solid fa-trophy me-2"></i>

                    My Results

                  </h2>

                  <p className="text-white-50 mb-0">
                    View all your examination results and print them anytime.
                  </p>

                </div>

                <div className="mt-3 mt-lg-0">

                  <span
                    className="badge bg-white text-primary fs-6 px-4 py-3 rounded-pill"
                  >
                    Total Results : {data.length}
                  </span>

                </div>

              </div>

            </div>
          </div>

          {/* Table Card */}

          <div
            className="card border-0 shadow-lg"
            style={{
              borderRadius: "25px",
            }}
          >
            <div className="card-body">

              <div className="table-responsive">

                <table className="table table-hover align-middle">

                  <thead
                    style={{
                      background: "#EEF2FF",
                    }}
                  >
                    <tr className="text-center">

                      <th>#</th>
                      <th>Exam</th>
                      <th>Student</th>
                      <th>Total</th>
                      <th>Score</th>
                      <th>Passing</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Action</th>

                    </tr>
                  </thead>

                  <tbody>

                    {data.length > 0 ? (

                      data.map((item, i) => (

                        <tr key={item._id}>

                          <td className="fw-bold text-center">
                            {i + 1}
                          </td>

                          <td>

                            <div
                              className="fw-bold"
                              style={{ color: "#4F46E5" }}
                            >
                              {item.examId?.title}
                            </div>

                            <small className="text-muted">
                              Online Examination
                            </small>

                          </td>

                          <td>
                            {item.examineeId?.name || item.examineeId}
                          </td>

                          <td className="text-center">

                            <span className="badge bg-secondary px-3 py-2">
                              {item.totalMarks}
                            </span>

                          </td>

                          <td className="text-center">

                            <span
                              className="badge px-3 py-2"
                              style={{
                                background: "#EEF2FF",
                                color: "#4F46E5",
                              }}
                            >
                              {item.score}
                            </span>

                          </td>

                          <td className="text-center">
                            {item.passingMarks}
                          </td>

                          <td className="text-center">

                            <span
                              className={`badge px-3 py-2 ${item.status === "Passed"
                                ? "bg-success"
                                : "bg-danger"
                                }`}
                            >
                              {item.status}
                            </span>

                          </td>

                          <td className="text-center">

                            {new Date(
                              item.createdAt
                            ).toLocaleDateString()}

                          </td>

                          <td className="text-center">

                            <button
                              className="btn btn-sm text-white"
                              style={{
                                background:
                                  "linear-gradient(90deg,#4F46E5,#7C3AED)",
                              }}
                              onClick={() =>
                                handlePrint(item)
                              }
                            >
                              <i className="fa-solid fa-print me-2"></i>

                              Print

                            </button>

                          </td>

                        </tr>

                      ))

                    ) : (

                      <tr>

                        <td colSpan="9">

                          <div className="text-center py-5">

                            <i
                              className="fa-solid fa-file-circle-xmark mb-3"
                              style={{
                                fontSize: "80px",
                                color: "#7C3AED",
                              }}
                            ></i>

                            <h3
                              className="fw-bold"
                              style={{
                                color: "#4F46E5",
                              }}
                            >
                              No Results Found
                            </h3>

                            <p className="text-muted">
                              Your exam results will appear here after you complete an examination.
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

      </div>
    </div>
  );
}

export default Result
