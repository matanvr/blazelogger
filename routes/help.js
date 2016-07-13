var nodemailer = require("nodemailer");

exports.initialize = function(req, res) {
	// Your code goes here
	res.render('help');

}

exports.error =  function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }
}

exports.mail = function (req, res) {
	var parameters = req.body;

	var smtpTransport = nodemailer.createTransport("SMTP", {
    		host: "smtp.gmail.com", // hostname
    		secureConnection: true, // use SSL
    		port: 465, // port for secure SMTP
    		auth: {
        		user: "contact.classbook@gmail.com",
        		pass: "matanmatan"
    		}
		}
	);
	var e = parameters.name + " <contact.classbook@gmail.com>";
	
    var mailOptions = {
        from: e, // sender address
        to: "contact.classbook@gmail.com", // list of receivers
        subject: parameters.subject, // Subject line
        text: parameters.details, // plaintext body
        html: "<b>" + parameters.details + "</b>" // html body
    }

    smtpTransport.sendMail(mailOptions, exports.error);

    res.render('help', {
        'sent': true
    });
}