import React from "react";
import Logout from "../Logout/Logout";
import Chatinput from "../Chatinput/Chatinput";

const ChatContainer = ({ currentChat }) => {
  const handleSendMsg =async(msg)=>{

  }
  return (
    <>
      {currentChat && (
        <div className="chatContainer" style={{
            width:"96%",
            height:"inherit",
          }}>
          <div className="chat-header" style={{
            display:"flex",
            width:"inherit",
            height:"5rem",
            // padding:"0.5rem",
            alignItems:"center",
            justifyContent:"space-between",
            // background:"yellow"
          }}>
            <div className="avatar" style={{
              display:"flex",
              alignItems:"center"
            }}>
              <img
                src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`}
                alt=""
                style={{
                  height:"3rem",width:"3rem"
                }}
              />
            <div className="username">
              <h3 style={{
                fontSize:"1.4rem",
                fontWeight:"500",
                color:"whitesmoke",
                paddingLeft:"0.8rem"
              }}>{currentChat?.username}</h3>
            </div>
            </div>
            <Logout  />
          </div>
          <div className="chat-messages"></div>
              <Chatinput handleSendMsg = {handleSendMsg}/>
        </div>
      )}
    </>
  );
};

export default ChatContainer;
