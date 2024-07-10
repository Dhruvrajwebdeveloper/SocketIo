import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
import axios from "axios";
import { SetAvatarRoute } from "../../Utils/APIRoutes";
import "./SetAvatar.css";
import { ToastOptions } from "../Register/Register";
const api = "https://api.multiavatar.com/45678945";
const SetAvatar = () => {
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const navigate = useNavigate();

  const setProfilePicture = async () => {
    if (selectedAvatar === null) {
      toast.error("Please select an Avatar", ToastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const {data} = await axios.post(`${SetAvatarRoute}/${user._id}`,{
        image:avatars[selectedAvatar],
      });
      console.log(data);

      if(!data.isSet){
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user",JSON.stringify(user));
        navigate('/')
      }else{
        toast.error("Avatar already set",ToastOptions);
      }
    }
  };
  useEffect(()=>{
    async function CheckUser(){
    if(!localStorage.getItem("chat-app-user")){
      navigate("/login");
    }
    // else navigate("/");
  };
  CheckUser();
  },[navigate]);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function getAvatars() {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`,
            { responseType: "arraybuffer", signal }
          );
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
          // console.log(data);
        }
        setAvatars(data);
        setIsLoading(false);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.log(error);
          setIsLoading(false);
        }
      }
    }
    getAvatars();
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>
      {isLoading ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            backgroundColor: "#131324",
          }}
        >
          <img src={loader} alt="loader" height="200px" width="200px" />
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            backgroundColor: "#131324",
          }}
        >
          <div
            style={{ color: "white", fontSize: "1.5rem", fontWeight: "600" }}
          >
            Pick an avatar for Profile Pic
          </div>
          <div
            className="avatarContainer"
            style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}
          >
            {avatars.map((avatar, index) => {
              return (
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  style={{ width: "100px", height: "100px" }}
                  className={`avatar-img ${
                    selectedAvatar === index ? "selectedAvatar" : ""
                  }`}
                  key={index}
                  onClick={() => setSelectedAvatar(index)}
                />
              );
            })}
          </div>
          <button
            style={{
              display: "block",
              padding: "1rem 2rem",
              fontWeight: "400",
              fontSize: "1rem",
              border: "none",
            }}
            className="setAvatarSubmitBtn"
            onClick={setProfilePicture}
          >
            Set as Profile Picture
          </button>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default SetAvatar;
