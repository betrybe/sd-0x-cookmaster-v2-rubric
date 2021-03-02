const { Router } = require('express');
const userController = require('./controllers/user');
const recipeController = require('./controllers/recipe');
const { register, validateEntries, login } = require('./middlewares/validateUser');
const createToken = require('./middlewares/createToken');
const validateToken = require('./middlewares/validateToken');
const { recipe, mongoId } = require('./middlewares/validateRecipe');
const uploadImage = require('./middlewares/uploadImage');

const router = new Router();
const idRoute = '/recipes/:id';
router
    .post('/users', validateEntries, register, userController.create)
    .post('/users/admin', validateToken, validateEntries, register, userController.createAdmin)
    .post('/login', validateEntries, login, createToken)
    .post('/recipes', validateToken, recipe, recipeController.create)
    .get(`${idRoute}`, mongoId, recipeController.getById)
    .put(`${idRoute}`, validateToken, mongoId, recipe, recipeController.update)
    .put(`${idRoute}/image`, validateToken, mongoId, uploadImage, recipeController.upload)
    .delete(`${idRoute}`, validateToken, mongoId, recipeController.remove)
    .get('/recipes', recipeController.getAll);

module.exports = router;
