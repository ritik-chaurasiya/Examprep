
import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

const Subject = () => {
  const [form, setForm] = useState({
    subjectname: '',
    description: '',
    
  })

  // fetch data hook
  const [data, setData] = useState([]);

  // handle change function
  const handleChange = (e) => {

    // console.log(e.target.value);
    const { name, value } = e.target;
    setForm((prev) => (
      { ...prev, [name]: value }
    ));
    // console.log(form);

  }
  // handleSubmit
  const [id, setId] = useState({
    id:'',
  })
  const handleSubmit = async (e) => {
    // window.alert("hello");
    e.preventDefault();
    try {
      if(editform){
        const res = await axios.put(`https://examprep-bxeo.onrender.com/api/subject/${id.id}`,form);
        if(res){
          alert('Subject Updated Successfully')
           handlefetch();
        }
      }
      else{
        const res = await axios.post('https://examprep-bxeo.onrender.com/api/subject', form)
        if (res) {
          alert('Subject Added Successfully')
          handlefetch();
        }
      }
    }
    catch (er) {
      alert("Sorry try again later")
    }
  }
  // fetch data api
  const handlefetch = async () => {
    const res = await axios.get('https://examprep-bxeo.onrender.com/api/subject')
    // console.log(res.data);
    setData(res.data.data);
  }
  useEffect(() => {
    handlefetch();
  }, [])
  // console.log(data)

  // handle delete logic
  const handleDelete = async (id) => {
    // console.log(id)
    const res = await axios.delete(`https://examprep-bxeo.onrender.com/api/subject/${id}`);
    if (res) {
      alert("Deleted Successfully");
    }
    else {
      alert("Try Again Later");
    }
    handlefetch();
  }
  // handle edit
  const [editform, setEditForm] = useState(null);
  
  const handleEdit = async (item) => {
    // console.log(item._id)

    setForm({
      subjectname: item.subjectname,
      description: item.description,
    
    })
    setId({
      id:item._id
    })
    setEditForm(true);
    // console.log(form);
  }
  return (
    <div className="container-fluid p-2">

      {/* ================= ADD NEW SUBJECT ================= */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div
            className="card border border-2"
            style={{ borderColor: "#6f42c1" }}
          >
            <div className="card-body">

              <form onSubmit={handleSubmit}>
                <h5 className="fw-bold mb-3" style={{ color: "#6f42c1" }}>
                  <i className="fa-solid fa-plus me-2"></i>
                  Add New Subject
                </h5>

                {/* Subject Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Subject Name
                  </label>
                  <input
                    type="text"
                    name="subjectname"
                    value={form.subjectname}
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    className="form-control"
                    rows="2"
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn text-white"
                  style={{ background: "#39064fff" }}
                >
                  Add Subject
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>

      {/* ================= SUBJECT LIST ================= */}
      <div className="row mt-4">
        <div className="col-12">
          <div
            className="card border border-2"
            style={{ borderColor: "#6f42c1" }}
          >
            <div className="card-body">

              <h3 className="fw-bold mb-3" style={{ color: "#6f42c1" }}>
                Subject List
              </h3>

              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle text-center">
                  <thead style={{ background: "#f2e6ff" }}>
                    <tr>
                      <th>S.No.</th>
                      <th>Subject Name</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.length > 0 ? (
                      data.map((item, i) => (
                        <tr key={item._id}>
                          <td>{i + 1}</td>
                          <td>{item.subjectname}</td>
                          <td className="text-start">
                            {item.description}
                          </td>
                          <td>
                            <div className="d-flex flex-wrap gap-2 justify-content-center">
                              <button
                                className="btn btn-warning btn-sm"
                                onClick={() => handleEdit(item)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(item._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-muted">
                          No subjects found
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

  );
};

export default Subject;