import React, { useEffect } from "react";
import Notes from "./Notes";
import Addnote from "./Addnotes";
import { useNavigate } from "react-router-dom";

function Home() {
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
      <Addnote />
      <Notes />
    </>
  );
}

export default Home;
