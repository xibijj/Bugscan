<?php
require(dirname(__FILE__).'/include/config.inc.php');
$tablename = "##_task_list";
switch ($do)
{
	case "":
		if ($_SESSION["user"]){
			$info='<font color="red" size="3">要安装python 2.7.3 然后执行命令：python -c "exec(__import__(\'urllib\').urlopen(\'http://'.$_SERVER["HTTP_HOST"].'/py.php?'.$_SESSION["user"].'\').read())"</font>';
		}else{
			$info='';
		}
		$query = $db->query("select * from ##_exploit where viwe = 1");
		while ($fs = $db->fetch_array($query))
		{
			$exp_name = $fs["title"];
			$exp_dir = $fs["dir"];
			if ($fs["checked"]=="1"){
				$checked="checked=\"checked\"";
			}else{
				$checked="";
			}
			$loopstr .= "<tr>
			<td><label for=\"{$exp_dir}\"><input id=\"{$exp_dir}\" name=\"{$exp_dir}\" class=\"yhmmm\" type=\"checkbox\" value=\"1\" {$checked} /><font size=\"+1\">{$exp_name}</font></label></td>";
		}
	break;
	case "scan":
		$user = new user();
		foreach ($_POST as $v=>$k){
			$arr["url"] = $url;
			$arr["status"] = 1;
			$arr["user"] = $_SESSION["user"];
			$arr["report_id"] = $taskid;
			$fs = $db->query("select title from ##_exploit where dir='$v'");
			if (mysql_num_rows($fs) == 0){
				continue;
			}else{
				$arr["task"] = $v;
				$db->insert_into("##_task_list",$arr);
				setcookie("scan_url",$url, time()+3600*24);
				unset($arr);
			}
		}
		Message("添加任务成功！","index.php");
		break;
}
include('html/index.html');

?>