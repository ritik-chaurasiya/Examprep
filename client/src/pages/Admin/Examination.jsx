import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Examination = () => {

  const [formData, setFormData] = useState({
    examName: "",
    date: "",
    time: "",
    duration: "",
    totalMarks: "",
    passingMarks: "",
    sessionId: "",
    status: "Scheduled",
    questionDistribution: [
      {
        subject: "",
        numberOfQuestions: "",
      },
    ],
  });

  const [subjects, setSubjects] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [exams, setExams] = useState([]);

  const [error, setError] = useState("");

  // Edit
  const [isEditing, setIsEditing] = useState(false);
  const [editingExamId, setEditingExamId] = useState(null);

  // Search
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [subjectRes, sessionRes, examRes] =
        await Promise.all([
          axios.get(
            "https://examprep-bxeo.onrender.com/api/subject"
          ),

          axios.get(
            "https://examprep-bxeo.onrender.com/api/session"
          ),

          axios.get(
            "https://examprep-bxeo.onrender.com/api/exams/exams"
          ),
        ]);

      setSubjects(subjectRes.data.data || []);
      setSessions(sessionRes.data.data || []);
      setExams(examRes.data || []);
    } catch (err) {
      console.log(err);

      setError(
        "Failed to load subjects or sessions"
      );
    }
  };

  // Search
  const filteredExams = exams.filter((exam) =>
    exam.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  // Pagination
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;

  const currentExams = filteredExams.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    filteredExams.length / perPage
  );

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // Handle Question Distribution Change
  const handleQuestionDistChange = (index, e) => {
    const updated = [...formData.questionDistribution];

    updated[index][e.target.name] = e.target.value;

    setFormData({
      ...formData,
      questionDistribution: updated,
    });

    setError("");
  };

  // Add Subject Field
  const addDistributionField = () => {
    setFormData({
      ...formData,
      questionDistribution: [
        ...formData.questionDistribution,
        {
          subject: "",
          numberOfQuestions: "",
        },
      ],
    });
  };

  // Remove Subject Field
  const removeDistributionField = (index) => {

    if (formData.questionDistribution.length === 1) {
      setError("At least one subject is required");
      return;
    }

    const updated = [...formData.questionDistribution];

    updated.splice(index, 1);

    setFormData({
      ...formData,
      questionDistribution: updated,
    });
  };

  // Validation
  const validateForm = () => {

    if (
      !formData.examName ||
      !formData.date ||
      !formData.time ||
      !formData.duration ||
      !formData.totalMarks ||
      !formData.passingMarks ||
      !formData.sessionId
    ) {
      return "All fields are required";
    }

    if (
      parseInt(formData.passingMarks) >
      parseInt(formData.totalMarks)
    ) {
      return "Passing marks cannot exceed total marks";
    }

    if (
      formData.questionDistribution.some(
        (item) =>
          !item.subject ||
          !item.numberOfQuestions ||
          parseInt(item.numberOfQuestions) <= 0
      )
    ) {
      return "Invalid question distribution";
    }

    return "";
  };

  // Submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {

      if (isEditing && editingExamId) {

        await axios.put(
          `https://examprep-bxeo.onrender.com/api/exams/${editingExamId}`,
          formData
        );

        toast.success("Exam Updated Successfully");

      } else {

        await axios.post(
          "https://examprep-bxeo.onrender.com/api/exams",
          formData
        );

        toast.success("Exam Created Successfully");
      }

      // Reset Form
      setFormData({
        examName: "",
        date: "",
        time: "",
        duration: "",
        totalMarks: "",
        passingMarks: "",
        sessionId: "",
        status: "Scheduled",
        questionDistribution: [
          {
            subject: "",
            numberOfQuestions: "",
          },
        ],
      });

      setIsEditing(false);
      setEditingExamId(null);

      fetchData();

    } catch (err) {

      console.log(err);

      setError(
        err.response?.data?.error ||
        "Something went wrong"
      );
    }
  };

  // Delete
  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `https://examprep-bxeo.onrender.com/api/exams/${id}`
      );

      toast.success("Deleted Successfully");

      fetchData();

    } catch (err) {

      toast.error("Delete Failed");

      console.log(err);

    }

  };

  // Edit
  const handleEdit = (exam) => {

    setFormData({
      examName: exam.title,
      totalMarks: exam.totalMarks,
      passingMarks: exam.passingMarks,
      date: exam.date,
      time: exam.time,
      duration: exam.duration,
      sessionId: exam.sessionId?._id,
      status: exam.status,
      questionDistribution:
        exam.questionDistribution ||
        [
          {
            subject: "",
            numberOfQuestions: "",
          },
        ],
    });

    setEditingExamId(exam._id);

    setIsEditing(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container-fluid p-3">

      {/* ================= CREATE / EDIT EXAM ================= */}
      <div className="row mb-4">
        <div className="col-12">

          <div
            className="card border-0 shadow-lg"
            style={{
              borderRadius: "25px",
              background: "rgba(255,255,255,.96)"
            }}
          >

            <div className="card-body p-4">

              {/* Header */}
              <div className="d-flex align-items-center mb-4">

                <div
                  className="rounded-circle d-flex justify-content-center align-items-center me-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    background:
                      "linear-gradient(90deg,#4F46E5,#7C3AED)"
                  }}
                >
                  <i className="fa-solid fa-file-pen text-white fs-3"></i>
                </div>

                <div>
                  <h3
                    className="fw-bold mb-0"
                    style={{
                      color: "#312E81"
                    }}
                  >
                    {isEditing
                      ? "Edit Examination"
                      : "Create Examination"}
                  </h3>

                  <small className="text-muted">
                    Manage examination details efficiently
                  </small>

                </div>

              </div>

              {/* Error */}
              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* Row 1 */}
                <div className="row g-3">

                  <div className="col-md-4">

                    <input
                      type="text"
                      name="examName"
                      className="form-control shadow-sm"
                      placeholder="Exam Name"
                      value={formData.examName}
                      onChange={handleChange}
                      required
                      style={{
                        height: "55px",
                        borderRadius: "15px"
                      }}
                    />

                  </div>

                  <div className="col-md-4">

                    <input
                      type="number"
                      name="totalMarks"
                      className="form-control shadow-sm"
                      placeholder="Total Marks"
                      value={formData.totalMarks}
                      onChange={handleChange}
                      required
                      style={{
                        height: "55px",
                        borderRadius: "15px"
                      }}
                    />

                  </div>

                  <div className="col-md-4">

                    <input
                      type="number"
                      name="passingMarks"
                      className="form-control shadow-sm"
                      placeholder="Passing Marks"
                      value={formData.passingMarks}
                      onChange={handleChange}
                      required
                      style={{
                        height: "55px",
                        borderRadius: "15px"
                      }}
                    />

                  </div>

                </div>

                {/* Row 2 */}
                <div className="row g-3 mt-1">

                  <div className="col-md-4">

                    <input
                      type="date"
                      name="date"
                      className="form-control shadow-sm"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      style={{
                        height: "55px",
                        borderRadius: "15px"
                      }}
                    />

                  </div>

                  <div className="col-md-4">

                    <input
                      type="time"
                      name="time"
                      className="form-control shadow-sm"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      style={{
                        height: "55px",
                        borderRadius: "15px"
                      }}
                    />

                  </div>

                  <div className="col-md-4">

                    <input
                      type="number"
                      name="duration"
                      className="form-control shadow-sm"
                      placeholder="Duration (Minutes)"
                      value={formData.duration}
                      onChange={handleChange}
                      required
                      style={{
                        height: "55px",
                        borderRadius: "15px"
                      }}
                    />

                  </div>

                </div>

                {/* Row 3 */}
                <div className="row g-3 mt-1">

                  <div className="col-md-6">

                    <select
                      name="sessionId"
                      className="form-select shadow-sm"
                      value={formData.sessionId}
                      onChange={handleChange}
                      required
                      style={{
                        height: "55px",
                        borderRadius: "15px"
                      }}
                    >

                      <option value="">
                        Select Session
                      </option>

                      {sessions.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.name}
                        </option>
                      ))}

                    </select>

                  </div>

                  <div className="col-md-6">

                    <select
                      name="status"
                      className="form-select shadow-sm"
                      value={formData.status}
                      onChange={handleChange}
                      style={{
                        height: "55px",
                        borderRadius: "15px"
                      }}
                    >

                      <option value="Scheduled">
                        Scheduled
                      </option>

                      <option value="Draft">
                        Draft
                      </option>

                      <option value="Closed">
                        Closed
                      </option>

                    </select>

                  </div>

                </div>
                <hr className="my-4" />

                {/* ================= QUESTION DISTRIBUTION ================= */}

                <div
                  className="card border-0 shadow-sm mt-4"
                  style={{
                    borderRadius: "20px",
                    background: "#f8f9ff"
                  }}
                >
                  <div className="card-body">

                    {/* Heading */}
                    <div className="d-flex align-items-center mb-4">

                      <div
                        className="rounded-circle d-flex justify-content-center align-items-center me-3"
                        style={{
                          width: "50px",
                          height: "50px",
                          background:
                            "linear-gradient(90deg,#4F46E5,#7C3AED)"
                        }}
                      >
                        <i className="fa-solid fa-layer-group text-white"></i>
                      </div>

                      <div>
                        <h4
                          className="fw-bold mb-0"
                          style={{ color: "#312E81" }}
                        >
                          Question Distribution
                        </h4>

                        <small className="text-muted">
                          Assign subjects and number of questions
                        </small>

                      </div>

                    </div>

                    {/* Distribution Fields */}

                    {formData.questionDistribution.map((item, index) => (

                      <div
                        key={index}
                        className="row g-3 align-items-center mb-3"
                      >

                        {/* Subject */}
                        <div className="col-md-6">

                          <select
                            className="form-select shadow-sm"
                            name="subject"
                            value={item.subject}
                            onChange={(e) =>
                              handleQuestionDistChange(index, e)
                            }
                            required
                            style={{
                              height: "55px",
                              borderRadius: "15px"
                            }}
                          >
                            <option value="">
                              Select Subject
                            </option>

                            {subjects.map((sub) => (
                              <option
                                key={sub._id}
                                value={sub._id}
                              >
                                {sub.subjectname}
                              </option>
                            ))}

                          </select>

                        </div>

                        {/* Number */}
                        <div className="col-md-4">

                          <input
                            type="number"
                            className="form-control shadow-sm"
                            placeholder="No. of Questions"
                            name="numberOfQuestions"
                            value={item.numberOfQuestions}
                            onChange={(e) =>
                              handleQuestionDistChange(index, e)
                            }
                            required
                            style={{
                              height: "55px",
                              borderRadius: "15px"
                            }}
                          />

                        </div>

                        {/* Remove */}
                        <div className="col-md-2">

                          <button
                            type="button"
                            className="btn btn-danger w-100"
                            style={{
                              height: "55px",
                              borderRadius: "15px"
                            }}
                            onClick={() =>
                              removeDistributionField(index)
                            }
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>

                        </div>

                      </div>

                    ))}

                    {/* Add Subject */}

                    <button
                      type="button"
                      className="btn text-white mt-2"
                      style={{
                        background:
                          "linear-gradient(90deg,#4F46E5,#7C3AED)",
                        borderRadius: "15px"
                      }}
                      onClick={addDistributionField}
                    >
                      <i className="fa-solid fa-plus me-2"></i>
                      Add Subject
                    </button>

                  </div>
                </div>

                {/* Submit Button */}

                <div className="mt-4">

                  <button
                    type="submit"
                    className="btn text-white px-4 py-3 fw-semibold"
                    style={{
                      background:
                        "linear-gradient(90deg,#4F46E5,#7C3AED)",
                      borderRadius: "15px"
                    }}
                  >
                    <i className="fa-solid fa-floppy-disk me-2"></i>

                    {isEditing
                      ? "Update Examination"
                      : "Create Examination"}

                  </button>

                </div>

              </form>

            </div>
          </div>

        </div>
      </div>

      {/* ================= EXAMINATION DETAILS ================= */}

      <div
        className="card border-0 shadow-lg mt-4"
        style={{
          borderRadius: "25px",
          background: "rgba(255,255,255,.96)"
        }}
      >
        <div className="card-body p-4">

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
                <i className="fa-solid fa-file-lines text-white fs-3"></i>
              </div>

              <div>

                <h3
                  className="fw-bold mb-0"
                  style={{
                    color: "#312E81"
                  }}
                >
                  Examination Details
                </h3>

                <small className="text-muted">
                  Manage created examinations
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
              Total Exams : {filteredExams.length}
            </span>

          </div>

          {/* Search */}
          <div className="row mb-4">

            <div className="col-md-6">

              <div className="position-relative">

                <i
                  className="fa-solid fa-magnifying-glass position-absolute"
                  style={{
                    left: "18px",
                    top: "18px",
                    color: "#6c757d"
                  }}
                ></i>

                <input
                  type="text"
                  className="form-control shadow-sm ps-5"
                  placeholder="Search Examination..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    borderRadius: "15px",
                    height: "55px"
                  }}
                />

              </div>

            </div>

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
                  <th>Total</th>
                  <th>Passing</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Duration</th>
                  <th>Session</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {currentExams.map((exam, index) => (

                  <tr key={exam._id}>

                    <td>{indexOfFirst + index + 1}</td>

                    <td className="fw-bold text-primary">
                      {exam.title}
                    </td>

                    <td>
                      <span className="badge bg-info px-3 py-2">
                        {exam.totalMarks}
                      </span>
                    </td>

                    <td>
                      <span className="badge bg-success px-3 py-2">
                        {exam.passingMarks}
                      </span>
                    </td>

                    <td>{exam.date}</td>

                    <td>{exam.time}</td>

                    <td>{exam.duration} min</td>

                    <td>
                      <span className="badge bg-secondary px-3 py-2">
                        {exam.sessionId?.name || "N/A"}
                      </span>
                    </td>

                    <td>

                      <span
                        className={`badge px-3 py-2 ${exam.status === "Scheduled"
                          ? "bg-success"
                          : exam.status === "Draft"
                            ? "bg-warning text-dark"
                            : "bg-danger"
                          }`}
                      >
                        {exam.status}
                      </span>

                    </td>

                    <td>

                      <div className="d-flex gap-2 justify-content-center flex-wrap">

                        <button
                          className="btn btn-sm text-white"
                          style={{
                            background:
                              "linear-gradient(90deg,#4F46E5,#7C3AED)",
                            borderRadius: "10px"
                          }}
                          onClick={() => handleEdit(exam)}
                        >
                          <i className="fa-solid fa-pen me-1"></i>
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          style={{
                            borderRadius: "10px"
                          }}
                          onClick={() => handleDelete(exam._id)}
                        >
                          <i className="fa-solid fa-trash me-1"></i>
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

                {/* No Data */}
                {currentExams.length === 0 && (
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
                          No Examination Found
                        </h4>

                        <p className="text-muted">
                          Create a new examination to get started.
                        </p>

                      </div>

                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

          {/* Pagination */}

          {totalPages > 1 && (

            <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap mt-4">

              <button
                className="btn text-white px-4"
                style={{
                  background:
                    "linear-gradient(90deg,#4F46E5,#7C3AED)",
                  borderRadius: "15px"
                }}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <i className="fa-solid fa-angle-left me-2"></i>
                Previous
              </button>

              <div
                className="shadow-sm px-4 py-2 fw-bold"
                style={{
                  background: "#f5f3ff",
                  borderRadius: "15px",
                  color: "#312E81"
                }}
              >
                Page {currentPage} of {totalPages}
              </div>

              <button
                className="btn text-white px-4"
                style={{
                  background:
                    "linear-gradient(90deg,#4F46E5,#7C3AED)",
                  borderRadius: "15px"
                }}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
                <i className="fa-solid fa-angle-right ms-2"></i>
              </button>

            </div>

          )}

        </div>
      </div>

    </div>

    // </div >

  );
};

export default Examination;
