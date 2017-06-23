
/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`t3738` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;

USE `t3738`;

/*Table structure for table `tb_user` */

DROP TABLE IF EXISTS `tb_user`;

CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(1) COLLATE utf8_bin DEFAULT NULL,
  `username` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `fullname` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `sex` 	 varchar(1) COLLATE  utf8_bin DEFAULT NULL,
  `email` 	 varchar(32) COLLATE  utf8_bin DEFAULT NULL,
  `mobilephone` 	 varchar(32) COLLATE  utf8_bin DEFAULT NULL,  
  `createtime` datetime DEFAULT now(),
  `enableflag` varchar(1) COLLATE utf8_bin DEFAULT 'Y',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
