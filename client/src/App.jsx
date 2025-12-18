import react, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Dashboard from "./pages/Admin/Dashboard";
import Session from "./pages/Admin/Session";
import Subject from "./pages/Admin/Subject";
import Examinee from "./pages/Admin/Examinee";
import AdminLogin from "./pages/Admin/AdminLogin";
import QuestionBank from "./pages/Admin/QuestionBank";
import UserDash from "./pages/User/Userdash";
import Examination from "./pages/Admin/Examination";
import Report from "./pages/Admin/Report";
import Contact from "./pages/Admin/Contact";
import ContactA from "./pages/User/ContactA";
import MyExam from "./pages/User/MyExam";
import Profile from "./pages/User/Profile";
import GetExam from "./pages/User/GetExam";
import Password from "./pages/Admin/Password";
import Chanpass from "./pages/User/Chanpass";
import ExamResultsDeclaration from "./pages/Admin/ExamResultDeclaration";
import Result from "./pages/User/Result";
import AdminHome from "./pages/Admin/AdminHome";
import Component from "./pages/Component";
import UserHome from "./pages/User/UserHome";


function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* registration route */}
          <Route path="*" element={<Component/>}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/register" element={<Registration />}></Route>
          {/* admin route */}
          <Route path='/adlogin' element={<AdminLogin />}></Route>
          <Route path="/admin/" element={<Dashboard />}>
          <Route index element={<AdminHome/>}></Route>
            <Route path="session" element={<Session />}></Route>
            <Route path="subject" element={<Subject />}></Route>
            <Route path="examineet" element={<Examinee />}></Route>
            <Route path="questionbank" element={<QuestionBank />}></Route>
            <Route path="examination" element={<Examination />}></Route>
            <Route path="report" element={<Report />}></Route>
            <Route path="result" element={<ExamResultsDeclaration/>}></Route>
            <Route path="contact" element={<Contact/>}></Route>
            <Route path="password" element={<Password/>}></Route>
            
          </Route>
          <Route path="*" element={<Component/>}></Route>
          <Route path="/userdash/" element={<UserDash />}>
          <Route index element={<UserHome/>}></Route>
          <Route path="contact1" element={<ContactA/>}></Route>
          <Route path="myexam" element={<MyExam/>}></Route>
          <Route path="profile" element={<Profile/>}></Route>
          <Route path="getexam/:id" element={<GetExam/>}></Route>
          <Route path="chanpass" element={<Chanpass/>}></Route>
          <Route path="results" element={<Result/>}></Route>
          </Route>
          <Route path="/examination" element={<Examination />}></Route>
          <Route path="/session" element={<Session />}></Route>
          <Route path="/subject" element={<Subject />}></Route>
          <Route path="/examineet" element={<Examinee />}></Route>
          <Route path="/questionbank" element={<QuestionBank />}></Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;
