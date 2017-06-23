/**
 * Project Name:ssm3
 * File Name:LoginAction.java
 * Package Name:com.xhs.controller.login
 * Date:2017��6��22������4:49:39
 * Copyright (c) 2017, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.xhs.controller.login;

import java.io.Serializable;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.WebUtils;

import com.xhs.entity.menu.Menu;
import com.xhs.entity.user.User;
import com.xhs.service.login.LoginService;
import com.xhs.service.menu.MenuService;

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
public class LoginAction {
	@Autowired
	private LoginService loginService;
	
	@Autowired
	private MenuService menuService;
	
	private static final String SESSION_USER="SESSION_USER";
	
	@RequestMapping(value = "/index", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView index(ModelAndView model, String message, HttpServletRequest request, HttpSession session) {
		model.addObject("msg", message);
		model.setViewName("/index");
		return model;
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView Login(ModelAndView model, String username, String password, HttpServletRequest request, HttpSession session) {
		User user = loginService.login(username, password,"123456");
		if (user != null) {

			List<Menu> menuList = menuService.queryList();
			request.setAttribute("menuList", menuList);
			
			saveUserToSession(user,request);
			
			model.setViewName("/common/main");
		} else {
			model.addObject("msg", "error");
			model.setViewName("/common/error");
		}
		return model;
	}
	
	@RequestMapping("/logout")
	public String logout(String userName, HttpServletRequest request) {
		WebUtils.setSessionAttribute(request, SESSION_USER, null);
		return "redirect:/index.jsp";

	}
	
	private void saveUserToSession(User user, HttpServletRequest request){
		if (user == null || user instanceof Serializable) {
            WebUtils.setSessionAttribute(request, SESSION_USER, user);
        } else {
            throw new IllegalArgumentException(
                    "putToSession failed to a non-serializable object: " + user);
        }
	}
}

