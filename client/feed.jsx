/* eslint-disable */ 
import React, { Component} from "react";
import "./style.css";
import {hot} from "react-hot-loader";

const FeedProfile = (props) => {

  return (
    <div className="feedProfile">
      <div className="profilePhoto">
        <img src={props.userInfo.avatar_url} alt="your next developer date"></img>
      </div>
      <div className="profileInfo">
        <p>Name: {props.userInfo.name}</p>
        <p>Github Handle: {props.userInfo.login}</p>
        <p>Followers: {props.userInfo.followers}</p>
        <p>Public Repos: {props.userInfo.public_repos}</p>
        <button className="repos"><a href={props.userInfo.repos_url}>View Repos</a></button>
        <button className="match">Match Me</button>
      </div>
    </div>
  )
}

export default hot(module)(FeedProfile);