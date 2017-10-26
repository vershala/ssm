/**
 * Project Name:ssm3
 * File Name:LogServiceImpl.java
 * Package Name:com.xhs.service.log
 * Date:2017年6月26日上午10:13:10
 * Copyright (c) 2017, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.wss.service.log;

import org.apache.log4j.Logger;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.wss.common.dataSource.DbContextHolder;
import com.wss.model.log.OperateLog;
import com.wss.model.log.RequestLog;
import com.wss.service.common.SqlSessionService;

/**
 * ClassName:LogServiceImpl <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason: TODO ADD REASON. <br/>
 * Date: 2017年6月26日 上午10:13:10 <br/>
 * 
 * @author Administrator
 * @version
 * @since JDK 1.6
 * @see
 */
@Service
public class LogServiceImpl extends SqlSessionService implements LogService {
	private Logger logger = Logger.getLogger(LogService.class);

	public void insert(OperateLog log) throws DataAccessException {
		try {
			sqlSession.insert("com.wss.dao.log.LogMapper.insert", log);
		} catch (DataAccessException e) {
			logger.error(e.getMessage());
		}
	}

	public void insert(RequestLog log) throws DataAccessException {
		try {
			DbContextHolder.setDbType(DbContextHolder.DB_TYPE_LOG);
			sqlSession.insert("com.wss.dao.log.RequestLogMapper.insert", log);
			DbContextHolder.setDbType(DbContextHolder.DB_TYPE_MYSQL);
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
	}
}
