


var log_directory = "mapping_jsons";

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};



exports.initialize = function(req, res) {
	// Your code goes here
    var mapping = {}
    //console.log(req.param('mapping'));
    var containerManager = [];
    if(req.param('mapping')) {
		mapping = require("../mapping_jsons/" +req.param('mapping') );
	   
	    mapping.tasklets.forEach(function(value){
	    	if (typeof containerManager[value.nodeName] === 'undefined' 
	    		||  containerManager[value.nodeName] === null){
	    		containerManager[value.nodeName] = {"name": value.nodeName,
	    											"successfulTasklets": 0,
	    											 "failedTasklets":  0 
	    											};
	    	} 
	    	if(value.isSuccessful){
	    		
	    		containerManager[value.nodeName].successfulTasklets++;
	    	} else {
	    		containerManager[value.nodeName].failedTasklets++;
	    	}
	    });
	} 
    var cmInfo = [{}];
    for (var value in containerManager){
    
    	cmInfo.push(containerManager[value]);
    };
    
	mapping.containerManager = cmInfo;


	console.log(mapping.containerManager);
	res.render('homepage',{"mapping":mapping});

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
      	fileName:  stat.name,
        name:  fileName[0],
        status: status
      };

      files.push(object);
      next();
      
  });

  walker.on('end', function() {
      res.json(files);
  });

}



