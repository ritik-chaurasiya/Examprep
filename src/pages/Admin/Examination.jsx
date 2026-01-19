import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Examination = () => {
  const [formData, setFormData] = useState({
    examName: '',
    date: '',
    time: '',
    duration: '',
    totalMarks: '',
    passingMarks: '',
    sessionId: '',
    status: 'Scheduled',
    questionDistribution: [{ subject: '', numberOfQuestions: '' }],
  });
  const [subjects, setSubjects] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState('');
  const [exams, setExams] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingExamId, setEditingExamId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [subjectRes, sessionRes, examRes] = await Promise.all([
        axios.get('https://examprep-bxeo.onrender.com/api/subject'),
        axios.get('https://examprep-bxeo.onrender.com/api/session'),
        axios.get('https://examprep-bxeo.onrender.com/api/exams/exams')
      ]);
      setSubjects(subjectRes.data.data || []);
      setSessions(sessionRes.data.data || []);
      setExams(examRes.data || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load subjects or sessions');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleQuestionDistChange = (index, e) => {
    const updated = [...formData.questionDistribution];
    updated[index][e.target.name] = e.target.value;
    setFormData({ ...formData, questionDistribution: updated });
    setError('');
  };

  const addDistributionField = () => {
    setFormData({...formData, questionDistribution: [...formData.questionDistribution, { subject: '', numberOfQuestions: '' }, ],
    });
  };

  const removeDistributionField = (index) => {
    if (formData.questionDistribution.length === 1) {
      setError('At least one subject is required');
      return;
    }
    const updated = [...formData.questionDistribution];
    updated.splice(index, 1);
    setFormData({ ...formData, questionDistribution: updated });
  };

  const validateForm = () => {
    if (!formData.examName || !formData.date || !formData.time || !formData.duration || !formData.totalMarks || !formData.passingMarks || !formData.sessionId) {
      return 'All fields are required';
    }
    if (parseInt(formData.passingMarks) > parseInt(formData.totalMarks)) {
      return 'Passing marks cannot exceed total marks';
    }
    if (formData.questionDistribution.some(dist => !dist.subject || !dist.numberOfQuestions || parseInt(dist.numberOfQuestions) <= 0)) {
      return 'All question distributions must have a valid subject and number of questions';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      if (isEditing && editingExamId) {
        await axios.put(`https://examprep-bxeo.onrender.com/api/exams/${editingExamId}`, formData);
        alert('Exam Updated Successfully');
      } else {
        await axios.post('https://examprep-bxeo.onrender.com/api/exams', formData);
        alert('Exam Created Successfully');
      }

      // Reset form
      setFormData({
        examName: '',
        date: '',
        time: '',
        duration: '',
        totalMarks: '',
        passingMarks: '',
        sessionId: '',
        status: 'Scheduled',
        questionDistribution: [{ subject: '', numberOfQuestions: '' }],
      });
      setIsEditing(false);
      setEditingExamId(null);
      fetchData();
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.response?.data?.error || 'Error submitting form');
    }
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(`https://examprep-bxeo.onrender.com/api/exams/${id}`);
    if (res) {
      alert("Deleted Successfully");
      fetchData();
    } else {
      alert("Try Again Later");
    }
  };

  const handleEdit = (exam) => {
    setFormData({
      examName: exam.title,
      totalMarks: exam.totalMarks,
      passingMarks: exam.passingMarks,
      date: exam.date,
      time: exam.time,
      duration: exam.duration,
      sessionId: exam.sessionId._id,
      status: exam.status,
      questionDistribution: exam.questionDistribution || [{ subject: '', numberOfQuestions: '' }],
    });
    setEditingExamId(exam._id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container-fluid p-2">

      {/* ================= CREATE / EDIT EXAM CARD ================= */}
      <div className="row">
        <div className="col-12">
          <div className="card p-3 border border-2" style={{ borderColor: "#6f42c1" }}>
            <h3 className="fw-bold mb-3" style={{ color: "#6f42c1" }}>
              {isEditing ? "Edit Examination" : "Create Examination"}
            </h3>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>

              {/* Row 1 */}
              <div className="row g-2">
                <div className="col-12 col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name="examName"
                    placeholder="Exam Name"
                    value={formData.examName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12 col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    name="totalMarks"
                    placeholder="Total Marks"
                    value={formData.totalMarks}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>

                <div className="col-12 col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    name="passingMarks"
                    placeholder="Passing Marks"
                    value={formData.passingMarks}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="row g-2 mt-1">
                <div className="col-12 col-md-4">
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12 col-md-4">
                  <input
                    type="time"
                    className="form-control"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12 col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    name="duration"
                    placeholder="Duration (minutes)"
                    value={formData.duration}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="row g-2 mt-1">
                <div className="col-12 col-md-6">
                  <select
                    className="form-select"
                    name="sessionId"
                    value={formData.sessionId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Session</option>
                    {sessions.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <select
                    className="form-select"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Draft">Draft</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <hr />

              {/* ================= QUESTION DISTRIBUTION ================= */}
              <h5 className="fw-bold mb-2" style={{ color: "#6f42c1" }}>
                Question Distribution
              </h5>

              {formData.questionDistribution.map((item, index) => (
                <div className="row g-2 align-items-center mb-2" key={index}>
                  <div className="col-12 col-md-6">
                    <select
                      className="form-select"
                      name="subject"
                      value={item.subject}
                      onChange={(e) => handleQuestionDistChange(index, e)}
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

                  <div className="col-8 col-md-4">
                    <input
                      type="number"
                      className="form-control"
                      name="numberOfQuestions"
                      placeholder="No. of Questions"
                      value={item.numberOfQuestions}
                      onChange={(e) => handleQuestionDistChange(index, e)}
                      min="1"
                      required
                    />
                  </div>

                  <div className="col-4 col-md-2 d-grid">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => removeDistributionField(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="mb-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ background: "#795899ff" }}
                  onClick={addDistributionField}
                >
                  + Add Subject
                </button>
              </div>

              <button
                type="submit"
                className="btn text-white"
                style={{ background: "#39064fff" }}
              >
                {isEditing ? "Update Exam" : "Create Exam"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ================= EXAM TABLE ================= */}
      <div className="card mt-3 border border-2" style={{ borderColor: "#6f42c1" }}>
        <div className="card-body">
          <h3 className="fw-bold mb-3" style={{ color: "#6f42c1" }}>
            Examination Details
          </h3>

          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center align-middle">
              <thead style={{ background: "#f2e6ff" }}>
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
                {exams.map((exam, index) => (
                  <tr key={exam._id}>
                    <td>{index + 1}</td>
                    <td>{exam.title}</td>
                    <td>{exam.totalMarks}</td>
                    <td>{exam.passingMarks}</td>
                    <td>{exam.date}</td>
                    <td>{exam.time}</td>
                    <td>{exam.duration}</td>
                    <td>{exam.sessionId?.name || "N/A"}</td>
                    <td>{exam.status}</td>
                    <td>
                      <div className="d-flex flex-wrap gap-2 justify-content-center">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleEdit(exam)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(exam._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>

  );
};

export default Examination;
