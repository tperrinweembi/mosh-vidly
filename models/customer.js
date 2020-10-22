const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const debug = require("debug")("app:all-dev");

//////////////////////////////////////
// DEFINES CUSTOMER SCHEMA AND MODEL
const customerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
	isGold: {
		type: Boolean,
		default: false,
	},
	phone: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
});
const Customer = mongoose.model("Customer", customerSchema);
//////////////////////////////////////

//////////////////////////////////////
// CUSTOMER VALIDATION
function validateCustomer(proposedCustomer) {
	const customerValidation = {
		name: Joi.string().min(5).max(50).required(),
		phone: Joi.string().min(5).max(50).required(),
		isGold: Joi.boolean(),
	};

	return Joi.validate(proposedCustomer, customerValidation);
}
//////////////////////////////////////

//////////////////////////////////////
// EXPORTS MODULE
module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;
//////////////////////////////////////
