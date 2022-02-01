import React from 'react'
import './cardfooterbutton.css'

export default function Cardfooterbutton(props) {
    return (
        <div className='card-footer-button'>
            <button onClick={props.whenClicked}>{props.title}</button>
        </div>
    )
}
