import React from 'react'

export default function Alert(props) {
    const Capitalize = (word) => {
        if(word ==="danger"){
            word = "Error";
        }
        let txt = word.toLowerCase();
        let txt2 = txt.charAt(0).toUpperCase();
        return txt2 + word.slice(1)
        
    }
    return (
        <div style={{height:'50px'}}>
        {
            props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            <strong>{Capitalize(props.alert.type)}</strong> : {props.alert.msg} </div>
        }
        </div>
    )
}
