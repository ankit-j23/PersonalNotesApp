import React, { useContext } from 'react'
import NoteContext from '../Context/Notes/NoteContext'

const NotesComponent = (props) => {

    const context = useContext(NoteContext);
    const {Deletenote} = context;
    const {note , updatenote} = props;
    return (

            <div className="col-md-3">
                <div className="card my-3">
                    {/* <img src="..." className="card-img-top" alt="..."/> */}
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <h5 className="card-title">{note.title}</h5>
                            <i className="fa-solid fa-trash mx-3" style={{ color: '#808080' }} onClick={() => { Deletenote(note._id);props.showAlert("Note Deleted Successfully", "success") }}></i>
                            <i className="fa-regular fa-pen-to-square fa-lg" style={{ color: '#808080' }} onClick={()=>updatenote(note)}></i>
                        </div>
                        <p className="card-text">{note.description}</p>
                        {/* <Link to="/" class="btn btn-primary">Go somewhere</Link> */}
                    </div>
                </div>
            </div>
    )
}

export default NotesComponent

