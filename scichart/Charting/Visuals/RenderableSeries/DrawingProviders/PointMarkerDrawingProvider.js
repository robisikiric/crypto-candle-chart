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
exports.PointMarkerDrawingProvider = void 0;
var Deleter_1 = require("../../../../Core/Deleter");
var BaseSeriesDrawingProvider_1 = require("./BaseSeriesDrawingProvider");
/**
 * Used internally - a drawing provider performs drawing for a {@link IRenderableSeries | Renderable Series} which draw a
 * point-marker using our WebAssembly WebGL rendering engine
 */
var PointMarkerDrawingProvider = /** @class */ (function (_super) {
    __extends(PointMarkerDrawingProvider, _super);
    /**
     * Creates an instance of the {@link PointMarkerDrawingProvider}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries the parent {@link IRenderableSeries} which this drawing provider is attached to
     * @param ySelector an optional Y-selector for choosing which y-values to use for drawing points
     * @param ySplineSelector an optional selector for choosing which y-animation values to use for drawing points
     */
    function PointMarkerDrawingProvider(webAssemblyContext, parentSeries, ySelector, ySplineSelector, xSelector) {
        var _this = _super.call(this, webAssemblyContext, parentSeries, ySelector, xSelector) || this;
        _this.ySplineValuesSelector = ySplineSelector === undefined ? function (rs) { return rs.ySplineValues; } : ySplineSelector;
        _this.nativeDrawingProvider = new _this.webAssemblyContext.SCRTScatterSeriesDrawingProvider();
        _this.xAnimationPointMarkerValues = new _this.webAssemblyContext.SCRTDoubleVector();
        _this.yAnimationPointMarkerValues = new _this.webAssemblyContext.SCRTDoubleVector();
        _this.args = new _this.webAssemblyContext.SCRTPointDrawingParams();
        return _this;
    }
    /**
     * @inheritDoc
     */
    PointMarkerDrawingProvider.prototype.onSeriesPropertyChange = function (propertyName) {
        // Deliberately empty
    };
    PointMarkerDrawingProvider.prototype.getProperties = function (parentSeries) {
        return parentSeries;
    };
    /**
     * @inheritDoc
     */
    PointMarkerDrawingProvider.prototype.draw = function (renderContext, renderPassData) {
        var _a, _b;
        var pointMarker = (_a = this.getProperties(this.parentSeries)) === null || _a === void 0 ? void 0 : _a.pointMarker;
        if (pointMarker === undefined) {
            return;
        }
        var spriteTexture, strokeMaskTexture;
        if (this.parentSeries.hasPointMarkerPaletteProvider()) {
            spriteTexture = pointMarker.getFillMask();
            strokeMaskTexture = pointMarker.getStrokeMask();
        }
        else {
            spriteTexture = pointMarker.getSprite();
            strokeMaskTexture = undefined;
            // DEBUG CODE: REMOVE AFTER DEVELOPMENT COMPLETE
            // renderContext.getNativeContext().DrawTexture(spriteTexture.getTexture(), 10, 10, 256, 256);
            // END DEBUG CODE
        }
        var pointSeries = renderPassData.pointSeries;
        var isCategoryAxis = renderPassData.xCoordinateCalculator.isCategoryCoordinateCalculator;
        var xValues = this.xSelector(pointSeries);
        var yValues = this.ySelector(pointSeries);
        // if (this.parentSeries.isSpline) {
        //     const spline = this.parentSeries as any as ISpline;
        //     if (spline.xSplineValues.size() > 0 && spline.ySplineValues.size() > 0) {
        //         this.pointMarkerXYValuesFromSpline(
        //             xValues.size(),
        //             spline.xSplineValues,
        //             this.ySplineValuesSelector(spline),
        //             spline.interpolationPoints
        //         );
        //         xValues = this.xAnimationPointMarkerValues;
        //         yValues = this.yAnimationPointMarkerValues;
        //     }
        // }
        this.args.Reset();
        this.args.verticalChart = renderPassData.isVerticalChart;
        this.args.forceShaderMethod = true;
        this.args.SetSpriteTexture(spriteTexture.getTexture());
        if (strokeMaskTexture) {
            this.args.SetStrokeMask(strokeMaskTexture.getTexture());
        }
        var _c = this.parentSeries.dataSeries, fifoCapacity = _c.fifoCapacity, fifoSweeping = _c.fifoSweeping, fifoSweepingGap = _c.fifoSweepingGap;
        var fifoStartIndex = pointSeries.fifoStartIndex;
        if (pointMarker.lastPointOnly && yValues.size() > 0) {
            this.args.count = 1;
            this.args.startIndex =
                fifoSweeping && this.parentSeries.dataSeries.count() === fifoCapacity
                    ? fifoStartIndex - 1
                    : yValues.size() - 1;
        }
        else {
            var _d = this.getStartAndCount(renderPassData, xValues), startIndex = _d.startIndex, count = _d.count;
            this.args.count = count;
            this.args.startIndex = startIndex;
            if (fifoSweeping && fifoCapacity === this.parentSeries.dataSeries.count()) {
                this.args.count = fifoStartIndex;
            }
        }
        // Paletting per point
        this.applyStrokeFillPaletting(pointMarker.stroke, undefined, pointMarker.fill, undefined, this.parentSeries.opacity);
        this.args.SetPalettedColors(this.palettingState.palettedColors);
        this.args.paletteStart = (_b = this.palettingState.paletteStartIndex) !== null && _b !== void 0 ? _b : 0;
        var nativeContext = renderContext.getNativeContext();
        this.drawPoints(nativeContext, isCategoryAxis ? pointSeries.indexes : xValues, yValues, renderPassData.xCoordinateCalculator.nativeCalculator, renderPassData.yCoordinateCalculator.nativeCalculator, this.args, this.parentSeries.parentSurface.seriesViewRect);
        if (fifoSweeping && fifoCapacity === this.parentSeries.dataSeries.count() && !pointMarker.lastPointOnly) {
            this.args.startIndex = Math.min(yValues.size(), fifoStartIndex + fifoSweepingGap);
            this.args.count = Math.max(0, yValues.size() - fifoStartIndex - fifoSweepingGap);
            if (this.args.count > 0) {
                this.drawPoints(nativeContext, isCategoryAxis ? pointSeries.indexes : xValues, yValues, renderPassData.xCoordinateCalculator.nativeCalculator, renderPassData.yCoordinateCalculator.nativeCalculator, this.args, this.parentSeries.parentSurface.seriesViewRect);
            }
        }
    };
    /**
     * @inheritDoc
     */
    PointMarkerDrawingProvider.prototype.delete = function () {
        this.nativeDrawingProvider = (0, Deleter_1.deleteSafe)(this.nativeDrawingProvider);
        this.xAnimationPointMarkerValues = (0, Deleter_1.deleteSafe)(this.xAnimationPointMarkerValues);
        this.yAnimationPointMarkerValues = (0, Deleter_1.deleteSafe)(this.yAnimationPointMarkerValues);
        this.args = (0, Deleter_1.deleteSafe)(this.args);
        _super.prototype.delete.call(this);
    };
    PointMarkerDrawingProvider.prototype.overridePaletteProviderColors = function (rs, xValue, yValue, index, opacity, metadata) {
        if (rs.hasPointMarkerPaletteProvider()) {
            var pointMarkerPaletteProvider = rs.paletteProvider;
            var colors = pointMarkerPaletteProvider.overridePointMarkerArgb(xValue, yValue, index, opacity, metadata);
            if (colors)
                return colors;
        }
        return { stroke: undefined, fill: undefined };
    };
    PointMarkerDrawingProvider.prototype.isGradientFillPaletting = function (rs) {
        return false;
    };
    PointMarkerDrawingProvider.prototype.drawPoints = function (nativeContext, xValues, yValues, xCoordCalc, yCoordCalc, args, viewRect) {
        this.nativeDrawingProvider.DrawPointsVec(nativeContext, xValues, yValues, xCoordCalc, yCoordCalc, args);
    };
    PointMarkerDrawingProvider.prototype.pointMarkerXYValuesFromSpline = function (size, xAnimationValues, yAnimationValues, interpolationPoints) {
        this.xAnimationPointMarkerValues.resize(size, 0);
        this.yAnimationPointMarkerValues.resize(size, 0);
        for (var i = 0; i < size - 1; i++) {
            var x = xAnimationValues.get((interpolationPoints + 1) * i);
            this.xAnimationPointMarkerValues.set(i, x);
            var y = yAnimationValues.get((interpolationPoints + 1) * i);
            this.yAnimationPointMarkerValues.set(i, y);
        }
        var lastIndex = yAnimationValues.size() - 1;
        this.xAnimationPointMarkerValues.set(size - 1, xAnimationValues.get(lastIndex));
        this.yAnimationPointMarkerValues.set(size - 1, yAnimationValues.get(lastIndex));
    };
    return PointMarkerDrawingProvider;
}(BaseSeriesDrawingProvider_1.BaseSeriesDrawingProvider));
exports.PointMarkerDrawingProvider = PointMarkerDrawingProvider;
