import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Chat from './Pages/Chat/Chat';
import SetAvatar from './Pages/SetAvatar/SetAvatar';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/setAvatar' element={<SetAvatar/>}/>
        <Route path='/' element={<Chat/>}/>
      </Routes>
    </Router>
  )
}

export default App
