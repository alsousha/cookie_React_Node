const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware for parsing cookies
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true,
  }),
);

// Middleware for handling JSON request bodies
app.use(express.json());

// Session middleware configuration
app.use(
  session({
    secret: 'your_secret_key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true, // Helps prevent XSS attacks
      maxAge: 3600000, // Cookie expiration time in milliseconds (1 hour)
    },
  }),
);

// Route to set a session user
app.post('/api/login', (req, res) => {
  req.session.user = 'test'; // Set session user
  res.send('User logged in');
});

// Route to check session
app.get('/', (req, res) => {
  if (req.session.user) {
    return res.send(`Logged in as ${req.session.user}`);
  } else {
    res.status(404).send('No user session found');
  }
});

// Route to set a cookie
app.get('/set-cookie', (req, res) => {
  res.cookie('myCookie', 'cookieValue', {
    maxAge: 900000, // 15 minutes
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: false, // Set to true if using HTTPS
  });
  res.send('Cookie has been set');
});

// Route to clear a cookie
app.get('/clear-cookie', (req, res) => {
  req.session.user = null;
  res.clearCookie('myCookie');
  res.send('Cookie has been cleared');
});

// Start the server
app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});
