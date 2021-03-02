const jwt = require('jsonwebtoken');

const secret = 'senhatest';
module.exports = (req, res) => {
    const { email, role, id } = req.user;
    const token = jwt.sign({ email, role, id }, secret);
    res.status(200).json({ token });
};