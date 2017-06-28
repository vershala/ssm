package com.wss.model.common;

import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.session.RowBounds;

import java.util.Map;

public class Pagination extends RowBounds {
	private int totalCount;
	private String sortField;
	private String sortOrder;

	// 因为父类的offset和limit在运行期间将被替换掉,所以在此记录初始值
	private int myOffset;
	private int mylimit;
	private boolean proceed;

	public boolean isProceed() {
		return proceed;
	}

	public void setProceed(boolean proceed) {
		this.proceed = proceed;
	}

	static public Pagination DEFAULT = new Pagination();

	public static Pagination create(Map<String, Object> parms) {
		String pageIndexstr = (String) parms.get("pageIndex");
		if (StringUtils.isBlank(pageIndexstr)) {
			return Pagination.DEFAULT;
		}
		// 分页
		int currentPage = Integer.parseInt(pageIndexstr) + 1;
		int numPerPage = Integer.parseInt((String) parms.get("pageSize"));
		// 字段排序
		String sortField = (String) parms.get("sortField");
		String sortOrder = (String) parms.get("sortOrder");

		Pagination pagination = Pagination.create(currentPage, numPerPage);
		pagination.setSortField(sortField);
		pagination.setSortOrder(sortOrder);
		return pagination;
	}

	/**
	 * 页按1做基数
	 * 
	 * @param currentPage
	 * @param numPerPage
	 * @return
	 */
	public static Pagination create(int currentPage, int numPerPage) {
		int offset = (currentPage - 1) * numPerPage;
		int limit = numPerPage;
		Pagination pagination = new Pagination(offset, limit);
		return pagination;
	}

	public Pagination() {
		super();
		init();
	}
	
	public Pagination(int offset, int limit) {
		super(offset, limit);
		init();
	}

	protected void init() {
		this.proceed = true;
		this.myOffset = this.getOffset();
		this.mylimit = this.getLimit();
	}

	public int getMyOffset() {
		return myOffset;
	}

	public int getMylimit() {
		return mylimit;
	}
	
	public void setMylimit(int myLimit) {
		mylimit = myLimit;
	}

	public boolean isNotLimit() {
		return this.mylimit == Integer.MAX_VALUE && this.myOffset == 0;
	}

	public String getSortField() {
		return sortField;
	}

	public void setSortField(String sortField) {
		this.sortField = sortField;
	}

	public String getSortOrder() {
		return sortOrder;
	}

	public void setSortOrder(String sortOrder) {
		this.sortOrder = sortOrder;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public int getPageNum() {
		return (int) Math.ceil((double) totalCount / this.getLimit());
	}

	public int getNumPerPage() {
		return this.getLimit();
	}

	public int whichPage(int offset) {
		return (int) Math.ceil((double) (offset + 1) / getNumPerPage());
	}

}
