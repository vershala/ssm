/**
 * Project Name:ssm3
 * File Name:LoginService.java
 * Package Name:com.xhs.service.login
 * Date:2017年6月22日下午4:38:24
 * Copyright (c) 2017, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.xhs.service.login;

import com.xhs.entity.user.User;

/**
 * ClassName:LoginService <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2017年6月22日 下午4:38:24 <br/>
 * @author   Administrator
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
public interface LoginService {
	/**
	 * login:(登录程序). <br/>
	 * @author Administrator
	 * @param userName 登录用户名
	 * @param password 登录密码
	 * @param code 验证码
	 * @return 
	 * @since JDK 1.6
	 */
	User login(String userName, String password,String code);
}

