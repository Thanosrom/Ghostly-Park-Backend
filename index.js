/* eslint-disable no-undef */
//Libs
require('dotenv').config();
const express = require('express');
const https = require('https');
const cors = require('cors');
const fs = require('fs');
const app = express();
//Controllers to delete the Markers
const Markers_Controller = require('./Controllers/Markers_Controller');
//Subscription
const Update_Coins_Gems_Controller = require('./Controllers/Update_Coins_Gems_Controller');
//Routes
const Routes = require('./Routes');
//SSL Options
const sslOptions = {
  key: fs.readFileSync('./assets/certs/ghostlypark.pem.key'), // Private key
  cert: fs.readFileSync('./assets/certs/ghostlypark.pem'), // Certificate
  ca: fs.readFileSync('./assets/certs/ghostlypark_com.ca-bundle.pem'), // CA bundle
};

const server = https.createServer(sslOptions, app);

//App Init
app.use(cors());
app.use(express.json());
app.use('/', Routes);
// Website
app.use(express.static(__dirname + '/Website/dist'));

//Delete The Markers after some minutes-hours
setInterval(Markers_Controller.delete_Markers, 4 * 60 * 60 * 1000);
//Terminate the Subscriptions
setInterval(Update_Coins_Gems_Controller.minus_Subscription, 1 * 60 * 60 * 1000);

//Server Port
server.listen(443, () => {
  console.log(`Server is running on port 443`);
});
