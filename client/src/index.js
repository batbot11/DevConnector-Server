import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {BrowserRouter, Route} from "react-router-dom";
import jwt_decode from "jwt-decode";
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import authReducer from "./components/reducers/authReducer";
import setAuthToken from "./utils/setAuthToken";
import {userLoggedIn} from "./components/actions/authActions";

const rootReducer  = combineReducers({auth: authReducer})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// Set to current user on reload
if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(userLoggedIn(decoded))
}

ReactDOM.render(
<Provider store = {store} >
<BrowserRouter >
<Route component = {App} />
</BrowserRouter>
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
