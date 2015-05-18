// JavaScript Document
(function($) {

	$(function() {
		var layoutOptions = {
			north__closable: false,
			north__resizable: false,
			west__closable: false,
			west__size: 90,
			east__initClosed: true,
			east__spacing_open: 48,
			east__spacing_closed: 48,
			east__togglerAlign_open: "top",
			east__togglerAlign_closed: "top",
			east__togglerContent_open: "<img src='../../../../layout02/common/js/common/images/arrow-right.png'>",
			east__togglerContent_closed: "<img src='../../../../layout02/common/js/common/images/arrow-left.png'>"
		};

		$("#wrapper").layout(layoutOptions);
		
	});

}(jQuery));
