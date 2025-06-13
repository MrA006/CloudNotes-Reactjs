import { useState } from 'react';
import {Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/noteState';
import UserState from './context/users/userState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import axios from 'axios';

function App() {
  const [alert,setAlert] = useState(null);
  
  const showAlert = (msg,type) => {
    const a = {
      msg:msg, type:type
    }
    setAlert(a);
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  axios.defaults.baseURL = 'https://cloudnotes-8ua2.onrender.com';

  

  return (
    <div className="App">
      
      <UserState>
      <NoteState>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert}/>

          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home showAlert={showAlert}/>} />
            <Route path="/login" element={<Login showAlert={showAlert}/>} />
            <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
          </Routes>
          
        
      </NoteState>
      </UserState>
    </div>
  );
}

export default App;
