/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require('express');

//Libs
const router = express.Router();
const rateLimit = require('express-rate-limit');

//Controllers
//Server Controllers
const Server_Status_Controller = require('./Controllers/Server_Status_Controller');
const Maintenance_Controller = require('./Controllers/Maintenance_Controller');
const Check_App_Version_Controller = require('./Controllers/Check_App_Version_Controller');

//App Controllers
const LogIn_Controller = require('./Controllers/LogIn_Controller');
const Register_Controller = require('./Controllers/Register_Controller');
const Recovery_Password_Controller = require('./Controllers/Recovery_Password');
const Settings_Controller = require('./Controllers/Settings_Controller');
const Markers_Controller = require('./Controllers/Markers_Controller');
const Coins_Gems_Controller = require('./Controllers/Coins_Gems_Controller');
const Update_Coins_Gems_Controller = require('./Controllers/Update_Coins_Gems_Controller');

//auth Token
const authenticateToken = require('./Controllers/Token_Middleware');

//Extras
const Privacy_Policy_And_Terms_Controller = require('./Controllers/Privacy_Policy_And_Terms_Controller');
const Delete_Account_Steps_Controller = require('./Controllers/Delete_Account_Steps_Controller');
const app_ads_Controller = require('./Controllers/app_ads_Controller');

//Route Limiters
const {
  server_Status_Limiter,
  maintenance_Limiter,
  check_app_Version_Limiter,
  login_Limiter,
  auth_google_Limiter,
  google_Login_Limiter,
  auth_apple_Limiter,
  send_Digit_Code_Limiter,
  check_If_Email_Exist_Limiter,
  register_Data_Limiter,
  send_Digits_To_Recovery_Email_Limiter,
  reset_Password_Digits_Check_Limiter,
  change_Password_Limiter,
  change_Username_Limiter,
  check_Old_Password_Limiter,
  change_Password_Settings_Limiter,
  change_CarInfo_Limiter,
  delete_User_Limiter,
  get_FilteredMarkers_Limiter,
  send_UnParked_Location_Limiter,
  get_Parked_Location_Limiter,
  send_Parked_Location_Limiter,
  get_Subscription_Limiter,
  get_Coins_Limiter,
  get_Gems_Limiter,
  plus_Subscription_Limiter,
  plus_Coins_Limiter,
  plus_Gems_Limiter,
  minus_Coins_Limiter,
  minus_Gems_Limiter,
  Website_Limiter,
  privacy_Policy_And_Terms_Limiter,
  delete_Account_Steps_Limiter,
  app_ads_Limiter
} = require('./Controllers/Route_Limiters');

//Server Status
router.get(
  '/server_Status',
  server_Status_Limiter,
  Server_Status_Controller.server_Status
);
router.get(
  '/maintenance',
  maintenance_Limiter,
  Maintenance_Controller.maintenance
);
router.get(
  '/check_app_Version',
  check_app_Version_Limiter,
  Check_App_Version_Controller.check_App_Version
);

//Login
router.post('/login', login_Limiter, LogIn_Controller.login);
router.post('/auth_google', auth_google_Limiter, LogIn_Controller.auth_google);
router.post(
  '/google_Login',
  google_Login_Limiter,
  LogIn_Controller.google_Login
);
//router.post('/auth_apple',auth_apple_Limiter,LogIn_Controller.auth_apple);

//Register
router.post(
  '/send_Digit_Code',
  send_Digit_Code_Limiter,
  Register_Controller.send_Digit_Code
);
router.post(
  '/check_If_Email_Exist',
  check_If_Email_Exist_Limiter,
  Register_Controller.check_If_Email_Exist
);
router.post(
  '/register_Data',
  register_Data_Limiter,
  Register_Controller.register_Data
);

//Recovery Password
router.post(
  '/send_Digits_To_Recovery_Email',
  send_Digits_To_Recovery_Email_Limiter,
  Recovery_Password_Controller.send_Digits_To_Recovery_Email
);
router.post(
  '/reset_Password_Digits_Check',
  reset_Password_Digits_Check_Limiter,
  Recovery_Password_Controller.reset_Password_Digits_Check
);
router.post(
  '/change_Password',
  change_Password_Limiter,
  Recovery_Password_Controller.change_Password
);

//Settings
router.put(
  '/change_Username',
  authenticateToken,
  change_Username_Limiter,
  Settings_Controller.change_Username
);
router.put(
  '/check_Old_Password',
  authenticateToken,
  check_Old_Password_Limiter,
  Settings_Controller.check_Old_Password
);
router.put(
  '/change_Password',
  authenticateToken,
  change_Password_Settings_Limiter,
  Settings_Controller.change_Password
);
router.put(
  '/change_CarInfo',
  authenticateToken,
  change_CarInfo_Limiter,
  Settings_Controller.change_CarInfo
);
router.put(
  '/delete_User',
  authenticateToken,
  delete_User_Limiter,
  Settings_Controller.delete_User
);

//Map - Home
router.post(
  '/get_FilteredMarkers',
  authenticateToken,
  get_FilteredMarkers_Limiter,
  Markers_Controller.get_FilteredMarkers
);
router.post(
  '/send_UnParked_Location',
  authenticateToken,
  send_UnParked_Location_Limiter,
  Markers_Controller.send_UnParked_Location
);
router.post(
  '/get_Parked_Location',
  authenticateToken,
  get_Parked_Location_Limiter,
  Markers_Controller.get_Parked_Location
);
router.post(
  '/send_Parked_Location',
  authenticateToken,
  send_Parked_Location_Limiter,
  Markers_Controller.send_Parked_Location
);

//Coins - Gems
router.get(
  '/get_Subscription',
  authenticateToken,
  get_Subscription_Limiter,
  Coins_Gems_Controller.get_Subscription
);
router.get(
  '/get_Coins',
  authenticateToken,
  get_Coins_Limiter,
  Coins_Gems_Controller.get_Coins
);
router.get(
  '/get_Gems',
  authenticateToken,
  get_Gems_Limiter,
  Coins_Gems_Controller.get_Gems
);
router.put(
  '/plus_Subscription',
  authenticateToken,
  plus_Subscription_Limiter,
  Update_Coins_Gems_Controller.plus_Subscription
);
router.put(
  '/plus_Coins',
  authenticateToken,
  plus_Coins_Limiter,
  Update_Coins_Gems_Controller.plus_Coins
);
router.put(
  '/plus_Gems',
  authenticateToken,
  plus_Gems_Limiter,
  Update_Coins_Gems_Controller.plus_Gems
);
router.put(
  '/minus_Coins',
  authenticateToken,
  minus_Coins_Limiter,
  Update_Coins_Gems_Controller.minus_Coins
);
router.put(
  '/minus_Gems',
  authenticateToken,
  minus_Gems_Limiter,
  Update_Coins_Gems_Controller.minus_Gems
);

//Website
router.get('/', Website_Limiter, (req, res) => {
  res.sendFile(__dirname + '/Website/dist/index.html');
});

//Extras
router.get(
  '/privacy_Policy_And_Terms',
  privacy_Policy_And_Terms_Limiter,
  Privacy_Policy_And_Terms_Controller.privacy_Policy_And_Terms
);
router.get(
  '/delete_Account_Steps',
  delete_Account_Steps_Limiter,
  Delete_Account_Steps_Controller.delete_Account_Steps
);
router.get(
  '/app-ads.txt',
  app_ads_Limiter,
  app_ads_Controller.app_ads
);

//Export
module.exports = router;
