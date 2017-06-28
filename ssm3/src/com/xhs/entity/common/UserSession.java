/**
 * Project Name:ssm3
 * File Name:UserSession.java
 * Package Name:com.xhs.entity.common
 * Date:2017��6��22������5:14:04
 * Copyright (c) 2017, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.xhs.entity.common;

import java.io.Serializable;

import org.apache.commons.collections.map.CaseInsensitiveMap;

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
	private static ThreadLocal<UserData> UserLocal = new ThreadLocal<UserSession.UserData>();
	
	public static UserData getCurrent() {
		return UserLocal.get();
	}
	
	public static void setCurrent(UserData user) {
		UserLocal.set(user);
	}
	
	public static void destory() {
		UserData data = getCurrent();
		if (data != null) {
			data.clear();
		}
		setCurrent(new UserData());
	}
	
	public static String getUserName() {
		try {
			return getCurrent().getUserName();
		}
		catch (Exception e) {
			return "thread";
		}
	}

	public static void setUserName(String UserName) {
		getCurrent().setUserName(UserName);
	}

	public static String getRealName() {
		try {
			return getCurrent().RealName;
		}
		catch (Exception e) {
			return "thread";
		}
	}

	public static void setRealName(String RealName) {
		getCurrent().RealName = RealName;
	} 
	
	public static class UserData implements Serializable {
		private static final long serialVersionUID = 1L;
		private String UserName;
		private String RealName;

		private CaseInsensitiveMap map = null;

		private String SessionID;

		public UserData() {
		}
		
		public String getUserName() {
			if (getCurrent() == null) {
				return "null thread";
			}
			return this.UserName;
		}

		public void setUserName(String userName) {
			this.UserName = userName;
		}

		public String getRealName() {
			return this.RealName;
		}


		public void setRealName(String realName) {
			this.RealName = realName;
		}

		public String getSessionID() {
			return this.SessionID;
		}

		public void setSessionID(String sessionID) {
			this.SessionID = sessionID;
		}

		public void clear() {
			if (map != null) {
				map.clear();
				map = null;
			}
		}

		public void set(String key, Object val) {
			if (map == null) {
				map = new CaseInsensitiveMap();
			}
			map.put(key, val);
		}

		public Object get(String key) {
			if (map == null) {
				return null;
			}
			return map.get(key);
		}
	}
}

