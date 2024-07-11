import React from "react";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useState } from "react";
import "./Chatinput.css"
const Chatinput = ({handleSendMsg}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker((current) => !current);
  };
  const handleEmojiClick = (event, emoji) => {
    // console.log(emoji);
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };
  const sendChat = (event)=>{
    event.preventDefault();
    if(msg.length>0){
      handleSendMsg(msg);
      setMsg("");
    }
  }
  return (
    <div
      className="chatinput-container"
      style={{
        height: "20%",
        width: "100%",
        // background: "green",
        display: "flex",
        alignItems: "center",
        gap: "0.8rem",
      }}
    >
      <div
        className="button-container"
        style={{
          width: "26px",
          height: "26px",
        }}
      >
        <div className="emoji">
          <BsEmojiSmileFill
            style={{
              color: "yellow",
              width: "25px",
              height: "25px",
              position: "absolute",
              cursor:"pointer"
            }}
            onClick={() => handleEmojiPickerHideShow()}
          />
          {showEmojiPicker && (
            <Picker
              onEmojiClick={(emoji,event)=>handleEmojiClick(event,emoji)}
              style={{
                position: "relative",
                top: "-20.5rem",
                left: "1rem",
                width: "15rem",
                height: "20rem",
                overflowY: "scroll",
                cursor: "pointer",
                backgroundColor:"#080420",
                borderColor:"#9186f3",
                
              }}
              theme="dark"
              className="emoji-picker-container"
              lazyLoadEmojis={true}
            />
          )}
        </div>
      </div>
      <form
        className="input-container"
        style={{
          width: "90%",
          display: "flex",
          alignItems: "center",
          gap: "0.8rem",
        }}
        onSubmit={(e)=>sendChat(e)}
      >
        <input
          type="text"
          placeholder="  type your message here"
          style={{
            height: "1.5rem",
            width: "85%",
            outline: "none",
            border: "none",
            borderRadius: "3px",
            backgroundColor: "#ffffff34",
            color: "whitesmoke",
            padding:"10px",
          }}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button
          className="submit-btn"
          style={{
            width: "5.5rem",
            height: "1.5rem",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#9a86f3",
            cursor:"pointer",
          }}
          type="submit"
        >
          <IoMdSend
            style={{
              color: "whitesmoke",
            }}
          />
        </button>
      </form>
    </div>
  );
};

export default Chatinput;

