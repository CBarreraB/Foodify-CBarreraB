const { Router } = require("express");

//Importar controladores
const dietsRouter = Router();
const { getDiets } = require("../handlers/dietsHandlers");

//Solicitud GET a la ruta

dietsRouter.get("/diets", getDiets);

module.exports = dietsRouter;
