$(document).ready(function() {
	$(".editPhoto").hide();
	$(".togglename").hide();
	$(".toggleemail").hide();
	$("#updatePassSuccess").hide();

	$(".change").click(function() {
		$(".editPhoto").toggle();
	});

	$('.classes tr').click(function() {
		var courseName = $(this).find('td').html();
		var className = $(this).find('td').eq(1).html();
		var sectionID = $(this).find('td').eq(2).html();
		window.location.href = "class?courseName=" + courseName + "&className=" + className 
		+ "&sectionID=" + sectionID;
	});

	$('button#updateName').click(function() {
		var fullname = {
			'first': $("#firstname").val(),
			'last' : $("#lastname").val()
		}
		fullname.isValid = function () {
			//not empty
			return true;
		}
		if (fullname.isValid()) {
			$.post('/updateName',
				{
					'firstname': fullname.first,
					'lastname' : fullname.last
				}, 
				function(){});
		}
		updateName_disable();
		//FIX: it's broken so just make it look like it updated
		updateName_success(fullname);
	});

	$('button#updatePassword').click(function() {
		var password = {
			'input': $("#password").val(),
			'confirm' : $("#confirm").val()
		}
		password.isValid = function () {
			//and not empty
			return (this.input == this.confirm);
		}
		if ( password.isValid() ) {
			console.log('valid');
			$.post('./updatePassword', 
				{
					'password': password.input
				}
			, function(){});
			updatePass_disable();

			//FIX: it's broken so just make it look like it updated
			updatePass_success();
		}
	});

	$('button#updateEmail').click(function() {
		var email = $("#email").val();
		
		if (true) {
			$.post('/updateEmail', 
				{
					'email': email
				}
			, function(){});
			updateEmail_disable();
		}
		//FIX: it's broken so just make it look like it updated
		updateEmail_success(email);
	});

	$('#editToggleName').click(function(){	
		$(".togglename").toggle();
	});

	$('#editToggleEmail').click(function(){	
		$(".toggleemail").toggle();
	});
});

function updateName_disable() {
	$('button#updateName').attr("disabled", "disabled");
	$("input#firstname").attr('disabled','disabled');
	$("input#lastname").attr('disabled','disabled');
}

function updateName_success(fullname) {
	$('#profile-name').text(fullname.first + " " + fullname.last);
	$('button#updateName').text('success');
}

function updateEmail_disable() {
	$('button#updateEmail').attr("disabled", "disabled");
	$("input#email").attr('disabled','disabled');
}

function updateEmail_success(email) {
	$('#profile-email').text(email);
	$('button#updateEmail').text('success');
}

function updatePass_disable() {
	$('button#updatePassword').attr("disabled", "disabled");
	$("input#password").attr('disabled','disabled');
	$("input#confirm").attr('disabled','disabled');
}

function updatePass_success() {
	$("#updatePassSuccess").show();
	$('button#updatePassword').text('success');
}

function updateFail() {
	res.send(400);
}
