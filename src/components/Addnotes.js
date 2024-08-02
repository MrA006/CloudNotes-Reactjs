import React, {useContext, useState} from 'react'
import NoteContext from "../context/notes/createContext";

function Addnote(props) {
  
  let notesHandler = useContext(NoteContext);
  const {addNote} = notesHandler;
  const {showAlert} = props;
  


  const [tempNote,setTempNote] = useState({title:'',description:'',tag:''});

  //handle textarea change
  const changeHandler = (e) =>{
    setTempNote({...tempNote,[e.target.name]:e.target.value})
  }

  //handle click 
  const clickHandler = () =>{
    const {title, description,tag} = tempNote;
    addNote(title,description,tag);
    setTempNote({title:'',description:'',tag:''});
    showAlert('Note added','success');
  }

  const descriptionLengthCheck = (tempNote.description.length>4);
  const titleLengthCheck = (tempNote.title.length>4);
  const lengthCheck = ( descriptionLengthCheck && titleLengthCheck)?false:true;
  

  return (
    <div className="container my-3">
        <h1>Add a Note</h1>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter a title"
            name="title"
            value={tempNote.title}
            onChange={changeHandler}
          />
        </div>
        {!titleLengthCheck && <div className="small text-danger mb-3">title should be at least 5 characters</div>}
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            description
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            name="description"
            value={tempNote.description}
            onChange={changeHandler}
          ></textarea>
          {!descriptionLengthCheck && <div className="small text-danger mb-3">description should be at least 5 characters</div>}

          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            tag
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="1"
            name="tag"
            value={tempNote.tag}
            onChange={changeHandler}
          ></textarea>
          <button className='btn btn-primary my-3' disabled={lengthCheck} onClick={clickHandler}>Submit</button>
        </div>
      </div>
  )
}

export default Addnote
