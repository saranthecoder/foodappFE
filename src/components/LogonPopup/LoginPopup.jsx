import React, { useContext, useEffect, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios'


const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");

  const { url ,setToken} = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }

  const onLogin = async (event) => {
    event.preventDefault()
    let newUrl = url;
    if(currState === "Login") {
      newUrl += "/api/user/login"
    }
    else{
      newUrl += "/api/user/register"
    }

    const response = await axios.post(newUrl,data);
    if(response.data.status){
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    }
    else{
      console.log(response.data)
      alert(response.data.message);
    }
  }

  useEffect(() => {
    // Add the no-scroll class to the body when the component is mounted
    document.body.classList.add("no-scroll");

    // Remove the no-scroll class from the body when the component is unmounted
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState !== "Login" ? <input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder="Your name" required /> : <></>}

          <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" required />
          <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />

        </div>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>i agree the terms of use & privacy policy</p>
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
        {
          currState === "Login"
            ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
            : <p>Already have a account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        }

      </form>
    </div>
  );
};

export default LoginPopup;
