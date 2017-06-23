package com.xhs.test;

import java.sql.SQLException;

import javax.sql.DataSource;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.mysql.jdbc.Connection;

public class TestSpring {
	public static void main(String[] args) throws SQLException {
		ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:config/spring-common.xml");
		
		DataSource dataSource = (DataSource)ac.getBean("dataSource");
//		SqlSessionFactory sf = (SqlSessionFactory) ac.getBean("sqlSessionFactory");
		Connection conn = (Connection) dataSource.getConnection();
		System.out.println(conn);
	}
}
