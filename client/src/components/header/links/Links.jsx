import React from 'react'
import './links.css'
import {Link} from 'react-router-dom'

export default function Links(props) {
    return (
        <li>
            <Link to={props.target}>
                <div className='link-icon-container'> {props.icon} </div>
                <div className='link-title-container'> {props.title} </div>
            </Link>
        </li>
    )
}
