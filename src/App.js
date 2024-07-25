import React, { useEffect } from 'react';
import {Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/noteState';
import UserState from './context/users/userState';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  
  useEffect(() => {
    localStorage.clear();
    localStorage.setItem('logged', "false");
  }, []);

  return (
    <div className="App">
      <UserState>
      <NoteState>
          <Navbar />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        
      </NoteState>
      </UserState>
    </div>
  );
}

export default App;
