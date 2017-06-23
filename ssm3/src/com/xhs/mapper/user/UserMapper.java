package com.xhs.mapper.user;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.xhs.entity.user.User;

public interface UserMapper {

	public int save(User user);

	public int update(User user);

	public int delete(int id);

	public User findById(int id);

	public List<User> findAll();

	public User getUserByUsername(String username);


	public List<User> getAllUserByPage(
			@Param(value = "startRecord") Integer startRecord,
			@Param(value = "pageSize") Integer pageSize,
			@Param(value = "username") String username,
			@Param(value = "password") String password);

	public int userCount(@Param(value = "username") String username, 
			@Param(value = "password") String password);

}
