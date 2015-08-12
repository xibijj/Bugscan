<?php
require(dirname(__FILE__).'/include/config.inc.php');
$tablename = "##_task_list";
function level($md5_id)
{
	global $db;
	$fuck = $db->query("select type from ##_report where taskid='{$md5_id}'");
	$nRowCount = mysql_num_rows($fuck);
	if ($nRowCount == 0){
		$tlevel="Low";
		return $tlevel;
	}
	while ($fs = $db->fetch_array($fuck))
	{
		$type = $fs["type"];
		$le = $db->fetch_assoc("select level,color from ##_exploit where title='{$type}'");
		$level=$le["level"];
		if ($level=='高危')
		{
			$high++;
		}elseif ($level=='警告'){
			$middle++;
		}elseif ($level=='安全'){
			$Low++;
		}
	}
	if ($high>0)
	{
		$tlevel="high";
	}elseif ($middle>0){
		$tlevel="middle";
	}elseif ($Low>0){
		$tlevel="Low";
	}
return $tlevel;
}

if ($_SESSION["user"])
{
		global $high;
		global $middle;
		global $Low;
		$high=0;
		$middle=0;
		$Low=0;
		$query = $db->query("select * from {$tablename} where user='{$_SESSION["user"]}'");
		$key=1;
		$re_id='';
		while ($fs = $db->fetch_array($query))
		{
			$url = $fs["url"];
			$time = $fs["exec_time"];
			$id = $fs["report_id"];
			$exp_level=level($id);
			if ($exp_level=='high')
			{
				$level_str="高危";
				$color="color:red";
			}elseif ($exp_level=="middle"){
				$level_str="警告";
				$color="color:blue";
			}elseif ($exp_level=="Low"){
				$level_str="安全";
				$color="color:#006400";
			}
			$color_str="<td align=\"center\" style=\"{$color}\"><font size=\"+1\">{$level_str}</font></td>";
			if ($re_id!=$id)
			{
				$loopstr .= "<tr>
							<td align=center><span class=\"price\"><font size=\"+1\">{$url}</font><span></td>
							".$color_str."
							<td align=center>".ld_select_date($time)."</td>
							<td align=center><a href=\"task_list.php?id={$id}\"><font size=\"+1\">查看报告</a></td>";
				$re_id=$id;
			}
		}
}
include('html/task.html');
?>