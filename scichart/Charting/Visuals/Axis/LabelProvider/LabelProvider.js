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
exports.LabelProvider = void 0;
var DeletableEntity_1 = require("../../../../Core/DeletableEntity");
/**
 * @summary A base class for Label Providers - types which allow programmatic overriding of Axis labels
 */
var LabelProvider = /** @class */ (function (_super) {
    __extends(LabelProvider, _super);
    /**
     *
     */
    function LabelProvider(options) {
        var _this = _super.call(this) || this;
        _this.numericFormatProperty = options === null || options === void 0 ? void 0 : options.labelFormat;
        _this.precisionProperty = options === null || options === void 0 ? void 0 : options.labelPrecision;
        _this.cursorNumericFormatProperty = options === null || options === void 0 ? void 0 : options.cursorLabelFormat;
        _this.cursorPrecisionProperty = options === null || options === void 0 ? void 0 : options.cursorLabelPrecision;
        _this.prefixProperty = options === null || options === void 0 ? void 0 : options.labelPrefix;
        _this.postfixProperty = options === null || options === void 0 ? void 0 : options.labelPostfix;
        return _this;
    }
    /**
     * Called when the {@link LabelProvider} is attached to an {@link AxisCore | Axis}
     * @param axis The Axis we are attached to.
     */
    LabelProvider.prototype.attachedToAxis = function (axis) {
        this.parentAxis = axis;
    };
    /**
     * Called when the {@link LabelProvider} is detached from an {@link AxisCore | Axis}
     * @param axis The Axis we are attached to.
     */
    LabelProvider.prototype.detachedFromAxis = function () {
        this.parentAxis = undefined;
    };
    Object.defineProperty(LabelProvider.prototype, "numericFormat", {
        /**
         * Gets or sets numeric format to use. For a list of values, see {@link ENumericFormat}
         */
        get: function () {
            return this.numericFormatProperty;
        },
        set: function (value) {
            this.numericFormatProperty = value;
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LabelProvider.prototype, "precision", {
        /**
         * Gets or sets the precision to use when formatting
         */
        get: function () {
            return this.precisionProperty;
        },
        set: function (value) {
            this.precisionProperty = value;
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LabelProvider.prototype, "cursorNumericFormat", {
        /**
         * Gets or sets numeric format to use for cursor labels. For a list of values, see {@link ENumericFormat}
         */
        get: function () {
            return this.cursorNumericFormatProperty;
        },
        set: function (value) {
            this.cursorNumericFormatProperty = value;
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LabelProvider.prototype, "cursorPrecision", {
        /**
         * Gets or sets the precision to use for cursors labels
         */
        get: function () {
            return this.cursorPrecisionProperty;
        },
        set: function (value) {
            this.cursorPrecisionProperty = value;
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LabelProvider.prototype, "prefix", {
        /**
         * Gets or sets a string to add to the beginning of each label
         */
        get: function () {
            return this.prefixProperty;
        },
        set: function (v) {
            this.prefixProperty = v;
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LabelProvider.prototype, "postfix", {
        /**
         * Gets or sets a string to add to the end of each label
         */
        get: function () {
            return this.postfixProperty;
        },
        set: function (v) {
            this.postfixProperty = v;
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LabelProvider.prototype, "formatLabel", {
        /**
         * Gets or sets a formatLabel function which is used for
         * formatting a data-value into a string for display on the axis labels.
         * If you are creating a custom LabelProvider, you should override formatLabelProperty, not the formatLabel property!
         * See our {@link https://www.scichart.com/javascript-chart-documentation Documentation}
         */
        get: function () {
            return this.formatLabelProperty;
        },
        set: function (value) {
            this.formatLabelProperty = value;
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LabelProvider.prototype, "formatCursorLabel", {
        /**
         * Gets or sets a formatCursorLabel function which is used for
         * formatting a data-value into a string for display on a cursor or tooltip
         * If you are creating a custom LabelProvider, you should override formatCursorLabelProperty,
         * not the formatCursorLabel property!
         * See our {@link https://www.scichart.com/javascript-chart-documentation Documentation}
         */
        get: function () {
            return this.formatCursorLabelProperty;
        },
        set: function (value) {
            this.formatCursorLabelProperty = value;
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    LabelProvider.prototype.applyFormat = function (value) {
        var _a, _b;
        return ((_a = this.prefix) !== null && _a !== void 0 ? _a : "") + value + ((_b = this.postfix) !== null && _b !== void 0 ? _b : "");
    };
    LabelProvider.prototype.toJSON = function () {
        var options = {
            cursorLabelFormat: this.cursorNumericFormat,
            cursorLabelPrecision: this.cursorPrecision,
            labelFormat: this.numericFormat,
            labelPrecision: this.precision,
            labelPrefix: this.prefix,
            labelPostfix: this.postfix
        };
        return { type: this.type, options: options };
    };
    LabelProvider.prototype.invalidateParent = function () {
        if (this.parentAxis && this.parentAxis.invalidateParentCallback) {
            this.parentAxis.invalidateParentCallback();
        }
    };
    return LabelProvider;
}(DeletableEntity_1.DeletableEntity));
exports.LabelProvider = LabelProvider;
