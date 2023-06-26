const { Diet } = require("../db");

//?GET | /diets: Obtiene un arreglo con todos los tipos de dietas existentes.

const getDiets = async (req, res) => {
  try {
    const response = await Diet.findAll();
    res.json(200, response);
  } catch (error) {
    res.json(400, { error: error.message });
  }
};
module.exports = {
  getDiets,
};
