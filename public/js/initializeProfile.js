

$('.classes tr').click(function() {
	var courseName = $(this).find('td').html();
	var className = $(this).find('td').eq(1).html();
	var sectionID = $(this).find('td').eq(2).html();
	window.location.href = "class?courseName=" + courseName + "&className=" + className 
	+ "&sectionID=" + sectionID;
});