const {validationResult, query} = require('express-validator')

exports.validateCreateTicket = async (req, res) => {
    await Promise.all([
        query('number').isInt().withMessage("number must be an Integer").run(req)
    ])

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errMsg = errors.array().map((error) => error.msg);
        return res.status(400).json({ errors: errMsg });
    }
}

exports.validateFetchTicket = async (req, res) => {
    await Promise.all([
        query('currentPage').isInt().withMessage("currentPage must be an Integer").run(req),
        query('PageSize').isInt().withMessage("PageSize must be an Integer").run(req),
    ])

    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errMsg = errors.array().map((error) => error.msg);
        return res.status(400).json({ errors: errMsg });
    }
}