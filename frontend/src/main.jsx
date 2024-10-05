import React, {  createContext, useState } from 'react'
import { createRoot } from 'react-dom/client'; // Make sure this is imported
import { StrictMode } from 'react';
import App from './App.jsx'

//use context ka istemaal krenge state management authentication ke liye...
export const Context = createContext({}); // use context create kiya

const AppWrapper = () => { //ek arrow function hai
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  // is function me karna kya hai, return karayenge
  // Context.Provider me isAuthenticated, setIsAuthenticated, user, setUser ye sab value dena hai taaki kahin se bhi in values ko access kar sake
  return (
    <Context.Provider value={{isAuthenticated, setIsAuthenticated, user, setUser}}>  
      <App />
    </Context.Provider>
  ) 
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)
