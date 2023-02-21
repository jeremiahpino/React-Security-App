// imports 
import { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";

export const Home = () => {
  
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (

    <div className="App">
      {
        // send onFormSwitch as props to Login and Register js
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}/>
      }
    </div>
);
};