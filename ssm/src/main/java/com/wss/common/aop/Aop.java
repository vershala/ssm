package com.wss.common.aop;

import java.lang.reflect.Method;
import java.util.Arrays;

import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import com.wss.common.filter.CommonFilter;

@Aspect
@Component
public class Aop {
	private Logger logger=Logger.getLogger(CommonFilter.class);  
	
	@Before("execution(* com.wss.service..*.*Impl.*(..))")
	public void before(JoinPoint point) {
		logger.debug("@Before" + point.getSignature().getDeclaringTypeName() + "." + point.getSignature().getName());
	}

	@After("execution(* com.wss.action..*.*.*(..))")
	public void after(JoinPoint point) {
		logger.debug("@after" + point.getSignature().getDeclaringTypeName() + "." + point.getSignature().getName());
		logger.debug("@after" + Arrays.toString(point.getArgs()));
		logger.debug("@after" + point.getTarget());
	}

	@Around("execution(* com.wss.service..*.*Impl.*(..))")
	public Object getCacheKey(ProceedingJoinPoint joinPoint) {

		MethodSignature ms = (MethodSignature) joinPoint.getSignature();
		Method method = ms.getMethod();
		String name = method.getName();
		logger.debug("name is  "+name);
		logger.debug("value is  "+method.getDefaultValue());
		logger.debug("parms is  "+joinPoint.getArgs());
		logger.debug("parms length is  "+joinPoint.getArgs().length);
		Object[] args = joinPoint.getArgs();  
        if (args != null && args.length > 0) {  
        	logger.debug("parms is  "+args[0]);  
        }  
		Object object = null;  
        try {  
            object = joinPoint.proceed();  
        } catch (Throwable e) {  
              
            e.printStackTrace();  
        }  
        logger.debug("object is  "+object);
        return object;
	}
}
