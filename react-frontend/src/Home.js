// step 6
// had to add onLogin 
import { useAuth } from "./context/AuthProvider";
import { useState } from "react";

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

      <button type="button" onClick={handleClick}>
        Sign In
      </button>

      </form>
  </>
);
};