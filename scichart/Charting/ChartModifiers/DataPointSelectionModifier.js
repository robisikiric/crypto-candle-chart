"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataPointSelectionModifier = exports.ESelectionMode = void 0;
var classFactory_1 = require("../../Builder/classFactory");
var Deleter_1 = require("../../Core/Deleter");
var EventHandler_1 = require("../../Core/EventHandler");
var Rect_1 = require("../../Core/Rect");
var BaseType_1 = require("../../types/BaseType");
var ChartModifierType_1 = require("../../types/ChartModifierType");
var pointUtil_1 = require("../../utils/pointUtil");
var translate_1 = require("../../utils/translate");
var IDataSeries_1 = require("../Model/IDataSeries");
var IPointMetadata_1 = require("../Model/IPointMetadata");
var BaseHitTestProvider_1 = require("../Visuals/RenderableSeries/HitTest/BaseHitTestProvider");
var RubberBandSvgRect_1 = require("../Visuals/RubberBandSvgRect/RubberBandSvgRect");
var ChartModifierBase2D_1 = require("./ChartModifierBase2D");
var constants_1 = require("./constants");
var DataPointInfo_1 = require("./DataPointInfo");
var DataPointSelectionChangedArgs_1 = require("./DataPointSelectionChangedArgs");
var RubberBandXyZoomModifier_1 = require("./RubberBandXyZoomModifier");
/**
 *  Defines constants which represents different selection modes of {@link DataPointSelectionModifier}
 */
