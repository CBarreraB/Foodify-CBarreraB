const server = require("./src/app.js");
const getApiData = require("./src/controllers/recipesControler.js");
const { conn } = require("./src/db.js");
const PORT = process.env.PORT || 3001;

// Sincronizando todos los modelos a la vez.
conn.sync({ force: true }).then(() => {
  server.listen(PORT, async () => {
    await getApiData();
    console.log("DB Created");
    console.log(`Server listening at ${PORT}`); // eslint-disable-line no-console
  });
});
