
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { Offcanvas } from "bootstrap";

const UserDash = () => {

    const [collapsed] = useState(false);

    const role = localStorage.getItem("userRole");

    if (role === "user") {
        var email = localStorage.getItem("userEmail");
    } else {
        window.location.href = "/";
    }

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

    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";

        return "Good Evening";
    };

    const userName = localStorage.getItem("name") || "Student";
    const userEmail = localStorage.getItem("userEmail") || "student@gmail.com";

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
                    background:
                        "linear-gradient(90deg,#0F172A,#1E1B4B,#7C3AED)"
                }}
            >

                {/* Left */}
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
                                Examinee Panel
                            </small>
                        </div>

                    </div>

                </div>

                {/* Right */}
                <div className="ms-auto d-flex align-items-center gap-3">

                    {/* Greeting */}
                    <div className="text-end d-none d-md-block">

                        <h6 className="text-white mb-0 fw-semibold">
                            {getGreeting()}
                        </h6>

                        <small className="text-light opacity-75">
                            Welcome Student
                        </small>

                    </div>

                    {/* Profile Dropdown */}
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
                                    className="fa-solid fa-user-graduate"
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
                                    {userName}
                                </h5>

                                <small className="text-muted">
                                    {userEmail}
                                </small>

                            </div>

                            <hr />

                            <button
                                className="dropdown-item py-2"
                                onClick={() => navigate("/userdash/profile")}
                            >
                                <i className="fa-solid fa-user me-2"></i>
                                Profile
                            </button>

                            <button
                                className="dropdown-item py-2"
                                onClick={() => navigate("/userdash/chanpass")}
                            >
                                <i className="fa-solid fa-lock me-2"></i>
                                Change Password
                            </button>

                            <hr />
                            <button
                                className="dropdown-item text-danger py-2"
                                onClick={() => {
                                    localStorage.removeItem("userRole");
                                    localStorage.removeItem("userEmail");
                                    localStorage.removeItem("userId");
                                    window.location.href = "/";
                                }}
                            >
                                <i className="fa-solid fa-right-from-bracket me-2"></i>
                                Logout
                            </button>

                        </div>
                    </div>

                </div>
            </nav>

            {/* Main Row */}
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
                            to="/userdash"
                        >
                            ExamPrep AI
                        </Link>
                    </div>

                    {/* Menus */}
                    <ul className="nav flex-column p-3 gap-2">

                        <li>
                            <Link className="nav-link text-light" to="/userdash">
                                <i className="fa-solid fa-house me-2"></i>
                                Dashboard
                            </Link>
                        </li>

                        <li>
                            <Link className="nav-link text-light" to="/userdash/profile">
                                <i className="fa-solid fa-user me-2"></i>
                                Profile
                            </Link>
                        </li>

                        <li>
                            <Link className="nav-link text-light" to="/userdash/myexam">
                                <i className="fa-solid fa-file-pen me-2"></i>
                                My Exams
                            </Link>
                        </li>

                        <li>
                            <Link className="nav-link text-light" to="/userdash/results">
                                <i className="fa-solid fa-square-poll-horizontal me-2"></i>
                                Results
                            </Link>
                        </li>

                        <li>
                            <Link className="nav-link text-light" to="/userdash/chanpass">
                                <i className="fa-solid fa-lock me-2"></i>
                                Change Password
                            </Link>
                        </li>

                        <li>
                            <Link className="nav-link text-light" to="/userdash/contact1">
                                <i className="fa-solid fa-envelope me-2"></i>
                                Contact Us
                            </Link>
                        </li>

                        <li className="mt-4">
                            <button
                                className="btn btn-danger w-100"
                                onClick={() => {
                                    localStorage.removeItem("userRole");
                                    localStorage.removeItem("userEmail");
                                    localStorage.removeItem("userId");
                                    window.location.href = "/";
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

                    <div
                        className="card border-0 shadow-lg rounded-4"
                        style={{
                            minHeight: "85vh",
                            background: "#ffffff"
                        }}
                    >
                        <div className="card-body">

                            <Outlet />

                        </div>
                    </div>

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
                        <h4 className="fw-bold text-white mb-0">
                            ExamPrep AI
                        </h4>

                        <small className="text-light opacity-75">
                            Examinee Panel
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
                                onClick={() => handleNavigation("/userdash")}
                            >
                                <i className="fa-solid fa-house me-3"></i>
                                Dashboard
                            </button>
                        </li>

                        <li>
                            <button
                                className="btn text-white text-start rounded-pill px-3 py-2 w-100"
                                onClick={() => handleNavigation("/userdash/profile")}
                            >
                                <i className="fa-solid fa-user me-3"></i>
                                Profile
                            </button>
                        </li>

                        <li>
                            <button
                                className="btn text-white text-start rounded-pill px-3 py-2 w-100"
                                onClick={() => handleNavigation("/userdash/myexam")}
                            >
                                <i className="fa-solid fa-file-pen me-3"></i>
                                My Exams
                            </button>
                        </li>

                        <li>
                            <button
                                className="btn text-white text-start rounded-pill px-3 py-2 w-100"
                                onClick={() => handleNavigation("/userdash/results")}
                            >
                                <i className="fa-solid fa-square-poll-horizontal me-3"></i>
                                Results
                            </button>
                        </li>

                        <li>
                            <button
                                className="btn text-white text-start rounded-pill px-3 py-2 w-100"
                                onClick={() => handleNavigation("/userdash/chanpass")}
                            >
                                <i className="fa-solid fa-lock me-3"></i>
                                Change Password
                            </button>
                        </li>

                        <li>
                            <button
                                className="btn text-white text-start rounded-pill px-3 py-2 w-100"
                                onClick={() => handleNavigation("/userdash/contact1")}
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

                                    localStorage.removeItem("userRole");
                                    localStorage.removeItem("userEmail");
                                    localStorage.removeItem("userId");

                                    window.location.href = "/";

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

export default UserDash;