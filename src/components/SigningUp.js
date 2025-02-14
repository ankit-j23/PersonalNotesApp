import React, { useState } from 'react'
import {Link, useNavigate } from 'react-router-dom';

const SigningUp = (props) => {
    let history = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        })
        const json = await response.json();
        // console.log(json)

        if (json.success) {
            //Save the token and redirect to the home page
            localStorage.setItem('token', json.authToken);
            history("/");
            props.showAlert("SignUp Completed Successfully", "success")
        }
        else {
            props.showAlert("Sorry , a user with this email already exists", "danger");
        }

    }

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <>
            <h2>Create an account use Mynotes</h2>
            <form onSubmit={handleSubmit} autoComplete=''>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onchange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' value={credentials.cpassword} onChange={onchange} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
            <div>
                <p>Already have an account ? <Link to="/login" role="button">Login</Link></p>
            </div>
        </>
    )
}

export default SigningUp
