package com.xhs.aop;

import java.util.Arrays;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class Aop {
	
	@Before("execution(* com.xhs.service..*.*Impl.*(..))")
	public void before(JoinPoint point) {
		System.out.println("@Before" + point.getSignature().getDeclaringTypeName() + "." + point.getSignature().getName());
		System.out.println("@Before" + Arrays.toString(point.getArgs()));
		System.out.println("@Before" + point.getTarget());
		
	}
	
	@After("execution(* com.xhs.controller..*.*.*(..))")
	public void after(JoinPoint point) {
		System.out.println("@after" + point.getSignature().getDeclaringTypeName() + "." + point.getSignature().getName());
		System.out.println("@after" + Arrays.toString(point.getArgs()));
		System.out.println("@after" + point.getTarget());
	}

}
