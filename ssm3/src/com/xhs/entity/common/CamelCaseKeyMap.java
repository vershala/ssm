package com.xhs.entity.common;

import java.util.LinkedHashMap;

import com.xhs.util.UtilString;

public class CamelCaseKeyMap extends LinkedHashMap<String, Object> {
	public static void main(String[] args) {
		System.out.println(Number.class.isAssignableFrom(Long.class));
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = -4380802260759119767L;

	private StringBuilder camelCaseNameKeyBuff;

	private boolean isCamelCaseNameKey;

	public CamelCaseKeyMap() {
		this(true);
	}

	public CamelCaseKeyMap(boolean isCamelCaseNameKey) {
		this.isCamelCaseNameKey = isCamelCaseNameKey;
		if (isCamelCaseNameKey) {
			camelCaseNameKeyBuff = new StringBuilder(15);
		}
	}

	@Override
	public Object put(String key, Object value) {
		if (isCamelCaseNameKey) {
			if (!UtilString.isCamelCase(key)) {
				UtilString.camelCaseName((String) key, camelCaseNameKeyBuff);
				return super.put(camelCaseNameKeyBuff.toString(), value);
			} else {
				return super.put(key, value);
			}
		} else {
			return super.put(key, value);
		}
	}

	public Object putNoRule(String key, Object value) {
		return super.put(key, value);
	}

	public void setCamelCaseNameKey(boolean isCamelCaseNameKey) {
		this.isCamelCaseNameKey = isCamelCaseNameKey;
	}

}
