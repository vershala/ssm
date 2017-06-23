/***
 * Contains basic SlickGrid editors.
 * @module Editors
 * @namespace Slick
 *
 * {
 * grid: self,
 * gridPosition: absBox($container[0]),
 * position: absBox(activeCellNode),
 * container: activeCellNode,
 * column: columnDef,
 * item: item || {},
 * commitChanges: commitEditAndSetFocus,
 * cancelChanges: cancelEditAndSetFocus
 * }
 *
 */

(function ($) {
  // register namespace
  $.extend(true, window, {
    "Slick": {
      "Editors": {
        "Text": TextEditor,
        "Text2": TextEditor2,
        "Select": SelectEditor,
        "Integer": IntegerEditor,
        "Integer2": IntegerEditor2,
        "Integer6": IntegerEditor6,
        "Date": DateEditor,
        "Date2": DateEditor2,
        "Date3": DateEditor3,
        "YesNoSelect": YesNoSelectEditor,
        "Checkbox": CheckboxEditor,
        "Checkbox2": CheckboxEditor2,
        "AllCheckbox": AllCheckboxEditor,
        "PercentComplete": PercentCompleteEditor,
        "LongText": LongTextEditor,
        "LookUp": LookUpEditor,
        "LookUp2": LookUpEditor2,
        "LookUp3": LookUpEditor3,
        "LookUp4": LookUpEditor4
      }
    }
  });

  function TextEditor(args) {
    var $input;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $input = $("<INPUT type=text class='editor-text' />")
          .appendTo(args.container)
          .bind("keydown.nav", function (e) {
            if (e.which === $.ui.keyCode.LEFT || e.which === $.ui.keyCode.RIGHT) {
              e.stopImmediatePropagation();
            }
          })
          .focus()
          .select();
      if (args.column.readonly===true){ $input.attr('readonly','readonly');}    
	  if (args.column.event) {
	     $input.on(args.column.event, args.column.onEvent);
	  }
    };
    this.destroy = function () {
      $input.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.getValue = function () {
      return $input.val();
    };

    this.setValue = function (val) {
      $input.val(val);
    };

    this.loadValue = function (item) {
      defaultValue = item[args.column.field] || "";
      $input.val(defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };

    this.serializeValue = function () {
      return $input.val();
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
    };

    this.validate = function () {
      if (args.column.validator) {
        var validationResults = args.column.validator($input.val(), defaultValue);
        if (!validationResults.valid) {
          return validationResults;
        }
      }

      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }
  
  /**
   * 1、截取固定length长度的输入字符串
   * 2、对输入项的验证，输入参数regs
   * @author wangy 
   * @date 2014-10-27
   */
  function TextEditor2(args) {
	    var $input;
	    var defaultValue;
	    var scope = this;

	    this.init = function () {
	      $input = $("<INPUT type=text class='editor-text' />")
	          .appendTo(args.container)
	          .bind("keydown.nav", function (e) {
	            if (e.which === $.ui.keyCode.LEFT || e.which === $.ui.keyCode.RIGHT) {
	              e.stopImmediatePropagation();
	            }
	          })
	          .focus()
	          .select();
	      if (args.column.readonly===true){ $input.attr('readonly','readonly');}    
		  if (args.column.event) {
		     $input.on(args.column.event, args.column.onEvent);
		  }
	    };
	    this.destroy = function () {
	      $input.remove();
	    };

	    this.focus = function () {
	      $input.focus();
	    };

	    this.getValue = function () {
	      return $input.val();
	    };

	    this.setValue = function (val) {
	      $input.val(val);
	    };

	    this.loadValue = function (item) {
	      defaultValue = item[args.column.field] || "";
	      $input.val(defaultValue);
	      $input[0].defaultValue = defaultValue;
	      $input.select();
	    };

	    this.serializeValue = function () {
	    	if (args.column.length) {
	    		if (args.column.length < $input.val().length) {
	    			return $input.val().substr(0, args.column.length);
	    		}
	    	}
	    	return $input.val();
	    };

	    this.applyValue = function (item, state) {
	      item[args.column.field] = state;
	    };

	    this.isValueChanged = function () {
	      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
	    };

	    this.validate = function () {
	      if (args.column.validator) {
	        var validationResults = args.column.validator($input.val(), defaultValue);
	        if (!validationResults.valid) {
	          return validationResults;
	        }
	      }
	      if (args.column.regs && Utils.isNotEmpty($input.val())) {
    		if (($input.val().match(args.column.regs)) == null) {
    			return {valid: false, msg: "请输入有效的"+args.column.name};
    		}
	      }
	      return {
	        valid: true,
	        msg: null
	      };
	    };

	    this.init();
	  }

  function IntegerEditor(args) {
    var $input;
    var defaultValue;
    var scope = this;
    this.init = function () {
      $input = $("<INPUT type=text class='editor-text' />");
      $input.bind("keydown.nav", function (e) {
        if (e.which === $.ui.keyCode.LEFT || e.which === $.ui.keyCode.RIGHT) {
          e.stopImmediatePropagation();
        }
      });
      if (args.column.event) {
	     $input.on(args.column.event, args.column.onEvent);
	  }
      $input.appendTo(args.container);
      $input.focus().select();
    };
    this.destroy = function () {
      $input.remove();
    };
    this.focus = function () {
      $input.focus();
    };
    this.loadValue = function (item) {
      defaultValue = item[args.column.field];
      defaultValue = defaultValue == "NaN"? '0' : defaultValue ;
      $input.val(defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };
    this.serializeValue = function () {
       if (args.column.type === 'float') {
    	   if(args.column.digit){//判断输入小数，最大返回m位小数
    		   var m = parseInt(args.column.digit);
    		   var patt1=new RegExp("^[0-9]+(.[0-9]{1,"+m+"})?$");
    		   //alert(patt1);
    		   if(patt1.test($input.val())){
    			   return parseFloat($input.val()) || 0;
    		   }else{//返回m位小数
    			   if((!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue)){
    				   return parseFloat($input.val()).toFixed(m) || 0;
    			   }
    		   }
    	   }else{
    		   return parseFloat($input.val()) || 0;
    	   }
	   }else {
	   	   return parseInt($input.val(), 10) || 0;
	   }
    };
    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };
    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
    };
    this.validate = function () {
      if (isNaN($input.val())) {
        return {
          valid: false,
          msg: "Please enter a valid integer"
        };
      }
      if (args.column.validator) {
        var validationResults = args.column.validator($input.val(), defaultValue);
        if (!validationResults.valid) {
          return validationResults;
        }
      }
      return {
        valid: true,
        msg: null
      };
    };
    this.init();
  }
  
  /**
   * 订单专用  tianyj
   */
  function IntegerEditor2(args) {
	    var $input;
	    var defaultValue;
	    var scope = this;
	    this.init = function () {
	      $input = $("<INPUT type=text class='editor-text' />");
	      if(args != undefined && args.item != undefined && args.item.unitPriceControl == 'Y' && args.column.id == 'unitPrice2') {
	    	  $input.attr("title", "按财务部要求，费用物料创建订单时，单价固定为1元，数量栏位录入金额");
	      }
	      $input.bind("keydown.nav", function (e) {
	        if (e.which === $.ui.keyCode.LEFT || e.which === $.ui.keyCode.RIGHT) {
	          e.stopImmediatePropagation();
	        }
	      });
	      if (args.column.event) {
		     $input.on(args.column.event, args.column.onEvent);
		  }
	      $input.appendTo(args.container);
	      $input.focus().select();
	    };
	    this.destroy = function () {
	      $input.remove();
	    };
	    this.focus = function () {
	      $input.focus();
	    };
	    this.loadValue = function (item) {
	      defaultValue = item[args.column.field];
	      $input.val(defaultValue);
	      $input[0].defaultValue = defaultValue;
	      $input.select();
	    };
	    this.serializeValue = function () {
	       if (args.column.type === 'float') {
	    	   var value = Math.round(parseFloat($input.val()) * 1000000, 6) / 1000000 || 0;
	    	   var vat = document.getElementById("vat").value;
	    	   var floatPrice = accDiv(value, accAdd(1, vat));
	    	   args.item.unitPrice = accDiv(Math.round(accMul(floatPrice, 1000000)), 1000000);
			   return value;
		   }
		   else {
		   	   return parseInt($input.val(), 10) || 0;
		   }
	    };
	    this.applyValue = function (item, state) {
	      item[args.column.field] = state;
	    };
	    this.isValueChanged = function () {
	      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
	    };
	    this.validate = function () {
	      if (isNaN($input.val())) {
	        return {
	          valid: false,
	          msg: "Please enter a valid integer"
	        };
	      }
	      if (args.column.validator) {
	        var validationResults = args.column.validator($input.val(), defaultValue);
	        if (!validationResults.valid) {
	          return validationResults;
	        }
	      }
	      return {
	        valid: true,
	        msg: null
	      };
	    };
	    this.init();
	  }
  
  /**
   */
  function IntegerEditor6(args) {
	    var $input;
	    var defaultValue;
	    var scope = this;
	    this.init = function () {
	      $input = $("<INPUT type=text class='editor-text' />");
	      $input.bind("keydown.nav", function (e) {
	        if (e.which === $.ui.keyCode.LEFT || e.which === $.ui.keyCode.RIGHT) {
	          e.stopImmediatePropagation();
	        }
	      });
	      if (args.column.event) {
		     $input.on(args.column.event, args.column.onEvent);
		  }
	      $input.appendTo(args.container);
	      $input.focus().select();
	    };
	    this.destroy = function () {
	      $input.remove();
	    };
	    this.focus = function () {
	      $input.focus();
	    };
	    this.loadValue = function (item) {
	      defaultValue = item[args.column.field];
	      $input.val(defaultValue);
	      $input[0].defaultValue = defaultValue;
	      $input.select();
	    };
	    this.serializeValue = function () {
	       if (args.column.type === 'float') {
	    	   var value = Math.round(parseFloat($input.val()) * 1000000, 6) / 1000000 || 0;
			   return value;
		   }
		   else {
		   	   return parseInt($input.val(), 10) || 0;
		   }
	    };
	    this.applyValue = function (item, state) {
	      item[args.column.field] = state;
	    };
	    this.isValueChanged = function () {
	      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
	    };
	    this.validate = function () {
	      if (isNaN($input.val())) {
	        return {
	          valid: false,
	          msg: "Please enter a valid integer"
	        };
	      }
	      if (args.column.validator) {
	        var validationResults = args.column.validator($input.val(), defaultValue);
	        if (!validationResults.valid) {
	          return validationResults;
	        }
	      }
	      return {
	        valid: true,
	        msg: null
	      };
	    };
	    this.init();
	  }
  
  function DateEditor(args) {
    var $input;
    var defaultValue;
    var scope = this;
    var calendarOpen = false;
    this.init = function () {
      $input = $("<INPUT type=text class='editor-text'/>");
      $input.appendTo(args.container);
      $input.focus().select();
      $input.datepicker({
        showOn: "button",
        buttonImageOnly: true,
        buttonImage: "images/calendar.gif",
        beforeShow: function () {
          calendarOpen = true;
        },
        onClose: function () {
          calendarOpen = false;
        },
        "dateFormat" :"yy-mm-dd",
        changeMonth: true,
        changeYear: true
      });
      $input.width($input.width() - 18);
    };
    this.destroy = function () {
      $.datepicker.dpDiv.stop(true, true);
      $input.datepicker("hide");
      $input.datepicker("destroy");
      $input.remove();
    };
    this.show = function () {
      if (calendarOpen) {
        $.datepicker.dpDiv.stop(true, true).show();
      }
    };
    this.hide = function () {
      if (calendarOpen) {
        $.datepicker.dpDiv.stop(true, true).hide();
      }
    };
    this.position = function (position) {
      if (!calendarOpen) {
        return;
      }
      $.datepicker.dpDiv
          .css("top", position.top + 30)
          .css("left", position.left);
    };
    this.focus = function () {
      $input.focus();
    };
    this.loadValue = function (item) {
      defaultValue = item[args.column.field];
      $input.val(defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };
    this.serializeValue = function () {
      return $input.val();
    };
    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };
    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
    };
    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };
    this.init();
  }
  function DateEditor2(args) {
	    var $input;
	    var defaultValue;
	    var scope = this;
	    var calendarOpen = false;
	    this.init = function () {
	      $input = $("<INPUT type=text class='editor-text' disabled/>");
	      $input.appendTo(args.container);
	      $input.focus().select();
	      $input.datepicker({
	        showOn: "button",
	        buttonImageOnly: true,
	        buttonImage: "images/calendar.gif",
	        beforeShow: function () {
	          calendarOpen = true;
	        },
	        onClose: function () {
	          calendarOpen = false;
	        },
	        "dateFormat" :"yy-mm-dd",
	        changeMonth: true,
	        changeYear: true
	      });
	      $input.width($input.width() - 18);
	    };
	    this.destroy = function () {
	      $.datepicker.dpDiv.stop(true, true);
	      $input.datepicker("hide");
	      $input.datepicker("destroy");
	      $input.remove();
	    };
	    this.show = function () {
	      if (calendarOpen) {
	        $.datepicker.dpDiv.stop(true, true).show();
	      }
	    };
	    this.hide = function () {
	      if (calendarOpen) {
	        $.datepicker.dpDiv.stop(true, true).hide();
	      }
	    };
	    this.position = function (position) {
	      if (!calendarOpen) {
	        return;
	      }
	      $.datepicker.dpDiv
	          .css("top", position.top + 30)
	          .css("left", position.left);
	    };
	    this.focus = function () {
	      $input.focus();
	    };
	    this.loadValue = function (item) {
	      defaultValue = item[args.column.field];
	      $input.val(defaultValue);
	      $input[0].defaultValue = defaultValue;
	      $input.select();
	    };
	    this.serializeValue = function () {
	      return $input.val();
	    };
	    this.applyValue = function (item, state) {
	      item[args.column.field] = state;
	    };
	    this.isValueChanged = function () {
	      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
	    };
	    this.validate = function () {
	      return {
	        valid: true,
	        msg: null
	      };
	    };
	    this.init();
	  }
  /**
   * 1、选择当前日期之后的日期
   * @author wangy 
   * @date 2014-10-27
   */
  function DateEditor3(args) {
	    var $input;
	    var defaultValue;
	    var scope = this;
	    var calendarOpen = false;
	    this.init = function () {
	      $input = $("<INPUT type=text class='editor-text' />");
	      $input.appendTo(args.container);
	      $input.focus().select();
	      $input.datepicker({
	    	  minDate: args.column.divideDate,
	        showOn: "button",
	        buttonImageOnly: true,
	        buttonImage: "images/calendar.gif",
	        beforeShow: function () {
	          calendarOpen = true;
	        },
	        onClose: function () {
	          calendarOpen = false;
	        },
	        "dateFormat" :"yy-mm-dd",
	        changeMonth: true,
	        changeYear: true
	      });
	      $input.width($input.width() - 18);
	    };
	    this.destroy = function () {
	      $.datepicker.dpDiv.stop(true, true);
	      $input.datepicker("hide");
	      $input.datepicker("destroy");
	      $input.remove();
	    };
	    this.show = function () {
	      if (calendarOpen) {
	        $.datepicker.dpDiv.stop(true, true).show();
	      }
	    };
	    this.hide = function () {
	      if (calendarOpen) {
	        $.datepicker.dpDiv.stop(true, true).hide();
	      }
	    };
	    this.position = function (position) {
	      if (!calendarOpen) {
	        return;
	      }
	      $.datepicker.dpDiv
	          .css("top", position.top + 30)
	          .css("left", position.left);
	    };
	    this.focus = function () {
	      $input.focus();
	    };
	    this.loadValue = function (item) {
	      defaultValue = item[args.column.field];
	      $input.val(defaultValue);
	      $input[0].defaultValue = defaultValue;
	      $input.select();
	    };
	    this.serializeValue = function () {
	      return $input.val();
	    };
	    this.applyValue = function (item, state) {
	      item[args.column.field] = state;
	    };
	    this.isValueChanged = function () {
	      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
	    };
	    this.validate = function () {
	      return {
	        valid: true,
	        msg: null
	      };
	    };
	    this.init();
	  }
  function YesNoSelectEditor(args) {
    var $select;
    var defaultValue;
    var scope = this;
    this.init = function () {
      $select = $("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='yes'>Yes</OPTION><OPTION value='no'>No</OPTION></SELECT>");
      $select.appendTo(args.container);
      $select.focus();
    };
    this.destroy = function () {
      $select.remove();
    };
    this.focus = function () {
      $select.focus();
    };
    this.loadValue = function (item) {
      $select.val((defaultValue = item[args.column.field]) ? "yes" : "no");
      $select.select();
    };
    this.serializeValue = function () {
      return ($select.val() == "yes");
    };
    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };
    this.isValueChanged = function () {
      return ($select.val() != defaultValue);
    };
    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }
  /**
   * @author Dingln 
   * @date 2013-12-20
   */
  function AllCheckboxEditor(args) {
	    var $select;
	    var defaultValue;
	    var scope = this;
	    this.init = function () {
	    	var disabled = args.column.disabled;
	    	var columnid = "editor-checkbox "+args.column.id;
	    	 var selector= null;
	    	if(disabled==true){
	    		selector = "<INPUT type=checkbox value='true' disabled='true' class='"+columnid+"' hideFocus>";		  
	    	}else{
	    		selector = "<INPUT type=checkbox value='true' class='"+columnid+"' hideFocus>";
	    	}
	    	$select = $(selector);  
	      $select.appendTo(args.container);
	      $select.focus();
	    };
	    this.destroy = function () {
	      $select.remove();
	    };
	    this.focus = function () {
	      $select.focus();
	    };
	    this.loadValue = function (item) {
	      defaultValue = item[args.column.field];
	      if (defaultValue) {
	        $select.attr("checked", "checked");
	      } else {
	        $select.removeAttr("checked");
	      }
	    };
	    this.serializeValue = function () {
	    	var checkedVal = args.column.checkedVal;
	    	var unCheckedVal = args.column.unCheckedVal;
	    	if($select.is(":checked")){
	    		if(checkedVal==null||checkedVal==undefined){
	    			return $select.attr("checked");
	    		}else{
	    			return checkedVal;
	    		}
	    	}else{
	    		if(unCheckedVal==null||unCheckedVal==undefined){
	    			return $select.attr("checked");
	    		}else{
	    			return unCheckedVal;
	    		}
	    	}
	      return $select.attr("checked");
	    };
	    this.applyValue = function (item, state) {
	      item[args.column.field] = state;
	    };
	    this.isValueChanged = function () {
	      return ($select.attr("checked") != defaultValue);
	    };
	    this.validate = function () {
	      return {
	        valid: true,
	        msg: null
	      };
	    };
	    this.init();
	  }

  
  function CheckboxEditor(args) {
    var $select;
    var defaultValue;
    var scope = this;
    this.init = function () {
    	var disabled = args.column.disabled;
    	if(disabled==true){
    		$select = $("<INPUT type=checkbox value='true' disabled='true' class='editor-checkbox' hideFocus>");
    	}else{
      $select = $("<INPUT type=checkbox value='true' class='editor-checkbox' hideFocus>");
    	}
      $select.appendTo(args.container);
      $select.focus();
    };
    this.destroy = function () {
      $select.remove();
    };
    this.focus = function () {
      $select.focus();
    };
    this.loadValue = function (item) {
      defaultValue = item[args.column.field];
      if (defaultValue) {
        $select.attr("checked", "checked");
      } else {
        $select.removeAttr("checked");
      }
    };
    this.serializeValue = function () {
    	var checkedVal = args.column.checkedVal;
    	var unCheckedVal = args.column.unCheckedVal;
    	if($select.is(":checked")){
    		if(checkedVal==null||checkedVal==undefined){
    			return $select.attr("checked");
    		}else{
    			return checkedVal;
    		}
    	}else{
    		if(unCheckedVal==null||unCheckedVal==undefined){
    			return $select.attr("checked");
    		}else{
    			return unCheckedVal;
    		}
    	}
      return $select.attr("checked");
    };
    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };
    this.isValueChanged = function () {
      return ($select.attr("checked") != defaultValue);
    };
    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };
    this.init();
  }

  function CheckboxEditor2(args) {
	    var $select;
	    var defaultValue;
	    var scope = this;
	    this.init = function () {
	    	var disabled = args.column.disabled;
	    	if(disabled==true){
	    		$select = $("<INPUT type=checkbox value='true' disabled='true' class='editor-checkbox' hideFocus>");
	    	}else{
	      $select = $("<INPUT type=checkbox value='true' class='editor-checkbox' hideFocus>");
	    	}
	      $select.appendTo(args.container);
	      $select.focus();
	    };
	    this.destroy = function () {
	      $select.remove();
	    };
	    this.focus = function () {
	      $select.focus();
	    };
	    this.loadValue = function (item) {
	      defaultValue = item[args.column.field];
	      if (defaultValue=="0") {
	        $select.attr("checked", "checked");
	      } else {
	        $select.removeAttr("checked");
	      }
	    };
	    this.serializeValue = function () {
	    	var checkedVal = args.column.checkedVal;
	    	var unCheckedVal = args.column.unCheckedVal;
	    	if($select.is(":checked")){
	    		if(checkedVal==null||checkedVal==undefined){
	    			return $select.attr("checked");
	    		}else{
	    			return checkedVal;
	    		}
	    	}else{
	    		if(unCheckedVal==null||unCheckedVal==undefined){
	    			return $select.attr("checked");
	    		}else{
	    			return unCheckedVal;
	    		}
	    	}
	      return $select.attr("checked");
	    };
	    this.applyValue = function (item, state) {
	      item[args.column.field] = state;
	    };
	    this.isValueChanged = function () {
	      return ($select.attr("checked") != defaultValue);
	    };
	    this.validate = function () {
	      return {
	        valid: true,
	        msg: null
	      };
	    };
	    this.init();
	  }
  
  function PercentCompleteEditor(args) {
    var $input, $picker;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $input = $("<INPUT type=text class='editor-percentcomplete' />");
      $input.width($(args.container).innerWidth() - 25);
      $input.appendTo(args.container);

      $picker = $("<div class='editor-percentcomplete-picker' />").appendTo(args.container);
      $picker.append("<div class='editor-percentcomplete-helper'><div class='editor-percentcomplete-wrapper'><div class='editor-percentcomplete-slider' /><div class='editor-percentcomplete-buttons' /></div></div>");

      $picker.find(".editor-percentcomplete-buttons").append("<button val=0>Not started</button><br/><button val=50>In Progress</button><br/><button val=100>Complete</button>");

      $input.focus().select();

      $picker.find(".editor-percentcomplete-slider").slider({
        orientation: "vertical",
        range: "min",
        value: defaultValue,
        slide: function (event, ui) {
          $input.val(ui.value);
        }
      });
      $picker.find(".editor-percentcomplete-buttons button").bind("click", function (e) {
        $input.val($(this).attr("val"));
        $picker.find(".editor-percentcomplete-slider").slider("value", $(this).attr("val"));
      });
    };
    this.destroy = function () {
      $input.remove();
      $picker.remove();
    };
    this.focus = function () {
      $input.focus();
    };
    this.loadValue = function (item) {
      $input.val(defaultValue = item[args.column.field]);
      $input.select();
    };
    this.serializeValue = function () {
      return parseInt($input.val(), 10) || 0;
    };
    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };
    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ((parseInt($input.val(), 10) || 0) != defaultValue);
    };
    this.validate = function () {
      if (isNaN(parseInt($input.val(), 10))) {
        return {
          valid: false,
          msg: "Please enter a valid positive number"
        };
      }
      return {
        valid: true,
        msg: null
      };
    };
    this.init();
  }

  /*
   * An example of a "detached" editor.
   * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
   * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
   */
  function LongTextEditor(args) {
    var $input, $wrapper;
    var defaultValue;
    var scope = this;
    this.init = function () {
      var $container = $("body");
      $wrapper = $("<DIV style='z-index:10000;position:absolute;background:white;padding:5px;border:3px solid gray; -moz-border-radius:10px; border-radius:10px;'/>")
          .appendTo($container);
      $input = $("<TEXTAREA hidefocus rows=5 style='backround:white;width:250px;height:80px;border:0;outline:0'>")
          .appendTo($wrapper);
      $("<DIV style='text-align:right'><BUTTON>Save</BUTTON><BUTTON>Cancel</BUTTON></DIV>")
          .appendTo($wrapper);
      $wrapper.find("button:first").bind("click", this.save);
      $wrapper.find("button:last").bind("click", this.cancel);
      $input.bind("keydown", this.handleKeyDown);
      scope.position(args.position);
      $input.focus().select();
    };
    this.handleKeyDown = function (e) {
      if (e.which == $.ui.keyCode.ENTER && e.ctrlKey) {
        scope.save();
      } else if (e.which == $.ui.keyCode.ESCAPE) {
        e.preventDefault();
        scope.cancel();
      } else if (e.which == $.ui.keyCode.TAB && e.shiftKey) {
        e.preventDefault();
        args.grid.navigatePrev();
      } else if (e.which == $.ui.keyCode.TAB) {
        e.preventDefault();
        args.grid.navigateNext();
      }
    };
    this.save = function () {
      args.commitChanges();
    };
    this.cancel = function () {
      $input.val(defaultValue);
      args.cancelChanges();
    };
    this.hide = function () {
      $wrapper.hide();
    };
    this.show = function () {
      $wrapper.show();
    };
    this.position = function (position) {
      $wrapper
          .css("top", position.top - 5)
          .css("left", position.left - 5);
    };
    this.destroy = function () {
      $wrapper.remove();
    };
    this.focus = function () {
      $input.focus();
    };
    this.loadValue = function (item) {
      $input.val(defaultValue = item[args.column.field]);
      $input.select();
    };
    this.serializeValue = function () {
      return $input.val();
    };
    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };
    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
    };
    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };
    this.init();
  }
  function SelectEditor(args) {
	    var $select;
	    var defaultValue;
	    var scope = this;
	    this.init = function () {
		  $select = $("<SELECT tabIndex='0' class='editor-yesno'></SELECT>");
		  var data = args.grid.getData();
	      var optFactory = data.optFactoy;
	      var options = optFactory&&optFactory(args.column.id, args.item)||args.column.options; 
	      if (options) {
	      	 var s = data.notEmpVal&&data.notEmpVal==true?"":"<option value=''>-请选择-</option>";
	      	 if(args.column.notEmpVal == true){
	      		$select.append(options);
	      	 }else{
	      		 $select.append(s + options);
	      	 }
	      }
	      $select.appendTo(args.container);
	      if (args.column.event) {
	    	  $select.on(args.column.event, args.column.onEvent);
	      }
	      $select.focus();
	    };
	    this.destroy = function () {
	      $select.remove();
	    };
	    this.focus = function () {
	      $select.focus();
	    };
	    this.loadValue = function (item) {
	      defaultValue = item[args.column.field];
	      if (defaultValue != undefined && defaultValue != null) {
	    	  $select.val(defaultValue);
	      }
	      $select.select();
	    };
	    this.serializeValue = function () {
	      return $select.val();
	    };
	    this.applyValue = function (item, state) {
	      item[args.column.field] = state;
	    };
	    this.isValueChanged = function () {
	      return ($select.val() != defaultValue);
	    };
	    this.validate = function () {
	      return {
	        valid: true,
	        msg: null
	      };
	    };
	    this.init();
	  };
	  function LookUpEditor(args) {
		    var $input;
		    var defaultValue;
		    var scope = this;
			var $imgBtn;
		    this.init = function () {
		      var gridOptions = args.grid.getOptions();
		      var rowHeight = gridOptions.rowHeight;
			  var inputhtml = "<INPUT type=text class='editor-text' disabled />";
			  if (args.column.editable===true) {
				inputhtml = "<INPUT type=text class='editor-text'/>";
			  }
		      $input = $(inputhtml)
		          .appendTo(args.container)
		          .bind("keydown.nav", function (e) {
		            if (e.which === $.ui.keyCode.LEFT || e.which === $.ui.keyCode.RIGHT) {
		              e.stopImmediatePropagation();
		          }
		      });
		      if (args.column.editable===true) {
		       		$input.focus().select();
		      }
		      $input.width($input.width() - 18);  
		     // $input.height(rowHeight);    
		      $imgBtn =  $('<img class="ui-datepicker-trigger" src="images/lookup.gif" >');
		      $imgBtn.css('cursor','pointer');
		      if (args.column.imgBtnCss){
		      	 $imgBtn.addClass(args.column.imgBtnCss);
		      }
		      if (args.column.btnClick){
		      	 $imgBtn.click(function(){ args.column.btnClick(args.item, $input); });
		      }   
		      $input.after($imgBtn);
		      if (args.column.tip) {
		        $input.attr("title", args.column.tip);
		      	$input.tooltip();
		      }
		    };
		    this.destroy = function () {
		      $input.remove();
		      $imgBtn.remove();
		    };
		    this.getValue = function () {
		      return $input.val();
		    };
		    this.setValue = function (val) {
		      $input.val(val);
		    };
		    this.loadValue = function (item) {
		      if (args.column.formatter) {
		      	defaultValue = args.column.formatter(-1, -1, "",args.column, item);
		      	defaultValue = defaultValue.replace(/<[^>]+>/g,"").replace(/&nbsp;/ig, "");
		      }
		      if (!defaultValue||defaultValue=='') {
		      	defaultValue = item[args.column.field] || "";
		      }
		      $input.val(defaultValue);
		      $input[0].defaultValue = defaultValue;
		      if (args.column.editable===true) {
		       		$input.focus().select();
		      }
		    };
		    this.serializeValue = function () {
		      return $input.val();
		    };
		    this.applyValue = function (item, state) {
		      item[args.column.field] = state;
		    };
		    this.isValueChanged = function () {
		      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
		    };
		    this.validate = function () {
		      if (args.column.validator) {
		        var validationResults = args.column.validator($input.val());
		        if (!validationResults.valid) {
		          return validationResults;
		        }
		      }
		      return {
		        valid: true,
		        msg: null
		      };
		    };
		    this.init();
		};
	  function LookUpEditor2(args) {
		    var $input;
		    var defaultValue;
		    var scope = this;
			var $imgBtn;
		    this.init = function () {
		      var gridOptions = args.grid.getOptions();
		      var rowHeight = gridOptions.rowHeight;
			  var inputhtml = "<INPUT type=text class='editor-text'/>";
		      $input = $(inputhtml)
		          .appendTo(args.container)
		          .bind("keydown.nav", function (e) {
		            if (e.which === $.ui.keyCode.LEFT || e.which === $.ui.keyCode.RIGHT) {
		              e.stopImmediatePropagation();
		          }
		      });
		      if (args.column.editable===true) {
		       		$input.focus().select();
		      }
		      $input.width($input.width() - 18);  
		     // $input.height(rowHeight);    
		      $imgBtn =  $('<img class="ui-datepicker-trigger" src="images/lookup.gif" >');
		      $imgBtn.css('cursor','pointer');
		      if (args.column.imgBtnCss){
		      	 $imgBtn.addClass(args.column.imgBtnCss);
		      }
		      if (args.column.btnClick){
		      	 $imgBtn.click(function(){ args.column.btnClick(args.item, $input); });
		      }   
		      $input.after($imgBtn);
		      if (args.column.tip) {
		        $input.attr("title", args.column.tip);
		      	$input.tooltip();
		      }
		    };
		    this.destroy = function () {
		      $input.remove();
		      $imgBtn.remove();
		    };
		    this.getValue = function () {
		      return $input.val();
		    };
		    this.setValue = function (val) {
		      $input.val(val);
		    };
		    this.loadValue = function (item) {
		      if (args.column.formatter) {
		      	defaultValue = args.column.formatter(-1, -1, "",args.column, item);
		      	defaultValue = defaultValue.replace(/<[^>]+>/g,"").replace(/&nbsp;/ig, "");
		      }
		      if (!defaultValue||defaultValue=='') {
		      	defaultValue = item[args.column.field] || "";
		      }
		      $input.val(defaultValue);
		      $input[0].defaultValue = defaultValue;
		      if (args.column.editable===true) {
		       		$input.focus().select();
		      }
		    };
		    this.serializeValue = function () {
		      return $input.val();
		    };
		    this.applyValue = function (item, state) {
		      item[args.column.field] = state;
		    };
		    this.isValueChanged = function () {
		      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
		    };
		    this.validate = function () {
		      if (args.column.validator) {
		        var validationResults = args.column.validator($input.val());
		        if (!validationResults.valid) {
		          return validationResults;
		        }
		      }
		      return {
		        valid: true,
		        msg: null
		      };
		    };
		    this.init();
		};
		/**
		 * 1、可编辑放大镜editable
		 * 2、可编辑文本长度控制length
		 * @author wangy 
		 * @date 2014-10-31
		 */
		function LookUpEditor3(args) {
		    var $input;
		    var defaultValue;
		    var scope = this;
			var $imgBtn;
		    this.init = function () {
		      var gridOptions = args.grid.getOptions();
		      var rowHeight = gridOptions.rowHeight;
			  var inputhtml = "<INPUT type=text class='editor-text' disabled />";
			  if (args.column.editable===true) {
				inputhtml = "<INPUT type=text class='editor-text'/>";
			  }
		      $input = $(inputhtml)
		          .appendTo(args.container)
		          .bind("keydown.nav", function (e) {
		            if (e.which === $.ui.keyCode.LEFT || e.which === $.ui.keyCode.RIGHT) {
		              e.stopImmediatePropagation();
		          }
		      });
		      if (args.column.editable===true) {
		       		$input.focus().select();
		      }
		      $input.width($input.width() - 18);  
		     // $input.height(rowHeight);    
		      $imgBtn =  $('<img class="ui-datepicker-trigger" src="images/lookup.gif" >');
		      $imgBtn.css('cursor','pointer');
		      if (args.column.imgBtnCss){
		      	 $imgBtn.addClass(args.column.imgBtnCss);
		      }
		      if (args.column.btnClick){
		      	 $imgBtn.click(function(){ args.column.btnClick(args.item, $input); });
		      }   
		      $input.after($imgBtn);
		      if (args.column.tip) {
		        $input.attr("title", args.column.tip);
		      	$input.tooltip();
		      }
		    };
		    this.destroy = function () {
		      $input.remove();
		      $imgBtn.remove();
		    };
		    this.getValue = function () {
		      return $input.val();
		    };
		    this.setValue = function (val) {
		      $input.val(val);
		    };
		    this.loadValue = function (item) {
		      if (args.column.formatter) {
		      	defaultValue = args.column.formatter(-1, -1, "",args.column, item);
		      	defaultValue = defaultValue.replace(/<[^>]+>/g,"").replace(/&nbsp;/ig, "");
		      }
		      if (!defaultValue||defaultValue=='') {
		      	defaultValue = item[args.column.field] || "";
		      }
		      $input.val(defaultValue);
		      $input[0].defaultValue = defaultValue;
		      if (args.column.editable===true) {
		       		$input.focus().select();
		      }
		    };
		    this.serializeValue = function () {
		    	if (args.column.editable===true && args.column.length) {
		    		if (args.column.length < $input.val().length) {
		    			return $input.val().substr(0, args.column.length);
		    		}
		    	}
		    	return $input.val();
		    };
		    this.applyValue = function (item, state) {
		      item[args.column.field] = state;
		    };
		    this.isValueChanged = function () {
		      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
		    };
		    this.validate = function () {
		      if (args.column.validator) {
		        var validationResults = args.column.validator($input.val());
		        if (!validationResults.valid) {
		          return validationResults;
		        }
		      }
		      return {
		        valid: true,
		        msg: null
		      };
		    };
		    this.init();
		};
		
		function LookUpEditor4(args) {
		    var $input;
		    var defaultValue;
		    var scope = this;
			var $imgBtn;
		    this.init = function () {
		      var gridOptions = args.grid.getOptions();
		      var rowHeight = gridOptions.rowHeight;
			  var inputhtml = "<INPUT type=text class='editor-text' disabled />";
			  if (args.column.editable===true) {
				inputhtml = "<INPUT type=text class='editor-text'/>";
			  }
		      $input = $(inputhtml)
		          .appendTo(args.container)
		          .bind("keydown.nav", function (e) {
		            if (e.which === $.ui.keyCode.LEFT || e.which === $.ui.keyCode.RIGHT) {
		              e.stopImmediatePropagation();
		          }
		          if (args.column.event) {
		       	     $input.on(args.column.event, args.column.onEvent);
		       	  }
		      });
		      if (args.column.editable===true) {
		       		$input.focus().select();
		      }
		      $input.width($input.width() - 18);  
		     // $input.height(rowHeight);    
		      $imgBtn =  $('<img class="ui-datepicker-trigger" src="images/lookup.gif" >');
		      $imgBtn.css('cursor','pointer');
		      if (args.column.imgBtnCss){
		      	 $imgBtn.addClass(args.column.imgBtnCss);
		      }
		      if (args.column.btnClick){
		      	 $imgBtn.click(function(){ args.column.btnClick(args.item, $input); });
		      }   
		      $input.after($imgBtn);
		      if (args.column.tip) {
		        $input.attr("title", args.column.tip);
		      	$input.tooltip();
		      }
		    };
		    this.destroy = function () {
		      $input.remove();
		      $imgBtn.remove();
		    };
		    this.getValue = function () {
		      return $input.val();
		    };
		    this.setValue = function (val) {
		      $input.val(val);
		    };
		    this.loadValue = function (item) {
		      if (args.column.formatter) {
		      	defaultValue = args.column.formatter(-1, -1, "",args.column, item);
		      	defaultValue = defaultValue.replace(/<[^>]+>/g,"").replace(/&nbsp;/ig, "");
		      }
		      if (!defaultValue||defaultValue=='') {
		      	defaultValue = item[args.column.field] || "";
		      }
		      $input.val(defaultValue);
		      $input[0].defaultValue = defaultValue;
		      if (args.column.editable===true) {
		       		$input.focus().select();
		      }
		    };
		    this.serializeValue = function () {
		    	if (args.column.editable===true && args.column.length) {
		    		if (args.column.length < $input.val().length) {
		    			return $input.val().substr(0, args.column.length);
		    		}
		    	}
		    	return $input.val();
		    };
		    this.applyValue = function (item, state) {
		      item[args.column.field] = state;
		    };
		    this.isValueChanged = function () {
		      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
		    };
		    this.validate = function () {
		      if (args.column.validator) {
		        var validationResults = args.column.validator($input.val());
		        if (!validationResults.valid) {
		          return validationResults;
		        }
		      }
		      return {
		        valid: true,
		        msg: null
		      };
		    };
		    this.init();
		};
})(jQuery);
