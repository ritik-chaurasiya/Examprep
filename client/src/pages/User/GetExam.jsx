import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from "react-toastify";
// import './GetExam.css';

const GetExam = () => {
  const { id: examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [testStarted, setTestStarted] = useState(false);
  const email = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await axios.get(`https://examprep-bxeo.onrender.com/api/exams/exam/${examId}`);

        const examData = res.data?.exam || null;
        const questionData = Array.isArray(res.data?.questions) ? res.data.questions : [];

        setExam(examData);
        setQuestions(questionData);
        setTimeLeft(parseInt(examData?.duration || 0) * 60);
      } catch (err) {
        console.error('Error fetching exam:', err);
        setError(err.response?.data?.error || 'Failed to load exam');
      }
    };

    fetchExam();
  }, [examId]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || submitted || !testStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted, testStarted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    if (!testStarted) setTestStarted(true);
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (submitted) return;

    try {
      const res = await axios.post('https://examprep-bxeo.onrender.com/api/exams/submit-exam', {
        examId,
        answers,
        email,
      });

      setResult(res.data);
      setSubmitted(true);
      toast.success('Your Exam was submitted successfully!');
      navigate('/userdash/profile');
    } catch (err) {
      console.error('Error submitting exam:', err);
      setError(err.response?.data?.error || 'Failed to submit exam');
    }
  };

  if (error) {
    return <div className="alert alert-danger m-4">{error}</div>;
  }

  if (!exam || !Array.isArray(questions) || questions.length === 0) {
    return <div className="text-center m-4">Loading exam...</div>;
  }

  return (
    <div
      className="container-fluid py-4"
      style={{
        background: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      {/* ================= Header ================= */}

      <div
        className="card border-0 shadow-lg mb-4"
        style={{
          borderRadius: "25px",
          background: "linear-gradient(90deg,#4F46E5,#7C3AED)",
        }}
      >
        <div className="card-body">

          <div className="row align-items-center">

            <div className="col-lg-8">

              <h2 className="text-white fw-bold mb-2">
                <i className="fa-solid fa-graduation-cap me-2"></i>

                {exam.title}
              </h2>

              <p className="text-white-50 mb-0">
                Read every question carefully before submitting your examination.
              </p>

            </div>

            <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">

              <span
                className="badge bg-white px-4 py-3 fs-6"
                style={{
                  color: "#4F46E5",
                  borderRadius: "30px",
                }}
              >
                <i className="fa-solid fa-file-lines me-2"></i>

                {questions.length} Questions

              </span>

            </div>

          </div>

        </div>
      </div>

      {/* ================= Timer ================= */}

      <div className="sticky-top mb-4">

        <div
          className="card border-0 shadow"
          style={{
            borderRadius: "18px",
            borderLeft: "6px solid #7C3AED",
          }}
        >

          <div className="card-body">

            <div className="d-flex justify-content-between align-items-center">

              <h5
                className="fw-bold mb-0"
                style={{
                  color: "#4F46E5",
                }}
              >
                <i className="fa-solid fa-stopwatch me-2"></i>

                Time Remaining

              </h5>

              <span
                className="badge fs-5 px-4 py-3"
                style={{
                  background: "#FEE2E2",
                  color: "#DC2626",
                  borderRadius: "30px",
                }}
              >
                {formatTime(timeLeft)}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ================= Exam Information ================= */}

      <div className="row g-4 mb-4">

        <div className="col-12 col-md-4">

          <div
            className="card border-0 shadow h-100"
            style={{
              borderRadius: "20px",
            }}
          >

            <div className="card-body text-center">

              <div
                className="rounded-circle mx-auto mb-3 d-flex justify-content-center align-items-center"
                style={{
                  width: "70px",
                  height: "70px",
                  background: "#EEF2FF",
                }}
              >

                <i
                  className="fa-regular fa-clock"
                  style={{
                    color: "#4F46E5",
                    fontSize: "30px",
                  }}
                ></i>

              </div>

              <h6 className="text-muted">
                Duration
              </h6>

              <h3
                className="fw-bold"
                style={{
                  color: "#4F46E5",
                }}
              >
                {exam.duration} Min
              </h3>

            </div>

          </div>

        </div>

        <div className="col-12 col-md-4">

          <div
            className="card border-0 shadow h-100"
            style={{
              borderRadius: "20px",
            }}
          >

            <div className="card-body text-center">

              <div
                className="rounded-circle mx-auto mb-3 d-flex justify-content-center align-items-center"
                style={{
                  width: "70px",
                  height: "70px",
                  background: "#F3E8FF",
                }}
              >

                <i
                  className="fa-solid fa-award"
                  style={{
                    color: "#7C3AED",
                    fontSize: "30px",
                  }}
                ></i>

              </div>

              <h6 className="text-muted">
                Total Marks
              </h6>

              <h3
                className="fw-bold"
                style={{
                  color: "#7C3AED",
                }}
              >
                {exam.totalMarks}
              </h3>

            </div>

          </div>

        </div>

        <div className="col-12 col-md-4">

          <div
            className="card border-0 shadow h-100"
            style={{
              borderRadius: "20px",
            }}
          >

            <div className="card-body text-center">

              <div
                className="rounded-circle mx-auto mb-3 d-flex justify-content-center align-items-center"
                style={{
                  width: "70px",
                  height: "70px",
                  background: "#DCFCE7",
                }}
              >

                <i
                  className="fa-solid fa-circle-check"
                  style={{
                    color: "#16A34A",
                    fontSize: "30px",
                  }}
                ></i>

              </div>

              <h6 className="text-muted">
                Passing Marks
              </h6>

              <h3 className="fw-bold text-success">
                {exam.passingMarks}
              </h3>

            </div>

          </div>

        </div>

      </div>

      {!submitted && !testStarted && (

        <div className="alert alert-warning rounded-4 shadow-sm text-center">

          <i className="fa-solid fa-triangle-exclamation me-2"></i>

          Click any option to start the timer.

        </div>

      )}

      {!submitted && (

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {/* ================= Questions ================= */}

          {Array.isArray(questions) &&
            questions.map((q, index) => (

              <div
                key={q._id}
                className="card border-0 shadow-lg mb-4"
                style={{ borderRadius: "20px" }}
              >

                {/* Question Header */}

                <div
                  className="card-header text-white fw-bold"
                  style={{
                    background: "linear-gradient(90deg,#4F46E5,#7C3AED)",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px"
                  }}
                >

                  <span className="badge bg-white text-primary me-2">
                    Q {index + 1}
                  </span>

                  {q.question}

                </div>

                <div className="card-body">

                  <div className="row g-3">

                    {[
                      { label: "A", value: q.optionA },
                      { label: "B", value: q.optionB },
                      { label: "C", value: q.optionC },
                      { label: "D", value: q.optionD },
                    ].map((option) => (

                      <div
                        className="col-12 col-md-6"
                        key={option.label}
                      >

                        <label
                          className={`card h-100 border-2 ${answers[q._id] === option.value
                            ? "border-primary shadow"
                            : "border-light"
                            }`}
                          style={{
                            cursor: "pointer",
                            borderRadius: "15px"
                          }}
                        >

                          <div className="card-body d-flex align-items-center">

                            <input
                              type="radio"
                              className="form-check-input me-3"
                              name={`question-${q._id}`}
                              value={option.value}
                              checked={answers[q._id] === option.value}
                              onChange={() =>
                                handleAnswerChange(q._id, option.value)
                              }
                            />

                            <span className="fw-semibold">

                              {option.label}. {option.value}

                            </span>

                          </div>

                        </label>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            ))}

          {/* ================= Submit Button ================= */}

          <div className="text-center my-5">

            <button
              type="submit"
              className="btn btn-lg text-white px-5 py-3 rounded-pill shadow"
              style={{
                background:
                  "linear-gradient(90deg,#4F46E5,#7C3AED)",
                minWidth: "250px"
              }}
            >

              <i className="fa-solid fa-paper-plane me-2"></i>

              Submit Exam

            </button>

          </div>

        </form>

      )
      }

      {/* ================= Result ================= */}

      {
        submitted && (

          <div
            className="card border-0 shadow-lg"
            style={{ borderRadius: "25px" }}
          >

            <div className="card-body text-center py-5">

              <i
                className={`fa-solid ${result?.passed
                  ? "fa-circle-check text-success"
                  : "fa-circle-xmark text-danger"
                  }`}
                style={{ fontSize: "90px" }}
              ></i>

              <h2
                className="fw-bold mt-4"
                style={{ color: "#4F46E5" }}
              >
                Exam Completed
              </h2>

              <h3 className="mt-4">

                Score :
                <span className="text-primary ms-2">
                  {result?.score}
                </span>

              </h3>

              <div className="mt-4">

                <span
                  className={`badge fs-5 px-5 py-3 ${result?.passed
                    ? "bg-success"
                    : "bg-danger"
                    }`}
                >

                  {result?.passed
                    ? "PASSED"
                    : "FAILED"}

                </span>

              </div>

            </div>

          </div>

        )
      }

    </div >
  );
};

export default GetExam;
