import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import './GetExam.css';

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
      alert('Your Exam was submitted successfully!');
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
    <div className="container-fluid px-2 px-md-3 my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-9">

          {/* Sticky Timer */}
          <div className="sticky-top mb-3">
            <div className="alert alert-light border-start border-4 border-danger shadow-sm d-flex justify-content-between align-items-center">
              <span className="fw-semibold">⏰ Time Left</span>
              <span className="fw-bold text-danger fs-5">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Exam Info */}
          <div className="card shadow-sm mb-4">
            <div className="card-body text-center">
              <h2 className="fw-bold text-primary mb-3">
                {exam.title}
              </h2>

              <div className="row g-3">
                <div className="col-12 col-md-4">
                  <div className="info-box">
                    <div className="text-muted">Duration</div>
                    <div className="fw-bold">{exam.duration} mins</div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="info-box">
                    <div className="text-muted">Total Marks</div>
                    <div className="fw-bold">{exam.totalMarks}</div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="info-box">
                    <div className="text-muted">Passing Marks</div>
                    <div className="fw-bold">{exam.passingMarks}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!submitted ? (
            <>
              {!testStarted && (
                <div className="alert alert-warning text-center">
                  ⚠ Click any option to start the exam timer
                </div>
              )}

              {/* Questions */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                {Array.isArray(questions) &&
                  questions.map((q, index) => (
                    <div
                      key={q._id}
                      className="card question-card shadow-sm mb-3"
                    >
                      <div className="card-body">
                        <h5 className="fw-semibold mb-3">
                          Q{index + 1}. {q.question}
                        </h5>

                        {[q.optionA, q.optionB, q.optionC, q.optionD].map(
                          (opt, i) => (
                            <label
                              key={i}
                              className="option-item d-flex align-items-center"
                            >
                              <input
                                type="radio"
                                className="form-check-input me-2"
                                name={`question-${q._id}`}
                                value={opt}
                                checked={answers[q._id] === opt}
                                onChange={() =>
                                  handleAnswerChange(q._id, opt)
                                }
                                disabled={submitted}
                              />
                              <span>{opt}</span>
                            </label>
                          )
                        )}
                      </div>
                    </div>
                  ))}

                {/* Submit */}
                <div className="text-center my-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg px-5 w-100 w-md-auto"
                    disabled={submitted}
                  >
                    🚀 Submit Exam
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* Result */
            <div className="card shadow text-center p-4">
              <h4 className="fw-bold mb-3">Exam Result</h4>
              <p className="fs-5">
                <strong>Score:</strong> {result?.score}
              </p>
              <span
                className={`badge fs-6 ${result?.passed ? "bg-success" : "bg-danger"
                  }`}
              >
                {result?.passed ? "Passed" : "Failed"}
              </span>
            </div>
          )}

        </div>
      </div>
    </div>


  );
};

export default GetExam;
