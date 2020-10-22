const Joi = require("joi");
const { Rental } = require("../models/rental");
const { Movie } = require("../models/movie");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const moment = require("moment");
const validate = require("../middleware/validate");

//////////////////////////////////////
// POSTS NEW RETURN
router.post("/", [auth, validate(validateReturn)], async (req, res) => {
	// Checks a rental exists for this customer/movie
	const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

	if (!rental) return res.status(404).send("Rental not found");

	// Checks rental is not already returned
	if (rental.dateReturned) {
		return res.status(400).send("Rental already processed");
	}

	// PROCESSES RETURN
	rental.return();
	await rental.save();
	// Increases movie stock
	await Movie.updateOne(
		{ _id: rental.movie._id },
		{
			$inc: { numberInStock: 1 },
		}
	);

	// Returns the rental on success
	return res.send(rental);
});
//////////////////////////////////////

//////////////////////////////////////
// RETURN VALIDATION
function validateReturn(proposedReturn) {
	const returnValidation = {
		customerId: Joi.objectId().required(),
		movieId: Joi.objectId().required(),
	};

	return Joi.validate(proposedReturn, returnValidation);
}
//////////////////////////////////////

//////////////////////////////////////
// EXPORTS MODULE
module.exports = router;
//////////////////////////////////////
