import logo from './logo.svg';
import React, {Component} from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LoginPage from './pages/LoginScreen';
import StartScreen from './pages/StartScreen';
import Signup from './pages/SignUp';
import CreatePlaylist from './pages/CreatePlaylist';
import ThePlaylist from './pages/ThePlaylist';
import Friendslist from './pages/FriendsList';
import SongInfo from './pages/SongInfo';

import './App.css';

class App extends Component {  
  render() {  
    return (  
       <Router>  
           <div className="App">  
           <Routes>  
                 <Route exact path='/' element={< StartScreen />}></Route>  
                 <Route exact path='/login' element={< LoginPage />}></Route>  
                 <Route exact path='/signup' element={< Signup />}></Route> 
                 <Route exact path='/create' element={< CreatePlaylist />}></Route>
                 <Route exact path='/newplaylist' element={< ThePlaylist />}></Route>
                 <Route exact path='/friendslist' element={< Friendslist />}></Route>
                 <Route exact path='/songinfo' element={< SongInfo />}></Route>
          </Routes>  
          </div>  
       </Router>  
   );  
  }  
}  
export default App;