import React, { useState } from 'react';
import { Link, Outlet } from 'react-router';
import Examination from './Examination';

const Dashboard = () => {

  const [collapsed] = useState(false);

  const role = localStorage.getItem('role')
  if (role == "admin") {
    var email = localStorage.getItem('email')
  }
  else {
    window.location.href = '/adlogin'
  }
 const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };
   
  return (
 <div className={`dashboard-container ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar">
  <div className="sidebar-header p-2 border-b-2 " style={{borderBottom:'2px solid #bf9debff'}}>
           <Link className='nav-links text-light fs-4 text-decoration-none' to='/admin'>Welcome</Link> <i className="fa-solid fa-user-tie ms-2"></i>
        </div>
        {/* <ul className="nav-links p-2">
          <li><i class="fa-solid fa-chart-bar"></i> <Link to="/admin/session" className='text-white text-decoration-none'>Session</Link>
          </li>
          <li> <i class="fa-solid fa-book-open"></i> <Link to="/admin/subject" className='text-white text-decoration-none'>Subject</Link></li>
          <li> <i className="fa-solid fa-user"></i><Link to="/admin/examineet" className='text-white text-decoration-none'> Examinee</Link></li>
          <li> <i class="fa-solid fa-question"></i><Link to="/admin/questionbank" className='text-white text-decoration-none'> Question Bank</Link></li>
          <li><i class="fa-solid fa-pen"></i><Link to="/admin/examination" className='text-white text-decoration-none'> Examination</Link></li>
          <li> <i class="fa-solid fa-trophy"></i><Link to="/admin/report" className='text-white text-decoration-none'> Report Generation</Link></li>
          <li><i class="fa-solid fa-square-poll-horizontal"></i><Link to="/admin/result" className='text-white text-decoration-none'> Result Declaration</Link></li>
           <li> <i class="fa-solid fa-calculator"></i> <Link to="/admin/password" className='text-white text-decoration-none'> Change Password</Link></li>
           <li><i class="fa-solid fa-message"></i> <Link to="/admin/contact" className='text-white text-decoration-none'>Contact Us</Link></li>
          <li><i class="fa-solid fa-arrow-right-from-bracket"></i> <Link className='text-decoration-none text-white' onClick={() => {
            localStorage.removeItem('role')
            localStorage.removeItem('email')
            window.location.href = '/adlogin'
          }}>Log Out</Link></li>
        </ul> */}
        <ul className="nav flex-column gap-2 p-2">

          <li className="nav-item">
            <Link to="/admin/session" className="nav-link text-white d-flex align-items-center gap-2">
              <i className="fa-solid fa-chart-bar"></i>
              <span>Session</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/admin/subject" className="nav-link text-white d-flex align-items-center gap-2">
              <i className="fa-solid fa-book-open"></i>
              <span>Subject</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/admin/examineet" className="nav-link text-white d-flex align-items-center gap-2">
              <i className="fa-solid fa-user"></i>
              <span>Examinee</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/admin/questionbank" className="nav-link text-white d-flex align-items-center gap-2">
              <i className="fa-solid fa-question"></i>
              <span>Question Bank</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/admin/examination" className="nav-link text-white d-flex align-items-center gap-2">
              <i className="fa-solid fa-pen"></i>
              <span>Examination</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/admin/report" className="nav-link text-white d-flex align-items-center gap-2">
              <i className="fa-solid fa-trophy"></i>
              <span>Report Generation</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/admin/result" className="nav-link text-white d-flex align-items-center gap-2">
              <i className="fa-solid fa-square-poll-horizontal"></i>
              <span>Result Declaration</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/admin/password" className="nav-link text-white d-flex align-items-center gap-2">
              <i className="fa-solid fa-calculator"></i>
              <span>Change Password</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/admin/contact" className="nav-link text-white d-flex align-items-center gap-2">
              <i className="fa-solid fa-message"></i>
              <span>Contact Us</span>
            </Link>
          </li>

          {/* LOGOUT */}
          <li className="nav-item mt-3">
            <button
              className="btn btn-danger btn-sm w-100 d-flex align-items-center justify-content-center gap-2"
              onClick={() => {
                localStorage.removeItem("role");
                localStorage.removeItem("email");
                window.location.href = "/adlogin";
              }}
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              Log Out
            </button>
          </li>

        </ul>

      </div>

      <div className="main">
        <div className="topbar d-flex justify-content-between align-items-center p-3 border-bottom border-success bg-dark flex-wrap">

          {/* Greeting */}
          <h4 className="text-white mb-0">
            {getGreeting()} <i className="fa-solid fa-user-tie ms-2"></i>
          </h4>

          {/* Dashboard Title */}
          <h4 className="text-white mb-0 text-md-end mt-2 mt-md-0">
            Admin Dashboard
          </h4>

        </div>

          
        <div className="content">
          <Outlet />
         
        </div>
      </div>
    </div>
  );
};

export default Dashboard;