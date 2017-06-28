package com.wss.service.menu;

import java.util.List;

import com.wss.model.menu.Menu;



public interface MenuService {

	public boolean insert(Menu menu);
	
	public boolean update(Menu menu);
	
	public boolean delete(int id);
	
	public List<Menu> queryList();
	
	public List<Menu> queryByPage(Integer startRecord, Integer pageSize, String menuCd, String menuName);
	
	public int count(String menuCd,String menuName);
}
