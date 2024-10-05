import React, {  useContext, useState } from 'react'
import { Context } from "../main"
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios';
import { toast } from 'react-toastify';
import {GiHamburgerMenu} from "react-icons/gi"

const Navbar = () => { // navbar pr sirf patient logn kar sakta hai
    const [show, setShow] = useState(false);
    const {isAuthenticated, setIsAuthenticated} = useContext(Context);
    console.log(isAuthenticated)

    const navigateTo = useNavigate() // use navigate ki saari property aa gyi hai

    const handleLogout = async()=>{
            await axios.get("https://hospital-management-system-58tq.onrender.com/api/v1/user/patient/logout", // url postman se patient logout wala
                {withCredentials : true,

                }).then(res=>{ // agar ye success hua to
                    toast.success(res.data.message);
                    setIsAuthenticated(false); // main se aaya hai isko force kar diye setIsAuthenticated ko
                }).catch((err) => { // agar koi error hoga logout karne me  to iske liye, error get karne ke liye 
                    toast.error(err.response.data.message);
                })
        } 

    const gotoLogin = ()=>{ // humlog chahte hain jaise hi login ke button par click kre....to humko login ke page par bhej de
        navigateTo("/login"); // jab bhi is function par click krenge ye hme login ke page par bhej dega...
    }
  return (
    <nav className='container'>
        <div className="logo">
          {""}
          <img src="/logo.png" alt="logo" className='logo-img' />
          </div> 
        <div className={show ? "navLinks showmenu" : "navLinks"}> {/** agar show ki value true hui to showmneu  , 
         * agar show ki value false hui to navLinks classname dena hai */}
        <div className='links'>
            <Link to={"/"}>Home</Link>
            <Link to={"/appointment"}>APPOINTMENT</Link>
            <Link to={"/about"}>ABOUT US</Link>
        </div>
        {isAuthenticated ? ( // agar isAuthenticated ki value true hui to logout show karni hai, agar false hui to login show karni hai 
          <button className='logoutBtn btn' onClick={handleLogout}>
          LOGOUT
          </button>
        ):(
         <button className='logoutBtn btn' onClick={gotoLogin}>
           LOGIN
         </button>
          )}
     </div>
     <div className='hamburger' onClick={()=> setShow(!show)}>
      <GiHamburgerMenu />
      </div> 
        
   </nav>
  )
}

export default Navbar