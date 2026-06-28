import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router';
import Examination from './Examination';
import { Offcanvas } from "bootstrap";
// import { useNavigate } from "react-router-dom";


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


  const navigate = useNavigate();

  const handleNavigation = (path) => {
    const sidebar = document.getElementById("sidebar");
    const bsOffcanvas = Offcanvas.getInstance(sidebar);

    if (bsOffcanvas) {
      bsOffcanvas.hide();
    }

    setTimeout(() => {
      navigate(path);
    }, 200);
  };

  const adminName = localStorage.getItem("name") || "Admin";
  const adminEmail = localStorage.getItem("email") || "admin@gmail.com";



  return (


    <div
      className="container-fluid min-vh-100 p-0"
      style={{
        background: "#F8FAFC"
         }}
    >
      {/* Top Navbar */}

      <nav
        className="navbar navbar-expand-lg sticky-top shadow-sm px-3 py-3"
        style={{
          background: "linear-gradient(90deg,#0F172A,#312E81,#7C3AED)"
        }}
      >
        {/* Left Side */}
        <div className="d-flex align-items-center">

          {/* Mobile Menu */}
          <button
            className="navbar-toggler border-0 d-lg-none me-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebar"
          >
            <i className="fa-solid fa-bars text-white fs-4"></i>
          </button>

          {/* Logo */}
          <div className="d-flex align-items-center">
            <div
              className="bg-white rounded-circle d-flex justify-content-center align-items-center"
              style={{
                width: "45px",
                height: "45px"
              }}
            >
              <i
                className="fa-solid fa-graduation-cap"
                style={{
                  color: "#4F46E5",
                  fontSize: "22px"
                }}
              ></i>
            </div>

            <div className="ms-3">
              <h5 className="text-white fw-bold mb-0">
                ExamPrep AI
              </h5>
              <small className="text-light opacity-75">
                Admin Panel
              </small>
            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="ms-auto d-flex align-items-center gap-3">

          {/* Greeting */}
          <div className="text-end d-none d-md-block">
            <h6 className="text-white mb-0 fw-semibold">
              {getGreeting()}
            </h6>
            <small className="text-light opacity-75">
              Welcome Admin
            </small>
          </div>

          {/* Profile */}
          {/* <div
            className="bg-white rounded-circle d-flex justify-content-center align-items-center shadow"
            style={{
              width: "45px",
              height: "45px"
            }}
          >
            <i
              className="fa-solid fa-user-tie"
              style={{
                color: "#4F46E5"
              }}
            ></i>
          </div> */}

          <div className="dropdown">

            <button
              className="btn p-0 border-0 bg-transparent"
              type="button"
              data-bs-toggle="dropdown"
            >
              <div
                className="bg-white rounded-circle d-flex justify-content-center align-items-center shadow"
                style={{
                  width: "45px",
                  height: "45px",
                  cursor: "pointer"
                }}
              >
                <i
                  className="fa-solid fa-user-tie"
                  style={{
                    color: "#4F46E5",
                    fontSize: "20px"
                  }}
                ></i>
              </div>
            </button>

            <div
              className="dropdown-menu dropdown-menu-end shadow border-0 p-3"
              style={{
                width: "280px",
                borderRadius: "20px"
              }}
            >

              {/* Profile Section */}
              <div className="text-center">

                <div
                  className="bg-primary rounded-circle mx-auto mb-3 d-flex justify-content-center align-items-center"
                  style={{
                    width: "75px",
                    height: "75px"
                  }}
                >
                  <i className="fa-solid fa-user text-white fs-2"></i>
                </div>

                <h5 className="fw-bold mb-1">
                  {adminName}
                </h5>

                <small className="text-muted">
                  {adminEmail}
                </small>

              </div>

              <hr />

              <button className="dropdown-item py-2">
                <i className="fa-solid fa-user me-2"></i>
                Profile
              </button>

              <button className="dropdown-item py-2">
                <i className="fa-solid fa-gear me-2"></i>
                Settings
              </button>

              <button
                className="dropdown-item py-2"
                onClick={() => navigate("/admin/password")}
              >
                <i className="fa-solid fa-lock me-2"></i>
                Change Password
              </button>

              <hr />

              <button
                className="dropdown-item text-danger py-2"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/adlogin";
                }}
              >
                <i className="fa-solid fa-right-from-bracket me-2"></i>
                Logout
              </button>

            </div>

          </div>

        </div>
      </nav>

      <div className="row g-0">

        {/* Desktop Sidebar */}
        <div
          className="col-lg-2 d-none d-lg-block shadow"
          style={{
            background: "#111827",
            minHeight: "100vh"
          }}
        >
          <div className="text-center py-4 border-bottom">
            <Link
              className="text-decoration-none text-white fs-4 fw-bold"
              to="/admin"
            >
              ExamPrep AI
            </Link>
          </div>
          
          {/* Menus */}

          <ul className="nav flex-column p-3 gap-2">

            <li>
              <Link className="nav-link text-light" to="/admin/session">
                <i className="fa-solid fa-chart-bar me-2"></i>
                Session
              </Link>
            </li>

            <li>
              <Link className="nav-link text-light" to="/admin/subject">
                <i className="fa-solid fa-book-open me-2"></i>
                Subject
              </Link>
            </li>

            <li>
              <Link className="nav-link text-light" to="/admin/examineet">
                <i className="fa-solid fa-user me-2"></i>
                Examinee
              </Link>
            </li>

            <li>
              <Link className="nav-link text-light" to="/admin/questionbank">
                <i className="fa-solid fa-question me-2"></i>
                Question Bank
              </Link>
            </li>

            <li>
              <Link className="nav-link text-light" to="/admin/examination">
                <i className="fa-solid fa-pen me-2"></i>
                Examination
              </Link>
            </li>

            <li>
              <Link className="nav-link text-light" to="/admin/report">
                <i className="fa-solid fa-trophy me-2"></i>
                Report
              </Link>
            </li>

            <li>
              <Link className="nav-link text-light" to="/admin/result">
                <i className="fa-solid fa-square-poll-horizontal me-2"></i>
                Result
              </Link>
            </li>

            <li>
              <Link className="nav-link text-light" to="/admin/password">
                <i className="fa-solid fa-lock me-2"></i>
                Change Password
              </Link>
            </li>

            <li>
              <Link className="nav-link text-light" to="/admin/contact">
                <i className="fa-solid fa-message me-2"></i>
                Contact Us
              </Link>
            </li>

            <li className="mt-4">
              <button
                className="btn btn-danger w-100"
                onClick={() => {
                  localStorage.removeItem("role");
                  localStorage.removeItem("email");
                  window.location.href = "/adlogin";
                }}
              >
                <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>
                Logout
              </button>
            </li>

          </ul>
        </div>

        {/* Main Content */}
        <div className="col-lg-10 col-12 p-4">
          <Outlet />
        </div>
      </div>

      {/* Mobile Sidebar */}



      <div
        className="offcanvas offcanvas-start border-0"
        tabIndex="-1"
        id="sidebar"
        style={{
          width: "280px",
          background: "linear-gradient(180deg,#0F172A,#1E1B4B,#312E81)"
        }}
      >
        {/* Header */}
        <div className="offcanvas-header border-bottom border-secondary">
          <div>
            <h4 className="fw-bold text-white mb-0">ExamPrep AI</h4>
            <small className="text-light opacity-75">
              Admin Panel
            </small>
          </div>

          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        {/* Body */}
        <div className="offcanvas-body d-flex flex-column">

          <ul className="nav flex-column gap-2">

            <li>
              <button
                className="btn text-white text-start rounded-pill px-3 py-2 w-100"
                onClick={() => handleNavigation("/admin/session")}
              >
                <i className="fa-solid fa-chart-bar me-3"></i>
                Session
              </button>
            </li>

            <li>
              <button
                className="btn text-white text-start rounded-pill px-3 py-2 w-100"
                onClick={() => handleNavigation("/admin/subject")}
              >
                <i className="fa-solid fa-book-open me-3"></i>
                Subject
              </button>
            </li>

            <li>
              <button
                className="btn text-white text-start rounded-pill px-3 py-2 w-100"
                onClick={() => handleNavigation("/admin/examineet")}
              >
                <i className="fa-solid fa-user me-3"></i>
                Examinee
              </button>
            </li>

            <li>
              <button
                className="btn text-white text-start rounded-pill px-3 py-2 w-100"
                onClick={() => handleNavigation("/admin/questionbank")}
              >
                <i className="fa-solid fa-circle-question me-3"></i>
                Question Bank
              </button>
            </li>

            <li>
              <button
                className="btn text-white text-start rounded-pill px-3 py-2 w-100"
                onClick={() => handleNavigation("/admin/examination")}
              >
                <i className="fa-solid fa-pen me-3"></i>
                Examination
              </button>
            </li>

            <li>
              <button
                className="btn text-white text-start rounded-pill px-3 py-2 w-100"
                onClick={() => handleNavigation("/admin/report")}
              >
                <i className="fa-solid fa-trophy me-3"></i>
                Report Generation
              </button>
            </li>

            <li>
              <button
                className="btn text-white text-start rounded-pill px-3 py-2 w-100"
                onClick={() => handleNavigation("/admin/result")}
              >
                <i className="fa-solid fa-square-poll-horizontal me-3"></i>
                Result Declaration
              </button>
            </li>

            <li>
              <button
                className="btn text-white text-start rounded-pill px-3 py-2 w-100"
                onClick={() => handleNavigation("/admin/password")}
              >
                <i className="fa-solid fa-lock me-3"></i>
                Change Password
              </button>
            </li>

            <li>
              <button
                className="btn text-white text-start rounded-pill px-3 py-2 w-100"
                onClick={() => handleNavigation("/admin/contact")}
              >
                <i className="fa-solid fa-envelope me-3"></i>
                Contact Us
              </button>
            </li>

          </ul>

          {/* Logout */}
          <div className="mt-auto pt-4">
            <button
              className="btn btn-danger w-100 rounded-pill py-2"
              onClick={() => {
                const sidebar = document.getElementById("sidebar");
                const bsOffcanvas = Offcanvas.getInstance(sidebar);

                if (bsOffcanvas) {
                  bsOffcanvas.hide();
                }

                setTimeout(() => {
                  localStorage.removeItem("role");
                  localStorage.removeItem("email");
                  window.location.href = "/adlogin";
                }, 200);
              }}
            >
              <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>
              Logout
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;