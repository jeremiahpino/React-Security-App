//step 6 
import axios from "axios";
import React from "react";

// import useState and useEffect
import {useState} from 'react';

//import { useAuth } from "./context/AuthProvider";

export const Landing = () => {
  //const { value } = useAuth();

  const [users, setUsers] = useState([]);
  const [requestError, setRequestError] = useState('');
  var tokenCookie;

  // added row id to remove character id
  function removeOneUser(index, rowID) {
    
    // async function for delete
    deleteUser(rowID);

    // - filter creates new array and applies filter
    // - testing an index vs. all the indices in the array, and 
    // returning all but the one that is passed through
    const updated = users.filter((user, i) => {
        return i !== index
      });

      // re-render child components inside setCharacters
      setUsers(updated);
  }

  async function deleteUser(rowId) {
    try {

      // delete a user by id
      const response = await axios.delete('https://localhost:5001/users/' + rowId);

      // return response to caller
      return response;

    }
    catch(error) {

      console.log(error); 

      // fail
      return false;

    }
  }

  // function displays the table columns (Name, Job, ID, and Remove)
  function TableHeader()  {
      return (
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Id</th>
          </tr>
        </thead>
      );
  }

  function TableBody() {

    const rows = users.map((row, index) => {
      return (
        <tr key={index}>
            <td>{row.username}</td>
            <td>{row.phoneNumber}</td>
            <td>{row._id}</td>
            <td>
            <button onClick={() => removeOneUser(index, row._id)}>Delete</button>
            </td>
        </tr>
      );
     }
    );
    return (
        <tbody>
          {rows}
        </tbody>
     );

  }

  // get all users
  async function fetchAllUsers() {

    // console.log(document.cookie);

    // token val
    //const token = document.cookie ? document.cookie.split('=')[1] : null;

     // check if a cookie is in local storage
     tokenCookie = localStorage.getItem("token");
     const newTokenCook = tokenCookie ? tokenCookie.split('=')[1] : null;
     console.log("fetch users cook:", newTokenCook);

    // console.log("parsed", token)
    try {

      // console.log("get all users");

      // - await call (non-blocking operation) allows frontend to 
      // run other threads if needed
      // await only valid in async functions 
       const response = await axios.get('https://localhost:5001/users', { headers : {
         Authorization : `Bearer ${newTokenCook}`} }
       );

       // console.log(response.data.users_list);
       // console.log("return the users list");
       setUsers(response.data.users_list);

       // return list of users from backend
       //return response.data.users_list;     
    }
    catch (error){

       // We're not handling errors. Just logging into the console.
       console.log(error);

       // report error
       console.log(error.message);
       console.log("in error");

       setRequestError(error.message);

       // return false if error arises
       return false;         
    }

  }
  return (
    <>
      <h1> Landing Page </h1>
      <h2> Press button to display contacts list.</h2>

      <button className="contactButton" type="button" onClick={() => fetchAllUsers()}> Display Contacts </button>
      
      <p> {requestError} </p>
      
      <table className="contactTable"> 
        <TableHeader/>
        <TableBody/>
      </table>

      {/* <div> Authenticated as {value.token}</div> */}
    </>
  );
};