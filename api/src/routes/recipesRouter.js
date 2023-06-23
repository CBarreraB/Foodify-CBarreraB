const { Router } = require("express");

//Importar controladores
const recipesRouter = Router();
const {
  getRecipes,
  getRecipe,
  postRecipes,
} = require("../handlers/recipesHandlers");

//Solicitud GET a la ruta

recipesRouter.get("/", getRecipes);

recipesRouter.get("/:id", getRecipe);

recipesRouter.post("/recipes", postRecipes);

module.exports = recipesRouter;
