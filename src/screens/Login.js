import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';


export default function Login() {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",

  });
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid credentials ");
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate("/")
    }
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container " style={{  display: 'flex', justifyContent: 'center',  alignItems: 'center',  height: '100vh', width: '100%',background: 'linear-gradient(to right, orange, white, orange)',  }}>
       <div  style={{background: 'aliceblue', padding: '50px', borderRadius: '5px',  }} >
       <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label" style={{fontFamily: 'sans-serif'}}>
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text" style={{fontFamily: 'sans-serif'}}>
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label" style={{fontFamily: 'sans-serif'}}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" className=" m-3 btn btn-success" style={{fontFamily: 'sans-serif'}}>
            Submit
          </button>
          <Link to="/creatuser" className="m-3 btn btn-danger" style={{fontFamily: 'sans-serif'}}>
            New User!
          </Link>
        </form>
       </div>
      </div>
    </>
  )
}
