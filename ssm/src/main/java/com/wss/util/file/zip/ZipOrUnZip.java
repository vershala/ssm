package com.wss.util.file.zip;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.AccessController;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import sun.security.action.GetPropertyAction;

public class ZipOrUnZip {

	/** 数据缓冲  Size= F1024 */
	public static final int BYTE_DEFAULT_SIZE = 1024;

	/**
	 * java ZIP压缩
	 * @param zipByte 压缩源内容
	 * @return 压缩后内容
	 */
	public byte[] zipFile(byte[] zipByte) {

		// 输出流
		ByteArrayOutputStream arrout = new ByteArrayOutputStream();
		// GIZ压缩流
		GZIPOutputStream goutzip = null;
		// 输入流
		InputStream is = null;
		try {
			goutzip = new GZIPOutputStream(arrout);
			byte[] buf = new byte[BYTE_DEFAULT_SIZE];
			int readLen = 0;
			is = new BufferedInputStream(new ByteArrayInputStream(zipByte));
			// 每次读取1024字节进行处理
			while ((readLen = is.read(buf, 0, BYTE_DEFAULT_SIZE)) != -1) {
				goutzip.write(buf, 0, readLen);
			}
			arrout.close();
			is.close();
			goutzip.close();
		} catch (IOException e) {
			//throw new SystemException(e);
		} finally {
			try {
				if (arrout != null) {
					arrout.close();
				}

				if (is != null) {
					is.close();
				}

				if (goutzip != null) {
					goutzip.close();
				}
			} catch (IOException e) {

			}
		}

		return arrout.toByteArray();
	}

	/**
	 * java解压缩文件
	 * @param unZipByte 压缩内容
	 * @return 压缩后数据
	 */
	public byte[] unZipFile(byte[] unZipByte) {

		//字节流
		ByteArrayOutputStream arrout = null;
		//字节输入流
		ByteArrayInputStream arrin = null;
		//GZIP压缩流
		GZIPInputStream ginzip = null;
		try {
			byte[] buf = new byte[BYTE_DEFAULT_SIZE];
			int readLen = 0;
			arrin = new ByteArrayInputStream(unZipByte);
			ginzip = new GZIPInputStream(arrin);

			arrout = new ByteArrayOutputStream();
			//按照Buff大小进行处理
			while ((readLen = ginzip.read(buf, 0, BYTE_DEFAULT_SIZE)) != -1) {
				arrout.write(buf, 0, readLen);
			}

			arrin.close();
			ginzip.close();
			arrout.close();
		} catch (IOException e) {
			// throw new SystemException(e);
		} finally {
			try {
				if (arrout != null) {
					arrout.close();
				}

				if (arrin != null) {
					arrin.close();
				}

				if (ginzip != null) {
					ginzip.close();
				}
			} catch (IOException e) {

			}
		}
		return arrout.toByteArray();
	}

	/**
	 * 把多个文件进行压缩
	 *
	 * @param files 文件列表
	 *
	 * @return 压缩后内容
	 */
	public static byte[] filesToZip(Map files) {

		if (files.isEmpty()) {
			return null;
		}

		GetPropertyAction a = new GetPropertyAction("java.io.tmpdir");
		String tmpdir = (String) AccessController.doPrivileged(a);

		File zipTmpDir = new File(tmpdir);

		if (!zipTmpDir.exists()) {
			zipTmpDir.mkdir();
		}

		FileOutputStream fos = null;
		ZipOutputStream zos = null;
		FileInputStream fis = null;
		File tempFile = null;

		try {
			tempFile = File.createTempFile(String.valueOf(new Date().getTime()), ".zip", new File(tmpdir));

			fos = new FileOutputStream(tempFile);
			zos = new ZipOutputStream(fos);

			Iterator it = files.keySet().iterator();

			while (it.hasNext()) {
				String fileName = (String) it.next();
				byte[] b = (byte[]) files.get(fileName);
				ZipEntry ze = new ZipEntry(fileName);
				zos.putNextEntry(ze);
				zos.write(b);
				zos.flush();
				zos.closeEntry();
			}
			zos.finish();

			fis = new FileInputStream(tempFile);
			byte[] ret = new byte[fis.available()];
			int readCount = fis.read(ret);
			if (readCount == 0) {
				return new byte[0];
			}
			return ret;

		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (zos != null) {
					zos.close();
				}
				if (fos != null) {
					fos.close();
				}
				if (fis != null) {
					fis.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}
}
