(function ($) {
  // register namespace
  $.extend(true, window, {
    "Slick": {
      "EditManager": EditManager
    }
  });

  function EditManager(options) {
    var _grid;
    var _self = this;
    var _handler = new Slick.EventHandler();
    var _buffIds = [];
    var _defaults = {
    	"onAddItem"    : function(item) {} ,
    	"onDeleteItem" : function(idx) {} ,
    	"onUpdateItem" : function(i,item) {} ,
    	"useBuffIds"   : false
    };
    var _options = $.extend(true, {}, _defaults, options);
    
    function init(grid) {
      _grid = grid;
      if (_grid.getOptions().editable) {
	      _handler
	        .subscribe(_grid.onActiveCellChanged, handleActiveCellChanged)
	        .subscribe(_grid.onAddNewRow, handleAddNewRow)
	        .subscribe(_grid.onCellChange, handleCellChange);
      }
    }
    function destroy() {
      _handler.unsubscribeAll();
    }
    function handleActiveCellChanged(e, args) {
    	if (args.row == _grid.getDataLength()&&(_options.defaultNewValues)) {
    		var item = $.extend(true, {},_options.defaultNewValues);
			var parms = {'item' : item};
			handleAddNewRow(e, parms);
		}
		_grid.editActiveCell();
		return false;
    }
    function handleAddNewRow(e, args) {
    	var item = args.item;
        var isEmpty = Utils.isAllEmpty(item);
        if (isEmpty) {
        	return false;
        }
        var len  = _grid.getDataLength();
        applyId(item);
        _addItem(item);
        _grid.invalidateRow(len);
        _grid.updateRowCount();
        _grid.render();
    }
    function handleCellChange(e, args) {
    	_grid.invalidateRow(args.row);
    	_grid.render();
    	var item = args.item;
    	if (Utils.isEmpty(item._state)) {
    		item._state = "modified";
    	}
    }
    function removeItems(idxs) {
    	var data = _grid.getData();
    	for (var i=0; i< idxs.length; ++i) {
    		if (data.removeItem) {
    			data.removeItem(i);
    		}
    		else {
    			data.splice(i,1);
    		}
    	}
    	_options.onDeleteItem(idxs);
    }
    function removeItem(i) {
    	var data = _grid.getData();
    	if (data.removeItem) {
    		data.removeItem(i);
    	}
    	else {
    		data.splice(i,1);
    	}
    	_options.onDeleteItem(null);
    }
    function setItem(i, item) {
    	var data = _grid.getData();
    	if (data.setItem) {
        	data.setItem(i,item);
        }
        else {
        	var oldItem = data[i];
			if (oldItem) {
				delete oldItem;
			}
			data[i] = item;
        }
    	modifyItem(item);
    	_options.onUpdateItem(i, item);
    }
    function modifyItem(item) {
    	if (Utils.isEmpty(item._state)) {
    		item._state = "modified";
    	}
    }
    function addItem(item) {
    	applyId(item);
    	_addItem(item);
    	_options.onAddItem(item);
    }
    function insertItem(idx,item) {
        applyId(item);
        var data = _grid.getData();
        if (data.insertItem) {
            data.insertItem(idx,item);
        }
        else {
            data.splice(idx,0, item);
        }
        item._state = "added";
        _options.onAddItem(item);
    }
    function applyId(item){
    	if ((item.id==undefined||item.id==null||item.id=='')&&_options.useBuffIds) {
    		 if (_buffIds.length==0) {
    	        requestBuffIds();
    	     }
    	     var id = _buffIds.shift();
    	     item.id = id;	
    	}
    }
    function _addItem(item) {
    	var data = _grid.getData();
    	if (data.addItem) {
        	data.addItem(item);
        }
        else {
        	data.push(item);
        }
    	item._state = "added";
    }
    function getChanged() {
    	var changed = new Array();
    	var len  = _grid.getDataLength();
    	for (var i = 0; i< len; ++i) {
    		var item = _grid.getDataItem(i);
    		if (item && item._state) {
    			changed.push(item);
    		}
    	}
    	return changed;
    }
    function resetState() {
	    var len  = _grid.getDataLength();
	    for (var i = 0; i< len; ++i) {
	    		var item = _grid.getDataItem(i);
	    		item._state = undefined;
	    }
    }
	function requestBuffIds(){
    	$.ajax({
	            type : 'post',
	            async: false,
				dataType : 'json',
	            url  : _options.reqIdsUrl,
	            success: function(result){
					_buffIds = result;
				},
	            error: function (jqXHR, textStatus,errorThrown) {
	            	alert('fail');
				}
    	});
    }
    function contain(key, val) {
    	var len  = _grid.getDataLength();
    	for (var i = 0; i< len; ++i) {
    		var item = _grid.getDataItem(i);
    		if (item[key]&&item[key]===val){
    			return true;
    		}
    	}
    	return false;
    }
    function getIndex(key, val) {
    	var len  = _grid.getDataLength();
    	for (var i = 0; i< len; ++i) {
    		var item = _grid.getDataItem(i);
    		if (item[key]&&item[key]===val){
    			return i;
    		}
    	}
    	return -1;
    }
    function getGrid() {
    	return _grid;
    }
    $.extend(this, {
      "getGrid": getGrid,	
      "init": init,
      "destroy": destroy,
      "getChanged": getChanged,
      "removeItems":removeItems,
      "resetState":resetState,
      "addItem":addItem,
      "setItem":setItem,
      "contain":contain,
      "getIndex":getIndex,
      "removeItem":removeItem,
      "insertItem": insertItem,
      "modifyItem": modifyItem
    });
  }
})(jQuery);