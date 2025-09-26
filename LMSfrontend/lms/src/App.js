import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './Components/Login';
import Register from './Components/Register';
import Course from './Components/Course';
import Courses from './Components/Courses';
import Profile from './Components/Profile';
import Learning from './Components/Learning'; 
import Home from './Components/Home';
import AddCourse from './Components/AddCourse';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Components/DashBoard/Dashboard';
import 'boxicons/css/boxicons.min.css';
import EditCourse from './Components/EditCourses';
import DUsers from './Components/DashBoard/DUsers';
import DCourses from './Components/DashBoard/DCourses';
import Assessment from './Components/Assessment';
import ErrorPage from './Components/ErrorPage';
import AddQuestions from './Components/AddQuestions';
import Performance from './Components/DashBoard/Performance';
import DTutors from './Components/DashBoard/DTutors';
import Certificate from './Components/Certificate';
import Forum from './Components/Forum';
import AdminLogin from './Components/DashBoard/AdminLogin';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
      <Route path="/addquestions/:id" element={<AddQuestions />} />
      <Route path="/adminlogin" element={<AdminLogin></AdminLogin>} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/course/:id" element={<Course />} />
     <Route path="/discussion/:id" element={<Forum />} />
     <Route path="/certificate/:id" element={<Certificate />} />
     <Route path="/assessment/:id" element={<Assessment />} />
     <Route path="/addcourse" element={<AddCourse />} />
     <Route path="/editCourse/:id" element={<EditCourse />} />
     <Route path="/profile" element={<Profile />} />
     <Route path="/learnings" element={<Learning />} />
     <Route path="/Dcourses" element={<DCourses />} />
     <Route path="/Dusers" element={<DUsers />} />
     <Route path="/Dtutors" element={<DTutors />} />
     <Route path="/Performance" element={<Performance />} />
     <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer/>
  </div>
  );
}

export default App;
