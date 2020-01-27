/* eslint-disable */ 
import React, { Component} from "react";
import "./style.css";
import {hot} from "react-hot-loader";
import FeedProfile from "./feed.jsx";

class App extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      login: '',
      user_id: '',
      avatar_url: '',
      followers: 0,
      name: '',
      public_repos: 0,
      repos_url: '',
      feed: [],
    }
  }

  componentDidMount() {
    const query = window.location.search.substring(1)
    const token = query.split('access_token=')[1]

    // using parsed access_token to fetch user data
    fetch('https://api.github.com/user', {
      headers: {
        Authorization: 'token ' + token,
      }
    })
      .then(res => res.json())
      .then(res => {

        const { login, avatar_url, followers, name, public_repos, repos_url, } = res;

        this.setState({
          login,
          user_id: res.id,
          avatar_url,
          followers,
          name,
          public_repos,
          repos_url,
        })
      })
      .then(() => {
        const userData = {
          login: this.state.login,
          avatar_url: this.state.avatar_url,
          followers: this.state.followers,
          name: this.state.name,
          public_repos: this.state.public_repos,
          repos_url: this.state.repos_url, 
          user_id: this.state.user_id
        }
        fetch('/api/addUser', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json" 
          },
          body: JSON.stringify(userData),
        })
          .then(res => res.json())
          .then(data => {
            console.log('created new user: ', data)
          })
          .catch(err => console.log('addUser POST error: ', err))
      })
      .then(() => {
        const currentUser = {
          login: this.state.login,
          name: this.state.name,
          user_id: this.state.user_id,
        }
        fetch('/api/getAll', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json" 
          },
          body: JSON.stringify(currentUser),
        })
          .then(res => res.json())
          .then(data => {
            return this.setState({
              feed: data,
            })
          })
          .catch(err => console.log('addUser POST error: ', err))
      })
  }

  render(){
    return(
      <div>
        <h1>.catch</h1>
        <div id="yourProfile">
          <div id="profilePhoto">
            <img src={`${this.state.avatar_url}`} ></img>
          </div>
          <div id="profileInfo">
            <h3>Your Profile</h3>
            <p>Name: {this.state.name}</p>
            <p>GitHub Handle: {this.state.login}</p>
            <p>Followers: {this.state.followers}</p>
          </div>
        </div>
        <div id="feed">
          <FeedProfile />
        </div>
      </div>
    )
  }
}


export default hot(module)(App);