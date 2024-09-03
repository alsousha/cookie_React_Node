const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();


app.use(cookieParser()); // Middleware for parsing cookies
app.use(bodyParser.json()); // for parsing JSON in POST-requests


// Route to set a cookie
app.post('/login', (req, res) => {
  const { firstName, lastName } = req.body;
  const user = { firstName, lastName };
  res.cookie('user', JSON.stringify(user), { httpOnly: true });
  res.send(`Logged in as ${firstName} ${lastName}`);
});

// Route to check session
app.get('/check-auth', (req, res) => {
  if (req.cookies.user) {
    console.log('User data:', req.cookies.user);
    res.send(`User is logged in: ${req.cookies.user}`);
  } else {
    res.send('User is not logged in');
  }
});

// Route to clear a cookie
app.get('/logout', (req, res) => {
  res.clearCookie('user');
  res.send('Logged out');
});

// Start the server
app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});
