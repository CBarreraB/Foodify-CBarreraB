const { Router } = require("express");

//Importar controladores
const recipesRouter = Router();
const {
  getRecipes,
  getRecipe,
  postRecipe,
} = require("../handlers/recipesHandlers");

//Solicitud GET a la ruta

recipesRouter.get("/recipe", getRecipes);

recipesRouter.get("/recipe/:idRecipe", getRecipe);

recipesRouter.post("/recipes", postRecipe);

module.exports = recipesRouter;
