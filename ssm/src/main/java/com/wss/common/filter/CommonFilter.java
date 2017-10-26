package com.wss.common.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.apache.log4j.MDC;

import com.wss.model.user.User;

/**
 * @ClassName: CommonFilter
 * @Description:TODO()
 * @author: wss
 * @date: 2017年12月29日 下午3:43:40
 * 
 * @Copyright: 2017 All rights reserved.
 */
public class CommonFilter implements Filter {
	private Logger logger;

	public void destroy() {

	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;

		User user = (User) httpRequest.getSession().getAttribute("SESSION_USER");
		if (user != null) {
			MDC.put("userName", user.getUsername());
			MDC.put("ip", request.getLocalAddr());
			logger.info(MDC.getContext());

			httpRequest.getSession().setAttribute("SESSION_USER", user);
		}
		chain.doFilter(httpRequest, response);
	}

	public void init(FilterConfig arg0) throws ServletException {
		logger = Logger.getLogger(CommonFilter.class);
	}

}
