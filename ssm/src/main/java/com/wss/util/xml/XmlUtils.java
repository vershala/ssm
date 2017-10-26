package com.wss.util.xml;

import java.io.StringReader;
import java.io.StringWriter;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import com.thoughtworks.xstream.XStream;

public class XmlUtils {
	private static final String XML_DECLARATION = "<?xml version=\"1.0\" encoding=\"utf-8\"?>";

	/**   
	 * @Title: ObjToXml
	 * @Description: 使用dom4j将object转换为XML
	 * @param: @param obj
	 * @param: @return      
	 * @return: String      
	 * @throws   
	 */
	public static String ObjToXml(Object obj) {
		XStream stream = new XStream();
		stream.processAnnotations(obj.getClass());
		return new StringBuffer(XML_DECLARATION).append(stream.toXML(obj)).toString();
	}

	/**   
	 * @Title: XmlToObj   
	 * @Description: 使用dom4j将XML转换为 object
	 * @param: @param xmlStr
	 * @param: @param clazz
	 * @param: @return      
	 * @return: T      
	 * @throws   
	 */
	public static <T> T XmlToObj(String xmlStr, Class<T> clazz) {
		XStream stream = new XStream();
		stream.processAnnotations(clazz);
		Object obj = stream.fromXML(xmlStr);
		try {
			return clazz.cast(obj);
		} catch (ClassCastException e) {
			return null;
		}
	}

	/**   
	 * @Title: convertToXml   
	 * @Description: 使用jdk中自带的转换类将object转换为XML   
	 * @param: @param obj
	 * @param: @return      
	 * @return: String      
	 * @throws   
	 */
	public static String convertToXml(Object obj) {
		StringWriter sw = new StringWriter();
		try {
			JAXBContext context = JAXBContext.newInstance(obj.getClass());
			Marshaller marshaller = context.createMarshaller();
			marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
			marshaller.marshal(obj, sw);
		} catch (JAXBException e) {
			e.printStackTrace();
		}
		return sw.toString();
	}

	@SuppressWarnings("rawtypes")
	public static Object convertToObj(String xmlStr, Class clazz) {
		Object xmlObject = null;
		try {
			JAXBContext context = JAXBContext.newInstance(clazz);
			Unmarshaller unmarshaller = context.createUnmarshaller();
			StringReader sr = new StringReader(xmlStr);
			xmlObject = unmarshaller.unmarshal(sr);
		} catch (JAXBException e) {
			e.printStackTrace();
		}
		return xmlObject;
	}
}