var ESelectionMode;
(function (ESelectionMode) {
    /**
     * Points which the user selects are combined with previously selected points.
     */
    ESelectionMode["Union"] = "Union";
    /**
     * Points which the user selects become selected, Exclusive-Or (XOR) the current selection
     */
    ESelectionMode["Inverse"] = "Inverse";
    /**
     * Points which the user selects become selected. Previously collected points are cleared or replaced by these.
     */
    ESelectionMode["Replace"] = "Replace";
})(ESelectionMode = exports.ESelectionMode || (exports.ESelectionMode = {}));
var DataPointSelectionModifier = /** @class */ (function (_super) {
    __extends(DataPointSelectionModifier, _super);
    /**
     * Creates an instances of DataPointSelectionModifier
     * @param options Optional parameters of type {@link IDataPointSelectionModifierOptions} used to configure the modifier
     */
    function DataPointSelectionModifier(options) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, options) || this;
        _this.type = ChartModifierType_1.EChart2DModifierType.DataPointSelection;
        /**
         * A selection-changed EventHandler. See {@link EventHandler} for how to subscribe to and be
         * notified when any {@link IRenderableSeries | Series} is selected or unselected
         */
        _this.selectionChanged = new EventHandler_1.EventHandler();
        _this.includedSeriesMap = new Map();
        _this.selectedDataPointsMap = new Map();
        _this.selectionHasChanged = false;
        _this.allowClickSelect = (_a = options === null || options === void 0 ? void 0 : options.allowClickSelect) !== null && _a !== void 0 ? _a : true;
        _this.allowDragSelect = (_b = options === null || options === void 0 ? void 0 : options.allowDragSelect) !== null && _b !== void 0 ? _b : true;
        if (options === null || options === void 0 ? void 0 : options.selectionStroke) {
            _this.selectionStroke = options.selectionStroke;
        }
        if (options === null || options === void 0 ? void 0 : options.selectionFill) {
            _this.selectionFill = options === null || options === void 0 ? void 0 : options.selectionFill;
        }
        _this.selectionStrokeThicknessProperty = (_c = options === null || options === void 0 ? void 0 : options.selectionStrokeThickness) !== null && _c !== void 0 ? _c : 1;
        if (options === null || options === void 0 ? void 0 : options.onSelectionChanged) {
            if (typeof options.onSelectionChanged === "string") {
                _this.typeMap.set("onSelectionChanged", options.onSelectionChanged);
                // @ts-ignore
                _this.selectionChanged.subscribe((0, classFactory_1.getFunction)(BaseType_1.EBaseType.OptionFunction, options.onSelectionChanged));
            }
            else {
                // @ts-ignore
                _this.selectionChanged.subscribe(options.onSelectionChanged);
            }
        }
        if (options === null || options === void 0 ? void 0 : options.getSelectionMode) {
            if (typeof options.getSelectionMode === "string") {
                _this.typeMap.set("getSelectionMode", options.getSelectionMode);
                // @ts-ignore
                _this.getSelectionMode = (0, classFactory_1.getFunction)(BaseType_1.EBaseType.OptionFunction, options.getSelectionMode);
            }
            else {
                // @ts-ignore
                _this.getSelectionMode = options.getSelectionMode;
            }
        }
        return _this;
    }
    /**
     * @inheritDoc
     */
    DataPointSelectionModifier.prototype.applyTheme = function (themeProvider) {
        if (!this.testPropertyChanged(constants_1.PROPERTY.SELECTION_FILL)) {
            this.selectionFill = themeProvider.rubberBandFillBrush;
        }
        if (!this.testPropertyChanged(constants_1.PROPERTY.SELECTION_STROKE)) {
            this.selectionStroke = themeProvider.rubberBandStrokeBrush;
        }
    };
    /**
     * @inheritDoc
     */
    DataPointSelectionModifier.prototype.onAttach = function () {
        var _this = this;
        var _a, _b;
        _super.prototype.onAttach.call(this);
        this.selectionRect = new RubberBandSvgRect_1.RubberBandSvgRect((_a = this.parentSurface) === null || _a === void 0 ? void 0 : _a.domSvgContainer, this.selectionFill, this.selectionStroke, this.selectionStrokeThickness);
        this.clearSelectedDataPoints();
        (_b = this.getAllSeries()) === null || _b === void 0 ? void 0 : _b.forEach(function (rs) { return _this.onAttachSeries(rs); });
    };
    /**
     * @inheritDoc
     */
    DataPointSelectionModifier.prototype.onDetach = function () {
        var _this = this;
        var _a;
        _super.prototype.onDetach.call(this);
        this.selectionRect = (0, Deleter_1.deleteSafe)(this.selectionRect);
        this.clearSelectedDataPoints();
        (_a = this.getAllSeries()) === null || _a === void 0 ? void 0 : _a.forEach(function (rs) { return _this.onDetachSeries(rs); });
    };
    Object.defineProperty(DataPointSelectionModifier.prototype, "selectedDataPoints", {
        /**
         * An array of currently selected series which can be observed by subscribing to the {@link selectionChanged} {@link EventHandler | event handler}
         * @remarks See  documentation for how to subscribe to changes
         */
        get: function () {
            return Array.from(this.selectedDataPointsMap.values());
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    DataPointSelectionModifier.prototype.onAttachSeries = function (rs) {
        _super.prototype.onAttachSeries.call(this, rs);
        if (!rs.dataSeries ||
            // TODO: Heatmap series not supported
            rs.dataSeries.type === IDataSeries_1.EDataSeriesType.HeatmapUniform) {
            return;
        }
        // Build selected points list from attached series
        var baseDataSeries = rs.dataSeries;
        // Add metadata to series
        if (!baseDataSeries.hasMetadataGenerator()) {
            baseDataSeries.setMetadataGenerator(new IPointMetadata_1.TemplateMetadataGenerator({ isSelected: false }));
        }
        for (var i = 0; i < baseDataSeries.getMetadataLength(); i++) {
            var metadata = baseDataSeries.getMetadataAt(i);
            if (metadata === null || metadata === void 0 ? void 0 : metadata.isSelected) {
                var dataPoint = new DataPointInfo_1.DataPointInfo(rs, metadata, i);
                this.addSelectedDataPoint(rs, i, dataPoint);
            }
        }
        this.raiseSelectionChanged(false);
    };
    /**
     * @inheritDoc
     */
    DataPointSelectionModifier.prototype.onDetachSeries = function (rs) {
        _super.prototype.onDetachSeries.call(this, rs);
        if (!rs.dataSeries) {
            return;
        }
        // Remove selected points from selected points list
        this.removeSelectedDataPointsForSeries(rs);
        this.raiseSelectionChanged(false);
    };
    /**
     * @inheritDoc
     */
    DataPointSelectionModifier.prototype.modifierMouseDown = function (args) {
        _super.prototype.modifierMouseDown.call(this, args);
        if (this.executeOn !== args.button) {
            return;
        }
        if (!this.isAttached) {
            throw new Error("Should not call DataPointSelectionModifier.modifierMouseDown if not attached");
        }
        // Point coordinates relative to series view rectangle.
        var translatedPoint = (0, translate_1.translateFromCanvasToSeriesViewRect)(args.mousePoint, this.parentSurface.seriesViewRect);
        if (!translatedPoint) {
            return;
        }
        this.startPoint = translatedPoint;
        this.isClicked = true;
        args.handled = true;
    };
    /**
     * @inheritDoc
     */
    DataPointSelectionModifier.prototype.modifierMouseMove = function (args) {
        _super.prototype.modifierMouseMove.call(this, args);
        var seriesViewRect = this.parentSurface.seriesViewRect;
        if (this.isClicked) {
            this.endPoint = (0, translate_1.translateFromCanvasToSeriesViewRect)(Rect_1.Rect.clipPointToRect(args.mousePoint, seriesViewRect), seriesViewRect);
            var _a = (0, RubberBandXyZoomModifier_1.getRubberBandRect)(this.startPoint, this.endPoint, this.xyDirection, this.parentSurface.seriesViewRect), x = _a.x, right = _a.right, y = _a.y, bottom = _a.bottom;
            this.selectionRect.isHidden = !this.allowDragSelect;
            this.selectionRect.x1 = (0, translate_1.translateToNotScaled)(x);
            this.selectionRect.x2 = (0, translate_1.translateToNotScaled)(right);
            this.selectionRect.y1 = (0, translate_1.translateToNotScaled)(y);
            this.selectionRect.y2 = (0, translate_1.translateToNotScaled)(bottom);
        }
    };
    /**
     * @inheritDoc
     */
    DataPointSelectionModifier.prototype.modifierMouseUp = function (args) {
        _super.prototype.modifierMouseUp.call(this, args);
        if (this.executeOn !== args.button) {
            return;
        }
        if (!this.isAttached) {
            throw new Error("Should not call DataPointSelectionModifier.modifierMouseUp if not attached");
        }
        if (this.isClicked) {
            var seriesViewRect = this.parentSurface.seriesViewRect;
            this.endPoint = (0, translate_1.translateFromCanvasToSeriesViewRect)(Rect_1.Rect.clipPointToRect(args.mousePoint, seriesViewRect), seriesViewRect);
            var rect = (0, RubberBandXyZoomModifier_1.getRubberBandRect)(this.startPoint, this.endPoint, this.xyDirection, this.parentSurface.seriesViewRect);
            var isAreaSelection = rect.width >= 3 && rect.height >= 3 && this.allowDragSelect;
            var selectionMode = this.getSelectionMode(args, isAreaSelection);
            // Process selection
            if (isAreaSelection && this.allowDragSelect) {
                this.selectManyPoints(rect, selectionMode);
            }
            else if (this.allowClickSelect) {
                this.selectSinglePoint(args.mousePoint, selectionMode);
            }
            this.isClicked = false;
            this.selectionRect.isHidden = true;
        }
    };
    Object.defineProperty(DataPointSelectionModifier.prototype, "selectionStrokeThickness", {
        /**
         * Gets or sets the strokeThickness of the selection rect when the user drags on the chart
         */
        get: function () {
            return this.selectionStrokeThicknessProperty;
        },
        /**
         * Gets or sets the strokeThickness of the selection rect when the user drags on the chart
         */
        set: function (selectionStrokeThickness) {
            this.selectionStrokeThicknessProperty = selectionStrokeThickness;
            this.notifyPropertyChanged(constants_1.PROPERTY.SELECTION_STROKE_THICKNESS);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataPointSelectionModifier.prototype, "selectionStroke", {
        /**
         * Gets or sets the stroke of the selection rect when the user drags on the chart
         */
        get: function () {
            return this.selectionStrokeProperty;
        },
        /**
         * Gets or sets the stroke of the selection rect when the user drags on the chart
         */
        set: function (selectionStroke) {
            this.selectionStrokeProperty = selectionStroke;
            this.notifyPropertyChanged(constants_1.PROPERTY.SELECTION_STROKE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataPointSelectionModifier.prototype, "selectionFill", {
        /**
         * Gets or sets the fill of the selection rect when the user drags on the chart
         */
        get: function () {
            return this.selectionFillProperty;
        },
        /**
         * Gets or sets the fill of the selection rect when the user drags on the chart
         */
        set: function (selectionFill) {
            this.selectionFillProperty = selectionFill;
            this.notifyPropertyChanged(constants_1.PROPERTY.SELECTION_FILL);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    DataPointSelectionModifier.prototype.getIncludedRenderableSeries = function () {
        var _this = this;
        return this.getAllSeries().filter(function (rs) { return _this.includedSeriesMap.get(rs) !== false; });
    };
    /**
     * @inheritDoc
     */
    DataPointSelectionModifier.prototype.includeSeries = function (series, isIncluded) {
        if (!isIncluded) {
            this.includedSeriesMap.set(series, isIncluded);
        }
        if (isIncluded) {
            this.includedSeriesMap.delete(series);
        }
    };
    Object.defineProperty(DataPointSelectionModifier.prototype, "includedSeries", {
        /**
         * Used internally for tests. Gets a Map of included series
         * @remarks Series include flag set to false means excluded. Series not present or flag=true means included
         */
        get: function () {
            return this.includedSeriesMap;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Gets the current {@link ESelectionMode} to use - e.g. Union, Replace - depending on {@link TModifierKeys}
     * and if the selection is area selection or not. This function can be overridden by the
     * {@link IDataPointSelectionModifierOptions.getSelectionMode}
     * @remarks Default behaviour is {@link ESelectionMode.Replace}, or {@link ESelectionMode.Union} when CTRL pressed,
     * or {@link ESelectionMode.Inverse} when Shift pressed
     * @param modifierKeys The {@link TModifierKeys} e.g. if Ctrl, Shift or Alt are pressed
     * @param isAreaSelection When true, the user has selected a rectangle or area, not clicked a single point
     * @protected
     */
    DataPointSelectionModifier.prototype.getSelectionMode = function (modifierKeys, isAreaSelection) {
        if (modifierKeys.ctrlKey) {
            // Union when area selection and CTRL else Inverse
            return ESelectionMode.Union;
        }
        else if (modifierKeys.shiftKey) {
            // When shift Inverse
            return ESelectionMode.Inverse;
        }
        // Default mode is Replace
        return ESelectionMode.Replace;
    };
    DataPointSelectionModifier.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            allowClickSelect: this.allowClickSelect,
            allowDragSelect: this.allowDragSelect,
            getSelectionMode: this.typeMap.get("getSelectionMode"),
            onSelectionChanged: this.typeMap.get("onSelectionChanged"),
            selectionFill: this.selectionFill,
            selectionStroke: this.selectionStroke,
            selectionStrokeThickness: this.selectionStrokeThickness
        };
        Object.assign(json.options, options);
        return json;
    };
    DataPointSelectionModifier.prototype.delete = function () {
        this.selectionChanged.unsubscribeAll();
        this.selectionRect = (0, Deleter_1.deleteSafe)(this.selectionRect);
        _super.prototype.delete.call(this);
    };
    /**
     * Selects all points inside the {@link Rect}, according to the {@link ESelectionMode} passed in
     * @param rect
     * @param selectionMode
     * @protected
     */
    DataPointSelectionModifier.prototype.selectManyPoints = function (rect, selectionMode) {
        var _this = this;
        if (this.parentSurface) {
            var multiSelect = selectionMode !== ESelectionMode.Replace;
            if (!multiSelect) {
                this.deselectAllPoints(false);
            }
            // Perform an area selection on all series
            this.getIncludedRenderableSeries()
                .filter(function (rs) { return rs.isVisible && rs.dataSeries; })
                .forEach(function (rs, index) {
                var xCalc = rs.xAxis.getCurrentCoordinateCalculator();
                var yCalc = rs.yAxis.getCurrentCoordinateCalculator();
                // Find the bounds of the data inside the rectangle
                var leftXData, rightXData;
                if (xCalc.getDataValue(rect.left) <= xCalc.getDataValue(rect.right)) {
                    leftXData = xCalc.getDataValue(rect.left);
                    rightXData = xCalc.getDataValue(rect.right);
                }
                else {
                    leftXData = xCalc.getDataValue(rect.right);
                    rightXData = xCalc.getDataValue(rect.left);
                }
                var bottomYData, topYData;
                if (yCalc.getDataValue(rect.top) <= yCalc.getDataValue(rect.bottom)) {
                    bottomYData = yCalc.getDataValue(rect.top);
                    topYData = yCalc.getDataValue(rect.bottom);
                }
                else {
                    bottomYData = yCalc.getDataValue(rect.bottom);
                    topYData = yCalc.getDataValue(rect.top);
                }
                if (rs.dataSeries.type === IDataSeries_1.EDataSeriesType.HeatmapUniform) {
                    // TODO: Heatmap series
                }
                else {
                    var baseDataSeries = rs.dataSeries;
                    for (var i = 0; i < baseDataSeries.count(); i++) {
                        var x = baseDataSeries.getNativeXValues().get(i);
                        var y = baseDataSeries.getNativeYValues().get(i);
                        if ((0, pointUtil_1.testIsInBounds)(x, y, leftXData, topYData, rightXData, bottomYData)) {
                            var metadata = baseDataSeries.getMetadataAt(i);
                            if (selectionMode !== ESelectionMode.Inverse) {
                                metadata.isSelected = true;
                                _this.addSelectedDataPoint(rs, i, new DataPointInfo_1.DataPointInfo(rs, metadata, i));
                            }
                            else {
                                if (metadata.isSelected) {
                                    metadata.isSelected = false;
                                    _this.removeSelectedDataPoint(rs, i);
                                }
                                else {
                                    metadata.isSelected = true;
                                    _this.addSelectedDataPoint(rs, i, new DataPointInfo_1.DataPointInfo(rs, metadata, i));
                                }
                            }
                        }
                    }
                }
            });
            this.raiseSelectionChanged(true);
        }
    };
    /**
     * Performs selection of a single point with the desired {@link ESelectionMode}
     * @param point
     * @param selectionMode
     * @protected
     */
    DataPointSelectionModifier.prototype.selectSinglePoint = function (point, selectionMode) {
        var _this = this;
        if (this.parentSurface) {
            // Perform hit-test at the x-y point
            var hitTestResults = this.getIncludedRenderableSeries()
                .filter(function (rs) { return rs.isVisible && rs.dataSeries; }) // todo && included series
                .map(function (rs) { return ({
                renderableSeries: rs,
                hitTestInfo: rs.hitTestProvider.hitTestForDataPointSelectionModifier(point.x, point.y, BaseHitTestProvider_1.BaseHitTestProvider.DEFAULT_HIT_TEST_RADIUS)
            }); });
            var multiSelect = selectionMode !== ESelectionMode.Replace;
            if (!multiSelect) {
                this.deselectAllPoints(false);
            }
            hitTestResults.forEach(function (htResult) {
                var ht = htResult.hitTestInfo;
                var rs = htResult.renderableSeries;
                if (!ht.isHit) {
                    return;
                }
                // Metadata can't be auto-created if the renderableSeries is added to the surface without a dataSeries
                if (!ht.metadata) {
                    console.warn("Cannot select datapoint for series ".concat(ht.dataSeriesName, " as it does not have metadata. To solve this either:\nConfigure metadata when you create the series or when you add data eg renderableSeries.dataSeries = new XyDataSeries(wasmContext, { metadata: { isSelected: false }}), or:\nAdd the DataPointSelectionModifier after all series have had their dataSeries set."));
                    return;
                }
                if (selectionMode === ESelectionMode.Union) {
                    // Always select in union
                    ht.metadata.isSelected = true;
                    var newDataPointInfo = new DataPointInfo_1.DataPointInfo(ht.associatedSeries, ht.metadata, ht.dataSeriesIndex);
                    _this.addSelectedDataPoint(ht.associatedSeries, ht.dataSeriesIndex, newDataPointInfo);
                }
                else {
                    // Toggle selection
                    ht.metadata.isSelected = !ht.metadata.isSelected;
                    if (ht.metadata.isSelected) {
                        _this.addSelectedDataPoint(rs, ht.dataSeriesIndex, new DataPointInfo_1.DataPointInfo(ht.associatedSeries, ht.metadata, ht.dataSeriesIndex));
                    }
                    else {
                        _this.removeSelectedDataPoint(rs, ht.dataSeriesIndex);
                    }
                }
            });
            this.raiseSelectionChanged(true);
        }
    };
    /**
     * Deselects all points
     * @param invalidate When true (default=true) raise {@link selectionChanged} event and redraw the parent {@link SciChartSurface}
     * @protected
     */
    DataPointSelectionModifier.prototype.deselectAllPoints = function (invalidate) {
        if (invalidate === void 0) { invalidate = true; }
        // Deselect all datapoints
        this.selectedDataPoints.forEach(function (dp) {
            if (dp.renderableSeries && dp.metadata) {
                dp.metadata.isSelected = false;
            }
        });
        this.clearSelectedDataPoints();
        if (invalidate) {
            this.raiseSelectionChanged(true);
        }
    };
    DataPointSelectionModifier.prototype.addSelectedDataPoint = function (rs, index, value) {
        this.selectedDataPointsMap.set(getKey(rs, index), value);
        this.selectionHasChanged = true;
    };
    DataPointSelectionModifier.prototype.removeSelectedDataPoint = function (rs, index) {
        this.selectedDataPointsMap.delete(getKey(rs, index));
        this.selectionHasChanged = true;
    };
    DataPointSelectionModifier.prototype.clearSelectedDataPoints = function () {
        if (this.selectedDataPointsMap.size > 0) {
            this.selectionHasChanged = true;
        }
        this.selectedDataPointsMap.clear();
    };
    DataPointSelectionModifier.prototype.removeSelectedDataPointsForSeries = function (rs) {
        var _this = this;
        this.selectedDataPointsMap.forEach(function (dp, key) {
            if (dp.renderableSeries === rs) {
                _this.selectedDataPointsMap.delete(key);
                _this.selectionHasChanged = true;
            }
        });
    };
    DataPointSelectionModifier.prototype.raiseSelectionChanged = function (invalidate) {
        var _a;
        if (this.selectionHasChanged) {
            this.selectionChanged.raiseEvent(new DataPointSelectionChangedArgs_1.DataPointSelectionChangedArgs(this, this.selectedDataPoints));
            this.selectionHasChanged = false;
            if (invalidate) {
                (_a = this.parentSurface) === null || _a === void 0 ? void 0 : _a.invalidateElement();
            }
        }
    };
    return DataPointSelectionModifier;
}(ChartModifierBase2D_1.ChartModifierBase2D));
exports.DataPointSelectionModifier = DataPointSelectionModifier;
var getKey = function (rs, index) { return "".concat(rs.id, "_").concat(index); };
