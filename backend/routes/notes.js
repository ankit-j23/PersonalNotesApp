const express = require('express')
const router = express.Router();
const fetchUser = require('../middleware/fetchUser')
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//Route 1 : fetch all notes of a user using GET "./api/notes/fetchnotes" login required 
router.get('/fetchnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})

//Route 2: add notes for an user using POST "./api/notes/addnote" login required 
router.post('/addnote', fetchUser, [
    body('title', 'Please enter a valid title').isLength({ min: 3 }),
    body('description', 'Your description shoud be atleast 5 charachers long').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // if there is an error then returning a bad request and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const notes = new Notes({
            title, description, tag, user: req.user.id
        })

        const saveNote = await notes.save();
        res.json(saveNote);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})
//Route 3: update notes of an user using PUT "./api/notes/updatenode" login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const {title , description , tag } = req.body;
    try {
        //newNote
        const newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}

        //finding the note to be updated
        let note = await Notes.findById(req.params.id);
        //if the note doesn't exist
        if(!note){
            return res.status(404).send("Not found")
        }

        //checking if the right user is there for updating the notes
        if((note.user.toString()) !== (req.user.id)){
            return res.send(404).send("Not Allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id , {$set : newNote} , {new : true});
        res.json({note})

        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})
//Route 4: delete  notes of an user using DELETE "./api/notes/deletenote" login required
router.delete('/deletenode/:id', fetchUser, async (req, res) => {
    const {title , description , tag } = req.body;
    try {

        //finding the note to be deleted
        let note = await Notes.findById(req.params.id);
        //if the note doesn't exist
        if(!note){
            return res.status(404).send("Not found")
        }

        //checking if the right user is there for deleting the notes
        if((note.user.toString()) !== (req.user.id)){
            return res.send(404).send("Not Allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success" : "Note has been deleted"})

        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})
module.exports = router