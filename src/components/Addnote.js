import React, { useContext, useState } from 'react'
import NoteContext from '../Context/Notes/NoteContext'

export default function Addnote(props) {

    const context = useContext(NoteContext);
    const {addNote} = context;
    const[note , setNote] = useState({title:" ",description:" ",tag:" "})

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title , note.description , note.tag)
        props.showAlert("Note Added", "success")
        setNote({title:"",description:"",tag:""})
    }
    const onChange = (e) => {
        setNote({...note , [e.target.name]: e.target.value});
    }
    return (
        <>
            <h1 className='mx-5 my-2'>Add a Note</h1>
            <form className='mx-5'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="Description" name='description' value={note.description} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} minLength={3} required/>
                </div>

                <button disabled={note.title.lenght<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </>
    )
}
