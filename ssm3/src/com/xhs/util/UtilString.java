package com.xhs.util;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.util.CollectionUtils;

public abstract class UtilString {
	public static void main(String[] args) {
		System.out.println(UtilString.removeZero("0.19"));
	}
	public static void underscoreName(String name, StringBuilder result) {
		result.setLength(0);
		for (int i = 0; i < name.length(); i++) {
			char c = name.charAt(i);
			if (Character.isUpperCase(c)) {
				result.append("_");
				result.append(Character.toLowerCase(c));
			} else {
				result.append(c);
			}
		}
	}
	public static boolean isCamelCase(String name) {
		if (Character.isUpperCase(name.charAt(0))) {
			return false;
		}
		int upperCaseCnt = 0;
		int lowCaseCnt = 0;
		for (int i = 1; i < name.length(); i++) {
			char c = name.charAt(i);
			if (c == '_') {
				return false;
			}
			if (Character.isUpperCase(c)) {
				upperCaseCnt++;
			} else {
				lowCaseCnt++;
			}
		}
		return upperCaseCnt > 0 && upperCaseCnt > 0;
	}
	public static void camelCaseName(String name, StringBuilder result) {
		try {
			result.setLength(0);
			for (int i = 0; i < name.length(); ++i) {
				char c = name.charAt(i);
				if (c == '_') {
					c = name.charAt(++i);
					result.append(Character.toUpperCase(c));
				} else {
					result.append(Character.toLowerCase(c));
				}
			}
		} catch (StringIndexOutOfBoundsException e) {
		}
	}
	public static List<String> toList(String str, char sep) {
		if (StringUtils.isEmpty(str)) {
			return Collections.emptyList();
		}
		List<String> result = new ArrayList<String>();
		toList(str, sep, result);
		return result;
	}
	public static void toList(String str, char sep, List<String> list) {
		StringBuilder sb = new StringBuilder();
		list.clear();
		for (int idx = 0; idx < str.length(); ++idx) {
			char c = str.charAt(idx);
			if (c == sep) {
				list.add(sb.toString().trim());
				sb.setLength(0);
			} else {
				sb.append(c);
			}
		}
		if (sb.length() > 0) {
			list.add(sb.toString().trim());
			sb.setLength(0);
		}
	}
	/**
	 * 转换为null
	 * 
	 * @param obj
	 * @return
	 */
	public static String spaceToNull(Object obj) {
		if (obj == null || obj.toString().length() == 0) {
			return null;
		}
		return obj.toString();
	}
	public static String nullToSpace(Object obj) {
		if (obj == null) {
			return "";
		}
		return obj.toString();
	}
	public static BigDecimal nullToZero(Object obj) {
		if (obj == null || obj.toString().length() == 0) {
			return BigDecimal.ZERO;
		}
		return new BigDecimal(obj.toString());
	}
	/**
	 * 自动补充到指定长度
	 * 
	 * @param obj
	 *            原数据
	 * @param val
	 *            补充的字段
	 * @param posion
	 *            left-左补/right-右补
	 * @param length
	 *            补充后的长度
	 * @return
	 */
	public static String fillWithZero(Object obj, String val, String posion, int length) {
		String retValue = nullToSpace(obj);
		while (retValue.length() < length) {
			if ("left".equalsIgnoreCase(posion)) {
				// 左侧补0
				retValue = val + retValue;
			} else {
				// 右侧补0
				retValue = retValue + val;
			}
		}
		return retValue;
	}
	/**
	 * 日期格式转换
	 * 
	 * @param format
	 * @return
	 */
	public static String formatDate(String format) {
		return formatDate(new Date(), format);
	}
	/**
	 * 日期格式转换
	 * 
	 * @param inDate
	 * @param format
	 * @return
	 */
	public static String formatDate(Date inDate, String format) {
		SimpleDateFormat dateFormat = new SimpleDateFormat(format);
		return dateFormat.format(inDate);
	}
	/**
	 * 
	 * @param displaysz
	 * @return
	 */
	public static long displayszToByteCount(String displaysz) {
		Pattern pattern = Pattern.compile("([\\d,]+)([kKmMgG]?).*");
		Matcher matcher = pattern.matcher(displaysz);
		if (!matcher.matches()) {
			return -1;
		} else {
			String digits = matcher.group(1);
			String suffix = matcher.group(2).toLowerCase();
			long number = Long.parseLong(digits);
			if ("k".equals(suffix)) {
				number = number * 1024;
			} else if ("m".equals(suffix)) {
				number = number * 1024 * 1024;
			} else if ("g".equals(suffix)) {
				number = number * 1024 * 1024 * 1024;
			}
			return number;
		}
	}
	
	public static String removeZero(String str) {
		if (!NumberUtils.isNumber(str)) {
			return str;
		}
        boolean hasDot = StringUtils.contains(str, '.');
        if (!hasDot) {
        	return str;
        }
        else {
        	
        }
        int i = str.length() - 1;
        if (str.charAt(i) != '0') {
        	return str;
        }
        for ( ; i > 0 ; i--) {
            if (str.charAt(i) == '0') {
            }
            else if (str.charAt(i) == '.') {
            	break;
            }
        }
        return str.substring(0, i);
	}
	
	/**
	 * Description:将null转换为空值,适用于页面原有值清空后,后台数据没有清掉的情况
	 * param :
	 * @author wangss
	 * @date 2016-5-12
	 */
	public static void nullToBlank(Map<String, Object> map, String... reqFields) {
		for (String req : reqFields) {
			if (map.get(req) == null) {
				map.put(req, "");
			}
		}
	}
	
	/**
	 * 
	 * @param list 
	 * @param key
	 * @param joinStr
	 * @return
	 */
	public static String join(List<?> list, String key, String joinStr) {
		
		StringBuffer buf = new StringBuffer();
		if(CollectionUtils.isEmpty(list)) {
			return buf.toString();
		}
		if(!"".equals(key)) {
			for(int i = 0; i < list.size(); i ++) {
				Map<?, ?> map = (Map<?, ?>) list.get(i);
				buf.append(UtilString.nullToSpace(map.get(key)));
				if(i != list.size() - 1) {
					buf.append(joinStr);
				}
			}
		} else {
			for(int i = 0; i < list.size(); i ++) {
				String str = UtilString.nullToSpace(list.get(i));
				buf.append(str);
				if(i != list.size() - 1) {
					buf.append(joinStr);
				}
			}
		}
		return buf.toString();
	}
}
