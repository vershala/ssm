package com.wss.aop;

import java.lang.reflect.Method;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class Aop {

	@Before("execution(* com.wss.service..*.*Impl.*(..))")
	public void before(JoinPoint point) {
		 System.out.println("@Before" +
		 point.getSignature().getDeclaringTypeName() + "." +
		 point.getSignature().getName());
		// System.out.println("@Before" + Arrays.toString(point.getArgs()));
		// System.out.println("@Before" + point.getTarget());

	}

	@After("execution(* com.xhs.controller..*.*.*(..))")
	public void after(JoinPoint point) {
		// System.out.println("@after" +
		// point.getSignature().getDeclaringTypeName() + "." +
		// point.getSignature().getName());
		// System.out.println("@after" + Arrays.toString(point.getArgs()));
		// System.out.println("@after" + point.getTarget());
	}

	@Around("execution(* com.wss.service..*.*Impl.*(..))")
	public void getCacheKey(ProceedingJoinPoint joinPoint) {

		MethodSignature ms = (MethodSignature) joinPoint.getSignature();
		Method method = ms.getMethod();
		String name = method.getName();
		System.out.println("name is  "+name);
		System.out.println("value is  "+method.getDefaultValue());
		System.out.println("parms is  "+joinPoint.getArgs());
		System.out.println("parms length is  "+joinPoint.getArgs().length);
		Object[] args = joinPoint.getArgs();  
        if (args != null && args.length > 0) {  
        	System.out.println("parms is  "+args[0]);  
        }  
		Object object = null;  
        try {  
            object = joinPoint.proceed();  
        } catch (Throwable e) {  
              
            e.printStackTrace();  
        }  
        System.out.println("object is  "+object);
	}
}
