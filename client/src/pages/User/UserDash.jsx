import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router';

const UserDash = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [examsData, setExamsData] = useState([]);

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
                <ul className="nav-links list-unstyled p-2">
                    <li className="mb-2">
                        <i className="fa-solid fa-user me-2"></i>
                        <Link to="/userdash/profile" className="text-white text-decoration-none">Profile</Link>
                    </li>
                    
                    <li className="mb-2">
                        <i className="fa-solid fa-pen-to-square me-2"></i>
                        <Link to="/userdash/myexam" className="text-white text-decoration-none">My Exams</Link>
                    </li>
                    <li className="mb-2">
                        <i className="fa-solid fa-trophy me-2"></i>
                        <Link to="/userdash/results" className="text-white text-decoration-none">Result</Link>
                    </li>
                    <li className="mb-2">
                        <i className="fa-solid fa-key me-2"></i>
                        <Link to="/userdash/chanpass" className="text-white text-decoration-none">Change Password</Link>
                    </li>
                    <li><i className="fa-solid fa-message"></i>
                    <Link to="/userdash/contact1" className="text-white text-decoration-none">Contact Us</Link>
                    </li>
                    <li><i className="fa-solid fa-arrow-right-from-bracket"></i> <Link className='text-decoration-none text-white' onClick={() => {
                             localStorage.removeItem('userRole')
                             localStorage.removeItem('userEmail')
                             localStorage.removeItem('userId')
                             window.location.href = '/'
                           }}>Log Out</Link></li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="main">
                {/* Topbar */}
                <div className="topbar d-flex justify-content-between align-items-center p-3 border-bottom border-success bg-dark">
                    {/* Greeting*/}
                    <h4 className="text-white mb-0">
                        {getGreeting()} <i className="fa-solid fa-user-tie ms-2"></i>
                    </h4>
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
