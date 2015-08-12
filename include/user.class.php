<?php
class user{
	public $uid;
	public $UserName;
	public $UserLevel;
	public $EndTime;
	function __construct()
	{
		global $db,$navid;
		if(empty($_SESSION["user"])) Message("您没有登陆或者登陆超时","login.php");
		$zs = $db->fetch_assoc("select UserID,UserName,UserLevel,EndTime from ##_user where UserName = '{$_SESSION["user"]}'");
		if(!is_array($zs)) Message("您没有登陆或者登陆超时","login.php");
		$this->uid = $zs["UserID"];
		$this->UserLevel = $zs["UserLevel"];
		$this->EndTime = $zs["EndTime"];
	}
	//写入日志表
	function AddLog($Message,$CateGory=2,$uid="")
	{
		global $db;
		$arr["CateGory"] = $CateGory;
		$arr["Message"] = $Message;
		$arr["Addtime"] = time();
		$arr["UserID"] = empty($uid) ? $this->uid : $uid;
		$arr["UserIP"] = ld_ipaddress();
		//$db->insert_into("##_log",$arr);
	}
}
?>