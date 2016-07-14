

var data = require("../mapping_jsons/sqoopmapping_success.json");
var log_directory = "mapping_jsons";

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};



exports.initialize = function(req, res) {
	// Your code goes here

	var mapping = data;
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
      var fileName = stat.name.split("_");

      var object = {
        name:  fileName[0],
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



