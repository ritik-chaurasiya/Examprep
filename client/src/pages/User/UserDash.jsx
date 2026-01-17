import React, { useState } from 'react';
import { Link, Outlet } from 'react-router';

const UserDash = () => {
    const [collapsed] = useState(false);
    // const [examsData, setExamsData] = useState([]);

    const role = localStorage.getItem('userRole')
    if(role=="user"){
        var email = localStorage.getItem('userEmail')
    }
    else{
        window.location.href='/'
    }

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };


    return (
        <div className={`dashboard-container ${collapsed ? 'collapsed' : ''}`}>
            {/* Sidebar */}
            <div className="sidebar bg-dark text-white">
               <div className="sidebar-header p-2 border-b-2 " style={{borderBottom:'2px solid #bf9debff'}}>
          <Link className='nav-links text-light fs-4 text-decoration-none' to='/userdash'>Welcome</Link> <i className="fa-solid fa-user-tie ms-2"></i>
        </div>
                <ul className="list-unstyled p-3">

                    <li className="mb-2">
                        <Link
                            to="/userdash/profile"
                            className="d-flex align-items-center text-white text-decoration-none px-2 py-2 rounded sidebar-link"
                        >
                            <i className="fa-solid fa-user me-3"></i>
                            Profile
                        </Link>
                    </li>

                    <li className="mb-2">
                        <Link
                            to="/userdash/myexam"
                            className="d-flex align-items-center text-white text-decoration-none px-2 py-2 rounded sidebar-link"
                        >
                            <i className="fa-solid fa-pen-to-square me-3"></i>
                            My Exams
                        </Link>
                    </li>

                    <li className="mb-2">
                        <Link
                            to="/userdash/results"
                            className="d-flex align-items-center text-white text-decoration-none px-2 py-2 rounded sidebar-link"
                        >
                            <i className="fa-solid fa-trophy me-3"></i>
                            Result
                        </Link>
                    </li>

                    <li className="mb-2">
                        <Link
                            to="/userdash/chanpass"
                            className="d-flex align-items-center text-white text-decoration-none px-2 py-2 rounded sidebar-link"
                        >
                            <i className="fa-solid fa-key me-3"></i>
                            Change Password
                        </Link>
                    </li>

                    <li className="mb-2">
                        <Link
                            to="/userdash/contact1"
                            className="d-flex align-items-center text-white text-decoration-none px-2 py-2 rounded sidebar-link"
                        >
                            <i className="fa-solid fa-message me-3"></i>
                            Contact Us
                        </Link>
                    </li>

                    <li className="mt-3 border-top pt-3">
                        <button
                            className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
                            onClick={() => {
                                localStorage.removeItem("userRole");
                                localStorage.removeItem("userEmail");
                                localStorage.removeItem("userId");
                                window.location.href = "/";
                            }}
                        >
                            <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>
                            Log Out
                        </button>
                    </li>

                </ul>

            </div>

            {/* Main Content */}
            <div className="main">
                {/* Topbar */}
                <div className="topbar d-flex justify-content-between align-items-center p-3 border-bottom border-success bg-dark flex-wrap">

                    {/* Greeting */}
                    <h4 className="text-white mb-0 me-3">
                        {getGreeting()} <i className="fa-solid fa-user-tie ms-2"></i>
                    </h4>

                    {/* Dashboard title */}
                    <h4 className="text-white mb-0">
                        Examinee Dashboard
                    </h4>

                </div>




                {/* Dashboard Content */}
                   <div className="content p-4">
                    <Outlet />

              
                </div>
                 
            </div>
        </div>
    );
};

export default UserDash;
