import React, { useContext, useEffect, useState } from 'react'
import {Context} from "../main"
import { toast } from 'react-toastify';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
const Doctors = () => {
  const [doctors, setDoctors] = useState([]); //empty array rakhna hai
  const {isAuthenticated} = useContext(Context);

  useEffect(()=> {
    // jab jab hamara page refresh ho , andar jo bhi ho run karta rahe
    const fetchDoctors = async()=>{
      try {
        const {data} = await axios.get("https://hospital-management-system-58tq.onrender.com/api/v1/user/doctors", 
          {withCredentials: true});
          setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response.data.message)
      }
    };
    fetchDoctors();  // jab jab refresh ho ye function call hota rahe
  },[]);

  if(!isAuthenticated) {
    return <Navigate to={"/login"} />
  }
  return  <> 
  
  <section className='page doctors'>
    <h1>DOCTORS</h1>
    <div className="banner">
      {
        doctors && doctors.length > 0 ? (doctors.map(element=>{
          return(
            <div className='card' key={element._id}>
              <img src={element.docAvatar && element.docAvatar.url} alt="Doctor Avatar" />
              <h4>{`${element.firstName} ${element.lastName}`}</h4>
              <div className='details'>
                <p>Email: <span>{element.email}</span></p>
                <p>Phone: <span>{element.phone}</span></p>
                <p>DOB: <span>{element.dob.substring(0,10)}</span></p>
                <p>Department: <span>{element.doctorDepartment}</span></p>
                <p>NIC: <span>{element.nic}</span></p>
                <p>Gender: <span>{element.gender}</span></p>
              </div>
            </div>
          )
        })) : <h1>No Registered Doctor Found!</h1>
      }
    </div>
  </section>
  </>
}

export default Doctors