const { Router } = require("express");

// Importar todos los routers

const recipesRouter = require("./recipesRouter");
const dietsRouter = require("./dietsRouter");

const router = Router();

// Configurar los routers

router.use("/recipes", recipesRouter);
router.use("/diets", dietsRouter);

module.exports = router;
