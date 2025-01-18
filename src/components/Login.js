import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'


const Login = (props) => {
    
    let history = useNavigate();
    const[credentials , setCredentials] = useState({email :"", password:""});
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/userlogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({email: credentials.email , password: credentials.password})
        })
        const json = await response.json();
        console.log(json)

        if(json.success){
            //Save the token and redirect to the home page
            localStorage.setItem('token' , json.authToken);
            history("/");
            props.showAlert("Logged in Successfully", "success")
        }
        else{
            props.showAlert("Invalid Credentials", "danger");
        }

    }

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      }
    return (
        <div>
            <h2 className='my-2 mb-2'>Login to continue to Mynotes</h2>
            <form onSubmit={handleSubmit} autoComplete=''>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onchange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onchange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <div>
                <p>Don't have an account ? <Link to="/signup" role="button">SignUp</Link></p>
            </div>
        </div>
    )
}

export default Login
