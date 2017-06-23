<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="en" class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="UTF-8" />
        <title>测试系统</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        <meta name="description" content="Login and Registration Form with HTML5 and CSS3" />
        <meta name="keywords" content="html5, css3, form, switch, animation, :target, pseudo-class" />
        <meta name="author" content="Codrops" />
        <link rel="shortcut icon" href="../favicon.ico"> 
        <link rel="stylesheet" type="text/css" href="css/learn1/demo.css" />
        <link rel="stylesheet" type="text/css" href="css/learn1/style.css" />
		<link rel="stylesheet" type="text/css" href="css/learn1/animate-custom.css" />
		<style type="text/css">
		 .sel {
		    background: transparent;
		    width: 443px;
		    height: 30px;
		    overflow: hidden;
		}
		
		.sel select {
		    background: transparent;
		    border: none;
		    padding-left: 10px;
		    width: 440px;
		    height: 100%;
		}
		</style>
		<script type="text/javascript" src="<%=basePath%>js/jquery-1.7.1.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/form.js"></script>
		<script type="text/javascript">
			function login(){
				$("#myform").ajaxSubmit({
					success: function(responseText, statusText, xhr, $form){
						if((responseText.msg)=="suc"){
			        		alert("返回成功!");
						}
					}
				});
			}
			function reg(){
					$("#regForm").ajaxSubmit({
						success: function(responseText, statusText, xhr, $form){
							if((responseText.msg)=="suc"){
				        		alert("返回成功!");
							}
						}
					});
					
			}
		</script>    	
    </head>
    <body>
        <div class="container">
            <!-- Codrops top bar -->
            <div class="codrops-top">
                <a href="javascript:void(0)">
                    <strong>&laquo; Previous Demo: </strong>Responsive Content Navigator
                </a>
                <span class="right">
                    <a href="javascript:void(0)">
                        <strong>Back to the Codrops Article</strong>
                    </a>
                </span>
                <div class="clr"></div>
            </div><!--/ Codrops top bar -->
            <header>
                <h1>欢迎</span></h1>
            </header>
            <section>				
                <div id="container_demo" >
                    <a class="hiddenanchor" id="toregister"></a>
                    <a class="hiddenanchor" id="tologin"></a>
                    <div id="wrapper">
                        <div id="login" class="animate form">
                            <form id="myform" action="<%=basePath%>login/login" method="post" autocomplete="on">
                                <h1>用户登录</h1> 
                                <p> 
                                    <label for="username" class="uname" data-icon="u" > 帐号 </label>
                                    <input id="username" name="username" required="required" type="text" placeholder="用户名"/>
                                </p>
                                <p> 
                                    <label for="password" class="youpasswd" data-icon="p"> 密码 </label>
                                    <input id="password" name="password" required="required" type="password" placeholder="eg. X8df!90EO" /> 
                                </p>
                                <!-- 
                                <p class="keeplogin"> 
									<input type="checkbox" name="loginkeeping" id="loginkeeping" value="loginkeeping" /> 
								 	<label for="loginkeeping">Keep me logged in</label>
								</p>
								-->
                                <p class="login button"> 
                                    <input type="submit" id="btn" value="登录" /> 
								</p>
                                <p class="change_link">
									<a href="#toregister" class="to_register">注册</a>
								</p>
                            </form>
                        </div>

                        <div id="register" class="animate form">
                            <form id=regForm action="<%=basePath%>user/addUser" method="post" >
                            <input name="type" type="hidden" value="1" /><!-- 默认为一般用户 -->
                                <h1> 注册 </h1> 
                                <p> 
                                    <label for="username" class="uname" data-icon="u">用户名</label>
                                    <input name="username" required="required" type="text" placeholder="mysuperusername690" />
                                </p>
                                <p> 
                                    <label for="email" class="email" data-icon="e" > 邮箱</label>
                                    <input name="email" required="required" type="email" placeholder="mysupermail@mail.com"/> 
                                </p>
                                <p> 
                                    <label for="passwordsignup" class="youpasswd" data-icon="p">密码 </label>
                                    <input id="passwordsignup" name="password" required="required" type="password" placeholder="eg. X8df!90EO"/>
                                </p>
                                <p> 
                                    <label for="passwordsignup_confirm" class="youpasswd" data-icon="p">再次确认密码 </label>
                                    <input id="passwordsignup_confirm" name="password_confirm" required="required" type="password" placeholder="eg. X8df!90EO"/>
                                </p>
                                <p class="signin button"> 
									<input onclick="reg()" id="reg" type="submit" value="注册"/> 
								</p>
                                <p class="change_link">  
									已注册 ?
									<a href="#tologin" class="to_register"> 返回登录 </a>
								</p>
                            </form>
                        </div>
						
                    </div>
                </div>  
            </section>
        </div>
    </body>
</html>