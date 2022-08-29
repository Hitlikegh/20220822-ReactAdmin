import React from "react";
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Login from './pages/login/login';
import Home from './pages/home/home';
import Admin from "./pages/admin/admin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/*' element={<Admin />}></Route>
          {/* <Route path='/test' element={<Test />} ></Route> */}
          {/* <Route path="/" element={<Navigate to="/home" />} /> */}
        </Routes>
      </Router>
      {/* <h1>hellp</h1> */}
    </>
  )
}

export default App;
