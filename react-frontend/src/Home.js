// imports 
import { useAuth } from "./context/AuthProvider";
import { useState } from "react";

import axios from 'axios';

export const Home = () => {
  const { value } = useAuth();
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleUsernameChange = (e) => {
    setUsernameInput(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  }

  const handleClick = () => {

    if ( (usernameInput === "jpino") && (passwordInput === "fakepass") ) {
      return value.onLogin();
    }
    else{
      alert("Login credentials are incorrect.")
    }
  }

  // create a aync function to login someone
  // pass in use states and make structure 
  async function makePostCall(person) {
    try {

      // save response and return to frontend 
      const response = await axios.post('http://localhost:5001/login', person)

      return response;
    }
    catch (error) {

      // print out error if error occurs
      console.log(error);

      return false;

    }
  }


  return (
    <>
      <h2>Home (Public)</h2>
      <form>
        
        <label htmlFor="Username"> Username </label>
        <input 
        type="text"
        value={usernameInput} 
        onChange={handleUsernameChange}
        ></input>

        <label> Password </label>
        <input 
        type="text" 
        value={passwordInput}
        onChange={handlePasswordChange}
        ></input>

      {/* pass in makePostCall */}
      <button type="button" onClick={handleClick}>
        Sign In
      </button>

      </form>
  </>
);
};