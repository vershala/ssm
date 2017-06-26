/**
 * Project Name:ssm3
 * File Name:BaseAction.java
 * Package Name:com.xhs.controller.common
 * Date:2017年6月26日下午2:43:33
 * Copyright (c) 2017, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.xhs.controller.common;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.alibaba.fastjson.JSON;
import com.xhs.entity.common.JsonResult;
import com.xhs.util.Pager;
import com.xhs.util.UtilString;

/**
 * ClassName:BaseAction <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason: TODO ADD REASON. <br/>
 * Date: 2017年6月26日 下午2:43:33 <br/>
 * 
 * @author Administrator
 * @version
 * @since JDK 1.6
 * @see
 */
public class BaseAction {
	private Pager pager;
	public Pager getPager() {
		return pager;
	}

	public void setPager(Pager pager) {
		this.pager = pager;
	}

	protected HttpServletRequest getRequest() {
		return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
	}

	protected ServletContext getContext() {
		HttpServletRequest request = getRequest();
		if (request != null) {
			return request.getSession().getServletContext();
		}

		return null;
	}

	protected void jsonString(JsonResult result, HttpServletResponse response) {
		response.setContentType("application/json");
		try {
			PrintWriter out = response.getWriter();
			out.write(JSON.toJSONString(result));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@SuppressWarnings("unchecked")
	public Map<String, Object> getParametersStartingWith(String prefix) {
		Map<String, Object> params = new TreeMap<String, Object>();
		if (prefix == null) {
			prefix = "";
		}
		HttpServletRequest request = this.getRequest();
		String method = this.getRequest().getMethod();
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
