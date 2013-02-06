<?php
include 'configs/config.php';
include 'class/database/db.php';

$db=new DB("127.0.0.1","root","string");

$db->connectDB("test");
$array=$db->execute("select * from test");
$tpl->assign("array",$array);
$tpl->assign("title","itRunner");
$tpl->assign("content","It's my body");
$tpl->display("test.html");//show page with /templates/test.html
?> 