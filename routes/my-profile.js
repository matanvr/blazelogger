var data = require("../data.json");

exports.initialize = function(req, res) {   
	// Your code goes here
	var data = require('../data.json');
	var studentID = req.session.userID;
	if(studentID == undefined){
		res.render('./index');
	}
	var output = {};
	output.info = data.Students[studentID];
	output.current_classes = [];
	output.previous_classes = [];
	for (var current in data.Students[studentID].quarters){

		for (var i = 0; i < data.Students[studentID].quarters[current].length;i++){
			if(current != "winter2014")
				output.previous_classes.push(data.Students[studentID].quarters[current][i]);
			else
				output.current_classes.push(data.Students[studentID].quarters[current][i]);
		}
	}
	res.render('my-profile',output);
}

var fs = require('fs');

exports.upload = function(req, res) {
	var userFile = require("../data.json");

	fs.readFile(req.files.image.path, function (err, data) {

		var imageName = req.files.image.name
		var newPath = "./public/uploads/fullsize/" + req.session.userID +".jpg";
		/// If there's an error
		if(!imageName){

			console.log("There was an error")
			res.redirect("/");
			res.end();

		} else {

		   console.log(newPath);
		  /// write file to uploads/fullsize folder
		  fs.writeFile(newPath, data, function (err) {
		  });
		  userFile.Students[req.session.userID].imageURL = "uploads/fullsize/" + req.session.userID + ".jpg";

		  res.redirect('my-profile');
		}
	});
}

exports.updateName = function(req, res) {
	console.log("update name");
	data.Students[req.session.userID].firstName = req.body.firstname;
	data.Students[req.session.userID].lastName = req.body.lastname;
	res.json("Success");
}

exports.updateEmail = function(req, res) {
	console.log("update email");
	data.students[req.session.userID].email = req.body.email;
	res.json("Success");
}

exports.updatePassword = function(req, res) {
	console.log("update password");
	data.students[req.session.userID].password = req.body.password;
	res.json("Success");
}

