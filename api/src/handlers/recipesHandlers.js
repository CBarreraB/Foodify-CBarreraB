const { Recipe, Diet } = require("../db");

const getRecipes = async (req, res) => {
  try {
    const { name } = req.query;

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

    const nameRegex = /^[A-Za-z\s]+$/;

    if (name) {
      if (nameRegex.test(name)) {
        const filtered = dbRecipes.filter((e) =>
          e.name.toLowerCase().includes(name.toLowerCase())
        );
        res.status(200).json(filtered);
      }
    } else {
      res.status(200).json(dbRecipes);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecipe = async (req, res) => {
  try {
    const { idRecipe } = req.params;
    const expresionR = /^[0-9]+$/;
    let data;
    if (expresionR.test(idRecipe)) {
      data = await Recipe.findOne({
        where: {
          id: idRecipe,
        },
        include: {
          model: Diet,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postRecipe = async (req, res) => {
  try {
    const { name, imagen, summary, healthScore, instructions, diets } =
      req.body;
    const newRecipe = await Recipe.create({
      name,
      imagen,
      summary,
      healthScore,
      instructions,
    });
    const dbDiets = await Diet.findAll({
      where: {
        name: diets,
      },
    });
    await newRecipe.addDiets(dbDiets);
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getRecipes, getRecipe, postRecipe };
