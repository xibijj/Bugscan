<?php
require(dirname(__FILE__).'/include/config.inc.php');
$fs = $db->query("select dir from ##_exploit where dir Like '%{$exp}%'");
$rows = mysql_num_rows($fs);
if ($rows>0 and $exp){
	for($i = 0; $i < $rows; $i++)
	{
		$ss = $db->fetch_row($fs);
		$exp_list .=$ss[0]."|exp|";
	}
	print $exp_list;
}
if($x){
	$fss = $db->fetch_assoc("select dir from ##_exploit where dir = '{$x}'");
	echo file_get_contents(dirname(__FILE__)."/plus/{$fss["dir"]}.py");
	//exit();
}
?>