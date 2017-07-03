/**
 * Project Name:ssm3
 * File Name:CommonInterceptor.java
 * Package Name:com.xhs.interceptor
 * Date:2017��6��23������9:55:52
 * Copyright (c) 2017, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.wss.interceptor;

import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.alibaba.fastjson.JSON;
import com.wss.log.BaseLogger;
import com.wss.log.OperateLog;
import com.wss.model.common.UserSession;
import com.wss.model.user.User;
import com.wss.util.UtilString;

/**
 * ClassName:CommonInterceptor <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason: TODO ADD REASON. <br/>
 * @author Administrator
 * @version
 * @since JDK 1.6
 * @see
 */
public class CommonInterceptor extends HandlerInterceptorAdapter {

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		User user = (User) request.getSession().getAttribute("SESSION_USER");
		if (user == null) {
			response.setCharacterEncoding("UTF-8");
	        PrintWriter out = response.getWriter();  
	        out.println("<html>");      
	        out.println("<script>");      
	        out.println("window.open ('"+request.getContextPath()+"/login/logout','_top')");      
	        out.println("</script>");      
	        out.println("</html>");    
	        return false;  
		} else{
			UserSession.destory();
			UserSession.setUserName(user.getUsername());
			UserSession.setRealName(user.getFullname());
			OperateLog log = new OperateLog();
			log.setUserName(user.getUsername());
			log.setOperate(request.getRequestURI());
			log.setMethod(request.getMethod());
			log.setParams(JSON.toJSONString(getParams(request)));
			log.setIp(request.getLocalAddr());
            BaseLogger.operateLog(log);
		}
			return true;
	}

	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		
	}

	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
	}
	
	
	@SuppressWarnings("unchecked")
	public Map<String, Object> getParams(HttpServletRequest request) {
		String prefix = "";
		Map<String, Object> params = new TreeMap<String, Object>();
		String method = request.getMethod();
		if (StringUtils.equalsIgnoreCase("GET", method)) {
			String queryString = request.getQueryString();
			if (StringUtils.isEmpty(queryString)) {
				return params;
			}
			String encoding = StringUtils.defaultString(request.getCharacterEncoding(), "UTF-8");
			try {
				queryString = URLDecoder.decode(queryString, encoding);
				List<String> list1 = UtilString.toList(queryString, '&');
				List<String> buff = new ArrayList<String>(2);
				for (String str : list1) {
					UtilString.toList(str, '=', buff);
					if (buff.size() > 1) {
						params.put(buff.get(0), buff.get(1));
					}
				}
			} catch (UnsupportedEncodingException e) {
			}
		} else {
			Enumeration<String> paramNames = request.getParameterNames();
			while (paramNames != null && paramNames.hasMoreElements()) {
				String paramName = (String) paramNames.nextElement();
				if ("".equals(prefix) || paramName.startsWith(prefix)) {
					String unprefixed = paramName.substring(prefix.length());
					String[] values = request.getParameterValues(paramName);
					if (values == null || values.length == 0) {
					} else if (values.length > 1) {
						params.put(unprefixed, values);
					} else {
						String val = StringUtils.trim(values[0]);
						if (val.length() != 0) {
							params.put(unprefixed, val);
						}
					}
				}
			}
		}
		return params;
	}
}
