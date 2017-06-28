/**
 * Project Name:ssm3
 * File Name:LoginService.java
 * Package Name:com.xhs.service.login
 * Date:2017��6��22������4:38:24
 * Copyright (c) 2017, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.wss.service.login;

import com.wss.model.user.User;

/**
 * ClassName:LoginService <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2017��6��22�� ����4:38:24 <br/>
 * @author   Administrator
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
public interface LoginService {
	/**
	 * login:(��¼����). <br/>
	 * @author Administrator
	 * @param userName ��¼�û���
	 * @param password ��¼����
	 * @param code ��֤��
	 * @return 
	 * @since JDK 1.6
	 */
	User login(String userName, String password,String code);
}

