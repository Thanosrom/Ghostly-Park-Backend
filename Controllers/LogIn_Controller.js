/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
//Routes
const router = express.Router();
//Models
const LogIn_Model = require('../Models/LogIn_Model');
//Libs
const bcrypt = require('bcrypt');
const { JWT } = require('google-auth-library');
const { body, validationResult } = require('express-validator');
//Tokens
const jwt = require('jsonwebtoken');
//const SECRET_KEY = 'ghostly_park_secret_key';
//Keys
//For Google Auth
const CLIENT_ID =
  '967660914327-3g92fkbkkg81sc1pv6n3pu8b0dfig3dr.apps.googleusercontent.com';
const client = new JWT(CLIENT_ID);
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
    const { email, password } = req.body;
    try {
      //Email
      const validateEmail = [body('email').isEmail()];
      await Promise.all(validateEmail.map((validation) => validation.run(req)));
      const errorsEmail = validationResult(req);
      if (!errorsEmail.isEmpty()) {
        return res.sendStatus(400);
      }
      //Password
      const validatePassword = [
        body('password')
          .isLength({ min: 8, max: 25 })
          .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?!.*[\\/#$<>%;&|(){}"`[\]]).{8,25}$/
          ),
      ];
      await Promise.all(
        validatePassword.map((validation) => validation.run(req))
      );
      const errorsPassword = validationResult(req);

      if (!errorsPassword.isEmpty()) {
        return res.sendStatus(400);
      }

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

  async verify(token) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
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
      const token = req.body.idToken;
      console.log(token);
      const payload = await logIn_Controller.verify(token);
      console.log(payload);
      res.status(200).json(payload);
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: 'Invalid token' });
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
