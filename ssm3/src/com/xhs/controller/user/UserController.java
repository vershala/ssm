package com.xhs.controller.user;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.xhs.entity.menu.Menu;
import com.xhs.entity.user.User;
import com.xhs.service.menu.MenuService;
import com.xhs.service.user.UserService;
import com.xhs.util.Pager;

@Controller
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;
	@Autowired
	private MenuService menuService;

	private Pager pager;
	private User user;

	/**
	 * 璺宠浆鍒版坊鍔犵敤鎴风晫闈�
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping("/toAddUser")
	public String toAddUser(HttpServletRequest request) {
		return "/user/addUser";
	}

	/**
	 * 娣诲姞鐢ㄦ埛骞堕噸瀹氬悜
	 * 
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
	 * 缂栬緫鐢ㄦ埛
	 * 
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
	 * 鏍规嵁id鏌ヨ鍗曚釜鐢ㄦ埛
	 * 
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
	 * 鍒犻櫎鐢ㄦ埛
	 * 
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

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView Login(ModelAndView model, String username, String password, HttpServletRequest request, HttpSession session) {
		User user = userService.checkLogin(username, password);
		if (user != null) {
			if (pager == null) {
				pager = new Pager();
			}
			List<Menu> menuList = menuService.queryList();
			request.setAttribute("menuList", menuList);
			
			request.setAttribute("pager", pager);
			model.setViewName("/common/main");
		} else {
			model.addObject("msg", "error");
			model.setViewName("/common/error");
		}
		return model;
	}

	/**
	 * 鍒嗛〉+妯＄硦鏌ヨ鐢ㄦ埛鍒楄〃
	 * 
	 * @param model
	 * @param username
	 * @param password
	 * @param request
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/getAllUser")
	@ResponseBody
	public ModelAndView getAllUser(ModelAndView model, User user, Pager pager, HttpServletRequest request) {
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

	public Pager getPager() {
		return pager;
	}

	public void setPager(Pager pager) {
		this.pager = pager;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
