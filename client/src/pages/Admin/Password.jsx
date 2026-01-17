import React,{useState} from 'react'
import axios from 'axios'

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
                alert(res.data.message);
                if(res.data.message==="password changed successfully"){
                    localStorage.removeItem('email');
                    localStorage.removeItem('role');
                    window.location.href='/adlogin';
                }
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

                            <form onSubmit={handleSubmit} method="post">
                                {/* Heading */}
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <h5 className="fw-bold" style={{ color: "#6f42c1" }}>
                                            <i className="fa-solid fa-lock me-2"></i>
                                            Update Password
                                        </h5>
                                    </div>
                                </div>

                                {/* Old Password */}
                                <div className="row mb-3">
                                    <div className="col-12">
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
                                </div>

                                {/* New Password */}
                                <div className="row mb-3">
                                    <div className="col-12">
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
                                </div>

                                {/* Confirm Password */}
                                <div className="row mb-4">
                                    <div className="col-12">
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
                                </div>

                                {/* Submit */}
                                <div className="row">
                                    <div className="col-12 d-grid">
                                        <button
                                            type="submit"
                                            className="btn text-white"
                                            style={{ background: "#39064fff" }}
                                        >
                                            Update Password
                                        </button>
                                    </div>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Password;