import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Departments = () => {
    const departmentsArray = [
        {
          name: "Pediatrics",
          imageUrl: "/departments/pedia.jpg",
        },
        {
          name: "Orthopedics",
          imageUrl: "/departments/ortho.jpg",
        },
        {
          name: "Cardiology",
          imageUrl: "/departments/cardio.jpg",
        },
        {
          name: "Neurology",
          imageUrl: "/departments/neuro.jpg",
        },
        {
          name: "Oncology",
          imageUrl: "/departments/onco.jpg",
        },
        {
          name: "Radiology",
          imageUrl: "/departments/radio.jpg",
        },
        {
          name: "Physical Therapy",
          imageUrl: "/departments/therapy.jpg",
        },
        {
          name: "Dermatology",
          imageUrl: "/departments/derma.jpg",
        },
        {
          name: "ENT",
          imageUrl: "/departments/ent.jpg",
        },
      ];
    const responsive = {
        extraLarge: { //isme apni marji se koi bhi naam de sakte hain superLargeDesktop
          // the naming can be any, depends on you.
          breakpoint: { max: 3000, min: 1324 }, // 4000 aur 3000 ke bich me 5 item show karwane hain
          items: 4,
          slidesToSlide: 1, // optional, default to 1, jab bhi aap click karoge ek item change hoga
        },
        large: {
          breakpoint: { max: 1324, min: 1005 },
          items: 3,
          slidesToSlide: 1, // optional, default to 1.
        },
        medium: {
          breakpoint: { max: 1005, min: 700 },
          items: 2,
          slidesToSlide: 1, // optional, default to 1.
        },
        small: {
          breakpoint: { max: 700, min: 0 },
          items: 1,
          slidesToSlide: 1, // optional, default to 1.
        }
      };
  return (
    <div className='container departments'>
        <h2>Departments</h2>
      <Carousel
       responsive={responsive} 
       removeArrowOnDeviceType={["medium", "small"]}  > 
        {departmentsArray.map((depart, index) => {
            return (
                <div className="card" key={index}>
                    <div className="depart-name">{depart.name}</div>
                    <img src={depart.imageUrl} alt={depart.name} />
                </div>
            )
        })}
     </Carousel>
    </div>
  )
}

export default Departments