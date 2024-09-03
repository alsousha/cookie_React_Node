import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'firstName') {
      setFirstName(value);
    } else if (name === 'lastName') {
      setLastName(value);
    }
  };

  const handleLogin = () => {
    axios.post('/login', { firstName, lastName })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Login failed:', error);
      });
  };

  const handleCheckAuth = () => {
    axios.get('/check-auth')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Check auth failed:', error);
      });
  };

  const handleLogout = () => {
    axios.get('/logout')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <div>
      <form>
        <input
          name="firstName"
          value={firstName}
          onChange={handleInputChange}
          placeholder="First Name"
        />
        <input
          name="lastName"
          value={lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleCheckAuth}>Check if Logged In</button>
        <button onClick={handleLogout}>Logout</button>
      </form>
      
    </div>
  );
}

export default App;
