import React from 'react'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
    let history = useNavigate();
    const handleClick = ()=>{
        history('/login')
    }
  return (
    <div className='d-flex justify-content-center containerp'>
      <h1>WELCOME TO&nbsp;<div><p style={{display:'inline'}}>hii</p></div></h1>
    </div>
  )
}

export default Homepage
