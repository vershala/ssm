<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<base href="<%=basePath%>" />
<%@ include file="/WEB-INF/jsp/common/meta.jsp"%>
<style>
body {
	font-size: 62.5%;
}

input.text {
	margin-bottom: 12px;
	width: 95%;
	padding: .4em;
}
.page-text {
	font-size:14px;
}
.th-tr {
	height: 16px;
}
fieldset {
	padding: 0;
	border: 0;
	margin-top: 25px;
}

h1 {
	font-size: 1.2em;
	margin: .6em 0;
}

div#users-contain {
	width: 350px;
	margin: 20px 0;
}

div#users-contain table {
	margin: 1em 0;
	border-collapse: collapse;
	width: 100%;
}

div#users-contain table td, div#users-contain table th {
	border: 1px solid #eee;
	padding: .6em 10px;
	text-align: left;
}

.ui-dialog .ui-state-error {
	padding: .3em;
}

.validateTips {
	border: 1px solid transparent;
	padding: 0.3em;
}
</style>
<script type="text/javascript">
$(function() {
	var name = $( "#name" ),
    email = $( "#email" ),
    password = $( "#password" ),
    allFields = $( [] ).add( name ).add( email ).add( password ),
    tips = $( ".validateTips" );
	
	function updateTips( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }
 
    function checkLength( o, n, min, max ) {
      if ( o.val().length > max || o.val().length < min ) {
        o.addClass( "ui-state-error" );
        updateTips( "" + n + " 的长度必须在 " +
          min + " 和 " + max + " 之间。" );
        return false;
      } else {
        return true;
      }
    }
 
    function checkRegexp( o, regexp, n ) {
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        return true;
      }
    }
	
   $( "#dialog-form" ).dialog({
	      autoOpen: false,
	      height: 400,
	      width: 420,
	      modal: true,
	      buttons: {
	        "确定": function() {
	          var bValid = true;
	          allFields.removeClass( "ui-state-error" );
	 
	          bValid = bValid && checkLength( name, "username", 3, 16 );
	          bValid = bValid && checkLength( email, "email", 6, 80 );
	          bValid = bValid && checkLength( password, "password", 5, 16 );
	 
	          bValid = bValid && checkRegexp( name, /^[a-z]([0-9a-z_])+$/i, "用户名必须由 a-z、0-9、下划线组成，且必须以字母开头。" );
	          bValid = bValid && checkRegexp( email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com" );
	          bValid = bValid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "密码字段只允许： a-z 0-9" );
	 
	          if ( bValid ) {
	            $( "#users tbody" ).append( "<tr>" +
	              "<td>" + name.val() + "</td>" +
	              "<td>" + email.val() + "</td>" +
	              "<td>" + password.val() + "</td>" +
	            "</tr>" );
	            $( this ).dialog( "close" );
	          }
	        },
	        '取消': function() {
	          $( this ).dialog( "close" );
	        }
	      },
	      close: function() {
	        allFields.val( "" ).removeClass( "ui-state-error" );
	      }
	});
   

});
function edit(id){
	$( "#dialog-form" ).dialog( "open" );
}
function jump(p,s){
	var reg = /^\d*$/g; 
	if(!reg.test(p)){
		var p = 1;
	}
	if(parseInt(p) < 1){
		p = 1;
	}else if(parseInt(p) > parseInt(document.submitForm.pageCount.value)){  
		p = parseInt(document.submitForm.pageCount.value);
	}	
	document.submitForm.currentPage.value=p;
	document.submitForm.pageSize.value=s;
	document.submitForm.submit();
}	
function color(a,index){
	if(index % 2 == 0){
		a.style.background='#F0F0F0';
	}else{
		a.style.background='';
	}
}
function del(id){
	$.get("<%=basePath%>user/delUser?id=" + id,function(data){
		if("success" == data.result){
			alert("删除成功");
			window.location.reload();
		}else{
			alert("删除失败");
		}
	});
}

</script>
<form name="submitForm" action="<%=basePath%>menu/list" method="post" onsubmit="jump(1,${pager.pageSize })">
	<input type="hidden" name="currentPage">
	<input type="hidden" name="pageSize">
	<input type="hidden" name="pageCount" value="${pager.pageCount }">
	<table style="width: 70%; margin: 0 auto;">
		<tr>
			<td>
				<input placeholder="Search by name" class="search-query form-control col-md-10" name="menuName" type="text">
			</td>
		</tr>
	</table>
