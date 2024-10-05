import React, { useContext, useEffect, useState } from 'react';
import {Context} from "../main";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import {GoCheckCircleFill} from "react-icons/go";
import {AiFillCloseCircle} from "react-icons/ai"
import { toast } from 'react-toastify';

const Dashboard = () => {
  const {isAuthenticated, user} = useContext(Context);
  

  const [appointments, setAppointments] = useState([]); // jitne bhi appointmrnts hamare user ne bheje hain, saare ko humlog get karenge, update karenge etc
  // useEffect ek hook hota hai , ye tab kaam krega jab page refresh hoga
  useEffect(()=> {
    const fetchAppointments = async ()=> {
      try {
        const {data} = await axios.get("https://hospital-management-system-58tq.onrender.com/api/v1/appointment/getall", {withCredentials: true} );
        setAppointments(data.appointments); // ye backend ke yser controller se aa rha hai
      } catch (error) {
        setAppointments([]);
        console.log("SOME ERROR OCCURED WHILE FETCHING APPOINTMENTS", error);
      }
    };
    fetchAppointments();
  }, []);

  // appointment accept status ya reject status ke liye function
  const handleUpdateStatus = async(appointmentId, status)=>{
    try {
      const {data} = await axios.put(`https://hospital-management-system-58tq.onrender.com/api/v1/appointment/update/${appointmentId}`, {status}, {withCredentials: true});
      setAppointments(prevAppointments=>
        prevAppointments.map(appointment=>
          appointment._id === appointmentId 
            ? {...appointment, status}
        : appointment
      )
    );
    toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  if(!isAuthenticated) {
    return <Navigate to={"/login"} />; // yaha par navigate karke login ke page par bhej dena hai
  }

  console.log(user)
  return <>
  
  <section className='dashboard page'>
    <div className="banner">
      <div className="firstBox">
        <img src="/doc.png" alt="docImg" />
       <div className='content'>
        <div>
          <p>Hello ,</p>
          <h5>
            {user && `${user.firstName} ${user.lastName}` } 
           
          </h5>
         </div>
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Totam inventore ipsum sapiente, ducimus perspiciatis dolores quo ipsa! 
           </p>
         </div>
      </div>

      <div className="secondBox">
        <p>Total Appointments</p>
        <h3>1500</h3>
      </div>

      <div className="thirdBox">
        <p>Registered Doctors</p>
        <h3>20</h3>
      </div>
    </div>
    <div className="banner">
      <h5>Appointments</h5>
      <table>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Date</th>
            <th>Doctor</th>
            <th>Department</th>
            <th>Status</th>
            <th>Visited</th>
          </tr>
        </thead>
        <tbody>
          {
            appointments && appointments.length > 0 ?(
               appointments.map(appointment => { // appointment yaha par database se aa rha hai
                return( // key unique honi chahiye
                  <tr key={appointment._id}>
                    <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                    <td>{appointment.appointment_date.substring(0,16)}</td>
                    <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                    <td>{appointment.department}</td>
                    <td>
                      <select // agar appointment ki status pending- value pending
                      className={appointment.status === "Pending"
                         ? "value-pending" : appointment.status === "Rejected"
                          ? "value-rejected" : "value-accepted"}
                           value={appointment.status}
                           onChange={(e)=> handleUpdateStatus(appointment._id, e.target.value)}
                          >
                        <option value="Pending" className="value-pending">Pending</option>
                        <option value="Accepted" className="value-accepted">Accepted</option>
                        <option value="Rejected" className="value-rejected">Rejected</option>
                      </select>
                    </td>
                    <td>{appointment.hasVisited === true ? (<GoCheckCircleFill className='green' />) :(<AiFillCloseCircle className='red' />)}</td>
                  </tr>
                )

               }) 
              ):( <tr><td>NO APPOINTMENTS!</td></tr>
          )}
        </tbody>
      </table>
    </div>
  </section>
  
  
  </>
}

export default Dashboard