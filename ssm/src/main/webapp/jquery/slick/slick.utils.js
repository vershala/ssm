var SkFmtUtils = (function() {
 function readonlyTextFormatter(row, cell, value, columnDef, dataContex){
	  	if (value == undefined||value == null||value == '') {
	  		return '';
	  	}
	  	else {
	  		if (columnDef.cssClass&&columnDef.cssClass=='cell-right') {
	  			return plainTextFormatter(row, cell, value, columnDef, dataContex);
	  		}
	  		else {
	  			return "<INPUT type=text class='editor-text' value='" + value +"' readonly />";
	  		}
	  	}
 }
 function lookupFormatter(row, cell, value, columnDef, dataContext) {
	 var v = Utils.isEmpty(value)?'':value;
	 	var class_tag = columnDef.id + '_LOOKUP';
	 	return '<p class="editor-text">' + v + 
	 		   '<img class="ui-datepicker-trigger '+ class_tag + 
	 		   '" style="float:right;cursor:pointer;" src="images/lookup.gif"' +
	 		   '  row=' + row + ' cell=' + cell +   
	 		   ' ></p>';
 }
 function indexFormatter(row, cell, value, columnDef, dataContext) {
 	 return dataContext["index"] + 1; 
 };
 function plainTextFormatter(row, cell, value, columnDef, dataContext) {
     if (value == null) {
       return "";
     } else {
       return value.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
     }
 }

 return {
	 'lookup'  :lookupFormatter,
	 'readonly':readonlyTextFormatter,
	 'index'   :indexFormatter,
	 'plain'   :plainTextFormatter
 };
})();

var SkOptUtils = (function() {
	 function common(parms) {
		if (parms == undefined){
			parms = {};
		} 
		var opts = {
			enableCellNavigation: true,
			enableColumnReorder: false,
			defaultColumnWidth: 80,
			explicitInitialization: true,
			defaultFormatter: SkFmtUtils.readonly	
		};
		$.extend(opts, parms);
		return opts;
	 };
	 function headRow() {
		 return common({showHeaderRow: true});
	 };
	 function edit() {
		 return common({editable: true,enableAddRow:true });
	 };
	 return {
		 'headRow': headRow,
		 'opts'   : common,
		 'edit'   : edit
	 };
})();

var SkUtils = (function() {
	 function getActiveRow(grid) {
	 	var cell = grid.getActiveCell();
		return grid.getDataItem(cell.row);
	 };
	 function renderActiveRow(grid) {
	 	var cell = grid.getActiveCell();
	 	grid.invalidateRow(cell.row);
		grid.render();
		grid.setActiveCell(cell.row, cell.cell);
		grid.editActiveCell();
	 };
	 function edit(grid, newVal, setval){
			var cell = grid.getActiveCell();
			var item = grid.getDataItem(cell.row);
			if (setval) {
				setval(newVal, item, cell);
			}			
			grid.invalidateRow(cell.row);
			grid.render();
			grid.setActiveCell(cell.row, cell.cell);
			grid.editActiveCell();
	 }
	 		
	 return {
		 'getActiveRow': getActiveRow,
		 'edit':edit,
		 'renderActiveRow':renderActiveRow
	 };
})();
