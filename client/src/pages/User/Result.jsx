import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Result = () => {
  const [data, setData] = useState([])
  const userId = localStorage.getItem('userId')

  const handlefetch = async () => {
    const res = await axios.get(`https://examprep-bxeo.onrender.com/api/exams/examinee-result/${userId}`);
    console.log("res",res)
    setData(Array.isArray(res.data.message) ? res.data.message : [res.data.message]);
  }

  useEffect(() => {
    handlefetch()
  }, [])

  // Function to print individual result
  const handlePrint = (item) => {
    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Exam Result - ${item.examId?.title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .card {
              border: 2px solid #6f42c1;
              border-radius: 10px;
              padding: 20px;
              width: 100%;
              box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }
            h2 { text-align: center; color: #6f42c1; margin-bottom: 20px; }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }
            td, th {
              border: 1px solid #6f42c1;
              padding: 10px;
              text-align: center;
            }
            th { background-color: #f2f2f2; }
            .status-pass { color: green; font-weight: bold; }
            .status-fail { color: red; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="card">
            <h2>Softpro India ExamPrep </h2>
            <table>
              <tr><th>Exam Name</th><td>${item.examId?.title}</td></tr>
              <tr><th>Candidate Name</th><td>${item.examineeId?.name || item.examineeId}</td></tr>
              <tr><th>Total Marks</th><td>${item.totalMarks}</td></tr>
              <tr><th>Score</th><td>${item.score}</td></tr>
              <tr><th>Passing Marks</th><td>${item.passingMarks}</td></tr>
              <tr><th>Status</th>
                <td class="${item.status === "Passed" ? "status-pass" : "status-fail"}">
                  ${item.status}
                </td>
              </tr>
              <tr><th>Date</th><td>${new Date(item.createdAt).toLocaleString()}</td></tr>
            </table>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }

  return (
    <div className="row mt-1">
      <div className="col-sm-12">
        <div className="card mx-auto mt-2" style={{ border: "1px solid #6f42c1" }}>
          <div className="card-body">
            <div className="container p-0">
              <h3 className="fw-bold" style={{ color: "#6f42c1" }}>Examinee Result</h3>
              <table className="table table-bordered text-center">
                <thead className="table-secondary">
                  <tr>
                    <td>S.N</td>
                    <td>Exam name</td>
                    <td>Your Name</td>
                    <td>Total Marks</td>
                    <td>Score</td>
                    <td>Passing Marks</td>
                    <td>Status</td>
                    <td>Date</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, i) => (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td>{item.examId?.title}</td>
                      <td>{item.examineeId?.name || item.examineeId}</td>
                      <td>{item.totalMarks}</td>
                      <td>{item.score}</td>
                      <td>{item.passingMarks}</td>
                      <td>
                        <span className={`badge ${item.status === "Passed" ? "bg-success" : "bg-danger"}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>{new Date(item.createdAt).toLocaleString()}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handlePrint(item)}
                        >
                          <i className="fa-solid fa-print me-1"></i> Print
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Result
