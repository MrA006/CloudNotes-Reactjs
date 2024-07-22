import React, {useContext} from 'react'
import NoteContext from "../context/notes/createContext";

function Noteitem(props) {
  let notesHandler = useContext(NoteContext);
  const {deleteNote} = notesHandler;
  return (
    <div className="col-md-3 my-3">
      <div className="card" >
        <div className="card-body">
          <h5 className="card-title">{props.note.title}</h5>
          <p className="card-text">
            {props.note.description}
            
          </p>
          <i class="fa-solid fa-trash mx-3" onClick={()=>{deleteNote(props.note._id);}}></i>
          <i class="fa-solid fa-pen-to-square"></i>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
