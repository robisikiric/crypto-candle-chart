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
exports.ContoursDataLabelProvider = void 0;
var Point_1 = require("../../../../Core/Point");
var Rect_1 = require("../../../../Core/Rect");
var DataLabelProviderType_1 = require("../../../../types/DataLabelProviderType");
var NumericFormat_1 = require("../../../../types/NumericFormat");
var Size_1 = require("../../../../types/Size");
var number_1 = require("../../../../utils/number");
var parseColor_1 = require("../../../../utils/parseColor");
var NativeObject_1 = require("../../Helpers/NativeObject");
var DpiHelper_1 = require("../../TextureManager/DpiHelper");
var BaseDataLabelProvider_1 = require("./BaseDataLabelProvider");
var ContoursDataLabelProvider = /** @class */ (function (_super) {
    __extends(ContoursDataLabelProvider, _super);
    function ContoursDataLabelProvider(options) {
        var _this = this;
        var _a, _b, _c, _d;
        _this = _super.call(this, options) || this;
        _this.type = DataLabelProviderType_1.EDataLabelProviderType.Contours;
        _this.isEnabledProperty = true;
        _this.numericFormatProperty = NumericFormat_1.ENumericFormat.Decimal;
        _this.precisionProperty = 1;
        _this.labelRowCountProperty = 10;
        _this.numericFormatProperty = (_a = options === null || options === void 0 ? void 0 : options.numericFormat) !== null && _a !== void 0 ? _a : _this.numericFormatProperty;
        _this.precision = (_b = options === null || options === void 0 ? void 0 : options.precision) !== null && _b !== void 0 ? _b : _this.precisionProperty;
        _this.labelRowCountProperty = (_c = options === null || options === void 0 ? void 0 : options.labelRowCount) !== null && _c !== void 0 ? _c : _this.labelRowCountProperty;
        _this.metaDataSelector = options === null || options === void 0 ? void 0 : options.metaDataSelector;
        _this.isEnabledProperty = (_d = options === null || options === void 0 ? void 0 : options.isEnabled) !== null && _d !== void 0 ? _d : _this.isEnabledProperty;
        return _this;
    }
    Object.defineProperty(ContoursDataLabelProvider.prototype, "numericFormat", {
        /**
         * Gets or sets numeric format to use when formatting values to text. For a list of values, see {@link ENumericFormat}
         * For more control, override getText
         */
        get: function () {
            return this.numericFormatProperty;
        },
        set: function (value) {
            var _a;
            this.numericFormatProperty = value;
            (_a = this.parentSeries) === null || _a === void 0 ? void 0 : _a.invalidateParentCallback();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContoursDataLabelProvider.prototype, "precision", {
        /**
         * Gets or sets the precision to use when formatting values to text
         * For more control, override getText
         */
        get: function () {
            return this.precisionProperty;
        },
        set: function (value) {
            var _a;
            this.precisionProperty = value;
            (_a = this.parentSeries) === null || _a === void 0 ? void 0 : _a.invalidateParentCallback();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContoursDataLabelProvider.prototype, "labelRowCount", {
        /**
         * Gets or sets the number of rows of data labels. Default 10
         */
        get: function () {
            return this.labelRowCountProperty;
        },
        set: function (value) {
            var _a;
            this.labelRowCountProperty = value;
            (_a = this.parentSeries) === null || _a === void 0 ? void 0 : _a.invalidateParentCallback();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContoursDataLabelProvider.prototype, "isEnabled", {
        /** Flag to enable/disable dataLabel generation.  Default true */
        get: function () {
            return this.isEnabledProperty;
        },
        /** Flag to enable/disable dataLabel generation.  Default true */
        set: function (value) {
            if (this.isEnabledProperty !== value) {
                this.isEnabledProperty = value;
                this.invalidateParent();
            }
        },
        enumerable: false,
        configurable: true
    });
    ContoursDataLabelProvider.prototype.getText = function (xIndex, yIndex) {
        var _a, _b;
        if (this.metaDataSelector) {
            return this.metaDataSelector(this.dataSeries.getMetadataAt(yIndex, xIndex));
        }
        var z = this.zValues[yIndex][xIndex];
        if (z === z) {
            // Fast isNaN check
            return (0, number_1.formatNumber)(z, (_a = this.numericFormat) !== null && _a !== void 0 ? _a : NumericFormat_1.ENumericFormat.Decimal, (_b = this.precision) !== null && _b !== void 0 ? _b : 1);
        }
        else {
            return undefined;
        }
    };
    ContoursDataLabelProvider.prototype.getPosition = function (xIndex, yIndex, xVal, yVal, textSize, renderPassData) {
        var x = renderPassData.xCoordinateCalculator.getCoordinate(xVal);
        var y = renderPassData.yCoordinateCalculator.getCoordinate(yVal);
        if (renderPassData.isVerticalChart) {
            var c = x;
            x = y;
            y = c;
        }
        return new Point_1.Point(x, y);
    };
    ContoursDataLabelProvider.prototype.shouldGenerate = function (textSize, cellWidth, cellHeight) {
        return textSize.height < cellHeight && textSize.width < cellWidth;
    };
    ContoursDataLabelProvider.prototype.getColor = function (xIndex, yIndex, text) {
        return this.colorValue;
    };
    ContoursDataLabelProvider.prototype.shouldSkipLabel = function (xIndex, yIndex, label, cellWidth, cellHeight) {
        // Skip if out of bounds
        var svr = this.parentSeries.parentSurface.seriesViewRect;
        // const yMax = state.renderPassData.isVerticalChart ? svr.width : svr.height;
        if (label.rect.y < 0 || label.rect.bottom > svr.height)
            return true;
        // const xMax = state.renderPassData.isVerticalChart ? svr.height : svr.width;
        if (label.rect.x < 0 || label.rect.right > svr.width)
            return true;
        return false;
    };
    ContoursDataLabelProvider.prototype.generateDataLabels = function (renderContext, renderPassData) {
        var _a, _b, _c, _d;
        // clear any previous labels
        this.dataLabels = [];
        if (!this.isEnabled || !this.style || !this.style.fontFamily || !this.style.fontSize) {
            return;
        }
        this.dataSeries = this.parentSeries.dataSeries;
        this.zValues = this.dataSeries.getZValues();
        // this.state = new DataLabelState(renderContext, renderPassData, this.style, yValues, this.parentSeries);
        var bounds = (0, NativeObject_1.getTextBounds)(this.webAssemblyContext);
        var dpiAdjustedStyle = DpiHelper_1.DpiHelper.adjustTextStyle(this.style);
        var font = renderContext.getFont(dpiAdjustedStyle);
        var cellWidth = Math.abs(renderPassData.xCoordinateCalculator.getCoordinate(this.dataSeries.getXValue(1)) -
            renderPassData.xCoordinateCalculator.getCoordinate(this.dataSeries.getXValue(0)));
        var cellHeight = Math.abs(renderPassData.yCoordinateCalculator.getCoordinate(this.dataSeries.getYValue(1)) -
            renderPassData.yCoordinateCalculator.getCoordinate(this.dataSeries.getYValue(0)));
        //if (!this.shouldGenerate(new Size(bounds.m_fWidth, bounds.m_fHeight), cellWidth, cellHeight)) return;
        this.colorValue = (0, parseColor_1.parseColorToUIntArgb)(this.color);
        var _e = this.parentSeries.dataSeries, xStart = _e.xStart, xStep = _e.xStep, yStart = _e.yStart, yStep = _e.yStep;
        var contourParams = this.parentSeries.getContourDrawingParams();
        var zStep = contourParams.majorStepZ;
        var yInc = (contourParams.yMax - contourParams.yMin) / (this.labelRowCount + 1);
        var lasty = yStart;
        for (var yIndex = 0; yIndex < this.dataSeries.arrayHeight; yIndex++) {
            var y = yStart + yStep * yIndex;
            if (y <= lasty + yInc)
                continue;
            lasty = y;
            if (renderPassData.yCoordinateCalculator.visibleMin > y + yStep ||
                renderPassData.yCoordinateCalculator.visibleMax < y)
                continue;
            var lastZ = undefined;
            for (var xIndex = 0; xIndex < this.dataSeries.arrayWidth; xIndex++) {
                var x = xStart + xStep * xIndex;
                if (renderPassData.xCoordinateCalculator.visibleMin > x + xStep ||
                    renderPassData.xCoordinateCalculator.visibleMax < x)
                    continue;
                var z = this.zValues[yIndex][xIndex];
                var text = undefined;
                var lineX = x;
                if (lastZ !== undefined) {
                    var prevZ = Math.floor(lastZ / zStep) * zStep;
                    var nextZ = prevZ + zStep;
                    if (z <= prevZ) {
                        text = (0, number_1.formatNumber)(prevZ, (_a = this.numericFormat) !== null && _a !== void 0 ? _a : NumericFormat_1.ENumericFormat.Decimal, (_b = this.precision) !== null && _b !== void 0 ? _b : 1);
                        lineX = (xStep * (prevZ - z)) / (lastZ - z) - xStep / 2 + x;
                    }
                    else if (z >= nextZ) {
                        text = (0, number_1.formatNumber)(nextZ, (_c = this.numericFormat) !== null && _c !== void 0 ? _c : NumericFormat_1.ENumericFormat.Decimal, (_d = this.precision) !== null && _d !== void 0 ? _d : 1);
                        lineX = (xStep * (nextZ - z)) / (z - lastZ) - xStep / 2 + x;
                    }
                }
                lastZ = z;
                if (!text) {
                    continue;
                }
                font.CalculateStringBounds(text !== null && text !== void 0 ? text : "", bounds, 2);
                var textSize = new Size_1.Size(bounds.m_fWidth, bounds.m_fHeight);
                var xVal = this.dataSeries.getXValue(xIndex);
                var yVal = this.dataSeries.getYValue(yIndex);
                var position = this.getPosition(xIndex, yIndex, lineX, yVal, textSize, renderPassData);
                var label = {
                    text: text,
                    position: position,
                    rect: new Rect_1.Rect(position.x, position.y - bounds.GetLineBounds(0).m_fHeight, textSize.width, textSize.height),
                    color: this.getColor(xIndex, yIndex, text),
                    dataX: this.dataSeries.getXValue(xIndex),
                    dataY: this.dataSeries.getYValue(yIndex)
                };
                // if (!this.shouldSkipLabel(xIndex, yIndex, label, cellWidth, cellHeight)) {
                this.dataLabels.push(label);
                // }
            }
        }
    };
    ContoursDataLabelProvider.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            numericFormat: this.numericFormat,
            precision: this.precision,
            labelRowCount: this.labelRowCount,
            isEnabled: this.isEnabled
        };
        Object.assign(json.options, options);
        return json;
    };
    return ContoursDataLabelProvider;
}(BaseDataLabelProvider_1.BaseDataLabelProvider));
exports.ContoursDataLabelProvider = ContoursDataLabelProvider;
