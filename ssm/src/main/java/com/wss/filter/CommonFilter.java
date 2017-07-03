package com.wss.filter;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.apache.log4j.MDC;
import org.springframework.util.ReflectionUtils;

import com.wss.model.user.User;

public class CommonFilter implements Filter {
	private Logger logger;  
	
	@Override
	public void destroy() {

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;  
        
        User user = (User) httpRequest.getSession().getAttribute("SESSION_USER");  
        if (user != null) {  
        	  MDC.put("userName", user.getUsername());  
              MDC.put("ip", request.getLocalAddr());  
              logger.info(MDC.getContext());
        }  
         chain.doFilter(request, response);  

	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		logger=Logger.getLogger(CommonFilter.class);  
	}	

}
