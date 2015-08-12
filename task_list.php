<?php
require(dirname(__FILE__).'/include/config.inc.php');
$tablename = "##_report";
if ($_SESSION["user"])
{
		$query = $db->query("select * from {$tablename} where taskid='{$id}'");
		while ($fs = $db->fetch_array($query))
		{
			$type = $fs["type"];
			$time = $fs["addtime"];
			$info = $fs["info"];
			$le = $db->fetch_assoc("select color,level from ##_exploit where title='{$type}'");
			$color=$le["color"];
			$level = $le["level"];
			$loopstr .= "<tr>
						<td align=center><span class=\"price\"><font size=\"+1\">{$type}</font><span></td>
						<td align=center style=\"{$color}\"><span class=\"price\"><font size=\"+1\">{$info}</font><span></td>
						<td align=center style=\"{$color}\"><span class=\"price\"><font size=\"+1\">{$level}</font><span></td>
						<td align=center>".ld_select_date($time)."</td>";
		}
}
include('html/task_list.html');
?>