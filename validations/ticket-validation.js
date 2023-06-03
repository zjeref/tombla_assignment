const {validationResult, query} = require('express-validator')

exports.validateCreateTicket = async (req, res) => {
    await Promise.all([
        query('number').optional().isInt().withMessage("number must be an Integer").run(req)
    ])

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errMsg = errors.array().map((error) => error.msg);
        return res.status(400).json({ errors: errMsg });
    }
}

exports.validateFetchTicket = async (req, res) => {
    await Promise.all([
        query('currentPage').optional().isInt().withMessage("currentPage must be an Integer").run(req),
        query('pageSize').optional().isInt().withMessage("PageSize must be an Integer").run(req),
    ])

    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errMsg = errors.array().map((error) => error.msg);
        return res.status(400).json({ errors: errMsg });
    }
}