</form>


<div class="row" style="height:95%;">
	<div class="box col-md-12" style="height:95%;">
		<div class="box-inner" style="height:95%;">
			<div class="box-content""  style="height:95%;">
				<table class="table table-striped table-bordered bootstrap-datatable datatable responsive">
					<thead>
						<tr class="th-tr">
							<th>序号</th>
							<th>菜单编号</th>
							<th>菜单名称</th>
							<th>菜单url</th>
							<th>是否启用</th>
							<th>注册日期</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<c:if test="${!empty list }">
							<c:forEach items="${list}" var="item" varStatus="s">
								<tr align="center"  class="th-tr" <c:if test="${s.index%2==0 }">style="background-color:#F0F0F0"</c:if> onmouseover="this.style.background='#C0C0C0'" onmouseout="color(this,${s.index})">
									<td>${(pager.currentPage-1)*pager.pageSize+s.index+1 }</td>
									<td align="center">${item.menuCd }</td>
									<td>${item.menuName }</td>
									<td>${item.url }</td>
									<td>${item.enableFlag }</td>
									<td>
										<fmt:formatDate value="${user.createtime }" pattern="yyyy-MM-dd HH:mm:ss" />
									</td>
									<td>
										<a class="btn btn-success" href="javascript:edit('${user.id }')">
											<i class="glyphicon glyphicon-edit icon-white"></i>
											编辑
										</a>
										<a class="btn btn-danger" href="javascript:del('${user.id }')">
											<i class="glyphicon glyphicon-trash icon-white"></i>
											删除
										</a>
									</td>
								</tr>
							</c:forEach>
						</c:if>
					</tbody>
				</table>
				<table class="page-text">
					<tr>
						<td>
							第<span style="color: red;">${pager.currentPage }</span>/${pager.pageCount }页 共${pager.total }条
						</td>
						<td style="text-align: right;">
							<c:choose>
								<c:when test="${pager.currentPage==1 }">
									首页
									上一页
								</c:when>
								<c:otherwise>
									<a href="javascript:jump(1,${pager.pageSize })">首页</a>
									<a href="javascript:jump(${pager.currentPage-1 },${pager.pageSize })">上一页</a>
								</c:otherwise>
							</c:choose>
							<c:choose>
								<c:when test="${pager.currentPage==pager.pageCount }">
									下一页
									末页
								</c:when>
								<c:otherwise>
									<a href="javascript:jump(${pager.currentPage+1 },${pager.pageSize })">下一页</a>
									<a href="javascript:jump(${pager.pageCount },${pager.pageSize })">末页</a>
								</c:otherwise>
							</c:choose>
							跳到:
							<input style="width: 20px" id="gPage" type="text" value="${pager.currentPage }" />
							<input type="button" value="go" onclick="jump(document.getElementById('gPage').value,${pager.pageSize })" />
							每页显示:<select onchange="jump(1,this.value)">
								<option value="3" <c:if test="${pager.pageSize==3 }">selected="selected"</c:if>>3</option>
								<option value="5" <c:if test="${pager.pageSize==5 }">selected="selected"</c:if>>5</option>
								<option value="10" <c:if test="${pager.pageSize==10 }">selected="selected"</c:if>>10</option>
								<option value="15" <c:if test="${pager.pageSize==15 }">selected="selected"</c:if>>15</option>
								<option value="20" <c:if test="${pager.pageSize==20 }">selected="selected"</c:if>>20</option>
							</select>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</div>

<div id="dialog-form" title="创建新用户">
	<p class="validateTips">说明在这里</p>
	<form>
		<fieldset>
			<label for="name">名字</label>
			<input type="text" name="name" id="name" class="text ui-widget-content ui-corner-all">
			<label for="email">邮箱</label>
			<input type="text" name="email" id="email" value="" class="text ui-widget-content ui-corner-all">
			<label for="password">密码</label>
			<input type="password" name="password" id="password" value="" class="text ui-widget-content ui-corner-all">
		</fieldset>
	</form>
</div>