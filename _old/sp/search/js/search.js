$(function() {
$('div.ModuleSearchContainer').bind({
    click: function() {
        var h = $(document).height() - 30;
        $('div.Search', this).css({
            'top': '0px',
            'left': '0px',
            'height': h + 'px'
        });
    }
});

$('div.ModuleSearchContainer button.Close').bind({
    mousedown: function() {
        $('div.ModuleSearchContainer div.Search').css({
            'top': '-9999px',
            'left': '-9999px'
        });
    }
});
});
