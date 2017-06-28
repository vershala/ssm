(function ($) {
  function RemoteModel(options) {
    // private
    var PAGESIZE = 50;
    var data = {length: 0};
    var sortcol = null;
    var sortdir = 1;
    var h_request = null;
    var jqXHR = null; // ajax request
   
    // events
    var onDataLoading = new Slick.Event();
    var onDataLoaded = new Slick.Event();
    var onDataLoadFail = new Slick.Event();
   	
   	
    var defaults = {
    	pageSize : PAGESIZE,
    	parms : {}
    };
    options = $.extend(true, {}, defaults, options);
   
    if (!options.url) {
    	alert("你必须设置URL");
    }
    
    function init() {
    }
    //第几条到第几条，如果存在一个数组元素不存在，那么这个区间的数据就是没被加载进来
    function isDataLoaded(from, to) {
      for (var i = from; i <= to; i++) {
        if (data[i] == undefined || data[i] == null) {
          return false;
        }
      }
      return true;
    }
    //清除数据
    function clear() {
      for (var key in data) {
        delete data[key];
      }
      data.length = 0;
    }
    //按范围载入数据
    function ensureData(from, to) {
      if (jqXHR) {
        jqXHR.abort();
        //页范围，data[0] = undefined; data[50] = undefined; datat[100] = undefined;
        for (var i = jqXHR.fromPage; i <= jqXHR.toPage; i++)
          data[i * options.pageSize] = undefined;
      }
      if (from < 0) {
        from = 0;
      }
      var fromPage = Math.floor(from / options.pageSize); //地板函数
      var toPage   = Math.floor(to   / options.pageSize); //地板函数
      //计算是否要载入数据
      while (data[fromPage * options.pageSize] !== undefined && fromPage < toPage)
        fromPage++;
      while (data[toPage * options.pageSize] !== undefined && fromPage < toPage)
        toPage--;
      if (fromPage > toPage || ((fromPage == toPage) && data[fromPage * options.pageSize] !== undefined)) {
        // TODO:  look-ahead
        return;
      }
      //url += ("&sort=" + ((sortdir > 0) ? "digg_count-asc" : "digg_count-desc"));
      
      var pageParms = {
      	 'page.offset' : fromPage * options.pageSize,
      	 'page.count'  : (toPage - fromPage + 1) * options.pageSize
      };      
      if (h_request != null) {
        clearTimeout(h_request);
      }
	  var dataParms = $.extend(pageParms, options.parms);
      
      h_request = setTimeout(function () {
        for (var i = fromPage; i <= toPage; i++)
          data[i * options.pageSize] = null; // null indicates a 'requested but not available yet'
        onDataLoading.notify({from: from, to: to});
        jqXHR = $.ajax({
          type : 'post',
          url  : options.url,
          data : dataParms,
          success: onSuccess,
          error: function (jqXHR, textStatus,errorThrown) {
            onError(fromPage, toPage);
          }
        });
        jqXHR.fromPage = fromPage;
        jqXHR.toPage = toPage;
      }, 50);
    }
    function onError(fromPage, toPage) {
      var parms = {'fromPage': fromPage, 'toPage': toPage};
       onDataLoadFail.notify(parms);
    }
    function onSuccess(resp) {
     if (resp.total==undefined) {
    	 onDataLoaded.notify({from: -1, to: -1});
    	 alert("no data.total!");
         return false;
      }
      var from = jqXHR.fromPage * options.pageSize, to = from + resp.count;
      data.length = parseInt(resp.total);
      for (var i = 0; i < resp.data.length; i++) {
        data[from + i] = resp.data[i];
        data[from + i].index = from + i;
      }
      jqXHR = null;
      var parms = {from: from, to: to};
      onDataLoaded.notify(parms);
    }
    function reloadData(from, to) {
      for (var i = from; i <= to; i++)
        delete data[i];
      ensureData(from, to);
    }
    function setSort(column, dir) {
      sortcol = column;
      sortdir = dir;
      clear();
    }
    function setParms(parms) {
      options.parms = parms;
      clear();
    }
    function setSearch(str) {
      searchstr = str;
      clear();
    }
    var loadingIndicator = null;
    function applyGrid(grid, gridId) {
    	grid.onViewportChanged.subscribe(function (e, args) {
	      var vp = grid.getViewport();
	      ensureData(vp.top, vp.bottom);
	    });
	    onDataLoading.subscribe(function () {
	      if (!loadingIndicator) {
	        loadingIndicator = $("<span class='loading-indicator'><label>正在载入...</label></span>").appendTo(document.body);
	        var $g = $(gridId);
	        loadingIndicator
	            .css("position", "absolute")
	            .css("top", $g.position().top + $g.height() / 2 - loadingIndicator.height() / 2)
	            .css("left", $g.position().left + $g.width() / 2 - loadingIndicator.width() / 2);
	      }
	      loadingIndicator.show();
	    });
	    onDataLoaded.subscribe(function (e, args) {
	      for (var i = args.from; i <= args.to; i++) {
	    	  grid.invalidateRow(i);
	      }
	      grid.updateRowCount();
	      grid.render();
	      loadingIndicator.fadeOut();
	    });
	    onDataLoadFail.subscribe(function (e, args) {loadingIndicator.fadeOut(); });
	    grid.onViewportChanged.notify();
    }
    init();
    return {
      "data": data,
      // methods
      "clear": clear,
      "isDataLoaded": isDataLoaded,
      "ensureData"  : ensureData,
      "reloadData"  : reloadData,
      "setSort"     : setSort,
      "setSearch"   : setSearch,
      "setParms"    : setParms,

      // events
      "onDataLoading": onDataLoading,
      "onDataLoaded": onDataLoaded,
      "onDataLoadFail": onDataLoadFail,
      
      "applyGrid":applyGrid
    };
  }

  // Slick.Data.RemoteModel
  $.extend(true, window, { Slick: { Data: { RemoteModel: RemoteModel }}});
})(jQuery);