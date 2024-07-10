import React from 'react'
import Picker from "emoji-picker-react";
import {IoMdSend} from "react-icons/io";
import {BsEmojiSmileFill} from "react-icons/bs";
import { useState } from 'react';
const Chatinput = () => {
  return (
    <div className='chatinput-container'>
        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill/>
            </div>
        </div>
        <form className="input-container">
            <input type="text" placeholder='type your message here' />
            <button className="submit">
                <IoMdSend/>
            </button>
        </form>
    </div>
  )
}

export default Chatinput
