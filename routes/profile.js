//var data = require("../data.json");

var data = require("../data.json");

exports.initialize = function(req, res) {    
	// Your code goes here
	var data = require('../data.json');
    var myStudentID = req.session.userID;
	var studentID = req.query.id;
	
	console.log(studentID + " " + myStudentID );
	if(myStudentID == undefined){
		console.log(studentID + " " + myStudentID );
		res.redirect('./');
	}

	if(myStudentID == studentID){
		res.redirect('my-profile');
	}
	var output = {};
	output.current_classes = [];
	output.previous_classes = [];
  	output.previous_classes_mutual = [];
  	output.current_classes_mutual = [];
    //finds all the other users classes
	for (var current in data.Students[studentID].quarters){

		for (var i = 0; i < data.Students[studentID].quarters[current].length;i++){
			output.info = data.Students[studentID];
			if(current != "winter2014")
				output.previous_classes.push(data.Students[studentID].quarters[current][i]);
			else
				output.current_classes.push(data.Students[studentID].quarters[current][i]);
			
		}
	}
	
	//finds all mutual classes between two users
	for (var current in data.Students[myStudentID].quarters){
		var currentTerm = data.Students[myStudentID].quarters[current];
		for (var i = 0; i < currentTerm.length;i++){
			if(current != "winter2014"){

				for(var j = 0; j < output.previous_classes.length;j++){
					

					if(currentTerm[i].section == output.previous_classes[j].section){
						console.log(currentTerm[i].section + " " + output.previous_classes[j].section);
						output.previous_classes_mutual.push(currentTerm[i]);
					}
				}
			}
			else{
				for(var j = 0; j < output.current_classes.length;j++){
					if(currentTerm[i].section == output.current_classes[j].section)
						output.current_classes_mutual.push(currentTerm[i]);
				}
			}
		}

	}
	console.log(output.previous_classes_mutual);
	
	res.render('profile',output);

 }