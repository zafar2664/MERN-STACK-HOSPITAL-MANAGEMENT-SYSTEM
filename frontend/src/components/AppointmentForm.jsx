import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AppointmentForm = () => {
  //1 sara use state define karna hai jo backend me diya hai

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState("");

  //2  ab ek Array create karna hai apne paas, kyunki department ko mention karna hai
  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];
  // 12 Home page par redirect hone ke liye, usenavigate ka use krenge
  const navigateTo = useNavigate();

  // 3 ab ek function create karna hai jitni bhi doctor register hai, usko get karne ke liye
  const [doctors, setDoctors] = useState([]);
  useEffect(()=> {
    const fetchDoctors = async ()=>{ 4 // fetchDoctors ke naam se ek function create karna hai aur iske andar likhna hai
      const {data} = await axios.get("https://hospital-management-system-58tq.onrender.com/api/v1/user/doctors", {withCredentials:true  })  // 5 postman me aakar user - GET ALL DOCTORS ka url copy karna hai
      setDoctors(data.doctors); //7 backend me doctors naam ka array bnaya hua hai isliye use kar rahe hain
    };
    fetchDoctors(); // 8
    
  },[])   //6 empty array rakhna hai, jab bhi page refresh hoga useeffect run hoga

  // 10 handleAppointment ka function bna le
  const handleAppointment = async (e) => {
    e.preventDefault();
    // 11 ab yaha par use karna hai try catch se
    try {
      const hasVisitedBool = Boolean(hasVisited); //jab true/false hasVisited ki value ko select karta hu to wo hamare paas as string return hoti hai, 
      //isliye isko boolean form me type me convert kar diya
      const { data } = await axios.post("https://hospital-management-system-58tq.onrender.com/api/v1/appointment/post",
        {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date: appointmentDate,
        department,
        doctor_firstName: doctorFirstName,
        doctor_lastName: doctorLastName,
        address,
        hasVisited: hasVisitedBool,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          },
        }
      );
      toast.success(data.message);
      // 13 jab bhi form submit ho jayega humlog homepage pr navigate ho jayenge
      navigateTo("/")
    } catch (error) {
      toast.error(error.response.data.message); // 14
    }
  }

  return ( // 9 frontend ka design karna hai
    <>
      <div className="container form-component appointment-form">
        <h2>Appointment</h2>
        <form onSubmit={handleAppointment}>
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
            <input type="date" placeholder='Appointment Date' value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />
            
          </div>

          <div> 
            <select value={department} onChange={(e) => {
              setDepartment(e.target.value);
              setDoctorFirstName("");
              setDoctorLastName("");
            }}>
              {
                departmentsArray.map((depart, index) =>{
                  return(
                    <option value={depart} key={index}>
                      {depart}
                    </option>
                  )
                })
              }
            </select>
            
            <select
            onChange={(e) =>{
              const [surName,firstName, lastName] = e.target.value.split(" ");
              // console.log(e.target.value.split(" "))
              console.log(firstName , lastName)
              setDoctorFirstName(surName+" "+firstName);
              setDoctorLastName(lastName);

            }}
            disabled={!department}
            >
              <option value="">Select Doctor</option>
              {
                doctors.filter(doctor=> doctor.doctorDepartment === department).map((doctor, index)=>{
                  return (
                    <option value={`${doctor.firstName} ${doctor.lastName}`} key={index}>
                      {doctor.firstName} {doctor.lastName}
                    </option>
                  )
                })
              }
            </select>
          </div>
          <textarea rows="10" value={address} onChange={(e)=> setAddress(e.target.value)} placeholder='Address' />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Have you visited before?</p>
            
            <input type="checkbox" checked={hasVisited} onChange={(e)=> setHasVisited(e.target.checked)} 
            style={{flex: "none", width: "25px"}} />
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">GET APPOINTMENT</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AppointmentForm