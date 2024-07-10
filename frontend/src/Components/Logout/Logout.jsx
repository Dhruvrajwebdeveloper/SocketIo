import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
const Logout = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <button
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        backgroundColor: "#9a86f3",
        border: "none",
        cursor: "pointer",
       float:"right",
      }}
      onClick={()=>handleClick()}
    >
      <BiPowerOff style={{
         color: "#ebe7ff",
         fontSize: "1.3rem",
      }}/>
    </button>
  );
};

export default Logout;
