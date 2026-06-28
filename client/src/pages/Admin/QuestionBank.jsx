import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

const QuestionBank = () => {
  const [formData, setFormdata] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
    subject: "",
  });

  const [subjects, setSubjects] = useState([]);
  const [id, setId] = useState({ id: '' });
  const [editform, setEditForm] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(""); // search state
  const [perPage, setPerPage] = useState(5); // items per page
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editform) {
        const res = await axios.put(`https://examprep-bxeo.onrender.com/api/question/${id.id}`, formData);
        if (res) {
          toast.success('Question updated successfully');
        }
      } else {
        const res = await axios.post('https://examprep-bxeo.onrender.com/api/question', formData);
        if (res) {
          toast.success('Question added successfully');
        }
      }

      setFormdata({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
        subject: "",
      });
      setEditForm(false);
      setId({ id: '' });
      handlefetch();
    } catch (err) {
      console.log(err);
      toast.error("Sorry, try again later");
    }
  };

  const handlefetch = async () => {
    const res = await axios.get('https://examprep-bxeo.onrender.com/api/question');
    setData(res.data.data);

    const res1 = await axios.get('https://examprep-bxeo.onrender.com/api/subject');
    setSubjects(res1.data.data);
  };

  useEffect(() => {
    handlefetch();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`https://examprep-bxeo.onrender.com/api/question/${id}`);
      if (res) {
        toast.success("Deleted Successfully");
        handlefetch();
      }
    } catch (err) {
      toast.error("Try Again Later");
    }
  };

  const handleEdit = (q) => {
    setFormdata({
      question: q.question,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      correctAnswer: q.correctAnswer,
      subject: q.subject?._id || "",
    });
    setId({ id: q._id });
    setEditForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🔎 Filter data by search keyword
  const filteredData = data.filter(q => {
    const keyword = search.toLowerCase();
    return (
      q.question.toLowerCase().includes(keyword) ||
      q.optionA.toLowerCase().includes(keyword) ||
      q.optionB.toLowerCase().includes(keyword) ||
      q.optionC.toLowerCase().includes(keyword) ||
      q.optionD.toLowerCase().includes(keyword) ||
      q.correctAnswer.toLowerCase().includes(keyword) ||
      (q.subject?.subjectname?.toLowerCase().includes(keyword))
    );
  });

  // 📑 Pagination
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / perPage);

  return (
    <div className="container-fluid p-2">

      {/* ================= ADD / EDIT QUESTION ================= */}

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
                  <i className="fa-solid fa-circle-question text-white fs-3"></i>
                </div>

                <div>
                  <h3
                    className="fw-bold mb-0"
                    style={{ color: "#312E81" }}
                  >
                    {editform ? "Edit Question" : "Add Question"}
                  </h3>

                  <small className="text-muted">
                    Manage question bank efficiently
                  </small>
                </div>

              </div>

              <form onSubmit={handleSubmit}>

                {/* Question */}
                <div className="mb-4">
                  <label className="fw-semibold mb-2">
                    Question
                  </label>

                  <textarea
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    className="form-control shadow-sm"
                    rows="3"
                    placeholder="Enter Question Here..."
                    required
                    style={{
                      borderRadius: "15px"
                    }}
                  />
                </div>

                {/* Option A B */}
                <div className="row g-3">

                  <div className="col-md-6">
                    <input
                      type="text"
                      name="optionA"
                      value={formData.optionA}
                      onChange={handleChange}
                      className="form-control shadow-sm"
                      placeholder="Option A"
                      required
                      style={{
                        borderRadius: "15px",
                        height: "55px"
                      }}
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      name="optionB"
                      value={formData.optionB}
                      onChange={handleChange}
                      className="form-control shadow-sm"
                      placeholder="Option B"
                      required
                      style={{
                        borderRadius: "15px",
                        height: "55px"
                      }}
                    />
                  </div>

                </div>

                {/* Option C D */}
                <div className="row g-3 mt-1">

                  <div className="col-md-6">
                    <input
                      type="text"
                      name="optionC"
                      value={formData.optionC}
                      onChange={handleChange}
                      className="form-control shadow-sm"
                      placeholder="Option C"
                      required
                      style={{
                        borderRadius: "15px",
                        height: "55px"
                      }}
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      name="optionD"
                      value={formData.optionD}
                      onChange={handleChange}
                      className="form-control shadow-sm"
                      placeholder="Option D"
                      required
                      style={{
                        borderRadius: "15px",
                        height: "55px"
                      }}
                    />
                  </div>

                </div>

                {/* Correct Answer + Subject */}
                <div className="row g-3 mt-1">

                  <div className="col-md-6">

                    <input
                      name="correctAnswer"
                      value={formData.correctAnswer}
                      onChange={handleChange}
                      className="form-control shadow-sm"
                      placeholder="Correct Answer"
                      required
                      style={{
                        borderRadius: "15px",
                        height: "55px"
                      }}
                    />

                  </div>

                  <div className="col-md-6">

                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-select shadow-sm"
                      required
                      style={{
                        borderRadius: "15px",
                        height: "55px"
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

                </div>

                <button
                  type="submit"
                  className="btn text-white mt-4 px-4 py-3 fw-semibold"
                  style={{
                    background:
                      "linear-gradient(90deg,#4F46E5,#7C3AED)",
                    borderRadius: "15px"
                  }}
                >
                  <i className="fa-solid fa-floppy-disk me-2"></i>

                  {editform
                    ? "Update Question"
                    : "Add Question"}
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>

      {/* ================= QUESTION LIST ================= */}
      <div
        className="card border-0 shadow-lg mt-4"
        style={{
          borderRadius: "25px",
          background: "rgba(255,255,255,.96)"
        }}
      >
        <div className="card-body p-4">

          {/* Header */}
          <div className="row align-items-center g-3 mb-4">

            {/* Left Side */}
            <div className="col-lg-5">

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
                  <i className="fa-solid fa-list text-white fs-3"></i>
                </div>

                <div>

                  <h3
                    className="fw-bold mb-0"
                    style={{
                      color: "#312E81"
                    }}
                  >
                    Question List
                  </h3>

                  <small className="text-muted">
                    Manage all questions easily
                  </small>

                </div>

              </div>

            </div>

            {/* Search */}
            <div className="col-lg-4">

              <div className="position-relative">

                <i
                  className="fa-solid fa-magnifying-glass position-absolute"
                  style={{
                    top: "20px",
                    left: "18px",
                    color: "#6c757d"
                  }}
                ></i>

                <input
                  type="text"
                  className="form-control shadow-sm ps-5"
                  placeholder="Search Question..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    borderRadius: "15px",
                    height: "55px"
                  }}
                />

              </div>

            </div>

            {/* Per Page */}
            <div className="col-lg-3">

              <select
                className="form-select shadow-sm"
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                style={{
                  borderRadius: "15px",
                  height: "55px"
                }}
              >
                <option value="5">
                  Show 5
                </option>

                <option value="10">
                  Show 10
                </option>

                <option value="20">
                  Show 20
                </option>

              </select>

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
                  <th>Question</th>
                  <th>Subject</th>
                  <th>Option A</th>
                  <th>Option B</th>
                  <th>Option C</th>
                  <th>Option D</th>
                  <th>Correct Answer</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {currentData.length > 0 ? (

                  currentData.map((q, index) => (

                    <tr key={q._id}>

                      <td className="fw-semibold">
                        {indexOfFirst + index + 1}
                      </td>

                      {/* Question */}
                      <td className="text-start fw-semibold">
                        {q.question}
                      </td>

                      {/* Subject */}
                      <td>
                        <span
                          className="badge px-3 py-2"
                          style={{
                            background:
                              "linear-gradient(90deg,#4F46E5,#7C3AED)",
                            fontSize: "14px"
                          }}
                        >
                          {q.subject?.subjectname}
                        </span>
                      </td>

                      {/* Options */}
                      <td>{q.optionA}</td>
                      <td>{q.optionB}</td>
                      <td>{q.optionC}</td>
                      <td>{q.optionD}</td>

                      {/* Correct Answer */}
                      <td>
                        <span
                          className="badge bg-success px-3 py-2"
                        >
                          {q.correctAnswer}
                        </span>
                      </td>

                      {/* Action */}
                      <td>

                        <div className="d-flex gap-2 justify-content-center flex-wrap">

                          <button
                            className="btn btn-sm text-white px-3"
                            style={{
                              background:
                                "linear-gradient(90deg,#4F46E5,#7C3AED)",
                              borderRadius: "10px"
                            }}
                            onClick={() => handleEdit(q)}
                          >
                            <i className="fa-solid fa-pen-to-square me-1"></i>
                            Edit
                          </button>

                          <button
                            className="btn btn-danger btn-sm px-3"
                            style={{
                              borderRadius: "10px"
                            }}
                            onClick={() => handleDelete(q._id)}
                          >
                            <i className="fa-solid fa-trash me-1"></i>
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td colSpan="9">

                      <div className="text-center py-5">

                        <i
                          className="fa-solid fa-circle-question mb-3"
                          style={{
                            fontSize: "60px",
                            color: "#7C3AED"
                          }}
                        ></i>

                        <h5 className="text-muted">
                          No Questions Found
                        </h5>

                        <p className="text-secondary">
                          Add new questions or try another search.
                        </p>

                      </div>

                    </td>

                  </tr>

                )}

              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap mt-4">

            <button
              className="btn text-white px-4"
              style={{
                background:
                  "linear-gradient(90deg,#4F46E5,#7C3AED)",
                borderRadius: "12px"
              }}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <i className="fa-solid fa-angle-left me-2"></i>
              Previous
            </button>

            <div
              className="fw-bold px-4 py-2 shadow-sm"
              style={{
                borderRadius: "15px",
                background: "#f5f3ff",
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
                borderRadius: "12px"
              }}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
              <i className="fa-solid fa-angle-right ms-2"></i>
            </button>

          </div>

        </div>
      </div>
    </div>
    // </div>

    // </div>

  );
};

export default QuestionBank;
