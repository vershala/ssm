(function ($) {
  // register namespace
  $.extend(true, window, {
    "Slick": {
      "RowSelModel": RowSelModel
    }
  });

  function RowSelModel(options) {
    var _grid;
    var _ranges = [];
    var _self = this;
    var _handler = new Slick.EventHandler();
    var _inHandler;
    var _options;
    var _defaults = {
      selectActiveRow: true
    };
	var _rows = [];
    function init(grid) {
      _options = $.extend(true, {}, _defaults, options);
      _grid = grid;
    }

    function destroy() {
     
    }
	
	function addRow(row) {
		var idx = $.inArray(row, _rows) ;
		if (idx==-1){
			_rows.push(row);
			setSelectedRows(_rows);
		}
	}
	
	function removeRow(row){
		var idx = $.inArray(row, _rows) ;
		if (idx!=-1) {
			_rows.splice(idx,1);
			setSelectedRows(_rows);
		}
	}

    function rangesToRows(ranges) {
      var rows = [];
      for (var i = 0; i < ranges.length; i++) {
        for (var j = ranges[i].fromRow; j <= ranges[i].toRow; j++) {
          rows.push(j);
        }
      }
      return rows;
    }

    function rowsToRanges(rows) {
      var ranges = [];
      var lastCell = _grid.getColumns().length - 1;
      for (var i = 0; i < rows.length; i++) {
        ranges.push(new Slick.Range(rows[i], 0, rows[i], lastCell));
      }
      return ranges;
    }

    function getRowsRange(from, to) {
      var i, rows = [];
      for (i = from; i <= to; i++) {
        rows.push(i);
      }
      for (i = to; i < from; i++) {
        rows.push(i);
      }
      return rows;
    }

    function getSelectedRows() {
      return rangesToRows(_ranges);
    }

    function setSelectedRows(rows) {
	  _rows = rows;
	  _setSelectedRanges(rowsToRanges(rows));
    }

    function setSelectedRanges(ranges) {
      _rows = rangesToRows(ranges);
	  _setSelectedRanges(ranges);
    }
	
	function _setSelectedRanges(ranges) {
      _ranges = ranges;
	  _self.onSelectedRangesChanged.notify(_ranges);
    }

    function getSelectedRanges() {
      return _ranges;
    }

    $.extend(this, {
      "getSelectedRows": getSelectedRows,
      "setSelectedRows": setSelectedRows,

      "getSelectedRanges": getSelectedRanges,
      "setSelectedRanges": setSelectedRanges,

      "init": init,
      "destroy": destroy,

      "onSelectedRangesChanged": new Slick.Event(),
	  
	  "addRow":addRow,
	  "removeRow":removeRow
    });
  }
})(jQuery);