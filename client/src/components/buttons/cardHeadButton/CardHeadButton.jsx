import React from 'react'
import './cardheadbutton.css'
import { IoChevronDown } from 'react-icons/io5'

export default function CardHeadButton(props) {
    return (
        <button onClick={props.whenClicked}>
            <div className="message-card-logo-title">
                <div className="message-card-head">
                    <div id='logo-itself'>
                        <img src={props.logo} alt="profile_avatar" height={34} width={34} />
                    </div>
                    <div id='title-itself'>
                        {props.title}
                    </div>
                </div>
                <div className="message-card-add-button add-button">
                    <IoChevronDown/>
                </div>
            </div>
        </button>
    )
}
