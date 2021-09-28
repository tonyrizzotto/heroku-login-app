# Fullstack MERN Login App

## [Deployed on Heroku](https://morning-temple-84192.herokuapp.com/)

### Overview

The project is a robust Login system created to show proper use of Google OAuth2.0 as well as session management. This project utilizes the MERN technology stack, which includes:

MongoDB, ExpressJS, ReactJS and NodeJS

The active session of this system is set to 5 minutes before deletion, or on request to logout. In both situations, all submitted information is completely wiped.

### How the application works

There are two ways a user can utilize the application 1) Google Authentication and 2) Input User Credentials.

#### Google OAuth 2.0

When accessing the project through Google OAuth, an active JWT token is requested from the frontend of the application. If successfully received, the token is sent back to the API where it is then validated for Authenticity through the [Google Auth Library](https://www.npmjs.com/package/google-auth-library).

A validated token produces a payload of information from Google, which includes everything in the requested scope. For this project, we are only requesting first-name, last-name and an email address. This information is then used to construct a valid insert to the Mongo Database, however, that step was left commented out to avoid saving any information past the session length.

Once created, a user can access the `/dashboard` route for up to 5 minutes before their session is destroy and they will have to re-sign up to get access. In a proper production application, this session would be maintained through user actions, with a longer default length.

#### User Input Credentials

If a user decides to input their own credentials, passwords are encrypted through [bcryptJS](https://www.npmjs.com/package/bcryptjs) and stored as a hash. Once accepted, the user is attached to the session.

### Running Locally

It is possible to run this program locally, however, does require some specific setup of environment variables.

Start by cloning this repository into your project directory:

```
git clone https://github.com/tonyrizzotto/heroku-login-app.git
```

Once cloned you must install all dependencies on both the frontend AND backend.

In the root directly of the project, run:

```
npm install
```

Once complete, change directories to the frontend to install the necessary dependencies:

```
cd frontend && npm install
```

At this point, you will need to set some environment variables. While in the `frontend` directory create a file called `.env` with:

```
touch .env
```

In this file you'll need to declare one variable called:

```
REACT_APP_GOOGLE_CLIENT_ID=
```

This should be populated with a valid clientId given through the [Google Developers Console](https://console.cloud.google.com/)

Once you've stored your variable, you move to the backend folder and create a new `config.env` file for the API.

```
cd ../backend/config && touch config.env
```

In this file, we'll need to establish a few variables:

```
PORT=5000
MONGO_URI=
GOOGLE_CLIENT_ID=
SESSION_SECRET=
SESSION_MAX_AGE= 300000
```

The `MONGO_URI` should be populated with a valid MongoDB server connection. This project utilized the free tier of [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for it's online storage

The `GOOGLE_CLIENT_ID` should be equal to the previous string from the `.env` file in the frontend.

The `SESSION_SECRET` is a string of indeterminate length that should be unique to you.

The `SESSION_MAX_AGE` is set to 300000ms, which is 5 minutes. You can change this to any desired value, as long as it's in milliseconds(MS).

#### Start the project

Once you have input all of your variables, you are now ready to start this project in development mode.

From the root folder start your API with:

```
npm run dev
```

Open a new terminal window, move to the frontend folder and run:

```
npm start
```

At this point, you will be able to view the project on your local development server: `http://localhost:3000`

### Running In Production (Pre-Deployment)

Before deploying a project to any hosting site, it is important to test your production environment. To do this, you must compile the React App and set your server to production.

Shut down any running processes and navigate to the frontend folder:

```
npm run build
```

This will compile the frontend into a build folder.

Navigate over to your `backend/config/config.env` file and add two new environment variables:

```
NODE_ENV=production
REACT_APP_GOOGLE_CLIENT_ID={valid ID}
```

The React App doesn't check the backend API for it's environment variables while in development, but in production everything is running on the same PORT and the `index.html` page will be served through the backend API. This means it will have access to any environment variables declared in the backend. Since the app needs a valid ID, we must re-declare the variable there, otherwise, we have to constantly change the variable names.

At this point you can run in production through your root folder:

```
npm run dev
```

The project will now be running at `http://localhost:5000`

Enjoy!
