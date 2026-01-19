import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const MyExam = () => {
  const [exam, setExam] = React.useState([]);
  const fetchExams = async () => {
    const res = await axios.get('https://examprep-bxeo.onrender.com/api/exams/exams');
    setExam(res.data);
    //console.log(res.data);

  }
  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <div className="container-fluid p-2">
      <div className="row justify-content-center">
        <div className="col-12">

          <div
            className="card border border-2 mt-2"
            style={{ borderColor: "#6f42c1" }}
          >
            <div className="card-body">

              {/* Heading */}
              <div className="row mb-3">
                <div className="col-12">
                  <h3 className="fw-bold mb-0" style={{ color: "#6f42c1" }}>
                    Question List
                  </h3>
                </div>
              </div>

              {/* Responsive Table */}
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle text-center">
                  <thead style={{ background: "#f3e8ff" }}>
                    <tr>
                      <th>S.No.</th>
                      <th>Exam Name</th>
                      <th>Date Of Exam</th>
                      <th>Time</th>
                      <th style={{ minWidth: "140px" }}>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {exam.length > 0 ? (
                      exam.map((item, i) => (
                        <tr key={item._id}>
                          <td>{i + 1}</td>
                          <td className="fw-semibold">
                            {item.title}
                          </td>
                          <td>
                            {new Date(item.date).toLocaleDateString()}
                          </td>
                          <td>{item.time}</td>
                          <td>
                            <Link
                              to={`/userdash/getexam/${item._id}`}
                              className="btn btn-sm btn-primary text-decoration-none"
                            >
                              Start Exam
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-muted">
                          No exams available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>

  )
}

export default MyExam