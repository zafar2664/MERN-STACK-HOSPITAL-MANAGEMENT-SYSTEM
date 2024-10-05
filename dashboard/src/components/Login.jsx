/*import React, { useContext, useEffect, useState } from 'react'
import {Context} from "../main"
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("11345689");
  const [confirmPassword, setConfirmPassword] = useState("11345689");
  const [isLoggedIn, setIsLoggedIn] =  useState(false);
  const navigateTo = useNavigate();

  /*const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post( " https://hospital-management-system-58tq.onrender.com/api/v1/user/login ", 
        { email, password, confirmPassword, role: "Admin" }, 
        {withCredentials: true, headers: {"Content-Type": "application.json"},});
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTO("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if(isAuthenticated) {
    return <Navigate to={"/"} />
  } */

    /*const handleLogin = async (e) => {
      e.preventDefault();
      try {
        await axios
          .post(
            "https://hospital-management-system-58tq.onrender.com/api/v1/user/login",
            { email, password, confirmPassword, role: "Admin" }, 
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            toast.success(res.data.message);
            setIsAuthenticated(true);
            setIsLoggedIn(prev=>!prev);
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
  
    useEffect(()=>{
         isLoggedIn && navigateTo("/"); 
    },[isLoggedIn])


  return (
    <>
    
    <div className="container form-component">
        <img src="/logo.png" alt="logo" className='logo' />
        <h1 className='form-title'>WELCOME TO ZEECARE</h1>
        <p>Only Admins Are Allowed To Access These Resources!</p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          
          
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login */

import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "https://hospital-management-system-58tq.onrender.com/api/v1/user/login",
          { email, password, confirmPassword, role: "Admin" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <section className="container form-component">
        <img src="/logo.png" alt="logo" className="logo" />
        <h1 className="form-title">WELCOME TO ZEECARE</h1>
        <p>Only Admins Are Allowed To Access These Resources!</p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;