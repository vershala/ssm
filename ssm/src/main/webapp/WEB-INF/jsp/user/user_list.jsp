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
.ui-dialog-buttonset { align: center; }
.cell-center {text-align: center;}
.cell-left {text-align: left;}
.cell-right {text-align: right;}
</style>
<script type="text/javascript">
$(function() {
	var username = $( "#username" ),
    email = $( "#email" ),
    password = $( "#password" ),
    allFields = $( [] ).add( username ).add( email ).add( password ),
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
   
    
    function save(){
    	$.ajax({
            type    : "POST",
            url     : "<%=basePath%>user/saveUser",
            data    : {username:'12345678'},
            success : function(result){
            	if(result.success){
            		$( "#dialog-form" ).dialog( "close" );
            		refresh();
            	}else{
            		$( "#dialog-form" ).dialog( "close" );
            	}
            },  
            dataType: 'json',
            async : false
        });
    }

   $( "#dialog-form" ).dialog({
	      autoOpen: false,
	      height: 520,
	      width: 420,
	      modal: true,
	      buttons: {
	        "确定": function() {
	          var bValid = true;
	          allFields.removeClass( "ui-state-error" );
	 
	          bValid = bValid && checkLength( username, "username", 3, 16 );
	          bValid = bValid && checkLength( email, "email", 6, 80 );
	          bValid = bValid && checkLength( password, "password", 5, 16 );
	 
	          bValid = bValid && checkRegexp( username, /^[a-z]([0-9a-z_])+$/i, "用户名必须由 a-z、0-9、下划线组成，且必须以字母开头。" );
	          bValid = bValid && checkRegexp( email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "邮箱格式不正确！" );
	          bValid = bValid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "密码字段只允许： a-z 0-9" );
	          if ( bValid ) {
	        	  save();
	          }else{
	        	  $( "#users tbody" ).append( "<tr>" +
	    	              "<td>" + username.val() + "</td>" +
	    	              "<td>" + email.val() + "</td>" +
	    	              "<td>" + password.val() + "</td>" +
	    	            "</tr>" );
	    	     // $( this ).dialog( "close" );
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
</script>
<div class="row" style="height:95%;">
	<div class="box col-md-12" style="height:95%;">
		<div class="box-inner" style="height:95%;">
			<div class="box-content" style="height:95%;">
				<div class="cm_tab_con mt_8">
					<div id="tabA">
						<div class="grid_wrap">
					   		<div id="myGrid1" style="height: 445px;"></div>
					   	</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="dialog-form" title="创建新用户" style="font-size:1em;">
	<p class="validateTips">新增用户</p>
	<form id="userForm" action="<%=basePath%>user/saveUser" method="post">
		<fieldset>
			<label for="name">用户名</label>
			<input type="text" name="username" id="username" class="text ui-corner-all">
			<label for="name">姓名</label>
			<input type="text" name="fullname" id="fullname" class="text ui-corner-all">
			<label for="name">性别</label>
			<input type="text" name="sex" id="sex" class="text ui-corner-all">
			<label for="email">邮箱</label>
			<input type="text" name="email" id="email" value="" class="text  ui-corner-all">
			<label for="password">密码</label>
			<input type="password" name="password" id="password" value="" class="text  ui-corner-all">
		</fieldset>
	</form>
</div>

<script type="text/javascript">

var grid;
var checkboxSelector = new Slick.CheckboxSelectColumn({
    cssClass: "slick-cell-checkboxsel",
    columnId: 'chk-id',
    name:'', 
    updateColumnHeader:false
});

function formatter(row, cell, value, columnDef, dataContext) {
if (columnDef.id == 'applyStatus') {
 	 	if (value == '0'){
 	 		return '草稿';
 	 	}
 	 	if (value == '1'){
 	 		return '审批中';
 	 	}
 	 	if (value == '2'){
 	 		return '已批准';
 	 	}
 	 	if (value == '3'){
 	 		return '待重拟';
 	 	}
 	 	if (value == '4'){
 	 		return '已取消';
 	 	}
 	 	if (value == '6'){
 	 		return '处理中';
 	 	}
 	 	if (value == '7'){
 	 		return '已处理';
 	 	}
 	 	if (value == '99'){
 	 		return '流程处理中';
 	 	}
}
    return value;
}

var idFormatter = function (row, cell, value, columnDef, dataContext) {
   return dataContext["index"] + 1; 
};

var options = {
    enableCellNavigation: true,
    enableColumnReorder: false,
    defaultColumnWidth: 80,
    showHeaderRow:   false,
    explicitInitialization: true
};


var myEditor = new Slick.EditManager({
        onDeleteItem: function() {
            grid.invalidate();
        }
    }
);

var columnFilters=[];
function fmtReqBillNo1(row, cell, value, columnDef, dataContex) {
	if(value != null){
		return "<a class='billNo_link' style='color: #2A33E1;' id='" + dataContex['id'] +"'>"+value+"</a>";
	}	
}
function handleFormatter(row, cell, value, columnDef, dataContext) {
	return "<a class='J_edit' style='color: #2A33E1;' id='" + dataContext['id'] +"'>编辑</a>"
			+"<span> | <span>"
			+"<a class='J_del' style='color: #2A33E1;' id='" + dataContext['id'] +"'>删除</a>";
}
var _parms={};
var loader = new Slick.Data.RemoteModel({
    'url': "<%=basePath%>user/listJson", 
    'pageSize':50,
    'parms': _parms
}) 
var columns1 = [
	checkboxSelector.getColumnDefinition(), 
	{id: "index",  name: "序号", width: 45,formatter: idFormatter , cssClass:"cell-center slick-cell-checkboxsel"},
	{id: "handle",  name: "操作", width: 80,formatter: handleFormatter , cssClass:"cell-center slick-cell-checkboxsel"},
    {id: "username", name: "用户名", field: "username",width:145,cssClass:"cell-center",formatter: fmtReqBillNo1},
    {id: "fullname", name: "姓名", field: "fullname",width:385,cssClass:"cell-center",formatter: fmtReqBillNo1},
	{id:"sex",name:"性别",field: "sex" , width:90,cssClass:"cell-center", formatter: formatter},
	{id: "password", name: "密码", field: "password",width:85,cssClass:"cell-center"}
  ];
var refresh = function() {
    var load_parms = $.extend(_parms,columnFilters);
   loader.setParms(load_parms);
    var vp = grid.getViewport();
    loader.ensureData(vp.top, vp.bottom);
    
    return false;
}
	
	grid = new Slick.Grid("#myGrid1",loader.data , columns1, options);
	//var dtlData = ${userList};
	//grid = new Slick.Grid("#myGrid1",new Slick.Data.Model({"data": dtlData}) , columns1, options);
	grid.setSelectionModel(new Slick.RowSelectionModel({selectActiveRow: true}));
	grid.registerPlugin(checkboxSelector);
	grid.registerPlugin(myEditor);
	
	grid.onHeaderRowCellRendered.subscribe(function(e, args) {
	   $(args.node).empty();
		  
		  if('insertEmpName' == args.column.id){
				 $("<input type='text' style='color:gray;line-height:26px;text-align:center;' value='' >")
				  .data("columnId", args.column.id)
				  .val(columnFilters[args.column.id])
				  .appendTo(args.node);	
		   }
		   if (jQuery.inArray(args.column.id, ['chk-id', 'index','totalBudgetToWan','projectNotes','insertDatetimeString'])!=-1){
		       return;
		   }			
		
		{
	       $("<input type='text' style='color:gray;line-height:26px;' placeholder='输入筛选条件'>")
	       .data("columnId", args.column.id)
	       .val(columnFilters[args.column.id])
	       .appendTo(args.node);
	    }
	});
	    
	
	
	$(grid.getHeaderRow()).delegate("select", "change", function (e) {
	  var columnId = $(this).data("columnId");
	  if (columnId != null) {
	    columnFilters[columnId] = $.trim($(this).val());
	    refresh();
	  }
	});
	$(grid.getHeaderRow()).delegate(":text", "keyup", function (e) {
	  var columnId = $(this).data("columnId");
	  if (columnId == null) {
	    return false;
	  }
	  var val = $.trim($(this).val());
	  columnFilters[columnId] = val;
	  if (e.which == 13||val=='') {
	     refresh();
	  }
	});
	grid.init();
	loader.applyGrid(grid, "#myGrid1");
	
	$('.billNo_link').live("click", function(){
		$( "#dialog-form" ).dialog( "open" );
	})
	
	$('.J_del').live("click", function(){
		var rows = grid.getSelectedRows();
		var row = grid.getDataItem(rows[0]);
        var id = row.id;
		$.get("<%=basePath%>user/delUser?id=" + id,function(data){
			if("success" == data.result){
				alert("删除成功");
				refresh();
			}else{
				alert("删除失败");
			}
		});
	})
/*************** 常规采购方案START *********************/


</script>
