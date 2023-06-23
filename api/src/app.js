const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routes = require("./routes/mainRouter.js");

require("./db.js");
// Crear una instancia de la aplicación Express y se le asigna el nombre "API".
const server = express();

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
// Mostrar información de registro detallada en la consola para cada solicitud
server.use(morgan("dev"));

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // actualice para que coincida con el dominio desde el que realizará la solicitud
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes); // Llegan todos los end points

// Error catching endware.
server.use((err, req, res, next) => {
  // Configuración de encabezados de respuesta para permitir solicitudes desde cualquier origen
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
