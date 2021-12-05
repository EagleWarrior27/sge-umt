const controller = {
  principal: (req, res) => {
	  return res.render('index', { titulo: "SGE" });
  }
}

module.exports = controller;