const jwt = require("jsonwebtoken");
const config = require("config");
const { escapeRegExp } = require("lodash");

//////////////////////////////////////
// USER AUTHORISATION
function auth(req, res, next) {
	// Checks authorizarion
	const token = req.header("x-auth-token");
	if (!token) {
		res.status(401).send("Access denied, no token provided.");
		return;
	}

	try {
		const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
		// available user properties are defined by the given paylod in the user model
		req.user = decoded;
		next();
	} catch (err) {
		res.status(400).send("Invalid token.");
	}
}

//////////////////////////////////////
// EXPORTS MODULE
module.exports = auth;
