const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const debug = require("debug")("app:all-dev");
const { genreSchema } = require("./genre");

//////////////////////////////////////
// DEFINES MOVIE SCHEMA AND MODEL
const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 5,
		maxlength: 50,
	},
	genre: {
		type: genreSchema,
		required: true,
	},
	numberInStock: {
		type: Number,
		required: true,
		min: 0,
		max: 255,
	},
	dailyRentalRate: {
		type: Number,
		required: true,
		min: 0,
		max: 255,
	},
});
const Movie = mongoose.model("Movie", movieSchema);
//////////////////////////////////////

//////////////////////////////////////
// MOVIE VALIDATION
function validateMovie(proposedMovie) {
	const movieValidation = {
		title: Joi.string().min(5).max(50).required(),
		genreId: Joi.objectId().required(),
		numberInStock: Joi.number().min(0).required(),
		dailyRentalRate: Joi.number().min(0).required(),
	};

	return Joi.validate(proposedMovie, movieValidation);
}
//////////////////////////////////////

//////////////////////////////////////
// EXPORTS MODULE
module.exports.movieSchema = movieSchema;
module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;
//////////////////////////////////////
