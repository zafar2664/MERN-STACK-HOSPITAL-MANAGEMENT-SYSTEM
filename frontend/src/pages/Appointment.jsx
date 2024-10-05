import React from 'react'
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
  return (
    <>
    {/** yaha par sabse pehle Hero ko import karna hai aur, appointmntform ko */}
    <Hero title={"Schedule Your Appointment | ZeeCare Medical Institute"} imageUrl={"/signin.png"} />
    
    <AppointmentForm />
    
    </>
  )
}

export default Appointment