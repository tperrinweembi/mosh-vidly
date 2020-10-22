const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const debug = require("debug")("app:all-dev");
const moment = require("moment");

//////////////////////////////////////
// DEFINES RENTAL SCHEMA AND MODEL
const rentalSchema = new mongoose.Schema({
	customer: {
		type: new mongoose.Schema({
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
		}),
		required: true,
	},
	movie: {
		type: new mongoose.Schema({
			title: {
				type: String,
				required: true,
				trim: true,
				minlength: 5,
				maxlength: 255,
			},
			dailyRentalRate: {
				type: Number,
				required: true,
				min: 0,
				max: 255,
			},
		}),
		required: true,
	},
	dateOut: {
		type: Date,
		required: true,
		default: Date.now,
	},
	dateReturned: {
		type: Date,
	},
	rentalFee: {
		type: Number,
		min: 0,
	},
});
// STATIC METHOD (at the class level)
rentalSchema.statics.lookup = function (customerId, movieId) {
	return this.findOne({
		"customer._id": customerId,
		"movie._id": movieId,
	});
};
// INSTANCE METHOS (at the instance level)
rentalSchema.methods.return = function () {
	// Calculates rental feee
	this.dateReturned = Date.now();

	const rentalDays = moment().diff(this.dateOut, "days");
	this.rentalFee = rentalDays * this.movie.dailyRentalRate;
};

const Rental = mongoose.model("Rental", rentalSchema);
//////////////////////////////////////

//////////////////////////////////////
// RENTAL VALIDATION
function validateRental(proposedRental) {
	const rentalValidation = {
		customerId: Joi.objectId().required(),
		movieId: Joi.objectId().required(),
	};

	return Joi.validate(proposedRental, rentalValidation);
}
//////////////////////////////////////

//////////////////////////////////////
// EXPORTS MODULE
module.exports.rentalSchema = rentalSchema;
module.exports.Rental = Rental;
module.exports.validateRental = validateRental;
//////////////////////////////////////
