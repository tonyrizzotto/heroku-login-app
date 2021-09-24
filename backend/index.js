const express = require('express');
const connectDB = require('./config/db.js');
const dotenv = require('dotenv');
const userRouter = require('./routes/users');

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
// Initialize User Routes
app.use(userRouter);

// Check Environment Variable
if (process.env.NODE_ENV === 'production') {
  //add the build folder to the application
  app.use(express.static('frontend/build'));
}

// Run App on desired port
app.listen(PORT, () => {
  console.log(`Application is running on Port: ${PORT}`);
});
