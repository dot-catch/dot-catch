import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login.jsx';
import App from './app.jsx';

// console.log(window.location.href)
// console.log(document.cookie);
// const isLoggedIn = document.cookie.includes('isLoggedIn=true');
// if (window.location.href === 'http://localhost:8080/') {
//     ReactDOM.render(<Login />, document.getElementById('root'));
// } else {
//   ReactDOM.render(<App />, document.getElementById('root'));
// };

ReactDOM.render(<App />, document.getElementById('root'));
