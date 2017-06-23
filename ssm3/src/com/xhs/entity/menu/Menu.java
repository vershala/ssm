package com.xhs.entity.menu;

import java.util.Date;

public class Menu {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_menu.menu_cd
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    private String menuCd;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_menu.menu_name
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    private String menuName;
    
    
    private String url;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_menu.enable_flag
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    private String enableFlag;

    public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	/**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_menu.notes
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    private String notes;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_menu.create_user
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    private String createUser;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_menu.create_method
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    private String createMethod;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_menu.create_time
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    private Date createTime;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_menu.last_upd_user
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    private String lastUpdUser;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_menu.last_upd_method
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    private String lastUpdMethod;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_menu.last_upd_time
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    private Date lastUpdTime;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_menu.menu_cd
     *
     * @return the value of tb_menu.menu_cd
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    public String getMenuCd() {
        return menuCd;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_menu.menu_cd
     *
     * @param menuCd the value for tb_menu.menu_cd
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    public void setMenuCd(String menuCd) {
        this.menuCd = menuCd;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_menu.menu_name
     *
     * @return the value of tb_menu.menu_name
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    public String getMenuName() {
        return menuName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_menu.menu_name
     *
     * @param menuName the value for tb_menu.menu_name
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_menu.enable_flag
     *
     * @return the value of tb_menu.enable_flag
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    public String getEnableFlag() {
        return enableFlag;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_menu.enable_flag
     *
     * @param enableFlag the value for tb_menu.enable_flag
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    public void setEnableFlag(String enableFlag) {
        this.enableFlag = enableFlag;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_menu.notes
     *
     * @return the value of tb_menu.notes
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    public String getNotes() {
        return notes;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_menu.notes
     *
     * @param notes the value for tb_menu.notes
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    public void setNotes(String notes) {
        this.notes = notes;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_menu.create_user
     *
     * @return the value of tb_menu.create_user
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    public String getCreateUser() {
        return createUser;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_menu.create_user
     *
     * @param createUser the value for tb_menu.create_user
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_menu.create_method
     *
     * @return the value of tb_menu.create_method
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    public String getCreateMethod() {
        return createMethod;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_menu.create_method
     *
     * @param createMethod the value for tb_menu.create_method
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    public void setCreateMethod(String createMethod) {
        this.createMethod = createMethod;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_menu.create_time
     *
     * @return the value of tb_menu.create_time
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_menu.create_time
     *
     * @param createTime the value for tb_menu.create_time
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_menu.last_upd_user
     *
     * @return the value of tb_menu.last_upd_user
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    public String getLastUpdUser() {
        return lastUpdUser;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_menu.last_upd_user
     *
     * @param lastUpdUser the value for tb_menu.last_upd_user
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    public void setLastUpdUser(String lastUpdUser) {
        this.lastUpdUser = lastUpdUser;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_menu.last_upd_method
     *
     * @return the value of tb_menu.last_upd_method
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    public String getLastUpdMethod() {
        return lastUpdMethod;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_menu.last_upd_method
     *
     * @param lastUpdMethod the value for tb_menu.last_upd_method
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    public void setLastUpdMethod(String lastUpdMethod) {
        this.lastUpdMethod = lastUpdMethod;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_menu.last_upd_time
     *
     * @return the value of tb_menu.last_upd_time
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    public Date getLastUpdTime() {
        return lastUpdTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_menu.last_upd_time
     *
     * @param lastUpdTime the value for tb_menu.last_upd_time
     *
     * @mbggenerated Thu Jun 15 10:21:54 CST 2017
     */
    public void setLastUpdTime(Date lastUpdTime) {
        this.lastUpdTime = lastUpdTime;
    }
}