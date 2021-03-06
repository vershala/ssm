package com.wss.action.menu;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.wss.model.menu.Menu;
import com.wss.service.jedis.JedisService;
import com.wss.service.menu.MenuService;
import com.wss.util.Pager;

@Controller
@RequestMapping("/menu")
public class MenuAction {
	@Autowired
	private MenuService menuService;
	@Autowired
	JedisService service;

	private Pager pager;
	private Menu menu;
	
	public Menu getMenu() {
		return menu;
	}

	public void setMenu(Menu menu) {
		this.menu = menu;
	}

	@RequestMapping(value = "/list")
	@ResponseBody
	public ModelAndView list(ModelAndView model, Menu menu, Pager pager, HttpServletRequest request) {
		if (pager == null) {
			pager = new Pager();
		}
		request.getSession().setAttribute("aaa", "bbbb");
		if (menu == null) {
			menu = new Menu();
		}
		pager.setTotal(menuService.count(menu.getMenuCd(), menu.getMenuName()));
		List<Menu> list = menuService.queryByPage(pager.getStartRecord(), pager.getPageSize(),menu.getMenuCd(), menu.getMenuName());
		request.setAttribute("list", list);
		request.setAttribute("pager", pager);
		model.setViewName("/menu/list");
		return model;
	}

	public Pager getPager() {
		return pager;
	}

	public void setPager(Pager pager) {
		this.pager = pager;
	}
}
