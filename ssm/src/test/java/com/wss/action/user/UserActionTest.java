package com.wss.action.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.wss.base.BaseTest;
import com.wss.model.user.User;
import com.wss.service.user.UserService;

public class UserActionTest extends BaseTest {
	@Autowired
	UserService service;

	@Test
	public void test() {
		User user = new User();
		for (int i = 0; i < 1; i++) {
			user.setType("1");
			String userName = getRandomName();
			user.setUsername(userName);
			user.setFullname(userName);
			user.setPassword("1111111");
			user.setSex("F");
			user.setEnableflag("Y");
			service.save(user);
		}

	}

	private String getRandomName() {
		StringBuffer sb = new StringBuffer();
		while (true) {
			sb.setLength(0);
			String base = "abcdefghijklmnopqrstuvwxyz1234567890";
			Random random = new Random();
			for (int i = 0; i < 6; i++) {
				int number = random.nextInt(base.length());
				sb.append(base.charAt(number));
			}
			Map<String, Object> conditions = new HashMap<String, Object>();
			conditions.put("username", sb.toString());
			List<Map<String, Object>> user = service.queryList(conditions);
			if (user.size() == 0) {
				break;
			}
		}
		return sb.toString();
	}

}
