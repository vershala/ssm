/**
 * Project Name:ssm3
 * File Name:LoginAction.java
 * Package Name:com.xhs.controller.login
 * Date:2017��6��22������4:49:39
 * Copyright (c) 2017, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.wss.action.login;

import java.io.Serializable;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.log4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.util.WebUtils;

import com.wss.action.common.BaseAction;
import com.wss.model.menu.Menu;
import com.wss.model.user.User;
import com.wss.service.login.LoginService;
import com.wss.service.menu.MenuService;

/**
 * ClassName:LoginAction <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2017��6��22�� ����4:49:39 <br/>
 * @author   Administrator
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
@Controller
@RequestMapping("/login")
public class LoginAction extends BaseAction {
	@Autowired
	private LoginService loginService;
	
	@Autowired
	private MenuService menuService;

	private static final String SESSION_USER="SESSION_USER";
	private final Log log = LogFactory.getLog("login"); 
	
	@RequestMapping(value = "/index")
	public String index() {
		return "redirect:/index.jsp";
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String Login( String username, String password) {
		User user = loginService.login(username, password,"123456");
		if (user != null) {
			List<Menu> menuList = menuService.queryList();
			this.getRequest().setAttribute("menuList", menuList);
			
			saveUserToSession(user);
			
			MDC.put("ip", request.getLocalAddr());  
			log.info(username+" login success!");
			return "/common/main";
		} else {
			log.info(username+" login failed!");
			return "redirect:/index.jsp";
		}
	}
	
	@RequestMapping("/logout")
	public String logout(String userName, HttpServletRequest request) {
		WebUtils.setSessionAttribute(request, SESSION_USER, null);
		log.debug(userName+" logout success！");
		return "redirect:/index.jsp";
	}
	
	private void saveUserToSession(User user){
		if (user == null || user instanceof Serializable) {
            WebUtils.setSessionAttribute(this.getRequest(), SESSION_USER, user);
        } else {
            throw new IllegalArgumentException("putToSession failed to a non-serializable object: " + user);
        }
	}
	
}

