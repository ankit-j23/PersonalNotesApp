import './App.css';
import About from './components/About';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import SigningUp from './components/SigningUp';
import NoteState from './Context/Notes/NoteState';
import Alert from './components/Alert';
import Footerc from './components/Footerc';
import Homepage from './components/Homepage';
import React,{useState} from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message , type) => {
    setAlert(
      {
        msg : message,
        type : type
      })

      setTimeout(() =>{
        setAlert(null);
      },1500);
  }

  return (
    <>
    <NoteState>
    <Router>
    <Navbar/>
    <Alert alert={alert}/>
    <div className="container">
      <Routes>
        <Route exact path='/' element={<Home showAlert={showAlert}/>}></Route>
        <Route exact path='/about' element={<About/>}></Route>
        <Route exact path='/login' element={<Login showAlert={showAlert}/>}></Route>
        <Route exact path='/signup' element={<SigningUp showAlert={showAlert}/>}></Route>
        <Route exact path='/homepage' element={<Homepage showAlert={showAlert}/>}></Route>
        
      </Routes>
      </div>
      <Footerc/>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
