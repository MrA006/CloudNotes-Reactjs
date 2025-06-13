import { useEffect, useState } from "react";
import NoteContext from "./createContext";
import Cookies from 'js-cookie';
import axios from "axios";

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

      const response = await axios.get('/api/notes/getnotes', {
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        }
      });

      if (response.data.success) {
        setNotes(response.data.notes);
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

      const response = await axios.post('/api/notes/addnote', 
        { title, description, tag },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken
          }
        }
      );

      if (response.data.success) {
        setNotes(notes.concat(response.data));
      } else {
        console.error("Failed to add note:", response.data.error);
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

      const response = await axios.delete(`/api/notes/deletenote/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        }
      });

      // Axios automatically parses JSON, so no need for .json()
      if (!response.data) {
        throw new Error(response.data?.error || "Failed to delete note");
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

      const response = await axios.put(`/api/notes/updatenote/${note._id}`, 
        note,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken
          }
        }
      );

      if (response.data.success) {
        setNotes(notes.map(n =>
          n._id === note._id ? { ...n, ...response.data } : n
        ));
      } else {
        console.error("Failed to update note:", response.data.error);
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