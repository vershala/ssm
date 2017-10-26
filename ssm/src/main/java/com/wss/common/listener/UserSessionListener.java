package com.wss.common.listener;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

public class UserSessionListener implements HttpSessionListener {

	public static int userCount;

	public static int getUserCount() {
		return userCount;
	}

	public void addUserCount() {
		userCount++;
	}

	public void subUserCount() {
		userCount--;
	}

	@Override
	public void sessionCreated(HttpSessionEvent event) {
		addUserCount();
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent event) {
		subUserCount();
	}

}
