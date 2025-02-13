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
exports.RubberBandSvgRect = void 0;
var DeletableEntity_1 = require("../../../Core/DeletableEntity");
var constants_1 = require("./constants");
/**
 * Used by the {@link RubberBandXyZoomModifier} to draw an {@link SVGSVGElement | SVGElement} rectangle over the chart.
 */
var RubberBandSvgRect = /** @class */ (function (_super) {
    __extends(RubberBandSvgRect, _super);
    function RubberBandSvgRect(svgRoot, fill, stroke, strokeThickness) {
        var _this = _super.call(this) || this;
        _this.svgTemplate = svgTemplate;
        _this.x1Property = 0;
        _this.x2Property = 0;
        _this.y1Property = 0;
        _this.y2Property = 0;
        _this.isHiddenProperty = true;
        _this.svgRoot = svgRoot;
        _this.create(fill, stroke, strokeThickness);
        return _this;
    }
    Object.defineProperty(RubberBandSvgRect.prototype, "x1", {
        /**
         * Gets the X1 value, the value is not scaled
         */
        get: function () {
            return this.x1Property;
        },
        /**
         * Sets the X1 value, the value must be not scaled
         */
        set: function (value) {
            this.x1Property = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.X1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RubberBandSvgRect.prototype, "x2", {
        /**
         * Gets the X2 value, the value is not scaled
         */
        get: function () {
            return this.x2Property;
        },
        /**
         * Sets the X2 value, the value must be not scaled
         */
        set: function (value) {
            this.x2Property = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.X2);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RubberBandSvgRect.prototype, "y1", {
        /**
         * Gets the Y1 value, the value is not scaled
         */
        get: function () {
            return this.y1Property;
        },
        /**
         * Sets the Y1 value, the value must be not scaled
         */
        set: function (value) {
            this.y1Property = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.Y1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RubberBandSvgRect.prototype, "y2", {
        /**
         * Gets the Y2 value, the value is not scaled
         */
        get: function () {
            return this.y2Property;
        },
        /**
         * Sets the Y2 value, the value must be not scaled
         */
        set: function (value) {
            this.y2Property = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.Y2);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RubberBandSvgRect.prototype, "isHidden", {
        /**
         * Gets isHidden property
         */
        get: function () {
            return this.isHiddenProperty;
        },
        /**
         * Sets isHidden property
         */
        set: function (value) {
            this.isHiddenProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.IS_HIDDEN);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Clear the rect svg
     */
    RubberBandSvgRect.prototype.clear = function () {
        this.svgRoot.removeChild(this.svg);
    };
    /**
     * Deletes the rect
     */
    RubberBandSvgRect.prototype.delete = function () {
        this.clear();
    };
    // PRIVATE
    RubberBandSvgRect.prototype.create = function (fill, stroke, strokeThickness) {
        if (this.svg) {
            this.clear();
        }
        if (this.svgRoot) {
            var svgNode = this.svgTemplate(fill, stroke, strokeThickness, 0, 0);
            this.svgRoot.appendChild(svgNode);
            this.svg = svgNode;
            this.svg.setAttribute("x", "100px");
            this.svg.setAttribute("y", "100px");
        }
    };
    RubberBandSvgRect.prototype.update = function (propertyName) {
        if (this.svgRoot) {
            if (propertyName === constants_1.PROPERTY.IS_HIDDEN) {
                this.svg.style.display = this.isHidden ? "none" : "block";
            }
            if (propertyName === constants_1.PROPERTY.X1 || propertyName === constants_1.PROPERTY.X2) {
                var width = Math.abs(this.x2 - this.x1);
                this.svg.setAttribute("x", this.x1.toString());
                this.svg.setAttribute("width", "".concat(width, "px"));
            }
            if (propertyName === constants_1.PROPERTY.Y1 || propertyName === constants_1.PROPERTY.Y2) {
                var height = Math.abs(this.y2 - this.y1);
                this.svg.setAttribute("y", this.y1.toString());
                this.svg.setAttribute("height", "".concat(height, "px"));
            }
        }
    };
    RubberBandSvgRect.prototype.notifyPropertyChanged = function (propertyName) {
        this.update(propertyName);
    };
    return RubberBandSvgRect;
}(DeletableEntity_1.DeletableEntity));
exports.RubberBandSvgRect = RubberBandSvgRect;
/**
 * @ignore
 * This is a CSP style-src safe method to create SVGs
 */
var svgTemplate = function (fill, stroke, strokeThickness, width, height) {
    if (width === void 0) { width = 0; }
    if (height === void 0) { height = 0; }
    var xmlns = "http://www.w3.org/2000/svg";
    var svgElem = document.createElementNS(xmlns, "svg");
    svgElem.setAttributeNS(null, "width", width.toString());
    svgElem.setAttributeNS(null, "height", height.toString());
    svgElem.style.display = "none";
    var rectElem = document.createElementNS(xmlns, "rect");
    svgElem.appendChild(rectElem);
    rectElem.setAttributeNS(null, "width", "100%");
    rectElem.setAttributeNS(null, "height", "100%");
    rectElem.setAttributeNS(null, "fill", fill);
    rectElem.setAttributeNS(null, "stroke", stroke);
    rectElem.setAttributeNS(null, "stroke-width", strokeThickness.toString());
    return svgElem;
};
