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
    this.getAll = this.getAll.bind(this)
  }
  getAll() {
    fetch('/info')
      .then(res => res.json())
      .then(data => {
      this.setState({feed : data.allProfiles})
      })
      .catch((err) => {
        console.log(err);
      })
      
  }
  componentDidMount() {
    console.log('app mounted');
    // both constants used to grab GitHub access token from search window in browser
    // const query = window.location.search.substring(1)
    // const token = query.split('access_token=')[1]
    fetch('/info')
      .then(res => res.json())
      .then(data => {
        console.log('data!', data);
        if (data.msg === 'invalid session') {
          window.location.pathname = '/loginPage'
        }
        const { login, avatar_url, followers, name, public_repos, repos_url, } = data.userGithubProfile;
        this.setState({
          login,
          avatar_url,
          followers,
          name,
          public_repos,
          repos_url,
      })
      })
      .catch((err) => {
        console.log(err);
      })
      
  }

  render(){
    // loops through profiles and adds them as components to an array
    const feedArr = [];
    for (let i = 0; i < this.state.feed.length; i+=1) {
      feedArr.push(<FeedProfile userInfo={this.state.feed[i]} key={`userProfile-${i}`} />)
    }

    return(
      <div>
        <div id="header">
          <h1>.catch</h1>
          <p>Promises not resolved? Let us fix that.</p>
        </div>
        {/* div for current user's profile picture */}
        <div id="profileDiv">
        <img src={`${this.state.avatar_url}`}  id="pic"></img>
        </div>

        {/* div for current user's information */}
        <div id="profileInfo">
            <div>
            <p>{this.state.name}</p>
            <p>GitHub Handle: {this.state.login}</p>
            <p>Followers: {this.state.followers}</p>
            
            {/* div for the buttons */}
            </div>
            <div id='buttonDiv'>
            <button onClick={() =>{
             this.getAll()
            }}>Get All</button>
            <button>Filter</button>
            </div>
        </div>
            <hr></hr>
          <div id="feed">
            {feedArr}
          </div>
        
      </div>
    )
  }
}


export default hot(module)(App);