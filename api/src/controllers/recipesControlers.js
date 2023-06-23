const { Recipe } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { cleanArray } = require("../utils/cleanArray");

const createRecipe = async (
  name,
  image,
  summary,
  healthScore,
  instructions
) => {
  const newRecipe = await Recipe.create(
    name,
    image,
    summary,
    healthScore,
    instructions
  );
};

const getRecipeById = async (id, source) => {
  recipe =
    source === "API"
      ? axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?api_key=${API_KEY}`
        ).data
      : await Recipe.findByPk(id);
};

const getAllRecipes = async () => {
  const dbRecipes = await Recipe.findAll();
  const apiRecipesFull = await axios.get(
    "https://api.spoonacular.com/recipes?api_key=${API_KEY}"
  ).data;
  const apiRecipes = cleanArray(apiRecipesFull);
  return [...dbRecipes, ...apiRecipes];
};

const getRecipeByName = async (name) => {
  const dbRecipe = await Recipe.findAll({ where: { name } }); // aplicar LIKE
  const apiRecipesFull = await axios.get(
    "https://api.spoonacular.com/recipes?api_key=${API_KEY}"
  ).data;
  const apiRecipes = cleanArray(apiRecipesFull);
  const filteredApi = apiRecipes.filter((recipe) => recipe.name === name); // aplicar includes

  return [...dbRecipe, ...filteredApi];
};
module.exports = {
  createRecipe,
  getRecipeById,
  getAllRecipes,
  getRecipeByName,
};

// const axios = require("axios");
// const { Recipe } = require("../db");
// const { API_KEY } = process.env;

// const getApiData = async () => {
//   //Solicitud GET a la API
//   let recipes = await axios.get(
//     // "http://localhost:8080"
//     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
//   );
//   // iterar sobre cada recipe
//   await recipes.data.map((recipe) => {
//     let recipeDet = {
//       id: recipe.cca3,
//       name: recipe.title,
//       image: recipe.image,
//       summary: recipe.summary,
//       healthScore: recipe.healthScore,
//       instructions: recipe.instructions,
//     };
//     //si esta creado el recipe no se crea de nuevo
//     Recipe.findOrCreate({ where: recipeDet });
//   });
// };

// module.exports = getApiData;
