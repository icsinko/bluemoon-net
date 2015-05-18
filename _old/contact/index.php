<?php
if($_POST["mode"] == "send"){
	$time = date("Y/m/d H:i:s",time());
	$host = $_SERVER['HTTP_HOST'].$_SERVER['REMOTE_ADDR'].$_SERVER['HTTP_USER_AGENT'];
	$msg = '
	ウェブサイトよりお問い合わせがありました。
	===============================================
	問い合わせ日時：'.$time.'
	名前：'.$_POST["name01"].' '.$_POST["name02"].'
	Email:'.$_POST["mail"].'
	問い合わせ内容：
	'.$_POST["comment"].'
	===============================================
	'.$host.'
	';
	$mailto = "info@bluemoon-net.jp";
	$title = "Message from website www.bluemoon-net.jp";
	$body = $msg;
	$headers .= 'From: BlueMoon-net. <info@bluemoon-net.jp>' . "\r\n";
	mb_language("japanese");
	mb_internal_encoding("UTF-8");
	$title = mb_encode_mimeheader($title);
	$body = mb_convert_encoding($msg,"JIS");
	$mail = mb_send_mail($mailto,$title,$body,$headers);
}
?>
<!DOCTYPE HTML>
<html lang="ja-JP">
<head>
<meta charset="UTF-8">
<title>BLUEMOON-NET</title>
<link href="../common/css/style.css" rel="stylesheet" type="text/css" media="all" />
<link href="../common/css/design.css" rel="stylesheet" type="text/css" media="all" />
<link href="../common/css/dev.css" rel="stylesheet" type="text/css" media="all" />
<script type="text/javascript" src="../common/js/jquery-1.6.4.min.js"></script>
<script type="text/javascript" src="../common/js/jquery.easing.1.3.js" language="JavaScript"></script>
<script type="text/javascript" src="../common/js/slidebreadcrumbslist.js" language="JavaScript"></script>
<script type="text/javascript" src="../common/js/menu.js"></script>
<script type="text/javascript" src="../common/js/contact.js"></script>
<script type="text/javascript">
$(function() {
});
</script>
</head>

<body>
<div id="wrapper">
	<?php include '../temp/header.php'; ?>
	<?php include '../temp/menu.php'; ?>
    <div id="contents">
		<ul id="breadcrumbslist">
           	<li class="home"><a href="/">HOME</a></li>
           	<li class="current"><span>Contact</span></li>
        </ul>
		<div class="section" id="contact">
			<h2 class="sideTtl">Contact</h2>
            <form method="post" action="#">
            <input type="hidden" name="mode" value="send" />
                <dl>
                    <dt>氏名</dt>
                    <dd><input type="text" name="name01" value="" /> <input type="text" name="name02" value="" /></dd>
                    <dt>メールアドレス</dt>
                    <dd><input type="text" name="mail" value="" size="40" /></dd>
                    <dt>お問い合わせ内容</dt>
                    <dd><textarea cols="40" rows="6" name="comment"></textarea></dd>
                </dl>
                <p class="btnSend"><span><input type="submit" name="submit" value="送信" /></span></p>
            </form>
		</div>
	</div>
	<?php include '../temp/footer.php'; ?>
</div>
</body>
</html>
