const { Router } = require("express");

//Importar controladores
const dietsRouter = Router();
const { getDiets } = require("../handlers/dietsHandlers");

//Solicitud GET a la ruta

dietsRouter.get("/", getDiets);

module.exports = dietsRouter;
