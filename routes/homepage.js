

var data = require("../data.json");
var log_directory = "mapping_jsons";

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

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

	var mapping = require("../Mapping1.json");

  // require("jsdom").env("", function(err, window) {
  // 	if (err) {
  // 		console.error(err);
  // 		return;
  // 	}
  //
  // 	var $ = require("jquery")(window);
  //
  //
  // });

	// var walk    = require('walk');
	// var files   = [];
  //
	// // Walker options
	// var walker  = walk.walk(log_directory, { followLinks: false });
  //
	// walker.on('file', function(root, stat, next) {
	//     // Add this file to the list of files
	//     var status = 0;
	//     if (stat.name.endsWith('success.json') ){
	//     	 status = 1;
	//     }
  //
	//     var object = {
	//     	name: root + '/' + stat.name,
	//     	status: status
	//     };
  //
	//     files.push(object);
	//     next();
	//     console.log(files);
	// });
  //
	res.render('homepage',{"mapping":mapping, "mappings": [] });

}

exports.listMappings = function(req, res){
  var walk    = require('walk');
  var files   = [];

  // Walker options
  var walker  = walk.walk(log_directory, { followLinks: false });

  walker.on('file', function(root, stat, next) {
      // Add this file to the list of files
      var status = 0;
      if (stat.name.endsWith('success.json') ){
         status = 1;
      }

      var object = {
        name: root + '/' + stat.name,
        status: status
      };

      files.push(object);
      next();
      console.log("inside walker " + files);
  });

  walker.on('end', function() {
      console.log("End of walker " + files);
      res.json(files);
  });

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


