const { Router } = require("express");

//Importar controladores
const recipesRouter = Router();
const {
  getRecipes,
  getRecipeById,
  createRecipe,
} = require("../handlers/recipesHandlers");

//Solicitud GET a la ruta

recipesRouter.get("/", getRecipes);

recipesRouter.get("/:id", getRecipeById);

recipesRouter.post("/", createRecipe);

module.exports = recipesRouter;
