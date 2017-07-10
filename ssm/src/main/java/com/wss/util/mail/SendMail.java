package com.wss.util.mail;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeUtility;

public class SendMail {
	private static Properties properties;

	public  Properties initProperties() {
		properties = new Properties();
		properties.put("mail.transport.protocol", "smtp");// 发送邮件使用的协议smtp
		properties.setProperty("mail.host", "mailsmtp.zj.chinamobile.com");// 发送服务器的主机地址
		properties.put("mail.smtp.port", 25);// 端口，可省略
		properties.setProperty("mail.smtp.auth", "true");// 请求身份验证
		properties.setProperty("mail.debug", "true");// 调试模式
		return properties;
	}
	
	public void sendMail() throws Exception {
		properties = initProperties(); 
		Session session = Session.getDefaultInstance(properties);
		MimeMessage message = new MimeMessage(session);// 代表一封邮件
		message.setSender(new InternetAddress("shaoshan.wang@pds-inc.com.cn"));// 设置发件人
		message.setRecipients(RecipientType.TO, "195510427@qq.com");// 设置收件人
		message.setSubject("我的邮件主题");// 设置邮件主题
		// 文本和超文本部分
		MimeBodyPart textHypertextPart = new MimeBodyPart();
		textHypertextPart.setContent("there is 正文内容哟. <a href='http://www.baidu.com' target='_blank'>超链接</a><img src='cid:hh'/>", "text/html;charset=utf-8");// 这里cid是指资源的ContentID

		// 内嵌图片部分
		MimeBodyPart imagePart = new MimeBodyPart();
		// 把磁盘上的文件读到邮件上来：借助JAF框架
		String path = this.getClass().getResource("4.jpg").toURI().getPath();
		DataHandler handler1 = new DataHandler(new FileDataSource(new File(path)));
		imagePart.setDataHandler(handler1);
		imagePart.setContentID("hh");

		// 描述imagePart和textPart两者关系：文本和内嵌图片合体related
		MimeMultipart multipart1 = new MimeMultipart();
		multipart1.addBodyPart(textHypertextPart);
		multipart1.addBodyPart(imagePart);
		multipart1.setSubType("related");// 说明两部分是有关系的

		MimeBodyPart textImagePart = new MimeBodyPart();
		textImagePart.setContent(multipart1);
		// 附件部分
		MimeBodyPart attachmentPart = new MimeBodyPart();
		DataHandler handler2 = new DataHandler(new FileDataSource(this.getClass().getResource("1.rar").toURI().getPath()));
		String fileName = handler2.getName();// 获取文件2名
		attachmentPart.setDataHandler(handler2);
		attachmentPart.setFileName(MimeUtility.encodeText(fileName));// 手工设置文件名，中文文件名要注意编码

		// 全部合体
		MimeMultipart multipart = new MimeMultipart();
		multipart.addBodyPart(textImagePart);// 文件加内嵌图片
		multipart.addBodyPart(attachmentPart);// 附件
		multipart.setSubType("mixed");// 复杂关系

		// 设置邮件内容主体
		message.setContent(multipart);
		// message.saveChanges();//这个可写可不写

		message.writeTo(new FileOutputStream(new File("d:/2.eml")));// 把邮件存到本地磁盘上

		// 获取Transport对象
		Transport trans = session.getTransport();
		// 连接服务器
		trans.connect("shaoshan.wang@pds-inc.com.cn", "trip973875");// 注意这里的密码XXXXX是163邮箱的授权码用户名zyliu1993或者邮箱zyliu1993@163.com都行
		// 发送邮件
		trans.sendMessage(message, message.getAllRecipients());// 发送邮件给所有收件人

		// 关闭
		trans.close();
	}
	
	public static void main(String[] args) throws Exception{
		SendMail mail = new SendMail();
		mail.sendMail();
	}
}
