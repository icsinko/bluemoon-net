<script>
var b = checkBrowser();
if (b == "chrome") {
        Modernizr.addTest('backgroundclip',function(){
 
          var div = document.createElement('div');
          if ('backgroundClip' in div.style) {
						return true;
					}
          'Webkit Moz O ms Khtml'.replace(/([A-Za-z]*)/g,function(val){
            if (val+'BackgroundClip' in div.style) {
							return true;
						}
          });
 
        });
}
</script>
<div id="header" class="gradient">
    <h1>BlueMoon-Net</h1>
</div><!--header-->
