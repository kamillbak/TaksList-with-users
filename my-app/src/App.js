import React from "react";


import TaskCreateForm from "./Components/TaskCreateForm";
import TaskUpdateForm from "./Components/TaskUpdateForm";

import { BrowserRouter, Routes, Route } from "react-router-dom"; //r 
import Login from "./Components/Login"; //r 
import Registration from "./Components/Registration"; //r 
import Navbar from "./Components/Navbar"; //r 
import NoPage from "./Components/NoPage"; //r
import Home from "./Home"; //r 


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}



export default App;



