/*import React, { useContext, useEffect } from 'react'
// import krenge
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Dashboard from "./components/Dashboard"; //2
import Login from "./components/Login";
import AddNewDoctor from "./components/AddNewDoctor";
import AddNewAdmin from "./components/AddNewAdmin";
import Doctors from "./components/Doctors";
import Messages from "./components/Messages";
import Sidebar from "./components/Sidebar";
import { ToastContainer  } from 'react-toastify'; //3
import 'react-toastify/dist/ReactToastify.css'; //3
import {Context} from "./main";
import axios from 'axios';
import "./App.css"

const App = () => {

  const {isAuthenticated, setIsAuthenticated, user, setUser} = useContext(Context); //4
  //  useEffect function ka use isliye kar rahe hain taaki humlog get kar sake , jab jab isAuthenticated ki value change ho ya 
  //refresh ho to ye function fetchUser run kare
  //const [isLoggedIn , setIsLoggedIn] = useState(false);
  useEffect(() => {
    const fetchUser = async () => { // fetchUser me humne ye kiya hua hai, "https://hospital-management-system-58tq.onrender.com/api/v1/user/patient/me" ye 
      //rquest bhejenge user ko uske details ko get karne ke liye, user ka details tabhi get kar payenge jab user login hoga
      try {
        const response = await axios.get("https://hospital-management-system-58tq.onrender.com/api/v1/user/admin/me", {withCredentials: true});
        setIsAuthenticated(true);
        setUser(response.data.user); // user ke andar value store kara dena hai
        
      } catch (error) {
        setIsAuthenticated(false); // agar hamara user authenticated nahi hai to
        setUser({}); // setUser ko empty object bna dena hai
      }
    }
    if(isAuthenticated)
    fetchUser();
  }, [isAuthenticated]);
  return (  // 1 Route create karenge
    <>
     <Router>
      <Sidebar /> 
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/doctor/addnew' element={<AddNewDoctor />} />
        <Route path='/admin/addnew' element={<AddNewAdmin />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/doctors' element={<Doctors />} />
      </Routes>
     
      <ToastContainer position="top-center" />
     </Router>
    </>
  )
}

export default App */

import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AddNewDoctor from "./components/AddNewDoctor";
import Messages from "./components/Messages";
import Doctors from "./components/Doctors";
import { Context } from "./main";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import AddNewAdmin from "./components/AddNewAdmin";
import "./App.css";

const App = () => {
  const { isAuthenticated, setIsAuthenticated,  setUser } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://hospital-management-system-58tq.onrender.com/api/v1/user/admin/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
    
  }, [isAuthenticated]);

  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor/addnew" element={<AddNewDoctor />} />
        <Route path="/admin/addnew" element={<AddNewAdmin />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/doctors" element={<Doctors />} />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;

