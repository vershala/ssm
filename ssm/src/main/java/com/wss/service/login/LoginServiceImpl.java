/**
 * Project Name:ssm3
 * File Name:LoginServiceImpl.java
 * Package Name:com.xhs.service.login
 * Date:2017��6��22������4:39:14
 * Copyright (c) 2017, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.wss.service.login;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wss.model.user.User;
import com.wss.service.common.SqlSessionService;

/**
 * ClassName:LoginServiceImpl <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2017��6��22�� ����4:39:14 <br/>
 * @author   Administrator
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
@Service
@Transactional
public class LoginServiceImpl extends SqlSessionService implements LoginService {

	/**
	 * TODO �������÷�����ʵ�ֹ��ܣ���ѡ��.
	 * @return 
	 * @see com.xhs.service.login.LoginService#login(java.lang.String, java.lang.String, java.lang.String)
	 */
	public User login(String userName, String password, String code) {
		Map<String,Object> parms = new HashMap<String,Object>();
		parms.put("username", userName);
		parms.put("password", password);
		User user = (User) sqlSession.selectOne("com.wss.dao.user.UserMapper.getUserByUsername",parms);
		if (user != null && password.equals(user.getPassword())) {
			return user;
		}
		return null;
	}
	
	
}

