const axios = require("axios");
require("dotenv").config();
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;

const getRecipes = async (req, res) => {
  try {
    const response = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=${API_KEY}&addRecipeInformation=true`
    );
    const { name } = req.query;
    const { results } = response.data;

    const apiRec = results.map((e) => {
      return {
        id: e.id,
        name: e.title,
        imagen: e.image,
        summary: e.summary,
        healthScore: e.healthScore,
        instructions: e.analyzedInstructions[0]
          ? e.analyzedInstructions[0].steps.map((s) => s.step).join(" ")
          : "",
        dietas: e.diets.map((e) => {
          return {
            name: e,
          };
        }),
      };
    });

    const dbRecipes = await Recipe.findAll({
      include: {
        model: Diet,
      },
    }).then((data) =>
      data.map((e) => {
        return {
          id: e.id,
          name: e.name,
          imagen: e.imagen,
          summary: e.summary,
          healthScore: e.healthScore,
          instructions: e.instructions,
          diet: e.diets.map((e) => {
            return {
              name: e.name,
            };
          }),
        };
      })
    );

    const combinedRecipes = apiRec.concat(dbRecipes);

    const nameRegex = /^[A-Za-z\s]+$/;

    if (name) {
      if (nameRegex.test(name)) {
        const filtered = combinedRecipes.filter((e) =>
          e.name.toLowerCase().includes(name.toLowerCase())
        );
        res.status(200).json(filtered);
      } else {
        res.status(400).json({ error: "Invalid name format" });
      }
    } else {
      res.status(200).json(combinedRecipes);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getRecipes };
