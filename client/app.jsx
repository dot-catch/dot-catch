/* eslint-disable */ 
import React, { useState, useEffect } from "react";
//test
//import {hot} from "react-hot-loader";
import FeedProfile from "./feed.jsx";

function App () {
    const [login, setLogin] = useState('');
    const [user_id, setUser_id] = useState('');
    const [avatar_url, setAvatar_url] = useState('');
    const [followers, setFollowers] = useState(0);
    const [name, setName] = useState('');
    const [public_repos, setPublic_repos] = useState(0);
    const [repos_url, setRepos_url] = useState('');
    const [feed, setFeed] = useState('');

    useEffect(() => {
        fetch('/info')
      .then(res => res.json())
      .then(data => {
        console.log('data!', data);
        if (data.msg === 'invalid session') {
          window.location.pathname = '/loginPage'
        }
        const { login, avatar_url, followers, name, public_repos, repos_url, } = data.userGithubProfile;
        setLogin(login);
        setAvatar_url(avatar_url);
        setFollowers(followers);
        setName(name);
        setPublic_repos(public_repos);
        setRepos_url(repos_url)
    }).catch((err) => {
        console.log(err);
      }), []});

      function getAll () {
        fetch('/info')
          .then(res => res.json())
          .then(data => {
          setFeed(data.allProfiles)
          })
          .catch((err) => {
            console.log(err);
          })
          
      };

      const feedArr = [];
    for (let i = 0; i < feed.length; i+=1) {
      feedArr.push(<FeedProfile userInfo={feed[i]} key={`userProfile-${i}`} />)
    }
    return(
        <div>
          <div id="header">
            <h1>.catch</h1>
            <p>Promises not resolved? Let us fix that.</p>
          </div>
          {/* div for current user's profile picture */}
          <div id="profileDiv">
          <img src={`${avatar_url}`}  id="pic"></img>
          </div>
  
          {/* div for current user's information */}
          <div id="profileInfo">
              <div>
              <p>{name}</p>
              <p>GitHub Handle: {login}</p>
              <p>Followers: {followers}</p>
              
              {/* div for the buttons */}
              </div>
              <div id='buttonDiv'>
              <button onClick={getAll}>Get All</button>
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

export default App;