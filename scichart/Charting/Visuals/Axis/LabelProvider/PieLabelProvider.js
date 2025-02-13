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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PieLabelProvider = void 0;
var LabelProviderType_1 = require("../../../../types/LabelProviderType");
var NumericFormat_1 = require("../../../../types/NumericFormat");
var number_1 = require("../../../../utils/number");
var SciChartPieSurface_1 = require("../../SciChartPieSurface/SciChartPieSurface");
var LabelProvider_1 = require("./LabelProvider");
/**
 * @summary A Label Provider for use with Pie Charts to allow customizing of segment labels
 * To completely customise the label output, override {@link getSegmentText}
 * To just adjust the numeric formatting of the label, use numericformat, precision, prefix, postfix, or override {@link formatLabel}
 */
var PieLabelProvider = /** @class */ (function (_super) {
    __extends(PieLabelProvider, _super);
    function PieLabelProvider(options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, __assign({ labelFormat: (_a = options === null || options === void 0 ? void 0 : options.labelFormat) !== null && _a !== void 0 ? _a : NumericFormat_1.ENumericFormat.Decimal, labelPrecision: (_b = options === null || options === void 0 ? void 0 : options.labelPrecision) !== null && _b !== void 0 ? _b : 2 }, options)) || this;
        _this.type = LabelProviderType_1.ELabelProviderType.Pie;
        _this.formatLabelProperty = function (dataValue) {
            return _this.applyFormat((0, number_1.formatNumber)(dataValue, _this.numericFormat, _this.precision)) +
                (_this.parentSurface.valueMode === SciChartPieSurface_1.EPieValueMode.Percentage ? " %" : "");
        };
        return _this;
    }
    PieLabelProvider.prototype.delete = function () { };
    /**
     * Get the text to be used as the segmet label. This picks the raw value, or percentage depending on the chart's valueMode
     * then formats it using the {@link formatLabel} function.
     * @param segment The PieSegment to get a label for
     * @param total Total of all pieSegment values
     */
    PieLabelProvider.prototype.getSegmentText = function (segment, total) {
        var labelValue = this.parentSurface.valueMode === SciChartPieSurface_1.EPieValueMode.Percentage ? segment.getPercentage(total) : segment.value;
        return this.formatLabel(labelValue);
    };
    /**
     * Called when the {@link LabelProvider} is attached to an {@link SciChartPieSurface }
     * @param pieSurface The SciPieSurface we are attached to.
     */
    PieLabelProvider.prototype.attachedToSurface = function (pieSurface) {
        this.parentSurface = pieSurface;
    };
    /**
     * @inheritDoc
     */
    PieLabelProvider.prototype.onBeginAxisDraw = function () {
        // TODO: user can override here if they want
    };
    PieLabelProvider.prototype.invalidateParent = function () {
        if (this.parentSurface && this.parentSurface.invalidateElement) {
            this.parentSurface.invalidateElement();
        }
    };
    return PieLabelProvider;
}(LabelProvider_1.LabelProvider));
exports.PieLabelProvider = PieLabelProvider;
