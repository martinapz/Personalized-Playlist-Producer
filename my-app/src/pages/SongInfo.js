import React,{useState, Component} from 'react'
import { Link, renderMatches } from 'react-router-dom'
import ReactSlider from "react-slider";
import axios from 'axios'

import '../App.css'
import createpl from '../images/startPageBackground.jpeg'


class SI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      song: '',
      results: null,
      topArtists: null,
      danceability: null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { song } = this.state

    axios.post("http://localhost:8080/songinfo", {
        song
    }).then(results => {
      this.setState({
        ...this.state,
        results: results.data
      })
    })
  } 

  getTopArtists = (e) => {
    e.preventDefault()

    axios("http://localhost:8080/topArtists").then(results => {
      this.setState({
        ...this.state,
        topArtists: results.data
      })
    })
  }

  danceableArtists = (e) => {
    e.preventDefault()

    axios("http://localhost:8080/danceability").then(results => {
      this.setState({
        ...this.state,
        danceability: results.data
      })
    })
  }

  render() {
    const { results, topArtists, danceability } = this.state

    return (
    <header style={ head }>  
    <h1 className="cp-title text-center">Find Info on Your Favorite Songs</h1>
    <div align="center"><form className= "si-form">
      <div className = "cp-label">
        <label>Search Song Name:
          <input
            type="search"
            name = "song"
            placeholder="Search here"
            onChange={this.handleChange}
            value={this.searchInput}
          />
        </label>
        <br />
            <button id="cp-button" onClick={this.handleSubmit}>Get Song Info</button>
        <br />
        {!!results && (
          results.map((result, i) => {
            if (i < 1) {
              return (
                <div key={i}>
                  <p>artist: {result.artists}</p>
                  <p>danceability: {result.danceability}</p>
                </div>
              )
            }
            return <></>
          })
        )}
        <br />
            <button id="cp-button" onClick={this.getTopArtists}>Get Top Artists</button>
        <br />
        {!!topArtists && (
          topArtists.map((artist, i) => {
            if (i < 2) {
              return (
                <div key={i}>
                  <br />
                  <p>name: {artist.name}</p>
                  <p>streams: {artist['SUM(streams)']}</p>
                </div>
              )
            }
            return <></>
          })
        )}
         <br />
            <button id="cp-button" onClick={this.danceableArtists}>Most Danceable Artists</button>
        <br />
        {!!danceability && (
          danceability.map((result, i) => {
            if (i == 1 || i == 2) {
              return (
                <div key={i}>
                  <br />
                  <p>artist: {result.name}</p>
                  <p>danceability: {result.danceability}</p>
                </div>
              )
            }
            return <></>
          })
        )}
        <br />
        <br />
          <Link to="/create">
            <button className="cp-button" id="cp_btn_fl"><span>Back to Playlist Creation</span></button>
          </Link>  
        </div>
      </form></div>
    </header>
    );
  }
}
const head = {
  width: "100%",
  height: "100vh",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  background: `url(${createpl})`
}

export default SI;