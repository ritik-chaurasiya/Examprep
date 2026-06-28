// https://examprep-bxeo.onrender.comimport React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useState, useEffect } from 'react';
// import { toast } from "react-toastify";

const ExamResultsDeclaration = ({ exams }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleDeclare = async (examResultId) => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await axios.post(`https://examprep-bxeo.onrender.com/api/exams/result/${examResultId}`);
      setMessage({ type: 'success', text: response.data.message });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to declare result' });
    } finally {
      setLoading(false);
    }
  };
  const [data, setData] = useState([]);
  const handlefetch = async () => {
    const res = await axios.get('https://examprep-bxeo.onrender.com/api/exams/examination')
    setData(res.data.message);
    console.log(res)
  }
  useEffect(() => {
    handlefetch();
  }, [])
  return (
    <div className="container-fluid p-3">

      {/* Header */}
      <div
        className="card border-0 shadow-lg mb-4"
        style={{
          borderRadius: "20px",
          background: "linear-gradient(135deg,#4F46E5,#7C3AED)"
        }}
      >
        <div className="card-body d-flex justify-content-between align-items-center flex-wrap">

          <div>
            <h2 className="text-white fw-bold mb-1">
              <i className="fa-solid fa-file-circle-check me-2"></i>
              Result Declaration
            </h2>

            <p className="text-light mb-0">
              Publish examination results for students
            </p>
          </div>

          <div
            className="px-4 py-2 bg-white rounded-pill fw-bold"
            style={{ color: "#4F46E5" }}
          >
            Total Exams : {data.length}
          </div>

        </div>
      </div>

      {/* Alert */}
      {message && (
        <div
          className={`alert shadow-sm alert-${message.type === "success" ? "success" : "danger"
            }`}
        >
          {message.text}
        </div>
      )}

      {/* Table Card */}
      <div
        className="card border-0 shadow-lg"
        style={{
          borderRadius: "20px",
          overflow: "hidden"
        }}
      >
        <div className="card-body">

          <div className="table-responsive">

            <table className="table align-middle table-hover">

              <thead
                className="text-white"
                style={{
                  background:
                    "linear-gradient(90deg,#4F46E5,#7C3AED)"
                }}
              >
                <tr>
                  <th>S.No</th>
                  <th>Exam Name</th>
                  <th>Exam Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {data.length > 0 ? (

                  data.map((examResult, idx) => (

                    <tr key={examResult._id}>

                      <td>{idx + 1}</td>

                      <td className="fw-bold text-primary">
                        {examResult.examId?.title || "N/A"}
                      </td>

                      <td>
                        {examResult.examId?.date
                          ? new Date(
                            examResult.examId.date
                          ).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td>

                        <span
                          className={`badge px-3 py-2 ${examResult.resultStatus === "Completed"
                              ? "bg-success"
                              
                            : "bg-warning text-dark"
                            }`}
                        >
                          {examResult.resultStatus}
                        </span>

                      </td>

                      <td>

                        <button
                          className="btn text-white shadow-sm"
                          style={{
                            background:
                              "linear-gradient(90deg,#4F46E5,#7C3AED)",
                            borderRadius: "12px"
                          }}
                          onClick={() =>
                            handleDeclare(examResult._id)
                          }
                          disabled={loading}
                        >
                          <i className="fa-solid fa-bullhorn me-2"></i>

                          {loading
                            ? "Declaring..."
                            : "Declare Result"}

                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td colSpan="5">

                      <div className="text-center py-5">

                        <i
                          className="fa-solid fa-file-circle-xmark mb-3"
                          style={{
                            fontSize: "70px",
                            color: "#7C3AED"
                          }}
                        ></i>

                        <h4 className="text-secondary">
                          No Results Found
                        </h4>

                        <p className="text-muted">
                          Result records will appear here.
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



export default ExamResultsDeclaration;