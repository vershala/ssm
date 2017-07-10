package com.wss.task;

import java.util.Date;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component("taskJob") 
public class SpringTask2 {
	private static int counter = 0;  
	
	@Scheduled(cron = "0/5 * * * * ?")  
	public  void execute(){
		long ms = System.currentTimeMillis();  
		System.out.println("SpringTask2 is " + new Date(ms)+"  "+ms+"(" + counter++ + ")");  
	}  
}
