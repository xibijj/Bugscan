<?php
require_once(dirname(__FILE__).'/include/config.inc.php');
if ($_SESSION["user"]=='x')
{
	if ($_GET['do']=='update'){
		$key=md5(time());
		$db->query("update ##_reg_key set reg_key='{$key}' where id=1");
		Message("生成成功","reg_key.php");
	}
	$reg = $db->fetch_assoc("select reg_key from ##_reg_key where id=1");
	$reg_key=$reg['reg_key'];
	$loopstr .= "<tr>
				<td align=center><span class=\"price\">{$reg_key}<span></td>
				<td align=center><a href=\"?do=update\">更新</a></td>";
	include('html/reg_key.html');
}
?>
