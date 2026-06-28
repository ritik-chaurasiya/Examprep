import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";

const Examinee = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    number: '',
    address: '',
    college: '',
    qualification: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [search, setSearch] = useState(""); // search state

  useEffect(() => {
    handlefetch();
  }, []);

  const handlefetch = async () => {
    const res = await axios.get('https://examprep-bxeo.onrender.com/api/examinee');
    setData(res.data.data);
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(`https://examprep-bxeo.onrender.com/api/examinee/${id}`);
    if (res) {
      toast.success("Deleted Successfully");
    } else {
      toast.error("Try Again Later");
    }
    handlefetch();
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      email: item.email,
      number: item.number,
      address: item.address,
      college: item.college,
      qualification: item.qualification,
    });
    setEditingId(item._id);
    setEditFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to form
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingId) return;
    try {
      await axios.put(`https://examprep-bxeo.onrender.com/api/examinee/${editingId}`, form);
      toast.success('Examinee Updated Successfully');
      setForm({
        name: '',
        email: '',
        number: '',
        address: '',
        college: '',
        qualification: ''
      });
      setEditingId(null);
      setEditFormVisible(false);
      handlefetch();
    } catch (error) {
      console.error("Error updating examinee:", error);
      toast.error("Error updating examinee");
    }
  };

  // 🔎 Filter examinees by search keyword
  const filteredData = data.filter(item => {
    const keyword = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(keyword) ||
      item.email.toLowerCase().includes(keyword) ||
      item.number.toLowerCase().includes(keyword) ||
      (item.address && item.address.toLowerCase().includes(keyword)) ||
      (item.college && item.college.toLowerCase().includes(keyword)) ||
      (item.qualification && item.qualification.toLowerCase().includes(keyword))
    );
  });

  return (
    <>
      <div className="container-fluid p-2">

        {/* ================= EDIT EXAMINEE FORM ================= */}

        {editFormVisible && (
          <div className="row mb-4">
            <div className="col-12">

              <div
                className="card border-0 shadow-lg"
                style={{
                  borderRadius: "25px",
                  background: "rgba(255,255,255,.96)"
                }}
              >
                <div className="card-body p-4">

                  <div className="d-flex align-items-center mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "55px",
                        height: "55px",
                        background:
                          "linear-gradient(90deg,#4F46E5,#7C3AED)"
                      }}
                    >
                      <i className="fa-solid fa-user-pen text-white fs-4"></i>
                    </div>

                    <div>
                      <h3
                        className="fw-bold mb-0"
                        style={{ color: "#312E81" }}
                      >
                        Edit Examinee
                      </h3>

                      <small className="text-muted">
                        Update student information
                      </small>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>

                    <div className="row g-3">

                      <div className="col-md-4">
                        <label className="fw-semibold mb-2">
                          Full Name
                        </label>

                        <input
                          className="form-control shadow-sm"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Enter Name"
                          required
                          style={{
                            borderRadius: "15px",
                            height: "55px"
                          }}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="fw-semibold mb-2">
                          Email Address
                        </label>

                        <input
                          className="form-control shadow-sm"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="Enter Email"
                          required
                          style={{
                            borderRadius: "15px",
                            height: "55px"
                          }}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="fw-semibold mb-2">
                          Mobile Number
                        </label>

                        <input
                          className="form-control shadow-sm"
                          name="number"
                          value={form.number}
                          onChange={handleChange}
                          placeholder="Enter Number"
                          required
                          style={{
                            borderRadius: "15px",
                            height: "55px"
                          }}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="fw-semibold mb-2">
                          Address
                        </label>

                        <input
                          className="form-control shadow-sm"
                          name="address"
                          value={form.address}
                          onChange={handleChange}
                          placeholder="Address"
                          style={{
                            borderRadius: "15px",
                            height: "55px"
                          }}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="fw-semibold mb-2">
                          College
                        </label>

                        <input
                          className="form-control shadow-sm"
                          name="college"
                          value={form.college}
                          onChange={handleChange}
                          placeholder="College Name"
                          style={{
                            borderRadius: "15px",
                            height: "55px"
                          }}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="fw-semibold mb-2">
                          Qualification
                        </label>

                        <input
                          className="form-control shadow-sm"
                          name="qualification"
                          value={form.qualification}
                          onChange={handleChange}
                          placeholder="Qualification"
                          style={{
                            borderRadius: "15px",
                            height: "55px"
                          }}
                        />
                      </div>

                    </div>

                    <div className="d-flex gap-3 mt-4 flex-wrap">

                      <button
                        type="submit"
                        className="btn text-white px-4 py-2 fw-semibold"
                        style={{
                          background:
                            "linear-gradient(90deg,#4F46E5,#7C3AED)",
                          borderRadius: "15px"
                        }}
                      >
                        <i className="fa-solid fa-floppy-disk me-2"></i>
                        Update
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline-secondary px-4"
                        style={{
                          borderRadius: "15px"
                        }}
                        onClick={() => setEditFormVisible(false)}
                      >
                        Cancel
                      </button>

                    </div>

                  </form>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= EXAMINEE TABLE ================= */}

        <div className="row">

          <div className="col-12">

            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "25px",
                background: "rgba(255,255,255,.96)"
              }}
            >

              <div className="card-body p-4">

                {/* Header */}
                <div className="row align-items-center g-3 mb-4">

                  <div className="col-md-6">

                    <div className="d-flex align-items-center">

                      <div
                        className="rounded-circle d-flex justify-content-center align-items-center me-3"
                        style={{
                          width: "55px",
                          height: "55px",
                          background:
                            "linear-gradient(90deg,#4F46E5,#7C3AED)"
                        }}
                      >
                        <i className="fa-solid fa-users text-white fs-4"></i>
                      </div>

                      <div>
                        <h3
                          className="fw-bold mb-0"
                          style={{
                            color: "#312E81"
                          }}
                        >
                          Examinee Details
                        </h3>

                        <small className="text-muted">
                          Manage all registered students
                        </small>
                      </div>

                    </div>

                  </div>

                  {/* Search */}
                  <div className="col-md-6">

                    <div className="position-relative">

                      <i
                        className="fa-solid fa-magnifying-glass position-absolute"
                        style={{
                          top: "20px",
                          left: "18px",
                          color: "#6c757d"
                        }}
                      ></i>

                      <input
                        type="text"
                        className="form-control shadow-sm ps-5"
                        placeholder="Search examinee..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                          borderRadius: "15px",
                          height: "55px"
                        }}
                      />

                    </div>

                  </div>

                </div>

                {/* Table */}
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
                        <th>S.No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Number</th>
                        <th>Address</th>
                        <th>College</th>
                        <th>Qualification</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>

                      {filteredData.length > 0 ? (

                        filteredData.map((item, i) => (

                          <tr key={item._id}>

                            <td className="fw-semibold">
                              {i + 1}
                            </td>

                            {/* Name */}
                            <td>
                              <div className="d-flex align-items-center">

                                <div
                                  className="rounded-circle text-white fw-bold d-flex justify-content-center align-items-center me-2"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    background:
                                      "linear-gradient(90deg,#4F46E5,#7C3AED)"
                                  }}
                                >
                                  {item.name?.charAt(0).toUpperCase()}
                                </div>

                                <span className="fw-semibold">
                                  {item.name}
                                </span>

                              </div>
                            </td>

                            {/* Email */}
                            <td>
                              <span className="text-primary">
                                {item.email}
                              </span>
                            </td>

                            {/* Mobile */}
                            <td>{item.number}</td>

                            {/* Address */}
                            <td>{item.address}</td>

                            {/* College */}
                            <td>
                              <span className="badge bg-info text-dark px-3 py-2">
                                {item.college}
                              </span>
                            </td>

                            {/* Qualification */}
                            <td>
                              <span
                                className="badge text-white px-3 py-2"
                                style={{
                                  background:
                                    "linear-gradient(90deg,#4F46E5,#7C3AED)"
                                }}
                              >
                                {item.qualification}
                              </span>
                            </td>

                            {/* Action */}
                            <td>

                              <div className="d-flex justify-content-center gap-2 flex-wrap">

                                <button
                                  className="btn btn-sm text-white px-3"
                                  style={{
                                    background:
                                      "linear-gradient(90deg,#4F46E5,#7C3AED)",
                                    borderRadius: "10px"
                                  }}
                                  onClick={() => handleEdit(item)}
                                >
                                  <i className="fa-solid fa-pen-to-square me-1"></i>
                                  Edit
                                </button>

                                <button
                                  className="btn btn-danger btn-sm px-3"
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

                          <td colSpan="8">

                            <div className="text-center py-5">

                              <i
                                className="fa-solid fa-users-slash mb-3"
                                style={{
                                  fontSize: "60px",
                                  color: "#7C3AED"
                                }}
                              ></i>

                              <h5 className="text-muted">
                                No matching records found
                              </h5>

                              <small className="text-secondary">
                                Search another examinee or add new users.
                              </small>

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

        </div>


      </div>


    </>

  );
};

export default Examinee;
