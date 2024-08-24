/* eslint-disable no-unused-vars */
const express = require('express');
//Routes
const router = express.Router();
//Models
const Update_Coins_Gems_Model = require('../Models/Update_Coins_Gems_Model');
//Tokens
const verifyToken = require('./Token_Middleware');

const Update_Coins_Gems_Controller = {
  
  async plus_Subscription(req, res) {

    try {
      const results = await Update_Coins_Gems_Model.plus_Subscription(req.user.id);
      if (results == true) {
        res.status(200).json(results);
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      res.sendStatus(400);
    }
  },

  async plus_Coins(req, res) {

    const { type } = req.body;

    try {
      const results = await Update_Coins_Gems_Model.plus_Coins(req.user.id,type);
      if (results == true) {
        res.status(200).json(results);
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      res.sendStatus(400);
    }
  },

  async minus_Coins(req, res) {
    try {
      const results = await Update_Coins_Gems_Model.minus_Coins(req.user.id);
      if (results == true) {
        res.status(200).json(results);
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      res.sendStatus(400);
    }
  },

  async minus_5_Coins(req, res) {
    try {
      const results = await Update_Coins_Gems_Model.minus_5_Coins(req.user.id);
      if (results == true) {
        res.status(200).json(results);
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      res.sendStatus(400);
    }
  },

  async plus_Gems(req, res) {

    try {
      const results = await Update_Coins_Gems_Model.plus_Gems(req.user.id);
      if (results == true) {
        res.status(200).json(results);
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      res.sendStatus(400);
    }
  },

  async minus_Gems(req, res) {
    try {
      const results = await Update_Coins_Gems_Model.minus_Gems(req.user.id);
      if (results == true) {
        res.status(200).json(results);
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      res.sendStatus(400);
    }
  },
};

module.exports = Update_Coins_Gems_Controller;
