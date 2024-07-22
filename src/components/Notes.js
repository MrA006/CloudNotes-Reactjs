import React, {useContext} from 'react'
import NoteContext from "../context/notes/createContext";
import Noteitem from './Noteitem';

function Notes() {
      
  let notesHandler = useContext(NoteContext);
  const {notes} = notesHandler;

  return (
    <div className="container my-3">
        <h1>Your Notes</h1>
        <div className=' row '>

        {notes.map(
            (note,index) => {
                return (
                <>
                <Noteitem key={index} note={note}/>
                </>
            )
        }
        )}
    </div>
      </div>
  )
}

export default Notes
