(function($) {
	function Model(options) {
		var defaults = {
			itemType : 'json',
			dataItemColumnValueExtractor : false
		};
		options = $.extend(true, {}, defaults, options);
		if (!options.data) {
			alert("必须设置一个来源数据");
			return false;
		}
		var _data = options.data;
		function init() {
			var i = 1;
			$.each(_data, function(idx, item) {
				item._no_ = i++;
			});
		}
		function getLength() {
			return _data.length;
		}
		function getItem(i) {
			return _data[i];
		}
		function setItem(i, item) {
			var oldItem = getItem(i);
			if (oldItem) {
				item._no_ = oldItem._no_;
				delete oldItem;
			}
			_data[i] = item;
		}
		function addItem(item) {
			item._no_ = _data.length + 1;
			_data.push(item);
		}
		function removeItem(i) {
			_data.splice(i,1);
			reBuildNo();
		}
		function insertItem(idx,item) {
            _data.splice(idx ,0,item);
            reBuildNo();
        }
		function reBuildNo() {
			for (var newno = 0; newno < _data.length; newno++) {
                var olditem = getItem(newno);
                olditem._no_ = newno + 1;
            }
		}
		function clear() {
			_data.splice(0,_data.length);
		}
		init();
		return {
			"data" : _data,
			"getLength" : getLength,
			"getItem" : getItem,
			"addItem" : addItem,
			"setItem" : setItem,
			"removeItem" :removeItem,
			"insertItem" :insertItem,
			"clear" : clear
		};
	}
	$.extend(true, window, {
		Slick : {
			Data : {
				"Model" : Model
			}
		}
	});
})(jQuery);