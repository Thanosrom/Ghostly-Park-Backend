/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const fs = require('fs');
const path = require('path');

const app_ads_Controller = {
  async app_ads(req, res) {
    try {
      // Read the txt file containing the privacy policy
      const appAdsPath = path.join(__dirname, '../assets/app-ads.txt');
      const appAdsText = fs.readFileSync(appAdsPath, 'utf8');

      // Set the content type to 'text/plain' and send the txt response
      res.status(200).type('text/plain').send(appAdsText);
    } catch (error) {
      res.status(400).json({ message: 'Server is facing issues' });
    }
  },
};

module.exports = app_ads_Controller;
