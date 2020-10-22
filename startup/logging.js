require("express-async-errors");
const appLogger = require("../middleware/error");
const winston = require("winston");

//////////////////////////////////////
// HANDLES UNCAUGHT EXCEPTIONS
// AND UNHANDLED REJECTIONS
function setLowLevelErrorLogging() {
	process.on("uncaughtException", (ex) => {
		const error_message =
			"UNCAUGHT EXCEPTION on server low layer: " + ex.message;
		appLogger.errorLogger.log({
			level: "error",
			message: error_message,
		});
		process.exit(1);
	});
	process.on("unhandledRejection", (ex) => {
		const error_message =
			"UNHANDLED REJECTION on server low layer: " + ex.message;
		appLogger.errorLogger.log({
			level: "error",
			message: error_message,
		});
		process.exit(1);
	});
}

//////////////////////////////////////
// EXPORTS MODULE
module.exports = setLowLevelErrorLogging;
//////////////////////////////////////
