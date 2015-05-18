<?php
$link = mysql_connect('localhost', 'root', '');
if (!$link) {
    print(mysql_error());
}

// MySQLに対する処理

mysql_close($link);