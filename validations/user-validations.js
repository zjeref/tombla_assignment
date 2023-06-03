const { validationResult, body } = require('express-validator');

exports.validateCreateAccount = async (req, res) => {
    await Promise.all([
        body('name').notEmpty().withMessage('Name is required').isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters').run(req),
        body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format').run(req),
        body('password').notEmpty().withMessage('Password is required').isLength({ min: 8, max: 24 }).withMessage('Password must be between 8 and 24 characters').run(req),
    ]);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errMsg = errors.array().map((error) => error.msg);
        return res.status(400).json({ errors: errMsg });
    }
};

exports.validateVerify = async (req, res) => {
    await Promise.all([
        body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format').run(req),
        body('password').notEmpty().withMessage('Password is required').isLength({ min: 8, max: 24 }).withMessage('Password must be between 8 and 24 characters').run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errMsg = errors.array().map((error) => error.msg);
        return res.status(400).json({ errors: errMsg });
    }
};
