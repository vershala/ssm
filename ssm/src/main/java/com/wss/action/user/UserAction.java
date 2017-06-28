package com.wss.action.user;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.wss.action.common.BaseAction;
import com.wss.model.common.JsonResult;
import com.wss.model.common.Pagination;
import com.wss.model.user.User;
import com.wss.service.user.UserService;

@Controller
@RequestMapping("/user")
public class UserAction  extends BaseAction {

	@Autowired
	private UserService userService;
	
	/**
	 * 用户列表
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/list")
	@ResponseBody
	public ModelAndView list(ModelAndView model) {
		model.setViewName("/user/user_list");
		return model;
	}
	
	@RequestMapping("/listJson")
	public void listJson() {
		int offset = NumberUtils.toInt(this.getRequestParameter("page.offset"));
		int limit = NumberUtils.toInt(this.getRequestParameter("page.count"));
		Pagination pagination = new Pagination(offset, limit);
		List<Map<String,Object>> list = userService.queryList(this.getParameters(),pagination);
		
		this.forwardJson(pagination, list);
	}
	
	/**
	 * 新增用户
	 * @param request
	 * @return
	 */
	@RequestMapping("/toAddUser")
	public String toAddUser() {
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
	@RequestMapping("/saveUser")
	public void saveUser(User user, HttpServletResponse response) {
		JsonResult result = new JsonResult(true);
		if (!userService.save(user)) {
			result.setSuccess(false);
		}

		this.jsonString(result);
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

}
