const express = require('express');
const connectDB = require('./config/db.js');
const dotenv = require('dotenv');
const userRouter = require('./routes/users');
const path = require('path');

// Imports needed to create a session and save to the DB
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Configure Environment Variables
dotenv.config({ path: './backend/config/config.env' });

// Initialize an app
const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB
connectDB();

// Create a build variable
//const buildPath = path.normalize(path.join(__dirname, '../frontend/build'));

// Create a session when the API first receives a request. Will follow the user till expiration.
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: {
      httpOnly: false,
      // length of time is in Milliseconds: 300000 = 5 minutes
      maxAge: parseInt(process.env.SESSION_MAX_AGE),
    },
  })
);

// Check Environment Variable
if (process.env.NODE_ENV === 'production') {
  //add the build folder to the application
  app.use(express.static('frontend/build'));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build'));
  });

  app.get('/dashboard', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../frontend', 'build', 'index.html')
    );
  });
}

// Initialize User Routes
app.use(userRouter);

// Catch all for bad routes
app.use((req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('Page not found.');
});

// Run App on desired port
app.listen(PORT, () => {
  console.log(`Application is running on Port: ${PORT}`);
});
