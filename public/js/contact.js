$(document).ready(function () {

	/* Contact form */
	$('#contact_form').submit(function () {
		$.ajax({
			type: 'POST',
			url: '/email/',
			data: {
				name: $('#contact_form input#name').val(),
				contact: $("#contact_form input#contact").val(),
				email: $("#contact_form input#email").val(),
				subject: $("#contact_form input#subject").val(),
				detail: $("#contact_form #message").val(),
			},
			success: function(data) {
				if ( data == 'sent' ) {
					$('#contactH').html('Thanks, Your Message Has Been Sent, We hope to respond Shortly');
					$('#contactF').html(' ');
				} else if ( data == 'invalid' ) {
					$('#contact_form .status').html('Your name, email or message is invalid.');
				} else {
					$('#contact_form .status').html('E-mail could not be sent.');				
				}
			},
			error: function () {
				$('#contact_form .status').html('E-mail could not be sent, please contact D&C Surveying directly on  (02) 9568 6918');
			}
		});
		return false;
	});
});

