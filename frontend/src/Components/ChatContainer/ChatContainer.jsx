import React, { useEffect, useState } from "react";
import Logout from "../Logout/Logout";
import Chatinput from "../Chatinput/Chatinput";
import Messages from "../Messages/Messages";
import axios from "axios";
import "./ChatContainer.css"
import { getAllMessagesRoute, sendMessageRoute } from "../../Utils/APIRoutes";

const ChatContainer = ({ currentChat, currentUser }) => {
  const [messages, setMessages] = useState([]);
  console.log(messages);
  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
  };
  useEffect(() => {
    async function fetchChat() {
      const response = await axios.post(getAllMessagesRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    }
    if(currentUser){
      fetchChat();
    }      
  }, [currentChat]);
  return (
    <>
      {currentChat && (
        <div
          className="chatContainer"
          style={{
            width: "96%",
            height: "inherit", //85vh
            display: "flex",
            flexDirection: "column",
            // background:"pink"
          }}
        >
          <div
            className="chat-header"
            style={{
              display: "flex",
              width: "inherit", //96%
              height: "15%", //remaining: 85vh -15%
              padding: "0.5rem",
              alignItems: "center",
              justifyContent: "space-between",
              // background:"yellow"
            }}
          >
            <div
              className="avatar"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`}
                alt=""
                style={{
                  height: "3rem",
                  width: "3rem",
                }}
              />
              <div className="username">
                <h3
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "500",
                    color: "whitesmoke",
                    paddingLeft: "0.8rem",
                  }}
                >
                  {currentChat?.username}
                </h3>
              </div>
            </div>
            <Logout />
          </div>
          {/* <Messages /> */}
          <div className="chat-messages" style={{
            display:"flex",
            marginTop:"10px",
            flexDirection:"column",
            gap:"0.8rem",
            width:"94%",
            height:"70%",
            overflowY:"auto"
            // flexWrap:"wrap"
          }}>
            {messages.map((message) => {
              return (
                <>
                  <div
                    className={`message ${
                      message.fromSelf ? "sended" : "received"
                    }`}
                   style={{
                    color:"whitesmoke",
                    fontSize:"1rem",
                    fontWeight:"400",
                    letterSpacing:"1px",
                    width:"fit-content",
                    display:"flex",
                    alignItems:"center",
                    padding:"3px",
                    borderRadius:"4px",
                    overflowWrap:"break-word",
                    maxWidth:"40%",
                    textAlign:"justify"
                   }}
                  >
                    <div className="content">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <Chatinput handleSendMsg={handleSendMsg} />
        </div>
      )}
    </>
  );
};

export default ChatContainer;

