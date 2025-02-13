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
exports.BandSeriesDataLabelProvider = void 0;
var Point_1 = require("../../../../Core/Point");
var DataLabelProviderType_1 = require("../../../../types/DataLabelProviderType");
var NumericFormat_1 = require("../../../../types/NumericFormat");
var TextPosition_1 = require("../../../../types/TextPosition");
var number_1 = require("../../../../utils/number");
var DataLabelState_1 = require("./DataLabelState");
var LineSeriesDataLabelProvider_1 = require("./LineSeriesDataLabelProvider");
var BandSeriesDataLabelProvider = /** @class */ (function (_super) {
    __extends(BandSeriesDataLabelProvider, _super);
    function BandSeriesDataLabelProvider(options) {
        var _this = this;
        var _a;
        _this = _super.call(this, options) || this;
        _this.type = DataLabelProviderType_1.EDataLabelProviderType.Band;
        _this.singleLabelProperty = false;
        _this.singleLabelProperty = (_a = options === null || options === void 0 ? void 0 : options.singleLabel) !== null && _a !== void 0 ? _a : _this.singleLabelProperty;
        return _this;
    }
    Object.defineProperty(BandSeriesDataLabelProvider.prototype, "singleLabel", {
        /**
         * Gets or Sets whether to render a single label with both y and y1 values, in the center of the band, or separate labels for each line.
         * Default false.
         */
        get: function () {
            return this.singleLabelProperty;
        },
        set: function (value) {
            this.singleLabelProperty = value;
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    BandSeriesDataLabelProvider.prototype.getText = function (state) {
        if (this.singleLabel) {
            this.state1.index = state.index;
            if (this.metaDataSelector) {
                var index = state.renderPassData.pointSeries.indexes.get(state.index);
                return this.metaDataSelector(state.parentSeries.dataSeries.getMetadataAt(index));
            }
            var usefinal = !this.updateTextInAnimation && state.parentSeries.isRunningAnimation;
            var yval = usefinal ? state.yValAfterAnimation() : state.yVal();
            var y1val = usefinal ? this.state1.yValAfterAnimation() : this.state1.yVal();
            return this.getSingleLabelText(state.xVal(), yval, y1val);
        }
        else {
            return _super.prototype.getText.call(this, state);
        }
    };
    BandSeriesDataLabelProvider.prototype.getSingleLabelText = function (xVal, yVal, y1Val) {
        var _a, _b, _c, _d;
        if (yVal === yVal || y1Val === y1Val) {
            var text = "";
            if (yVal === yVal)
                text = (0, number_1.formatNumber)(yVal, (_a = this.numericFormat) !== null && _a !== void 0 ? _a : NumericFormat_1.ENumericFormat.Decimal, (_b = this.precision) !== null && _b !== void 0 ? _b : 1);
            if (yVal === yVal && y1Val === y1Val)
                text += "\n";
            if (y1Val === y1Val)
                text += (0, number_1.formatNumber)(y1Val, (_c = this.numericFormat) !== null && _c !== void 0 ? _c : NumericFormat_1.ENumericFormat.Decimal, (_d = this.precision) !== null && _d !== void 0 ? _d : 1);
            return text;
        }
        else {
            return undefined;
        }
    };
    BandSeriesDataLabelProvider.prototype.getPosition = function (state, textBounds) {
        var _a, _b, _c, _d;
        if (this.singleLabel) {
            var x = state.xCoord();
            if (this.horizontalTextPosition === TextPosition_1.EHorizontalTextPosition.Center) {
                x -= textBounds.m_fWidth / 2;
            }
            else if (this.horizontalTextPosition === TextPosition_1.EHorizontalTextPosition.Left) {
                x -= textBounds.m_fWidth + ((_b = (_a = this.style.padding) === null || _a === void 0 ? void 0 : _a.right) !== null && _b !== void 0 ? _b : 0);
            }
            else {
                x += (_d = (_c = this.style.padding) === null || _c === void 0 ? void 0 : _c.right) !== null && _d !== void 0 ? _d : 0;
            }
            // Handle multiline
            var yOffset = textBounds.m_fHeight - textBounds.GetLineBounds(0).m_fHeight;
            var y = state.yCoord();
            var y1 = this.state1.yCoord();
            var yPos = (y + y1) / 2 - yOffset;
            if (this.verticalTextPosition === TextPosition_1.EVerticalTextPosition.Center) {
                yPos += textBounds.m_fHeight / 2;
            }
            else if (this.verticalTextPosition === TextPosition_1.EVerticalTextPosition.Below) {
                yPos += textBounds.m_fHeight;
            }
            return new Point_1.Point(x, yPos);
        }
        else {
            return _super.prototype.getPosition.call(this, state, textBounds);
        }
    };
    /**
     * When doing separate labels for each line (ie singleLabel = false) this is used to create a provider to generate the labels for the y1 series.
     * By default this creates a LineSeriesDataLabelProvider using the same options as on the current provider.
     */
    BandSeriesDataLabelProvider.prototype.getY1Provider = function (yProvider) {
        return new LineSeriesDataLabelProvider_1.LineSeriesDataLabelProvider(yProvider.toJSON().options);
    };
    /** Generates labels using getText, getPosition, getColor.  Overrides manually set labels. */
    BandSeriesDataLabelProvider.prototype.generateDataLabels = function (renderContext, renderPassData) {
        var _a;
        if (!this.singleLabel) {
            _super.prototype.generateDataLabels.call(this, renderContext, renderPassData);
            var y1Provider = this.getY1Provider(this);
            y1Provider.ySelector = function (ps) { return ps.y1Values; };
            y1Provider.onAttach(this.webAssemblyContext, this.parentSeries);
            y1Provider.generateDataLabels(renderContext, renderPassData);
            (_a = this.dataLabels).push.apply(_a, y1Provider.dataLabels);
        }
        else {
            var y1Values = renderPassData.pointSeries.y1Values;
            this.state1 = new DataLabelState_1.DataLabelState(renderContext, renderPassData, this.style, this.color, y1Values, this.parentSeries);
            _super.prototype.generateDataLabels.call(this, renderContext, renderPassData);
        }
    };
    BandSeriesDataLabelProvider.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            singleLabel: this.singleLabel
        };
        Object.assign(json.options, options);
        return json;
    };
    return BandSeriesDataLabelProvider;
}(LineSeriesDataLabelProvider_1.LineSeriesDataLabelProvider));
exports.BandSeriesDataLabelProvider = BandSeriesDataLabelProvider;
