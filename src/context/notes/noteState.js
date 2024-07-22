import { useState } from "react";
import NoteContext from "./createContext";

const NoteState = (props) => {
    const initialNotes = [
        {
          "_id": "661b42581de7dca14a4f35612321321eqsdsad",
          "user": "669b106b1de7dca14a4f355d",
          "title": "MrAnas",
          "description": "i am also good",
          "tag": "feel",
          "date": "2024-07-20T04:51:36.956Z",
          "__v": 0
        },{
            "_id": "669b42181de7dca14a4f356asdasdww22d",
            "user": "669b401b1de7dca14a4f355d",
            "title": "MrAnas",
            "description": "i am also good",
            "tag": "feel",
            "date": "2024-07-20T04:51:36.956Z",
            "__v": 0
          },{
            "_id": "669b42581de1dca14a4f312213356d",
            "user": "669b406b1de7d1a14a4f355d",
            "title": "MrAnas",
            "description": "i am also good",
            "tag": "feel",
            "date": "2024-07-20T04:51:36.956Z",
            "__v": 0
          },{
            "_id": "669b42581de7dca14e4f35ddawdaw6d",
            "user": "669b406b1de7dca12a4f355d",
            "title": "MrAnas",
            "description": "i am also good",
            "tag": "feel",
            "date": "2024-07-20T04:51:36.956Z",
            "__v": 0
          },{
            "_id": "669b42181de7dca14aawwwa4f356d",
            "user": "669b401b1de7dca14a4f355d",
            "title": "MrAnas",
            "description": "i am also good",
            "tag": "feel",
            "date": "2024-07-20T04:51:36.956Z",
            "__v": 0
          },{
            "_id": "669b425asasa81wwwde1dca14a4f356d",
            "user": "669b406b1deww7d1a14a4f355d",
            "title": "MrAnas",
            "description": "i am also good",
            "tag": "feel",
            "date": "2024-07-20T04:51:36.956Z",
            "__v": 0
          },{
            "_id": "669asasb42581de7dca14e4f356d",
            "user": "669b406b1de7dca12a4f355d",
            "title": "MrAnas",
            "description": "i am also good",
            "tag": "feel",
            "date": "2024-07-20T04:51:36.956Z",
            "__v": 0
          },
      ]

      const [notes, setNotes] = useState(initialNotes);

      //add a Note
      const addNote = (title,description,tag) => {
        //api call to add the note
        const note = {
          "_id": "669b42581de7dca14e4f356d",
          "user": "669b406b1de7dca12a4f355d",
          "title": title,
          "description": description,
          "tag": "feel",
          "date": "2024-07-20T04:51:36.956Z",
          "__v": 0
        };
        setNotes(notes.concat(note));
      }
      //delete a Note
      const deleteNote = (id) => {
        //api call to delete the note
        
        const temp = notes.filter((note)=>{return note._id!==id});
        setNotes(temp);
      }
      //update a Note


    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;