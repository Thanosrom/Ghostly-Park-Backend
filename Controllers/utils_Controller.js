const { body, validationResult } = require('express-validator');

const utils_Controller = {
    async validators(req, res) {
        // Set up validation rules
        await body('username')
            .isLength({ min: 2, max: 25 })
            .custom(value => {
                const unicodeLetterStart = /^\p{L}/u;
                if (!unicodeLetterStart.test(value)) {
                    return false;
                }
                return true;
            })
            .custom(value => {
                const allowedCharacters = /^[\p{L}\p{N}_-]+$/u;
                if (!allowedCharacters.test(value)) {
                    return false;
                }
                return true;
            })
            .run(req);

        await body('password')
            .isLength({ min: 8, max: 25 })
            .isStrongPassword({ minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 })
            .run(req);

        await body('repeatPassword')
            .isLength({ min: 8, max: 25 })
            .isStrongPassword({ minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 })
            .run(req);

        await body('email').isEmail().run(req);

        await body('carInfo')
            .isLength({ min: 2, max: 25 })
            .custom(value => {
                const unicodeLetterStart = /^\p{L}/u;
                if (!unicodeLetterStart.test(value)) {
                    return false;
                }
                return true;
            })
            .custom(value => {
                const allowedCharacters = /^[\p{L}\p{N}_-]+$/u;
                if (!allowedCharacters.test(value)) {
                    return false;
                }
                return true;
            })
            .run(req);

        // Collect errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Extract the first error
            const firstError = errors.array()[0];
            const fieldName = firstError.path;
            console.log(firstError)
            console.log(fieldName)
            // Map error codes to fields
            let errorCode;
            switch (fieldName) {
                case 'username':
                    errorCode = 1000;
                    break;
                case 'password':
                    errorCode = 1001;
                    break;
                case 'repeatPassword':
                    errorCode = 1002;
                    break;
                case 'email':
                    errorCode = 1003;
                    break;
                case 'carInfo':
                    errorCode = 1004;
                    break;
                default:
                    errorCode = 1005; // General error
            }

            return res.status(400).json({ errorCode });
        }

        // If all validations pass
        return res.status(200);
    }
}

module.exports = utils_Controller;
