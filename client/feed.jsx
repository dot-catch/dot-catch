/* eslint-disable */ 
import React, { Component} from "react";
import {hot} from "react-hot-loader";

const FeedProfile = (props) => {

  return (
    <div className='matchUser'>
    {/* div for each matched user's picture */}
    <div className='userProfile'>
    <img className='matchPic' src={props.userInfo.avatar_url} alt="your next developer date"></img>
    </div>

    {/* div for each matched user's information */}
    <div className='matchInfo'>
    <p>Name: {props.userInfo.name}</p>
       <p>Github Handle: {props.userInfo.login}</p>
       <p>Followers: {props.userInfo.followers}</p>
       <p>Public Repos: {props.userInfo.public_repos}</p>
    </div>
    
    {/* div for buttons on the matched user's */}
    <div className='matchButton'>
       <button className="repos"><a href={props.userInfo.repos_url}>View Repos</a></button>
       <button className="match">Match Me</button>
    </div>
  </div>
  )
}

export default hot(module)(FeedProfile);