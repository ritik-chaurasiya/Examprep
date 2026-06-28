import React,{useState} from 'react'
import axios from 'axios'
import { toast } from "react-toastify";

const Password = () => {
   const email = localStorage.getItem('email');
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
            const res = await axios.put(`https://examprep-bxeo.onrender.com/api/admin/change/${email}`,data);
            if(res){
                toast.warning(res.data.message);
                if(res.data.message==="password changed successfully"){
                    localStorage.removeItem('email');
                    localStorage.removeItem('role');
                    window.location.href='/adlogin';
                }
            }
        }
        catch(er){
            toast.error("Sorry Try Again Later")
        }
    }
    return (
        <div className="container-fluid p-3">

            <div className="row justify-content-center">

                <div className="col-12 col-md-9 col-lg-6">

                    <div
                        className="card border-0 shadow-lg overflow-hidden"
                        style={{
                            borderRadius: "25px",
                            background: "rgba(255,255,255,.95)"
                        }}
                    >

                        {/* Header */}
                        <div
                            className="card-header border-0 py-4"
                            style={{
                                background:
                                    "linear-gradient(90deg,#4F46E5,#7C3AED)"
                            }}
                        >

                            <div className="d-flex align-items-center">

                                <div
                                    className="rounded-circle bg-white d-flex justify-content-center align-items-center me-3"
                                    style={{
                                        width: "60px",
                                        height: "60px"
                                    }}
                                >
                                    <i
                                        className="fa-solid fa-lock fs-3"
                                        style={{ color: "#4F46E5" }}
                                    ></i>
                                </div>

                                <div>

                                    <h3 className="text-white fw-bold mb-1">
                                        Change Password
                                    </h3>

                                    <small className="text-light">
                                        Update your account password securely
                                    </small>

                                </div>

                            </div>

                        </div>

                        {/* Body */}
                        <div className="card-body p-4">

                            <form onSubmit={handleSubmit}>

                                {/* Old Password */}
                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        Old Password
                                    </label>

                                    <div className="input-group">

                                        <span className="input-group-text bg-white">
                                            <i className="fa-solid fa-key"></i>
                                        </span>

                                        <input
                                            type="password"
                                            name="op"
                                            className="form-control py-3"
                                            placeholder="Enter old password"
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                </div>

                                {/* New Password */}
                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        New Password
                                    </label>

                                    <div className="input-group">

                                        <span className="input-group-text bg-white">
                                            <i className="fa-solid fa-lock"></i>
                                        </span>

                                        <input
                                            type="password"
                                            name="np"
                                            className="form-control py-3"
                                            placeholder="Enter new password"
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                </div>

                                {/* Confirm Password */}
                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        Confirm Password
                                    </label>

                                    <div className="input-group">

                                        <span className="input-group-text bg-white">
                                            <i className="fa-solid fa-shield-halved"></i>
                                        </span>

                                        <input
                                            type="password"
                                            name="cnp"
                                            className="form-control py-3"
                                            placeholder="Confirm password"
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                </div>

                                {/* Password Tips */}
                                <div
                                    className="alert border-0"
                                    style={{
                                        background: "#f5f3ff"
                                    }}
                                >
                                    <small className="text-secondary">
                                        <i className="fa-solid fa-circle-info me-2"></i>
                                        Password should contain at least 8 characters with numbers and special symbols.
                                    </small>
                                </div>

                                {/* Button */}
                                <button
                                    type="submit"
                                    className="btn text-white w-100 py-3 fw-bold shadow"
                                    style={{
                                        background:
                                            "linear-gradient(90deg,#4F46E5,#7C3AED)",
                                        borderRadius: "15px",
                                        border: "none"
                                    }}
                                >
                                    <i className="fa-solid fa-rotate me-2"></i>
                                    Update Password
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Password;