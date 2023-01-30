import { useState } from "react";
import { useAuth } from "./context/AuthProvider";
import axios from 'axios';

// login component
export const Login = (props) => {

    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const { value } = useAuth();
    const loginToken = '2342f2f1d131rf12';

    const handleUsernameChange = (e) => {
        setUsernameInput(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPasswordInput(e.target.value);
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
      const response = await axios.post('http://localhost:5001/account/login', user)

      console.log(response.data);

      // if 201 successful login (give user token)
      if(response.data === loginToken){
        return value.onLogin();
      }
      else {
        return response;
      }

    }
    catch (error) {

      // print out error if error occurs
      console.log(error);

      alert("Login Failed.");

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
            type="text" 
            value={passwordInput}
            onChange={handlePasswordChange}
            ></input>

            <button type="button" onClick={() => loginPostCall(usernameInput, passwordInput)}>
                Login
            </button>

        </form>

        <button type="button" onClick={() => props.onFormSwitch('register')}>Don't have an account? Signup here.</button>
        </>
    );

}