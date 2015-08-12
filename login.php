<?php
require_once(dirname(__FILE__).'/include/config.inc.php');
ini_set("session.cookie_httponly", 1);
if(isset($_POST["submit"]))
{
	$username = $_POST["userid"];
	if(empty($username) || empty($_POST["pwd"])) Message("请填写用户名和密码");
	$fs = $db->fetch_assoc("select UserID,IsLock,UserPwd from ##_user where UserName = '{$username}'");
	if (is_array($fs))
	{
		$pwd = substr(md5($_POST["pwd"]),4,24);
		if($pwd != $fs["UserPwd"])
		{
			$db->query("update ##_user set LoginErrorNum = LoginErrorNum + 1 where UserID = {$fs["UserID"]}");
			user::AddLog("登陆失败",0,$fs["UserID"]);
			Message("您输入用户名或密码不正确，请重新输入");
		}
		if($fs["IsLock"]==1) Message("您的账号已被锁定");
		$db->query("update `##_user` SET `LastLoginTime` = '".time()."',`LastLoginIP`='".ld_ipaddress()."',`LoginTimes` = LoginTimes+1,LoginErrorNum=0 where UserID = {$fs["UserID"]}");
		$_SESSION["user"]=$username;
		$user = new user();
		$user->AddLog("登陆成功",1);
		Message("登陆成功","index.php");
	}
	else Message("您输入用户名或密码不正确，请重新输入");
}
include('html/login.htm');