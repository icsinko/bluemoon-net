$(function(){
	$.ajax({
    url: 'xml/img.xml',
    type: 'GET',
    dataType: 'xml',
    timeout: 1000,
    error: function(){
        console.log("xmlerror");
    },
    success: function(xml){
        $(xml).find("row").each(function(){
            var id = $(this).attr('id');
            var url = $(this).find('url').text();
            var alt = $(this).find('alt').text();

            $("<li></li>").html('<a href="../../../../slide/'+url+'"><img src="../../../../slide/common/js/common/images/'+id+'.jpg" alt="'+alt+'"></a>').appendTo('ul.main-image');

            $("<li></li>").html('<a href="../../../../slide/'+url+'"><img src="../../../../slide/common/js/common/images/'+id+'s.jpg" alt="'+alt+'"></a>').appendTo('ul.navi');

        });
        
        $('#contents').imageNavigation({
        });
    }
    });
});

