const { Op } = require("sequelize");
const { Diets } = require("../db");

//?GET | /diets: Obtiene un arreglo con todos los tipos de dietas existentes.

const getDiets = async (req, res) => {
  try {
    // Obtener todos los registros  de Diets de la db
    const allDiets = await Diets.findAll();
    // Enviar respuesta cod 200 y todas las actividades en .json
    res.status(200).json(allDiets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getDiets,
};
