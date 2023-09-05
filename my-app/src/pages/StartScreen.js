import React from 'react'
import { Link } from 'react-router-dom'

import '../App.css'
import startPageBackground from '../images/startPageBackground.jpeg'

export default function StartScreen() {
    return (
        <header style={ head }>
            <h1 className="ss-title text-center">Party Playlist Generator</h1>
            <p className="ss-subtitle text-center">The ultimate party playlist generator</p>
            <div className="buttons text-center">
                <Link to="/login">
                    <button className="ss-button">Log In</button>
                </Link>
                <Link to="/signup">
                    <button className="ss-button" id="reg_btn"><span>New User </span></button>
                </Link>
            </div>
        </header>
    )
}

const head = {
    width: "100%",
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    background: `url(${startPageBackground})`
}