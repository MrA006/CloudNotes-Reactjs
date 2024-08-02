
import { useNavigate } from "react-router-dom";
import UserContext from "./createContext";
import { useEffect, useState } from "react";



const UserState = (props) => {

    const navi = useNavigate();

//login User and get auth token
  const loginUser = async (credentials) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: myHeaders,
      body:JSON.stringify(credentials)
    });
    const res = await response.json();
    if(res.success){
      
      localStorage.setItem('auth-token', res.token);
      localStorage.setItem('logged', "true");
      navi('/');
      return true;
    }else{
      alert('incorrect credentials');
      return false;
    }
  }

//Create User
const signUpUser = async (credentials) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: myHeaders,
      body:JSON.stringify(credentials)
    });

    const authToken = await response.json();
    if(authToken.success){

      localStorage.setItem('auth-token', authToken.token);
      navi('/login');
    }else{
      alert('incorrect credentials');
    }
    
  }

  //signOut 

  const signOut = ()=>{
    localStorage.setItem('auth-token', null);
    localStorage.setItem('logged', 'false');

  }


  return (
    <UserContext.Provider value={{ loginUser, signUpUser, signOut}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
