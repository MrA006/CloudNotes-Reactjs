import React, { useContext, useRef, useState } from "react";
import NoteContext from "../context/notes/createContext";
import Noteitem from "./Noteitem";

function Notes(props) {
  let notesHandler = useContext(NoteContext);
  const { notes, editNote } = notesHandler;
  const {showAlert} = props;

  const ref = useRef(null);
  const refClose = useRef(null);
  const [tempNote, setTempNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const updateNote = (note) => {
    ref.current.click();
    setTempNote(note);
  };
  
  //handle textarea change
  const changeHandler = (e) => {
    setTempNote({ ...tempNote, [e.target.name]: e.target.value });
  };

  //handle click
  const clickHandler = () => {
    refClose.current.click();
    //const { title, description, tag } = tempNote;
    editNote(tempNote);
    showAlert('Note Updated', 'success');
    //addNote(title, description, tag);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update a Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container my-3">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter a title"
                    name="title"
                    onChange={changeHandler}
                    value={tempNote.title}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    description
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    name="description"
                    onChange={changeHandler}
                    value={tempNote.description}
                  ></textarea>
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    tag
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="1"
                    name="tag"
                    onChange={changeHandler}
                    
                    value={tempNote.tag}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" onClick={clickHandler} className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-3">
        <h1>Your Notes</h1>
        <div className="row">
          {notes && notes.map((note) => {
            return (
              <Noteitem key={note._id} note={note} updateNote={updateNote} />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Notes;
