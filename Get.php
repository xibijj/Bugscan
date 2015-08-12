<?php
require(dirname(__FILE__).'/include/config.inc.php');
$ip=$_SERVER["REMOTE_ADDR"];
$fs = $db->fetch_assoc("select * from ##_task_list where user = '{$u}' and status=1");
if ($fs['task']){
	echo file_get_contents(dirname(__FILE__)."/plus/{$fs['task']}.py");
	echo ':|:'.$fs['url'].':|:'.$fs['report_id'];
	$addtime=time();
	$db->fetch_assoc1("update ##_task_list set status=0,exec_ip='{$ip}',exec_time=$addtime where id = {$fs['id']}");
}
?>