import React, { useContext, useEffect, useState } from 'react'
import "./App.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import Appointment from './pages/Appointment';
import AboutUs from './pages/AboutUs';
import Register from './pages/Register';
import Login from './pages/Login';
import { ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import { Context} from "./main"
import axios from 'axios';
import Footer from './components/Footer';

const App = () => {
  const {isAuthenticated, setIsAuthenticated, setUser} = useContext(Context); // user get karne ke liye navbar ka user, main.jsx me se value copy karni hai aur yaha paste karni hai
  // useeffect ke andar ek function create krenge
  const [isLoggedIn , setIsLoggedIn] = useState(false);
  useEffect(() => {
    const fetchUser = async () => { // fetchUser me humne ye kiya hua hai, "https://hospital-management-system-58tq.onrender.com/api/v1/user/patient/me" ye 
      //rquest bhejenge user ko uske details ko get karne ke liye, user ka details tabhi get kar payenge jab user login hoga
      try {
        const response = await axios.get("https://hospital-management-system-58tq.onrender.com/api/v1/user/patient/me", {withCredentials: true});
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
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/appointment' element={<Appointment />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login  setIsLoggedIn={setIsLoggedIn}/>} />
      </Routes>
      <Footer />
      {/*  ab yaha Routes se bahar aa kar ToastContainer dena hai*/}
      <ToastContainer position="top-center" />
    </Router>
    </>
  )
}

export default App