package com.wss.jedis;

import java.util.Iterator;
import java.util.Set;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.wss.base.BaseTest;
import com.wss.service.jedis.JedisService;

public class JedisServiceTest extends BaseTest{
	@Autowired
	JedisService service;
	
	@Test
	public void test() {
		Set<String> set = service.keys("wss*");  
        Iterator<String> it = set.iterator();  
        while(it.hasNext()){  
            String keyStr = it.next();  
            System.out.println(service.get(keyStr));
            System.out.println(keyStr);  
            service.del(keyStr);  
        }  
	}

}
