const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const policiaisRoutes = require("./routes/policiais");

const app = express();
app.use(bodyParser.json());

app.use("/policiais", policiaisRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

module.exports = app;   