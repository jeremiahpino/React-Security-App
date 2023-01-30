import axios from "axios";
import { useState } from "react";
import { useAuth } from "./context/AuthProvider";

// registration component
export const Register = (props) => {

    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [errorMessage, setMessage] = useState('');
    const { value } = useAuth();
    const registerToken = '6343j2fwc1marf92';

    const handleUsernameChange = (e) => {
        setUsernameInput(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPasswordInput(e.target.value);
    }

    const passwordValidation = () => {

        const regEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

        if(passwordInput === ""){

            setMessage("Please enter a password.");
        }
        else if (regEx.test(passwordInput)) {
            setMessage("Password is valid.");
            signupPostCall(usernameInput, passwordInput);
        } 
        else if (!(regEx.test(passwordInput))) {
            setMessage("Password is not valid. Password must contain: A lower case letter, an uppercase letter, a special character, and a minimum length of 8 characters.");
        }
        else {
            setMessage('');
        }
    }

    async function signupPostCall(uName, pWord) {

        var user = {
            "username" : uName,
            "password" : pWord
        }

        try {

            // make post call to signup
            const response = await axios.post('http://localhost:5001/account/signup', user)

            console.log(response.status);

            // if successful registration (navigate to landing page)
            if(response.data === registerToken){
                return value.onLogin();
            }
            else {

                return response;

            }
            
        }
        catch(error) {

            // print out error
            console.log(error);

            alert("Signup failed.");

            return false;
        }
    }

    return (
        <>

        <h1> Signup </h1>
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
            <p>{errorMessage}</p>

            <button type="button" onClick={() => passwordValidation()}>
                Signup
            </button>

        </form>

        <button type="button" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </>
    );
}