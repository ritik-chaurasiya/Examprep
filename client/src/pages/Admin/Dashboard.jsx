import React, { useState } from 'react';
import { Link, Outlet } from 'react-router';
import Examination from './Examination';

const Dashboard = () => {

  const [collapsed, setCollapsed] = useState(false);

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
        <ul className="nav-links p-2">
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
        </ul>
      </div>

      <div className="main">
        <div className="topbar d-flex justify-content-between align-items-center p-3 border-bottom border-success bg-dark">
          <h4 className="text-white mb-0">
                        {getGreeting()} <i className="fa-solid fa-user-tie ms-2"></i>
                    </h4>
          <h2>Admin Dashboard</h2>
        </div>
          
        <div className="content">
          <Outlet />
         
        </div>
      </div>
    </div>
  );
};

export default Dashboard;