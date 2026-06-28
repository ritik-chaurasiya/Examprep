import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

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
          toast.success('Session updated Successfully')
          handlefetch();

        }
      }
      else {
        const res = await axios.post('https://examprep-bxeo.onrender.com/api/session', form)
        if (res) {
          toast.success('Session Added Successfully')
          handlefetch();

        }
      }
    }
    catch (er) {
      toast.error("Sorry try again later")
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
      toast.success("Deleted Successfully");
    }
    else {
      toast.error("Try Again Later");
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

    <div className="container-fluid p-3">

      {/* Add Session Card */}
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">

          <div
            className="card border-0 shadow-lg"
            style={{
              borderRadius: "25px"
            }}
          >
            <div className="card-body p-4">

              <h4
                className="fw-bold mb-4"
                style={{ color: "#312E81" }}
              >
                <i className="fa-solid fa-calendar-plus me-2"></i>
                Add New Session
              </h4>

              <form onSubmit={handleSubmit}>

                {/* Session Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Session Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-control shadow-sm"
                    placeholder="Eg : 2025-26"
                    required
                    style={{
                      borderRadius: "15px"
                    }}
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Description
                  </label>

                  <textarea
                    rows="3"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="form-control shadow-sm"
                    style={{
                      borderRadius: "15px"
                    }}
                  ></textarea>
                </div>

                {/* Dates */}
                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      Start Date
                    </label>

                    <input
                      type="date"
                      name="startdate"
                      value={form.startdate}
                      onChange={handleChange}
                      className="form-control shadow-sm"
                      required
                      style={{
                        borderRadius: "15px"
                      }}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      End Date
                    </label>

                    <input
                      type="date"
                      name="enddate"
                      value={form.enddate}
                      onChange={handleChange}
                      className="form-control shadow-sm"
                      required
                      style={{
                        borderRadius: "15px"
                      }}
                    />
                  </div>

                </div>

                <button
                  className="btn text-white fw-semibold px-4 py-2"
                  style={{
                    background:
                      "linear-gradient(90deg,#4F46E5,#7C3AED)",
                    borderRadius: "15px"
                  }}
                >
                  <i className="fa-solid fa-plus me-2"></i>
                  Add Session
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>

      {/* Session List */}
      <div className="row mt-5">
        <div className="col-12">

          <div
            className="card border-0 shadow-lg"
            style={{
              borderRadius: "25px"
            }}
          >
            <div className="card-body">

              <h3
                className="fw-bold mb-4"
                style={{
                  color: "#312E81"
                }}
              >
                <i className="fa-solid fa-list me-2"></i>
                Session List
              </h3>

              <div className="table-responsive">

                <table className="table table-hover align-middle">

                  <thead
                    className="text-white"
                    style={{
                      background:
                        "linear-gradient(90deg,#4F46E5,#7C3AED)"
                    }}
                  >
                    <tr>
                      <th>S.No</th>
                      <th>Session Name</th>
                      <th>Description</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {data.length > 0 ? (
                      data.map((item, i) => (

                        <tr key={item._id}>

                          <td>{i + 1}</td>

                          <td>
                            <span className="fw-semibold">
                              {item.name}
                            </span>
                          </td>

                          <td>{item.description}</td>

                          <td>{item.startdate}</td>

                          <td>{item.enddate}</td>

                          <td>

                            <div className="d-flex gap-2 flex-wrap">

                              <button
                                className="btn btn-sm text-white"
                                style={{
                                  background: "#4F46E5",
                                  borderRadius: "10px"
                                }}
                                onClick={() => handleEdit(item)}
                              >
                                <i className="fa-solid fa-pen me-1"></i>
                                Edit
                              </button>

                              <button
                                className="btn btn-danger btn-sm"
                                style={{
                                  borderRadius: "10px"
                                }}
                                onClick={() => handleDelete(item._id)}
                              >
                                <i className="fa-solid fa-trash me-1"></i>
                                Delete
                              </button>

                            </div>

                          </td>

                        </tr>

                      ))
                    ) : (

                      <tr>
                        <td
                          colSpan="6"
                          className="text-center text-muted py-4"
                        >
                          No Sessions Found
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