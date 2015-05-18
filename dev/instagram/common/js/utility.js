(function( window, undefined ) {

  utility = {

		/***
		* xmlパースからリスト生成
		* パラメータ　url      xmlアドレス
		*             targetid リスト対象ID
		*             itemSet  xmlパース時の対象key : value
		* ※itemSetのname,image,urlは必須
        * https://api.instagram.com/oauth/authorize/?client_id=CLIENT ID&redirect_uri=REDIRECT URI&response_type=code
        * code=9b17243c44f84822a50fb363c5b6934d
		*/
		snsConst: function(set) {

            $("#"+set.targetid).text("loading...");
            $.ajax({
                url: "https://api.instagram.com/v1/users/self/media/recent",
                data: { access_token: set.token },
                dataType: "jsonp",
                error: function(jqXHR, textStatus, errorThrown) {
                    $("#"+set.targetid).text(textStatus);
                },
                success: function(data, textStatus, jqXHR) {
                    $("#"+set.targetid).text("");
                    for (var i = 0, length = 3; i < length; i++) {
                        var d = data.data[i];
            
                        $("#"+set.targetid).append(
                        $("<div>").addClass("instagram_photo").append($("<a>").attr("href", d.link).attr("target", "_blank").append($("<img>").attr("src", d.images.thumbnail.url).attr("alt", d.caption.text))));}
            
                    }
                });

		}

	};
//	for (var i in utility) utility[i]();
}(window));
