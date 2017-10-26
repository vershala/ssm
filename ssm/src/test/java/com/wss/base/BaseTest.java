package com.wss.base;

import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:config/mybatis-config.xml", "classpath*:config/spring-common.xml", "classpath*:config/spring-jedis.xml", "classpath*:config/spring-session.xml", "classpath*:config/spring-mvc.xml" })
@WebAppConfiguration("src/main/resources")
public class BaseTest {

}
