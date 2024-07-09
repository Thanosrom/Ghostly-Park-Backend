/* eslint-disable no-unused-vars */
const express = require('express');

const check_App_Version_Controller = {
  async check_App_Version(req, res) {
    try {
      res.status(200).json('1.0.0+6');
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Server is facing issues', maintenance: true });
    }
  },
};

module.exports = check_App_Version_Controller;
