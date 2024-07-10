import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../../Utils/APIRoutes";
const ToastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};
const Login = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = formData;
      // console.log(formData);
      const { data } = await axios.post(loginRoute, {
        username,
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
    const { username, password } = formData;
    if (username.length === "" || password === "") {
      toast.error("Username and password is required", ToastOptions);
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
            minLength="3"
          />

          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => handleChange(e)}
            minLength="3"
          />

          <button type="submit">
            <span>Login User</span>
          </button>
          <span>
            Don't have an account ? <Link to={"/register"}>Register</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
