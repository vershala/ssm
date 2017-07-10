package com.wss.service.jedis;

import java.util.Set;

/**   
 * @ClassName:  JedisService   
 * @Description:TODO(jedis接口方法)   
 * @author: wss
 * @date:   2017年7月21日 上午11:10:22   
 *     
 * @Copyright: 2017  All rights reserved. 
 */  
public interface JedisService {
	/**   
	 * @Title: get   
	 * @Description: 根据指定key获取缓存对象
	 * @param: @param key
	 * @param: @return      
	 * @return: String      
	 * @throws   
	 */  
	String get(String key);
	
	/**   
	 * @Title: keys   
	 * @Description: 根据指定前缀获取key列表
	 * @param: @param preStr
	 * @param: @return      
	 * @return: Set<String>      
	 * @throws   
	 */  
	Set<String> keys(String preStr);

	String set(String key, String value);

	String hget(String hkey, String key);

	long hset(String hkey, String key, String value);

	long incr(String key);

	long expire(String key, int second);

	long ttl(String key);

	long del(String key);
	
	void batchDel(Set<String> keys);

	long hdel(String hkey, String key);
}
