package com.wss.action.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.wss.base.BaseTest;
import com.wss.service.user.UserService;

public class UserActionTest extends BaseTest {
	@Autowired
	UserService service;
	
	@Test
	public void test() {
		Map<String,Object> parms = new HashMap<String,Object>();
		parms.put("username", "abcd");
		List<Map<String,Object>> list = service.queryList(parms);
		System.out.println(list.size());
	}

}
