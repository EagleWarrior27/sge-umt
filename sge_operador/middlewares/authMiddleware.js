function authMiddleware(req, res, next) {
	if (!req.session.userLogged) {
		return res.redirect('/becarios/acceso');
	}
	next();
}

module.exports = authMiddleware;