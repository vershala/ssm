<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<script type="text/javascript">
$(function() {
	$('.accordion > a').click(function (e) {
	    e.preventDefault();
	    var $ul = $(this).siblings('ul');
	    var $li = $(this).parent();
	    if ($ul.is(':visible')) $li.removeClass('active');
	    else                    $li.addClass('active');
	    $ul.slideToggle();
	});
});
</script>
<div class="navbar navbar-default" role="navigation">
	<div class="navbar-inner">
		<button type="button" class="navbar-toggle pull-left animated flip">
			<span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span>
		</button>
		<a class="navbar-brand" href="index.html"> 
			<img alt="Charisma Logo" src="images/charisma/logo20.png" class="hidden-xs" /> <span>demo</span>
		</a>
		<div class="btn-group pull-right">
			<button class="btn btn-default dropdown-toggle" data-toggle="dropdown">
				<i class="glyphicon glyphicon-user"></i>
				<span class="hidden-sm hidden-xs"> admin</span> <span class="caret"></span>
			</button>
			<ul class="dropdown-menu">
				<li class="divider"></li>
				<li>
					<a href="login/logout">Logout</a>
				</li>
			</ul>
		</div>
	</div>
</div>

<div class="col-sm-2 col-lg-2">
	<div class="sidebar-nav">
		<div class="nav-canvas">
			<div class="nav-sm nav nav-stacked"></div>
			<ul class="nav nav-pills nav-stacked main-menu">
					<c:if test="${!empty menuList }">
						<c:forEach items="${menuList}" var="menu" varStatus="s">
							<li>
								<a class="ajax-link" onclick="menuClick(this);" href="${menu.url}" target="work"> <i class="glyphicon glyphicon-home"> </i> <span>${menu.menuName}</span></a>
							</li>
						</c:forEach>
					</c:if>
				<li class="accordion">
					<a href="javascript:void(0)"><i class="glyphicon glyphicon-plus"></i><span> 系统管理</span></a>
					<ul class="nav nav-pills nav-stacked">
						<li>
							<a href="javascript:void(0)">系统日志</a>
						</li>
						<li>
							<a href="javascript:void(0)">系统配置</a>
						</li>
					</ul>
				</li>
				<li class="accordion">
					<a href="#"><i class="glyphicon glyphicon-plus"></i><span>我说得对</span></a>
					<ul class="nav nav-pills nav-stacked">
						<li class="accordion">
							<a href="javascript:void(0)">他说的不对</a>
								<ul class="nav nav-pills nav-stacked">
									<li>
										<a href="javascript:void(0)">楼上说的都对</a>
									</li>
									<li>
										<a href="javascript:void(0)">楼上说的都不对</a>
									</li>
								</ul>
						</li>
						<li>
							<a href="javascript:void(0)">地板</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</div>
<script>
function menuClick(obj){
	var $this = $(obj);
	var href = $this.data('href');
	$(".main-meun").find('iframe').attr('src',href);
}
</script>