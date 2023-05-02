import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { newRequest } from "../../../../fiverbackend/Utils/newRequest";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log("handle submit");
console.log(username);
console.log(password);
    try{
        const res= await newRequest.post("auth/login",{username,password});
        localStorage.setItem("currentuser",JSON.stringify((await res).data));

        console.log("data",res);
        navigate('/');
    }
    // try {
    //   const res = await newRequest.post("/auth/login", { username, password });
    //   localStorage.setItem("currentUser", JSON.stringify(res.data));
    //   navigate("/")
     catch (err) {
      console.log(err);
      setError(err);
      setTimeout(()=>{
        setError(null);
      },3000)
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error&&<div className="error">{error.message}</div>}
      </form>
    </div>
  );
}

export default Login;