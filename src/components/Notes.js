// Notes.jsx
import React, { useContext, useRef, useState } from "react";
import NoteContext from "../context/notes/createContext";
import NoteItem from "./Noteitem.js";
import { FiPlus, FiSearch, FiFilter } from "react-icons/fi";

function Notes(props) {
  const notesHandler = useContext(NoteContext);
  const { notes, editNote } = notesHandler;
  const { showAlert } = props;

  const ref = useRef(null);
  const refClose = useRef(null);
  const [tempNote, setTempNote] = useState({
    title: "",
    description: "",
    tag: "",
    _id: ""
  });

  // State for search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  
  // Get unique tags for filtering
  const tags = ["all", ...new Set(notes.flatMap(note => note.tag.split(',').map(t => t.trim()).filter(t => t)))];
  
  // Filter notes based on search and tag
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          note.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === "all" || note.tag.toLowerCase().includes(selectedTag.toLowerCase());
    return matchesSearch && matchesTag;
  });

  const updateNote = (note) => {
    ref.current.click();
    setTempNote(note);
  };

  const changeHandler = (e) => {
    setTempNote({ ...tempNote, [e.target.name]: e.target.value });
  };

  const clickHandler = () => {
    refClose.current.click();
    editNote(tempNote);
    showAlert('Note updated successfully', 'success');
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 mb-0">Your Notes</h1>
        <button 
          className="btn btn-primary d-flex align-items-center"
          onClick={() => document.getElementById('add-note-btn')?.click()}
        >
          <FiPlus className="me-2" />
          Add Note
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="row mb-4 g-3">
        <div className="col-md-8">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <FiSearch />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <FiFilter />
            </span>
            <select 
              className="form-select"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              {tags.map((tag, index) => (
                <option key={index} value={tag}>
                  {tag === "all" ? "All Tags" : tag}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-3">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#dee2e6" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <h3 className="h4 text-muted mb-3">No notes found</h3>
          <p className="text-muted">
            {searchTerm || selectedTag !== "all" 
              ? "Try changing your search or filter" 
              : "Create your first note using the 'Add Note' button"}
          </p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredNotes.map((note) => (
            <NoteItem key={note._id} note={note} updateNote={updateNote} />
          ))}
        </div>
      )}

      {/* Edit Note Modal */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editNoteModal"
        ref={ref}
      >
        Open Edit Modal
      </button>

      <div
        className="modal fade"
        id="editNoteModal"
        tabIndex="-1"
        aria-labelledby="editNoteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="editNoteModalLabel">
                <FiPlus className="me-2" />
                Update Note
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="editTitle" className="form-label fw-medium">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editTitle"
                    name="title"
                    placeholder="Note title"
                    value={tempNote.title}
                    onChange={changeHandler}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editDescription" className="form-label fw-medium">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="editDescription"
                    name="description"
                    rows="3"
                    placeholder="Note content"
                    value={tempNote.description}
                    onChange={changeHandler}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="editTag" className="form-label fw-medium">
                    Tags
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editTag"
                    name="tag"
                    placeholder="work, personal, ideas"
                    value={tempNote.tag}
                    onChange={changeHandler}
                  />
                  <div className="form-text">
                    Separate tags with commas
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={clickHandler}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notes;