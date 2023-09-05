import React, {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import ReactSlider from "react-slider";

import '../App.css'
import createpl from '../images/startPageBackground.jpeg'

const thePL = () => {
  const { state: { playlist, duration } } = useLocation()

  const handleChange = (e) => {

  }

  return (
    <header style={ head }>  
    <h1 className="cp-title text-center">Your New Playlist :)</h1>
    <div align="center"><form className= "cp-form">
      <div className = "cp-label">
        {!!playlist && (
          <>
          {playlist.map((song, i) => {
            const numDuration = parseInt(duration)
            let numSongs = numDuration * 19

            if (i < numSongs) {
              return (
                <div key={i}>
                  <p style={{ fontSize: "12px" }}>{song.name}</p>
                </div>
              )
            }
          })}
          </>
        )}
        <br />
          <Link to="/create">
            <button className="cp-button" id="cp_btn_fl"><span>Make a New Playlist</span></button>
          </Link>       
        </div>
      </form></div>
    </header>
    );
}

const head = {
  width: "100%",
  height: "100vh",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  background: `url(${createpl})`
}

export default thePL;
