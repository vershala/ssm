/**
 * Project Name:ssm3
 * File Name:JsonResult.java
 * Package Name:com.xhs.entity.common
 * Date:2017骞�6鏈�26鏃ヤ笅鍗�2:55:20
 * Copyright (c) 2017, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.wss.model.common;
/**
 * ClassName:JsonResult <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2017骞�6鏈�26鏃� 涓嬪崍2:55:20 <br/>
 * @author   Administrator
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
public class JsonResult {
	private boolean success;

    private String message;

    private Object data;


    public JsonResult(){
    }

    public JsonResult(boolean success){
        this(success, null, null);
    }

    public JsonResult(boolean success, String message){
        this(success, message, null);
    }

    public JsonResult(boolean success, String message, Object data){
        this.success = success;
        this.message = message;
        this.data = data;
    }

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}
}

