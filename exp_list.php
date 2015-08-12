<?php
require(dirname(__FILE__).'/include/config.inc.php');
$tablename = "##_report";
if ($_SESSION["user"])
{
		$query = $db->query("select * from ##_exploit");
		$rows = mysql_num_rows($query);
		$i=1;
		while ($fs = $db->fetch_array($query))
		{
			$exp_name = $fs["title"];
			$exp_dir = $fs["dir"];
			$exp_content = $fs["content"];
			$loopstr .= "<tr>
			<td align=center>{$i}</td>
			<td>&emsp;<font size=\"+1\">{$exp_name}</font></td>";
			$i++;
		}
}
include('html/exp_list.html');
?>