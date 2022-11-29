import React from 'react';
import Costants from '../utilities/Constants';
import { useState } from "react";

export default function Registration() {

  const initialFormData = Object.freeze({
    userName: "",
    password: "",
    passwordConf: "",
    email: ""
  });

  const [formData, setFormData] = useState(initialFormData);
  const [isUserNameFree, setisUserNameFree] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // check if username is free function
  const isUsernameFree = (userNam) => {
    let users = [];
    var userFromDB;

    const url = 'https://localhost:7073/api/Users';

    fetch(url, {
      method: 'GET'
    })
      .then(r => r.json())
      .then(usersFrmServer => {
        users = usersFrmServer;
      })
      .then(() => {
        userFromDB = users.find(u => u.userName === userNam);
        console.log(userFromDB);
        if (typeof  userFromDB === 'undefined') {
          setisUserNameFree(true);
        }
        else {
          setisUserNameFree(false);
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      })

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConf) {
      alert('Passwords are different');
      return;
    }

    if (formData.userName === "") {
      alert("Username can't be empty");
      return;
    }

    if (formData.email === "") {
      alert("Email can't be empty");
      return;
    }

    //check if username is free
    isUsernameFree()
    const x = isUserNameFree;

    if (!x) {
      alert("Username already exist");
      return;
    }

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
      .then(() => {
        window.location.href = "/login";//move to login page
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      })
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
        <input value={formData.password} name="password" type="password" className='form-control' onChange={handleChange} />
      </div>

      <div className='mt-4'>
        <label className='h3 form-label'> confirm password </label>
        <input value={formData.passwordConf} name="passwordConf" type="password" className='form-control' onChange={handleChange} />
      </div>

      <br />

      <button onClick={handleSubmit} className="btn btn-dark me-1">Submit</button>
      <button className="btn btn-dark">Cancel</button>
    </form>
  )

};



