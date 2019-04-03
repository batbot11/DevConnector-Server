import React from "react";
import { Route} from "react-router-dom";
import GuestRoute from "./utils/GuestRoute";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";


const App = ({location}) => (
    
            <div className="App" >
                <Navbar/>
                <Route path = "/" location = {location} exact component = {Landing} />
                <div className="container">
                <GuestRoute path="/login" location = {location} exact component = {Login} />
                <GuestRoute path="/register" location = {location} exact component = {Register} />
                </div>
                <Footer/>
            </div>
)

export default App;