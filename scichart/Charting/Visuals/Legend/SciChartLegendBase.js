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
exports.getLegendContainerHtml = exports.getLegendItemHtml = exports.SciChartLegendBase = exports.ELegendType = exports.ELegendPlacement = exports.ELegendOrientation = void 0;
var app_1 = require("../../../constants/app");
var DeletableEntity_1 = require("../../../Core/DeletableEntity");
var html_1 = require("../../../utils/html");
/**
 * Enumeration constants to define legend orientation
 */
var ELegendOrientation;
(function (ELegendOrientation) {
    ELegendOrientation[ELegendOrientation["Vertical"] = 0] = "Vertical";
    ELegendOrientation[ELegendOrientation["Horizontal"] = 1] = "Horizontal";
})(ELegendOrientation = exports.ELegendOrientation || (exports.ELegendOrientation = {}));
/**
 * Enumeration constants to define legend placement
 */
var ELegendPlacement;
(function (ELegendPlacement) {
    ELegendPlacement[ELegendPlacement["TopLeft"] = 0] = "TopLeft";
    ELegendPlacement[ELegendPlacement["TopRight"] = 1] = "TopRight";
    ELegendPlacement[ELegendPlacement["BottomLeft"] = 2] = "BottomLeft";
    ELegendPlacement[ELegendPlacement["BottomRight"] = 3] = "BottomRight";
    // ManualPlacement
})(ELegendPlacement = exports.ELegendPlacement || (exports.ELegendPlacement = {}));
/**
 * Enumeration constants to define the legend type
 */
var ELegendType;
(function (ELegendType) {
    ELegendType["SciChartLegend"] = "SciChartLegend";
    ELegendType["ManualLegend"] = "ManualLegend";
    ELegendType["SciChartPieLegend"] = "SciChartPieLegend";
})(ELegendType = exports.ELegendType || (exports.ELegendType = {}));
/**
 * Base class for legends in the SciChart library
 */
