// imports 
import { useAuth } from "./context/AuthProvider";
import { useState } from "react";

import axios from 'axios';
import { Login } from "./Login";
import { Register } from "./Register";

export const Home = () => {
  const { value } = useAuth();
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [currentForm, setCurrentForm] = useState('login');

  const handleUsernameChange = (e) => {
    setUsernameInput(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  }

  const toggleForm = (formName) => {
    setCurrentForm(formName);
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
  async function makePostCall(uName, pWord) {
    try {

      // create user struct 
      var user = {
        "username": uName,
        "password": pWord
      }

      // call backend wait for response and send back to frontend
      const response = await axios.post('http://localhost:5001/login', user)

      console.log(response.status);

      if(response.status === 201){
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

    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}/>
      }
    </div>
  //   <>
  //     <h2>Home (Public)</h2>
  //     <form>
        
  //       <label htmlFor="Username"> Username </label>
  //       <input 
  //       type="text"
  //       value={usernameInput} 
  //       onChange={handleUsernameChange}
  //       ></input>

  //       <label> Password </label>
  //       <input 
  //       type="text" 
  //       value={passwordInput}
  //       onChange={handlePasswordChange}
  //       ></input>

  //     <button type="button" onClick={() => makePostCall(usernameInput, passwordInput)}>
  //       Sign In
  //     </button>
  //     </form>
  // </>
);
};