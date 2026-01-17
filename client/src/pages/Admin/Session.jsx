import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

const Session = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    startdate: '',
    enddate: ''
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
    id: '',
  })
  const handleSubmit = async (e) => {
    // window.alert("hello");
    e.preventDefault();
    try {
      if (editform) {
        const res = await axios.put(`https://examprep-bxeo.onrender.com/api/session/${id.id}`, form);
        if (res) {
          alert('Session updated Successfully')
          handlefetch();

        }
      }
      else {
        const res = await axios.post('https://examprep-bxeo.onrender.com/api/session', form)
        if (res) {
          alert('Session Added Successfully')
          handlefetch();

        }
      }
    }
    catch(er){
      alert("Sorry try again later")
    }
  }
  // fetch data api
  const handlefetch = async () => {
    const res = await axios.get('https://examprep-bxeo.onrender.com/api/session')
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
    const res = await axios.delete(`https://examprep-bxeo.onrender.com/api/session/${id}`);
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
      name: item.name,
      description: item.description,
      startdate: item.startdate,
      enddate: item.enddate
    })
    setId({
      id: item._id
    })
    setEditForm(true);
    console.log(form);
  }
  return (
    <div className="container-fluid p-2">

      {/* ================= ADD NEW SESSION ================= */}
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
                  Add New Session
                </h5>

                {/* Session Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Session Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    className="form-control"
                    placeholder="Eg: 2025–26"
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

                {/* Dates */}
                <div className="row g-2 mb-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startdate"
                      value={form.startdate}
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="enddate"
                      value={form.enddate}
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn text-white"
                  style={{ background: "#39064fff" }}
                >
                  Add Session
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>

      {/* ================= SESSION LIST ================= */}
      <div className="row mt-4">
        <div className="col-12">
          <div
            className="card border border-2"
            style={{ borderColor: "#6f42c1" }}
          >
            <div className="card-body">

              <h3 className="fw-bold mb-3" style={{ color: "#6f42c1" }}>
                Session List
              </h3>

              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle text-center">
                  <thead style={{ background: "#f2e6ff" }}>
                    <tr>
                      <th>S.No.</th>
                      <th>Session Name</th>
                      <th>Description</th>
                      <th>Start</th>
                      <th>End</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.length > 0 ? (
                      data.map((item, i) => (
                        <tr key={item._id}>
                          <td>{i + 1}</td>
                          <td>{item.name}</td>
                          <td className="text-start">{item.description}</td>
                          <td>{item.startdate}</td>
                          <td>{item.enddate}</td>
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
                        <td colSpan="6" className="text-muted">
                          No sessions found
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

export default Session;