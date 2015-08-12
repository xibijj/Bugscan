<?php
require_once(dirname(__FILE__).'/include/config.inc.php');
$id= $_GET['id'];
$info= $_GET['info'];
$type= $_GET['type'];
$ip=$_SERVER["REMOTE_ADDR"];
if ($id)
{
	$fs = $db->fetch_assoc("select title from ##_exploit where dir='{$type}'");
	$arr["taskid"] = $id;
	$arr["info"] = $info;
	$arr["type"] = $fs['title'];
	$arr["report_ip"] = $ip;
	$arr["addtime"] = time();
	$db->insert_into("##_report",$arr);
}

?>