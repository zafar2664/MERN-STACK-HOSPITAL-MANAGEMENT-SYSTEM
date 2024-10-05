/*import React, { useState } from 'react';

import  { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';


// 1. use context create krenge
export const Context = createContext({isAuthenticated: false});

//2 wrapper function create krenge 
const AppWrapper = ()=>{
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(false);

// 3
  return ( //four usestate hain isko pure project me kahin bhi use kar sakte hain
    <Context.Provider value={{isAuthenticated, setIsAuthenticated, user, setUser}}> 
       <App />
    </Context.Provider>
  );
  
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
) */


/*import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState({});
  const [user, setUser] = useState(false);

  return (
    <Context.Provider
      //value={{ isAuthenticated, setIsAuthenticated, admin, setAdmin }}
       value={{ isAuthenticated, setIsAuthenticated, user, setUser,admin, setAdmin }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
); */

/*import React, { useState } from 'react';
import  { createContext, StrictMode } from 'react'
import { createRoot, ReactDOM } from 'react-dom/client'
import App from './App.jsx'

// 1. use context create krenge
export const Context = createContext({isAuthenticated: false});

//2 wrapper function create krenge 
const AppWrapper = ()=>{
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser, admin, setAdmin] = useState(false);

// 3
  return ( //four usestate hain isko pure project me kahin bhi use kar sakte hain
    <Context.Provider value={{isAuthenticated, setIsAuthenticated, user, setUser}}> 
       <App />
    </Context.Provider> // agar bara project rahta to usecontext use karte...
  );
  
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
) */

  import React, { useState, createContext, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';


// 1. Create context
export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  // Separate useState calls for each state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState({});

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        admin,
        setAdmin,
      }}
    >
      <App />
    </Context.Provider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);

