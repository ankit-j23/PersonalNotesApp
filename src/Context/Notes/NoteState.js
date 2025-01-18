import React from 'react'
import NoteContext from "./NoteContext";
import { useState } from 'react';

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    //Fetch All Notes
    const GetNotes = async () => {
        //API Call
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await response.json();
        // console.log(json)
        setNotes(json)
    }

    //Add a note
    const addNote = async (title, description, tag) => {
        //TODO : API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body : JSON.stringify({title , description , tag})
        })
        const note = await response.json();
        setNotes(notes.concat(note));
    }
    //Delete a note
    const Deletenote = async(id) => {
        //API Call
        const response = await fetch(`${host}/api/notes/deletenode/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })

        // console.log("Deleting this note with the id:" + id);
        const json = await response.json();
        // console.log(json)

        const newNote = notes.filter((note) => { return note._id !== id });
        setNotes(newNote);
    }
    //Edit a note
    const Editnote = async(id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body : JSON.stringify({title , description , tag})
        })
        const json = await response.json();
        // console.log(json);
        //logic for updating the note
        let newNotes = JSON.parse(JSON.stringify(notes));

        for(let index = 0 ; index<newNotes.length ; index++){
            const element = newNotes[index];
            if(element._id === id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
            
        }
        setNotes(newNotes);

    }
    return (
        <NoteContext.Provider value={{ notes, addNote, Deletenote, Editnote, GetNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;