const { Router } = require('express');
const router = Router();
const { getRecipes, getById, postRecipe } = require('../controlers/RecipeController.js');
//localhost:3001/recipe
router.get('/', getRecipes);
router.get('/:id', getById);
router.post('/', postRecipe);

module.exports = router;