(function ($) {
  // register namespace
  $.extend(true, window, {
    "Slick": {
      "CheckboxSelectColumn": CheckboxSelectColumn
    }
  });


  function CheckboxSelectColumn(options) {
    var _grid;
    var _self = this;
    var _handler = new Slick.EventHandler();
    var _selectedRowsLookup = {};
    var _defaults = {
      columnId: "_checkbox_selector",
      cssClass: null,
      toolTip: "Select/Deselect All",
      name: "<input type='checkbox'>",
      updateColumnHeader: true,
      width: 30,
	  refresh:true
    };

    var _options = $.extend(true, {}, _defaults, options);
	var hdClick = false;
    function init(grid) {
      _grid = grid;
      _handler
        .subscribe(_grid.onSelectedRowsChanged, handleSelectedRowsChanged)
        .subscribe(_grid.onClick, handleClick)
        .subscribe(_grid.onHeaderClick, handleHeaderClick)
        .subscribe(_grid.onKeyDown, handleKeyDown);
    }

    function destroy() {
      _handler.unsubscribeAll();
    }

    function handleSelectedRowsChanged(e, args) {
	  var selectedRows = _grid.getSelectedRows();
	  var lookup = {}, row, i;
	  for (i = 0; i < selectedRows.length; i++) {
		row = selectedRows[i];
		lookup[row] = true;
		if (lookup[row] !== _selectedRowsLookup[row]) {
			if (_options.refresh === true||hdClick===true)
			{
				_grid.invalidateRow(row);
			}
			delete _selectedRowsLookup[row];
		}
	  }
	  if (_options.refresh === true||hdClick===true)
	  {
		  for (i in _selectedRowsLookup) {
			 _grid.invalidateRow(i);
		  }  
	  }
	  _selectedRowsLookup = lookup;
	  if (_options.refresh === true||hdClick===true) {
		_grid.render();
	  }
	  hdClick=false;
	  if (_options.updateColumnHeader) {
	      if (selectedRows.length && selectedRows.length == _grid.getDataLength()) {
	        _grid.updateColumnHeader(_options.columnId, "<input type='checkbox' checked='checked'>", _options.toolTip);
	      } else {
	        _grid.updateColumnHeader(_options.columnId, "<input type='checkbox'>", _options.toolTip);
	      }
      }
    }

    function handleKeyDown(e, args) {
      if (e.which == 32) {
        if (_grid.getColumns()[args.cell].id === _options.columnId) {
          // if editing, try to commit
          if (!_grid.getEditorLock().isActive() || _grid.getEditorLock().commitCurrentEdit()) {
            toggleRowSelection(args.row);
          }
          e.preventDefault();
          e.stopImmediatePropagation();
        }
      }
    }

    function handleClick(e, args) {
      // clicking on a row select checkbox
      if (_grid.getColumns()[args.cell].id === _options.columnId && $(e.target).is(":checkbox")) {
        // if editing, try to commit
        if (_grid.getEditorLock().isActive() && !_grid.getEditorLock().commitCurrentEdit()) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return;
        }
		hdClick = true;
        toggleRowSelection(args.row);
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }

    function toggleRowSelection(row) {
      if (_selectedRowsLookup[row]) {
        _grid.setSelectedRows($.grep(_grid.getSelectedRows(), function (n) {
          return n != row;
        }));
      } else {
        _grid.setSelectedRows(_grid.getSelectedRows().concat(row));
      }
    }

    function handleHeaderClick(e, args) {
		hdClick = true;
      if (args.column.id == _options.columnId && $(e.target).is(":checkbox")) {
        // if editing, try to commit
        if (_grid.getEditorLock().isActive() && !_grid.getEditorLock().commitCurrentEdit()) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return;
        }

        if ($(e.target).is(":checked")) {
          var rows = [];
          for (var i = 0; i < _grid.getDataLength(); i++) {
            rows.push(i);
          }
          _grid.setSelectedRows(rows);
        } else {
          _grid.setSelectedRows([]);
        }
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }

    function getColumnDefinition() {
      return {
        id: _options.columnId,
        name: _options.name,
        toolTip: _options.toolTip,
        field: "sel",
        width: _options.width,
        resizable: false,
        sortable: false,
        cssClass: _options.cssClass,
        formatter: checkboxSelectionFormatter
      };
    }

    function checkboxSelectionFormatter(row, cell, value, columnDef, dataContext) {
      if (dataContext) {
		return _selectedRowsLookup[row]
            ? "<input class='_chk_' type='checkbox' checked='checked'" + "id=_chk_" + row + ">" 
            : "<input class='_chk_' type='checkbox'" + "id=_chk_" + row + ">" ;
      }
      return null;
    }

    $.extend(this, {
      "init": init,
      "destroy": destroy,
	  "toggleRowSelection":toggleRowSelection,
      "getColumnDefinition": getColumnDefinition
    });
  }
})(jQuery);