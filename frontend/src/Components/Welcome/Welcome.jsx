import React from 'react'
import Robot from "../../assets/robot.gif";
const Welcome = ({currentUser}) => {
  return (
    <div>
      <img src={Robot} alt="Robot" style={{height:"20rem",width:"20rem"}} />
      <h1 style={{color:"whitesmoke",fontWeight:"500"}}>
        Welcome,<span style={{color:"#4e0eff"}}>{currentUser.username}</span>
      </h1>
      <h3 style={{color:"whitesmoke",fontWeight:"500"}}>Please select a chat to start messaging</h3>
    </div>
  )
}

export default Welcome
