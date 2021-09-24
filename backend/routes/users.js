const express = require('express');
const router = new express.Router(); // creates a new router
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user');
const verifyAuth = require('../middleware/verifyAuth');
const bcrypt = require('bcryptjs');

// set up a new Google client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// convert request body to JSON
router.use(express.json());

// User Endpoint - GET /api/user
router.get('/api/user', verifyAuth, async (req, res) => {
  const { user } = req.session;
  res.status(200).send({ user });
});

// Create User Endpoint   POST /api/user
router.post('/api/user', async (req, res) => {
  const data = req.body;
  //hash password
  data.password = await bcrypt.hash(data.password, 8);
  // create a new user to insert
  const user = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
  });

  try {
    // await user.save();
    //attach to session
    req.session.user = user;
    res.status(201).send({ created: true });
  } catch (error) {
    res.status(400).send();
  }
});

// Google JWT Verification   POST
router.post('/api/v1/auth/google', async (req, res) => {
  // get the JWT from the request
  const { token } = req.body;

  // verify the Google JWT is valid
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  // save data in a variable
  const payload = ticket.getPayload();

  // create a new user to insert
  const user = new User({
    firstName: payload.given_name,
    lastName: payload.family_name,
    email: payload.email,
    imageUrl: payload.picture,
  });

  try {
    //try to insert a user to the DB
    //await user.save();

    //if successful, attach to an active session
    req.session.user = user;

    // send status back to the client
    res.status(201).send({ created: true });
  } catch (error) {
    // send an error
    res.status(400).send(error);
  }
});

// Logout Endpoint  POST
router.get('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.status(200).send({ status: true });
  });
});

// export router for use
module.exports = router;
