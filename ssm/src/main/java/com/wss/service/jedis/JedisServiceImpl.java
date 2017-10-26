package com.wss.service.jedis;

import java.util.Iterator;
import java.util.Set;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

@Service
public class JedisServiceImpl implements JedisService {
	@Autowired
	private JedisPool jedisPool;

	protected static Logger logger = Logger.getLogger(JedisServiceImpl.class);

	public void returnResource(final Jedis jedis) {
		if (jedis != null && jedisPool != null) {
			jedisPool.returnResource(jedis);
		}
	}

	public synchronized Jedis getJedis() {
		Jedis jedis = null;
		try {
			if (jedisPool != null) {
				jedis = jedisPool.getResource();
			}
		} catch (Exception e) {
			logger.error("Get jedis error : " + e);
		} finally {
			returnResource(jedis);
		}
		return jedis;
	}

	public String get(String key) {
		String string = getJedis().get(key);
		return string;
	}

	public String set(String key, String value) {
		String string = getJedis().set(key, value);
		return string;
	}

	@Override
	public Set<String> keys(String preStr) {
		Set<String> set = getJedis().keys(preStr + "*");
		return set;
	}

	@Override
	public String hget(String hkey, String key) {
		String string = getJedis().hget(hkey, key);
		return string;
	}

	@Override
	public long hset(String hkey, String key, String value) {
		Long result = getJedis().hset(hkey, key, value);
		return result;
	}

	@Override
	public long incr(String key) {
		Long result = getJedis().incr(key);
		return result;
	}

	@Override
	public long expire(String key, int second) {
		Long result = getJedis().expire(key, second);
		return result;
	}

	@Override
	public long ttl(String key) {
		Long result = getJedis().ttl(key);
		return result;
	}

	@Override
	public long del(String key) {
		Long result = getJedis().del(key);
		return result;
	}

	public void batchDel(Set<String> keys) {
		Iterator<String> it = keys.iterator();
		while (it.hasNext()) {
			String key = it.next();
			getJedis().del(key);
		}
	}

	@Override
	public long hdel(String hkey, String key) {
		Long result = getJedis().hdel(hkey, key);
		return result;
	}
}
