const { body, validationResult } = require('express-validator');

const utils_Controller = {
    async username_Validator(req, res) {
        // Set up validation rules
        await body('username')
            .isLength({ min: 2, max: 25 })
            // .custom(value => {
            //     const unicodeLetterStart = /^\p{L}/u;
            //     if (!unicodeLetterStart.test(value)) {
            //         return false;
            //     }
            //     // return true;
            // })
            // .custom(value => {
            //     const allowedCharacters = /^[\p{L}\p{N}_-]+$/u;
            //     if (!allowedCharacters.test(value)) {
            //         return false;
            //     }
            //     //return true;
            // })
            .run(req);
        console.log("Entered");
        const errors = validationResult(req);
        console.log(errors);

        if (!errors.isEmpty()) {
            // Extract the first error
            const firstError = errors.array()[0];
            const fieldName = firstError.path;
            // Map error codes to fields
            let errorCode;
            switch (fieldName) {
                case 'username':
                    errorCode = 1000;
                    break;
                default:
                    errorCode = 1005; // General error
            }

            return false;
        }
        return true;
    },

    async password_Validator(req, res) {
        // Set up validation rules
        await body('password')
            .isLength({ min: 8, max: 25 })
            .isStrongPassword({ minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
            .run(req);
        // Collect errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Extract the first error
            const firstError = errors.array()[0];
            const fieldName = firstError.path;
            // Map error codes to fields
            let errorCode;
            switch (fieldName) {
                case 'password':
                    errorCode = 1001;
                    break;
                default:
                    errorCode = 1005; // General error
            }

            return false;
        }
        return true;
    },

    async repeatPassword_Validator(req, res) {
        // Set up validation rules
        await body('repeatPassword')
            .isLength({ min: 8, max: 25 })
            .isStrongPassword({ minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
            .run(req);

        // Collect errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Extract the first error
            const firstError = errors.array()[0];
            const fieldName = firstError.path;
            // Map error codes to fields
            let errorCode;
            switch (fieldName) {
                case 'repeatPassword':
                    errorCode = 1002;
                    break;
                default:
                    errorCode = 1005; // General error
            }

            return false;
        }
        return true;
    },

    async email_Validator(req, res) {   
        // Set up validation rules
        await body('email').isEmail().run(req);

        // Collect errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Extract the first error
            const firstError = errors.array()[0];
            const fieldName = firstError.path;
            // Map error codes to fields
            let errorCode;
            switch (fieldName) {
                case 'email':
                    errorCode = 1003;
                    break;
                default:
                    errorCode = 1005;
            }
            return false;
        }
        return true;

    },

    async carInfo_Validator(req, res) {
        // Set up validation rules
        await body('carInfo')
            .isLength({ min: 2, max: 25 })
            // .custom(value => {
            //     const unicodeLetterStart = /^\p{L}/u;
            //     if (!unicodeLetterStart.test(value)) {
            //         return false;
            //     }
            // })
            // .custom(value => {
            //     const allowedCharacters = /^[\p{L}\p{N}_-]+$/u;
            //     if (!allowedCharacters.test(value)) {
            //         return false;
            //     }
            // })
            .run(req);

        // Collect errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Extract the first error
            const firstError = errors.array()[0];
            const fieldName = firstError.path;
            // Map error codes to fields
            let errorCode;
            switch (fieldName) {
                case 'carInfo':
                    errorCode = 1004;
                    break;
                default:
                    errorCode = 1005; // General error
            }

            return false;
        }
        return true;
    },
}

module.exports = utils_Controller;
