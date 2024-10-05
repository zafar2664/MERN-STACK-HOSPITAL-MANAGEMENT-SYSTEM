/*import React, { useContext, useState } from 'react'
import { Context } from '../main';
import {TiHome} from "react-icons/ti";  // 5
import {RiLogoutBoxFill} from "react-icons/ri";
import {AiFillMessage} from "react-icons/ai";
import {GiHamburgerMenu} from "react-icons/gi";
import {FaUserDoctor} from "react-icons/fa6";
import {MdAddModerator} from "react-icons/md";
import {IoPersonAddSharp} from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Sidebar = () => {
    //1
    const [show, setShow] = useState(false);

    //2 use useContext
    const {isAuthenticated, setIsAuthenticated} = useContext(Context);

    const handleLogout = async () => {
      await axios
        .get("https://hospital-management-system-58tq.onrender.com/api/v1/user/admin/logout", {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(false);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }; 

    const navigateTo = useNavigate(); // 7 navigate karna hai


    const gotoHome = ()=>{ // 6 sab ke liye function create kar denge
        navigateTo("/");
        setShow(!show);
    };
    const gotoDoctorsPage = ()=>{ // 6 sab ke liye function create kar denge
        navigateTo("/doctors");
        setShow(!show);
    };
    const gotoMessagePage = ()=>{ // 6 sab ke liye function create kar denge
        navigateTo("/messages");
        setShow(!show);
    };
    const gotoAddNewDoctor = ()=>{ // 6 sab ke liye function create kar denge
        navigateTo("/doctor/addnew");
        setShow(!show);
    };
    const gotoAddNewAdmin = ()=>{ // 6 sab ke liye function create kar denge
        navigateTo("/admin/addnew");
        setShow(!show);
    };
    // LogOut ka function
    /*const handleLogout = async () => {
        await axios
          .get("https://hospital-management-system-58tq.onrender.com/api/v1/user/admin/logout", {
            withCredentials: true,
          })
          .then((res) => {
            toast.success(res.data.message);
            setIsAuthenticated(false);
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      };  */

      
    
  /*return ( // 3 ab frontend ko design karna hai
    <>
    
    <nav
        style={isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}
      > 
     <div className="links">  
        <TiHome onClick={gotoHome} /> 
        <FaUserDoctor onClick={gotoDoctorsPage} />
        <MdAddModerator onClick={gotoAddNewAdmin} />
        <IoPersonAddSharp onClick={gotoAddNewDoctor} />
        <AiFillMessage onClick={gotoMessagePage} />
        <RiLogoutBoxFill onClick={handleLogout}  /> 
        
     </div>
     </nav>
     <div
        className="wrapper"
        style={isAuthenticated ? { display: "none" } : { display: "flex" }}
      >
        <GiHamburgerMenu className='hamburger' onClick={() => setShow(!show)} />
     </div>
    </>
  )
}

export default Sidebar */

import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    await axios
      .get("https://hospital-management-system-58tq.onrender.com/api/v1/user/admin/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();

  const gotoHomePage = () => {
    navigateTo("/");
    setShow(!show);
  };
  const gotoDoctorsPage = () => {
    navigateTo("/doctors");
    setShow(!show);
  };
  const gotoMessagesPage = () => {
    navigateTo("/messages");
    setShow(!show);
  };
  const gotoAddNewDoctor = () => {
    navigateTo("/doctor/addnew");
    setShow(!show);
  };
  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(!show);
  };

  return (
    <>
      <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          <TiHome onClick={gotoHomePage} />
          <FaUserDoctor onClick={gotoDoctorsPage} />
          <MdAddModerator onClick={gotoAddNewAdmin} />
          <IoPersonAddSharp onClick={gotoAddNewDoctor} />
          <AiFillMessage onClick={gotoMessagesPage} />
          <RiLogoutBoxFill onClick={handleLogout} />
        </div>
      </nav>
      <div
        className="wrapper"
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;