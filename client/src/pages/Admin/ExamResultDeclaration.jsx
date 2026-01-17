// https://examprep-bxeo.onrender.comimport React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useState, useEffect } from 'react';

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
    <div className="container-fluid my-3 px-2">

      {/* Heading */}
      <div className="row mb-3">
        <div className="col-12">
          <h2 className="fw-bold" style={{ color: "#6f42c1" }}>
            Exam Results Declaration
          </h2>
        </div>
      </div>

      {/* Alert */}
      {message && (
        <div className="row mb-2">
          <div className="col-12">
            <div
              className={`alert alert-${message.type === "success" ? "success" : "danger"
                }`}
            >
              {message.text}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="row">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle text-center">
              <thead style={{ backgroundColor: "#f2e6ff" }}>
                <tr>
                  <th>S.No</th>
                  <th>Exam Name</th>
                  <th>Exam Date</th>
                  <th style={{ minWidth: "120px" }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {data.length > 0 ? (
                  data.map((examResult, idx) => (
                    <tr key={examResult._id}>
                      <td>{idx + 1}</td>
                      <td className="text-start">
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
                        <div className="d-flex justify-content-center">
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeclare(examResult._id)}
                            disabled={loading}
                          >
                            {loading ? "Declaring..." : "Declare"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-muted">
                      No exam results found
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