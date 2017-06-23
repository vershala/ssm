package com.xhs.service.user;

import java.util.List;
import java.util.Map;

import com.xhs.entity.user.User;


public interface UserService {
	
	public boolean save(User user);
	
	public boolean update(User user);
	
	public boolean delete(int id);
	
	public User findById(int id);
	
	public List<User> findAll();
	
	public User checkLogin(String username,String password);
	
	public List<User> getAllUserByPage(Integer startRecord,Integer pageSize,String username,String password);
	
	public List<Map<String,Object>> getAllUserByPage1(Integer startRecord, Integer pageSize, String username, String password);
	
	public int userCount(String username,String password);
}
