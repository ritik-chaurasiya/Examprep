import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const MyExam = () => {
  const [exam, setExam] = React.useState([]);
  const fetchExams = async () => {
    const res = await axios.get('http://localhost:5000/api/exams/exams');
    setExam(res.data);
    //console.log(res.data);

  }
  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <div className='container-fluid p-0'>
       <div className="card mx-auto mt-2 "  style={{
                border: "1px solid #6f42c1",
                width: "100%",
              }}>
        <div className="card-body">
          <h3 className="fw-bold" style={{ color: "#6f42c1" }}>Question List</h3>
          <table className="table table-bordered text-center">
            <thead className="thead-light-purple">
              <tr>
                <th>S.No.</th>
                <th>Exam name</th>
                <th>Date Of Exam</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {exam.map((item , i)=>(
                <tr key={item._id}>
                <td>{i+1}</td>
                <td>{item.title}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.time}</td>
                <td>
                 <Link to={`/userdash/getexam/${item._id}`} className='btn-delete text-decoration-none'>Start Exam</Link>

                </td>
              </tr>

              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MyExam