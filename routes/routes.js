var db = require('../models/mongodb.js');

var getHome = function(req, res) {
	res.render('home.ejs', {message : 'home page'});
};

var routes = {
	get_home : getHome,
};

module.exports = routes;