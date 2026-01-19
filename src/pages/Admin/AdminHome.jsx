import React, { useEffect, useState } from "react";
import { FaUsers, FaBook, FaClipboardList } from "react-icons/fa";
import axios from "axios";

const AdminHome = () => {
  const [data, setData] = useState({});
  const [dataExams, setDataExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const handlefetch = async () => {
    try {
      const dashboardRes = await fetch(
        "https://examprep-bxeo.onrender.com/api/dashboard/"
      );
      const examsRes = await axios.get(
        "https://examprep-bxeo.onrender.com/api/exams/exams"
      );

      setData(await dashboardRes.json());
      setDataExams(examsRes.data);
    } catch (err) {
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlefetch();
  }, []);

  // Search + Pagination
  const filteredExams = dataExams.filter((exam) =>
    exam.title.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentExams = filteredExams.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredExams.length / perPage);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <h2 className="fw-bold text-primary">Dashboard Overview</h2>
        <p className="mb-0">👋 Welcome Admin</p>
      </div>

      {/* Cards */}
      <div className="row g-4">
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card text-white bg-primary h-100 shadow">
            <div className="card-body">
              <div className="d-flex align-items-center gap-2">
                <FaClipboardList size={26} />
                <h6 className="mb-0">Total Exams</h6>
              </div>
              <h3 className="mt-3">{data.totalExams}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card text-white bg-success h-100 shadow">
            <div className="card-body">
              <div className="d-flex align-items-center gap-2">
                <FaUsers size={26} />
                <h6 className="mb-0">Total Examinees</h6>
              </div>
              <h3 className="mt-3">{data.totalExaminees}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card text-dark bg-warning h-100 shadow">
            <div className="card-body">
              <div className="d-flex align-items-center gap-2">
                <FaBook size={26} />
                <h6 className="mb-0">Total Subjects</h6>
              </div>
              <h3 className="mt-3">{data.totalSubject}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Exams */}
      <div className="mt-5">
        <h4 className="fw-semibold border-bottom pb-2">
          Recent Exams
        </h4>

        {/* Controls */}
        <div className="d-flex flex-wrap gap-2 justify-content-between my-3">
          <input
            type="text"
            className="form-control w-100 w-md-50"
            placeholder="Search exams..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="form-select w-auto"
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
          >
            <option value={5}>5 / page</option>
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
          </select>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Exam Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total Marks</th>
              </tr>
            </thead>
            <tbody>
              {currentExams.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {item.status}
                    </span>
                  </td>
                  <td>{item.totalMarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="d-flex justify-content-center">
            <ul className="pagination flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""
                    }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
