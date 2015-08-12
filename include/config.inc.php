<?php
//error_reporting(E_ALL || ~E_NOTICE);
//error_reporting(E_ALL);
session_start();
$cfg['soft_name'] = '';
$cfg['soft_version'] = 'SmartGov Professional 5.0.0.0';
$cfg['soft_lang'] = 'UTF-8';
header("Content-Type: text/html; charset={$cfg['soft_lang']}");
$cfg['db_host'] = '127.0.0.1';       // 数据库服务器 localhost
$cfg['db_name'] = 'scan';       // 数据库名
$cfg['db_user'] = 'root';       // 数据库用户名
$cfg['db_pass'] = '10086';       // 数据库密码 anchivaDVWA
$cfg['db_charset'] = 'utf-8';      //数据库编码
$cfg['db_pre'] = 'scan_';      //表前缀
$cfg['file_mod'] = 0777;
define('LDINC', str_replace("\\", '/', dirname(__FILE__) ) );
define('LDROOT', str_replace("\\", '/', substr(LDINC,0,-8) ) );
define('LDFMOD', $cfg['file_mod'] ? $cfg['file_mod'] : '');			//文件写入模式
date_default_timezone_set("Asia/Shanghai"); 							//设置默认时区
require_once(LDINC."/common.fun.php");									//引用全局函数
$db = new Mysql($cfg['db_host'],$cfg['db_user'],$cfg['db_pass'],$cfg['db_name'],$cfg['db_charset'],$cfg['db_charset'],$cfg['db_pre']);
$sitename = $cfg['sitename'];
$path = $cfg['path'];
$includeurl = $cfg["includeurl"] = $path."include";