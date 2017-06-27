package com.xhs.service.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xhs.entity.common.Pagination;
import com.xhs.entity.user.User;
import com.xhs.mapper.user.UserMapper;
import com.xhs.service.common.SqlSessionService;

@Service
@Transactional
public class UserServiceImpl extends SqlSessionService implements UserService {

	@Resource
	private UserMapper mapper;

	public boolean delete(int id) {
		return mapper.delete(id) < 0 ? true : false;
	}

	public List<User> findAll() {
		List<User> findAllList = mapper.findAll();
		return findAllList;
	}

	public User findById(int id) {
		User user = mapper.findById(id);
		return user;
	}

	public boolean save(User user) {
		return mapper.save(user) < 0 ? true : false;
	}

	public boolean update(User user) {
		return mapper.update(user) < 0 ? true : false;
	}

	public User checkLogin(String username, String password) {
		User user = mapper.getUserByUsername(username);
		if (user != null && password.equals(user.getPassword())) {
			return user;
		}
		return null;
	}

	/**
	 * 分页+模糊查询
	 * 
	 * @param startRecord
	 *            从第几条开始
	 * @param pageSize
	 *            显示多少条
	 * @param username
	 *            根据用户名查询
	 * @param age
	 *            根据年龄查询
	 * @return
	 */
	public List<User> getAllUserByPage(Integer startRecord, Integer pageSize, String username, String password) {
		return mapper.getAllUserByPage(startRecord, pageSize, username, password);
	}

	public int userCount(String username, String password) {
		return mapper.userCount(username, password);
	}

	public List<Map<String,Object>> getAllUserByPage1(Integer startRecord, Integer pageSize, String username, String password) {
		Map<String,Object> parms = new HashMap<String,Object>();
		parms.put("startRecord", startRecord);
		parms.put("pageSize", pageSize);
		parms.put("username", username);
		parms.put("password", password);
		return sqlSession.selectList("com.xhs.mapper.user.UserMapper.getAllUserByPage",parms);
	}
	
	public List<Map<String,Object>> queryList(Map<String,Object> parms) {
		return sqlSession.selectList("com.xhs.mapper.user.UserMapper.queryList",parms);
	}
	
	public List<Map<String,Object>> queryList(Map<String,Object> parms,Pagination pagination) {
		return sqlSession.selectList("com.xhs.mapper.user.UserMapper.queryList",parms,pagination);
	}
}
