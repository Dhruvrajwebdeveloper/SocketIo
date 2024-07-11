import React, { useEffect, useRef, useState } from "react";
import Logout from "../Logout/Logout";
import Chatinput from "../Chatinput/Chatinput";
import Messages from "../Messages/Messages";
import axios from "axios";
import "./ChatContainer.css"
import { getAllMessagesRoute, sendMessageRoute } from "../../Utils/APIRoutes";
import {v4 as uuidv4} from "uuid";

const ChatContainer = ({ currentChat, currentUser,socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage,setArrivalMessage] = useState([null]);

  const scrollRef = useRef()
  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg",{
      to:currentChat._id,
      from:currentUser._id,
      message:msg,
    });
    const msgs = [...messages];
    msgs.push({fromSelf:true,message:msg});
    setMessages(msgs);
  };
  useEffect(() => {
    async function fetchChat() {
      const response = await axios.post(getAllMessagesRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    }
    if(currentChat){
      fetchChat();
    }      
  }, [currentChat]);

  useEffect(()=>{
    if(socket.current){
      socket.current.on("msg-receive",(msg)=>{
        setArrivalMessage({fromSelf:false,message:msg});
      })
    }
  },[]);
  useEffect(()=>{
    arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage])
  },[arrivalMessage]);

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:"smooth"});
  },[messages]);

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
                    letterSpacing:"1.4px",
                    width:"fit-content",
                    display:"flex",
                    alignItems:"center",
                    padding:"10px",
                    borderRadius:"6px",
                    overflowWrap:"break-word",
                    maxWidth:"40%",
                    textAlign:"justify",
                   }}
                   ref={scrollRef}
                   key={uuidv4()}
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

