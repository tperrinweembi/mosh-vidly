const config = require("config");
const morgan = require("morgan");
const appLogger = require("../middleware/error");
// const startupDebugger = require("debug")("app:startup");
// const dbDebugger = require("debug")("app:db");
const debug = require("debug")("app:all-dev");

//////////////////////////////////////
// ENVIRONMENT CONFIGURATION
function setConfig(app) {
	appLogger.consoleLogger.log({
		level: "info",
		message: "APP : " + config.get("name"),
	});
	// Checks for email password setup
	if (!config.has("email.password")) {
		appLogger.consoleLogger.log({
			level: "info",
			message:
				"FATAL ERROR: email paswword is not defined. Use set vidly_email_pwd=pass.",
		});
		process.exit(1);
	} else {
		// Displays environment
		appLogger.consoleLogger.log({
			level: "info",
			message: "Email Server: " + config.get("email.host"),
		});
	}
	// Enables Morgan debug on development environment
	if (config.get("environment") === "development") {
		app.use(morgan("combined")); // combined, dev, short, tiny
		appLogger.consoleLogger.log({
			level: "info",
			message: "Morgan enabled....",
		});
	}
	// Checks for json web token password setup
	if (!config.has("jwtPrivateKey")) {
		throw new Error(
			"FATAL ERROR: jwtPrivateKey is not defined. Use set vidly_jwt=pass."
		);
	}
}

//////////////////////////////////////
// EXPORTS MODULE
module.exports = setConfig;
//////////////////////////////////////
