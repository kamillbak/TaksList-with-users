import React from 'react';
import Costants from '../utilities/Constants';
import { useState } from "react";

export default function Login() {

  const initialFormData = Object.freeze({
    us_name: "",
    pass: "",
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


    if (formData.us_name === "") {
      alert("Username can't be empty");
      return;
    }

    if (formData.pass === "") {
      alert("Password can't be empty");
      return;
    }


    const loginData = {
      us_name: formData.us_name,
      pass: formData.pass
    };


    const url = Costants.API_URL_LOGIN;

    console.log(url);
    console.log(loginData);
    //fetch
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then(responseFromServer => {
        console.log(responseFromServer);
        // session storage info 
        sessionStorage.setItem('isUserLoggedIn', true);
        sessionStorage.setItem('userLoggedIn_id', responseFromServer.userId);
        sessionStorage.setItem('userLoggedIn_username', responseFromServer.userName);
      })
      .then(() => {
        window.location.href = "/";//move to home page
      })
      .catch((error) => {
        console.log(error);
        alert('Failed to log in. Incorrect user data.',error);
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
        <input value={formData.pass} name="pass" type="password" className='form-control' onChange={handleChange} />
      </div>

      <br />

      <button onClick={handleSubmit} className="btn btn-dark me-1">Submit</button>
      <button className="btn btn-dark">Cancel</button>
    </form>
  )


};



