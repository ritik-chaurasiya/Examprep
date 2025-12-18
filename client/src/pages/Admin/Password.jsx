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
            const res =await axios.put(`http://localhost:5000/api/admin/change/${email}`,data);
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
        <div className='container-fluid p-0'>
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
                            <form onSubmit={handleSubmit} method="post" className="border p-2 rounded">
                                <div className="row ">
                                    <div className="col-sm-12 ">
                                        <h5 className="fw-bold" style={{ color: "#6f42c1" }}><i className="fa-solid fa-plus" style={{ marginRight: "8px" }}></i>Update Password</h5>
                                    </div>
                                </div>
                                <div className="row mt-1">
                                    <div className="col-sm-12"><h6>Old Password</h6></div>
                                    <div className="col-sm-12  ">
                                        <input
                                            type="text" name='op'
                                            placeholder=""
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-1">
                                    <div className="col-sm-12"><h6>New Password</h6></div>
                                    <div className="col-sm-12 ">
                                        <input name="np" 
                                        onChange={handleChange} 
                                        className="form-control" 
                                        placeholder="" 
                                        rows="2"/>
                                    </div>
                                </div>
                                <div className="row mt-1">
                                    <div className="col">
                                        <label><h6>Confirm New Password</h6></label>

                                        <input type="text" name="cnp" onChange={handleChange} className="form-control" placeholder="" aria-label="First name" />
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-light text-white  mt-1" style={{ background: "#39064fff " }} >Update Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Password;