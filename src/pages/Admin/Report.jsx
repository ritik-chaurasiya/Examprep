import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Report = () => {
  const [data, setData] = useState([]);

  const handlefetch = async () => {
    try {
      const res = await axios.get('https://examprep-bxeo.onrender.com/api/exams/report');
      setData(res.data);
    } catch (er) {
      alert("Sorry, fetching reports failed");
    }
  };

  useEffect(() => {
    handlefetch();
  }, []);

  const handlePrint = (item) => {
    const printWindow = window.open('', '', 'width=900,height=650');
    printWindow.document.write(`
      <html>
        <head>
          <title>Exam Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { color: #6f42c1; }
            table { border-collapse: collapse; width: 100%; margin-top: 20px; }
            td, th { border: 1px solid #6f42c1; padding: 8px; text-align: left; }
            th { background-color: #f3e8ff; }
          </style>
        </head>
        <body>
          <h2>Exam Report - ${item.examTitle}</h2>
          <table>
            <tr><th>Examinee Name</th><td>${item.examineeName}</td></tr>
            <tr><th>Email</th><td>${item.examineeEmail}</td></tr>
            <tr><th>Total Marks</th><td>${item.totalMarks}</td></tr>
            <tr><th>Passing Marks</th><td>${item.passingMarks}</td></tr>
            <tr><th>Score</th><td>${item.score}</td></tr>
            <tr><th>Status</th><td>${item.status}</td></tr>
            <tr><th>Date of Exam</th><td>${item.attemptedAt}</td></tr>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="container-fluid p-2">

      <div className="row">
        <div className="col-12">
          <div
            className="card border border-2 mt-2"
            style={{ borderColor: "#6f42c1" }}
          >
            <div className="card-body">

              {/* Heading */}
              <div className="row mb-3">
                <div className="col-12">
                  <h3 className="fw-bold mb-0" style={{ color: "#6f42c1" }}>
                    Examinee Data
                  </h3>
                </div>
              </div>

              {/* Responsive Table */}
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle text-center">
                  <thead style={{ background: "#f2e6ff" }}>
                    <tr>
                      <th>S.No.</th>
                      <th>Exam Name</th>
                      <th>Examinee</th>
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
                          <td>{item.examTitle}</td>
                          <td>{item.examineeName}</td>
                          <td className="text-break">
                            {item.examineeEmail}
                          </td>
                          <td>{item.totalMarks}</td>
                          <td>{item.passingMarks}</td>
                          <td>{item.score}</td>
                          <td>
                            <span
                              className={`badge ${item.status === "Pass"
                                  ? "bg-success"
                                  : "bg-danger"
                                }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td>{item.attemptedAt}</td>
                          <td>
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => handlePrint(item)}
                            >
                              Print
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10" className="text-muted">
                          No records found
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
};

export default Report;
