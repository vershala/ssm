package com.wss.interceptor;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Properties;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.executor.parameter.ParameterHandler;
import org.apache.ibatis.executor.statement.BaseStatementHandler;
import org.apache.ibatis.executor.statement.RoutingStatementHandler;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.factory.DefaultObjectFactory;
import org.apache.ibatis.reflection.factory.ObjectFactory;
import org.apache.ibatis.reflection.wrapper.DefaultObjectWrapperFactory;
import org.apache.ibatis.reflection.wrapper.ObjectWrapperFactory;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.RowBounds;

import com.wss.model.common.Pagination;

@Intercepts({ @Signature(type = StatementHandler.class, method = "prepare", args = { Connection.class }) })
public class PaginationInterceptor implements Interceptor {

	public static final String _SORD = "_sord";
	public static final String _SIDX = "_sidx";

	protected static Log log = LogFactory.getLog(PaginationInterceptor.class);
	/**
     * 默认ObjectFactory
     */
    private static final ObjectFactory DEFAULT_OBJECT_FACTORY = new DefaultObjectFactory();
    /**
     * 默认ObjectWrapperFactory
     */
    private static final ObjectWrapperFactory DEFAULT_OBJECT_WRAPPER_FACTORY = new DefaultObjectWrapperFactory();

	public Object intercept(Invocation invocation) throws Throwable {
		if (invocation.getTarget() instanceof RoutingStatementHandler) {
			StatementHandler statementHandler = (StatementHandler) invocation.getTarget();
			MetaObject metaStatementHandler = MetaObject.forObject(statementHandler,DEFAULT_OBJECT_FACTORY,DEFAULT_OBJECT_WRAPPER_FACTORY);
			BaseStatementHandler delegate = (BaseStatementHandler) metaStatementHandler.getValue("delegate");
			MetaObject metaDelegate = MetaObject.forObject(delegate,DEFAULT_OBJECT_FACTORY,DEFAULT_OBJECT_WRAPPER_FACTORY);
			BoundSql boundSql = delegate.getBoundSql();
			String originalSql = boundSql.getSql();
			originalSql = StringUtils.removeEnd(originalSql, ";");
			MappedStatement mappedStatement = (MappedStatement) metaDelegate.getValue("mappedStatement");
			log.info("1.resource:     " + mappedStatement.getResource());
			log.info("2.mappedStatementId:     " + mappedStatement.getId());
			log.info("3.sql statement:     " + originalSql);
			log.info("4.sql parameter:     " + boundSql.getParameterObject());
			RowBounds rowBounds = (RowBounds) metaDelegate.getValue("rowBounds");
			if (rowBounds == null || rowBounds == RowBounds.DEFAULT ||rowBounds.getLimit() == RowBounds.NO_ROW_LIMIT) {
				return invocation.proceed();
			}
			if (rowBounds instanceof Pagination) {
				Pagination pagination = ((Pagination) rowBounds);
				if (!pagination.isProceed()) {
					return invocation.proceed();
				}
				Connection connection = (Connection) invocation.getArgs()[0];
				String countSql = String.format("select count(*) from (%s) temp", originalSql); // 记录统计
				PreparedStatement countStmt = connection.prepareStatement(countSql);
				ParameterHandler parameterHandler = (ParameterHandler) metaStatementHandler.getValue("parameterHandler");
				parameterHandler.setParameters(countStmt);
				ResultSet rs = countStmt.executeQuery();
				int count = 0;
				if (rs.next()) {
					count = rs.getInt(1);
				}
				rs.close();
				countStmt.close();
				pagination.setTotalCount(count);
			}
			Configuration configuration = (Configuration) metaDelegate.getValue("configuration");
			String pagSql = this.generatePageSql(configuration, originalSql, rowBounds);
			metaDelegate.setValue("boundSql.sql", pagSql);
			metaDelegate.setValue("rowBounds.offset", 0);
			metaDelegate.setValue("rowBounds.limit", Integer.MAX_VALUE);
		}
		return invocation.proceed();
	}

	private String generatePageSql(Configuration configuration, String originalSql, RowBounds rowBounds) {
		String databaseType = configuration.getDatabaseId();
		if (StringUtils.startsWithIgnoreCase(databaseType, "oracle")) {
			StringBuffer sb = new StringBuffer(originalSql.length() + 128);
			int offset = rowBounds.getOffset();
			if (offset > 0) {
				sb.append("SELECT * FROM ( SELECT ROW_.*, ROWNUM ROWNUM_ FROM ( ");
			} else {
				sb.append("SELECT * FROM ( ");
			}
			sb.append(originalSql);
			int limit = rowBounds.getLimit();
			if (offset > 0) {
				sb.append(" ) ROW_ WHERE ROWNUM <= ").append(limit + offset).append(") WHERE ROWNUM_ > ").append(offset);
			} else {
				sb.append(" ) WHERE ROWNUM <= ").append(limit);
			}
			return sb.toString();
		} else {
			StringBuilder sb = new StringBuilder(originalSql);
			if (rowBounds.getOffset() <= 0) {
				if (rowBounds.getLimit() >= Integer.MAX_VALUE) { // 读取所有，不需要Limit.

				} else {
					sb.append(" LIMIT ").append(rowBounds.getLimit());
				}
			} else {
				sb.append(" LIMIT ").append((rowBounds.getOffset())).append(", ").append(rowBounds.getLimit());
			}
			return sb.toString();
		}
	}

	public Object plugin(Object target) {
		return Plugin.wrap(target, this);
	}

	public void setProperties(Properties properties) {

	}

}
