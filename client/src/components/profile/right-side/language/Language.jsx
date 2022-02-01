import React from 'react'
import Minilink from '../minlink/Minilink'
import './language.css'
import { HiOutlineGlobeAlt } from 'react-icons/hi'
import { IoMdHelpCircle } from 'react-icons/io'
import Button from '../button/Button'

export default function Language() {
    return (
        <div className='right-side-card language-card'>
            <div className="button-wrap">
                <ul>
                    <li className='selected'><Button title="English" /></li>
                    <li><Button title="French" /></li>
                    <li><Button title="Malagasy" /></li>
                    <li><Minilink icon={<HiOutlineGlobeAlt />}/></li>
                </ul>
            </div>
            <div className="url-wrap">
                <ul>
                    <li><a href="/">Edit public profile & URL</a></li>
                    <li><Minilink icon={<IoMdHelpCircle/>} /></li>
                </ul>
            </div>
        </div>
    )
}
