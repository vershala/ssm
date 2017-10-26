package com.wss.common.dataSource;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

public class DbContextHolder extends AbstractRoutingDataSource {
	public static final ThreadLocal<String> dbContext = new ThreadLocal<String>();
	public static final String DB_TYPE_ORACLE = "oracle";
	public static final String DB_TYPE_MYSQL = "mysql";
	public static final String DB_TYPE_LOG = "mysqlLog";

	public static void setDbType(String dbType) {
		dbContext.set(dbType);
	}

	public static String getDbType() {
		String dbType = (String) dbContext.get();
		return dbType;
	}

	public void clearContext() {
		dbContext.remove();
	}

	@Override
	protected Object determineCurrentLookupKey() {
		return DbContextHolder.getDbType();
	}

}
