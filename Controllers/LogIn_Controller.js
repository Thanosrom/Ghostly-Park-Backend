/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
//Routes
const router = express.Router();
//Models
const LogIn_Model = require('../Models/LogIn_Model');
//Libs
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
const { body, validationResult } = require('express-validator');
//Tokens
const jwt = require('jsonwebtoken');
//Controllers
const Register_Controller = require('./Register_Controller');
const { createDbConnection } = require('../Models/common');
//Validators
const utils_Controller = require('./utils_Controller');

//Keys
//For Apple Auth
// const clientId = 'YOUR_APPLE_CLIENT_ID';
// const teamId = 'YOUR_TEAM_ID';
// const keyId = 'YOUR_KEY_ID';
// const privateKeyPath = 'path/to/your/private-key.p8';
// const auth = new appleAuth.Auth(
//   clientId,
//   teamId,
//   keyId,
//   privateKeyPath,
//   'text'
// );

const logIn_Controller = {
  async login(req, res) {
    //Validators
    await utils_Controller.email_Validator(req, res);
    if (res.headersSent) return;
    await utils_Controller.password_Validator(req, res);
    if (res.headersSent) return;

    const { email, password } = req.body;
    try {
      const results = await LogIn_Model.login_Model(email);
      if (results.length === 0) {
        res.sendStatus(401);
      } else {
        const hash = results[0].password;
        const isPasswordCorrect = await bcrypt.compare(password, hash);
        if (isPasswordCorrect) {
          const payload = { id: results[0].id };
          const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '2h',
          });
          const response = {
            status: 200,
            token: token,
            userId: results[0].id,
            email: results[0].email,
            username: results[0].username,
            carInfo: results[0].carInfo,
            coins: results[0].coins,
            gems: results[0].gems,
          };
          res.status(200).json(response);
        } else {
          res.sendStatus(401);
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  //Google Config
  async verify(token) {
    try {
      const client = new OAuth2Client(process.env.GOOGLE_AUTH_TOKEN);
      const ticket = await client.verifyIdToken({
        idToken: token,
        //audience: process.env.GOOGLE_AUTH_TOKEN,
      });
      const payload = ticket.getPayload();
      return payload;
    } catch (error) {
      console.log(error);
    }
  },

  //Google Auth
  async auth_google(req, res) {
    try {
      const dbConnection = await createDbConnection();
      const token = req.body.idToken;
      const payload = await logIn_Controller.verify(token);
      //Payload Variables
      const given_name = payload.given_name;
      const email = payload.email;
      const sub = payload.sub;
  
      if (payload.email_verified == true) {
        // Check if user already exists in register table
        const [results] = await dbConnection.execute(
          `SELECT * FROM register WHERE google_id = ?`,
          [sub]
        );
        if (!results) {
          console.error('Error querying database:', err);
          res.status(500).send('Error signing in');
          return;
        }

        if (results.length > 0) {
          // User exists, update their Google-related information
          const updateQueryString = `UPDATE register SET google_id = ?, email = ?, username = ? WHERE google_id = ?`;
          dbConnection.query(
            updateQueryString,
            [sub, email, given_name, sub],
            (updateErr) => {
              if (updateErr) {
                console.error('Error updating user:', updateErr);
                res.status(500).send('Error signing in');
              } else {
                res.status(200).send('User signed in successfully');
              }
            }
          );
        } else {
          //Register the User
          const results = await Register_Controller.register_Google_Data(
            req,
            res,
            given_name,
            '',
            email,
            '',
            sub
          );
        }
      } else {
      }
      res.status(200).json(payload);
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: 'Invalid token' });
    }
  },

  async google_Login(req, res) {
    
    //Validators
    await utils_Controller.email_Validator(req, res);
    if (res.headersSent) return;

    const { email } = req.body;
    try {
      const results = await LogIn_Model.login_Model(email);
      if (results.length === 0) {
        res.sendStatus(401);
      } else {
        const payload = { id: results[0].id };
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: '2h',
        });
        const response = {
          status: 200,
          token: token,
          userId: results[0].id,
          email: results[0].email,
          username: results[0].username,
          carInfo: results[0].carInfo,
          coins: results[0].coins,
          gems: results[0].gems,
        };
        res.status(200).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  },

  // async auth_apple(req, res) {
  //     try {
  //         const token = req.body.token;
  //         const decodedToken = await auth.verifyIdToken(token);
  //         res.status(200).send(decodedToken);
  //       } catch (error) {
  //         res.status(500).send('Error verifying Apple sign in');
  //       }
  // }
};

module.exports = logIn_Controller;
