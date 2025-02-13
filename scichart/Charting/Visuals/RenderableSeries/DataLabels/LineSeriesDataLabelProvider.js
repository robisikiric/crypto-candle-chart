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
exports.LineSeriesDataLabelProvider = void 0;
var Point_1 = require("../../../../Core/Point");
var DataLabelProviderType_1 = require("../../../../types/DataLabelProviderType");
var DataLabelProvider_1 = require("./DataLabelProvider");
var LineSeriesDataLabelProvider = /** @class */ (function (_super) {
    __extends(LineSeriesDataLabelProvider, _super);
    function LineSeriesDataLabelProvider(options) {
        var _this = this;
        var _a;
        _this = _super.call(this, options) || this;
        _this.type = DataLabelProviderType_1.EDataLabelProviderType.Line;
        _this.aboveBelowProperty = true;
        _this.aboveBelowProperty = (_a = options === null || options === void 0 ? void 0 : options.aboveBelow) !== null && _a !== void 0 ? _a : _this.aboveBelow;
        return _this;
    }
    Object.defineProperty(LineSeriesDataLabelProvider.prototype, "aboveBelow", {
        /**
         * Gets or Sets whether text should be positioned above the line if it is going down, and below the line if it going up.
         * Default true.  When true this overrides horizontalAnchorPoint and verticalAnchorPoint to be left, bottom.
         */
        get: function () {
            return this.aboveBelowProperty;
        },
        set: function (value) {
            this.aboveBelowProperty = value;
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    LineSeriesDataLabelProvider.prototype.generateDataLabels = function (renderContext, renderPassData) {
        var parent = this.parentSeries;
        this.yAdj = Math.ceil(parent.strokeThickness / 2);
        if (parent.pointMarker) {
            this.yAdj = Math.max(this.yAdj, Math.ceil(parent.pointMarker.height / 2));
        }
        _super.prototype.generateDataLabels.call(this, renderContext, renderPassData);
    };
    LineSeriesDataLabelProvider.prototype.getPosition = function (state, textBounds) {
        var _a, _b, _c, _d, _e, _f;
        if (this.aboveBelow) {
            var x = state.xCoord() + ((_b = (_a = this.style.padding) === null || _a === void 0 ? void 0 : _a.left) !== null && _b !== void 0 ? _b : 0);
            // Handle multiline
            var yOffset = textBounds.m_fHeight - textBounds.GetLineBounds(0).m_fHeight;
            var y = state.yCoord() - yOffset;
            if (state.hasNext()) {
                var nextY = state.yCoord(state.index + 1);
                var nextX = state.xCoord(state.index + 1);
                // Text anchor point is bottom left
                if ((nextX > x && nextY > y) || (nextX < x && nextY < y)) {
                    // going down - draw above
                    y -= this.yAdj + ((_d = (_c = state.style.padding) === null || _c === void 0 ? void 0 : _c.bottom) !== null && _d !== void 0 ? _d : 1);
                }
                else {
                    // going up - draw below
                    y += textBounds.m_fHeight + this.yAdj + ((_f = (_e = state.style.padding) === null || _e === void 0 ? void 0 : _e.top) !== null && _f !== void 0 ? _f : 1);
                }
            }
            return new Point_1.Point(x, y);
        }
        else {
            return _super.prototype.getPosition.call(this, state, textBounds);
        }
    };
    LineSeriesDataLabelProvider.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            aboveBelow: this.aboveBelow
        };
        Object.assign(json.options, options);
        return json;
    };
    return LineSeriesDataLabelProvider;
}(DataLabelProvider_1.DataLabelProvider));
exports.LineSeriesDataLabelProvider = LineSeriesDataLabelProvider;
