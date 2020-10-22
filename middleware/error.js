// Winston severity order :
// error
// warn
// info
// verbose
// debug
// silly
const { createLogger, format, transports } = require("winston");
const config = require("config");

//////////////////////////////////////
// SETS UP ERROR LOGGER
const errorLogger = createLogger({
	format: format.combine(
		format.timestamp({
			format: "YYYY-MM-DD HH:mm:ss",
		}),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
	transports: [
		new transports.Console(),
		new transports.File({ filename: "logger.log" }),
	],
	json: false,
});
//////////////////////////////////////

//////////////////////////////////////
// SETS UP CONSOLE LOGGER
const consoleLogger = createLogger({
	format: format.combine(
		format.timestamp({
			format: "YYYY-MM-DD HH:mm:ss",
		}),
		// format.errors({ stack: true }),
		// format.splat(),
		// format.json(),
		format.printf((i) => `${i.level} | ${i.timestamp} | ${i.message}`)
	),
	json: false,
	transports: [new transports.Console()],
});
// disables console logging while running tests
if (config.get("environment") === "test")
	consoleLogger.transports[0].silent = true;
//////////////////////////////////////

//////////////////////////////////////
// ERROR HANDLER
function errorHandler(err, req, res, next) {
	const error_message =
		"Error in the request pipeline: " + err.message + " // " + err.stack;
	errorLogger.log({
		level: "error",
		message: error_message,
	});
	res.status(500).send(error_message);
}

//////////////////////////////////////
// EXPORTS MODULE
module.exports = errorHandler;
module.exports.errorLogger = errorLogger;
module.exports.consoleLogger = consoleLogger;
//////////////////////////////////////
