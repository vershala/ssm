<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>控制台首页</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Charisma, a fully featured, responsive, HTML5, Bootstrap admin template.">
<meta name="author" content="Muhammad Usman">
<base href="<%=basePath%>" />
<%@ include file="/WEB-INF/jsp/common/meta.jsp"%>
</head>
<body>
	<%@ include file="/WEB-INF/jsp/common/menu.jsp"%>
	<div id="content" class="col-lg-10 col-sm-10">
		<div class="main-meun">
			<IFRAME id="work" name="work" FRAMEBORDER="0" src="<%=basePath%>user/getAllUser" SCROLLING="AUTO" width="100%" height="700"></IFRAME>
		</div>
	</div>

	<hr>

	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">×</button>
					<h3>Settings</h3>
				</div>
				<div class="modal-body">
					<p>Here settings can be configured...</p>
				</div>
				<div class="modal-footer">
					<a href="#" class="btn btn-default" data-dismiss="modal">Close</a>
					<a href="#" class="btn btn-primary" data-dismiss="modal">Save changes</a>
				</div>
			</div>
		</div>
	</div>
</body>
<script>
function menuClick(obj){
	var $this = $(obj);
	var href = $this.data('href');
	$(".main-meun").find('iframe').attr('src',href);
}
</script>
</html>
