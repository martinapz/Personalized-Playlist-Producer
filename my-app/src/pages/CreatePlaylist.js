import axios from 'axios';
import React,{ Component, useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ReactSlider from "react-slider";

import '../App.css'
import createpl from '../images/rec.jpeg'

const createPlaylist = () => {
  const [form, setForm] = useState({
    duration: "1",
    vibe: "vchill",
    eventType: "christmas"
  })
  const [playlist, setPlaylist] = useState(null)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const {duration, vibe, eventType} = form
    axios.post("http://localhost:8080/getSongPlaylist", {
      duration,
      vibe,
      eventType
    }).then(results => {
      setPlaylist(results.data[0])
    });
  }

  useEffect(() => {
    if (!!playlist) {
      navigate("/newplaylist", { state: {
        playlist,
        duration: form.duration
      } })
    }
  }, [playlist])

  return (
    <>
    <header style={ head }>  
    <h1 className="cp-title text-center">Create Your Playlist</h1>
    <div align="center"><form className= "cp-form">
      <div className = "cp-label">
        <label>
          Party Duration:
          <select name="duration" value={form.duration} onChange={handleChange}>
            <option value="1">1 Hour</option>
            <option value="2">2 Hours</option>
            <option value="3">3 Hours</option>
            <option value="4">4 Hours</option>
            <option value="5">5 Hours</option>
          </select>
        </label>
        <br />
        <label>
          Vibe:
          <select name="vibe" value={form.vibe} onChange={handleChange}>
            <option value="vchill">Ultra-Chill</option>
            <option value="chill">Chill</option>
            <option value="r">Regular</option>
            <option value="hype">Hype</option>
            <option value="uhype">Ultra-Hype</option>
          </select>
        </label>
        <br />
        <label>
          Event Type:
          <select name="eventType" value={form.eventType} onChange={handleChange}>
            <option value="christmas">Christmas Party</option>
            <option value="vday">Valentines Day Party</option>
            <option value="bday">Birthday Party</option>
            <option value="spookyszn">Halloween Party</option>
            <option value="karaoke">Karaoke night</option>
            <option value="pregame">Pregame</option>
            <option value="pool">Pool Party</option>
            <option value="kickback">Kickback</option>
          </select>
        </label>
        <br />
          <Link to="/newplaylist">
            <button className="cp-button" id="cp_btn_newpl" onClick={handleSubmit}>
              <span>Create Playlist</span>
            </button>
          </Link>
        <br />  
          <Link to="/friendslist">
            <button className="cp-button" id="cp_btn_fl"><span>Edit Friends List</span></button>
          </Link>
        <br />  
          <Link to="/songinfo">
            <button className="cp-button" id="cp_btn_si"><span>Find Song Information</span></button>
          </Link>
        </div>
      </form></div>
    </header>
    </>
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

export default createPlaylist;
