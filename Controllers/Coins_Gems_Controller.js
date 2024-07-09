/* eslint-disable no-unused-vars */
const express = require('express');
//Routes
const router = express.Router();
//Models
const Coins_Gems_Model = require('../Models/Coins_Gems_Model');
//Tokens
const verifyToken = require('./Token_Middleware');

const Coins_Gems_Controller = {
  async get_Subscription(req, res) {
    try {
      const results = await Coins_Gems_Model.get_Subscription(req.user.id);
      if (results) {
        return res.status(200).json(results);
      } else {
        return res.sendStatus(400);
      }
    } catch (error) {
      res.sendStatus(400);
    }
  },

  async get_Coins(req, res) {
    try {
      const results = await Coins_Gems_Model.get_Coins(req.user.id);
      if (results) {
        return res.status(200).json(results);
      } else {
        return res.sendStatus(400);
      }
    } catch (error) {
      res.sendStatus(400);
    }
  },

  async get_Gems(req, res) {
    try {
      const results = await Coins_Gems_Model.get_Gems(req.user.id);
      if (results) {
        return res.status(200).json(results);
      } else {
        return res.sendStatus(400);
      }
    } catch (error) {
      res.sendStatus(400);
    }
  },
};

module.exports = Coins_Gems_Controller;
