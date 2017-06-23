package com.xhs.mapper.menu;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.xhs.entity.menu.Menu;

public interface MenuMapper {

	public int insert(Menu menu);

	public int update(Menu menu);
	
	public int delete(int id);

	public List<Menu> queryList();

	public List<Menu> queryByPage(
			@Param(value = "startRecord") Integer startRecord,
			@Param(value = "pageSize") Integer pageSize,
			@Param(value = "menuCd") String menuCd,
			@Param(value = "menuName") String menuName);
	
	public int count(@Param(value = "menuCd") String menuCd, 
			@Param(value = "menuName") String menuName);
}