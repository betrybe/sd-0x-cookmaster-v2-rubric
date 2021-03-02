const { getByEmail } = require('../models/user');

const errors = {
    invalid_entry: { status: 400, message: 'Invalid entries. Try again.' },
    registered_email: { status: 409, message: 'Email already registered' },
    field_not_filled: { status: 401, message: 'All fields must be filled' },
    incorrect_entry: { status: 401, message: 'Incorrect username or password' },
};

const register = async (req, res, next) => {
    const { name, email } = req.body;
    const validateEntries = !name || !email.includes('@');
    if (validateEntries) return next(errors.invalid_entry);
    if (await getByEmail(email)) return next(errors.registered_email);
    next();
};
const validateEntries = async (req, res, next) => {
    const { email, password, name } = req.body;
    const invalidEntry = !email || !password;
    if (invalidEntry) return next(name ? errors.invalid_entry : errors.field_not_filled);
    next();
};
const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await getByEmail(email);
    const invalidLogin = !user || user.password !== password;
    if (invalidLogin) return next(errors.incorrect_entry);
    req.user = user;
    next();
};

module.exports = {
    register,
    validateEntries,
    login,
};
