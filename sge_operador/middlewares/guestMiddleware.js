function guestMiddleware(req, res, next) {
  if (req.session.userLogged) {
    return res.redirect('/becarios/perfil');
  }
  
  next();
}

module.exports = guestMiddleware;