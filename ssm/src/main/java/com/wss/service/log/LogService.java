/**
 * Project Name:ssm3
 * File Name:LogService.java
 * Package Name:com.xhs.service.log
 * Date:2017年6月26日上午10:12:48
 * Copyright (c) 2017, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.wss.service.log;

import com.wss.model.log.OperateLog;
import com.wss.model.log.RequestLog;

/**
 * ClassName:LogService <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason: TODO ADD REASON. <br/>
 * Date: 2017年6月26日 上午10:12:48 <br/>
 * 
 * @author Administrator
 * @version
 * @since JDK 1.6
 * @see
 */
public interface LogService {

	public void insert(OperateLog log);

	public void insert(RequestLog log);
}
