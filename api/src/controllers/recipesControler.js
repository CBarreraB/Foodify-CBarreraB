const axios = require("axios");
const { Recipe } = require("../db");
const { API_KEY } = process.env;

const getApiData = async () => {
  //Solicitud GET a la API
  let recipes = await axios.get(
    // "http://localhost:8080"
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
  );
  // iterar sobre cada recipe
  await recipes.data.map((recipe) => {
    let recipeDet = {
      id: recipe.cca3,
      name: recipe.title,
      image: recipe.image,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      instructions: recipe.instructions,
    };
    //si esta creado el recipe no se crea de nuevo
    Recipe.findOrCreate({ where: recipeDet });
  });
};

module.exports = getApiData;
