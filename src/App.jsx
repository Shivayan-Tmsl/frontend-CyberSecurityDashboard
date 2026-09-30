import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import Attacks from './pages/Attacks';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Websites from './pages/Websites';


function App() {
  return (
    <>
     <div>
      <Router>
        <Routes>
          <Route path = "/" element={<Dashboard/>} />
          <Route path = "/alerts" element={<Alerts/>} />
          <Route path = "/attacks" element={<Attacks/>} />
          <Route path = "/signup" element={<Signup/>} />
          <Route path = "/login" element={<Login/>} />
          <Route path = "/websites" element={<Websites/>} />
        </Routes>
      </Router>

    </div>
    </>
  );
}

export default App;
