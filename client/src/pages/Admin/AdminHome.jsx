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

    <div
      className="container-fluid min-vh-100 p-4"
      style={{
        background:
          "linear-gradient(135deg,#0F172A 0%,#312E81 50%,#7C3AED 100%)",
      }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <div>
          <h2 className="fw-bold text-white">Dashboard Overview</h2>
          <p className="text-light mb-0">👋 Welcome Admin</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4">

        {/* Total Exams */}
        <div className="col-12 col-md-6 col-lg-4">
          <div
            className="card border-0 shadow-lg h-100"
            style={{
              background: "rgba(255,255,255,.12)",
              backdropFilter: "blur(12px)",
              borderRadius: "20px",
              color: "white",
            }}
          >
            <div className="card-body">
              <FaClipboardList className="text-info mb-3" size={35} />
              <h6>Total Exams</h6>
              <h2>{data.totalExams}</h2>
            </div>
          </div>
        </div>

        {/* Total Examinees */}
        <div className="col-12 col-md-6 col-lg-4">
          <div
            className="card border-0 shadow-lg h-100"
            style={{
              background: "rgba(255,255,255,.12)",
              backdropFilter: "blur(12px)",
              borderRadius: "20px",
              color: "white",
            }}
          >
            <div className="card-body">
              <FaUsers className="text-success mb-3" size={35} />
              <h6>Total Examinees</h6>
              <h2>{data.totalExaminees}</h2>
            </div>
          </div>
        </div>

        {/* Total Subjects */}
        <div className="col-12 col-md-6 col-lg-4">
          <div
            className="card border-0 shadow-lg h-100"
            style={{
              background: "rgba(255,255,255,.12)",
              backdropFilter: "blur(12px)",
              borderRadius: "20px",
              color: "white",
            }}
          >
            <div className="card-body">
              <FaBook className="text-warning mb-3" size={35} />
              <h6>Total Subjects</h6>
              <h2>{data.totalSubject}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Exams */}
      <div
        className="card shadow-lg border-0 mt-5"
        style={{
          borderRadius: "25px",
        }}
      >
        <div className="card-body">

          <h4
            className="fw-bold mb-4"
            style={{
              color: "#312E81",
            }}
          >
            Recent Exams
          </h4>

          {/* Search + Select */}
          <div className="row g-3 mb-4">

            <div className="col-md-8">
              <input
                type="text"
                className="form-control py-3"
                placeholder="Search exams..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  borderRadius: "15px",
                }}
              />
            </div>

            <div className="col-md-4">
              <select
                className="form-select py-3"
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
                style={{
                  borderRadius: "15px",
                }}
              >
                <option value={5}>5 / page</option>
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-hover align-middle">

              <thead
                style={{
                  background:
                    "linear-gradient(90deg,#4F46E5,#7C3AED)",
                  color: "white",
                }}
              >
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

                    <td>
                      {new Date(item.date).toLocaleDateString()}
                    </td>

                    <td>
                      <span
                        className="badge px-3 py-2"
                        style={{
                          background: "#4F46E5",
                        }}
                      >
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
            <nav className="d-flex justify-content-center mt-4">
              <ul className="pagination flex-wrap">

                {Array.from(
                  { length: totalPages },
                  (_, i) => (
                    <li
                      key={i}
                      className={`page - item ${currentPage === i + 1
                          ? "active"
                          : ""
                        } `}
                    >
                      <button
                        className="page-link"
                        onClick={() =>
                          setCurrentPage(i + 1)
                        }
                      >
                        {i + 1}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>

  );
};

export default AdminHome;
