/*import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({setIsLoggedIn}) => {
  const { isAuthenticated, setIsAthenticated } = useContext(Context);
  // ab 3 usestate create karna hai
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const navigateTo = useNavigate();


      const handleLogin = async(e) =>{ // e se jab hum form submit karte hain to page refresh nhi hota hai
    e.preventDefault(); // form submit karte hain to page refresh nhi hota hai
    //ab logic likhni hai ki apne form ko submit kaise karayenge, uske liye try catch block ka use krenge
    try {
      const response = await axios.post(
        "https://hospital-management-system-58tq.onrender.com/api/v1/user/login", // postman se user-patient login wala url dena hai
        {email, password, confirmPassword, role: "Patient"}, 
        {withCredentials: true, 
        headers: {"Content-Type": "application/json"},
        }
      );// jab ye request success ho jayegi tab toast kar dena hai
      setIsAthenticated(true);
      setIsLoggedIn(true)
      // window.location.reload(true);
      toast.success(response.data.message);
      // user successful login ho jayega to usko navigate karwa dena hai
      navigateTo("/"); // ab jab successfully login ho jaaye to setIsAuthenticated ko true kar dena hai
    } catch (error) { //agar aap login nahi kar paa rhe hain, koi error aa rha hai uske liye likhna hai
      toast.error(error.response.data.message);
      
    }
  }
  // agar user already authenticated hai to humlog usko login ke page par aane ki ijajat nhi denge
  
    if (isAuthenticated) {
      return <Navigate to={"/"} />;
    }
  
  

  return ( // ab handlelogin ko create karna hai
    <div className='container form-component login-form'>
      <h2>Sign In</h2>
      <p>Please Login To Continue</p>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt eaque vero qui veritatis, excepturi ipsum!</p>
      <form onSubmit={handleLogin}>
        <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Email' />
        <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Password' />
        <input type="password" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} placeholder='Confirm Password' />

        <div style={{gap: "10px", justifyContent: "flex-end", flexDirection: "row"}}>
          <p style={{marginBottom: 0 }}>Not Registered?</p>
          <Link to={"/register"} style={{textDecoration: "none", alignItems: "center"}}>Register Now</Link>
        </div>
        <div style={{justifyContent: "center", alignItems: "center"}}>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div> 
  )
}

export default Login; */


import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .post(
          "https://hospital-management-system-58tq.onrender.com/api/v1/user/login",
          { email, password, confirmPassword, role: "Patient" },
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
      <div className="container form-component login-form">
        <h2>Sign In</h2>
        <p>Please Login To Continue</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat culpa
          voluptas expedita itaque ex, totam ad quod error?
        </p>
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
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Not Registered?</p>
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Register Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;