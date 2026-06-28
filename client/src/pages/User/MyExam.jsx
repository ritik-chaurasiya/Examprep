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
    <div className="container-fluid py-4">

      {/* Header Card */}
      <div
        className="card border-0 shadow-lg mb-4"
        style={{
          borderRadius: "25px",
          background: "linear-gradient(90deg,#4F46E5,#7C3AED)"
        }}
      >
        <div className="card-body">

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">

            <div className="text-center text-md-start mb-3 mb-md-0">

              <h2 className="fw-bold text-white mb-1">
                <i className="fa-solid fa-file-lines me-2"></i>
                Available Exams
              </h2>

              <p className="text-white-50 mb-0">
                Select an exam and start your assessment
              </p>

            </div>

            <div
              className="bg-white rounded-pill px-4 py-2 fw-bold"
              style={{ color: "#4F46E5" }}
            >
              Total Exams : {exam.length}
            </div>

          </div>

        </div>
      </div>

      {/* Table Card */}

      <div
        className="card border-0 shadow-lg"
        style={{ borderRadius: "25px" }}
      >

        <div className="card-body">

          <div className="table-responsive">

            <table className="table align-middle table-hover">

              <thead
                style={{
                  background: "#EEF2FF"
                }}
              >
                <tr className="text-center">

                  <th className="text-primary">#</th>

                  <th className="text-primary">
                    Exam Name
                  </th>

                  <th className="text-primary">
                    Date
                  </th>

                  <th className="text-primary">
                    Time
                  </th>

                  <th className="text-primary">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {exam.length > 0 ? (

                  exam.map((item, i) => (

                    <tr key={item._id}>

                      <td className="fw-bold text-center">
                        {i + 1}
                      </td>

                      <td>

                        <div
                          className="fw-bold"
                          style={{ color: "#4F46E5" }}
                        >
                          {item.title}
                        </div>

                        <small className="text-muted">
                          Online Examination
                        </small>

                      </td>

                      <td className="text-center">

                        <span
                          className="badge rounded-pill px-3 py-2"
                          style={{
                            background: "#EEF2FF",
                            color: "#4F46E5"
                          }}
                        >
                          {new Date(item.date).toLocaleDateString()}
                        </span>

                      </td>

                      <td className="text-center">

                        <span
                          className="badge rounded-pill px-3 py-2"
                          style={{
                            background: "#F3E8FF",
                            color: "#7C3AED"
                          }}
                        >
                          <i className="fa-regular fa-clock me-1"></i>

                          {item.time}
                        </span>

                      </td>

                      <td className="text-center">

                        <Link
                          to={`/userdash/getexam/${item._id}`}
                          className="btn text-white fw-semibold"
                          style={{
                            background:
                              "linear-gradient(90deg,#4F46E5,#7C3AED)",
                            borderRadius: "30px",
                            padding: "8px 20px"
                          }}
                        >
                          <i className="fa-solid fa-play me-2"></i>

                          Start Exam
                        </Link>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td colSpan="5">

                      <div className="text-center py-5">

                        <i
                          className="fa-solid fa-file-circle-xmark mb-3"
                          style={{
                            fontSize: "80px",
                            color: "#7C3AED"
                          }}
                        ></i>

                        <h4
                          className="fw-bold"
                          style={{ color: "#4F46E5" }}
                        >
                          No Exams Available
                        </h4>

                        <p className="text-muted">
                          Exams assigned by the administrator will appear here.
                        </p>

                      </div>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );

  // return (
  //   <div className="container-fluid p-2">
  //     <div className="row justify-content-center">
  //       <div className="col-12">

  //         <div
  //           className="card border border-2 mt-2"
  //           style={{ borderColor: "#6f42c1" }}
  //         >
  //           <div className="card-body">

  //             {/* Heading */}
  //             <div className="row mb-3">
  //               <div className="col-12">
  //                 <h3 className="fw-bold mb-0" style={{ color: "#6f42c1" }}>
  //                   Question List
  //                 </h3>
  //               </div>
  //             </div>

  //             {/* Responsive Table */}
  //             <div className="table-responsive">
  //               <table className="table table-bordered table-hover align-middle text-center">
  //                 <thead style={{ background: "#f3e8ff" }}>
  //                   <tr>
  //                     <th>S.No.</th>
  //                     <th>Exam Name</th>
  //                     <th>Date Of Exam</th>
  //                     <th>Time</th>
  //                     <th style={{ minWidth: "140px" }}>Action</th>
  //                   </tr>
  //                 </thead>

  //                 <tbody>
  //                   {exam.length > 0 ? (
  //                     exam.map((item, i) => (
  //                       <tr key={item._id}>
  //                         <td>{i + 1}</td>
  //                         <td className="fw-semibold">
  //                           {item.title}
  //                         </td>
  //                         <td>
  //                           {new Date(item.date).toLocaleDateString()}
  //                         </td>
  //                         <td>{item.time}</td>
  //                         <td>
  //                           <Link
  //                             to={`/userdash/getexam/${item._id}`}
  //                             className="btn btn-sm btn-primary text-decoration-none"
  //                           >
  //                             Start Exam
  //                           </Link>
  //                         </td>
  //                       </tr>
  //                     ))
  //                   ) : (
  //                     <tr>
  //                       <td colSpan="5" className="text-muted">
  //                         No exams available
  //                       </td>
  //                     </tr>
  //                   )}
  //                 </tbody>
  //               </table>
  //             </div>

  //           </div>
  //         </div>

  //       </div>
  //     </div>
  //   </div>

  // )
}

export default MyExam