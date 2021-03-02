const userModel = require('../models/user');

const create = (name, email, password, role) => {
    const user = userModel.create(name, email, password, role);
    return user;
};

module.exports = {
    create,
};