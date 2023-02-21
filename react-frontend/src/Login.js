import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "./context/AuthProvider";
import axios from 'axios';

// PROPS send values or functions to children components

// login component
export const Login = (props) => {

    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [errorMessage, setMessage] = useState('');
    const { value } = useAuth();
    var tokenCookie;
  
    useEffect(() => {
      // call your function here
      checkCookie();
    });

    // handle username change
    const handleUsernameChange = (e) => {
        setUsernameInput(e.target.value);
    }

    // handle password change
    const handlePasswordChange = (e) => {
        setPasswordInput(e.target.value);
    }

    async function checkCookie() {

    // check if a cookie is in local storage
    tokenCookie = localStorage.getItem("token");
    const newTokenCook = tokenCookie ? tokenCookie.split('=')[1] : null;
    console.log("In check cookie function")
    console.log("NEW token cook:", newTokenCook);

    try {

      // call verify token
      const response = await axios.get('https://localhost:5001/verifyToken', { headers : {
         Authorization : `Bearer ${newTokenCook}`} }
       );

      console.log(response.status);
  
      // if 201 successful login (give user token)
      if(response.status === 201){
          setMessage("Login is valid.");
          return value.onLogin();
      }
      else {
          return response;
      }
  
      }
      catch (error) {
  
        // print out error if error occurs
        console.log(error);
  
        return false;
      }

    }

    // create a aync function to login someone
    // pass in use states and make structure 
    async function loginPostCall(uName, pWord) {

    try {

      // create user struct 
      var user = {
        "username": uName,
        "password": pWord
      }

      // call backend wait for response and send back to frontend
      // POST sends data to server
      const response = await axios.post('https://localhost:5001/account/login', user)

      // set cookie with token value
      document.cookie = `token=${response.data}`;
      // token value
      console.log("token in login:", document.cookie);
      console.log(response.status);

      // set token in local storage 
      localStorage.setItem("token", document.cookie);
      
      // if 201 successful login (give user token)
      if(response.status === 201){
        setMessage("Login is valid.");
        return value.onLogin();
      }
      else {
        return response;
      }

    }
    catch (error) {

      // print out error if error occurs
      console.log(error);

      setMessage("Login failed.");
      //alert("Login Failed.");

      return false;

    }
  }

    return (
        <>

        <h1> Login </h1>
        <form>
            <label htmlFor="Username"> Username </label>
            <input 
            type="text"
            value={usernameInput} 
            onChange={handleUsernameChange}
            ></input>

            <label> Password </label>
            <input 
            type="password" 
            value={passwordInput}
            onChange={handlePasswordChange}
            ></input>

            <p>{errorMessage}</p>

            <button type="button" onClick={() => loginPostCall(usernameInput, passwordInput)}>
                Login
            </button>

        </form>

        <button type="button" onClick={() => props.onFormSwitch('register')}>Don't have an account? Signup here.</button>
        </>
    );

}