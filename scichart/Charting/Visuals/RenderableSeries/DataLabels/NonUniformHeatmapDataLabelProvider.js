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
exports.NonUniformHeatMapDataLabelProvider = void 0;
var Point_1 = require("../../../../Core/Point");
var Rect_1 = require("../../../../Core/Rect");
var DataLabelProviderType_1 = require("../../../../types/DataLabelProviderType");
var Size_1 = require("../../../../types/Size");
var parseColor_1 = require("../../../../utils/parseColor");
var NativeObject_1 = require("../../Helpers/NativeObject");
var DpiHelper_1 = require("../../TextureManager/DpiHelper");
var HeatMapDataLabelProvider_1 = require("./HeatMapDataLabelProvider");
var NonUniformHeatMapDataLabelProvider = /** @class */ (function (_super) {
    __extends(NonUniformHeatMapDataLabelProvider, _super);
    function NonUniformHeatMapDataLabelProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = DataLabelProviderType_1.EDataLabelProviderType.NonUniformHeatmap;
        _this.cellSizeThresholdCoefficient = 1;
        return _this;
    }
    NonUniformHeatMapDataLabelProvider.prototype.getPosition = function (xIndex, yIndex, xVal, yVal, textSize, cellWidth, cellHeight, renderPassData) {
        var x = renderPassData.xCoordinateCalculator.getCoordinate(xVal);
        var y = renderPassData.yCoordinateCalculator.getCoordinate(yVal);
        if (renderPassData.isVerticalChart) {
            var c = x;
            x = y;
            y = c;
        }
        if (renderPassData.xCoordinateCalculator.hasFlippedCoordinates) {
            x += (cellWidth - textSize.width) / 2;
        }
        else {
            x -= cellWidth - (cellWidth - textSize.width) / 2;
        }
        if (renderPassData.yCoordinateCalculator.hasFlippedCoordinates) {
            y += cellHeight - (cellHeight - textSize.height) / 2;
        }
        else {
            y -= (cellHeight - textSize.height) / 2;
        }
        return new Point_1.Point(x, y);
    };
    NonUniformHeatMapDataLabelProvider.prototype.generateDataLabels = function (renderContext, renderPassData) {
        var _a, _b;
        // clear any previous labels
        this.dataLabels = [];
        if (!this.style || !this.style.fontFamily || !this.style.fontSize) {
            return;
        }
        this.dataSeries = this.parentSeries.dataSeries;
        this.zValues = this.dataSeries.getZValues();
        // this.state = new DataLabelState(renderContext, renderPassData, this.style, yValues, this.parentSeries);
        var bounds = (0, NativeObject_1.getTextBounds)(this.webAssemblyContext);
        var dpiAdjustedStyle = DpiHelper_1.DpiHelper.adjustTextStyle(this.style);
        var font = renderContext.getFont(dpiAdjustedStyle);
        // NonUniform-specific logic
        var heatmapWidth = Math.abs(renderPassData.xCoordinateCalculator.getCoordinate(this.dataSeries.getXValue(this.dataSeries.arrayWidth)) -
            renderPassData.xCoordinateCalculator.getCoordinate(this.dataSeries.getXValue(0)));
        var heatmapHeight = Math.abs(renderPassData.yCoordinateCalculator.getCoordinate(this.dataSeries.getYValue(this.dataSeries.arrayHeight)) -
            renderPassData.yCoordinateCalculator.getCoordinate(this.dataSeries.getYValue(0)));
        var relativeXCellSizes = this.dataSeries.xCellSizes;
        var relativeYCellSizes = this.dataSeries.yCellSizes;
        font.CalculateStringBounds((_a = this.getText(0, 0)) !== null && _a !== void 0 ? _a : "", bounds, (_b = this.style.lineSpacing) !== null && _b !== void 0 ? _b : 2);
        var minCellHeight = bounds.m_fHeight * this.cellSizeThresholdCoefficient;
        var minCellWidth = bounds.m_fWidth * this.cellSizeThresholdCoefficient;
        // TODO figure out how it should work for NonUniform
        // if (!this.shouldGenerate(new Size(bounds.m_fWidth, bounds.m_fHeight), cellWidth, cellHeight)) return;
        this.colorValue = (0, parseColor_1.parseColorToUIntArgb)(this.color);
        for (var yIndex = 0; yIndex < this.dataSeries.arrayHeight; yIndex++) {
            var cellHeight = heatmapHeight * relativeYCellSizes[yIndex];
            if (cellHeight < minCellHeight) {
                continue;
            }
            var yVal = this.dataSeries.getYValue(yIndex);
            var yValNext = this.dataSeries.yCellOffsets[yIndex + 1];
            if (renderPassData.yCoordinateCalculator.visibleMin > yVal ||
                renderPassData.yCoordinateCalculator.visibleMax < yValNext) {
                continue;
            }
            for (var xIndex = 0; xIndex < this.dataSeries.arrayWidth; xIndex++) {
                var cellWidth = heatmapWidth * relativeXCellSizes[xIndex];
                if (cellWidth < minCellWidth) {
                    continue;
                }
                var xVal = this.dataSeries.getXValue(xIndex);
                var xValNext = this.dataSeries.xCellOffsets[xIndex + 1];
                if (renderPassData.xCoordinateCalculator.visibleMin > xVal ||
                    renderPassData.xCoordinateCalculator.visibleMax < xValNext) {
                    continue;
                }
                var text = this.getText(xIndex, yIndex);
                if (!text) {
                    continue;
                }
                font.CalculateStringBounds(text !== null && text !== void 0 ? text : "", bounds, 2);
                var textSize = new Size_1.Size(bounds.m_fWidth, bounds.m_fHeight);
                if (renderPassData.isVerticalChart) {
                    var c = cellHeight;
                    cellHeight = cellWidth;
                    cellWidth = c;
                }
                var position = this.getPosition(xIndex, yIndex, xVal, yVal, textSize, cellWidth, cellHeight, renderPassData);
                var label = {
                    text: text,
                    position: position,
                    rect: new Rect_1.Rect(position.x, position.y - bounds.GetLineBounds(0).m_fHeight, textSize.width, textSize.height),
                    color: this.getColor(xIndex, yIndex, text),
                    dataX: xVal,
                    dataY: yVal
                };
                if (!this.shouldSkipLabel(xIndex, yIndex, label, cellWidth, cellHeight)) {
                    this.dataLabels.push(label);
                }
            }
        }
    };
    return NonUniformHeatMapDataLabelProvider;
}(HeatMapDataLabelProvider_1.HeatMapDataLabelProvider));
exports.NonUniformHeatMapDataLabelProvider = NonUniformHeatMapDataLabelProvider;
