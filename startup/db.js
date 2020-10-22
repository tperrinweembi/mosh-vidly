const appLogger = require("../middleware/error");
const mongoose = require("mongoose");
const config = require("config");
const debug = require("debug")("app:all-dev");

//////////////////////////////////////
// DB CONNECTION
function connectDB() {
	const dbUrl =
		config.get("environment") != "production" ? config.get("database") : "PROD";
	mongoose
		.connect(dbUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			appLogger.consoleLogger.log({
				level: "info",
				message: "Connected to DB: " + dbUrl,
			});
		});
	//.catch((err) => debug("Error connecting to DB: " + err));
	// Catch removed to be handled by the process.on("unhandledRejection")

	mongoose.set("useCreateIndex", true);
}
//////////////////////////////////////

//////////////////////////////////////
// EXPORTS MODULE
module.exports = connectDB;
//////////////////////////////////////
