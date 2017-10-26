package com.wss.util.xml;

import org.junit.Test;

import com.wss.model.user.User;

public class XmlUtilsTest {

	@Test
	public void test() {
		User user = new User();
		user.setType("1");
		user.setUsername("abcd");
		user.setFullname("你猜");
		user.setPassword("1111111");
		user.setSex("F");
		user.setEnableflag("Y");
		System.out.println(XmlUtils.ObjToXml(user));

		System.out.println(XmlUtils.convertToXml(user));

		String s = XmlUtils.convertToXml(user);
		User obj = (User) XmlUtils.convertToObj(s, User.class);
		System.out.println(obj);
	}

}
