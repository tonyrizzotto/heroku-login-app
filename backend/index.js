const express = require('express');
const connectDB = require('./config/db.js');
const dotenv = require('dotenv');
const userRouter = require('./routes/users');

// Configure Environment Variables
dotenv.config({ path: './backend/config/config.env' });

// Initialize an app
const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB
connectDB();

// Initialize User Route
app.use(userRouter);

// Run App on desired port
app.listen(PORT, () => {
  console.log(`Application is running on Port: ${PORT}`);
});
