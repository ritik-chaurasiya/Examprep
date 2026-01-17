import axios from 'axios';
import React, { useState } from 'react'

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
                alert("Password Changed")
            }
        }
        catch(er){
            alert("Sorry Try Again Later")
        }
    }
    return (
        <div className="container-fluid p-2">

            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">

                    <div
                        className="card border border-2"
                        style={{ borderColor: "#6f42c1" }}
                    >
                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                {/* Header */}
                                <h5 className="fw-bold mb-3" style={{ color: "#6f42c1" }}>
                                    <i className="fa-solid fa-lock me-2"></i>
                                    Update Password
                                </h5>

                                {/* Old Password */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Old Password
                                    </label>
                                    <input
                                        type="password"
                                        name="op"
                                        className="form-control"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* New Password */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="np"
                                        className="form-control"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Confirm Password */}
                                <div className="mb-4">
                                    <label className="form-label fw-semibold">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="cnp"
                                        className="form-control"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="btn w-100 text-white"
                                    style={{ background: "#39064fff" }}
                                >
                                    Update Password
                                </button>

                            </form>

                        </div>
                    </div>

                </div>
            </div>

        </div>

    )
}

export default Chanpass