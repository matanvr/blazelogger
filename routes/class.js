
exports.initialize = function(req, res) {   
	// Your code goes here
	
	var studentID = req.session.userID;
	
	if(studentID == undefined){
		res.render('./index');
	}
	var data = require('../data.json');
	var allClasses = data.Classes;
	var allUsers = data.Students;
	var classData = req.query;
	var output = {};
	output.students = [];
	output.user = data.Students[req.session.userID];

	output.classInfo = classData;
	for (var i = 0; i < data.Classes.length; i++){
	
		if(classData.sectionID == allClasses[i].section){
			for (var s = 0; s < allClasses[i].students.length;s++){

				for(var a = 0; a < allUsers.length; a++){	
					//console.log(allClasses[i].students[s]);
					if(allClasses[i].students[s] && allClasses[i].students[s].id == allUsers[a].id){
						if(allUsers[a].id == studentID)
							allUsers[a].clickable = false;
						else
							allUsers[a].clickable = true;
						
						output.students.push(allUsers[a]);
						break;
					}
				}
			}
		}
	}
	output.group = true;
	res.render('class',output);

}

