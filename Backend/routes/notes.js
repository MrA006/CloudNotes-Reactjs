const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');

// ROUTE 1: get all notes - GET /api/auth/getnotes

router.get("/getnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json({success: true, notes});
  } catch (error) {
    //console.error('Error during login:', error);
    return res.status(500).json({success: false, error: "Internal Server Error" });
  }
});

// ROUTE 2: add a note - POST /api/auth/addnote

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "title should be atleast 5 characters").isLength({min: 5}),
    body("description", "description should be atleast 5 characters").isLength({min: 5})
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;
      const note = new Notes({
          title,
          description,
          tag,
          user: req.user.id
        });
      //  console.log(note);
      await note.save();
      res.json(note);
    } catch (error) {
      //console.error('Error during login:', error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);



// ROUTE 3: update a note - PUT /api/notes/updatenote

router.put(
    "/updatenote/:id",
    fetchuser,
    
    async (req, res) => {
      
      try {
        const { title, description, tag } = req.body;
        const temp = {};
        if(title){temp.title = title;}
        if(description){temp.description = description;}
        if(tag){temp.tag = tag;}


        let note = await Notes.findById(req.params.id);
        //console.log(note);
        if(!note){return res.status(404).send("NOT FOUND");}

        if(note.user.toString() !== req.user.id){
          return res.status(401).send("Not permissable");
        }

        note = await Notes.findByIdAndUpdate(req.params.id,{$set:temp},{new:true});

        //await note.save();
        res.json(note);
      } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  );

  
// ROUTE 4: delete a note - PUT /api/notes/deletenote
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ success: false, error: "Note not found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: "Not authorized" });
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    
    // Return success response with deleted note
    res.json({ success: true, note });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

  
module.exports = router;
