/*
Navicat MySQL Data Transfer

Source Server         : 192.168.1.254
Source Server Version : 50090
Source Host           : 192.168.1.254:3306
Source Database       : scan

Target Server Type    : MYSQL
Target Server Version : 50090
File Encoding         : 65001

Date: 2014-02-18 14:34:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `scan_exploit`
-- ----------------------------
DROP TABLE IF EXISTS `scan_exploit`;
CREATE TABLE `scan_exploit` (
  `id` int(11) NOT NULL auto_increment,
  `title` varchar(50) default NULL,
  `content` text,
  `dir` varchar(50) default NULL,
  `level` varchar(10) default NULL,
  `color` varchar(20) default NULL,
  `viwe` int(5) default '1',
  `checked` int(5) default '0',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of scan_exploit
-- ----------------------------
INSERT INTO `scan_exploit` VALUES ('1', '爬虫和SQL注入测试', null, 'spider', '高危', 'color:red', '1', '0');
INSERT INTO `scan_exploit` VALUES ('2', '信息收集', null, 'gethead', '安全', 'color:#006400', '1', '1');
INSERT INTO `scan_exploit` VALUES ('3', '常用端口扫描', null, 'portscan', '警告', 'color:blue', '1', '1');
INSERT INTO `scan_exploit` VALUES ('4', '常用CMS程序识别', null, 'what_cms', '警告', 'color:blue', '1', '0');
INSERT INTO `scan_exploit` VALUES ('5', 'FTP弱口令破解', null, 'ftp', '高危', 'color:red', '1', '0');
INSERT INTO `scan_exploit` VALUES ('6', 'ping测试', null, 'ping', '安全', 'color:#006400', '0', '0');
INSERT INTO `scan_exploit` VALUES ('7', 'aspcms1.5注入', null, 'aspcms1.5_SQLInject', '高危', 'color:red', '1', '0');
INSERT INTO `scan_exploit` VALUES ('8', 'aspcms2.0注入', null, 'aspcms2.0_SQLInject', '高危', 'color:red', '1', '0');
INSERT INTO `scan_exploit` VALUES ('9', 'Gv32cms代码执行', null, 'Gv32cms_CommandExec', '高危', 'color:red', '1', '0');
INSERT INTO `scan_exploit` VALUES ('10', 'dedecms5.7_search.php注入', null, 'dedecms5.7_search.php_SQLInject', '高危', 'color:red', '1', '0');
INSERT INTO `scan_exploit` VALUES ('11', 'phpweb注入', null, 'phpweb_SQLInject', '高危', 'color:red', '1', '0');
INSERT INTO `scan_exploit` VALUES ('12', 'nginx低版本代码执行', null, 'nginx_CommandExec', '高危', 'color:red', '1', '0');
INSERT INTO `scan_exploit` VALUES ('13', '本地文件包含', null, 'lfi', '严重', 'color:#FF7700', '0', '0');

-- ----------------------------
-- Table structure for `scan_reg_key`
-- ----------------------------
DROP TABLE IF EXISTS `scan_reg_key`;
CREATE TABLE `scan_reg_key` (
  `id` int(11) NOT NULL auto_increment,
  `reg_key` varchar(32) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of scan_reg_key
-- ----------------------------
INSERT INTO `scan_reg_key` VALUES ('1', '2434776514d6987945f17ed0679301ba');

-- ----------------------------
-- Table structure for `scan_report`
-- ----------------------------
DROP TABLE IF EXISTS `scan_report`;
CREATE TABLE `scan_report` (
  `id` int(11) NOT NULL auto_increment,
  `taskid` varchar(32) default NULL,
  `info` text,
  `addtime` int(10) default NULL,
  `report_ip` varchar(20) default NULL,
  `type` varchar(50) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of scan_report
-- ----------------------------

-- ----------------------------
-- Table structure for `scan_task_list`
-- ----------------------------
DROP TABLE IF EXISTS `scan_task_list`;
CREATE TABLE `scan_task_list` (
  `id` int(11) NOT NULL auto_increment,
  `task` varchar(50) character set utf8 default NULL,
  `status` int(2) unsigned zerofill default '00',
  `user` varchar(32) NOT NULL,
  `url` varchar(30) character set utf8 default NULL,
  `exec_ip` varchar(15) character set utf8 default NULL,
  `report_id` varchar(32) character set utf8 default NULL,
  `exec_time` int(10) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of scan_task_list
-- ----------------------------

-- ----------------------------
-- Table structure for `scan_user`
-- ----------------------------
DROP TABLE IF EXISTS `scan_user`;
CREATE TABLE `scan_user` (
  `UserID` int(11) unsigned NOT NULL auto_increment,
  `UserName` varchar(100) default NULL COMMENT '会员账号',
  `UserPwd` varchar(32) default NULL COMMENT '会员密码',
  `AddTime` int(10) default NULL COMMENT '注册时间',
  `EndTime` int(10) default NULL COMMENT '到期时间',
  `IsLock` tinyint(1) default '0' COMMENT '是否锁定',
  `LoginErrorNum` tinyint(1) default '0',
  `LastLoginTime` int(10) default NULL COMMENT '最后登陆时间',
  `LastLoginIP` varchar(20) default NULL,
  `LoginTimes` int(10) default '0' COMMENT '登陆次数',
  `UserLevel` mediumint(8) NOT NULL default '0',
  `IsLockTime` int(10) default '0',
  `telnum` varchar(20) default NULL,
  `money` double(6,0) unsigned NOT NULL default '10',
  `usertype` varchar(3) default NULL,
  PRIMARY KEY  (`UserID`)
) ENGINE=MyISAM AUTO_INCREMENT=121 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of scan_user
-- ----------------------------
INSERT INTO `scan_user` VALUES ('120', 'x', 'dc3949ba59abbe56e057f20f', '1388800119', '1388886519', '0', '0', '1390441918', '192.168.1.8', '13', '1', '0', '13800138000', '10', null);
