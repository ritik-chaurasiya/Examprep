
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
        const res = await axios.put(`http://localhost:5000/api/subject/${id.id}`,form);
        if(res){
          alert('Subject Updated Successfully')
           handlefetch();
        }
      }
      else{
        const res = await axios.post('http://localhost:5000/api/subject', form)
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
    const res = await axios.get('http://localhost:5000/api/subject')
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
    const res = await axios.delete(`http://localhost:5000/api/subject/${id}`);
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
    <div>
      <div className="container-fluid p-0">

        <div className="row ">
          <div className="col-sm-12 ">
           <div
              className="card"
              style={{
                border: "1px solid #6f42c1",
                minHeight: "220px",
                width: "100%",
              }}
            >
              <div className="">
                <form method="post" className="border p-2 rounded" onSubmit={handleSubmit}>
                  <div className="row ">
                    <div className="col-sm-12 ">
                      <h5 className="fw-bold" style={{ color: "#6f42c1" }}><i className="fa-solid fa-plus" style={{ marginRight: "8px" }}></i>Add New Subject</h5>
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-sm-12"><h6>Subject Name:</h6></div>
                    <div className="col-sm-12 ">
                      <input
                        type="text" name='subjectname' value={form.subjectname}
                        placeholder=""
                        className="form-control" onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-sm-12"><h6>Description</h6></div>
                    <div className="col-sm-12 ">
                      <textarea name="description" value={form.description} className="form-control" onChange={handleChange} placeholder="" rows="2"></textarea>
                    </div>
                  </div>
                  
                  <button type="submit" className="btn btn-light text-white  mt-1" style={{ background: "#39064fff " }}>Add Subject</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-sm-12">
            <div className="card mx-auto mt-2 "  style={{
                border: "1px solid #6f42c1",
                width: "100%",
              }}>
              <div className="card-body">
                <div className="container p-0">
                  <h3 className="fw-bold" style={{ color: "#6f42c1" }}>Subject List</h3>
                  <table className="table table-bordered text-center">
                    <thead className="thead-light-purple">
                      <tr>
                        <th> S.No.</th>
                        <th> Subject Name</th>
                        <th> Description</th>
                        
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {Map through subjects data here} */}

                      {data.map((item, i) => (
                        <tr key={item._id }>
                          <td>{i + 1}</td>
                          <td>{item.subjectname}</td>
                          <td>{item.description}</td>
                         
                          <td>
                            <button className="btn-edit me-2" onClick={() => {
                              handleEdit(item)
                            }}>Edit</button>


                            <button  className="btn-delete"  onClick={() => {
                              handleDelete(item._id)
                            }}>Delete</button>
                          </td>
                        </tr>
                      ))}

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subject;