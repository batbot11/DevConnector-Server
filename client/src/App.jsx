import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";


class App extends React.Component {
    
    render () {
        return (
            <BrowserRouter >
            <div className="App" >
                <Navbar/>
                <Route path = "/" exact component = {Landing} />
                <div className="container">
                <Route path="/login" exact component = {Login} />
                <Route path="/register" exact component = {Register} />
                </div>
                <Footer/>
            </div>
            </BrowserRouter>
        )
    }
}

export default App;