const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const debug = require("debug")("app:all-dev");

//////////////////////////////////////
// DEFINES GENRE SCHEMA AND MODEL
const genreSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
});
const Genre = mongoose.model("Genre", genreSchema);
//////////////////////////////////////

//////////////////////////////////////
// GENRE VALIDATION
function validateGenre(proposedGenre) {
	const genreValidation = {
		name: Joi.string().min(5).max(50).required(),
	};

	return Joi.validate(proposedGenre, genreValidation);
}
//////////////////////////////////////

//////////////////////////////////////
// EXPORTS MODULE
module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validateGenre = validateGenre;
//////////////////////////////////////
