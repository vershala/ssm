/**
 * Project Name:ssm3
 * File Name:UserSession.java
 * Package Name:com.xhs.entity.common
 * Date:2017��6��22������5:14:04
 * Copyright (c) 2017, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.wss.model.common;

import java.io.Serializable;

import org.apache.commons.collections.map.CaseInsensitiveMap;

import com.wss.model.user.User;

/**
 * ClassName:UserSession <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2017��6��22�� ����5:14:04 <br/>
 * @author   Administrator
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
public class UserSession {
	private static ThreadLocal<User> local = new ThreadLocal<User>();
	
	public static void set(User user){
		local.set(user);
	}
	
	public static User get(){
		return local.get();
	}
	
	public static void remove(){
		local.remove();
	}
}

