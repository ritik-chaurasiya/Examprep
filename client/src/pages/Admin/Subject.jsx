
import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

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
    id: '',
  })
  const handleSubmit = async (e) => {
    // window.alert("hello");
    e.preventDefault();
    try {
      if (editform) {
        const res = await axios.put(`https://examprep-bxeo.onrender.com/api/subject/${id.id}`, form);
        if (res) {
          toast.success('Subject Updated Successfully')
          handlefetch();
        }
      }
      else {
        const res = await axios.post('https://examprep-bxeo.onrender.com/api/subject', form)
        if (res) {
          toast.success('Subject Added Successfully')
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
      subjectname: item.subjectname,
      description: item.description,

    })
    setId({
      id: item._id
    })
    setEditForm(true);
    // console.log(form);
  }
  return (

    <div className="container-fluid p-3">

      {/* ADD SUBJECT */}
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">

          <div
            className="card border-0 shadow-lg"
            style={{
              borderRadius: "25px"
            }}
          >
            <div className="card-body p-4">

              <h3
                className="fw-bold mb-4"
                style={{
                  color: "#312E81"
                }}
              >
                <i className="fa-solid fa-book-medical me-2"></i>
                Add New Subject
              </h3>

              <form onSubmit={handleSubmit}>

                {/* Subject Name */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Subject Name
                  </label>

                  <input
                    type="text"
                    name="subjectname"
                    value={form.subjectname}
                    onChange={handleChange}
                    className="form-control shadow-sm"
                    placeholder="Enter Subject Name"
                    required
                    style={{
                      borderRadius: "15px",
                      height: "55px"
                    }}
                  />
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Description
                  </label>

                  <textarea
                    name="description"
                    rows="4"
                    value={form.description}
                    onChange={handleChange}
                    className="form-control shadow-sm"
                    placeholder="Enter Description"
                    style={{
                      borderRadius: "15px"
                    }}
                  ></textarea>
                </div>

                {/* Button */}
                <button
                  className="btn text-white fw-bold px-4 py-3"
                  style={{
                    background:
                      "linear-gradient(90deg,#4F46E5,#7C3AED)",
                    borderRadius: "15px"
                  }}
                >
                  <i className="fa-solid fa-plus me-2"></i>
                  Add Subject
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>

      {/* SUBJECT LIST */}
      <div className="row mt-5">
        <div className="col-12">

          <div
            className="card border-0 shadow-lg"
            style={{
              borderRadius: "25px"
            }}
          >

            <div className="card-body">

              {/* Header */}
              <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">

                <h3
                  className="fw-bold"
                  style={{
                    color: "#312E81"
                  }}
                >
                  <i className="fa-solid fa-book-open me-2"></i>
                  Subject List
                </h3>

                <span
                  className="badge fs-6 px-3 py-2"
                  style={{
                    background:
                      "linear-gradient(90deg,#4F46E5,#7C3AED)"
                  }}
                >
                  Total : {data.length}
                </span>

              </div>

              {/* Table */}
              <div className="table-responsive">

                <table className="table align-middle table-hover">

                  <thead
                    className="text-white"
                    style={{
                      background:
                        "linear-gradient(90deg,#4F46E5,#7C3AED)"
                    }}
                  >
                    <tr>
                      <th>S.No.</th>
                      <th>Subject Name</th>
                      <th>Description</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {data.length > 0 ? (
                      data.map((item, i) => (

                        <tr key={item._id}>

                          <td>{i + 1}</td>

                          <td>
                            <span className="fw-bold text-primary">
                              {item.subjectname}
                            </span>
                          </td>

                          <td>{item.description}</td>

                          <td>

                            <div className="d-flex gap-2 justify-content-center flex-wrap">

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
                          colSpan="4"
                          className="text-center text-muted py-5"
                        >
                          <i className="fa-solid fa-circle-info me-2"></i>
                          No Subjects Found
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