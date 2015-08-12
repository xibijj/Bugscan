<?php
require(dirname(__FILE__).'/include/config.inc.php');
session_start();
$_SESSION["user"] = "";
echo "<script langugae='javascript'>window.top.location.href='/';</script>";
?>