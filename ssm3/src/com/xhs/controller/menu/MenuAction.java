package com.xhs.controller.menu;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.xhs.entity.menu.Menu;
import com.xhs.service.menu.MenuService;
import com.xhs.util.Pager;

@Controller
@RequestMapping("/menu")
public class MenuAction {
	@Autowired
	private MenuService menuService;

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
