const { ObjectId } = require('mongodb');

const erros = { invalid_entry: { status: 400, message: 'Invalid entries. Try again.' },
};
const recipe = (req, _res, next) => {
    const { name, ingredients, preparation } = req.body;
    if (!name || !ingredients || !preparation) return next(erros.invalid_entry);
    next();
};

const mongoId = (req, _res, next) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return next({ status: 404, message: 'recipe not found' });
    next();
};

module.exports = {
    recipe,
    mongoId,
};