const recipeService = require('../services/recipe');

const create = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id: id } = req.user;
    const recipe = await recipeService.create(name, ingredients, preparation, id);
    res.status(201).json({ recipe });
};

const getAll = async (_req, res) => {
    const recipes = await recipeService.getAll();
    res.status(200).json(recipes);
};

const getById = async (req, res, next) => {
    const { id } = req.params;
    const recipe = await recipeService.getById(id);
    if (!recipe) return next({ status: 404, message: 'recipe not found' });
    res.status(200).json(recipe);
};

const update = async (req, res, next) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const recipe = await recipeService.update(id, { name, ingredients, preparation });
    if (!recipe) return next({ status: 404, message: 'recipe not found' });
    res.status(200).json(recipe);
};

const remove = async (req, res) => {
    const { id } = req.params;
    await recipeService.remove(id);
    res.status(204).end();
};

const upload = async (req, res) => {
    const { id } = req.params;
    console.log(req.file);
    const recipe = await recipeService.upload(id, `localhost:3000/images/${id}.jpeg`);
    res.status(200).json(recipe);
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
    upload,
};