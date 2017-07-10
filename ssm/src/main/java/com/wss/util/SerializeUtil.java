package com.wss.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

import org.apache.poi.util.IOUtils;


public class SerializeUtil {
	public static byte[] serialize(Object object) {
		ObjectOutputStream oos = null;
		ByteArrayOutputStream baos = null;
		try {
			// 序列化
			baos = new ByteArrayOutputStream();
			oos = new ObjectOutputStream(baos);
			oos.writeObject(object);
			byte[] bytes = baos.toByteArray();
			return bytes;
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			IOUtils.closeQuietly(oos);
			IOUtils.closeQuietly(baos);
		}
		return null;
	}

	public static Object unserialize(byte[] bytes) {
		ByteArrayInputStream bais = null;
		ObjectInputStream ois = null;
		System.out.println("bytes :"+bytes);
		if(bytes==null){
			return null;
		}
		try {
			if(bytes.length>0){
				bais = new ByteArrayInputStream(bytes);
				ois = new ObjectInputStream(bais);
				Object object = ois.readObject();
				return object;
			}else{
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			IOUtils.closeQuietly(ois);
			IOUtils.closeQuietly(bais);
		}
		return null;
	}
}
