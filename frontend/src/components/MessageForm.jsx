import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';


const MessageForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const handleMessage = async(e) => { // sabse pehle is function ko async bna lo kyunki bhejne ke liye async hona jaruri hai
        e.preventDefault(); //jab bhi form submit ho , hamara pura page refresh na ho
        // ab form ko bhejna hai to kaise kaam krega, iske liye try catch ka use kenge
        try {
            await axios.post(
                "https://hospital-management-system-58tq.onrender.com/api/v1/message/send", // url denge, POSTMAN me aana hai -messaege- send message -copy url and paste here
                {firstName, lastName, email, phone, message},// data
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {
                toast.success(res.data.message); //hamare backend me se jo message aayega usko toast karwa dena hai
                setFirstName("");
                setLastName("");
                setEmail("");
                setPhone("");
                setMessage("");
            })
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
  return ( //niche ek div me 2 input denge form wale div me
    <div className='container form-component message-form'>
        <h2>Send Us A Message</h2> 
        <form onSubmit={handleMessage}> 
            <div>
                <input type="text" 
                placeholder='First Name' 
                value={firstName} 
                onChange={(e)=> setFirstName(e.target.value)} 
                />
                <input type="text" 
                placeholder='Last Name' 
                value={lastName} 
                onChange={(e)=> setLastName(e.target.value)} 
                />
            </div> 
            <div>
             <input type="text" 
                placeholder='Email' 
                value={email} 
                onChange={(e)=> setEmail(e.target.value)} 
                />
                <input type="number" 
                placeholder='Phone Number' 
                value={phone} 
                onChange={(e)=> setPhone(e.target.value)} 
                />
            </div>
            <textarea
             rows={7} 
             placeholder='Message' 
             value={message} 
             onChange={(e) => setMessage(e.target.value)}>
             </textarea>
             <div style={{justifyContent: "center", alignItems: "center"}}>
                <button type='submit'>Send</button>
             </div>
        </form>
    </div>
  )
} 

  

export default MessageForm