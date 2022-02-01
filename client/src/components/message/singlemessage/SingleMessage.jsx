import React from 'react'
import './singlemessage.css'

export default function SingleMessage(props) {
    return (
        <div className='single-message-card'>
            <div className="single-message-card-avatar">
                <img id='avatar' src={props.avatar} alt="avatar" height={48} width={48}/>
            </div>
            <div className="single-message-card-info">
                <div className="single-message-card-name">
                    <div id='name' className="single-message-card-name">
                        {props.fname} {props.lname}
                    </div>
                    <div id='date' className="single-message-card-date">
                        {props.date ? props.date : null}
                    </div>
                </div>
                <div className="single-message-card-text">
                    {props.text ? props.text : null}
                </div>
            </div>
        </div>
    )
}
