
/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`t3738` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;

USE `t3738`;

/* 用户表 */  
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(1) COLLATE utf8_bin DEFAULT '0',
  `username` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `fullname` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `sex` 	 varchar(1) COLLATE  utf8_bin DEFAULT NULL,
  `email` 	 varchar(32) COLLATE  utf8_bin DEFAULT NULL,
  `mobilephone` 	 varchar(32) COLLATE  utf8_bin DEFAULT NULL,  
  `createtime` datetime DEFAULT now(),
  `enableflag` varchar(1) COLLATE utf8_bin DEFAULT 'Y',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/* 角色表 */  
DROP TABLE IF EXISTS `tb_role`;
CREATE TABLE `tb_role` (  
  `role_cd` varchar(20) COLLATE utf8_bin NOT NULL,
  `role_name` varchar(32) COLLATE utf8_bin DEFAULT NULL,    
  `enable_flag` varchar(1) COLLATE utf8_bin DEFAULT 'Y',
  `notes` varchar(200) COLLATE utf8_bin DEFAULT NULL,  
  `create_user` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `create_method` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `create_time` datetime DEFAULT now(),
  `last_upd_user` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `last_upd_method` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `last_upd_time` datetime DEFAULT now(),
  PRIMARY KEY (`role_cd`),
  UNIQUE KEY `tb_role_idx1`(`role_cd`),
  KEY `tb_role_idx2` (`role_cd`,`enable_flag`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/* 功能表 */  
DROP TABLE IF EXISTS `tb_menu`;
CREATE TABLE `tb_menu` (  
  `menu_cd` varchar(20) COLLATE utf8_bin NOT NULL,
  `menu_name` varchar(32) COLLATE utf8_bin DEFAULT NULL,    
  `url` varchar(200) COLLATE utf8_bin DEFAULT NULL,    
  `enable_flag` varchar(1) COLLATE utf8_bin DEFAULT 'Y',
  `notes` varchar(200) COLLATE utf8_bin DEFAULT NULL,  
  `create_user` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `create_method` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `create_time` datetime DEFAULT now(),
  `last_upd_user` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `last_upd_method` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `last_upd_time` datetime DEFAULT now(),
  PRIMARY KEY (`menu_cd`),
  UNIQUE KEY `tb_menu_idx1`(`menu_cd`),
  KEY `tb_menu_idx2` (`menu_cd`,`enable_flag`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/* 角色功能表 */  
DROP TABLE IF EXISTS `tb_role_menu`;
CREATE TABLE `tb_role_menu` (  
  `role_cd` varchar(20) COLLATE utf8_bin NOT NULL,
  `role_name` varchar(32) COLLATE utf8_bin DEFAULT NULL,    
  `menu_cd` varchar(20) COLLATE utf8_bin NOT NULL, 
  `menu_name` varchar(32) COLLATE utf8_bin DEFAULT NULL,    
  `create_user` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `create_method` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `create_time` datetime DEFAULT now(),
  `last_upd_user` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `last_upd_method` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `last_upd_time` datetime DEFAULT now(),
  UNIQUE KEY `tb_role_menu_idx1`(`role_cd`,`menu_cd`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/* 人员角色表 */  
DROP TABLE IF EXISTS `tb_user_role`;
CREATE TABLE `tb_user_role` (  
  `username` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `role_cd` varchar(20) COLLATE utf8_bin NOT NULL,
  `role_name` varchar(32) COLLATE utf8_bin DEFAULT NULL,    
  `create_user` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `create_method` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `create_time` datetime DEFAULT now(),
  `last_upd_user` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `last_upd_method` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `last_upd_time` datetime DEFAULT now(),
  UNIQUE KEY `tb_user_role_idx1`(`username`,`role_cd`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


