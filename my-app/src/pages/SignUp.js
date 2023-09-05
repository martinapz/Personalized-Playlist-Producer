import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import '../App.css'
import startPageBackground from '../images/startPageBackground.jpeg'

class Signup extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            first_name: "",
            password: ""
        }
    }
    
    handleChange = (e) => {
        const { name, value } = e.currentTarget
        this.setState({
            ...this.state,
            [name]: value
        });
    }

    handleSubmit = (e) => {
        const { first_name, password } = this.state

        axios.post("http://localhost:8080/signup", {
            first_name,
            password
        })
    }
    
    render() {
        return (
            <header style={ head }>
            <div className="text-center m-5-auto">
            <h1 className="login-title text-center">Sign Up</h1>
                <form action="/signup">
                    <p>
                        <label>Username</label><br/>
                        <input type="text" name="first_name" onChange={this.handleChange} value={this.state.first_name} required />
                    </p>
                    <p>
                        <label>Password</label>
                        <br/>
                        <input type="password" name="password" onChange={this.handleChange} value={this.state.password} required />
                    </p>
                    <p>
                    <Link to="/create">
                        <button id="login-button" onClick={this.handleSubmit} type="submit">Sign Up</button>
                    </Link>
                    </p>
                </form>
            </div>
            </header>
        )
    }
}

export default Signup

const head = {
    width: "100%",
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    background: `url(${startPageBackground})`
}