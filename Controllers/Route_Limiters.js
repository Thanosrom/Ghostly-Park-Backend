const rateLimit = require('express-rate-limit');

//Server Status
const server_Status_Limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

//Maintenance
const maintenance_Limiter = rateLimit({
  WindowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

//Check App Version
const check_app_Version_Limiter = rateLimit({
  WindowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

//login
const login_Limiter = rateLimit({
  WindowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

const auth_google_Limiter = rateLimit({
  WindowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

const google_Login_Limiter = rateLimit({
  WindowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

const auth_apple_Limiter = rateLimit({
  WindowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

//-----------------------------------------------------------------------------------------------------//
//Register
const send_Digit_Code_Limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

const check_If_Email_Exist_Limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

const register_Data_Limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

//-----------------------------------------------------------------------------------------------------//
//Recovery Password
const send_Digits_To_Recovery_Email_Limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

const reset_Password_Digits_Check_Limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

const change_Password_Limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

//-----------------------------------------------------------------------------------------------------//
//Settings
const change_Username_Limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

const check_Old_Password_Limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

const change_Password_Settings_Limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

const change_CarInfo_Limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

const delete_User_Limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

//-----------------------------------------------------------------------------------------------------//
//Map - Home
const get_FilteredMarkers_Limiter = rateLimit({
  WindowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

const send_UnParked_Location_Limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

const get_Parked_Location_Limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

const send_Parked_Location_Limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

//-----------------------------------------------------------------------------------------------------//
//Coins - Gems
const get_Subscription_Limiter = rateLimit({
  WindowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

const get_Coins_Limiter = rateLimit({
  WindowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

const get_Gems_Limiter = rateLimit({
  WindowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

const plus_Subscription_Limiter = rateLimit({
  WindowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

const plus_Coins_Limiter = rateLimit({
  WindowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

const plus_Gems_Limiter = rateLimit({
  WindowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

const minus_Coins_Limiter = rateLimit({
  WindowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

const minus_Gems_Limiter = rateLimit({
  WindowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

//-----------------------------------------------------------------------------------------------------//
//Website_Limiter
const Website_Limiter = rateLimit({
  WindowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});
//-----------------------------------------------------------------------------------------------------//

//-----------------------------------------------------------------------------------------------------//
//Privacy Policy
const privacy_Policy_And_Terms_Limiter = rateLimit({
  WindowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

//Delete Account Steps
const delete_Account_Steps_Limiter = rateLimit({
  WindowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});

//App Ads txt
const app_ads_Limiter = rateLimit({
  WindowMs: 10 * 1000,
  max: 10,
  message:
    'Too many login attempts from this IP, please try again after some minutes',
  headers: true,
});
//-----------------------------------------------------------------------------------------------------//


module.exports = {
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
  minus_Coins_Limiter,
  plus_Gems_Limiter,
  minus_Gems_Limiter,
  Website_Limiter,
  privacy_Policy_And_Terms_Limiter,
  delete_Account_Steps_Limiter,
  app_ads_Limiter
};
