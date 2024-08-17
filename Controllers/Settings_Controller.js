/* eslint-disable no-unused-vars */
const express = require('express');
//Routes
const router = express.Router();
//Models
const Settings_Model = require('../Models/Settings_Model');
//Libs
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
//Shared digit code variables
const sharedVariables = require('./sharedVariables');
//Validators
const utils_Controller = require('./utils_Controller');

const saltRounds = 10;

const Settings_Controller = {
  async change_Username(req, res) {
    //Validators
    await utils_Controller.username_Validator(req, res);
    if (res.headersSent) return;

    const { newUsername } = req.body;
    try {
        const results = await Settings_Model.change_Username(
          newUsername,
          req.user.id
        );
        if (results) {
          return res.sendStatus(200);
        } else {
          return res.sendStatus(400);
        }
      
    } catch (error) {
      res.sendStatus(400);
    }
  },

  async check_Old_Password(req, res) {
    //Validators
    await utils_Controller.password_Validator(req, res);
    if (res.headersSent) return;

    const { oldPassword } = req.body;
    try {
      const results = await Settings_Model.check_Old_Password(req.user.id);
      if (results) {
        const isPasswordCorrect = await bcrypt.compare(
          oldPassword,
          results[0].password
        );
        if (isPasswordCorrect) {
          res.sendStatus(200);
        } else {
          res.sendStatus(400);
        }
      }
    } catch (error) {
      res.sendStatus(400);
    }
  },

  async change_Password(req, res) {
    //Validators
    await utils_Controller.password_Validator(req, res);
    if (res.headersSent) return;

    const { newPassword } = req.body;

    try {
    
        const hash = await new Promise((resolve, reject) => {
          bcrypt.hash(newPassword, saltRounds, (err, hash) => {
            if (err) {
              reject(err);
            } else {
              resolve(hash);
            }
          });
        });
        const results = await Settings_Model.change_Password(hash, req.user.id);

        if (results) {
          res.sendStatus(200);
        } else {
          res.sendStatus(400);
        }
      
    } catch (error) {
      res.sendStatus(400);
    }
  },

  async change_CarInfo(req, res) {
    //Validators
    await utils_Controller.carInfo_Validator(req, res);
    if (res.headersSent) return;

    const { newCarInfo } = req.body;
    try {
     
        const results = await Settings_Model.change_CarInfo(
          newCarInfo,
          req.user.id
        );
        if (results) {
          return res.sendStatus(200);
        } else {
          return res.sendStatus(400);
        }
     
    } catch (error) {
      res.sendStatus(400);
    }
  },

  async delete_User(req, res) {
    try {
    
        const results = await Settings_Model.delete_User(req.user.id);
        if (results) {
          return res.sendStatus(200);
        } else {
          return res.sendStatus(400);
        }
     
    } catch (error) {
      res.sendStatus(400);
    }
  },
};

module.exports = Settings_Controller;
