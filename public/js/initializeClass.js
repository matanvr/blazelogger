$(document).ready(function(event) {
	students = $('table.classmates tbody tr');
	students.filter = filterStudents;
	//console.log(students);

	$('.clickable').click(function() {
		
		//
		goToProfile($(this).parent().attr('id'));
	});
	$('.grid-clickable').click(function() {
		
		//
		goToProfile($(this).parent().parent().attr('id'));
	});

	$('#filter').keyup(function(e) {
		students.filter($('#filter').val());
	});

	$('#myModal').modal('toggle');
});



function goToProfile(studentId) {
	//console.log(studentId);
	window.location.href = "profile?id=" + studentId;
}
$('.invite').click(function(){
	$('#myModalMatanVardi').modal('hide');
	var parentDiv = $(this).parent().parent().parent().parent().parent().parent();
	parentDiv.find('.invite-button').html("<div class='btn btn-success'>   Added <span class='glyphicon glyphicon-ok'> </span> </div><br><br><button type='button' class='btn btn-success grid-clickable' data-toggle='modal' > <span class='glyphicon glyphicon-user'> </span> Profile</button> ");
	$('.grid-clickable').click(function() {
		ga("send", "event", "profileclick", "click");
		//
		goToProfile($(this).parent().parent().attr('id'));
	});
	$('.modal-backdrop').hide();
//	var addPartnerDiv = "<tr id='" +parentDiv.attr('id')+ " '>" + parentDiv.find('td').eq(0).html()+  " " + 
//	parentDiv.find('td').eq(1).html()+ " "+  parentDiv.find('td').eq(2).html() + "</tr>";
    //console.log(addPartnerDiv);

    var addPartnerDiv = "<tr id='{{id}}'>" + 
               "<td class='clickable'>" + parentDiv.find('td').eq(0).html()+ "</td>'" + 
               "<td class='clickable'>" + parentDiv.find('td').eq(1).html()+ "</td>" +  
             " </tr>";
    console.log( $('#groupmatestable tr:last'));

    $('#groupmatestable tr:last').after(addPartnerDiv);


});

// Hides rows that don't contain a match for the name
// students: array of strings that contain the names of students
// name: string to substring pattern match against list of students
function filterStudents(name) {
	name = name.toLowerCase();
	this.each(function() {
		var properties = $(this).find('td');
		//console.log(properties);
		var fullname = ($(properties[1]).text() + " " + $(properties[2]).text()).toLowerCase();
		console.log(fullname.search(name));
		console.log('fullname:' + fullname);
		console.log('name:' + name);
		if ( fullname.search(name) == -1 ) {
			console.log("hide " + fullname);
			$(this).hide();
		}
		else {
			console.log("don't hide " + fullname);
			$(this).show();
		}
	});
}
