import React from 'react';
import Costants from '../utilities/Constants';
import { useState } from "react";

export default function Registration() {

  const initialFormData = Object.freeze({
    userName: "",
    password: "",
    email: "@gmail.com",
  });

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //

  const handleSubmit = (e) => {
    e.preventDefault();

    const userToRegister = {
      userId: 0,
      userName: formData.userName,
      password: formData.password,
      email: formData.email,
    };


    console.log(userToRegister);

    const url = Costants.API_URL_REGISTER;

    console.log(url);

    //fetch
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userToRegister)
    })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      })
     
    window.location.href = "/login";   //move to login page
  };



  return (
    <form className='w-100 px-5'>
      <h1 className='mt-5'>Registration</h1>

      <div className='mt-5'>
        <label className='h3 form-label'> username</label>
        <input value={formData.userName} name="userName" type="text" className='form-control' onChange={handleChange} />
      </div>

      <div className='mt-4'>
        <label className='h3 form-label'> email</label>
        <input value={formData.email} name="email" type="text" className='form-control' onChange={handleChange} />
      </div>

      <div className='mt-4'>
        <label className='h3 form-label'> password </label>
        <input value={formData.password} name="password" type="text" className='form-control' onChange={handleChange} />
      </div>

      <br />

      <button onClick={handleSubmit} className="btn btn-dark me-1">Submit</button>
      <button className="btn btn-dark">Cancel</button>
    </form>
  )


};



