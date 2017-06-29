package com.wss.service.user;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wss.dao.user.UserRoleMapper;
import com.wss.model.user.UserRole;
@Service
@Transactional
public class UserRoleServiceImpl implements UserRoleService {
	@Resource
	private UserRoleMapper mapper;
	
	public boolean insert(UserRole userRole) {
		return mapper.insert(userRole) < 0 ? true : false;
	}
	
	public boolean update(UserRole userRole) {
		return mapper.update(userRole) < 0 ? true : false;
	}
}
