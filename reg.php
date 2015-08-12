<?php
require_once(dirname(__FILE__).'/include/config.inc.php');
ini_set("session.cookie_httponly", 1);
if(isset($_POST["submit"]))
{
	$username = ld_CheckInput($_POST["userid"]);
	if(empty($username) || empty($_POST["pwd"]) || empty($_POST["telnum"])) Message("请填写用户名和密码和联系手机");
	if(empty($_POST["regkey"])) Message("请填写注册码,获取注册码请联系QQ:2376457928");
	if(!ld_is_mobile($telnum)) Message("手机号码格式不正确");
	if($db->checknumsql("select UserID from ##_user where UserName = '{$username}'")) Message("此用户名已经存在，请重新输入用户名");
	$reg = $db->fetch_assoc("select reg_key from ##_reg_key where id=1");
	$reg_key=$reg['reg_key'];
	if($reg_key <> $_POST["regkey"]) Message("注册码有误,获取注册码请联系QQ:2376457928");
	
	$pwd = substr(md5($_POST["pwd"]),4,24);
	$temptime = $cfg["reguserday"]*86400;
	$arr["UserName"] = $username;
	$arr["UserPwd"] = $pwd;
	$arr["AddTime"] = time();
	$arr["EndTime"] = time()+$temptime;
	$arr["UserLevel"] = $cfg["reguserlevel"];
	$arr["telnum"] = $telnum;
	$db->insert_into("##_user",$arr);
	$key=md5(time());
	$db->query("update regkey set reg_key='{$key}' where id=1");
	echo "<script>alert('注册成功');window.top.location.href='index.php'</script>";
	exit();
}
include('html/reg.htm');