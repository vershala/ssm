package com.wss.common.task;

import java.util.Date;

public class SpringTask1 {
	private static int counter = 0;  

	public  void execute(){
		long ms = System.currentTimeMillis();  
		System.out.println("SpringTask1 is " + new Date(ms)+"  "+ms+"(" + counter++ + ")");  
	}  
}
