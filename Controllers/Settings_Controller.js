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

const saltRounds = 10;

const Settings_Controller = {

    async change_Username (req, res) {
      const { newUsername } = req.body;
      try{
        //Username
        const validateUsername = [
          body('newUsername')
          .isLength({ min: 2,max: 25})
          .matches(/^[A-Za-z][A-Za-z0-9]{2,25}$/)
        ];
        await Promise.all(validateUsername.map(validation => validation.run(req)));
        const usernameErrors = validationResult(req);
        if (!usernameErrors.isEmpty()) {
          return res.sendStatus(400);
        }

        if (newUsername !== undefined && req.user.id !== undefined) {
          const results = await Settings_Model.change_Username(newUsername,req.user.id);
          if (results) {
            return res.sendStatus(200);
          }
          else{
            return res.sendStatus(400);
          }
        }
      } catch(error) {
        res.sendStatus(400);
      }
    },

    async check_Old_Password (req, res) {
      const { oldPassword } = req.body;
      try{
        const results = await Settings_Model.check_Old_Password(req.user.id);
        if (results) {
            const isPasswordCorrect = await bcrypt.compare(oldPassword, results[0].password);
            if(isPasswordCorrect){
              res.sendStatus(200);
            }else{
               res.sendStatus(400);
            }
        }
      }catch(error){ 
        res.sendStatus(400);
      }
    },

    async change_Password (req, res) {
      const { newPassword } = req.body;
      
      try{
        const validatePassword = [
          body('newPassword')
              .isLength({ min: 8,max: 25})
              .isStrongPassword
              .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?!.*[\\/#$<>%;&|(){}"`[\]]).{8,25}$/)
        ];
        await Promise.all(validatePassword.map(validation => validation.run(req)));
        const errorsPassword = validationResult(req); 

        if (!errorsPassword.isEmpty()) {
          return res.sendStatus(400);
        }

        if (newPassword !== undefined && req.user.id !== undefined && newPassword.length >= 8) {
          const hash = await new Promise((resolve, reject) => {        
            bcrypt.hash(newPassword, saltRounds, (err, hash) => {
              if (err) {
                reject(err);
              } else {
                resolve(hash);
              }
            });
          });
          const results = await Settings_Model.change_Password(hash,req.user.id);

          if (results) {
            res.sendStatus(200);
          }
          else{
            res.sendStatus(400);
          }  
        } else {
          res.sendStatus(400);
        }

      }catch(error){ 
        res.sendStatus(400);
      }
    },

    async change_CarInfo (req, res) {
      const { newCarInfo } = req.body;
      try{
        const changeCarInfoValidation = [
          body('newCarInfo')
          .matches(/^[A-Za-z0-9\s-]{2,25}$/)
          .isLength({ min: 2, max: 25 })
        ];
        await Promise.all(changeCarInfoValidation.map(validation => validation.run(req)));
        const carErrors = validationResult(req);
        if (!carErrors.isEmpty()) {
          return res.sendStatus(400);
        }


        if (newCarInfo !== undefined && req.user.id !== undefined) {
          const results = await Settings_Model.change_CarInfo(newCarInfo,req.user.id);
          if(results){
            return res.sendStatus(200);
          }else{
            return res.sendStatus(400);
          }
        }else{
          return res.sendStatus(400);
        }

      }catch(error){ 
        res.sendStatus(400);
      }
    },

    async delete_User (req, res) {
      try{
        if (req.user.id !== undefined) {
          const results = await Settings_Model.delete_User(req.user.id);
          if(results){
            return res.sendStatus(200);
          }else{
            return res.sendStatus(400);
          }
        }else{
          return res.sendStatus(400);
        }

      }catch(error){ 
        res.sendStatus(400);
      }
    },

};

module.exports = Settings_Controller;