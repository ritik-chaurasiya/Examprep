import React, { useEffect, useState } from "react";
import { FaUsers, FaBook, FaClipboardList } from "react-icons/fa";
import axios from "axios";
const AdminHome = () => {
  const [data, setData] = useState({});
  const [recentExams, setRecentExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [dataExams, setDataExams] = useState([])
  const handlefetch = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/dashboard/");
      const res =  await axios.get('http://localhost:5000/api/exams/exams');
      setDataExams(res.data)
      const result = await response.json();
      setData(result);

      // Assume recentExams are returned inside result
      if (result.recentExams) {
        setRecentExams(result.recentExams);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlefetch();
  }, []);

  // Search + Pagination logic
  const filteredExams = recentExams.filter((exam) =>
    exam.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentExams = filteredExams.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredExams.length / perPage);

  if (loading) return <p style={{ textAlign: "center" }}>Loading dashboard...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        <h2 className="fw-bold" style={{ color: "#6f42c1" }}>
          Dashboard Overview
        </h2>
        <p>👋 Welcome Admin</p>
      </div>

      {/* Cards Section */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>
        <DashboardCard
          color="linear-gradient(135deg, #6f42c1, #9b59b6)"
          title="Total Exams"
          count={data.totalExams}
          icon={<FaClipboardList size={28} />}
        />
        <DashboardCard
          color="linear-gradient(135deg, #28a745, #5cd85c)"
          title="Total Examinees"
          count={data.totalExaminees}
          icon={<FaUsers size={28} />}
        />
        <DashboardCard
          color="linear-gradient(135deg, #ff9800, #ffc107)"
          title="Total Subjects"
          count={data.totalSubject}
          icon={<FaBook size={28} />}
        />
      </div>

      {/* Recent Exams Table */}
      <div style={{ marginTop: "40px" }}>
        <h4
          style={{
            borderBottom: "2px solid #6f42c1",
            display: "inline-block",
            paddingBottom: "5px",
          }}
        >
          Recent Exams
        </h4>

        {/* Search & Per Page */}
        <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}>
          <input
            type="text"
            placeholder="Search exams..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "6px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
          <select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            style={{ padding: "6px", borderRadius: "5px" }}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>
        </div>

        <table style={tableStyle}>
          <thead>
            <tr style={{ backgroundColor: "#f2e6ff", textAlign: "left" }}>
              <th style={thTdStyle}>Exam Name</th>
              <th style={thTdStyle}>Date</th>
              <th style={thTdStyle}>Status</th>
              <th style={thTdStyle}>Total Marks</th>
            </tr>
          </thead>
         <tbody>
         {dataExams.map((item, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9" }}>
              <td style={thTdStyle}>{item.title}</td>
              <td style={thTdStyle}>{new Date(item.date).toLocaleDateString()}</td>
              <td style={thTdStyle}>{item.status}</td>
              <td style={thTdStyle}>{item.totalMarks}</td>
            </tr>
          ))}
         </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  margin: "0 5px",
                  padding: "6px 12px",
                  border: "none",
                  borderRadius: "5px",
                  background: currentPage === i + 1 ? "#6f42c1" : "#e0e0e0",
                  color: currentPage === i + 1 ? "white" : "black",
                  cursor: "pointer",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Dashboard Card Component
const DashboardCard = ({ color, title, count, icon }) => (
  <div
    style={{
      background: color,
      color: "white",
      borderRadius: "12px",
      padding: "20px",
      width: "250px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      boxShadow: "0px 3px 8px rgba(0,0,0,0.2)",
      transition: "transform 0.2s",
    }}
  >
    <div style={{ fontSize: "18px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
      {icon} {title}
    </div>
    <h2>{count}</h2>
  </div>
);

// Table and cell styles
const tableStyle = {
  width: "100%",
  marginTop: "15px",
  borderCollapse: "collapse",
  border: "1px solid #ccc",
};

const thTdStyle = {
  padding: "12px",
  borderBottom: "1px solid #ccc",
};

export default AdminHome;
