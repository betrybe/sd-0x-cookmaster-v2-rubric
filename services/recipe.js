const recipeModel = require('../models/recipe');

const create = async (name, ingredients, preparation, userId) => 
    recipeModel.create(name, ingredients, preparation, userId);

const getAll = async () => recipeModel.getAll();

const getById = async (id) => recipeModel.getById(id);

const update = async (id, data) => {
    const recipe = await recipeModel.update(id, data);
    return { ...recipe.value, ...data };
};

const remove = async (id) => recipeModel.remove(id);

const upload = async (id, data) => {
    const recipe = await recipeModel.upload(id, data);
    return { ...recipe.value, image: data };
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
    upload,
};