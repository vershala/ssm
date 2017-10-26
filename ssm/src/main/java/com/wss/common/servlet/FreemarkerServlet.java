package com.wss.common.servlet;

import java.io.IOException;
import java.util.regex.Pattern;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import freemarker.template.TemplateModelException;

public class FreemarkerServlet extends freemarker.ext.servlet.FreemarkerServlet {

	private static final long serialVersionUID = 7851254637224082916L;
	private static final Pattern STANDARD_SPLIT = Pattern.compile("[\\s,]+");

	public void init() throws ServletException {
		super.init();
	}

	protected void initializeServletContext(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			this.getConfiguration().setSharedVariable("ctx", request.getContextPath());
		} catch (TemplateModelException e) {
			getServletContext().log(e.getMessage());
		}
	}

	public void destroy() {
		getServletContext().log("destroy...");
		super.destroy();
	}

	public static String[] standardSplit(String input) {
		if (input == null) {
			return new String[0];
		} else {
			return STANDARD_SPLIT.split(input.trim());
		}
	}
}
