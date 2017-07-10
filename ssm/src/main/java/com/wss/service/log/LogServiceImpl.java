/**
 * Project Name:ssm3
 * File Name:LogServiceImpl.java
 * Package Name:com.xhs.service.log
 * Date:2017年6月26日上午10:13:10
 * Copyright (c) 2017, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.wss.service.log;

import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.wss.log.OperateLog;
import com.wss.service.common.SqlSessionService;

/**
 * ClassName:LogServiceImpl <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2017年6月26日 上午10:13:10 <br/>
 * @author   Administrator
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
@Service
public class LogServiceImpl extends SqlSessionService implements LogService {

	public void insert(OperateLog log) throws DataAccessException{
		try{
			sqlSession.insert("com.wss.dao.log.LogMapper.insert",log);
		}catch (DataAccessException e) {
			System.out.println(e.getMessage());
		}
	}

}

