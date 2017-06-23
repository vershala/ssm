if (typeof jQuery == "undefined") throw "SlickGrid requires jquery module to be loaded";
if (!jQuery.fn.drag) throw "SlickGrid requires jquery.event.drag module to be loaded";
if (typeof Slick == "undefined") throw "slick.core.js not loaded"; (function($) {
    function SlickGrid(container, data, columns, options) {
        function init() {
            $container = $(container);
            if ($container.length < 1) throw new Error("SlickGrid requires a valid container, " + container + " does not exist in the DOM.");
            maxSupportedCssHeight = maxSupportedCssHeight || getMaxSupportedCssHeight(),
            scrollbarDimensions = scrollbarDimensions || measureScrollbar(),
            options = $.extend({},
            defaults, options),
            validateAndEnforceOptions(),
            columnDefaults.width = options.defaultColumnWidth,
            columnsById = {};
            for (var e = 0; e < columns.length; e++) {
                var t = columns[e] = $.extend({},
                columnDefaults, columns[e]);
                columnsById[t.id] = e,
                t.minWidth && t.width < t.minWidth && (t.width = t.minWidth),
                t.maxWidth && t.width > t.maxWidth && (t.width = t.maxWidth)
            }
            if (options.enableColumnReorder && !$.fn.sortable) throw new Error("SlickGrid's 'enableColumnReorder = true' option requires jquery-ui.sortable module to be loaded");
            editController = {
                commitCurrentEdit: commitCurrentEdit,
                cancelCurrentEdit: cancelCurrentEdit
            },
            $container.empty().css("overflow", "hidden").css("outline", 0).addClass(uid).addClass("ui-widget"),
            /relative|absolute|fixed/.test($container.css("position")) || $container.css("position", "relative"),
            $focusSink = $("<div tabIndex='0' hideFocus style='position:fixed;width:0;height:0;top:0;left:0;outline:0;'></div>").appendTo($container),
            $headerScroller = $("<div class='slick-header ui-state-default slick-header-custom' style='overflow:hidden;position:relative;' />").appendTo($container),
            $headers = $("<div class='slick-header-columns' style='left:-1000px' />").appendTo($headerScroller),
            $headers.width(getHeadersWidth()),
            $headerRowScroller = $("<div class='slick-headerrow ui-state-default slick-headerrow-custom' style='overflow:hidden;position:relative;' />").appendTo($container),
            $headerRow = $("<div class='slick-headerrow-columns' />").appendTo($headerRowScroller),
            $headerRowSpacer = $("<div style='display:block;height:1px;position:absolute;top:0;left:0;'></div>").css("width", getCanvasWidth() + scrollbarDimensions.width + "px").appendTo($headerRowScroller),
            $topPanelScroller = $("<div class='slick-top-panel-scroller ui-state-default' style='overflow:auto;position:relative;' />").appendTo($container),
            $topPanel = $("<div class='slick-top-panel' style='width:10000px' />").appendTo($topPanelScroller),
            options.showTopPanel || $topPanelScroller.hide(),
            options.showHeaderRow || $headerRowScroller.hide(),
            $viewport = $("<div class='slick-viewport' style='width:100%;overflow:auto;outline:0;position:relative;;'>").appendTo($container),
            $viewport.css("overflow-y", options.autoHeight ? "hidden": "auto"),
            $canvas = $("<div class='grid-canvas' />").appendTo($viewport),
            $focusSink2 = $focusSink.clone().appendTo($container),
            options.explicitInitialization || finishInitialization()
        }
        function finishInitialization() {
            initialized || (initialized = !0, viewportW = parseFloat($.css($container[0], "width", !0)), measureCellPaddingAndBorder(), disableSelection($headers), options.enableTextSelectionOnCells || $viewport.bind("selectstart.ui",
            function(e) {
                return $(e.target).is("input,textarea")
            }), updateColumnCaches(), createColumnHeaders(), setupColumnSort(), createCssRules(), resizeCanvas(), bindAncestorScrollEvents(), $container.bind("resize.slickgrid", resizeCanvas), $viewport.bind("scroll", handleScroll), $headerScroller.bind("contextmenu", handleHeaderContextMenu).bind("click", handleHeaderClick).delegate(".slick-header-column", "mouseenter", handleHeaderMouseEnter).delegate(".slick-header-column", "mouseleave", handleHeaderMouseLeave), $headerRowScroller.bind("scroll", handleHeaderRowScroll), $focusSink.add($focusSink2).bind("keydown", handleKeyDown), $canvas.bind("keydown", handleKeyDown).bind("click", handleClick).bind("dblclick", handleDblClick).bind("contextmenu", handleContextMenu).bind("draginit", handleDragInit).bind("dragstart", handleDragStart).bind("drag", handleDrag).bind("dragend", handleDragEnd).delegate(".slick-cell", "mouseenter", handleMouseEnter).delegate(".slick-cell", "mouseleave", handleMouseLeave))
        }
        function registerPlugin(e) {
            plugins.unshift(e),
            e.init(self)
        }
        function unregisterPlugin(e) {
            for (var t = plugins.length; t >= 0; t--) if (plugins[t] === e) {
                plugins[t].destroy && plugins[t].destroy(),
                plugins.splice(t, 1);
                break
            }
        }
        function setSelectionModel(e) {
            selectionModel && (selectionModel.onSelectedRangesChanged.unsubscribe(handleSelectedRangesChanged), selectionModel.destroy && selectionModel.destroy()),
            selectionModel = e,
            selectionModel && (selectionModel.init(self), selectionModel.onSelectedRangesChanged.subscribe(handleSelectedRangesChanged))
        }
        function getSelectionModel() {
            return selectionModel
        }
        function getCanvasNode() {
            return $canvas[0]
        }
        function measureScrollbar() {
            var e = $("<div style='position:absolute; top:-10000px; left:-10000px; width:100px; height:100px; overflow:scroll;'></div>").appendTo("body"),
            t = {
                width: e.width() - e[0].clientWidth,
                height: e.height() - e[0].clientHeight
            };
            return e.remove(),
            t
        }
        function getHeadersWidth() {
            var e = 0;
            for (var t = 0,
            n = columns.length; t < n; t++) {
                var r = columns[t].width;
                e += r
            }
            return e += scrollbarDimensions.width,
            Math.max(e, viewportW) + 1e3
        }
        function getCanvasWidth() {
            var e = viewportHasVScroll ? viewportW - scrollbarDimensions.width: viewportW,
            t = 0,
            n = columns.length;
            while (n--) t += columns[n].width;
            return options.fullWidthRows ? Math.max(t, e) : t
        }
        function updateCanvasWidth(e) {
            var t = canvasWidth;
            canvasWidth = getCanvasWidth(),
            canvasWidth != t && ($canvas.width(canvasWidth), $headerRow.width(canvasWidth), $headers.width(getHeadersWidth()), viewportHasHScroll = canvasWidth > viewportW - scrollbarDimensions.width),
            $headerRowSpacer.width(canvasWidth + (viewportHasVScroll ? scrollbarDimensions.width: 0)),
            (canvasWidth != t || e) && applyColumnWidths()
        }
        function disableSelection(e) {
            e && e.jquery && e.attr("unselectable", "on").css("MozUserSelect", "none").bind("selectstart.ui",
            function() {
                return ! 1
            })
        }
        function getMaxSupportedCssHeight() {
            var e = 1e6,
            t = $.browser.mozilla ? 6e6: 1e9,
            n = $("<div style='display:none' />").appendTo(document.body);
            for (;;) {
                var r = e * 2;
                n.css("height", r);
                if (r > t || n.height() !== r) break;
                e = r
            }
            return n.remove(),
            e
        }
        function bindAncestorScrollEvents() {
            var e = $canvas[0];
            while ((e = e.parentNode) != document.body && e != null) if (e == $viewport[0] || e.scrollWidth != e.clientWidth || e.scrollHeight != e.clientHeight) {
                var t = $(e);
                $boundAncestors ? $boundAncestors = $boundAncestors.add(t) : $boundAncestors = t,
                t.bind("scroll." + uid, handleActiveCellPositionChange)
            }
        }
        function unbindAncestorScrollEvents() {
            if (!$boundAncestors) return;
            $boundAncestors.unbind("scroll." + uid),
            $boundAncestors = null
        }
        function updateColumnHeader(e, t, n) {
            if (!initialized) return;
            var r = getColumnIndex(e);
            if (r == null) return;
            var i = columns[r],
            s = $headers.children().eq(r);
            s && (t !== undefined && (columns[r].name = t), n !== undefined && (columns[r].toolTip = n), trigger(self.onBeforeHeaderCellDestroy, {
                node: s[0],
                column: i
            }), s.attr("title", n || "").children().eq(0).html(t), trigger(self.onHeaderCellRendered, {
                node: s[0],
                column: i
            }))
        }
        function getHeaderRow() {
            return $headerRow[0]
        }
        function getHeaderRowColumn(e) {
            var t = getColumnIndex(e),
            n = $headerRow.children().eq(t);
            return n && n[0]
        }
        function createColumnHeaders() {
            function e() {
                $(this).addClass("ui-state-hover")
            }
            function t() {
                $(this).removeClass("ui-state-hover")
            }
            $headers.find(".slick-header-column").each(function() {
                var e = $(this).data("column");
                e && trigger(self.onBeforeHeaderCellDestroy, {
                    node: this,
                    column: e
                })
            }),
            $headers.empty(),
            $headers.width(getHeadersWidth()),
            $headerRow.find(".slick-headerrow-column").each(function() {
                var e = $(this).data("column");
                e && trigger(self.onBeforeHeaderRowCellDestroy, {
                    node: this,
                    column: e
                })
            }),
            $headerRow.empty();
            for (var n = 0; n < columns.length; n++) {
                var r = columns[n],
                i = $("<div class='ui-state-default slick-header-column' id='" + uid + r.id + "' />").html("<span class='slick-column-name'>" + r.name + "</span>").width(r.width - headerColumnWidthDiff).attr("title", r.toolTip || "").data("column", r).addClass(r.headerCssClass || "").appendTo($headers); (options.enableColumnReorder || r.sortable) && i.hover(e, t),
                r.sortable && i.append("<span class='slick-sort-indicator' />"),
                trigger(self.onHeaderCellRendered, {
                    node: i[0],
                    column: r
                });
                if (options.showHeaderRow) {
                    var s = $("<div class='ui-state-default slick-headerrow-column l" + n + " r" + n + "'></div>").data("column", r).addClass(r.headerRowCssClass || "").appendTo($headerRow);
                    trigger(self.onHeaderRowCellRendered, {
                        node: s[0],
                        column: r
                    })
                }
            }
            setSortColumns(sortColumns),
            setupColumnResize(),
            options.enableColumnReorder && setupColumnReorder()
        }
        function setupColumnSort() {
            $headers.click(function(e) {
                e.metaKey = e.metaKey || e.ctrlKey;
                if ($(e.target).hasClass("slick-resizable-handle")) return;
                var t = $(e.target).closest(".slick-header-column");
                if (!t.length) return;
                var n = t.data("column");
                if (n.sortable) {
                    if (!getEditorLock().commitCurrentEdit()) return;
                    var r = null,
                    i = 0;
                    for (; i < sortColumns.length; i++) if (sortColumns[i].columnId == n.id) {
                        r = sortColumns[i],
                        r.sortAsc = !r.sortAsc;
                        break
                    }
                    if (e.metaKey && options.multiColumnSort) r && sortColumns.splice(i, 1);
                    else {
                        if (!e.shiftKey && !e.metaKey || !options.multiColumnSort) sortColumns = [];
                        r ? sortColumns.length == 0 && sortColumns.push(r) : (r = {
                            columnId: n.id,
                            sortAsc: n.defaultSortAsc
                        },
                        sortColumns.push(r))
                    }
                    setSortColumns(sortColumns),
                    options.multiColumnSort ? trigger(self.onSort, {
                        multiColumnSort: !0,
                        sortCols: $.map(sortColumns,
                        function(e) {
                            return {
                                sortCol: columns[getColumnIndex(e.columnId)],
                                sortAsc: e.sortAsc
                            }
                        })
                    },
                    e) : trigger(self.onSort, {
                        multiColumnSort: !1,
                        sortCol: n,
                        sortAsc: r.sortAsc
                    },
                    e)
                }
            })
        }
        function setupColumnReorder() {
            $headers.filter(":ui-sortable").sortable("destroy"),
            $headers.sortable({
                containment: "parent",
                axis: "x",
                cursor: "default",
                tolerance: "intersection",
                helper: "clone",
                placeholder: "slick-sortable-placeholder ui-state-default slick-header-column",
                forcePlaceholderSize: !0,
                start: function(e, t) {
                    $(t.helper).addClass("slick-header-column-active")
                },
                beforeStop: function(e, t) {
                    $(t.helper).removeClass("slick-header-column-active")
                },
                stop: function(e) {
                    if (!getEditorLock().commitCurrentEdit()) {
                        $(this).sortable("cancel");
                        return
                    }
                    var t = $headers.sortable("toArray"),
                    n = [];
                    for (var r = 0; r < t.length; r++) n.push(columns[getColumnIndex(t[r].replace(uid, ""))]);
                    setColumns(n),
                    trigger(self.onColumnsReordered, {}),
                    e.stopPropagation(),
                    setupColumnResize()
                }
            })
        }
        function setupColumnResize() {
            var e, t, n, r, i, s, o, u, a;
            i = $headers.children(),
            i.find(".slick-resizable-handle").remove(),
            i.each(function(e, t) {
                columns[e].resizable && (u === undefined && (u = e), a = e)
            });
            if (u === undefined) return;
            i.each(function(f, l) {
                if (f < u || options.forceFitColumns && f >= a) return;
                e = $(l),
                $("<div class='slick-resizable-handle' />").appendTo(l).bind("dragstart",
                function(e, u) {
                    if (!getEditorLock().commitCurrentEdit()) return ! 1;
                    r = e.pageX,
                    $(this).parent().addClass("slick-header-column-active");
                    var a = null,
                    l = null;
                    i.each(function(e, t) {
                        columns[e].previousWidth = $(t).outerWidth()
                    });
                    if (options.forceFitColumns) {
                        a = 0,
                        l = 0;
                        for (t = f + 1; t < i.length; t++) n = columns[t],
                        n.resizable && (l !== null && (n.maxWidth ? l += n.maxWidth - n.previousWidth: l = null), a += n.previousWidth - Math.max(n.minWidth || 0, absoluteColumnMinWidth))
                    }
                    var h = 0,
                    p = 0;
                    for (t = 0; t <= f; t++) n = columns[t],
                    n.resizable && (p !== null && (n.maxWidth ? p += n.maxWidth - n.previousWidth: p = null), h += n.previousWidth - Math.max(n.minWidth || 0, absoluteColumnMinWidth));
                    a === null && (a = 1e5),
                    h === null && (h = 1e5),
                    l === null && (l = 1e5),
                    p === null && (p = 1e5),
                    o = r + Math.min(a, p),
                    s = r - Math.min(h, l)
                }).bind("drag",
                function(e, u) {
                    var a, l = Math.min(o, Math.max(s, e.pageX)) - r,
                    h;
                    if (l < 0) {
                        h = l;
                        for (t = f; t >= 0; t--) n = columns[t],
                        n.resizable && (a = Math.max(n.minWidth || 0, absoluteColumnMinWidth), h && n.previousWidth + h < a ? (h += n.previousWidth - a, n.width = a) : (n.width = n.previousWidth + h, h = 0));
                        if (options.forceFitColumns) {
                            h = -l;
                            for (t = f + 1; t < i.length; t++) n = columns[t],
                            n.resizable && (h && n.maxWidth && n.maxWidth - n.previousWidth < h ? (h -= n.maxWidth - n.previousWidth, n.width = n.maxWidth) : (n.width = n.previousWidth + h, h = 0))
                        }
                    } else {
                        h = l;
                        for (t = f; t >= 0; t--) n = columns[t],
                        n.resizable && (h && n.maxWidth && n.maxWidth - n.previousWidth < h ? (h -= n.maxWidth - n.previousWidth, n.width = n.maxWidth) : (n.width = n.previousWidth + h, h = 0));
                        if (options.forceFitColumns) {
                            h = -l;
                            for (t = f + 1; t < i.length; t++) n = columns[t],
                            n.resizable && (a = Math.max(n.minWidth || 0, absoluteColumnMinWidth), h && n.previousWidth + h < a ? (h += n.previousWidth - a, n.width = a) : (n.width = n.previousWidth + h, h = 0))
                        }
                    }
                    applyColumnHeaderWidths(),
                    options.syncColumnCellResize && applyColumnWidths()
                }).bind("dragend",
                function(e, r) {
                    var s;
                    $(this).parent().removeClass("slick-header-column-active");
                    for (t = 0; t < i.length; t++) n = columns[t],
                    s = $(i[t]).outerWidth(),
                    n.previousWidth !== s && n.rerenderOnResize && invalidateAllRows();
                    updateCanvasWidth(!0),
                    render(),
                    trigger(self.onColumnsResized, {})
                })
            })
        }
        function getVBoxDelta(e) {
            var t = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
            n = 0;
            return $.each(t,
            function(t, r) {
                n += parseFloat(e.css(r)) || 0
            }),
            n
        }
        function measureCellPaddingAndBorder() {
            var e, t = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
            n = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"];
            e = $("<div class='ui-state-default slick-header-column' style='visibility:hidden'>-</div>").appendTo($headers),
            headerColumnWidthDiff = -9;
            headerColumnHeightDiff = 0,
            $.each(t,
            function(t, n) {
                headerColumnWidthDiff += parseFloat(e.css(n)) || 0
            }),
            $.each(n,
            function(t, n) {
                headerColumnHeightDiff += parseFloat(e.css(n)) || 0
            }),
            e.remove();
            var r = $("<div class='slick-row' />").appendTo($canvas);
            e = $("<div class='slick-cell' id='' style='visibility:hidden'>-</div>").appendTo(r),
            cellWidthDiff = cellHeightDiff = 0,
            $.each(t,
            function(t, n) {
                cellWidthDiff += parseFloat(e.css(n)) || 0
            }),
            $.each(n,
            function(t, n) {
                cellHeightDiff += parseFloat(e.css(n)) || 0
            }),
            r.remove(),
            absoluteColumnMinWidth = Math.max(headerColumnWidthDiff, cellWidthDiff)
        }
        function createCssRules() {
            $style = $("<style type='text/css' rel='stylesheet' />").appendTo($("head"));
            var e = options.rowHeight - cellHeightDiff,
            t = ["." + uid + " .slick-header-column { left: 1000px; }", "." + uid + " .slick-top-panel { height:" + options.topPanelHeight + "px; }", "." + uid + " .slick-headerrow-columns { height:" + options.headerRowHeight + "px; }", "." + uid + " .slick-cell { line-height:" + e + "px; }", "." + uid + " .slick-cell { height:" + e + "px; }", "." + uid + " .slick-row { height:" + options.rowHeight + "px; }"];
            $style[0].styleSheet ? $style[0].styleSheet.cssText = t.join(" ") : $style[0].appendChild(document.createTextNode(t.join(" ")))
        }
        function getColumnCssRules(e) {
            if (!stylesheet) {
                var t = document.styleSheets;
                for (var n = 0; n < t.length; n++) if ((t[n].ownerNode || t[n].owningElement) == $style[0]) {
                    stylesheet = t[n];
                    break
                }
                if (!stylesheet) throw new Error("Cannot find stylesheet.");
                columnCssRulesL = [],
                columnCssRulesR = [];
                var r = stylesheet.cssRules || stylesheet.rules,
                i, s;
                for (var n = 0; n < r.length; n++) {
                    var o = r[n].selectorText;
                    if (i = /\.l\d+/.exec(o)) s = parseInt(i[0].substr(2, i[0].length - 2), 10),
                    columnCssRulesL[s] = r[n];
                    else if (i = /\.r\d+/.exec(o)) s = parseInt(i[0].substr(2, i[0].length - 2), 10),
                    columnCssRulesR[s] = r[n]
                }
            }
            return {
                left: columnCssRulesL[e],
                right: columnCssRulesR[e]
            }
        }
        function removeCssRules() {
            $style.remove(),
            stylesheet = null,
            $CSS_COLS && ($CSS_COLS.remove(), $CSS_COLS = null)
        }
        function destroy() {
            getEditorLock().cancelCurrentEdit(),
            trigger(self.onBeforeDestroy, {});
            var e = plugins.length;
            while (e--) unregisterPlugin(plugins[e]);
            options.enableColumnReorder && $headers.sortable && $headers.sortable("destroy"),
            unbindAncestorScrollEvents(),
            $container.unbind(".slickgrid"),
            removeCssRules(),
            $canvas.unbind("draginit dragstart dragend drag"),
            $container.empty().removeClass(uid)
        }
        function trigger(e, t, n) {
            return n = n || new Slick.EventData,
            t = t || {},
            t.grid = self,
            e.notify(t, n, self)
        }
        function getEditorLock() {
            return options.editorLock
        }
        function getEditController() {
            return editController
        }
        function getColumnIndex(e) {
            return columnsById[e]
        }
        function autosizeColumns() {
            var e, t, n = [],
            r = 0,
            i = 0,
            s,
            o = viewportHasVScroll ? viewportW - scrollbarDimensions.width: viewportW;
            for (e = 0; e < columns.length; e++) t = columns[e],
            n.push(t.width),
            i += t.width,
            t.resizable && (r += t.width - Math.max(t.minWidth, absoluteColumnMinWidth));
            s = i;
            while (i > o && r) {
                var u = (i - o) / r;
                for (e = 0; e < columns.length && i > o; e++) {
                    t = columns[e];
                    var a = n[e];
                    if (!t.resizable || a <= t.minWidth || a <= absoluteColumnMinWidth) continue;
                    var f = Math.max(t.minWidth, absoluteColumnMinWidth),
                    l = Math.floor(u * (a - f)) || 1;
                    l = Math.min(l, a - f),
                    i -= l,
                    r -= l,
                    n[e] -= l
                }
                if (s == i) break;
                s = i
            }
            s = i;
            while (i < o) {
                var c = o / i;
                for (e = 0; e < columns.length && i < o; e++) {
                    t = columns[e];
                    if (!t.resizable || t.maxWidth <= t.width) continue;
                    var h = Math.min(Math.floor(c * t.width) - t.width, t.maxWidth - t.width || 1e6) || 1;
                    i += h,
                    n[e] += h
                }
                if (s == i) break;
                s = i
            }
            var p = !1;
            for (e = 0; e < columns.length; e++) columns[e].rerenderOnResize && columns[e].width != n[e] && (p = !0),
            columns[e].width = n[e];
            applyColumnHeaderWidths(),
            updateCanvasWidth(!0),
            p && (invalidateAllRows(), render())
        }
        function applyColumnHeaderWidths() {
            if (!initialized) return;
            var e;
            for (var t = 0,
            n = $headers.children(), r = n.length; t < r; t++) e = $(n[t]),
            e.width() !== columns[t].width - headerColumnWidthDiff && e.width(columns[t].width - headerColumnWidthDiff);
            updateColumnCaches()
        }
        function applyColumnWidths() {
            $CSS_COLS && ($CSS_COLS.remove(), $CSS_COLS = null),
            $CSS_COLS = $("<style type='text/css' rel='stylesheet' />").appendTo($("head"));
            var e = new Array,
            t = 0,
            n;
            for (var r = 0; r < columns.length; r++) {
                n = columns[r].width;
                var i = t + "px",
                s = canvasWidth - t - n + "px";
                e.push("." + uid + " .l" + r + " { left:" + i + ";}"),
                e.push("." + uid + " .r" + r + " { right:" + s + ";}"),
                t += columns[r].width
            }
            $CSS_COLS[0].styleSheet ? $CSS_COLS[0].styleSheet.cssText = e.join(" ") : $CSS_COLS[0].appendChild(document.createTextNode(e.join(" ")))
        }
        function setSortColumn(e, t) {
            setSortColumns([{
                columnId: e,
                sortAsc: t
            }])
        }
        function setSortColumns(e) {
            sortColumns = e;
            var t = $headers.children();
            t.removeClass("slick-header-column-sorted").find(".slick-sort-indicator").removeClass("slick-sort-indicator-asc slick-sort-indicator-desc"),
            $.each(sortColumns,
            function(e, n) {
                n.sortAsc == null && (n.sortAsc = !0);
                var r = getColumnIndex(n.columnId);
                r != null && t.eq(r).addClass("slick-header-column-sorted").find(".slick-sort-indicator").addClass(n.sortAsc ? "slick-sort-indicator-asc": "slick-sort-indicator-desc")
            })
        }
        function getSortColumns() {
            return sortColumns
        }
        function handleSelectedRangesChanged(e, t) {
            selectedRows = [];
            var n = {};
            for (var r = 0; r < t.length; r++) for (var i = t[r].fromRow; i <= t[r].toRow; i++) {
                n[i] || (selectedRows.push(i), n[i] = {});
                for (var s = t[r].fromCell; s <= t[r].toCell; s++) canCellBeSelected(i, s) && (n[i][columns[s].id] = options.selectedCellCssClass)
            }
            setCellCssStyles(options.selectedCellCssClass, n),
            trigger(self.onSelectedRowsChanged, {
                rows: getSelectedRows()
            },
            e)
        }
        function getColumns() {
            return columns
        }
        function updateColumnCaches() {
            columnPosLeft = [],
            columnPosRight = [];
            var e = 0;
            for (var t = 0,
            n = columns.length; t < n; t++) columnPosLeft[t] = e,
            columnPosRight[t] = e + columns[t].width,
            e += columns[t].width
        }
        function setColumns(e) {
            columns = e,
            columnsById = {};
            for (var t = 0; t < columns.length; t++) {
                var n = columns[t] = $.extend({},
                columnDefaults, columns[t]);
                columnsById[n.id] = t,
                n.minWidth && n.width < n.minWidth && (n.width = n.minWidth),
                n.maxWidth && n.width > n.maxWidth && (n.width = n.maxWidth)
            }
            updateColumnCaches(),
            initialized && (invalidateAllRows(), createColumnHeaders(), removeCssRules(), createCssRules(), resizeCanvas(), applyColumnWidths(), handleScroll())
        }
        function getOptions() {
            return options
        }
        function setOptions(e) {
            if (!getEditorLock().commitCurrentEdit()) return;
            makeActiveCellNormal(),
            options.enableAddRow !== e.enableAddRow && invalidateRow(getDataLength()),
            options = $.extend(options, e),
            validateAndEnforceOptions(),
            $viewport.css("overflow-y", options.autoHeight ? "hidden": "auto"),
            render()
        }
        function validateAndEnforceOptions() {
            options.autoHeight && (options.leaveSpaceForNewRows = !1)
        }
        function setData(e, t) {
            data = e,
            invalidateAllRows(),
            updateRowCount(),
            t && scrollTo(0)
        }
        function getData() {
            return data
        }
        function getDataLength() {
            return data.getLength ? data.getLength() : data.length
        }
        function getDataItem(e) {
            return data.getItem ? data.getItem(e) : data[e]
        }
        function getTopPanel() {
            return $topPanel[0]
        }
        function setTopPanelVisibility(e) {
            options.showTopPanel != e && (options.showTopPanel = e, e ? $topPanelScroller.slideDown("fast", resizeCanvas) : $topPanelScroller.slideUp("fast", resizeCanvas))
        }
        function setHeaderRowVisibility(e) {
            options.showHeaderRow != e && (options.showHeaderRow = e, e ? $headerRowScroller.slideDown("fast", resizeCanvas) : $headerRowScroller.slideUp("fast", resizeCanvas))
        }
        function scrollTo(e) {
            e = Math.max(e, 0),
            e = Math.min(e, th - viewportH + (viewportHasHScroll ? scrollbarDimensions.height: 0));
            var t = offset;
            page = Math.min(n - 1, Math.floor(e / ph)),
            offset = Math.round(page * cj);
            var r = e - offset;
            if (offset != t) {
                var i = getVisibleRange(r);
                cleanupRows(i),
                updateRowPositions()
            }
            prevScrollTop != r && (vScrollDir = prevScrollTop + t < r + offset ? 1 : -1, $viewport[0].scrollTop = lastRenderedScrollTop = scrollTop = prevScrollTop = r, trigger(self.onViewportChanged, {}))
        }
        function defaultFormatter(e, t, n, r, i) {
            return n == null ? "": n.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }
        function getFormatter(e, t) {
            var n = data.getItemMetadata && data.getItemMetadata(e),
            r = n && n.columns && (n.columns[t.id] || n.columns[getColumnIndex(t.id)]);
            return r && r.formatter || n && n.formatter || t.formatter || options.formatterFactory && options.formatterFactory.getFormatter(t) || options.defaultFormatter
        }
        function getEditor(e, t) {
            var n = columns[t],
            r = data.getItemMetadata && data.getItemMetadata(e),
            i = r && r.columns;
            return i && i[n.id] && i[n.id].editor !== undefined ? i[n.id].editor: i && i[t] && i[t].editor !== undefined ? i[t].editor: n.editor || options.editorFactory && options.editorFactory.getEditor(n)
        }
        function getDataItemValueForColumn(e, t) {
            return options.dataItemColumnValueExtractor ? options.dataItemColumnValueExtractor(e, t) : e[t.field]
        }
        function appendRowHtml(e, t, n) {
            var r = getDataItem(t),
            i = t < getDataLength() && !r,
            s = "slick-row" + (i ? " loading": "") + (t === activeRow ? " active": "") + (t % 2 == 1 ? " odd": " even"),
            o = data.getItemMetadata && data.getItemMetadata(t);
            o && o.cssClasses && (s += " " + o.cssClasses),
            e.push("<div class='ui-widget-content " + s + "' style='top:" + (options.rowHeight * t - offset) + "px'>");
            var u, a;
            for (var f = 0,
            l = columns.length; f < l; f++) {
                a = columns[f],
                u = 1;
                if (o && o.columns) {
                    var c = o.columns[a.id] || o.columns[f];
                    u = c && c.colspan || 1,
                    u === "*" && (u = l - f)
                }
//                var postRight = columnPosRight[Math.min(l - 1, f + u - 1)] ;
//                var leftPx = n.leftPx;
//                alert("postRight:" + postRight);
//                alert("leftPx:" + leftPx);
                if (columnPosRight[Math.min(l - 1, f + u - 1)] > n.leftPx) {
//                	var posList = columnPosLeft[f];
//                	var rightPx = n.rightPx;
//                	alert("posList:" + posList);
//                    alert("rightPx:" + rightPx);
//                    if (columnPosLeft[f] > n.rightPx) break;//node by chenwz 未经验证
                    if (columnPosLeft[f] > n.rightPx) ;
                    appendCellHtml(e, t, f, u)
                }
                u > 1 && (f += u - 1)
            }
            e.push("</div>")
        }
        function appendCellHtml(e, t, n, r) {
            var i = columns[n],
            
            s = getDataItem(t),
            o = "slick-cell l" + n + " r" + Math.min(columns.length - 1, n + r - 1) + (i.cssClass ? " " + i.cssClass: "");
            t === activeRow && n === activeCell && (o += " active");
            for (var u in cellCssClasses) cellCssClasses[u][t] && cellCssClasses[u][t][i.id] && (o += " " + cellCssClasses[u][t][i.id]);
            e.push("<div class='" + o + "'>");
            if (s) {
                var a = getDataItemValueForColumn(s, i);
                e.push(getFormatter(t, i)(t, n, a, i, s))
            }
            e.push("</div>"),
            rowsCache[t].cellRenderQueue.push(n),
            rowsCache[t].cellColSpans[n] = r
        }
        function cleanupRows(e) {
            for (var t in rowsCache)(t = parseInt(t, 10)) !== activeRow && (t < e.top || t > e.bottom) && removeRowFromCache(t)
        }
        function invalidate() {
            updateRowCount(),
            invalidateAllRows(),
            render()
        }
        function invalidateAllRows() {
            currentEditor && makeActiveCellNormal();
            for (var e in rowsCache) removeRowFromCache(e)
        }
        function removeRowFromCache(e) {
            var t = rowsCache[e];
            if (!t) return;
            $canvas[0].removeChild(t.rowNode),
            delete rowsCache[e],
            delete postProcessedRows[e],
            renderedRows--,
            counter_rows_removed++
        }
        function invalidateRows(e) {
            var t, n;
            if (!e || !e.length) return;
            vScrollDir = 0;
            for (t = 0, n = e.length; t < n; t++) currentEditor && activeRow === e[t] && makeActiveCellNormal(),
            rowsCache[e[t]] && removeRowFromCache(e[t])
        }
        function invalidateRow(e) {
            invalidateRows([e])
        }
        function updateCell(e, t) {
            var n = getCellNode(e, t);
            if (!n) return;
            var r = columns[t],
            i = getDataItem(e);
            currentEditor && activeRow === e && activeCell === t ? currentEditor.loadValue(i) : (n.innerHTML = i ? getFormatter(e, r)(e, t, getDataItemValueForColumn(i, r), r, i) : "", invalidatePostProcessingResults(e))
        }
        function updateRow(e) {
            var t = rowsCache[e];
            if (!t) return;
            ensureCellNodesInRowsCache(e);
            for (var n in t.cellNodesByColumnIdx) {
                if (!t.cellNodesByColumnIdx.hasOwnProperty(n)) continue;
                n |= 0;
                var r = columns[n],
                i = getDataItem(e),
                s = t.cellNodesByColumnIdx[n];
                e === activeRow && n === activeCell && currentEditor ? currentEditor.loadValue(i) : i ? s.innerHTML = getFormatter(e, r)(e, n, getDataItemValueForColumn(i, r), r, i) : s.innerHTML = ""
            }
            invalidatePostProcessingResults(e)
        }
        function getViewportHeight() {
            return parseFloat($.css($container[0], "height", !0)) - parseFloat($.css($container[0], "paddingTop", !0)) - parseFloat($.css($container[0], "paddingBottom", !0)) - parseFloat($.css($headerScroller[0], "height")) - getVBoxDelta($headerScroller) - (options.showTopPanel ? options.topPanelHeight + getVBoxDelta($topPanelScroller) : 0) - (options.showHeaderRow ? options.headerRowHeight + getVBoxDelta($headerRowScroller) : 0)
        }
        function resizeCanvas() {
            if (!initialized) return;
            options.autoHeight ? viewportH = options.rowHeight * (getDataLength() + (options.enableAddRow ? 1 : 0)) : viewportH = getViewportHeight(),
            numVisibleRows = Math.ceil(viewportH / options.rowHeight),
            viewportW = parseFloat($.css($container[0], "width", !0)),
            options.autoHeight || $viewport.height(viewportH),
            options.forceFitColumns && autosizeColumns(),
            updateRowCount(),
            handleScroll(),
            render()
        }
        function updateRowCount() {
            if (!initialized) return;
            numberOfRows = getDataLength() + (options.enableAddRow ? 1 : 0) + (options.leaveSpaceForNewRows ? numVisibleRows - 1 : 0);
            var e = viewportHasVScroll;
            viewportHasVScroll = !options.autoHeight && numberOfRows * options.rowHeight > viewportH;
            var t = options.enableAddRow ? getDataLength() : getDataLength() - 1;
            for (var r in rowsCache) r >= t && removeRowFromCache(r);
            activeCellNode && activeRow > t && resetActiveCell();
            var i = h;
            th = Math.max(options.rowHeight * numberOfRows, viewportH - scrollbarDimensions.height),
            th < maxSupportedCssHeight ? (h = ph = th, n = 1, cj = 0) : (h = maxSupportedCssHeight, ph = h / 100, n = Math.floor(th / ph), cj = (th - h) / (n - 1)),
            h !== i && ($canvas.css("height", h), scrollTop = $viewport[0].scrollTop);
            var s = scrollTop + offset <= th - viewportH;
            th == 0 || scrollTop == 0 ? page = offset = 0 : s ? scrollTo(scrollTop + offset) : scrollTo(th - viewportH),
            h != i && options.autoHeight && resizeCanvas(),
            options.forceFitColumns && e != viewportHasVScroll && autosizeColumns(),
            updateCanvasWidth(!1)
        }
        function getVisibleRange(e, t) {
            return e == null && (e = scrollTop),
            t == null && (t = scrollLeft),
            {
                top: Math.floor((e + offset) / options.rowHeight),
                bottom: Math.ceil((e + offset + viewportH) / options.rowHeight),
                leftPx: t,
                rightPx: t + viewportW
            }
        }
        function getRenderedRange(e, t) {
            var n = getVisibleRange(e, t),
            r = Math.round(viewportH / options.rowHeight),
            i = 3;
            return vScrollDir == -1 ? (n.top -= r, n.bottom += i) : vScrollDir == 1 ? (n.top -= i, n.bottom += r) : (n.top -= i, n.bottom += i),
            n.top = Math.max(0, n.top),
            n.bottom = Math.min(options.enableAddRow ? getDataLength() : getDataLength() - 1, n.bottom),
            n.leftPx -= viewportW,
            n.rightPx += viewportW,
            n.leftPx = Math.max(0, n.leftPx),
            n.rightPx = Math.min(canvasWidth, n.rightPx),
            n
        }
        function ensureCellNodesInRowsCache(e) {
            var t = rowsCache[e];
            if (t && t.cellRenderQueue.length) {
                var n = t.rowNode.lastChild;
                while (t.cellRenderQueue.length) {
                    var r = t.cellRenderQueue.pop();
                    t.cellNodesByColumnIdx[r] = n,
                    n = n.previousSibling
                }
            }
        }
        function cleanUpCells(e, t) {
            var n = 0,
            r = rowsCache[t],
            i = [];
            for (var s in r.cellNodesByColumnIdx) {
                if (!r.cellNodesByColumnIdx.hasOwnProperty(s)) continue;
                s |= 0;
                var o = r.cellColSpans[s]; (columnPosLeft[s] > e.rightPx || columnPosRight[Math.min(columns.length - 1, s + o - 1)] < e.leftPx) && (t != activeRow || s != activeCell) && i.push(s)
            }
            var u;
            while ((u = i.pop()) != null) r.rowNode.removeChild(r.cellNodesByColumnIdx[u]),
            delete r.cellColSpans[u],
            delete r.cellNodesByColumnIdx[u],
            postProcessedRows[t] && delete postProcessedRows[t][u],
            n++
        }
        function cleanUpAndRenderCells(e) {
            var t, n = [],
            r = [],
            i,
            s = 0,
            o;
            for (var u = e.top; u <= e.bottom; u++) {
                t = rowsCache[u];
                if (!t) continue;
                ensureCellNodesInRowsCache(u),
                cleanUpCells(e, u),
                i = 0;
                var a = data.getItemMetadata && data.getItemMetadata(u);
                a = a && a.columns;
                for (var f = 0,
                l = columns.length; f < l; f++) {
                	
                    if (columnPosLeft[f] > e.rightPx) break;
                    if ((o = t.cellColSpans[f]) != null) {
                        f += o > 1 ? o - 1 : 0;
                        continue
                        
                    }
                    
                    o = 1;
                    if (a) {
                        var c = a[columns[f].id] || a[f];
                        o = c && c.colspan || 1,
                        o === "*" && (o = l - f)
                    }
                    columnPosRight[Math.min(l - 1, f + o - 1)] > e.leftPx && (appendCellHtml(n, u, f, o), i++),
                    f += o > 1 ? o - 1 : 0
                }
                i && (s += i, r.push(u))
            }
            if (!n.length) return;
            var h = document.createElement("div");
            h.innerHTML = n.join("");
            var p, d;
            while ((p = r.pop()) != null) {
                t = rowsCache[p];
                var v;
                while ((v = t.cellRenderQueue.pop()) != null) d = h.lastChild,
                t.rowNode.appendChild(d),
                t.cellNodesByColumnIdx[v] = d
            }
        }
        function renderRows(e) {
            var t = $canvas[0],
            n = [],
            r = [],
            i = !1;
            
            for (var s = e.top; s <= e.bottom; s++) {
            	
                if (rowsCache[s]) continue;
                renderedRows++,
                r.push(s),
                rowsCache[s] = {
                    rowNode: null,
                    cellColSpans: [],
                    cellNodesByColumnIdx: [],
                    cellRenderQueue: []
                },
                appendRowHtml(n, s, e),
                activeCellNode && activeRow === s && (i = !0),
                counter_rows_rendered++
            }
            if (!r.length) return;
            var o = document.createElement("div");
            o.innerHTML = n.join("");
            for (var s = 0,
            u = r.length; s < u; s++) rowsCache[r[s]].rowNode = t.appendChild(o.firstChild);
            i && (activeCellNode = getCellNode(activeRow, activeCell))
        }
        function startPostProcessing() {
            if (!options.enableAsyncPostRender) return;
            clearTimeout(h_postrender),
            h_postrender = setTimeout(asyncPostProcessRows, options.asyncPostRenderDelay)
        }
        function invalidatePostProcessingResults(e) {
            delete postProcessedRows[e],
            postProcessFromRow = Math.min(postProcessFromRow, e),
            postProcessToRow = Math.max(postProcessToRow, e),
            startPostProcessing()
        }
        function updateRowPositions() {
            for (var e in rowsCache) rowsCache[e].rowNode.style.top = e * options.rowHeight - offset + "px"
        }
        function render() {
            if (!initialized) return;
            var e = getVisibleRange(),
            t = getRenderedRange();
            cleanupRows(t),
            lastRenderedScrollLeft != scrollLeft && cleanUpAndRenderCells(t),
            renderRows(t),
            postProcessFromRow = e.top,
            postProcessToRow = Math.min(options.enableAddRow ? getDataLength() : getDataLength() - 1, e.bottom),
            startPostProcessing(),
            lastRenderedScrollTop = scrollTop,
            lastRenderedScrollLeft = scrollLeft,
            h_render = null
        }
        function handleHeaderRowScroll() {
            var e = $headerRowScroller[0].scrollLeft;
            e != $viewport[0].scrollLeft && ($viewport[0].scrollLeft = e)
        }
        function handleScroll() {
            scrollTop = $viewport[0].scrollTop,
            scrollLeft = $viewport[0].scrollLeft;
            var e = Math.abs(scrollTop - prevScrollTop),
            t = Math.abs(scrollLeft - prevScrollLeft);
            t && (prevScrollLeft = scrollLeft, $headerScroller[0].scrollLeft = scrollLeft, $topPanelScroller[0].scrollLeft = scrollLeft, $headerRowScroller[0].scrollLeft = scrollLeft);
            if (e) {
                vScrollDir = prevScrollTop < scrollTop ? 1 : -1,
                prevScrollTop = scrollTop;
                if (e < viewportH) scrollTo(scrollTop + offset);
                else {
                    var r = offset;
                    h == viewportH ? page = 0 : page = Math.min(n - 1, Math.floor(scrollTop * ((th - viewportH) / (h - viewportH)) * (1 / ph))),
                    offset = Math.round(page * cj),
                    r != offset && invalidateAllRows()
                }
            }
            if (t || e) {
                h_render && clearTimeout(h_render);
                if (Math.abs(lastRenderedScrollTop - scrollTop) > 20 || Math.abs(lastRenderedScrollLeft - scrollLeft) > 20) options.forceSyncScrolling || Math.abs(lastRenderedScrollTop - scrollTop) < viewportH && Math.abs(lastRenderedScrollLeft - scrollLeft) < viewportW ? render() : h_render = setTimeout(render, 50),
                trigger(self.onViewportChanged, {})
            }
            trigger(self.onScroll, {
                scrollLeft: scrollLeft,
                scrollTop: scrollTop
            })
        }
        function asyncPostProcessRows() {
            while (postProcessFromRow <= postProcessToRow) {
                var e = vScrollDir >= 0 ? postProcessFromRow++:postProcessToRow--,
                t = rowsCache[e];
                if (!t || e >= getDataLength()) continue;
                postProcessedRows[e] || (postProcessedRows[e] = {}),
                ensureCellNodesInRowsCache(e);
                for (var n in t.cellNodesByColumnIdx) {
                    if (!t.cellNodesByColumnIdx.hasOwnProperty(n)) continue;
                    n |= 0;
                    var r = columns[n];
                    if (r.asyncPostRender && !postProcessedRows[e][n]) {
                        var i = t.cellNodesByColumnIdx[n];
                        i && r.asyncPostRender(i, postProcessFromRow, getDataItem(e), r),
                        postProcessedRows[e][n] = !0
                    }
                }
                h_postrender = setTimeout(asyncPostProcessRows, options.asyncPostRenderDelay);
                return
            }
        }
        function updateCellCssStylesOnRenderedRows(e, t) {
            var n, r, i, s;
            for (var o in rowsCache) {
                s = t && t[o],
                i = e && e[o];
                if (s) for (r in s) if (!i || s[r] != i[r]) n = getCellNode(o, getColumnIndex(r)),
                n && $(n).removeClass(s[r]);
                if (i) for (r in i) if (!s || s[r] != i[r]) n = getCellNode(o, getColumnIndex(r)),
                n && $(n).addClass(i[r])
            }
        }
        function addCellCssStyles(e, t) {
            if (cellCssClasses[e]) throw "addCellCssStyles: cell CSS hash with key '" + e + "' already exists.";
            cellCssClasses[e] = t,
            updateCellCssStylesOnRenderedRows(t, null),
            trigger(self.onCellCssStylesChanged, {
                key: e,
                hash: t
            })
        }
        function removeCellCssStyles(e) {
            if (!cellCssClasses[e]) return;
            updateCellCssStylesOnRenderedRows(null, cellCssClasses[e]),
            delete cellCssClasses[e],
            trigger(self.onCellCssStylesChanged, {
                key: e,
                hash: null
            })
        }
        function setCellCssStyles(e, t) {
            var n = cellCssClasses[e];
            cellCssClasses[e] = t,
            updateCellCssStylesOnRenderedRows(t, n),
            trigger(self.onCellCssStylesChanged, {
                key: e,
                hash: t
            })
        }
        function getCellCssStyles(e) {
            return cellCssClasses[e]
        }
        function flashCell(e, t, n) {
            n = n || 100;
            if (rowsCache[e]) {
                var r = $(getCellNode(e, t));
                function i(e) {
                    if (!e) return;
                    setTimeout(function() {
                        r.queue(function() {
                            r.toggleClass(options.cellFlashingCssClass).dequeue(),
                            i(e - 1)
                        })
                    },
                    n)
                }
                i(4)
            }
        }
        function handleDragInit(e, t) {
            var n = getCellFromEvent(e);
            return ! n || !cellExists(n.row, n.cell) ? !1 : (retval = trigger(self.onDragInit, t, e), e.isImmediatePropagationStopped() ? retval: !1)
        }
        function handleDragStart(e, t) {
            var n = getCellFromEvent(e);
            if (!n || !cellExists(n.row, n.cell)) return ! 1;
            var r = trigger(self.onDragStart, t, e);
            return e.isImmediatePropagationStopped() ? r: !1
        }
        function handleDrag(e, t) {
            return trigger(self.onDrag, t, e)
        }
        function handleDragEnd(e, t) {
            trigger(self.onDragEnd, t, e)
        }
        function handleKeyDown(e) {
            trigger(self.onKeyDown, {
                row: activeRow,
                cell: activeCell
            },
            e);
            var t = e.isImmediatePropagationStopped();
            if (!t) if (!e.shiftKey && !e.altKey && !e.ctrlKey) if (e.which == 27) {
                if (!getEditorLock().isActive()) return;
                cancelEditAndSetFocus()
            } else e.which == 37 ? t = navigateLeft() : e.which == 39 ? t = navigateRight() : e.which == 38 ? t = navigateUp() : e.which == 40 ? t = navigateDown() : e.which == 9 ? t = navigateNext() : e.which == 13 && (options.editable && (currentEditor ? activeRow === getDataLength() ? navigateDown() : commitEditAndSetFocus() : getEditorLock().commitCurrentEdit() && makeActiveCellEditable()), t = !0);
            else e.which == 9 && e.shiftKey && !e.ctrlKey && !e.altKey && (t = navigatePrev());
            if (t) {
                e.stopPropagation(),
                e.preventDefault();
                try {
                    e.originalEvent.keyCode = 0
                } catch(n) {}
            }
        }
        function handleClick(e) {
            currentEditor || e.target != document.activeElement && setFocus();
            var t = getCellFromEvent(e);
            if (!t || currentEditor !== null && activeRow == t.row && activeCell == t.cell) return;
            trigger(self.onClick, {
                row: t.row,
                cell: t.cell
            },
            e);
            if (e.isImmediatePropagationStopped()) return; (activeCell != t.cell || activeRow != t.row) && canCellBeActive(t.row, t.cell) && (!getEditorLock().isActive() || getEditorLock().commitCurrentEdit()) && (scrollRowIntoView(t.row, !1), setActiveCellInternal(getCellNode(t.row, t.cell), t.row === getDataLength() || options.autoEdit))
        }
        function handleContextMenu(e) {
            var t = $(e.target).closest(".slick-cell", $canvas);
            if (t.length === 0) return;
            if (activeCellNode === t[0] && currentEditor !== null) return;
            trigger(self.onContextMenu, {},
            e)
        }
        function handleDblClick(e) {
            var t = getCellFromEvent(e);
            if (!t || currentEditor !== null && activeRow == t.row && activeCell == t.cell) return;
            trigger(self.onDblClick, {
                row: t.row,
                cell: t.cell
            },
            e);
            if (e.isImmediatePropagationStopped()) return;
            options.editable && gotoCell(t.row, t.cell, !0)
        }
        function handleHeaderMouseEnter(e) {
            trigger(self.onHeaderMouseEnter, {
                column: $(this).data("column")
            },
            e)
        }
        function handleHeaderMouseLeave(e) {
            trigger(self.onHeaderMouseLeave, {
                column: $(this).data("column")
            },
            e)
        }
        function handleHeaderContextMenu(e) {
            var t = $(e.target).closest(".slick-header-column", ".slick-header-columns"),
            n = t && t.data("column");
            trigger(self.onHeaderContextMenu, {
                column: n
            },
            e)
        }
        function handleHeaderClick(e) {
            var t = $(e.target).closest(".slick-header-column", ".slick-header-columns"),
            n = t && t.data("column");
            n && trigger(self.onHeaderClick, {
                column: n
            },
            e)
        }
        function handleMouseEnter(e) {
            trigger(self.onMouseEnter, {},
            e)
        }
        function handleMouseLeave(e) {
            trigger(self.onMouseLeave, {},
            e)
        }
        function cellExists(e, t) {
            return ! (e < 0 || e >= getDataLength() || t < 0 || t >= columns.length)
        }
        function getCellFromPoint(e, t) {
            var n = Math.floor((t + offset) / options.rowHeight),
            r = 0,
            i = 0;
            for (var s = 0; s < columns.length && i < e; s++) i += columns[s].width,
            r++;
            return r < 0 && (r = 0),
            {
                row: n,
                cell: r - 1
            }
        }
        function getCellFromNode(e) {
            var t = /l\d+/.exec(e.className);
            if (!t) throw "getCellFromNode: cannot get cell - " + e.className;
            return parseInt(t[0].substr(1, t[0].length - 1), 10)
        }
        function getRowFromNode(e) {
            for (var t in rowsCache) if (rowsCache[t].rowNode === e) return t | 0;
            return null
        }
        function getCellFromEvent(e) {
            var t = $(e.target).closest(".slick-cell", $canvas);
            if (!t.length) return null;
            var n = getRowFromNode(t[0].parentNode),
            r = getCellFromNode(t[0]);
            return n == null || r == null ? null: {
                row: n,
                cell: r
            }
        }
        function getCellNodeBox(e, t) {
            if (!cellExists(e, t)) return null;
            var n = e * options.rowHeight - offset,
            r = n + options.rowHeight - 1,
            i = 0;
            for (var s = 0; s < t; s++) i += columns[s].width;
            var o = i + columns[t].width;
            return {
                top: n,
                left: i,
                bottom: r,
                right: o
            }
        }
        function resetActiveCell() {
            setActiveCellInternal(null, !1)
        }
        function setFocus() {
            tabbingDirection == -1 ? $focusSink[0].focus() : $focusSink2[0].focus()
        }
        function scrollCellIntoView(e, t) {
            var n = getColspan(e, t),
            r = columnPosLeft[t],
            i = columnPosRight[t + (n > 1 ? n - 1 : 0)],
            s = scrollLeft + viewportW;
            r < scrollLeft ? ($viewport.scrollLeft(r), handleScroll(), render()) : i > s && ($viewport.scrollLeft(Math.min(r, i - $viewport[0].clientWidth)), handleScroll(), render())
        }
        function setActiveCellInternal(e, t) {
            activeCellNode !== null && (makeActiveCellNormal(), $(activeCellNode).removeClass("active"), rowsCache[activeRow] && $(rowsCache[activeRow].rowNode).removeClass("active"));
            var n = activeCellNode !== e;
            activeCellNode = e,
            activeCellNode != null ? (activeRow = getRowFromNode(activeCellNode.parentNode), activeCell = activePosX = getCellFromNode(activeCellNode), $(activeCellNode).addClass("active"), $(rowsCache[activeRow].rowNode).addClass("active"), options.editable && t && isCellPotentiallyEditable(activeRow, activeCell) && (clearTimeout(h_editorLoader), options.asyncEditorLoading ? h_editorLoader = setTimeout(function() {
                makeActiveCellEditable()
            },
            options.asyncEditorLoadDelay) : makeActiveCellEditable())) : activeRow = activeCell = null,
            n && trigger(self.onActiveCellChanged, getActiveCell())
        }
        function clearTextSelection() {
            try {
                if (document.selection && document.selection.empty) document.selection.empty();
                else if (window.getSelection) {
                    var e = window.getSelection();
                    e && e.removeAllRanges && e.removeAllRanges()
                }
            } catch(t) {}
        }
        function isCellPotentiallyEditable(e, t) {
            return e < getDataLength() && !getDataItem(e) ? !1 : columns[t].cannotTriggerInsert && e >= getDataLength() ? !1 : getEditor(e, t) ? !0 : !1
        }
        function makeActiveCellNormal() {
            if (!currentEditor) return;
            trigger(self.onBeforeCellEditorDestroy, {
                editor: currentEditor
            }),
            currentEditor.destroy(),
            currentEditor = null;
            if (activeCellNode) {
                var e = getDataItem(activeRow);
                $(activeCellNode).removeClass("editable invalid");
                if (e) {
                    var t = columns[activeCell],
                    n = getFormatter(activeRow, t);
                    activeCellNode.innerHTML = n(activeRow, activeCell, getDataItemValueForColumn(e, t), t, getDataItem(activeRow)),
                    invalidatePostProcessingResults(activeRow)
                }
            }
            $.browser.msie && clearTextSelection(),
            getEditorLock().deactivate(editController)
        }
        function makeActiveCellEditable(e) {
            if (!activeCellNode) return;
            if (!options.editable) throw "Grid : makeActiveCellEditable : should never get called when options.editable is false";
            clearTimeout(h_editorLoader);
            if (!isCellPotentiallyEditable(activeRow, activeCell)) return;
            var t = columns[activeCell],
            n = getDataItem(activeRow);
            if (trigger(self.onBeforeEditCell, {
                row: activeRow,
                cell: activeCell,
                item: n,
                column: t
            }) === !1) {
                setFocus();
                return
            }
            getEditorLock().activate(editController),
            $(activeCellNode).addClass("editable"),
            e || (activeCellNode.innerHTML = ""),
            currentEditor = new(e || getEditor(activeRow, activeCell))({
                grid: self,
                gridPosition: absBox($container[0]),
                position: absBox(activeCellNode),
                container: activeCellNode,
                column: t,
                item: n || {},
                commitChanges: commitEditAndSetFocus,
                cancelChanges: cancelEditAndSetFocus
            }),
            n && currentEditor.loadValue(n),
            serializedEditorValue = currentEditor.serializeValue(),
            currentEditor.position && handleActiveCellPositionChange()
        }
        function commitEditAndSetFocus() {
            getEditorLock().commitCurrentEdit() && (setFocus(), options.autoEdit && navigateDown())
        }
        function cancelEditAndSetFocus() {
            getEditorLock().cancelCurrentEdit() && setFocus()
        }
        function absBox(e) {
            var t = {
                top: e.offsetTop,
                left: e.offsetLeft,
                bottom: 0,
                right: 0,
                width: $(e).outerWidth(),
                height: $(e).outerHeight(),
                visible: !0
            };
            t.bottom = t.top + t.height,
            t.right = t.left + t.width;
            var n = e.offsetParent;
            while ((e = e.parentNode) != document.body) t.visible && e.scrollHeight != e.offsetHeight && $(e).css("overflowY") != "visible" && (t.visible = t.bottom > e.scrollTop && t.top < e.scrollTop + e.clientHeight),
            t.visible && e.scrollWidth != e.offsetWidth && $(e).css("overflowX") != "visible" && (t.visible = t.right > e.scrollLeft && t.left < e.scrollLeft + e.clientWidth),
            t.left -= e.scrollLeft,
            t.top -= e.scrollTop,
            e === n && (t.left += e.offsetLeft, t.top += e.offsetTop, n = e.offsetParent),
            t.bottom = t.top + t.height,
            t.right = t.left + t.width;
            return t
        }
        function getActiveCellPosition() {
            return absBox(activeCellNode)
        }
        function getGridPosition() {
            return absBox($container[0])
        }
        function handleActiveCellPositionChange() {
            if (!activeCellNode) return;
            trigger(self.onActiveCellPositionChanged, {});
            if (currentEditor) {
                var e = getActiveCellPosition();
                currentEditor.show && currentEditor.hide && (e.visible ? currentEditor.show() : currentEditor.hide()),
                currentEditor.position && currentEditor.position(e)
            }
        }
        function getCellEditor() {
            return currentEditor
        }
        function getActiveCell() {
            return activeCellNode ? {
                row: activeRow,
                cell: activeCell
            }: null
        }
        function getActiveCellNode() {
            return activeCellNode
        }
        function scrollRowIntoView(e, t) {
            var n = e * options.rowHeight,
            r = (e + 1) * options.rowHeight - viewportH + (viewportHasHScroll ? scrollbarDimensions.height: 0); (e + 1) * options.rowHeight > scrollTop + viewportH + offset ? (scrollTo(t ? n: r), render()) : e * options.rowHeight < scrollTop + offset && (scrollTo(t ? r: n), render())
        }
        function scrollRowToTop(e) {
            scrollTo(e * options.rowHeight),
            render()
        }
        function getColspan(e, t) {
            var n = data.getItemMetadata && data.getItemMetadata(e);
            if (!n || !n.columns) return 1;
            var r = n.columns[columns[t].id] || n.columns[t],
            i = r && r.colspan;
            return i === "*" ? i = columns.length - t: i = i || 1,
            i
        }
        function findFirstFocusableCell(e) {
            var t = 0;
            while (t < columns.length) {
                if (canCellBeActive(e, t)) return t;
                t += getColspan(e, t)
            }
            return null
        }
        function findLastFocusableCell(e) {
            var t = 0,
            n = null;
            while (t < columns.length) canCellBeActive(e, t) && (n = t),
            t += getColspan(e, t);
            return n
        }
        function gotoRight(e, t, n) {
            if (t >= columns.length) return null;
            do t += getColspan(e, t);
            while (t < columns.length && !canCellBeActive(e, t));
            return t < columns.length ? {
                row: e,
                cell: t,
                posX: t
            }: null
        }
        function gotoLeft(e, t, n) {
            if (t <= 0) return null;
            var r = findFirstFocusableCell(e);
            if (r === null || r >= t) return null;
            var i = {
                row: e,
                cell: r,
                posX: r
            },
            s;
            for (;;) {
                s = gotoRight(i.row, i.cell, i.posX);
                if (!s) return null;
                if (s.cell >= t) return i;
                i = s
            }
        }
        function gotoDown(e, t, n) {
            var r;
            for (;;) {
                if (++e >= getDataLength() + (options.enableAddRow ? 1 : 0)) return null;
                r = t = 0;
                while (t <= n) r = t,
                t += getColspan(e, t);
                if (canCellBeActive(e, r)) return {
                    row: e,
                    cell: r,
                    posX: n
                }
            }
        }
        function gotoUp(e, t, n) {
            var r;
            for (;;) {
                if (--e < 0) return null;
                r = t = 0;
                while (t <= n) r = t,
                t += getColspan(e, t);
                if (canCellBeActive(e, r)) return {
                    row: e,
                    cell: r,
                    posX: n
                }
            }
        }
        function gotoNext(e, t, n) {
            if (e == null && t == null) {
                e = t = n = 0;
                if (canCellBeActive(e, t)) return {
                    row: e,
                    cell: t,
                    posX: t
                }
            }
            var r = gotoRight(e, t, n);
            if (r) return r;
            var i = null;
            while (++e < getDataLength() + (options.enableAddRow ? 1 : 0)) {
                i = findFirstFocusableCell(e);
                if (i !== null) return {
                    row: e,
                    cell: i,
                    posX: i
                }
            }
            return null
        }
        function gotoPrev(e, t, n) {
            if (e == null && t == null) {
                e = getDataLength() + (options.enableAddRow ? 1 : 0) - 1,
                t = n = columns.length - 1;
                if (canCellBeActive(e, t)) return {
                    row: e,
                    cell: t,
                    posX: t
                }
            }
            var r, i;
            while (!r) {
                r = gotoLeft(e, t, n);
                if (r) break;
                if (--e < 0) return null;
                t = 0,
                i = findLastFocusableCell(e),
                i !== null && (r = {
                    row: e,
                    cell: i,
                    posX: i
                })
            }
            return r
        }
        function navigateRight() {
            return navigate("right")
        }
        function navigateLeft() {
            return navigate("left")
        }
        function navigateDown() {
            return navigate("down")
        }
        function navigateUp() {
            return navigate("up")
        }
        function navigateNext() {
            return navigate("next")
        }
        function navigatePrev() {
            return navigate("prev")
        }
        function navigate(e) {
            if (!options.enableCellNavigation) return ! 1;
            if (!activeCellNode && e != "prev" && e != "next") return ! 1;
            if (!getEditorLock().commitCurrentEdit()) return ! 0;
            setFocus();
            var t = {
                up: -1,
                down: 1,
                left: -1,
                right: 1,
                prev: -1,
                next: 1
            };
            tabbingDirection = t[e];
            var n = {
                up: gotoUp,
                down: gotoDown,
                left: gotoLeft,
                right: gotoRight,
                prev: gotoPrev,
                next: gotoNext
            },
            r = n[e],
            i = r(activeRow, activeCell, activePosX);
            if (i) {
                var s = i.row == getDataLength();
                return scrollRowIntoView(i.row, !s),
                scrollCellIntoView(i.row, i.cell),
                setActiveCellInternal(getCellNode(i.row, i.cell), s || options.autoEdit),
                activePosX = i.posX,
                !0
            }
            return setActiveCellInternal(getCellNode(activeRow, activeCell), activeRow == getDataLength() || options.autoEdit),
            !1
        }
        function getCellNode(e, t) {
            return rowsCache[e] ? (ensureCellNodesInRowsCache(e), rowsCache[e].cellNodesByColumnIdx[t]) : null
        }
        function setActiveCell(e, t) {
            if (!initialized) return;
            if (e > getDataLength() || e < 0 || t >= columns.length || t < 0) return;
            if (!options.enableCellNavigation) return;
            scrollRowIntoView(e, !1),
            scrollCellIntoView(e, t),
            setActiveCellInternal(getCellNode(e, t), !1)
        }
        function canCellBeActive(e, t) {
            if (!options.enableCellNavigation || e >= getDataLength() + (options.enableAddRow ? 1 : 0) || e < 0 || t >= columns.length || t < 0) return ! 1;
            var n = data.getItemMetadata && data.getItemMetadata(e);
            if (n && typeof n.focusable == "boolean") return n.focusable;
            var r = n && n.columns;
            return r && r[columns[t].id] && typeof r[columns[t].id].focusable == "boolean" ? r[columns[t].id].focusable: r && r[t] && typeof r[t].focusable == "boolean" ? r[t].focusable: typeof columns[t].focusable == "boolean" ? columns[t].focusable: !0
        }
        function canCellBeSelected(e, t) {
            if (e >= getDataLength() || e < 0 || t >= columns.length || t < 0) return ! 1;
            var n = data.getItemMetadata && data.getItemMetadata(e);
            if (n && typeof n.selectable == "boolean") return n.selectable;
            var r = n && n.columns && (n.columns[columns[t].id] || n.columns[t]);
            return r && typeof r.selectable == "boolean" ? r.selectable: typeof columns[t].selectable == "boolean" ? columns[t].selectable: !0
        }
        function gotoCell(e, t, n) {
            if (!initialized) return;
            if (!canCellBeActive(e, t)) return;
            if (!getEditorLock().commitCurrentEdit()) return;
            scrollRowIntoView(e, !1),
            scrollCellIntoView(e, t);
            var r = getCellNode(e, t);
            setActiveCellInternal(r, n || e === getDataLength() || options.autoEdit),
            currentEditor || setFocus()
        }
        function commitCurrentEdit() {
            var e = getDataItem(activeRow),
            t = columns[activeCell];
            if (currentEditor) {
                if (currentEditor.isValueChanged()) {
                    var n = currentEditor.validate();
                    if (n.valid) {
                        if (activeRow < getDataLength()) {
                            var r = {
                                row: activeRow,
                                cell: activeCell,
                                editor: currentEditor,
                                serializedValue: currentEditor.serializeValue(),
                                prevSerializedValue: serializedEditorValue,
                                execute: function() {
                                    this.editor.applyValue(e, this.serializedValue),
                                    updateRow(this.row)
                                },
                                undo: function() {
                                    this.editor.applyValue(e, this.prevSerializedValue),
                                    updateRow(this.row)
                                }
                            };
                            options.editCommandHandler ? (makeActiveCellNormal(), options.editCommandHandler(e, t, r)) : (r.execute(), makeActiveCellNormal()),
                            trigger(self.onCellChange, {
                                row: activeRow,
                                cell: activeCell,
                                item: e
                            })
                        } else {
                            var i = {};
                            currentEditor.applyValue(i, currentEditor.serializeValue()),
                            makeActiveCellNormal(),
                            trigger(self.onAddNewRow, {
                                item: i,
                                column: t
                            })
                        }
                        return ! getEditorLock().isActive()
                    }
                    return $(activeCellNode).addClass("invalid"),
                    $(activeCellNode).stop(!0, !0).effect("highlight", {
                        color: "red"
                    },
                    300),
                    trigger(self.onValidationError, {
                        editor: currentEditor,
                        cellNode: activeCellNode,
                        validationResults: n,
                        row: activeRow,
                        cell: activeCell,
                        column: t
                    }),
                    currentEditor.focus(),
                    !1
                }
                makeActiveCellNormal()
            }
            return ! 0
        }
        function cancelCurrentEdit() {
            return makeActiveCellNormal(),
            !0
        }
        function rowsToRanges(e) {
            var t = [],
            n = columns.length - 1;
            for (var r = 0; r < e.length; r++) t.push(new Slick.Range(e[r], 0, e[r], n));
            return t
        }
        function getSelectedRows() {
            if (!selectionModel) throw "Selection model is not set";
            return selectedRows
        }
        function setSelectedRows(e) {
            if (!selectionModel) throw "Selection model is not set";
            selectionModel.setSelectedRanges(rowsToRanges(e))
        }
        var defaults = {
            explicitInitialization: !1,
            rowHeight: 25,
            defaultColumnWidth: 80,
            enableAddRow: !1,
            leaveSpaceForNewRows: !1,
            editable: !1,
            autoEdit: !0,
            enableCellNavigation: !0,
            enableColumnReorder: !0,
            asyncEditorLoading: !1,
            asyncEditorLoadDelay: 100,
            forceFitColumns: !1,
            enableAsyncPostRender: !1,
            asyncPostRenderDelay: 50,
            autoHeight: !1,
            editorLock: Slick.GlobalEditorLock,
            showHeaderRow: !1,
            headerRowHeight: 25,
            showTopPanel: !1,
            topPanelHeight: 25,
            formatterFactory: null,
            editorFactory: null,
            cellFlashingCssClass: "flashing",
            selectedCellCssClass: "selected",
            multiSelect: !0,
            enableTextSelectionOnCells: !0,
            dataItemColumnValueExtractor: null,
            fullWidthRows: !1,
            multiColumnSort: !1,
            defaultFormatter: defaultFormatter,
            forceSyncScrolling: !1
        },
        columnDefaults = {
            name: "",
            resizable: !0,
            sortable: !1,
            minWidth: 30,
            rerenderOnResize: !1,
            headerCssClass: null,
            defaultSortAsc: !0
        },
        th,
        h,
        ph,
        n,
        cj,
        page = 0,
        offset = 0,
        vScrollDir = 1,
        initialized = !1,
        $container,
        uid = "slickgrid_" + Math.round(1e6 * Math.random()),
        self = this,
        $focusSink,
        $focusSink2,
        $headerScroller,
        $headers,
        $headerRow,
        $headerRowScroller,
        $headerRowSpacer,
        $topPanelScroller,
        $topPanel,
        $viewport,
        $canvas,
        $style,
        $boundAncestors,
        stylesheet,
        columnCssRulesL,
        columnCssRulesR,
        viewportH,
        viewportW,
        canvasWidth,
        viewportHasHScroll,
        viewportHasVScroll,
        headerColumnWidthDiff = 0,
        headerColumnHeightDiff = 0,
        cellWidthDiff = 0,
        cellHeightDiff = 0,
        absoluteColumnMinWidth,
        numberOfRows = 0,
        tabbingDirection = 1,
        activePosX,
        activeRow,
        activeCell,
        activeCellNode = null,
        currentEditor = null,
        serializedEditorValue,
        editController,
        rowsCache = {},
        renderedRows = 0,
        numVisibleRows,
        prevScrollTop = 0,
        scrollTop = 0,
        lastRenderedScrollTop = 0,
        lastRenderedScrollLeft = 0,
        prevScrollLeft = 0,
        scrollLeft = 0,
        selectionModel,
        selectedRows = [],
        plugins = [],
        cellCssClasses = {},
        columnsById = {},
        sortColumns = [],
        columnPosLeft = [],
        columnPosRight = [],
        h_editorLoader = null,
        h_render = null,
        h_postrender = null,
        postProcessedRows = {},
        postProcessToRow = null,
        postProcessFromRow = null,
        counter_rows_rendered = 0,
        counter_rows_removed = 0,
        $CSS_COLS = null;
        this.debug = function() {
            var e = "";
            e += "\ncounter_rows_rendered:  " + counter_rows_rendered,
            e += "\ncounter_rows_removed:  " + counter_rows_removed,
            e += "\nrenderedRows:  " + renderedRows,
            e += "\nnumVisibleRows:  " + numVisibleRows,
            e += "\nmaxSupportedCssHeight:  " + maxSupportedCssHeight,
            e += "\nn(umber of pages):  " + n,
            e += "\n(current) page:  " + page,
            e += "\npage height (ph):  " + ph,
            e += "\nvScrollDir:  " + vScrollDir,
            alert(e)
        },
        this.eval = function(expr) {
            return eval(expr)
        },
        $.extend(this, {
            slickGridVersion: "2.1",
            onScroll: new Slick.Event,
            onSort: new Slick.Event,
            onHeaderMouseEnter: new Slick.Event,
            onHeaderMouseLeave: new Slick.Event,
            onHeaderContextMenu: new Slick.Event,
            onHeaderClick: new Slick.Event,
            onHeaderCellRendered: new Slick.Event,
            onBeforeHeaderCellDestroy: new Slick.Event,
            onHeaderRowCellRendered: new Slick.Event,
            onBeforeHeaderRowCellDestroy: new Slick.Event,
            onMouseEnter: new Slick.Event,
            onMouseLeave: new Slick.Event,
            onClick: new Slick.Event,
            onDblClick: new Slick.Event,
            onContextMenu: new Slick.Event,
            onKeyDown: new Slick.Event,
            onAddNewRow: new Slick.Event,
            onValidationError: new Slick.Event,
            onViewportChanged: new Slick.Event,
            onColumnsReordered: new Slick.Event,
            onColumnsResized: new Slick.Event,
            onCellChange: new Slick.Event,
            onBeforeEditCell: new Slick.Event,
            onBeforeCellEditorDestroy: new Slick.Event,
            onBeforeDestroy: new Slick.Event,
            onActiveCellChanged: new Slick.Event,
            onActiveCellPositionChanged: new Slick.Event,
            onDragInit: new Slick.Event,
            onDragStart: new Slick.Event,
            onDrag: new Slick.Event,
            onDragEnd: new Slick.Event,
            onSelectedRowsChanged: new Slick.Event,
            onCellCssStylesChanged: new Slick.Event,
            registerPlugin: registerPlugin,
            unregisterPlugin: unregisterPlugin,
            getColumns: getColumns,
            setColumns: setColumns,
            getColumnIndex: getColumnIndex,
            updateColumnHeader: updateColumnHeader,
            setSortColumn: setSortColumn,
            setSortColumns: setSortColumns,
            getSortColumns: getSortColumns,
            autosizeColumns: autosizeColumns,
            getOptions: getOptions,
            setOptions: setOptions,
            getData: getData,
            getDataLength: getDataLength,
            getDataItem: getDataItem,
            setData: setData,
            getSelectionModel: getSelectionModel,
            setSelectionModel: setSelectionModel,
            getSelectedRows: getSelectedRows,
            setSelectedRows: setSelectedRows,
            render: render,
            invalidate: invalidate,
            invalidateRow: invalidateRow,
            invalidateRows: invalidateRows,
            invalidateAllRows: invalidateAllRows,
            updateCell: updateCell,
            updateRow: updateRow,
            getViewport: getVisibleRange,
            getRenderedRange: getRenderedRange,
            resizeCanvas: resizeCanvas,
            updateRowCount: updateRowCount,
            scrollRowIntoView: scrollRowIntoView,
            scrollRowToTop: scrollRowToTop,
            scrollCellIntoView: scrollCellIntoView,
            getCanvasNode: getCanvasNode,
            focus: setFocus,
            getCellFromPoint: getCellFromPoint,
            getCellFromEvent: getCellFromEvent,
            getActiveCell: getActiveCell,
            setActiveCell: setActiveCell,
            getActiveCellNode: getActiveCellNode,
            getActiveCellPosition: getActiveCellPosition,
            resetActiveCell: resetActiveCell,
            editActiveCell: makeActiveCellEditable,
            getCellEditor: getCellEditor,
            getCellNode: getCellNode,
            getCellNodeBox: getCellNodeBox,
            canCellBeSelected: canCellBeSelected,
            canCellBeActive: canCellBeActive,
            navigatePrev: navigatePrev,
            navigateNext: navigateNext,
            navigateUp: navigateUp,
            navigateDown: navigateDown,
            navigateLeft: navigateLeft,
            navigateRight: navigateRight,
            gotoCell: gotoCell,
            getTopPanel: getTopPanel,
            setTopPanelVisibility: setTopPanelVisibility,
            setHeaderRowVisibility: setHeaderRowVisibility,
            getHeaderRow: getHeaderRow,
            getHeaderRowColumn: getHeaderRowColumn,
            getGridPosition: getGridPosition,
            flashCell: flashCell,
            addCellCssStyles: addCellCssStyles,
            setCellCssStyles: setCellCssStyles,
            removeCellCssStyles: removeCellCssStyles,
            getCellCssStyles: getCellCssStyles,
            init: finishInitialization,
            destroy: destroy,
            getEditorLock: getEditorLock,
            getEditController: getEditController
        }),
        init()
    }
    $.extend(!0, window, {
        Slick: {
            Grid: SlickGrid
        }
    });
    var scrollbarDimensions, maxSupportedCssHeight
})(jQuery)