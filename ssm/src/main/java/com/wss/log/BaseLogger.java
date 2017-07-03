package com.wss.log;

import javax.annotation.PostConstruct;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.log4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wss.service.log.LogService;
@Component
public class BaseLogger {
	
	private static BaseLogger baseLogger; 
	private static Log operateLog = null;
	private static Log errorLog = null;
	
	@Autowired
	private LogService logService;
	
	
	static {
		operateLog = LogFactory.getLog("operate");
		errorLog = LogFactory.getLog("error");
	}
	
	@PostConstruct 
    public  void init() { 
		baseLogger = this; 
		baseLogger.logService = this.logService; 
    } 
	
	public static void operateLog(OperateLog log){
        MDC.put("userName",log.getUserName());  
        MDC.put("oprate", log.getOperate());  
        MDC.put("method", log.getMethod());  
        MDC.put("parms", log.getParams());  
        MDC.put("ip", log.getIp());  
		operateLog.info(MDC.getContext());
		baseLogger.logService.insert(log);
	}
	
	public static void errorLog(OperateLog log){
        MDC.put("userName",log.getUserName());  
        MDC.put("oprate", log.getOperate());  
        MDC.put("method", log.getMethod());  
        MDC.put("parms", log.getParams());  
        MDC.put("ip", log.getIp());  
        errorLog.info(MDC.getContext());
	}
}
