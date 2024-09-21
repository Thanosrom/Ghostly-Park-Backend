const { body, validationResult } = require('express-validator');

const utils_Controller = {
    async username_Validator(req, res) {
        await body('username')
            .isLength({ min: 2, max: 25 })
            .run(req);
        const errors = validationResult(req);
        return !errors.isEmpty();
    },

    async password_Validator(req, res) {
        await body('password')
            .isLength({ min: 8, max: 25 })
            .run(req);
        const errors = validationResult(req);
        return !errors.isEmpty();
    },

    async repeatPassword_Validator(req, res) {
        await body('repeatPassword')
            .isLength({ min: 8, max: 25 })
            .run(req);
        const errors = validationResult(req);
        return !errors.isEmpty();
        
    },

    async email_Validator(req, res) {   
        await body('email').isEmail().run(req);
        const errors = validationResult(req);
        return !errors.isEmpty();
    },

    async carInfo_Validator(req, res) {
        await body('carInfo')
            .isLength({ min: 2, max: 25 })
            .run(req);
        const errors = validationResult(req);
        return !errors.isEmpty();
    },
}

module.exports = utils_Controller;
