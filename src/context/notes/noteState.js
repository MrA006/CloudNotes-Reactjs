import { useEffect, useState } from "react";
import NoteContext from "./createContext";
import Cookies from 'js-cookie'; 
import axios from "axios"

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  
  // Helper function to get auth token from cookies
  const getAuthToken = () => {
    return Cookies.get('auth-token');
  };

  // Get all notes
  const getNotes = async () => {
    try {
      const authToken = getAuthToken();
      if (!authToken) return;

      const response = await fetch("http://localhost:5000/api/notes/getnotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
      });

      const data = await response.json();
      if (data.success) {
        setNotes(data.notes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Add this useEffect to fetch notes on component mount
  useEffect(() => {
    if (getAuthToken()) {
      getNotes();
    }
  }, []);

  // Add a Note
  const addNote = async (title, description, tag) => {
    try {
      const authToken = getAuthToken();
      if (!authToken) {
        console.error("No auth token found");
        return;
      }

      const response = await fetch("http://localhost:5000/api/notes/addnote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
        body: JSON.stringify({ title, description, tag })
      });

      const addedNote = await response.json();
      
      if (response.ok && addedNote.success) {
        setNotes(notes.concat(addedNote));
      } else {
        console.error("Failed to add note:", addedNote.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  // Delete a Note
const deleteNote = async (id) => {
  try {
    const authToken = getAuthToken();
    if (!authToken) return;

    // Optimistic UI update
    setNotes(notes.filter(note => note._id !== id));

    const response = await axios.delete(
        `http://localhost:5000/api/notes/deletenote/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken
            },
        }
    );

    const result = await response.json();
    
    // Check for both response status and result presence
    if (!response.ok || !result) {
      throw new Error(result.error || "Failed to delete note");
    }
  } catch (error) {
    console.error("Delete note error:", error.message);
    getNotes(); // Refresh notes from server
  }
};

  // Update a Note
  const editNote = async (note) => {
    try {
      const authToken = getAuthToken();
      if (!authToken) {
        console.error("No auth token found");
        return;
      }

      const response = await fetch(`http://localhost:5000/api/notes/updatenote/${note._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
        body: JSON.stringify(note)
      });

      const updatedNote = await response.json();
      
      if (response.ok && updatedNote.success) {
        setNotes(notes.map(n => 
          n._id === note._id ? { ...n, ...updatedNote } : n
        ));
      } else {
        console.error("Failed to update note:", updatedNote.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;