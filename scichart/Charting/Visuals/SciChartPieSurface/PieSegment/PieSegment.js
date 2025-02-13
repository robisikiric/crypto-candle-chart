"use strict";
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
exports.PieSegment = void 0;
var classFactory_1 = require("../../../../Builder/classFactory");
var Point_1 = require("../../../../Core/Point");
var BaseType_1 = require("../../../../types/BaseType");
var guid_1 = require("../../../../utils/guid");
var PieLabelProvider_1 = require("../../Axis/LabelProvider/PieLabelProvider");
var constants_1 = require("./constants");
var PieSegment = /** @class */ (function () {
    function PieSegment(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this.colorProperty = "grey";
        this.isSelectedProperty = false;
        this.textProperty = "";
        this.deltaProperty = 15;
        this.shiftProperty = 0;
        this.labelOffsetProperty = new Point_1.Point(0, 0);
        this.radiusAdjustmentProperty = 1;
        this.id = (_a = options === null || options === void 0 ? void 0 : options.id) !== null && _a !== void 0 ? _a : (0, guid_1.generateGuid)();
        this.colorProperty = (_b = options === null || options === void 0 ? void 0 : options.color) !== null && _b !== void 0 ? _b : this.colorProperty;
        this.colorLinearGradientProperty = (_c = options === null || options === void 0 ? void 0 : options.colorLinearGradient) !== null && _c !== void 0 ? _c : this.colorLinearGradientProperty;
        this.isSelectedProperty = (_d = options === null || options === void 0 ? void 0 : options.isSelected) !== null && _d !== void 0 ? _d : this.isSelectedProperty;
        this.textProperty = (_e = options === null || options === void 0 ? void 0 : options.text) !== null && _e !== void 0 ? _e : this.textProperty;
        this.valueProperty = (_f = options === null || options === void 0 ? void 0 : options.value) !== null && _f !== void 0 ? _f : this.valueProperty;
        this.deltaProperty = (_g = options === null || options === void 0 ? void 0 : options.delta) !== null && _g !== void 0 ? _g : this.deltaProperty;
        this.showLabelProperty = (_h = options === null || options === void 0 ? void 0 : options.showLabel) !== null && _h !== void 0 ? _h : true;
        if (options === null || options === void 0 ? void 0 : options.labelProvider) {
            if (!("getSegmentText" in (options === null || options === void 0 ? void 0 : options.labelProvider))) {
                options.labelProvider = (0, classFactory_1.createType)(BaseType_1.EBaseType.LabelProvider, options.labelProvider.type, undefined, options.labelProvider.options);
            }
        }
        this.labelProviderProperty = options === null || options === void 0 ? void 0 : options.labelProvider; // No default here as we default to labelprovider on parent surface
        this.labelOffsetProperty = (_j = options === null || options === void 0 ? void 0 : options.labelOffset) !== null && _j !== void 0 ? _j : this.labelOffsetProperty;
        this.labelStyleProperty = options === null || options === void 0 ? void 0 : options.labelStyle;
        this.radiusAdjustmentProperty = (_k = options === null || options === void 0 ? void 0 : options.radiusAdjustment) !== null && _k !== void 0 ? _k : this.radiusAdjustmentProperty;
    }
    PieSegment.prototype.onAttach = function (scps) {
        this.parentSurface = scps;
        if (this.labelProviderProperty) {
            this.labelProviderProperty.attachedToSurface(scps);
        }
        this.invalidateParentCallback = scps.invalidateElement;
    };
    PieSegment.prototype.onDetach = function () {
        this.invalidateParentCallback = undefined;
    };
    Object.defineProperty(PieSegment.prototype, "showLabel", {
        // GETTERS AND SETTERS FOR PROPERTIES
        /**
         * When true, show the label on this pie segment, else false
         */
        get: function () {
            return this.showLabelProperty;
        },
        /**
         * When true, show the label on this pie segment, else false
         */
        set: function (value) {
            this.showLabelProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.SHOW_LABEL);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PieSegment.prototype, "colorLinearGradient", {
        /**
         * An optional color gradient
         */
        get: function () {
            return this.colorLinearGradientProperty;
        },
        /**
         * An optional color gradient
         */
        set: function (value) {
            this.colorLinearGradientProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.COLOR_LINEAR_GRADIENT);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PieSegment.prototype, "color", {
        /**
         * The color of the segment as an HTML color code
         */
        get: function () {
            return this.colorProperty;
        },
        /**
         * The color of the segment as an HTML color code
         */
        set: function (value) {
            this.colorProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.COLOR);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PieSegment.prototype, "isSelected", {
        /**
         * Whether the segment is selected.  Selected segments are shifted outwards by the delta
         */
        get: function () {
            return this.isSelectedProperty;
        },
        /**
         * Whether the segment is selected.  Selected segments are shifted outwards by the delta
         */
        set: function (value) {
            if (this.isSelectedProperty !== value) {
                this.isSelectedProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.IS_SELECTED);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PieSegment.prototype, "text", {
        /**
         * A text value for the segment which will be displayed in the legend
         */
        get: function () {
            return this.textProperty;
        },
        /**
         * A text value for the segment which will be displayed in the legend
         */
        set: function (value) {
            this.textProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.TEXT);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PieSegment.prototype, "labelProvider", {
        /**
         * Optional class that can override the default label formatting for this segment only.  Must be or inherit from {@link PieLabelProvider}
         */
        get: function () {
            // Create a labelProvider if it is accessed.  This will override behaviour from the parent surface
            if (this.labelProviderProperty === undefined) {
                this.labelProvider = new PieLabelProvider_1.PieLabelProvider();
            }
            return this.labelProviderProperty;
        },
        /**
         * Optional class that can override the default label formatting for this segment only.  Must be or inherit from {@link PieLabelProvider}
         */
        set: function (value) {
            this.labelProviderProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.LABEL_PROVIDER);
        },
        enumerable: false,
        configurable: true
    });
    PieSegment.prototype.getPercentage = function (total) {
        return (100 * this.value) / total;
    };
    Object.defineProperty(PieSegment.prototype, "value", {
        /**
         * The numerical value of the segment
         */
        get: function () {
            return this.valueProperty;
        },
        /**
         * The numerical value of the segment
         */
        set: function (value) {
            this.oldValueProperty = this.valueProperty;
            this.valueProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.VALUE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PieSegment.prototype, "oldValue", {
        /**
         * The previous value of the segment, if it has been updated.  Used for animations
         */
        get: function () {
            return this.oldValueProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PieSegment.prototype, "delta", {
        /**
         * The amount to shift the segment when it is selected.  Default 15 px
         */
        get: function () {
            return this.deltaProperty;
        },
        /**
         * The amount to shift the segment when it is selected.  Default 15 px
         */
        set: function (value) {
            if (this.deltaProperty !== value) {
                this.deltaProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.DELTA);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PieSegment.prototype, "shift", {
        /**
         * The amount the segment is shifted radially outwards.  Automatically set during selected/deselection animations
         * Do not set this directly.  Use delta and isSelected instead
         */
        get: function () {
            return this.shiftProperty;
        },
        /**
         * The amount the segment is shifted radially outwards.  Automatically set during selected/deselection animations
         */
        set: function (value) {
            if (this.shiftProperty !== value) {
                this.shiftProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.SHIFT);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PieSegment.prototype, "labelStyle", {
        /**
         * Gets or sets a {@link TTextStyle} object for styling labels for this segment only
         */
        get: function () {
            var _a;
            return __assign(__assign({}, (_a = this.parentSurface) === null || _a === void 0 ? void 0 : _a.labelStyle), this.labelStyleProperty);
        },
        /**
         * Gets or sets a {@link TTextStyle} object for styling labels for this segment only
         */
        set: function (textStyle) {
            this.labelStyleProperty = __assign(__assign({}, this.labelStyleProperty), textStyle);
            this.notifyPropertyChanged(constants_1.PROPERTY.LABEL_STYLE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PieSegment.prototype, "labelOffset", {
        /**
         * An x, y offset for the label position
         */
        get: function () {
            return this.labelOffsetProperty;
        },
        /**
         * An x, y offset for the label position
         */
        set: function (value) {
            var _a, _b;
            if (((_a = this.labelOffsetProperty) === null || _a === void 0 ? void 0 : _a.x) !== value.x && ((_b = this.labelOffsetProperty) === null || _b === void 0 ? void 0 : _b.y) !== value.y) {
                this.labelOffsetProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.LABEL_OFFSET);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PieSegment.prototype, "radiusAdjustment", {
        /**
         * A relative adjustment of the radius for this segment. eg 1.5 will be 50% larger than normal
         */
        get: function () {
            return this.radiusAdjustmentProperty;
        },
        /**
         * A relative adjustment of the radius for this segment. eg 1.5 will be 50% larger than normal
         */
        set: function (value) {
            this.radiusAdjustmentProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.RADIUS_ADJUSTMENT);
        },
        enumerable: false,
        configurable: true
    });
    PieSegment.prototype.toJSON = function () {
        var _a;
        return {
            id: this.id,
            color: this.color,
            colorLinearGradient: this.colorLinearGradient,
            isSelected: this.isSelected,
            delta: this.delta,
            text: this.text,
            value: this.value,
            // @ts-ignore
            labelProvider: (_a = this.labelProviderProperty) === null || _a === void 0 ? void 0 : _a.toJSON(),
            labelOffset: this.labelOffset,
            labelStyle: this.labelStyle,
            radiusAdjustment: this.radiusAdjustment
        };
    };
    PieSegment.prototype.getLabelText = function (total) {
        if (this.labelProviderProperty) {
            return this.labelProvider.getSegmentText(this, total);
        }
        else {
            return this.parentSurface.labelProvider.getSegmentText(this, total);
        }
    };
    PieSegment.prototype.notifyPropertyChanged = function (propertyName) {
        if (propertyName === constants_1.PROPERTY.LABEL_PROVIDER && this.labelProviderProperty) {
            this.labelProviderProperty.attachedToSurface(this.parentSurface);
        }
        if (this.invalidateParentCallback) {
            this.invalidateParentCallback(propertyName);
        }
    };
    return PieSegment;
}());
exports.PieSegment = PieSegment;
