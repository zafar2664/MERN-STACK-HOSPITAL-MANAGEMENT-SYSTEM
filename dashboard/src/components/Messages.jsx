import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../main"
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const Messages = () => { // ek empty use state arrya create karna hai
  const [Messages, setMessages] = useState([])
  const {isAuthenticated} = useContext(Context) // Context main file se aayega

  // ab useEffect hook lgaani hai
  useEffect(()=> {
    const fetchMessages = async () => {
      try {
        const {data} = await axios.get("https://hospital-management-system-58tq.onrender.com/api/v1/message/getall", {withCredentials: true});
        setMessages(data.message);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchMessages();
  }, []);

  if(!isAuthenticated) {
    return <Navigate to={"/login"} />; // yaha par navigate karke login ke page par bhej dena hai
  }
  return <section className='page messages'>
    <h1>MESSAGES</h1>
    <div className='banner'>
      
        
       { Messages && Messages.length > 0 ? (Messages.map(Element=>{ // agar message ka length 0 se km hoga ya 0 se jyada hoga to
          return (
            <div className="card" key={Element._id}>
              <div className="details">
                <p>First Name: <span>{Element.firstName}</span></p>
                <p>Last Name: <span>{Element.lastName}</span></p>
                <p>Email: <span>{Element.email}</span></p>
                <p>Phone: <span>{Element.phone}</span></p>
                <p>Message: <span>{Element.message}</span></p>
              </div>
            </div>
          )
        })) : (<h1>No Messages!</h1>)
        
      }
    </div>
  </section>
      
}

export default Messages ;

/*import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
//import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "https://hospital-management-system-58tq.onrender.com/api/v1/message/getall",
          { withCredentials: true }
        );
        setMessages(data.message);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchMessages();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page messages">
      <h1>MESSAGE</h1>
      <div className="banner">
        {messages && messages.length > 0 ? (
          messages.map((element) => {
            return (
              <div className="card" key={element._id}>
                <div className="details">
                  <p>
                    First Name: <span>{element.firstName}</span>
                  </p>
                  <p>
                    Last Name: <span>{element.lastName}</span>
                  </p>
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    Message: <span>{element.message}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Messages!</h1>
        )}
      </div>
    </section>
  );
};

export default Messages; */