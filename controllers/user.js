const userService = require('../services/user');

const create = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await userService.create(name, email, password);
    res.status(201).json({ user });
};

const createAdmin = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (req.user.role !== 'admin') {
        return next(
            { status: 403, message: 'Only admins can register new admins' },
        ); 
    }   
    const user = await userService.create(name, email, password, 'admin');
    res.status(201).json({ user });
};

module.exports = {
    create,
    createAdmin,
};
