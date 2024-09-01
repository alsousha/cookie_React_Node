import logo from './logo.svg';
import './App.css';

function App() {
  const handleLogin = () => {
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      credentials: 'include', // Ensures cookies are sent with the request
    }).then(response => {
      if (response.ok) {
        console.log('Logged in successfully');
      }
    });
  };

  const handleCheckSession = () => {
    fetch('http://localhost:5000/', {
      method: 'GET',
      credentials: 'include', // Ensures cookies are sent with the request
    })
      .then(response => response.text())
      .then(data => console.log('Session data:', data));
  };

  const handleLogout = () => {
    fetch('http://localhost:5000/clear-cookie', {
      method: 'GET',
      credentials: 'include', // Ensures cookies are sent with the request
    }).then(response => {
      if (response.ok) {
        console.log('Cookie cleared');
      }
    });
  };
  return (
    <div className='App'>
      <button onClick={handleLogin}>login</button>
      <button onClick={handleCheckSession}>Check Session</button>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}

export default App;
