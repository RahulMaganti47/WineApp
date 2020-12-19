var db = require('../models/dynamodb.js');

var getHome = function(req, res) {
	res.render('home.ejs', {message : ''});
};
var checkID = function(req, res) {
    var id = req.body.id;

    console.log("this is " + id);

    var valid = id != "";

    if (valid) {
        db.idExists(id, function(exists) {
            if (exists) {
                res.send(JSON.stringify({message: 'successfully found identification number'}));
            } else {
                res.send(JSON.stringify({message: 'identification number not found'}));
            }
        }); 
    } else {
        res.send(JSON.stringify({message: 'must fill out identification number'}))
    }
}

var getFeed = function(req, res) {
	
	// currUser = req.session.user;

	// db.getPostsFeed(req.session.user, function(postArray) { //pass in the currUser's friends
	// 	db.getAccount(currUser, function(acc) {
	// 		res.render('feed.ejs', {posts : postArray, user : acc.attrs}); //RENDERING FEED.
	// 	});
    // });
    
    res.render('feed.ejs', {id : ''});
};

var routes = {
    get_home : getHome,
    check_id : checkID,
    get_feed : getFeed,
};

module.exports = routes;