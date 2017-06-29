package com.wss.jedis;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.wss.base.BaseTest;
import com.wss.service.jedis.JedisService;

public class JedisServiceTest extends BaseTest{
	@Autowired
	JedisService service;
	
	@Test
	public void test() {
		service.set("aa", "1111");
		System.out.println(service.get("aa"));
	}

}
