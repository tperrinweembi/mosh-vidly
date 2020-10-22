const appLogger = require("./middleware/error");
const morgan = require("morgan");

const express = require("express");
const app = express();

//////////////////////////////////////
// LOADS STARTUP MODULES
require("./startup/config")(app);
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/views")(app);
require("./startup/validation")();
require("./startup/prod")(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//////////////////////////////////////
// APP IS LISTENING!
const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
	appLogger.consoleLogger.log({
		level: "info",
		message: "Listening on port" + port + "...",
	})
);
module.exports = server;
