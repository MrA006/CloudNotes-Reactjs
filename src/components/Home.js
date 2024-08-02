import React, { useEffect } from "react";
import Notes from "./Notes";
import Addnote from "./Addnotes";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const navigate = useNavigate();
  
  const logged = localStorage.getItem('logged') === 'true';

  
  useEffect(() => {
    if (!logged) {
      navigate('/login'); 
    }
  }, [logged, navigate]);
  
  if (!logged) {
    return null;
  }
  return (
    <>
    
      <Addnote showAlert={props.showAlert}/>
      <Notes showAlert={props.showAlert}/>
    </>
  );
}

export default Home;
