import React, { useEffect } from 'react'
import { Link, useLocation , useNavigate} from "react-router-dom";

export default function Navbar() {
    let history = useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        history('/login')
    }
    const location = useLocation();
    useEffect(() => {
        // console.log(location.pathname)
    }, [location])
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
                <div className="container-fluid">
                    <h4 className='mt-1' style={{ marginLeft : '50px'}}>Mynotes</h4>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-3">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/homepage" ? 'active' : ""}`} aria-current="page" to="/homepage">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? 'active' : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {localStorage.getItem('token')===null?<form className='d-flex'>
                            {<Link className="btn btn-outline-dark mx-1" to="/login" role="button">login</Link> }
                            {<Link className="btn btn-outline-dark mx-1" to="/signup" role="button">Signup</Link>}
                        </form>: <button className="btn btn-primary" onClick={handleLogout}>Logout</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
