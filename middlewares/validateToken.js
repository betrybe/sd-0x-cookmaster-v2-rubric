const jwt = require('jsonwebtoken');
const { getByEmail } = require('../models/user');

const secret = 'senhatest';

const errors = {
    invalid_token: { status: 401, message: 'jwt malformed' },
    no_token: { status: 401, message: 'missing auth token' },
};

module.exports = async (req, _res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) return next(errors.no_token);
        const decoded = jwt.verify(authorization, secret);
        const user = await getByEmail(decoded.email);
        if (!user) return next(errors.invalid_token);
        req.user = user;
        next();
    } catch (_e) {
        next(errors.invalid_token);
    }
};