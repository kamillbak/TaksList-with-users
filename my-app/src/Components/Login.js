import React from 'react';
import Costants from '../utilities/Constants';
import { useState } from "react";

export default function Login() {

  const initialFormData = Object.freeze({
    us_name: "----",
    pass: "****",
  });

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      us_name: formData.us_name ,
      pass: formData.pass
    };

    console.log(loginData);

    const url = Costants.API_URL_LOGIN;

    console.log(url);

    //fetch
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      })
  };



  return (
    <form className='w-100 px-5'>
      <h1 className='mt-5'>Login</h1>

      <div className='mt-5'>
        <label className='h3 form-label'> username</label>
        <input value={formData.us_name} name="us_name" type="text" className='form-control' onChange={handleChange} />
      </div>

      <div className='mt-4'>
        <label className='h3 form-label'> password </label>
        <input value={formData.pass} name="pass" type="text" className='form-control' onChange={handleChange} />
      </div>

      <br />

      <button onClick={handleSubmit} className="btn btn-dark me-1">Submit</button>
      <button className="btn btn-dark">Cancel</button>
    </form>
  )


};



