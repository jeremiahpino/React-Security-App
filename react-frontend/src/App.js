import { Routes, Route } from "react-router-dom";
// import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

import { ProtectedRoute } from "./utils/ProtectedRoute";
// import { fakeAuth } from "./utils/FakeAuth";

import { Landing } from "./Landing";
import { Home } from "./Home";

// step 6
import { useAuth } from "./context/AuthProvider";
import { AuthProvider } from "./context/AuthProvider";

const App = () => {

    return (
      <>
      <AuthProvider>
          <Navigation />
        
          {/* <h1>React Router</h1> */}

          <Routes>
            <Route index element={<Home />} />
            
            <Route path="landing" element={
              <ProtectedRoute> <Landing /> </ProtectedRoute>} />
            <Route path="home" element={<Home />} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </AuthProvider>
      </>
      );
};


const Navigation = () => {
  const { value } = useAuth();
  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/landing">Landing</NavLink>
      {value.token && (
        <button type="button" onClick={value.onLogout}>
          Sign Out
          </button>
      )}
      </nav>
  );
  };

export default App;