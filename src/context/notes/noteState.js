import { useEffect, useState } from "react";
import NoteContext from "./createContext";

const NoteState = (props) => {
  const initialNotes = [
    {
      _id: "661b42581de7dca14a4f35612321321eqsdsad",
      user: "669b106b1de7dca14a4f355d",
      title: "MrAnas",
      description: "i am also good",
      tag: "feel",
      date: "2024-07-20T04:51:36.956Z",
      __v: 0,
    },
    {
      _id: "669b42181de7dca14a4f356asdasdww22d",
      user: "669b401b1de7dca14a4f355d",
      title: "MrAnas",
      description: "i am also good",
      tag: "feel",
      date: "2024-07-20T04:51:36.956Z",
      __v: 0,
    },
    {
      _id: "669b42581de1dca14a4f312213356d",
      user: "669b406b1de7d1a14a4f355d",
      title: "MrAnas",
      description: "i am also good",
      tag: "feel",
      date: "2024-07-20T04:51:36.956Z",
      __v: 0,
    },
    {
      _id: "669b42581de7dca14e4f35ddawdaw6d",
      user: "669b406b1de7dca12a4f355d",
      title: "MrAnas",
      description: "i am also good",
      tag: "feel",
      date: "2024-07-20T04:51:36.956Z",
      __v: 0,
    },
    {
      _id: "669b42181de7dca14aawwwa4f356d",
      user: "669b401b1de7dca14a4f355d",
      title: "MrAnas",
      description: "i am also good",
      tag: "feel",
      date: "2024-07-20T04:51:36.956Z",
      __v: 0,
    },
    {
      _id: "669b425asasa81wwwde1dca14a4f356d",
      user: "669b406b1deww7d1a14a4f355d",
      title: "MrAnas",
      description: "i am also good",
      tag: "feel",
      date: "2024-07-20T04:51:36.956Z",
      __v: 0,
    },
    {
      _id: "669asasb42581de7dca14e4f356d",
      user: "669b406b1de7dca12a4f355d",
      title: "MrAnas",
      description: "i am also good",
      tag: "feel",
      date: "2024-07-20T04:51:36.956Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(initialNotes);

  
  //get all notes
  
  const getNotes = async () => {
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5YjQwNmIxZGU3ZGNhMTRhNGYzNTVkIn0sImlhdCI6MTcyMTQ1MDYwM30.9W4E-QPdd0Yc7_ABhsB2SDxLEfQJASJ9aub3LEHh5Fk";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("auth-token", authToken);

    const response = await fetch("http://localhost:5000/api/notes/getnotes", {
      method: "GET",
      headers: myHeaders,
    });

    const notes = await response.json();
 
    setNotes(notes);
  };


/////////////////##########
useEffect(
  ()=>{
    getNotes();
  },
  []
)
////////////////###########


  //add a Note
  const addNote = async (title, description, tag) => {
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5YjQwNmIxZGU3ZGNhMTRhNGYzNTVkIn0sImlhdCI6MTcyMTQ1MDYwM30.9W4E-QPdd0Yc7_ABhsB2SDxLEfQJASJ9aub3LEHh5Fk";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("auth-token", authToken);

    let note = {
   //   _id: "669b42581de7dca14e4f356d",
    //  user: "669b406b1de7dca12a4f355d",
      title: title,
      description: description,
      tag: "feel",
    //  date: "2024-07-20T04:51:36.956Z",
    //  __v: 0,
    };

    note = JSON.stringify(note);
    const response =
     await fetch(`http://localhost:5000/api/notes/addnote`, {
      method: "POST",
      headers: myHeaders,
      body:note
    });
    const addedNote = await response.json();
    setNotes(notes.concat(addedNote));
  };



  //delete a Note
  const deleteNote = async (id) => {
    
    const temp = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(temp);

    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5YjQwNmIxZGU3ZGNhMTRhNGYzNTVkIn0sImlhdCI6MTcyMTQ1MDYwM30.9W4E-QPdd0Yc7_ABhsB2SDxLEfQJASJ9aub3LEHh5Fk";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("auth-token", authToken);

    //const response =
     await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
      method: "PUT",
      headers: myHeaders,
    });


  };



  //update a Note

  const editNote = async (note) => {

    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5YjQwNmIxZGU3ZGNhMTRhNGYzNTVkIn0sImlhdCI6MTcyMTQ1MDYwM30.9W4E-QPdd0Yc7_ABhsB2SDxLEfQJASJ9aub3LEHh5Fk";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("auth-token", authToken);
    const anote = JSON.stringify(note);
    const response =
    await fetch(`http://localhost:5000/api/notes/updatenote/${note._id}`, {
      method: "PUT",
      headers: myHeaders,
      body:anote
    });
    
    const updatedNote = await response.json();

    const updatedNotes = notes.map((n) => {
      if (n._id === note._id) {
        return { ...n, ...updatedNote };
      }
      return n;
    });
    
    setNotes(updatedNotes);
    
  };


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
