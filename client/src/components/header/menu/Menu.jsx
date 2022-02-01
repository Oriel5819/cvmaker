import React from 'react'
import './menu.css'

export default function Menu(props) {
    return (
        <li className='menu-icon-link'>
            <div className='icon-menu-circle'>
                {props.icon}
            </div>
            <div className='menu-container'>
                <div id='menu-title-itself'>
                    {props.title}
                </div>
                <div id='icon-itself'>
                    {props.arrowicon}
                </div>
            </div>
        </li>
    )
}
