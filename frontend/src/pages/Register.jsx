/* import React, { useContext, useState } from 'react'
import {Context} from "../main";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context); // 1

  const [firstName, setFirstName] = useState(""); //2
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  //3 ab use navigate ka use krenge 
  const navigateTo = useNavigate();
  //4 ab ek function create krenge
  const handleRegister = async(e) => {
    e.preventDefault();
    //8
    try {
      await axios
        .post(
          "https://hospital-management-system-58tq.onrender.com/api/v1/user/patient/register",
          { firstName, lastName, email, phone, nic, dob, gender, password },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setNic("");
          setDob("");
          setGender("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };


  //5 condition- agar user authenticated hai to usko iss page par aane ki ijajat nhi deni hai
  if(isAuthenticated){
    return <Navigate to={"/"} />; //user ko home page par bhej denge
  }
  return ( //6
    <div className='container form-component register-form'>
      <h2>Sign Up</h2>
      <p>Please Sign Up To Continue</p>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis, vel praesentium autem numquam architecto molestiae!</p>
      <form onSubmit={handleRegister}>
        <div>  
          <input type="text" placeholder='First Name' value={firstName} onChange={(e)=> setFirstName(e.target.value)} />
          <input type="text" placeholder='Last Name' value={lastName} onChange={(e)=> setLastName(e.target.value)} />
        </div>

        <div>  
          <input type="text" placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)} />
          <input type="number" placeholder='Phone Number' value={phone} onChange={(e)=> setPhone(e.target.value)} />
        </div>

        <div>  
          <input type="number" placeholder='NIC' value={nic} onChange={(e)=> setNic(e.target.value)} />
          <input type="date" placeholder='Date of Birth' value={dob} onChange={(e)=> setDob(e.target.value)} />
        </div>

        <div>  
          <select value={gender} onChange={(e)=> setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input type="password" placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)} />
        </div>

        <div // 7
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Already Registered?</p>
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Login Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Register</button>
          </div>
      </form>
    </div>
  )
}

export default Register  */

import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://hospital-management-system-58tq.onrender.com/api/v1/user/patient/register",
          { firstName, lastName, email, phone, nic, dob, gender, password , role: "Patient"},
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
       
          toast.success(response.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          
        
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container form-component register-form">
        <h2>Sign Up</h2>
        <p>Please Sign Up To Continue</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat culpa
          voluptas expedita itaque ex, totam ad quod error?
        </p>
        <form onSubmit={handleRegister}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
            <input
              type={"date"}
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Already Registered?</p>
            <Link
              to={"/signin"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Login Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;