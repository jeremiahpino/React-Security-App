import axios from "axios";
import { useState } from "react";
import { useAuth } from "./context/AuthProvider";

// registration component
export const Register = (props) => {

    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [errorMessage, setMessage] = useState('');
    const [phoneInput, setPhoneInput] = useState('');
    var tokenCookie;

    const { value } = useAuth();

    // handle phone number change
    const handlePhoneChange = (e) => {

        const formattedPhoneNumber = formatPhoneNumber(e.target.value);
        setPhoneInput(formattedPhoneNumber);
    }

    function formatPhoneNumber(phoneVal) {

        if (!phoneVal) return phoneVal;

        // clean the input for any non-digit values.
        const phoneNumber = phoneVal.replace(/[^\d]/g, ''); 
        const phoneNumberLength = phoneNumber.length;

        // phone number length is less than 4 return the phone number
        if (phoneNumberLength < 4) return phoneNumber;

        // if phoneNumberLength is greater than 4 and less the 7 we start to return
        // the formatted number
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)})-${phoneNumber.slice(3)}`;
        }

        // finally, if the phoneNumberLength is greater then seven, we add the last
        // bit of formatting and return it.
        return `(${phoneNumber.slice(0, 3)})-${phoneNumber.slice(3,6)}-${phoneNumber.slice(6, 10)}`;
    }

    // handle username change
    const handleUsernameChange = (e) => {
        setUsernameInput(e.target.value);
    }

    // handle password change
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
            
            //console.log(phoneInput);
            // make post call
            signupPostCall(usernameInput, passwordInput, phoneInput);
        } 
        else if (!(regEx.test(passwordInput))) {
            setMessage("Password is not valid. Password must contain: A lower case letter, an uppercase letter, a special character, and a minimum length of 8 characters.");
        }
        else {
            setMessage('');
        }
    }

    async function signupPostCall(uName, pWord, phoneVal) {

        // create a user
        var user = {
            "username" : uName,
            "password" : pWord,
            "phoneNumber" : phoneVal
        }

        try {

            // make post call to signup
            const response = await axios.post('https://localhost:5001/account/signup', user)

            // set cookie with token value
            document.cookie = `token=${response.data}`;
            // print token value
            //console.log(document.cookie);
            console.log(response.status);

            // set token in local storage 
            localStorage.setItem("token", document.cookie);

            // if successful registration (navigate to landing page)
            if(response.status === 201){
                setMessage("Signup is complete.");
                return value.onLogin();
            }
            else {

                return response;

            }
            
        }
        catch(error) {

            // print out error
            console.log(error);

            //alert("Signup failed.");

            setMessage("Signup failed.");

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
            type="password" 
            value={passwordInput}
            onChange={handlePasswordChange}
            ></input>

            <label> Phone Number </label>
            <input 
            type="text" 
            value={phoneInput}
            onChange={handlePhoneChange}
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