// JavaScript Document
jQuery.noConflict();
(function($) { 
	$(function() {
		
	var fball_facebook_connect = function() {
			var facebook_auth = $('#fball_facebook_auth');
			var client_id = facebook_auth.find('input[type=hidden][name=client_id]').val();
			var redirect_uri = facebook_auth.find('input[type=hidden][name=redirect_uri]').val();

			if(client_id == "") {
				alert("You have not configure facebook api settings.")
			} else {
				myWindow=window.open('','','scrollbars=no,menubar=no,height=400,width=800,resizable=yes,toolbar=no,status=no');
                myWindow.document.write("<p style='color:red;'>For facebook login works you need to upgrade your module. For upgrade go to <a href='http://sourceaddons.com' target='_blank'>www.sourceaddons.com</a> and download the module zip from downloads section of site.</p>")
                myWindow.focus()
			}
		};

		$(".fball_login_facebook").click(function() {
			fball_facebook_connect();
		});
   });
})(jQuery);
