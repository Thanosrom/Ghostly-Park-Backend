const { body } = require('express-validator');

const usernameValidator = [
  
    body('username')
        .isLength({ min: 2, max: 25 })
        .custom(value => {
            const unicodeLetterStart = /^\p{L}/u;
            if (!unicodeLetterStart.test(value)) {
                throw new Error('Username must start with a letter');
            }
            return true;
        })
        .custom(value => {
            const allowedCharacters = /^[\p{L}\p{N}_-]+$/u;
            if (!allowedCharacters.test(value)) {
                throw new Error('Username must contain only letters, numbers, - and _');
            }
            return true;
        })
];

const passwordValidator = [
    body('password')
        .isLength({ min: 8, max: 25 })
        .isStrongPassword({ minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 })
       
];

const repeatPasswordValidator = [
    body('repeatPassword')
        .isLength({ min: 8, max: 25 })
        .isStrongPassword({ minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 })
];

const emailValidator = [
    body('email')
        .isEmail().withMessage('Invalid email format')
];

const carInfoValidator = [
    body('carInfo')
        .isLength({ min: 2, max: 25 })
        .custom(value => {
            const unicodeLetterStart = /^\p{L}/u;
            if (!unicodeLetterStart.test(value)) {
                throw new Error('Car info must start with a letter');
            }
            return true;
        })
        .custom(value => {
            const allowedCharacters = /^[\p{L}\p{N}_-]+$/u;
            if (!allowedCharacters.test(value)) {
                throw new Error('Car info must contain only letters, numbers, - and _');
            }
            return true;
        })
];

module.exports = {
    usernameValidator,
    passwordValidator,
    repeatPasswordValidator,
    emailValidator,
    carInfoValidator,
};
