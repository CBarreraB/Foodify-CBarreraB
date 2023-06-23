const { Op } = require("sequelize");
const { Recipes, Diets } = require("../db");

// GET | /recipes/name?="...": Obtiene todas las recetas que coinciden con el nombre recibido por query.
const getRecipes = async (req, res) => {
  const { name } = req.query;
  try {
    // Verificar si el parametro name esta o no presente
    if (!name) {
      // Obtener todas las recipes de la db e icluir las Diets
      const allRecipes = await Recipes.findAll({
        include: Diets,
      });
      // Enviar una respuesta cod 200 y el array de recipes
      return res.status(200).json(allRecipes);
    } else {
      // Buscar las recipes que coinciden con el nombre impuesto
      const recipes = await Recipes.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` },
        }, // Que la busqueda sea insensible a MAY o min
      });
      // Verificar si no se encontraron recipes
      if (!recipes)
        // Enviar respuesta de error cod 404
        return res
          .status(404)
          .json({ error: "Recipe not found or does not exist" });

      return res.status(200).json(recipes); // Enviar respuesta cod 200 y la recipe
    }
  } catch (error) {
    res.status(400).json({ error: error.message }); // Enviar respuesta de error cod 400 y mensaje de error
  }
};

// GET | /recipes/:idRecipe: Obtiene el detalle de una receta específica, incluyendo los tipos de dietas asociados.
const getRecipeById = async (req, res) => {
  const { id } = req.params; // Extraer el parámetro id de la solicitud
  try {
    const idRecipes = id.toUpperCase(); // Convertir id min > MAY
    const recipes = await Recipes.findOne({
      // Buscar recipe con el ID e icluir las Diets
      where: { id: idRecipes },
      include: Diets,
    });
    // Verificar si se encontró una recipe
    if (recipes) return res.status(200).json(recipes);
    // Enviar una respuesta cod 200 y la recipe
    else
      return res.status(404).send("There is no recipes with that identifier"); // Enviar respuesta de error cod 404
  } catch (error) {
    res.status(400).json({ error: error.message }); // Enviar respuesta de error cod 400 y mensaje de error
  }
};

// POST | /recipes: Crea una nueva receta y la relaciona con los tipos de dieta indicados.
const createRecipe = async (req, res) => {
  // Extraer datos del cuerpo de la solicitud
  const { name, image, summary, healthScore, diet, instructions } = req.body;
  // Crear nueva recipe en la db con los datos del form
  try {
    const recipe = await Recipes.create({
      name,
      image,
      summary,
      healthScore,
      diet,
      instructions,
    });
    // Buscar la diet solicitada en db
    const dietToAdd = await Diet.findAll({
      where: { name: diet },
    });
    if (dietsToAdd.length === 0)
      return res.status(404).json({ error: "Diet not found" });
    // Asociar las diets encontrados a la recipe creada
    await recipe.addRecipe(dietToAdd);

    // res.status(200).send("Successful post");
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getRecipes,
  getRecipeById,
  createRecipe,
};
