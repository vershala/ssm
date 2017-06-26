package com.xhs.controller.user;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.xhs.controller.common.BaseAction;
import com.xhs.entity.common.JsonResult;
import com.xhs.entity.user.User;
import com.xhs.service.user.UserService;
import com.xhs.util.Pager;

@Controller
@RequestMapping("/user")
public class UserController  extends BaseAction {

	@Autowired
	private UserService userService;
	private User user;
	
	/**
	 * 用户列表
	 * @param model
	 * @param username
	 * @param password
	 * @param request
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/list")
	@ResponseBody
	public ModelAndView list(ModelAndView model, User user, Pager pager, HttpServletRequest request) {
		if (pager == null) {
			pager = new Pager();
		}
		pager.setTotal(userService.userCount(user.getUsername(), user.getPassword()));
		List<User> findAll = userService.getAllUserByPage(pager.getStartRecord(), pager.getPageSize(), user.getUsername(), user.getPassword());
		request.setAttribute("userList", JSON.toJSONString(findAll));
		request.setAttribute("pager", pager);
		model.setViewName("/user/user_list");
		return model;
	}
	
	/**
	 * 新增用户
	 * @param request
	 * @return
	 */
	@RequestMapping("/toAddUser")
	public String toAddUser(HttpServletRequest request) {
		return "/user/addUser";
	}

	/**
	 * 新增用户
	 * @param user
	 * @param request
	 * @return
	 */
	@RequestMapping("/addUser")
	public String addUser(String userName, User user, HttpServletRequest request) {
		System.out.println(userName);
		boolean result = userService.save(user);
		if (result) {
			return "redirect:/user/getAllUser";
		} else {
			return "/common/error";
		}

	}
	

	/**
	 * 更新用户
	 * @param user
	 * @param request
	 * @return
	 */
	@RequestMapping("/updateUser")
	public String updateUser(User user, HttpServletRequest request) {

		if (userService.update(user)) {
			user = userService.findById(user.getId());
			request.setAttribute("user", user);
			return "redirect:/user/getAllUser";
		} else {
			return "/common/error";
		}
	}
	
	/**
	 * 更新用户
	 * @param user
	 * @param request
	 * @return
	 */
	@RequestMapping("/saveUser")
	public void saveUser(User user, HttpServletResponse response) {
		JsonResult result = new JsonResult(true);
		if (!userService.save(user)) {
			result.setSuccess(false);
		}
		response.setContentType("application/json");
		try {
			PrintWriter out = response.getWriter();
			out.write(JSON.toJSONString(result));
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

	/**
	 * 查询用户
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping("/getUser")
	public String getUser(int id, HttpServletRequest request) {

		request.setAttribute("user", userService.findById(id));
		return "/user/editUser";
	}

	/**
	 * 删除用户
	 * @param id
	 * @param request
	 * @param response
	 */
	@RequestMapping("/delUser")
	public void delUser(int id, HttpServletRequest request, HttpServletResponse response) {
		String result = "{\"result\":\"error\"}";
		if (userService.delete(id)) {
			result = "{\"result\":\"success\"}";
		}
		response.setContentType("application/json");
		try {
			PrintWriter out = response.getWriter();
			out.write(result);
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public ModelAndView toLogin(ModelAndView model) {
		model.setViewName("/index");
		return model;
	}
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
