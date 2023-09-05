import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import '../App.css'
import startPageBackground from '../images/startPageBackground.jpeg'

class LoginPage extends React.Component{
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

        axios.post("http://localhost:8080/login", {
            first_name,
            password
        })
    }


    render(){
        return (
            <header style={ head }>
            <div className="text-center m-5-auto">
            <h1 className="login-title text-center">Log In</h1>
                <form action="/home">
                    <p>
                        <label>Username</label><br/>
                        <input type="text" name="first_name" onChange={this.handleChange} required />
                    </p>
                    <p>
                        <label>Password</label>
                        <br/>
                        <input type="password" name="password" onChange={this.handleChange} required />
                    </p>
                    <p>
                    <Link to="/create">
                        <button className="login-button-2" onClick={this.handleSubmit} type="submit" id="reg_btn"> <span>Log In </span></button>
                    </Link>
                    </p>
                </form>
            </div>
            </header>
        )}
}

export default LoginPage

// export default function LoginPage() {
//     return (
//         <header style={ head }>
//         <div className="text-center m-5-auto">
//         <h1 className="login-title text-center">Log In</h1>
//             <form action="/home">
//                 <p>
//                     <label>Username</label><br/>
//                     <input type="text" name="first_name" required />
//                 </p>
//                 <p>
//                     <label>Password</label>
//                     <br/>
//                     <input type="password" name="password" required />
//                 </p>
//                 <p>
//                 <Link to="/create">
//                     <button className="login-button-2" id="reg_btn"><span>Log In </span></button>
//                 </Link>
//                 </p>
//             </form>
//         </div>
//         </header>
//     )
// }

const head = {
    width: "100%",
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    background: `url(${startPageBackground})`
}