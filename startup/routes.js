const express = require("express");

//////////////////////////////////////
// GETS ROUTE DEFINITIONS
const genresRouter = require("../routes/genres");
const customersRouter = require("../routes/customers");
const moviesRouter = require("../routes/movies");
const rentalsRouter = require("../routes/rentals");
const indexRouter = require("../routes/home");
const usersRouter = require("../routes/users");
const authRouter = require("../routes/auth");
const returnsRouter = require("../routes/returns");
const error = require("../middleware/error");

//////////////////////////////////////
// SETS UP ROUTES
function setRouters(app) {
	app.use(express.json());

	app.use("/", indexRouter);
	app.use("/api/genres", genresRouter);
	app.use("/api/customers", customersRouter);
	app.use("/api/movies", moviesRouter);
	app.use("/api/rentals", rentalsRouter);
	app.use("/api/users", usersRouter);
	app.use("/api/auth", authRouter);
	app.use("/api/returns", returnsRouter);

	// Error middleware
	app.use(error);
}
//////////////////////////////////////

//////////////////////////////////////
// EXPORTS MODULE
module.exports = setRouters;
//////////////////////////////////////
