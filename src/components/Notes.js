import React, { useContext, useEffect, useRef, useState} from 'react'
import NoteContext from '../Context/Notes/NoteContext'
import NotesComponent from './NotesComponent';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';


export default function Notes(props) {
  let history = useNavigate();
  const {showAlert} = props;
  const context = useContext(NoteContext);
  const { notes, GetNotes, Editnote } = context;
  useEffect(() => {
    if((localStorage.getItem('token'))!==null){
      GetNotes()
    }
    else{
      history('/homepage')
    }
    
    //eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const refclose = useRef(null)
  const[note , setNote] = useState({id:"",etitle:"",edescription:"",etag:""});


  const updatenote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle: currentNote.title , edescription: currentNote.description, etag: currentNote.tag});
  }


  const handleClick = (e) => {
    // console.log("Updating this note here...",note)
    Editnote(note.id , note.etitle, note.edescription, note.etag);
    refclose.current.click();
    props.showAlert("Note Updated Successfully", "success")
  }

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }





  return (
    <>
      <Addnote showAlert={showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='mx-5'>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onchange} minLength={3} required/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.lenght<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mx-4" >
        <h1 className='my-2'>Your Notes</h1>
        <div className="container mx-2">
        {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <NotesComponent key={note._id} showAlert={showAlert} updatenote={updatenote} note={note} />;
        })}
      </div>
    </>
  )
}
