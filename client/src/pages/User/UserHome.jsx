// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// const UserHome = () => {
//   const examineId = localStorage.getItem('userId');
//   const [data, setData] = React.useState([]);
//   const [reslt, setreslt] = useState([]);

//   const handlefetch = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/dashboard/exams/${examineId}`);
//       const result = await response.json();
//       setData(result);
//       const res = await axios.get(`http://localhost:5000/api/dashboard/examinee-result/${examineId}`);
//       console.log(res.data.message)
//       setreslt(Array.isArray(res.data.message) ? res.data.message : [res.data.message]);

//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//     }
//   };
//   useEffect(() => {
//     handlefetch();
//   }, []);

// {console.log(reslt)}
//   return (
//     <div>
//       <div className='container-fluid p-0'>
//         <div className="row ">
//           <div className="col-sm-12 ">
//             <div
//               className="card p-2"
//               style={{
//                 border: "1px solid #6f42c1",
//                 minHeight: "170px",
//                 width: "100%",
//               }}
//             >
//               <div className="row mb-4">
//                 {/* Total Exams Card */}
//                 <div className="col-sm-4">
//                   <div className=" shadow p-4 bg-light text-center" style={{
//                     border: "1px solid #6f42c1",


//                   }}
//                   >

//                     <u style={{ color: "#6f42c1" }}> <h5 className="fw-bold" style={{ height: "48px", color: "#6f42c1" }}>
//                       <i className="fa-solid fa-file-lines me-2"></i>Total Exams
//                     </h5></u>
//                     <h5>{data}</h5>

//                   </div>
//                 </div>

//                 {/* Result Card: Passed & Failed */}
//                 <div className="col-sm-4">
//                   <div className=" shadow p-4 bg-light text-center" style={{
//                     border: "1px solid #6f42c1",


//                   }} >
//                     <u style={{ color: "#6f42c1" }}><h6 className="fw-bold" style={{ height: "30px", color: "#6f42c1" }}>
//                       <i className="fa-solid fa-chart-line me-2"></i>Result Summary
//                     </h6></u>
//                     <h6 className="fw-bold text-success mb-1">
//                       <i className="fa-solid fa-circle-check me-2"></i>Passed : {reslt}
//                     </h6>
//                     <h6 className="fw-bold text-danger">
//                       <i className="fa-solid fa-circle-xmark me-2"></i>Failed: {data - reslt}
//                     </h6>

//                   </div>
//                 </div>
//                 <div className="col-sm-4">
//                   <div className=" shadow  h-100 p-4 bg-light text-center" style={{
//                     border: "1px solid #6f42c1",


//                   }} >
//                     <u style={{ color: "#6f42c1" }}><h6 className="fw-bold" style={{ height: "30px", color: "#6f42c1" }}>
//                       <i className="fa-solid fa-chart-line me-2"></i>Overall Performance
//                     </h6></u>
//                     <div className="progress" style={{ height: "20px" }}>
//                       <div
//                         className="progress-bar bg-success"
//                         role="progressbar"
//                         style={{ width: `${(reslt / data) * 100 || 0}%` }}
//                         aria-valuenow={(reslt / data) * 100 || 0}
//                         aria-valuemin="0"
//                         aria-valuemax="100"
//                       >
//                         {(reslt / data) * 100 || 0}%
//                       </div>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Exam Marks Table */}
       
//       </div>
//     </div>
//   )
// }

// export default UserHome



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserHome = () => {
  const examineId = localStorage.getItem('userId');
  const [data, setData] = useState([]);      // Total exams data
  const [reslt, setreslt] = useState(0);     // Passed exams count

  const handlefetch = async () => {
    try {
      // Fetch exams
      const response = await fetch(`http://localhost:5000/api/dashboard/exams/${examineId}`);
      const result = await response.json();
      setData(result || []);  // Ensure array

      // Fetch results
      const res = await axios.get(`http://localhost:5000/api/dashboard/examinee-result/${examineId}`);
      const messageData = Array.isArray(res.data.message)
        ? res.data.message.length
        : res.data.message
          ? 1
          : 0;
      setreslt(messageData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setData([]);
      setreslt(0);
    }
  };

  useEffect(() => {
    handlefetch();
  }, []);

  // Safely calculate numbers
  const totalExams = Array.isArray(data) ? data.length : 0;
  const passedExams = reslt;
  const failedExams = totalExams - passedExams;
  const percent = totalExams ? Math.round((passedExams / totalExams) * 100) : 0;

  return (
    <div className="container-fluid p-0">
      <div className="row">
        <div className="col-sm-12">
          <div
            className="card p-2"
            style={{
              border: "1px solid #6f42c1",
              minHeight: "170px",
              width: "100%",
            }}
          >
            <div className="row mb-4">
              {/* Total Exams Card */}
              <div className="col-sm-4">
                <div
                  className="shadow p-4 bg-light text-center"
                  style={{ border: "1px solid #6f42c1" }}
                >
                  <u style={{ color: "#6f42c1" }}>
                    <h5 className="fw-bold" style={{ height: "48px" }}>
                      <i className="fa-solid fa-file-lines me-2"></i>Total Exams
                    </h5>
                  </u>
                  <h5>{totalExams}</h5>
                </div>
              </div>

              {/* Result Card */}
              <div className="col-sm-4">
                <div
                  className="shadow p-4 bg-light text-center"
                  style={{ border: "1px solid #6f42c1" }}
                >
                  <u style={{ color: "#6f42c1" }}>
                    <h6 className="fw-bold" style={{ height: "30px" }}>
                      <i className="fa-solid fa-chart-line me-2"></i>Result Summary
                    </h6>
                  </u>
                  <h6 className="fw-bold text-success mb-1">
                    <i className="fa-solid fa-circle-check me-2"></i>Passed: {passedExams}
                  </h6>
                  <h6 className="fw-bold text-danger">
                    <i className="fa-solid fa-circle-xmark me-2"></i>Failed: {failedExams}
                  </h6>
                </div>
              </div>

              {/* Overall Performance */}
              <div className="col-sm-4">
                <div
                  className="shadow h-100 p-4 bg-light text-center"
                  style={{ border: "1px solid #6f42c1" }}
                >
                  <u style={{ color: "#6f42c1" }}>
                    <h6 className="fw-bold" style={{ height: "30px" }}>
                      <i className="fa-solid fa-chart-line me-2"></i>Overall Performance
                    </h6>
                  </u>
                  <div className="progress" style={{ height: "20px" }}>
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: `${percent}%` }}
                      aria-valuenow={percent}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {percent}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optionally, you can add Exam Marks Table here */}
    </div>
  );
};

export default UserHome;
