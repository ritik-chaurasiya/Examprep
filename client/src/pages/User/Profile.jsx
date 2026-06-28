import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import "./Profile.css";

const Profile = () => {
  const [personalEdit, setPersonalEdit] = useState(false);
  const [addressEdit, setAddressEdit] = useState(false);
  const [profilePic, setProfilePic] = useState("https://avatar.iran.liara.run/public/boy");
  const [selectedFile, setSelectedFile] = useState(null);

  const examineeId = localStorage.getItem("userId"); // from login
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
    college: "",
    qualification: "",
    status: "active",
  });

  const labels = {
    name: "Name",
    email: "Email",
    number: "Phone",
    address: "Address",
    college: "College",
    qualification: "Qualification",
  };

  const [totalExams, setTotalExams] = useState(0);
  const [passed, setPassed] = useState(0);
  const [failed, setFailed] = useState(0);

  // Fetch examinee details when component loads
  // useEffect(() => {
  //   const fetchExaminee = async () => {
  //     try {
  //       const res = await axios.get(`https://examprep-bxeo.onrender.com/api/examinee/${examineeId}`);
  //       console.log(res.data.data);
        
  //       if (res.data) {
  //         setFormData(res.data.data);
  //         if (res.data.profileImage) {
  //           setProfilePic(`https://examprep-bxeo.onrender.com/uploads/${res.data.profileImage}`);
  //         }
  //       }
  //     } catch (err) {
  //       console.error("Failed to fetch examinee:", err);
  //     }
  //   };
  //   if (examineeId) fetchExaminee();
  // }, [examineeId]);

  useEffect(() => {
    const fetchExaminee = async () => {
      try {
        const res = await axios.get(
          `https://examprep-bxeo.onrender.com/api/examinee/${examineeId}`
        );

        setFormData(res.data.data);

        if (res.data.data.profileImage) {
          setProfilePic(
            `https://examprep-bxeo.onrender.com/uploads/${res.data.data.profileImage}`
          );
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (examineeId) fetchExaminee();
  }, [examineeId]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const userId = localStorage.getItem("userId");

        const total = await axios.get(
          `https://examprep-bxeo.onrender.com/api/dashboard/exams/${userId}`
        );

        const pass = await axios.get(
          `https://examprep-bxeo.onrender.com/api/dashboard/examinee-result/${userId}`
        );

        setTotalExams(total.data.totalExams);
        setPassed(pass.data.message);

        setFailed(total.data.totalExams - pass.data.message);

      } catch (err) {
        console.log(err);
      }
    };

    fetchDashboard();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile picture upload
  const handlePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setProfilePic(URL.createObjectURL(file));
    }
  };

  // Save/Update data
  const handleSave = async () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (selectedFile) {
      data.append("profileImage", selectedFile);
    }

    try {
      const res = await axios.put(
        `https://examprep-bxeo.onrender.com/api/examinee/${examineeId}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (res.data.success) {
        toast.success("Profile updated successfully ✅");
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed ❌");
    }
  };

  // return (
  //   <div className="container-fluid px-2 px-md-4 my-4">
  //     <div className="row justify-content-center">
  //       <div className="col-12 col-lg-9 col-xl-8">

  //         {/* ================= Profile Header ================= */}
  //         <div className="card shadow-sm mb-4 profile-card">
  //           <div className="card-body">
  //             <div className="row align-items-center text-center text-md-start">
  //               <div className="col-12 col-md-auto mb-3 mb-md-0">
  //                 <img
  //                   src={profilePic}
  //                   alt={`${formData.name}'s profile`}
  //                   className="profile-img mx-auto mx-md-0"
  //                 />
  //               </div>

  //               <div className="col">
  //                 <h5 className="mb-1">{formData.name}</h5>
  //                 <p className="text-muted mb-2">{formData.email}</p>

  //                 <label className="btn btn-sm btn-outline-primary">
  //                   Upload Photo
  //                   <input
  //                     type="file"
  //                     hidden
  //                     onChange={handlePicUpload}
  //                     accept="image/*"
  //                   />
  //                 </label>
  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //         {/* ================= Personal Info ================= */}
  //         <div className="card shadow-sm mb-4 profile-section">
  //           <div className="card-body">
  //             <div className="d-flex justify-content-between align-items-center mb-3">
  //               <h6 className="mb-0 fw-bold">Personal Information</h6>
  //               <button
  //                 className="btn btn-sm btn-warning"
  //                 onClick={() => {
  //                   if (personalEdit) handleSave();
  //                   setPersonalEdit(!personalEdit);
  //                 }}
  //               >
  //                 {personalEdit ? "Save ✅" : "Edit ✏️"}
  //               </button>
  //             </div>

  //             <div className="row">
  //               {["name", "email", "number", "college", "qualification"].map(
  //                 (field, i) => (
  //                   <div className="col-12 col-md-6 mb-3" key={i}>
  //                     <label className="form-label fw-semibold">
  //                       {labels[field]}
  //                     </label>
  //                     <input
  //                       type="text"
  //                       name={field}
  //                       className="form-control"
  //                       value={formData[field]}
  //                       onChange={handleChange}
  //                       disabled={!personalEdit}
  //                     />
  //                   </div>
  //                 )
  //               )}
  //             </div>
  //           </div>
  //         </div>

  //         {/* ================= Address ================= */}
  //         <div className="card shadow-sm profile-section">
  //           <div className="card-body">
  //             <div className="d-flex justify-content-between align-items-center mb-3">
  //               <h6 className="mb-0 fw-bold">Address</h6>
  //               <button
  //                 className="btn btn-sm btn-warning"
  //                 onClick={() => {
  //                   if (addressEdit) handleSave();
  //                   setAddressEdit(!addressEdit);
  //                 }}
  //               >
  //                 {addressEdit ? "Save ✅" : "Edit ✏️"}
  //               </button>
  //             </div>

  //             <div className="row">
  //               <div className="col-12">
  //                 <label className="form-label fw-semibold">
  //                   Address
  //                 </label>
  //                 <input
  //                   type="text"
  //                   name="address"
  //                   className="form-control"
  //                   value={formData.address}
  //                   onChange={handleChange}
  //                   disabled={!addressEdit}
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //       </div>
  //     </div>
  //   </div>

  // );
  
  return (
    <div
      className="container-fluid py-4"
      style={{
        background: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      <div className="row justify-content-center">

        <div className="col-12 col-xl-11">

          {/* ================= Header ================= */}

          <div
            className="card border-0 shadow-lg mb-4"
            style={{
              borderRadius: "25px",
              background: "linear-gradient(90deg,#4F46E5,#7C3AED)",
            }}
          >
            <div className="card-body">

              <div className="row align-items-center">

                <div className="col-lg-8">

                  <h2 className="text-white fw-bold mb-2">

                    <i className="fa-solid fa-user-graduate me-2"></i>

                    My Profile

                  </h2>

                  <p className="text-white-50 mb-0">

                    Manage your personal information and account details.

                  </p>

                </div>

                <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">

                  <span
                    className="badge bg-white text-primary px-4 py-3 rounded-pill fs-6"
                  >

                    Active Student

                  </span>

                </div>

              </div>

            </div>

          </div>



          {/* ================= Profile Card ================= */}

          <div
            className="card border-0 shadow-lg mb-4"
            style={{
              borderRadius: "25px",
            }}
          >

            <div className="card-body p-4">

              <div className="row align-items-center">

                {/* Profile Image */}

                <div className="col-lg-3 text-center mb-4 mb-lg-0">

                  <img
                    src={profilePic}
                    alt="Profile"
                    className="rounded-circle border border-4 border-primary shadow"
                    style={{
                      width: "170px",
                      height: "170px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="mt-3">

                    <label
                      className="btn btn-primary rounded-pill px-4"
                      style={{
                        background:
                          "linear-gradient(90deg,#4F46E5,#7C3AED)",
                        border: "none",
                      }}
                    >

                      <i className="fa-solid fa-camera me-2"></i>

                      Upload Photo

                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handlePicUpload}
                      />

                    </label>

                  </div>

                </div>



                {/* User Info */}

                <div className="col-lg-9">

                  <h2
                    className="fw-bold mb-2"
                    style={{ color: "#4F46E5" }}
                  >
                    {formData.name}
                  </h2>

                  <p className="text-muted mb-4">

                    <i className="fa-solid fa-envelope me-2"></i>

                    {formData.email}

                  </p>



                  <div className="row g-3">

                    <div className="col-md-6">

                      <div className="card border-0 bg-light">

                        <div className="card-body">

                          <small className="text-muted">

                            Phone Number

                          </small>

                          <h6 className="fw-bold mt-1">

                            {formData.number || "Not Available"}

                          </h6>

                        </div>

                      </div>

                    </div>



                    <div className="col-md-6">

                      <div className="card border-0 bg-light">

                        <div className="card-body">

                          <small className="text-muted">

                            Qualification

                          </small>

                          <h6 className="fw-bold mt-1">

                            {formData.qualification || "Not Available"}

                          </h6>

                        </div>

                      </div>

                    </div>



                    <div className="col-md-6">

                      <div className="card border-0 bg-light">

                        <div className="card-body">

                          <small className="text-muted">

                            College

                          </small>

                          <h6 className="fw-bold mt-1">

                            {formData.college || "Not Available"}

                          </h6>

                        </div>

                      </div>

                    </div>



                    <div className="col-md-6">

                      <div className="card border-0 bg-light">

                        <div className="card-body">

                          <small className="text-muted">

                            Status

                          </small>

                          <h6 className="fw-bold text-success mt-1">

                            {formData.status}

                          </h6>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>



          {/* ================= Dashboard Stats ================= */}

          <div className="row g-4 mb-4">

            <div className="col-12 col-md-4">

              <div
                className="card border-0 shadow h-100"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-body text-center">

                  <i
                    className="fa-solid fa-file-lines mb-3"
                    style={{
                      fontSize: "45px",
                      color: "#4F46E5",
                    }}
                  ></i>

                  <h6>Total Exams</h6>

                  <h2 className="fw-bold">

                    {totalExams}

                  </h2>

                </div>
              </div>

            </div>



            <div className="col-12 col-md-4">

              <div
                className="card border-0 shadow h-100"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-body text-center">

                  <i
                    className="fa-solid fa-circle-check mb-3 text-success"
                    style={{ fontSize: "45px" }}
                  ></i>

                  <h6>Passed</h6>

                  <h2 className="fw-bold text-success">

                    {passed}

                  </h2>

                </div>
              </div>

            </div>



            <div className="col-12 col-md-4">

              <div
                className="card border-0 shadow h-100"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-body text-center">

                  <i
                    className="fa-solid fa-circle-xmark mb-3 text-danger"
                    style={{ fontSize: "45px" }}
                  ></i>

                  <h6>Failed</h6>

                  <h2 className="fw-bold text-danger">

                    {failed}

                  </h2>

                </div>
              </div>

            </div>

          </div>
          {/* ================= Personal Information ================= */}

          <div
            className="card border-0 shadow-lg mb-4"
            style={{
              borderRadius: "25px",
            }}
          >
            <div className="card-body p-4">

              <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                  <h4
                    className="fw-bold mb-1"
                    style={{ color: "#4F46E5" }}
                  >
                    <i className="fa-solid fa-user me-2"></i>

                    Personal Information

                  </h4>

                  <small className="text-muted">
                    Update your personal information
                  </small>

                </div>

                <button
                  className={`btn ${personalEdit ? "btn-success" : "btn-primary"
                    } rounded-pill px-4`}
                  style={{
                    background: personalEdit
                      ? "#198754"
                      : "linear-gradient(90deg,#4F46E5,#7C3AED)",
                    border: "none",
                  }}
                  onClick={() => {
                    if (personalEdit) handleSave();
                    setPersonalEdit(!personalEdit);
                  }}
                >
                  <i
                    className={`fa-solid ${personalEdit ? "fa-floppy-disk" : "fa-pen"
                      } me-2`}
                  ></i>

                  {personalEdit ? "Save Changes" : "Edit"}

                </button>

              </div>

              <div className="row g-4">

                <div className="col-md-6">

                  <label className="form-label fw-bold">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    className="form-control form-control-lg"
                    value={formData.name}
                    disabled={!personalEdit}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-6">

                  <label className="form-label fw-bold">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg"
                    value={formData.email}
                    disabled={!personalEdit}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-6">

                  <label className="form-label fw-bold">
                    Mobile Number
                  </label>

                  <input
                    type="text"
                    name="number"
                    className="form-control form-control-lg"
                    value={formData.number}
                    disabled={!personalEdit}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-6">

                  <label className="form-label fw-bold">
                    Qualification
                  </label>

                  <input
                    type="text"
                    name="qualification"
                    className="form-control form-control-lg"
                    value={formData.qualification}
                    disabled={!personalEdit}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-12">

                  <label className="form-label fw-bold">
                    College Name
                  </label>

                  <input
                    type="text"
                    name="college"
                    className="form-control form-control-lg"
                    value={formData.college}
                    disabled={!personalEdit}
                    onChange={handleChange}
                  />

                </div>

              </div>

            </div>
          </div>





          {/* ================= Address ================= */}

          <div
            className="card border-0 shadow-lg"
            style={{
              borderRadius: "25px",
            }}
          >
            <div className="card-body p-4">

              <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                  <h4
                    className="fw-bold mb-1"
                    style={{ color: "#4F46E5" }}
                  >
                    <i className="fa-solid fa-location-dot me-2"></i>

                    Address Information

                  </h4>

                  <small className="text-muted">
                    Update your address details
                  </small>

                </div>

                <button
                  className={`btn ${addressEdit ? "btn-success" : "btn-primary"
                    } rounded-pill px-4`}
                  style={{
                    background: addressEdit
                      ? "#198754"
                      : "linear-gradient(90deg,#4F46E5,#7C3AED)",
                    border: "none",
                  }}
                  onClick={() => {
                    if (addressEdit) handleSave();
                    setAddressEdit(!addressEdit);
                  }}
                >
                  <i
                    className={`fa-solid ${addressEdit ? "fa-floppy-disk" : "fa-pen"
                      } me-2`}
                  ></i>

                  {addressEdit ? "Save Address" : "Edit"}

                </button>

              </div>

              <label className="form-label fw-bold">
                Complete Address
              </label>

              <textarea
                rows="5"
                className="form-control form-control-lg"
                name="address"
                value={formData.address}
                disabled={!addressEdit}
                onChange={handleChange}
                placeholder="Enter your full address..."
              ></textarea>

            </div>
          </div>
          {/* ================= Account Overview ================= */}

          <div className="row mt-4 g-4">

            <div className="col-lg-8">

              <div
                className="card border-0 shadow-lg h-100"
                style={{
                  borderRadius: "25px",
                }}
              >

                <div className="card-body p-4">

                  <h4
                    className="fw-bold mb-4"
                    style={{ color: "#4F46E5" }}
                  >
                    <i className="fa-solid fa-circle-info me-2"></i>

                    Account Overview

                  </h4>

                  <div className="row">

                    <div className="col-md-6 mb-4">

                      <div className="card bg-light border-0">

                        <div className="card-body">

                          <small className="text-muted">

                            Student Name

                          </small>

                          <h5 className="fw-bold mt-2">

                            {formData.name}

                          </h5>

                        </div>

                      </div>

                    </div>

                    <div className="col-md-6 mb-4">

                      <div className="card bg-light border-0">

                        <div className="card-body">

                          <small className="text-muted">

                            Email Address

                          </small>

                          <h5 className="fw-bold mt-2">

                            {formData.email}

                          </h5>

                        </div>

                      </div>

                    </div>

                    <div className="col-md-6 mb-4">

                      <div className="card bg-light border-0">

                        <div className="card-body">

                          <small className="text-muted">

                            Phone Number

                          </small>

                          <h5 className="fw-bold mt-2">

                            {formData.number || "Not Available"}

                          </h5>

                        </div>

                      </div>

                    </div>

                    <div className="col-md-6 mb-4">

                      <div className="card bg-light border-0">

                        <div className="card-body">

                          <small className="text-muted">

                            College

                          </small>

                          <h5 className="fw-bold mt-2">

                            {formData.college || "Not Available"}

                          </h5>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* ================= Profile Completion ================= */}

            <div className="col-lg-4">

              <div
                className="card border-0 shadow-lg h-100"
                style={{
                  borderRadius: "25px",
                }}
              >

                <div className="card-body text-center">

                  <h4
                    className="fw-bold mb-4"
                    style={{ color: "#4F46E5" }}
                  >
                    Profile Status
                  </h4>

                  <div
                    className="rounded-circle mx-auto d-flex justify-content-center align-items-center text-white fw-bold"
                    style={{
                      width: "140px",
                      height: "140px",
                      fontSize: "32px",
                      background:
                        "linear-gradient(135deg,#4F46E5,#7C3AED)",
                    }}
                  >

                    100%

                  </div>

                  <h5 className="mt-4 fw-bold">

                    Profile Completed

                  </h5>

                  <p className="text-muted">

                    Your profile information is complete.
                    Keep it updated for a better experience.

                  </p>

                  <hr />

                  <div className="text-start">

                    <p>

                      <i className="fa-solid fa-circle-check text-success me-2"></i>

                      Personal Details

                    </p>

                    <p>

                      <i className="fa-solid fa-circle-check text-success me-2"></i>

                      Contact Details

                    </p>

                    <p>

                      <i className="fa-solid fa-circle-check text-success me-2"></i>

                      Address

                    </p>

                    <p>

                      <i className="fa-solid fa-circle-check text-success me-2"></i>

                      Academic Details

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Profile;
