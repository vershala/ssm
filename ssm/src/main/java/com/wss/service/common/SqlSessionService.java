package com.wss.service.common;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class SqlSessionService {
	protected SqlSession sqlSession;
	private String namespace;
	public SqlSessionService(String namespace) {
		this.namespace = namespace;
	}
	public SqlSessionService() {
		super();
	}
	public String sql(String st) {
		return String.format("%s.%s", namespace, st);
	}
	@Autowired
	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	public <T> T selectOne(String statement) {
		return sqlSession.selectOne(sql(statement));
	}
	public <T> T selectOne(String statement, Object parameter) {
		return sqlSession.selectOne(sql(statement), parameter);
	}
	public <E> List<E> selectList(String statement) {
		return sqlSession.selectList(sql(statement));
	}
	public <E> List<E> selectList(String statement, Object parameter) {
		List<E> list = sqlSession.selectList(sql(statement), parameter);
		if (list != null) {
			return list;
		}
		return Collections.emptyList();
	}
	public <E> List<E> selectList(String statement, Object parameter, RowBounds rowBounds) {
		List<E> list = sqlSession.selectList(sql(statement), parameter, rowBounds);
		if (list != null) {
			return list;
		}
		return Collections.emptyList();
	}
	public <K, V> Map<K, V> selectMap(String statement, String mapKey) {
		return sqlSession.selectMap(sql(statement), mapKey);
	}
	public <K, V> Map<K, V> selectMap(String statement, Object parameter, String mapKey) {
		return sqlSession.selectMap(sql(statement), parameter, mapKey);
	}
	public <K, V> Map<K, V> selectMap(String statement, Object parameter, String mapKey, RowBounds rowBounds) {
		return sqlSession.selectMap(sql(statement), parameter, mapKey, rowBounds);
	}
	public int update(String statement) {
		return sqlSession.update(sql(statement));
	}
	public int update(String statement, Object parameter) {
		return sqlSession.update(sql(statement), parameter);
	}
	public int insert(String statement) {
		return sqlSession.insert(sql(statement));
	}
	public int insert(String statement, Object parameter) {
		return sqlSession.insert(sql(statement), parameter);
	}
	public int delete(String statement) {
		return sqlSession.delete(sql(statement));
	}
	public int delete(String statement, Object parameter) {
		return sqlSession.delete(sql(statement), parameter);
	}
}
