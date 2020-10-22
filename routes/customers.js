const auth = require("../middleware/auth");
const { Customer, validateCustomer } = require("../models/customer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const debug = require("debug")("app:all-dev");
const validate = require("../middleware/validate");

//////////////////////////////////////
// GETS ALL CUSTOMERS
router.get("/", async (req, res) => {
	const customers = await Customer.find().sort("name");
	res.send(customers);
});
//////////////////////////////////////

//////////////////////////////////////
// POSTS NEW CUSTOMER
router.post("/", [auth, validate(validateCustomer)], async (req, res) => {
	const customer = new Customer({
		name: req.body.name,
		phone: req.body.phone,
		isGold: req.body.isGold,
	});
	await customer.save();

	res.send(customer);
});
//////////////////////////////////////

//////////////////////////////////////
// UPDATES A CUSTOMER
router.put("/:id", auth, async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			isGold: req.body.isGold,
			phone: req.body.phone,
		},
		{ new: true }
	);

	if (!customer)
		return res
			.status(404)
			.send("The customer with the given ID was not found.");

	res.send(customer);
});
//////////////////////////////////////

//////////////////////////////////////
// DELETES A CUSTOMER
router.delete("/:id", auth, async (req, res) => {
	const customer = await Customer.findByIdAndRemove(req.params.id);

	if (!customer)
		return res
			.status(404)
			.send("The customer with the given ID was not found.");

	res.send(customer);
});
//////////////////////////////////////

//////////////////////////////////////
// GETS A CUSTOMER
router.get("/:id", async (req, res) => {
	const customer = await Customer.findById(req.params.id);

	if (!customer)
		return res
			.status(404)
			.send("The customer with the given ID was not found.");

	res.send(customer);
});
//////////////////////////////////////

//////////////////////////////////////
// EXPORTS MODULE
module.exports = router;
//////////////////////////////////////
