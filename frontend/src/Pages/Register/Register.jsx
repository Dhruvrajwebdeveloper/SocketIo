import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import { registerRoute } from "../../Utils/APIRoutes";
export const ToastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};
const Register = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
      navigate("/");
    }
  },[]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = formData;
      console.log(formData);
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      console.log(data);
      if (data.status === false) {
        toast.error(data.msg, ToastOptions);
      } else {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };
  const handleValidation = () => {
    const { username, email, password, confirmpassword } = formData;
    if (password !== confirmpassword) {
      toast.error("password and confirmpassword don't match", ToastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", ToastOptions);
      return false;
    } else if (email.length < 3) {
      toast.error("Email should be greater than 3 characters", ToastOptions);
      return false;
    } else if (password.length < 3) {
      toast.error("Password should be greater than 3 characters", ToastOptions);
      return false;
    }

    return true;
  };
  const handleChange = (event) => {
    setformData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <div className="formContainer">
      <div className="formSectionContainer">
        <form className="registerForm" onSubmit={handleSubmit}>
          <div className="brand">
            <img className="" src={Logo} alt="Logo" />
            <h1 className="">snappy</h1>
          </div>
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="confirmpassword"
            name="confirmpassword"
            placeholder="confirmpassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">
            <span>Create User</span>
          </button>
          <span>
            Already have an account ? <Link to={"/login"}>Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
