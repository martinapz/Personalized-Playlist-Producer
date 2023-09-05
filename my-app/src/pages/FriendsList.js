import axios from 'axios';
import React,{useState, Component} from 'react'
import { Link, renderMatches } from 'react-router-dom'
import ReactSlider from "react-slider";

import '../App.css'
import createpl from '../images/rec.jpeg'

class friendsL extends Component {
  constructor(props) {
    super(props);
    this.state = {
        friends: [],
        friend_name: '',
        first_name: '',
        phone_number: ''
    };
  }

//   componentDidMount() {
//     axios("http://localhost:8080/getFriends").then(results => {
//         console.log(results)
//     })
//   }

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  onAddFriend = () => {
    const { first_name, phone_number } = this.state
    axios.post("http://localhost:8080/addFriend", {
        first_name,
        phone_number
    })
  }

  onDeleteFriend = () => {
    const {first_name} = this.state
    axios.post("http://localhost:8080/deleteFriend", {
        first_name
    })
  }

  onUpdatePhoneNumberFriend = () => {
    const {phone_number, first_name} = this.state
    axios.post("http://localhost:8080/updatePhoneNumber", {
        phone_number,
        first_name
    })
  }

  render() {
    return (
    <header style={ head }>  
    <h1 className="cp-title text-center">Edit Friends List</h1>
    <div align="center"><form className= "cp-form">
      <div className = "cp-label">
        <p>
            <label>Friend Name</label>
                <br/>
                    <input type="text" name="first_name" onChange={this.handleChange} required />
                </p>
        <br />
        <br />
            <button className="cp-button" id="cp_btn_newpl" onClick={this.onDeleteFriend} ><span>Delete Friend</span></button>
         
        <br />
        <p>
            <label>Friend Phone Number</label>
                <br/>
                    <input type="text" name="phone_number" onChange={this.handleChange} />
                </p>
        <br />
          
          <button className="cp-button" id="cp_btn_fl" onClick={this.onUpdatePhoneNumberFriend}><span>Update Phone Number</span></button>
        
        <br />
        <br />
          
            <button className="cp-button" id="cp_btn_fl" onClick={this.onAddFriend}><span>Add Friend</span></button>
          
        <br />
          <Link to="/create">
            <button className="cp-button" id="cp_btn_fl" ><span>Back to Playlist Creation</span></button>
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

export default friendsL;
