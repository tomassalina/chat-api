const express = require("express");
const app = express();
const server = require("http").Server(app);

const config = require("./config");

const cors = require("cors");
const bodyParser = require("body-parser");
const socket = require("./socket");
const db = require("./db");
const router = require("./network/routes");

db(config.dbUrl);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

socket.connect(server);

router(app);

// _____Servir arhivos estáticos
app.use(config.publicRoute, express.static("./public"));

server.listen(config.port, () => {
  console.log(`La aplicacion está escuchando en ${config.host}:${config.port}`);
});
