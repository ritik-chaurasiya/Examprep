import axios from 'axios';
import React, { useState, useEffect } from 'react';

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
    const res = await axios.get('http://localhost:5000/api/examinee');
    setData(res.data.data);
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:5000/api/examinee/${id}`);
    if (res) {
      alert("Deleted Successfully");
    } else {
      alert("Try Again Later");
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
      await axios.put(`http://localhost:5000/api/examinee/${editingId}`, form);
      alert('Examinee Updated Successfully');
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
      alert("Error updating examinee");
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
     <div className='container-fluid p-0'>
       {editFormVisible && (
       <div className="card" style={{ border: "1px solid #6f42c1", width: "100%" }}>
          <div className="card-body">
            <h3 className="fw-bold" style={{ color: "#6f42c1" }}>Edit Examinee</h3>
            <form className="border p-2 rounded" onSubmit={handleSubmit}>
              <div className="row mb-2">
                <div className="col-sm-4">
                  <input className="form-control" name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
                </div>
                <div className="col-sm-4">
                  <input className="form-control" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
                </div>
                <div className="col-sm-4">
                  <input className="form-control" name="number" value={form.number} onChange={handleChange} placeholder="Number" required />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-4">
                  <input className="form-control" name="address" value={form.address} onChange={handleChange} placeholder="Address" />
                </div>
                <div className="col-sm-4">
                  <input className="form-control" name="college" value={form.college} onChange={handleChange} placeholder="College" />
                </div>
                <div className="col-sm-4">
                  <input className="form-control" name="qualification" value={form.qualification} onChange={handleChange} placeholder="Qualification" />
                </div>
              </div>
              <button type="submit" className="btn btn-light text-white mb-1 me-2" style={{ background: "#39064fff " }}>Update</button>
              <button type="button" className="btn-edit" onClick={() => setEditFormVisible(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      <div className="card mx-auto mt-2" style={{ border: "1px solid #6f42c1", width: "100%" }}>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-sm-6">
              <h3 className="fw-bold" style={{ color: "#6f42c1" }}>Examinee Details</h3>
            </div>
            <div className="col-sm-6 text-end">
              <input
                type="text"
                className="form-control"
                placeholder="Search examinee..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <table className="table table-bordered text-center">
                <thead className="thead-light-purple">
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
                      <tr key={item._id }>
                        <td>{i + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.number}</td>
                        <td>{item.address}</td>
                        <td>{item.college}</td>
                        <td>{item.qualification}</td>
                        <td>
                          <button className="btn-edit me-2" onClick={() => handleEdit(item)}>Edit</button>
                          <button className="btn-delete" onClick={() => handleDelete(item._id)}>Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8">No matching records found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
     </div>
    </>
  );
};

export default Examinee;
