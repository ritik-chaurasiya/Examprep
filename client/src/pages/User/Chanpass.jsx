import axios from 'axios';
import React, { useState } from 'react'
import { toast } from "react-toastify";

const Chanpass = () => {
    const userId = localStorage.getItem('userId');
    const[data , formData] = useState({
        op:'',
        np:'',
        cnp:'',
       
    })
    const handleChange = (e) =>{
        const {name , value} = e.target
        formData((prev)=>(
            {...prev,[name]:value}
        ));
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const res = await axios.put(`https://examprep-bxeo.onrender.com/api/examinee/change/${userId}`,data);
            if(res){
                toast.success("Password Changed")
            }
        }
        catch(er){
            toast.error("Sorry Try Again Later")
        }
    }

    return (
        <div
            className="container-fluid py-4"
            style={{
                background: "#F8FAFC",
                minHeight: "100vh",
            }}
        >
            <div className="row justify-content-center">

                <div className="col-12 col-md-10 col-lg-8 col-xl-6">

                    {/* Header */}

                    <div
                        className="card border-0 shadow-lg mb-4"
                        style={{
                            borderRadius: "25px",
                            background: "linear-gradient(90deg,#4F46E5,#7C3AED)",
                        }}
                    >
                        <div className="card-body text-center">

                            <div
                                className="rounded-circle bg-white d-inline-flex justify-content-center align-items-center mb-3"
                                style={{
                                    width: "80px",
                                    height: "80px",
                                }}
                            >
                                <i
                                    className="fa-solid fa-lock"
                                    style={{
                                        color: "#4F46E5",
                                        fontSize: "35px",
                                    }}
                                ></i>
                            </div>

                            <h2 className="text-white fw-bold">
                                Change Password
                            </h2>

                            <p className="text-white-50 mb-0">
                                Keep your account secure by updating your password regularly.
                            </p>

                        </div>
                    </div>

                    {/* Form */}

                    <div
                        className="card border-0 shadow-lg"
                        style={{
                            borderRadius: "25px",
                        }}
                    >

                        <div className="card-body p-4">

                            <form onSubmit={handleSubmit}>

                                {/* Old Password */}

                                <div className="mb-4">

                                    <label className="form-label fw-bold">
                                        <i
                                            className="fa-solid fa-key me-2"
                                            style={{ color: "#4F46E5" }}
                                        ></i>

                                        Old Password

                                    </label>

                                    <input
                                        type="password"
                                        name="op"
                                        className="form-control form-control-lg"
                                        placeholder="Enter old password"
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                {/* New Password */}

                                <div className="mb-4">

                                    <label className="form-label fw-bold">

                                        <i
                                            className="fa-solid fa-lock me-2"
                                            style={{ color: "#4F46E5" }}
                                        ></i>

                                        New Password

                                    </label>

                                    <input
                                        type="password"
                                        name="np"
                                        className="form-control form-control-lg"
                                        placeholder="Enter new password"
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                {/* Confirm Password */}

                                <div className="mb-4">

                                    <label className="form-label fw-bold">

                                        <i
                                            className="fa-solid fa-shield-halved me-2"
                                            style={{ color: "#4F46E5" }}
                                        ></i>

                                        Confirm Password

                                    </label>

                                    <input
                                        type="password"
                                        name="cnp"
                                        className="form-control form-control-lg"
                                        placeholder="Confirm new password"
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                {/* Password Tips */}

                                <div className="alert alert-light border-start border-4 border-primary">

                                    <h6 className="fw-bold mb-2">
                                        Password Tips
                                    </h6>

                                    <ul className="mb-0">

                                        <li>Minimum 8 characters</li>

                                        <li>Use uppercase & lowercase letters</li>

                                        <li>Include numbers and symbols</li>

                                    </ul>

                                </div>

                                {/* Button */}

                                <div className="d-grid mt-4">

                                    <button
                                        type="submit"
                                        className="btn btn-lg text-white fw-bold"
                                        style={{
                                            background:
                                                "linear-gradient(90deg,#4F46E5,#7C3AED)",
                                            borderRadius: "15px",
                                        }}
                                    >
                                        <i className="fa-solid fa-floppy-disk me-2"></i>

                                        Update Password

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default Chanpass