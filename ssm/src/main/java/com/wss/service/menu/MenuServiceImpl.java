package com.wss.service.menu;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wss.dao.menu.MenuMapper;
import com.wss.model.menu.Menu;
import com.wss.service.common.SqlSessionService;

@Service
@Transactional
public class MenuServiceImpl extends SqlSessionService implements MenuService {
	@Resource
	private MenuMapper mapper;
	
	public boolean insert(Menu menu) {
		return mapper.insert(menu) < 0 ? true : false;
	}

	public boolean update(Menu menu) {
		return mapper.update(menu) < 0 ? true : false;
	}

	public boolean delete(int id) {
		return mapper.delete(id) < 0 ? true : false;
	}

	public List<Menu> queryList() {
		List<Menu> list = mapper.queryList();
		return list;
	}

	public List<Menu> queryByPage(Integer startRecord, Integer pageSize, String menuCd, String menuName) {
		return mapper.queryByPage(startRecord, pageSize, menuCd, menuName);
	}

	public int count(String menuCd, String menuName) {
		return mapper.count(menuCd, menuName);
	}

}
