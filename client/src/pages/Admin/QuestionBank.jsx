import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
          alert('Question updated successfully');
        }
      } else {
        const res = await axios.post('https://examprep-bxeo.onrender.com/api/question', formData);
        if (res) {
          alert('Question added successfully');
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
      alert("Sorry, try again later");
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
        alert("Deleted Successfully");
        handlefetch();
      }
    } catch (err) {
      alert("Try Again Later");
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
      <div className="row">
        <div className="col-12">
          <div className="card border border-2" style={{ borderColor: "#6f42c1" }}>
            <div className="card-body">

              <form onSubmit={handleSubmit}>
                <h5 className="fw-bold mb-3" style={{ color: "#6f42c1" }}>
                  <i className="fa-solid fa-plus me-2"></i>
                  {editform ? "Edit Question" : "Add Question"}
                </h5>

                {/* Question */}
                <div className="mb-3">
                  <label className="fw-semibold">Question</label>
                  <textarea
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Question Here"
                    required
                  />
                </div>

                {/* Options A & B */}
                <div className="row g-2">
                  <div className="col-12 col-md-6">
                    <input
                      type="text"
                      name="optionA"
                      className="form-control"
                      placeholder="a.) Option 1"
                      value={formData.optionA}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <input
                      type="text"
                      name="optionB"
                      className="form-control"
                      placeholder="b.) Option 2"
                      value={formData.optionB}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Options C & D */}
                <div className="row g-2 mt-2">
                  <div className="col-12 col-md-6">
                    <input
                      type="text"
                      name="optionC"
                      className="form-control"
                      placeholder="c.) Option 3"
                      value={formData.optionC}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <input
                      type="text"
                      name="optionD"
                      className="form-control"
                      placeholder="d.) Option 4"
                      value={formData.optionD}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Correct Answer + Subject */}
                <div className="row g-2 mt-2">
                  <div className="col-12 col-md-6">
                    <input
                      name="correctAnswer"
                      className="form-control"
                      placeholder="Correct Option"
                      value={formData.correctAnswer}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select Subject</option>
                      {subjects.map((sub) => (
                        <option key={sub._id} value={sub._id}>
                          {sub.subjectname}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn text-white mt-3"
                  style={{ background: "#39064fff" }}
                >
                  {editform ? "Update Question" : "Add Question"}
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>

      {/* ================= QUESTION LIST ================= */}
      <div className="row mt-3">
        <div className="col-12">
          <div className="card border border-2" style={{ borderColor: "#6f42c1" }}>
            <div className="card-body">

              {/* Header */}
              <div className="row g-2 align-items-center mb-3">
                <div className="col-12 col-md-6">
                  <h3 className="fw-bold mb-0" style={{ color: "#6f42c1" }}>
                    Question List
                  </h3>
                </div>

                <div className="col-12 col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="col-12 col-md-3">
                  <select
                    className="form-select"
                    value={perPage}
                    onChange={(e) => {
                      setPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    <option value="5">5 per page</option>
                    <option value="10">10 per page</option>
                    <option value="20">20 per page</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="table-responsive">
                <table className="table table-bordered table-hover text-center align-middle">
                  <thead style={{ background: "#f2e6ff" }}>
                    <tr>
                      <th>S.No.</th>
                      <th>Question</th>
                      <th>Subject</th>
                      <th>Option 1</th>
                      <th>Option 2</th>
                      <th>Option 3</th>
                      <th>Option 4</th>
                      <th>Correct</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((q, index) => (
                        <tr key={q._id}>
                          <td>{indexOfFirst + index + 1}</td>
                          <td className="text-start">{q.question}</td>
                          <td>{q.subject?.subjectname}</td>
                          <td>{q.optionA}</td>
                          <td>{q.optionB}</td>
                          <td>{q.optionC}</td>
                          <td>{q.optionD}</td>
                          <td>{q.correctAnswer}</td>
                          <td>
                            <div className="d-flex flex-wrap gap-2 justify-content-center">
                              <button
                                className="btn btn-warning btn-sm"
                                onClick={() => handleEdit(q)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(q._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-muted">
                          No matching records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <button
                  className="btn text-white"
                  style={{ background: "#39064fff" }}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  Previous
                </button>

                <span className="fw-semibold">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  className="btn text-white"
                  style={{ background: "#39064fff" }}
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>

  );
};

export default QuestionBank;
