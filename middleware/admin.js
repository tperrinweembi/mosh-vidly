//////////////////////////////////////
// ROLE AUTHORISATION
function admin(req, res, next) {
	// 401 Unauthorized
	// 403 Forbidden
	if (!req.user.isAdmin) return res.status(403).send("Access denied");

	next();
}

//////////////////////////////////////
// EXPORTS MODULE
module.exports = admin;
