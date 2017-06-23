/**
 * Project Name:ssm3
 * File Name:CommonInterceptor.java
 * Package Name:com.xhs.interceptor
 * Date:2017��6��23������9:55:52
 * Copyright (c) 2017, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.xhs.interceptor;

import java.io.PrintWriter;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.xhs.entity.user.User;

/**
 * ClassName:CommonInterceptor <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason: TODO ADD REASON. <br/>
 * Date: 2017��6��23�� ����9:55:52 <br/>
 * 
 * @author Administrator
 * @version
 * @since JDK 1.6
 * @see
 */
public class CommonInterceptor extends HandlerInterceptorAdapter {
	private final Logger log = LoggerFactory.getLogger(CommonInterceptor.class);

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

		log.info("============== start preHandle================"+request.getRequestURI());
		String requestUri = request.getRequestURI();
		String contextPath = request.getContextPath();
		String url = requestUri.substring(contextPath.length());

		log.info("requestUri:" + requestUri);
		log.info("contextPath:" + contextPath);
		log.info("url:" + url);

		User user = (User) request.getSession().getAttribute("SESSION_USER");
		if (user == null) {
			response.setCharacterEncoding("UTF-8");
			log.info("Interceptor返回登录页面");
	        PrintWriter out = response.getWriter();  
	        out.println("<html>");      
	        out.println("<script>");      
	        out.println("window.open ('"+request.getContextPath()+"/login/logout','_top')");      
	        out.println("</script>");      
	        out.println("</html>");    
	        return false;  
			//request.getRequestDispatcher("/common/index.jsp").forward(request, response);
			//return false;
		} else
			return true;
	}

	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		log.info("==============2返回结果页面postHandle================");
		if (modelAndView != null) { 
			modelAndView.addObject("var","aaa");
		}
	}

	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
		log.info("==============3处理结束afterCompletion================");
	}

}
