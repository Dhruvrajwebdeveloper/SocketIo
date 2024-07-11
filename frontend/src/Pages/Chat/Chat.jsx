import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Chat.css";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../../Utils/APIRoutes";
import Contact from "../../Components/Contact/Contact";
import Welcome from "../../Components/Welcome/Welcome";
import ChatContainer from "../../Components/ChatContainer/ChatContainer";
const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentChat,setCurrentChat] = useState(undefined);
  const [isLoaded , setIsLoaded] = useState(false);
  useEffect(() => {
    async function CheckUser() {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    }
    CheckUser();
  }, [navigate]);
  useEffect(() => {
    async function getData() {
      if (currentUser && currentUser.isAvatarImageSet) {
        const data = await axios.get(
          `${allUsersRoute}/${currentUser}/${currentUser._id}`
        );
        // console.log(data);
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
    if (currentUser) {
      getData();
    }
  }, [currentUser, navigate]);

  const handleChatChange = (chat)=>{
    setCurrentChat(chat);
  }
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        backgroundColor: "#131324",
        // backgroundColor: "blue",
      }}
    >
      <div
        style={{
          height: "85vh",
          width: "80%",
          backgroundColor: "#00000076",
          display: "flex",
        }}
      >
        <div
          className="contact"
          style={{
            height: "inherit",  //85vh
            marginLeft: "10px",
            // overflowY:"scroll"
            backgroundColor: "#080420",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            // backgroundColor:"pink",
          }}
        >
          <Contact contacts={contacts} currentUser={currentUser} changeChat = {handleChatChange} />
        </div>
        <div
          className="chatsection"
          style={{
            height: "inherit",  //85vh
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
          }}
        >
        {
           isLoaded && currentChat === undefined ?(<Welcome currentUser={currentUser}/>
          ):(<ChatContainer currentChat={currentChat} currentUser={currentUser}/>)
        }
        </div>
      </div>
    </div>
  );
};

export default Chat;
