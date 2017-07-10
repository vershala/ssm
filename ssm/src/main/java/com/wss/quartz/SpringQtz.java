package com.wss.quartz;

import java.util.Date;

public class SpringQtz {
	 private static int counter = 0;  

	protected void execute(){
		long ms = System.currentTimeMillis();  
		System.out.println("SpringQtz is " + new Date(ms)+"  "+ms+"(" + counter++ + ")");  
	}  
}
