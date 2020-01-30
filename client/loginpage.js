import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login.jsx';
import App from './app.jsx';

// console.log(window.location.href)
// console.log(document.cookie);
// // if (window.location.href === 'http://localhost:8080/') {
// const isLoggedIn = document.cookie.includes('isLoggedIn=true');
// if (!isLoggedIn) {
//     ReactDOM.render(<Login />, document.getElementById('root'));
// } else {
//   ReactDOM.render(<App />, document.getElementById('root'));
// };

ReactDOM.render(<Login />, document.getElementById('root'));
