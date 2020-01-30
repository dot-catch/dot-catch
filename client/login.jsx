/* eslint-disable */

import React, { Component } from "react";
import "./style.css";
import { hot } from "react-hot-loader";

class Login extends Component {
  render() {
    return (
      // div to render login page
      <div>
        <div className="Login">
          <h1> .catch </h1>
          <button id="signIn">
            <a href="https://github.com/login/oauth/authorize?client_id=6c6c4f2975f185760b3e&redirect_uri=http://3.83.113.15:3000//feed">
              Login with GitHub
            </a>
          </button>
        </div>
      </div>
    );
  }
}

export default hot(module)(Login);