var SciChartLegendBase = /** @class */ (function (_super) {
    __extends(SciChartLegendBase, _super);
    function SciChartLegendBase(options) {
        var _this = this;
        var _a, _b, _c, _d, _e;
        _this = _super.call(this) || this;
        _this.orientationProperty = ELegendOrientation.Vertical;
        _this.showLegendProperty = true;
        _this.placementProperty = ELegendPlacement.TopLeft;
        _this.marginProperty = 10;
        _this.isDirty = true;
        _this.eventListenersCollection = new Map();
        /**
         * removes event listeners from a specific {@link IRenderableSeries} series
         */
        _this.removeEventListenerFromSeries = function (renderableSeriesId) {
            var _a;
            (_a = _this.eventListenersCollection.get(renderableSeriesId)) === null || _a === void 0 ? void 0 : _a.forEach(function (_a) {
                var element = _a.element, eventListener = _a.eventListener, eventType = _a.eventType;
                element.removeEventListener(eventType, eventListener);
            });
            _this.eventListenersCollection.delete(renderableSeriesId);
        };
        _this.orientationProperty = (_a = options === null || options === void 0 ? void 0 : options.orientation) !== null && _a !== void 0 ? _a : _this.orientationProperty;
        _this.showLegendProperty = (_b = options === null || options === void 0 ? void 0 : options.showLegend) !== null && _b !== void 0 ? _b : _this.showLegend;
        _this.placementProperty = (_c = options === null || options === void 0 ? void 0 : options.placement) !== null && _c !== void 0 ? _c : _this.placement;
        _this.marginProperty = (_d = options === null || options === void 0 ? void 0 : options.margin) !== null && _d !== void 0 ? _d : _this.margin;
        _this.placementDivIdProperty = (_e = options === null || options === void 0 ? void 0 : options.placementDivId) !== null && _e !== void 0 ? _e : _this.placementDivId;
        // No default here as need theme from parent surface
        _this.backgroundColorProperty = options === null || options === void 0 ? void 0 : options.backgroundColor;
        _this.textColorProperty = options === null || options === void 0 ? void 0 : options.textColor;
        _this.update = _this.update.bind(_this);
        return _this;
    }
    SciChartLegendBase.prototype.setInvalidateParentSurface = function (value) {
        this.invalidateParentSurface = value;
    };
    /**
     * Set the root div in HTML where the legend will be placed
     * @param rootDivProperty
     */
    SciChartLegendBase.prototype.setRootDiv = function (rootDivProperty) {
        this.rootDiv = rootDivProperty;
    };
    /**
     * @deprecated
     */
    SciChartLegendBase.prototype.setSeriesViewRect = function (seriesViewRect) { };
    /**
     * Sets the parent {@link ISciChartSurfaceBase}
     */
    SciChartLegendBase.prototype.setParentSurface = function (scs) {
        this.parentSurfaceProperty = scs;
    };
    /**
     * Attach this legend to a SciChartSurfaceBase
     * @param sciChartSurface
     */
    SciChartLegendBase.prototype.attachTo = function (sciChartSurface) {
        this.setParentSurface(sciChartSurface);
        this.setRootDiv(sciChartSurface.domDivContainer);
        this.setInvalidateParentSurface(sciChartSurface.invalidateElement);
        sciChartSurface.rendered.subscribe(this.update);
    };
    SciChartLegendBase.prototype.detach = function () {
        this.setRootDiv(undefined);
        this.parentSurfaceProperty.rendered.unsubscribe(this.update);
        this.setInvalidateParentSurface(undefined);
        this.setParentSurface(undefined);
        this.delete();
    };
    /**
     * Update the legend
     */
    SciChartLegendBase.prototype.update = function () {
        if (!this.isDirty && this.div) {
            return;
        }
        try {
            this.parentSurfaceProperty.getSeriesViewRectPadding(true);
            this.clear();
            if (this.showLegend) {
                this.create();
            }
            this.isDirty = false;
        }
        catch (_a) { }
    };
    /**
     * Invalidate the legend, hinting a redraw is needed
     */
    SciChartLegendBase.prototype.invalidateLegend = function () {
        this.isDirty = true;
    };
    Object.defineProperty(SciChartLegendBase.prototype, "orientation", {
        /**
         * Gets and sets the legend orientation. See {@link ELegendOrientation} for a list of values
         */
        get: function () {
            return this.orientationProperty;
        },
        /**
         * Gets and sets the legend orientation. See {@link ELegendOrientation} for a list of values
         */
        set: function (orientation) {
            this.orientationProperty = orientation;
            this.notifyPropertyChanged();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SciChartLegendBase.prototype, "showLegend", {
        /**
         * When true, the legend is shown, else it is hidden
         */
        get: function () {
            return this.showLegendProperty;
        },
        /**
         * When true, the legend is shown, else it is hidden
         */
        set: function (value) {
            this.showLegendProperty = value;
            this.notifyPropertyChanged();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SciChartLegendBase.prototype, "placement", {
        /**
         * Gets or sets the legend placement. See {@link ELegendPlacement} for a list of values
         */
        get: function () {
            return this.placementProperty;
        },
        /**
         * Gets or sets the legend placement. See {@link ELegendPlacement} for a list of values
         */
        set: function (value) {
            this.placementProperty = value;
            this.notifyPropertyChanged();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SciChartLegendBase.prototype, "margin", {
        /**
         * Gets or sets the margin in pixels
         */
        get: function () {
            return this.marginProperty;
        },
        /**
         * Gets or sets the margin in pixels
         */
        set: function (value) {
            this.marginProperty = value;
            this.notifyPropertyChanged();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SciChartLegendBase.prototype, "placementDivId", {
        /**
         * Gets or sets the parent div element reference or id for the Legend
         */
        get: function () {
            return this.placementDivIdProperty;
        },
        /**
         * Gets or sets the parent div element reference or id for the Legend
         */
        set: function (value) {
            this.clear();
            this.placementDivIdProperty = value;
            this.notifyPropertyChanged();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SciChartLegendBase.prototype, "backgroundColor", {
        /**
         * Gets or sets the backgroundColor as an html color code
         */
        get: function () {
            return this.backgroundColorProperty;
        },
        /**
         * Gets or sets the backgroundColor as an html color code
         */
        set: function (value) {
            this.backgroundColorProperty = value;
            this.notifyPropertyChanged();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SciChartLegendBase.prototype, "textColor", {
        /**
         * Gets or sets the textColor as an html color code
         */
        get: function () {
            return this.textColorProperty;
        },
        /**
         * Gets or sets the textColor as an html color code
         */
        set: function (value) {
            this.textColorProperty = value;
            this.notifyPropertyChanged();
        },
        enumerable: false,
        configurable: true
    });
    SciChartLegendBase.prototype.clear = function () {
        var _a;
        if (this.div) {
            this.removeEventListeners();
            (_a = this.parentDiv) === null || _a === void 0 ? void 0 : _a.removeChild(this.div);
            this.div = undefined;
            this.parentDiv = undefined;
        }
    };
    /** @inheritDoc */
    SciChartLegendBase.prototype.delete = function () {
        this.clear();
    };
    /**
     * Gets if the Legend in placed externally
     */
    SciChartLegendBase.prototype.isExternal = function () {
        return !!this.placementDivId;
    };
    /**
     * Gets HTML string for the Legend
     * @param placement The {@link SciChartLegendBase} placement
     * @param textColor The {@link SciChartLegendBase} textColor
     * @param backgroundColor The {@link SciChartLegendBase} backgroundColor
     * @param margin The {@link SciChartLegendBase} margin
     * @param orientation The {@link SciChartLegendBase} orientation
     * @param showCheckboxes Show the Legend checkboxes
     * @param showSeriesMarkers Show the Legend markers
     * @param items The {@link TLegendItem[]}
     */
    SciChartLegendBase.prototype.getLegendHTML = function (placement, textColor, backgroundColor, margin, orientation, showCheckboxes, showSeriesMarkers, items) {
        var _this = this;
        var body = items.reduce(function (prev, curr) {
            var _a;
            return (prev + _this.getLegendItemHTML(orientation, showCheckboxes, (_a = curr.showMarker) !== null && _a !== void 0 ? _a : showSeriesMarkers, curr));
        }, "");
        return (0, exports.getLegendContainerHtml)(placement, textColor, backgroundColor, margin, body, this.isExternal());
    };
    /**
     * Gets HTML string for legend items
     * @param orientation The {@link SciChartLegendBase} orientation
     * @param showCheckboxes Show the Legend checkboxes
     * @param showSeriesMarkers Show the Legend markers
     * @param item The {@link TLegendItem}
     */
    SciChartLegendBase.prototype.getLegendItemHTML = function (orientation, showCheckboxes, showSeriesMarkers, item) {
        return (0, exports.getLegendItemHtml)(orientation, showCheckboxes, showSeriesMarkers, item);
    };
    /**
     * Notifies listeners of {@link invalidateParentSurface} that a property has changed
     */
    SciChartLegendBase.prototype.notifyPropertyChanged = function () {
        this.isDirty = true;
        if (this.invalidateParentSurface) {
            this.invalidateParentSurface();
        }
    };
    /**
     * Creates the legend in the DOM
     */
    SciChartLegendBase.prototype.create = function () {
        var innerHtml = this.getInnerHTML();
        if (innerHtml) {
            var div = (0, html_1.htmlToElement)(innerHtml);
            this.parentDiv = this.getParentDiv();
            this.parentDiv.appendChild(div);
            this.div = div;
            if (!app_1.IS_TEST_ENV) {
                this.addEventListeners();
            }
        }
    };
    SciChartLegendBase.prototype.getParentDiv = function () {
        if (this.placementDivId) {
            return typeof this.placementDivId === "string"
                ? document.querySelector("[id='".concat(this.placementDivId, "']"))
                : this.placementDivId;
        }
        return this.rootDiv;
    };
    return SciChartLegendBase;
}(DeletableEntity_1.DeletableEntity));
exports.SciChartLegendBase = SciChartLegendBase;
var getLegendItemHtml = function (orientation, showCheckboxes, showSeriesMarkers, item) {
    var display = orientation === ELegendOrientation.Vertical ? "flex" : "inline-flex";
    var str = "<span class=\"scichart__legend-item\" style=\"display: ".concat(display, "; align-items: center; margin-right: 4px; white-space: nowrap;\">");
    if (showCheckboxes) {
        var checked = item.checked ? "checked" : "";
        str += "<input ".concat(checked, " type=\"checkbox\" id=\"").concat(item.id, "\">");
    }
    if (showSeriesMarkers) {
        if (item.gradient) {
            var gradientStr_1 = "";
            item.gradient.gradientStops.forEach(function (s) {
                gradientStr_1 += ",".concat(s.color);
            });
            str += "<label for=\"".concat(item.id, "\" style=\"background-image: linear-gradient(to right").concat(gradientStr_1, "); margin: 4px; width: 30px; height: 13px;\"></label>");
        }
        else {
            str += "<label for=\"".concat(item.id, "\" style=\"background-color: ").concat(item.color, "; margin: 4px; width: 30px; height: 13px;\"></label>");
        }
    }
    str += "<label for=\"".concat(item.id, "\" style=\"margin-left: 4px;\">").concat(item.name, "</label>");
    str += "</span>";
    return str;
};
exports.getLegendItemHtml = getLegendItemHtml;
var getLegendContainerHtml = function (placement, textColor, backgroundColor, margin, body, isExternal) {
    if (isExternal === void 0) { isExternal = false; }
    if (!body)
        return "";
    //const float = [ELegendPlacement.TopLeft, ELegendPlacement.BottomLeft].includes(placement) ? "left" : "right";
    var position = "";
    var positionStyle = "";
    if (!isExternal) {
        position = "position: absolute;";
    }
    if (placement === ELegendPlacement.TopLeft) {
        positionStyle = "left: 0; top: 0;";
    }
    else if (placement === ELegendPlacement.TopRight) {
        positionStyle = "right: 0; top: 0;";
    }
    else if (placement === ELegendPlacement.BottomLeft) {
        positionStyle = "left: 0; bottom: 0;";
    }
    else if (placement === ELegendPlacement.BottomRight) {
        positionStyle = "right: 0; bottom: 0;";
    }
    var htmlStr = "<div class=\"scichart__legend\" style=\"height: 100%; ".concat(position, " display: flex; ").concat(positionStyle, " text-align: center;\">");
    var alignSelf = [ELegendPlacement.TopLeft, ELegendPlacement.TopRight].includes(placement)
        ? "flex-start"
        : "flex-end";
    var left = margin.left, right = margin.right, bottom = margin.bottom, top = margin.top;
    var marginStyle = "margin-left: ".concat(left, "px; margin-top: ").concat(top, "px; margin-right: ").concat(right, "px; margin-bottom: ").concat(bottom, "px;");
    htmlStr += "<div style=\"display: block; align-self: ".concat(alignSelf, "; width: fit-content; pointer-events: auto; ").concat(marginStyle, " padding: 5px; border-radius: 3px; background-color: ").concat(backgroundColor, "; color: ").concat(textColor, "\">");
    htmlStr += body;
    htmlStr += "</div></div>";
    return htmlStr;
};
exports.getLegendContainerHtml = getLegendContainerHtml;
