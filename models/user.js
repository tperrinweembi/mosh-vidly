const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const debug = require("debug")("app:all-dev");

//////////////////////////////////////
// DEFINES USER SCHEMA AND MODEL
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 50,
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024,
	},
	isAdmin: Boolean,
	// roles: [],
	// operations: []
});
userSchema.methods.generateAuthToken = function () {
	// JSON WEB TOKEN: sign(payload, key)
	const token = jwt.sign(
		{
			_id: this._id,
			isAdmin: this.isAdmin,
		},
		config.get("jwtPrivateKey")
	);
	return token;
};
const User = mongoose.model("User", userSchema);
//////////////////////////////////////

//////////////////////////////////////
// USER VALIDATION
function validateUser(proposedUser) {
	const userValidation = {
		name: Joi.string().min(2).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(1024).required(),
		// isAdmin: Joi.boolean().required(),
	};

	return Joi.validate(proposedUser, userValidation);
}
//////////////////////////////////////

//////////////////////////////////////
// EXPORTS MODULE
module.exports.User = User;
module.exports.validateUser = validateUser;
//////////////////////////////////////
