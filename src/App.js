import './App.css';
import React, { Component } from 'react';
import Login from './Login';
import Users from './Users';
import Books from './Books';
import Book from './Book';
import User from './User';
import Borrow from './Borrow';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return (userToken != null)
}

function removeToken() {
  sessionStorage.removeItem('token');
}



class App extends Component {



  render() {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Login setToken={setToken} removeToken={removeToken} />} />
            <Route exact path="/users" element={<Users getToken={getToken} />} />
            <Route exact path="/user" element={<User getToken={getToken} />} />
            <Route exact path="/books" element={<Books getToken={getToken} />} />
            <Route exact path="/book" element={<Book getToken={getToken} />} />
            <Route exact path="/borrows" element={<Borrow getToken={getToken} />} />
          </Routes>

        </Router>
      </div>
    );
  }
}

export default App;
