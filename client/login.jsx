/* eslint-disable */

import React, { Component} from "react";
import "./style.css";
import {hot} from "react-hot-loader";

class Login extends Component{


  render(){
    return(
      <div className="Login">
        <h1> .catch </h1>
          <button id="signIn">
            <a href="https://github.com/login/oauth/authorize?client_id=427c8387215135ef63b7&redirect_uri=http://localhost:3000/feed">
        Login with GitHub
            </a>
          </button>
      </div>
    );
  }
}

export default hot(module)(Login);