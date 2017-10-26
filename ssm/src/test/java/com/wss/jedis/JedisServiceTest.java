package com.wss.jedis;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.wss.base.BaseTest;
import com.wss.service.jedis.JedisService;

public class JedisServiceTest extends BaseTest {
	@Autowired
	JedisService service;

	@Test
	public void test() {
		//
		// Seller sell1 = new Seller("售货员1");
		//
		// for (int i = 1; i <= 3; i++) {
		// new Thread(sell1, "t1" + i).start();
		// }
	}

	@Test
	public void test2() {
		ExecutorService exService = Executors.newCachedThreadPool();

		Seller sell1 = new Seller("售货员1");
		Seller sell2 = new Seller("售货员2");

		Buyer buyer1 = new Buyer("买票人1", 3, sell1);
		Buyer buyer2 = new Buyer("买票人1", 3, sell1);
		Buyer buyer3 = new Buyer("买票人2", 3, sell2);

		exService.submit(buyer1);
		exService.submit(buyer2);
		exService.submit(buyer3);
		try {
			Thread.sleep(100000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public class Seller implements Runnable {
		private int num = 1;
		private String name;
		private String buyer;

		public Seller(String name) {
			this.name = name;
		}

		public void setNum(int num) {
			this.num = num;
		}

		private synchronized void sell(int num, String buyer) {
			int count = Integer.valueOf(service.get("count"));
			if (count >= num) {
				count -= num;
				service.set("count", String.valueOf(count));
				System.out.println(name + "成功卖给 " + buyer + "  " + +num + "张");
				System.out.println("当前剩余票数为：" + count);
			} else {
				System.out.println("余票不足！");
			}
		}

		public void run() {
			sell(num, buyer);
		}
	}

	public class Buyer implements Runnable {
		private int num;
		private String name;
		private Seller seller = null;

		public Buyer(String name, int num, Seller seller) {
			this.name = name;
			this.num = num;
			this.seller = seller;
		}

		private synchronized void buy() {
			seller.sell(num, name);
		}

		public void run() {
			buy();
		}
	}
}
