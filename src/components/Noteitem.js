// NoteItem.jsx
import React, { useContext } from 'react';
import NoteContext from "../context/notes/createContext";
import { FiEdit, FiTrash2, FiTag } from "react-icons/fi";

function NoteItem(props) {
  const notesHandler = useContext(NoteContext);
  const { deleteNote } = notesHandler;
  
  const { note, updateNote } = props;
  const date = new Date(note.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="col">
      <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title fw-bold mb-0 text-truncate">{note.title}</h5>
            <div className="d-flex">
              <button 
                className="btn btn-sm btn-link text-secondary p-1"
                onClick={() => updateNote(note)}
                aria-label="Edit note"
              >
                <FiEdit size={18} />
              </button>
              <button 
                className="btn btn-sm btn-link text-danger p-1"
                onClick={() => deleteNote(note._id)}
                aria-label="Delete note"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
          
          <p className="card-text text-muted mb-3">{note.description}</p>
          
          {note.tag && (
            <div className="d-flex flex-wrap gap-2 mb-3">
              {note.tag.split(',').map((tag, index) => (
                tag.trim() && (
                  <span 
                    key={index} 
                    className="badge bg-light text-primary d-flex align-items-center small"
                  >
                    <FiTag className="me-1" size={12} />
                    {tag.trim()}
                  </span>
                )
              ))}
            </div>
          )}
          
          <div className="d-flex justify-content-between align-items-center text-muted small">
            <span>{date}</span>
            <span className="text-truncate ms-2" style={{maxWidth: '100px'}}>
              {note.author}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;