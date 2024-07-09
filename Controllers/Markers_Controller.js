/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require('express');
//Routes
const router = express.Router();
//Models
const Markers_Model = require('../Models/Markers_Model');
const Update_Coins_Gems_Model = require('../Models/Update_Coins_Gems_Model');
//Controllers
const Update_Coins_Gems_Controller = require('./Update_Coins_Gems_Controller');
//Tokens
const verifyToken = require('./Token_Middleware');

const Markers_Controller = {
  //Markers
  async get_FilteredMarkers(req, res) {
    const { lat, lng } = req.body;

    try {
      const results = await Markers_Model.get_FilteredMarkers_Model(lat, lng);
      res.status(200).json(results);
    } catch (error) {
      res.sendStatus(400);
    }
  },

  //Send new Markers
  async send_UnParked_Location(req, res) {
    const { lat, lng } = req.body;
    timestamp = Date.now();

    try {
      const results = await Markers_Model.send_UnParked_Location_Model(
        req.user.id,
        lat,
        lng
      );
      if (results) {
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      res.sendStatus(400);
    }
  },

  //Send Parked Location
  async send_Parked_Location(req, res) {
    const { parked_long, parked_lat } = req.body;
    timestamp = Date.now();

    try {
      const results = await Markers_Model.send_Parked_Location_Model(
        req.user.id,
        parked_long,
        parked_lat
      );
      if (results) {
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      res.sendStatus(400);
    }
  },

  //Get Parked Location
  async get_Parked_Location(req, res) {
    try {
      const results = await Markers_Model.get_Parked_Location_Model(
        req.user.id
      );
      if (results) {
        res
          .status(200)
          .json(await Markers_Model.get_Parked_Location_Model(req.user.id));
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      res.sendStatus(400);
    }
  },

  //-----------------------------------------------For the Server to do----------------------------------------------------------------------------//
  async delete_Markers() {
    try {
      await Markers_Model.delete_Markers_Model();
    } catch (error) {
      res.sendStatus(400);
    }
  },
  //-----------------------------------------------For the Server to do----------------------------------------------------------------------------//
};

module.exports = Markers_Controller;
