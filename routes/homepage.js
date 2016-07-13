var data = require("../data.json");
var log_directory = "mapping_jsons";


Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
function capitalize(s)
{
  return s[0].toUpperCase() + s.slice(1);
}

exports.initialize = function(req, res) {    
	// Your code goes here

// fs = require('fs');
// fs.readFile(log_directory, 'utf8', function (err,data) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log(data);
// });



var walk    = require('walk');
var files   = [];

// Walker options
var walker  = walk.walk(log_directory, { followLinks: false });

walker.on('file', function(root, stat, next) {
    // Add this file to the list of files
    files.push(root + '/' + stat.name);
    next();
});

walker.on('end', function() {
    console.log(files);
});



   // make list of json

	res.render('homepage');

}
exports.addClass = function(req,res) {



	var parameters = req.query;
	var newClass = {
							"id": parameters.classID,
							"name": parameters.className,
							"section": parameters.sectionID
					};

	var studentID = req.session.userID;

	if(studentID == undefined){
		res.render('./index');
	}


	data.Students[studentID].quarters[parameters.term].push(newClass);

	var classAdded = false;

	for (var i = 0; i <data.Classes.length; i++)
	{
		if(data.Classes[i].section == parameters.sectionID){
			data.Classes[i].students.push({"id": studentID});
			classAdded = true;

		}

	}
	if(!classAdded){
		newClass.students = [{"id": studentID}];
		data.Classes.push(newClass);

	}		
	//console.log(data.Students[0].quarters[parameters.term]);
	res.json({"result" : "success"});

} 

exports.removeClass = function(req,res) {
	var parameters = req.query;
	var removedClass = {
							"id": parameters.className,
							"name": parameters.className,
							"section" : parameters.sectionID
					};
	var studentID = req.session.userID;
	if(studentID == undefined){
		res.render('./index');
	}
	for (var quarterName in data.Students[studentID].quarters){
		var currentQuarter= data.Students[studentID].quarters[quarterName];
		//console.log(currentQuarter);
		for (var curCl = 0; curCl < currentQuarter.length; curCl++){
			
			currentClass = currentQuarter[curCl];
			if(removedClass.section == currentClass.section){
				console.log("removing" + removedClass);
				data.Students[studentID].quarters[quarterName].remove(curCl);

				//remove the student from the class
				for (var curr in data.Classes){

					console.log(data.Classes[curr].section + "  " + removedClass.section);
					if(data.Classes[curr].section == removedClass.section){
						for (var i = 0; i< data.Classes[curr].students.length;i++){
							if(studentID == data.Classes[curr].students[i].id){
								
								console.log(data.Classes[curr].students);
								data.Classes[curr].students.remove(i);
								console.log(data.Classes[curr].students);
								return {"result" : "success"};
							}
						}
					}
				}
				
			}
		}	
	}
	return {"result" : "failed"};

}


