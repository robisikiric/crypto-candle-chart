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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEventListenerToPieSegment = exports.SciChartPieSurface = exports.EPieValueMode = exports.EPieType = exports.ESizingMode = void 0;
var chartBuilder_1 = require("../../../Builder/chartBuilder");
var classFactory_1 = require("../../../Builder/classFactory");
var app_1 = require("../../../constants/app");
var EasingFunctions_1 = require("../../../Core/Animations/EasingFunctions");
var DeletableEntity_1 = require("../../../Core/DeletableEntity");
var Deleter_1 = require("../../../Core/Deleter");
var EventHandler_1 = require("../../../Core/EventHandler");
var Globals_1 = require("../../../Core/Globals");
var ObservableArray_1 = require("../../../Core/ObservableArray");
var Rect_1 = require("../../../Core/Rect");
var BaseType_1 = require("../../../types/BaseType");
var SciChartSurfaceType_1 = require("../../../types/SciChartSurfaceType");
var guid_1 = require("../../../utils/guid");
var SciChartJSDarkTheme_1 = require("../../Themes/SciChartJSDarkTheme");
var annotationHelpers_1 = require("../Annotations/annotationHelpers");
var PieLabelProvider_1 = require("../Axis/LabelProvider/PieLabelProvider");
var SciChartPieLegend_1 = require("../Legend/SciChartPieLegend");
var sciChartInitCommon_1 = require("../sciChartInitCommon");
var SciChartSurfaceBase_1 = require("../SciChartSurfaceBase");
var DpiHelper_1 = require("../TextureManager/DpiHelper");
var constants_1 = require("./constants");
var constants_2 = require("./PieSegment/constants");
/** @ignore */
var DEG_TO_RAD = Math.PI / 180;
/** @ignore */
var START_ANGLE = 90;
var ESizingMode;
(function (ESizingMode) {
    /**
     * The size value is specified as absolute value ( e.g. 1px, 10dp etc)
     */
    ESizingMode["Absolute"] = "Absolute";
    /**
     * The size value is specified as relative value ( e.g. 10% from available size )
     */
    ESizingMode["Relative"] = "Relative";
})(ESizingMode = exports.ESizingMode || (exports.ESizingMode = {}));
var EPieType;
(function (EPieType) {
    EPieType["Pie"] = "Pie";
    EPieType["Donut"] = "Donut";
})(EPieType = exports.EPieType || (exports.EPieType = {}));
var EPieValueMode;
(function (EPieValueMode) {
    EPieValueMode[EPieValueMode["Percentage"] = 0] = "Percentage";
    EPieValueMode[EPieValueMode["Raw"] = 1] = "Raw";
})(EPieValueMode = exports.EPieValueMode || (exports.EPieValueMode = {}));
/**
 * @summary The {@link SciChartPieSurface} is the root Pie and Donut Chart control in SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Chart Library}
 * @description
 * To create a Pie chart using SciChart, declare a {@link SciChartPieSurface} using {@link SciChartPieSurface.create},
 *
 * Next, add a pie segments by adding a {@link PieSegment} to the {@link SciChartPieSurface.pieSegments} collection.
 *
 * You can create a donut chart by setting the {@link SciChartPieSurface.holeRadius} property.
 *
 * You can add and configure a legend by setting the {@link SciChartPieSurface.legend} property.
 * @remarks
 * It is possible to have more than one {@link SciChartPieSurface} on screen at the same time.
 * {@link SciChartPieSurface | SciChartPieSurfaces} scale to fit the parent DIV where they are hosted. Use CSS to position the DIV.
 */
var SciChartPieSurface = /** @class */ (function (_super) {
    __extends(SciChartPieSurface, _super);
    function SciChartPieSurface(canvases, options) {
        if (canvases === void 0) { canvases = {}; }
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        _this = _super.call(this) || this;
        _this.animate = true;
        /* The number of frames for the animation. Default 30.  A frame will be trigged every 20ms. */
        _this.animationFrames = 30;
        /**
         * An event handler which notifies its subscribers when a render operation has finished. Use this
         * to time render performance, or to update elements of the chart or your UI on redraw.
         */
        _this.rendered = new EventHandler_1.EventHandler();
        _this.pieTypeProperty = EPieType.Pie;
        _this.holeRadiusProperty = 0.5;
        _this.holeRadiusSizingModeProperty = ESizingMode.Relative;
        _this.seriesSpacingProperty = 0;
        _this.labelRadiusProperty = 1;
        _this.titleDivs = [];
        _this.sweepAnimationDone = false;
        _this.suspendUpdate = false;
        _this.themeProviderProperty = new SciChartJSDarkTheme_1.SciChartJSDarkTheme();
        _this.previousThemeProviderProperty = new SciChartJSDarkTheme_1.SciChartJSDarkTheme();
        _this.deletables = [];
        _this.valueModeProperty = EPieValueMode.Percentage;
        _this.labelStyleProperty = {
            fontSize: 14,
            fontFamily: "Arial",
            color: "#1e323d",
            fontWeight: "bold"
        };
        _this.id = (_a = options === null || options === void 0 ? void 0 : options.id) !== null && _a !== void 0 ? _a : (0, guid_1.generateGuid)();
        _this.domChartRoot = canvases.domChartRoot;
        _this.domCanvas2D = canvases.domCanvas2D;
        _this.domSvgContainer = canvases.domSvgContainer;
        _this.domSvgAdornerLayer = canvases.domSvgAdornerLayer;
        _this.domDivContainer = canvases.domDivContainer;
        var width = _this.domCanvas2D.width / DpiHelper_1.DpiHelper.PIXEL_RATIO;
        var height = _this.domCanvas2D.height / DpiHelper_1.DpiHelper.PIXEL_RATIO;
        _this.viewRect = new Rect_1.Rect(0, 0, width, height);
        _this.resizeSubscriptionToken = sciChartInitCommon_1.default.subscribeToResize(
        // @ts-ignore
        canvases.domCanvas2D, canvases.aspect, _this);
        _this.drawChart = _this.drawChart.bind(_this);
        _this.deleteInternals = _this.deleteInternals.bind(_this);
        _this.invalidateElement = _this.invalidateElement.bind(_this);
        _this.detachPieSegment = _this.detachPieSegment.bind(_this);
        _this.attachPieSegment = _this.attachPieSegment.bind(_this);
        _this.pieSegments = new ObservableArray_1.ObservableArray();
        _this.pieSegments.collectionChanged.subscribe(function (args) {
            var _a, _b;
            (_a = args.getOldItems()) === null || _a === void 0 ? void 0 : _a.forEach(_this.detachPieSegment);
            (_b = args.getNewItems()) === null || _b === void 0 ? void 0 : _b.forEach(_this.attachPieSegment);
            // Do this only after all changes have been processed
            _this.invalidateElement();
        });
        _this.applySciChartBackground(SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.sciChartBackground);
        _this.legend = new SciChartPieLegend_1.SciChartPieLegend();
        _this.legend.setRootDiv(_this.domDivContainer);
        _this.legend.setPieSegmentArray(_this.pieSegments.asArray());
        _this.legend.setInvalidateParentSurface(_this.invalidateElement);
        _this.legend.setParentSurface(_this);
        _this.heightAspect = (_b = options === null || options === void 0 ? void 0 : options.heightAspect) !== null && _b !== void 0 ? _b : 0;
        _this.widthAspect = (_c = options === null || options === void 0 ? void 0 : options.widthAspect) !== null && _c !== void 0 ? _c : 0;
        _this.pieTypeProperty = (_d = options === null || options === void 0 ? void 0 : options.pieType) !== null && _d !== void 0 ? _d : _this.pieType;
        _this.holeRadiusProperty = (_e = options === null || options === void 0 ? void 0 : options.holeRadius) !== null && _e !== void 0 ? _e : _this.holeRadius;
        _this.animate = (_f = options === null || options === void 0 ? void 0 : options.animate) !== null && _f !== void 0 ? _f : _this.animate;
        _this.holeRadiusSizingModeProperty = (_g = options === null || options === void 0 ? void 0 : options.holeRadiusSizingMode) !== null && _g !== void 0 ? _g : _this.holeRadiusSizingModeProperty;
        _this.seriesSpacingProperty = (_h = options === null || options === void 0 ? void 0 : options.seriesSpacing) !== null && _h !== void 0 ? _h : _this.seriesSpacingProperty;
        _this.labelRadiusProperty = (_j = options === null || options === void 0 ? void 0 : options.labelRadiusAdjustment) !== null && _j !== void 0 ? _j : _this.labelRadiusProperty;
        _this.legend.showLegend = (_k = options === null || options === void 0 ? void 0 : options.showLegend) !== null && _k !== void 0 ? _k : _this.legend.showLegend;
        _this.legend.animate = (_l = options === null || options === void 0 ? void 0 : options.animateLegend) !== null && _l !== void 0 ? _l : _this.legend.animate;
        _this.legend.showCheckboxes = (_m = options === null || options === void 0 ? void 0 : options.showLegendCheckBoxes) !== null && _m !== void 0 ? _m : _this.legend.showCheckboxes;
        _this.legend.showSeriesMarkers = (_o = options === null || options === void 0 ? void 0 : options.showLegendSeriesMarkers) !== null && _o !== void 0 ? _o : _this.legend.showSeriesMarkers;
        _this.paddingProperty = (_p = options === null || options === void 0 ? void 0 : options.padding) !== null && _p !== void 0 ? _p : _this.paddingProperty;
        if (options === null || options === void 0 ? void 0 : options.labelProvider) {
            if (!("getSegmentText" in (options === null || options === void 0 ? void 0 : options.labelProvider))) {
                options.labelProvider = (0, classFactory_1.createType)(BaseType_1.EBaseType.LabelProvider, options.labelProvider.type, undefined, options.labelProvider.options);
            }
        }
        _this.labelProvider = (_q = options === null || options === void 0 ? void 0 : options.labelProvider) !== null && _q !== void 0 ? _q : new PieLabelProvider_1.PieLabelProvider();
        _this.valueModeProperty = (_r = options === null || options === void 0 ? void 0 : options.valueMode) !== null && _r !== void 0 ? _r : _this.valueModeProperty;
        return _this;
    }
    /**
     * Creates a {@link SciChartPieSurface} to occupy the div by element ID in your DOM.
     * @remarks This method is async and must be awaited
     * @param divElementId The Div Element ID where the {@link SciChartPieSurface} will reside
     * @param width Optional - the width of the {@link SciChartPieSurface} in pixels. By default SciChart will scale to fit the parent Div
     * @param height Optional - the height of the {@link SciChartPieSurface} in pixels. By default SciChart will scale to fit the parent Div
     */
    SciChartPieSurface.create = function (divElement, options) {
        var _a, _b;
        (0, chartBuilder_1.ensureRegistrations)();
        var canvases = sciChartInitCommon_1.default.initCanvas(divElement, (_a = options === null || options === void 0 ? void 0 : options.widthAspect) !== null && _a !== void 0 ? _a : 0, (_b = options === null || options === void 0 ? void 0 : options.heightAspect) !== null && _b !== void 0 ? _b : 0, sciChartInitCommon_1.default.ECanvasType.svg, undefined, options === null || options === void 0 ? void 0 : options.touchAction);
        return new Promise(function (resolve) {
            var _a, _b, _c;
            var conflictingRenderContextDestinations = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], Globals_1.sciChartDestinations, true), Globals_1.sciChart3DDestinations, true), Globals_1.sciChartSingleDestinations, true), Globals_1.sciChartPieDestinations, true).filter(function (destination) { return destination.sciChartSurface.domChartRoot.id === canvases.domChartRoot.id; });
            conflictingRenderContextDestinations.forEach(function (destination) { return destination.sciChartSurface.delete(); });
            options = SciChartSurfaceBase_1.SciChartSurfaceBase.resolveOptions(options);
            var scps = new SciChartPieSurface(canvases, options);
            scps.applyTheme(options === null || options === void 0 ? void 0 : options.theme);
            Globals_1.sciChartPieDestinations.push({
                canvasElementId: (_a = canvases.domCanvas2D) === null || _a === void 0 ? void 0 : _a.id,
                sciChartSurface: scps,
                width: (_b = canvases.domCanvas2D) === null || _b === void 0 ? void 0 : _b.width,
                height: (_c = canvases.domCanvas2D) === null || _c === void 0 ? void 0 : _c.height
            });
            scps.setDestinations(Globals_1.sciChartPieDestinations);
            // setTimeout is used to make function async like createSciChartSurface, to have a consistent API
            setTimeout(function () { return resolve(scps); }, 0);
        });
    };
    Object.defineProperty(SciChartPieSurface.prototype, "isDeleted", {
        get: function () {
            return this.isDeletedProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SciChartPieSurface.prototype, "labelProvider", {
        /**
         * Gets or sets a {@link LabelProvider} - a class which is responsible for formatting axis labels and cursor labels from numeric values
         */
        get: function () {
            return this.labelProviderProperty;
        },
        /**
         * Gets or sets a {@link LabelProvider} - a class which is responsible for formatting axis labels and cursor labels from numeric values
         */
        set: function (labelProvider) {
            if (labelProvider && this.labelProviderProperty !== labelProvider) {
                this.labelProviderProperty = labelProvider;
                this.notifyPropertyChanged(constants_1.PROPERTY.LABEL_PROVIDER);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SciChartPieSurface.prototype, "labelStyle", {
        /**
         * Gets or sets a {@link TTextStyle} object for styling labels
         */
        get: function () {
            return this.labelStyleProperty;
        },
        /**
         * Gets or sets a {@link TTextStyle} object for styling labels
         */
        set: function (textStyle) {
            this.labelStyleProperty = __assign(__assign({}, this.labelStyle), textStyle);
            this.notifyPropertyChanged(constants_1.PROPERTY.TEXT_STYLE);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    SciChartPieSurface.prototype.applyTheme = function (themeProvider) {
        this.previousThemeProviderProperty = this.themeProviderProperty;
        this.themeProviderProperty = themeProvider;
        this.applySciChartBackground(themeProvider.sciChartBackground);
        if (this.labelStyle.color === this.previousThemeProvider.tickTextBrush) {
            this.labelStyle = { color: themeProvider.tickTextBrush };
        }
        this.invalidateElement();
    };
    Object.defineProperty(SciChartPieSurface.prototype, "themeProvider", {
        /**
         * Used internally - gets the previous {@link IThemeProvider}
         */
        get: function () {
            return this.themeProviderProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SciChartPieSurface.prototype, "previousThemeProvider", {
        /**
         * Used internally - gets the previous {@link IThemeProvider}
         */
        get: function () {
            return this.previousThemeProviderProperty;
        },
        enumerable: false,
        configurable: true
    });
    SciChartPieSurface.prototype.setDestinations = function (destinations) {
        this.destinations = destinations;
    };
    Object.defineProperty(SciChartPieSurface.prototype, "otherSurfaces", {
        get: function () {
            var _this = this;
            if (!this.destinations) {
                return [];
            }
            return this.destinations.map(function (el) { return el.sciChartSurface; }).filter(function (el2) { return el2 !== _this; });
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Call invalidateElement() to trigger a redraw of the {@link SciChartPieSurface}. SciChart's rendering
     * engine will schedule a redraw a the next time the renderer is free.
     */
    SciChartPieSurface.prototype.invalidateElement = function (options) {
        // TODO make params type consistent with 2D and 3D
        if (this.isValidToDraw()) {
            if (typeof options === "string" && options === constants_2.PROPERTY.VALUE) {
                this.sweepAnimationDone = false;
            }
            this.update();
        }
    };
    /**
     * Called internally - Updates and draws the Pie Chart
     */
    SciChartPieSurface.prototype.update = function () {
        var _a;
        if (!this.suspendUpdate) {
            this.draw();
            (_a = this.legend) === null || _a === void 0 ? void 0 : _a.update();
        }
    };
    /**
     * @inheritDoc
     */
    SciChartPieSurface.prototype.delete = function () {
        var _this = this;
        var _a;
        this.deleteInternals();
        this.legend = (0, Deleter_1.deleteSafe)(this.legend);
        this.labelProvider = (0, Deleter_1.deleteSafe)(this.labelProvider);
        this.resizeSubscriptionToken = (0, Deleter_1.deleteSafe)(this.resizeSubscriptionToken);
        // TODO probably this should be moved outside for Proxy === this comparison issue exists
        var currentSurfaceIndex = (_a = this.destinations) === null || _a === void 0 ? void 0 : _a.findIndex(function (dest) { return dest.sciChartSurface.id === _this.id; });
        if (currentSurfaceIndex >= 0) {
            this.destinations.splice(currentSurfaceIndex, 1);
        }
        this.isDeletedProperty = true;
    };
    /**
     * Used Internally. Cleans up the chart internal parts, subscriptions, etc.
     */
    SciChartPieSurface.prototype.deleteInternals = function (isAnimationProgress) {
        var _this = this;
        if (this.svg) {
            this.domSvgContainer.removeChild(this.svg);
            this.svg = undefined;
        }
        if (!isAnimationProgress) {
            this.titleDivs.forEach(function (divEl) {
                _this.domDivContainer.removeChild(divEl);
            });
            this.titleDivs = [];
        }
        for (var _i = 0, _a = this.deletables; _i < _a.length; _i++) {
            var deletable = _a[_i];
            (0, Deleter_1.deleteSafe)(deletable);
        }
        this.deletables = [];
    };
    /**
     * @inheritDoc
     */
    SciChartPieSurface.prototype.addDeletable = function (deletable) {
        this.deletables.push(deletable);
    };
    /**
     * @inheritDoc
     */
    SciChartPieSurface.prototype.changeViewportSize = function (width, height) {
        var domWidth = width;
        var domHeight = height;
        this.viewRect = new Rect_1.Rect(0, 0, width, height);
        this.changeDomViewportSize(domWidth, domHeight);
        this.invalidateElement();
    };
    Object.defineProperty(SciChartPieSurface.prototype, "pieType", {
        // GETTERS AND SETTERS FOR PROPERTIES
        /**
         * Gets or sets the type of the pie chart. See {@link EPieType} for a list of values
         * @remarks See also {@link holeRadius} which is required for Donut charts and {@link holeRadiusSizingMode}
         * which defines whether the Donut hole is relative or absolute.
         */
        get: function () {
            return this.pieTypeProperty;
        },
        /**
         * Gets or sets the type of the pie chart. See {@link EPieType} for a list of values
         * @remarks See also {@link holeRadius} which is required for Donut charts and {@link holeRadiusSizingMode}
         * which defines whether the Donut hole is relative or absolute.
         */
        set: function (value) {
            this.pieTypeProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.PIE_TYPE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SciChartPieSurface.prototype, "holeRadius", {
        /**
         * Gets or sets the hole radius, which allows you to create Donut charts instead of Pie.
         * @remarks See also {@link EPieType} which is required to change from Pie to Donut and {@link holeRadiusSizingMode}
         * which defines whether the Donut hole is relative or absolute.
         */
        get: function () {
            return this.holeRadiusProperty;
        },
        /**
         * Gets or sets the hole radius, which allows you to create Donut charts instead of Pie.
         * @remarks See also {@link EPieType} which is required to change from Pie to Donut and {@link holeRadiusSizingMode}
         * which defines whether the Donut hole is relative or absolute.
         */
        set: function (holeRadius) {
            this.holeRadiusProperty = holeRadius;
            this.notifyPropertyChanged(constants_1.PROPERTY.HOLE_RADIUS);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SciChartPieSurface.prototype, "holeRadiusSizingMode", {
        /**
         * Gets or sets the hole radius size mode for Donut charts. See {@link ESizingMode} for a list of values
         * @remarks See also {@link EPieType} which is required to change from Pie to Donut, and {@link holeRadius}
         * which sets the size of a Donut Chart hole
         */
        get: function () {
            return this.holeRadiusSizingModeProperty;
        },
        /**
         * Gets or sets the hole radius size mode for Donut charts. See {@link ESizingMode} for a list of values
         * @remarks See also {@link EPieType} which is required to change from Pie to Donut, and {@link holeRadius}
         * which sets the size of a Donut Chart hole
         */
        set: function (holeRadiusSizingMode) {
            this.holeRadiusSizingModeProperty = holeRadiusSizingMode;
            this.notifyPropertyChanged(constants_1.PROPERTY.HOLE_RADIUS_SIZING_MODE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SciChartPieSurface.prototype, "padding", {
        /**
         * Gets or sets padding
         */
        get: function () {
            return this.paddingProperty;
        },
        /**
         * Gets or sets padding
         */
        set: function (value) {
            if (this.paddingProperty !== value) {
                this.paddingProperty = value;
                this.updateLegendMargin();
                this.notifyPropertyChanged(constants_1.PROPERTY.PADDING);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SciChartPieSurface.prototype, "canvasBorder", {
        /**
         * Gets or sets canvas border
         */
        get: function () {
            return this.canvasBorderProperty;
        },
        /**
         * Gets or sets canvas border
         */
        set: function (value) {
            if (this.canvasBorderProperty !== value) {
                this.canvasBorderProperty = value;
                this.updateLegendMargin();
                this.notifyPropertyChanged(constants_1.PROPERTY.PADDING);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SciChartPieSurface.prototype, "seriesSpacing", {
        get: function () {
            return this.seriesSpacingProperty;
        },
        set: function (value) {
            if (this.seriesSpacingProperty !== value) {
                this.seriesSpacingProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.SERIES_SPACING);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SciChartPieSurface.prototype, "valueMode", {
        /** Whether to show labels as percentages, or raw values.  Default to percentages */
        get: function () {
            return this.valueModeProperty;
        },
        /** Whether to show labels as percentages, or raw values.  Default to percentages */
        set: function (value) {
            this.valueModeProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.VALUE_MODE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SciChartPieSurface.prototype, "labelRadiusAdjustment", {
        /**
         * Use this to adjust the position of the labels.  1 is the default.  Larger values will shift the labels outwards.
         * For Pie charts, 1.7 will place the labels outside the pie
         * If you want more detailed control you can override calcTitlePosition.
         */
        get: function () {
            return this.labelRadiusProperty;
        },
        /**
         * Use this to adjust the position of the labels.  1 is the default.  Larger values will shift the labels outwards.
         * If you want more detailed control you can override calcTitlePosition.
         */
        set: function (value) {
            this.labelRadiusProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.VALUE_MODE);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Convert the surface to a {@link TSurfaceDefinition}
     * @param excludedata If false, segments will be included in the json
     */
    SciChartPieSurface.prototype.toJSON = function (excludedata) {
        if (excludedata === void 0) { excludedata = false; }
        var theme;
        if ("toJSON" in this.themeProvider) {
            // @ts-ignore
            theme = this.themeProvider.toJSON();
        }
        else {
            theme = this.themeProvider;
        }
        var surface = {
            animate: this.animate,
            animateLegend: this.legend.animate,
            heightAspect: this.heightAspect,
            widthAspect: this.widthAspect,
            holeRadius: this.holeRadius,
            holeRadiusSizingMode: this.holeRadiusSizingMode,
            pieType: this.pieType,
            showLegend: this.legend.showLegend,
            showLegendCheckBoxes: this.legend.showCheckboxes,
            showLegendSeriesMarkers: this.legend.showSeriesMarkers,
            padding: this.padding,
            canvasBorder: this.canvasBorder,
            seriesSpacing: this.seriesSpacing,
            // @ts-ignore
            labelProvider: this.labelProvider.toJSON(),
            valueMode: this.valueMode,
            labelRadiusAdjustment: this.labelRadiusAdjustment,
            animationFrames: this.animationFrames,
            theme: theme
        };
        var options = { surface: surface, onCreated: this.onCreatedName };
        if (!excludedata) {
            options.segments = this.pieSegments.asArray().map(function (s) { return s.toJSON(); });
        }
        return { type: SciChartSurfaceType_1.ESciChartSurfaceType.Pie2D, options: options };
    };
    /** The method used to calculate the label position for each segment */
    SciChartPieSurface.prototype.calcTitlePosition = function (x, y, outerRadius, innerRadius, a1, a2, delta, divWidth, divHeight) {
        var centerRadius = innerRadius < outerRadius / 2 ? (outerRadius * 2) / 3 + innerRadius / 6 : (outerRadius + innerRadius) / 2;
        var centerAngle = (a1 + a2) / 2;
        var left = x + Math.cos(DEG_TO_RAD * centerAngle) * (centerRadius * this.labelRadiusProperty + delta) - divWidth / 2;
        var top = y + Math.sin(DEG_TO_RAD * centerAngle) * (centerRadius * this.labelRadiusProperty + delta) - divHeight / 2;
        return { left: left, top: top };
    };
    /**
     * Changes the size of the DOM element where the {@link SciChartSurfaceBase} resides.
     * @param width
     * @param height
     */
    SciChartPieSurface.prototype.changeDomViewportSize = function (width, height) {
        if (this.domSvgContainer) {
            this.domSvgContainer.setAttribute("width", width.toString());
            this.domSvgContainer.setAttribute("height", height.toString());
        }
        if (this.domSvgAdornerLayer) {
            this.domSvgAdornerLayer.setAttribute("width", width.toString());
            this.domSvgAdornerLayer.setAttribute("height", height.toString());
        }
    };
    // PRIVATE
    SciChartPieSurface.prototype.notifyPropertyChanged = function (propertyName) {
        this.invalidateElement();
        if (propertyName === constants_1.PROPERTY.LABEL_PROVIDER && this.labelProviderProperty) {
            this.labelProviderProperty.attachedToSurface(this);
        }
    };
    SciChartPieSurface.prototype.isValidToDraw = function () {
        // TODO
        return true;
    };
    SciChartPieSurface.prototype.detachPieSegment = function (pieSegment) {
        pieSegment.onDetach();
    };
    SciChartPieSurface.prototype.attachPieSegment = function (pieSegment) {
        pieSegment.onAttach(this);
    };
    SciChartPieSurface.prototype.updateLegendMargin = function () {
        var _a, _b, _c;
        var paddingTop = ((_a = this.padding) === null || _a === void 0 ? void 0 : _a.top) || 0;
        var canvasBorderTop = ((_b = this.canvasBorder) === null || _b === void 0 ? void 0 : _b.border) || ((_c = this.canvasBorder) === null || _c === void 0 ? void 0 : _c.borderTop) || 0;
        // 10 - because of default spacing
        // only top included because of margin implementation for the legend
        this.legend.margin = paddingTop + canvasBorderTop + 10;
    };
    SciChartPieSurface.prototype.calculateViewRectWidth = function (width) {
        var _a, _b, _c, _d, _e;
        if ((_a = this.padding) === null || _a === void 0 ? void 0 : _a.left) {
            width -= this.padding.left;
        }
        if ((_b = this.padding) === null || _b === void 0 ? void 0 : _b.right) {
            width -= this.padding.right;
        }
        if ((_c = this.canvasBorder) === null || _c === void 0 ? void 0 : _c.border) {
            width -= this.canvasBorder.border * 2;
        }
        else {
            if ((_d = this.canvasBorder) === null || _d === void 0 ? void 0 : _d.borderLeft) {
                width -= this.canvasBorder.borderLeft;
            }
            if ((_e = this.canvasBorder) === null || _e === void 0 ? void 0 : _e.borderRight) {
                width -= this.canvasBorder.borderRight;
            }
        }
        return width;
    };
    SciChartPieSurface.prototype.calculateViewRectHeight = function (height) {
        var _a, _b, _c, _d, _e;
        if ((_a = this.padding) === null || _a === void 0 ? void 0 : _a.top) {
            height -= this.padding.top;
        }
        if ((_b = this.padding) === null || _b === void 0 ? void 0 : _b.bottom) {
            height -= this.padding.bottom;
        }
        if ((_c = this.canvasBorder) === null || _c === void 0 ? void 0 : _c.border) {
            height -= this.canvasBorder.border * 2;
        }
        else {
            if ((_d = this.canvasBorder) === null || _d === void 0 ? void 0 : _d.borderTop) {
                height -= this.canvasBorder.borderTop;
            }
            if ((_e = this.canvasBorder) === null || _e === void 0 ? void 0 : _e.borderBottom) {
                height -= this.canvasBorder.borderBottom;
            }
        }
        return height;
    };
    SciChartPieSurface.prototype.draw = function () {
        var _this = this;
        if (this.pieSegments.size() === 0)
            return;
        if (this.sweepAnimationDone || !this.animate) {
            this.deleteInternals();
            this.drawChart();
        }
        else {
            var frames_1 = this.animationFrames;
            this.suspendUpdate = true;
            var setSuspendUpdateFalse_1 = function () { return (_this.suspendUpdate = false); };
            var setSweepAnimationDone_1 = function () { return (_this.sweepAnimationDone = true); };
            var callInvalidateElement_1 = this.invalidateElement;
            var callDrawChart_1 = this.drawChart;
            var callDelete_1 = this.deleteInternals;
            (function myLoop(k) {
                setTimeout(function () {
                    var animationProgress = k / frames_1;
                    callDelete_1(true);
                    callDrawChart_1(animationProgress);
                    if (k === frames_1) {
                        setSuspendUpdateFalse_1();
                        setSweepAnimationDone_1();
                        callInvalidateElement_1();
                    }
                    if (++k <= frames_1)
                        myLoop(k);
                }, 20);
            })(1);
        }
        // ADD EVENT LISTENERS
        if (!app_1.IS_TEST_ENV) {
            this.pieSegments.asArray().forEach(function (ps) {
                var el = _this.domChartRoot.querySelector("[id='".concat(ps.id, "']"));
                if (el) {
                    var subscriptionToken = (0, exports.addEventListenerToPieSegment)(ps, el, _this.animate);
                    _this.addDeletable(subscriptionToken);
                }
            });
        }
        this.rendered.raiseEvent();
    };
    /**
     * @description Draws pie chart itself
     * @param animationProgress - Current progress from 0 to 1, is being used for sweep animation on start.
     */
    SciChartPieSurface.prototype.drawChart = function (animationProgress) {
        var _this = this;
        if (animationProgress === void 0) { animationProgress = 1; }
        var totalValue = this.pieSegmentsTotalValue();
        if (!totalValue) {
            return;
        }
        var strokeWidth = 2;
        var strokeColor = this.themeProviderProperty.sciChartBackground;
        var segments = this.pieSegments.asArray();
        var totalOldValue = this.pieSegmentsTotalOldValue();
        var outerRadius = (Math.min(this.calculateViewRectWidth(this.viewRect.width), this.calculateViewRectHeight(this.viewRect.height)) *
            0.8) /
            2;
        var innerRadius = 0;
        if (this.pieType === EPieType.Donut) {
            innerRadius =
                this.holeRadiusSizingMode === ESizingMode.Absolute ? this.holeRadius : outerRadius * this.holeRadius;
        }
        var xCoord = this.calculateViewRectWidth(this.viewRect.width) / 2;
        var yCoord = this.calculateViewRectHeight(this.viewRect.height) / 2;
        // CREATING SVG STRING
        var gradientsBlock = "<defs>";
        var pathsBlock = "";
        var currentValue = 0;
        var currentOldValue = 0;
        segments.forEach(function (el, index) {
            var _a;
            if (el.value === 0) {
                return;
            }
            var oldValue = (_a = el.oldValue) !== null && _a !== void 0 ? _a : 0;
            var newFrom = (360 * currentValue) / totalValue - START_ANGLE;
            var newTo = (360 * (currentValue + el.value)) / totalValue - START_ANGLE - 0.0001; // newTo != newFrom - for only 1 segment
            var oldFrom = (360 * currentOldValue) / totalOldValue - START_ANGLE;
            var oldTo = (360 * (currentOldValue + oldValue)) / totalOldValue - START_ANGLE;
            currentValue += el.value;
            currentOldValue += oldValue;
            var angleFrom = oldFrom + (newFrom - oldFrom) * EasingFunctions_1.easing.inOutCubic(animationProgress);
            var angleTo = oldTo + (newTo - oldTo) * EasingFunctions_1.easing.inOutCubic(animationProgress);
            var hasGradient = !!el.colorLinearGradient;
            var gradientId = "grad".concat(el.id);
            if (hasGradient) {
                var x1 = el.colorLinearGradient.startPoint.x * 100;
                var y1 = el.colorLinearGradient.startPoint.y * 100;
                var x2 = el.colorLinearGradient.endPoint.x * 100;
                var y2 = el.colorLinearGradient.endPoint.y * 100;
                var gradientBlock_1 = "<linearGradient id=\"".concat(gradientId, "\" x1=\"").concat(x1, "%\" y1=\"").concat(y1, "%\" x2=\"").concat(x2, "%\" y2=\"").concat(y2, "%\">");
                el.colorLinearGradient.gradientStops.forEach(function (gStop) {
                    var offset = gStop.offset * 100;
                    gradientBlock_1 += "<stop offset=\"".concat(offset, "%\" style=\"stop-color:").concat(gStop.color, ";stop-opacity:1\" />");
                });
                gradientBlock_1 += "</linearGradient>";
                gradientsBlock += gradientBlock_1;
            }
            var dAttribute = _this.pieType === EPieType.Donut
                ? getDonutSectorPath(xCoord, yCoord, outerRadius * el.radiusAdjustment, innerRadius, angleFrom, angleTo, el.shift + _this.seriesSpacing)
                : getSectorPath(xCoord, yCoord, outerRadius * el.radiusAdjustment, angleFrom, angleTo, el.shift + _this.seriesSpacing);
            var pathBlock = hasGradient
                ? "<g fill=\"url(#".concat(gradientId, ")\"><path id=\"").concat(el.id, "\" stroke=\"").concat(strokeColor, "\" stroke-width=\"").concat(strokeWidth, "\" d=\"").concat(dAttribute, "\" /></g>")
                : "<path id=\"".concat(el.id, "\" stroke=\"").concat(strokeColor, "\" stroke-width=\"").concat(strokeWidth, "\" d=\"").concat(dAttribute, "\" fill=\"").concat(el.color, "\" />");
            pathsBlock += pathBlock;
            if (animationProgress === 1 || el.oldValue) {
                _this.drawSegmentLabel(el, index, totalValue, angleFrom, angleTo, xCoord, yCoord, outerRadius * el.radiusAdjustment, innerRadius);
            }
        });
        gradientsBlock += "</defs>";
        this.adjustDomContainer();
        var svgString = "<svg width=\"".concat(this.calculateViewRectWidth(this.viewRect.width), "\" height=\"").concat(this.calculateViewRectHeight(this.viewRect.height), "\">").concat(gradientsBlock).concat(pathsBlock, "</svg>");
        // CREATING AND ATTACHING SVG TO DOM
        var svgNode = annotationHelpers_1.annotationHelpers.createSvg(svgString, this.domSvgContainer);
        this.svg = svgNode;
    };
    SciChartPieSurface.prototype.adjustDomContainer = function () {
        var _a, _b, _c, _d, _e, _f;
        if (this.padding && this.padding.left) {
            this.domSvgContainer.style.paddingLeft = this.padding.left + "px";
        }
        if (this.padding && this.padding.right) {
            this.domSvgContainer.style.paddingRight = this.padding.right + "px";
        }
        if (this.padding && this.padding.top) {
            this.domSvgContainer.style.paddingTop = this.padding.top + "px";
        }
        if (this.padding && this.padding.bottom) {
            this.domSvgContainer.style.paddingBottom = this.padding.bottom + "px";
        }
        if (this.canvasBorder) {
            this.domSvgContainer.style.borderStyle = "solid";
        }
        if ((_a = this.canvasBorder) === null || _a === void 0 ? void 0 : _a.border) {
            this.domSvgContainer.style.borderWidth = this.canvasBorder.border + "px";
        }
        if ((_b = this.canvasBorder) === null || _b === void 0 ? void 0 : _b.color) {
            this.domSvgContainer.style.borderColor = this.canvasBorder.color;
        }
        if ((_c = this.canvasBorder) === null || _c === void 0 ? void 0 : _c.borderBottom) {
            this.domSvgContainer.style.borderBottomWidth = this.canvasBorder.borderBottom + "px";
        }
        if ((_d = this.canvasBorder) === null || _d === void 0 ? void 0 : _d.borderTop) {
            this.domSvgContainer.style.borderTopWidth = this.canvasBorder.borderTop + "px";
        }
        if ((_e = this.canvasBorder) === null || _e === void 0 ? void 0 : _e.borderLeft) {
            this.domSvgContainer.style.borderLeftWidth = this.canvasBorder.borderLeft + "px";
        }
        if ((_f = this.canvasBorder) === null || _f === void 0 ? void 0 : _f.borderRight) {
            this.domSvgContainer.style.borderRightWidth = this.canvasBorder.borderRight + "px";
        }
    };
    SciChartPieSurface.prototype.drawSegmentLabel = function (el, index, totalValue, angleFrom, angleTo, xCoord, yCoord, outerRadius, innerRadius) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        if (el.showLabel === false)
            return;
        var labelDivId = "segment" + index;
        var div = this.titleDivs.find(function (d) { return d.id === labelDivId; });
        if (!div) {
            div = document.createElement("div");
            var labelStyle = el.labelStyle;
            div.className = "scichart-pie-text-container";
            div.id = labelDivId;
            div.style.position = "absolute";
            div.style.pointerEvents = "none";
            div.style.padding = "5px";
            div.style.borderRadius = "3px";
            this.titleDivs.push(div);
            this.domDivContainer.appendChild(div);
            div.style.display = "block";
        }
        div.style.color = el.labelStyle.color;
        div.style.fontWeight = el.labelStyle.fontWeight;
        div.style.fontFamily = el.labelStyle.fontFamily;
        div.style.fontSize = el.labelStyle.fontSize.toString() + "px";
        div.innerHTML = el.getLabelText(totalValue);
        var divWidth = div.offsetWidth;
        var divHeight = div.offsetHeight;
        var leftShift = 0;
        var topShift = 0;
        if ((_a = this.padding) === null || _a === void 0 ? void 0 : _a.left) {
            leftShift += (_b = this.padding) === null || _b === void 0 ? void 0 : _b.left;
        }
        if ((_c = this.padding) === null || _c === void 0 ? void 0 : _c.top) {
            topShift += (_d = this.padding) === null || _d === void 0 ? void 0 : _d.top;
        }
        if ((_e = this.canvasBorder) === null || _e === void 0 ? void 0 : _e.border) {
            leftShift += (_f = this.canvasBorder) === null || _f === void 0 ? void 0 : _f.border;
            topShift += (_g = this.canvasBorder) === null || _g === void 0 ? void 0 : _g.border;
        }
        else {
            if ((_h = this.canvasBorder) === null || _h === void 0 ? void 0 : _h.borderLeft) {
                leftShift += (_j = this.canvasBorder) === null || _j === void 0 ? void 0 : _j.borderLeft;
            }
            if ((_k = this.canvasBorder) === null || _k === void 0 ? void 0 : _k.borderTop) {
                leftShift += (_l = this.canvasBorder) === null || _l === void 0 ? void 0 : _l.borderTop;
            }
        }
        var position = this.calcTitlePosition(xCoord + leftShift, yCoord + topShift, outerRadius, innerRadius, angleFrom, angleTo, el.shift + this.seriesSpacing, divWidth, divHeight);
        div.style.left = "".concat(position.left + el.labelOffset.x, "px");
        div.style.top = "".concat(position.top + el.labelOffset.y, "px");
    };
    SciChartPieSurface.prototype.pieSegmentsTotalValue = function () {
        return this.pieSegments.asArray().reduce(function (prev, cur) { return prev + cur.value; }, 0);
    };
    SciChartPieSurface.prototype.pieSegmentsTotalOldValue = function () {
        var total = this.pieSegments.asArray().reduce(function (prev, cur) { var _a; return prev + ((_a = cur.oldValue) !== null && _a !== void 0 ? _a : 0); }, 0);
        return total > 0 ? total : 1;
    };
    SciChartPieSurface.prototype.applySciChartBackground = function (htmlColor) {
        this.domCanvas2D.style.background = htmlColor;
    };
    return SciChartPieSurface;
}(DeletableEntity_1.DeletableEntity));
exports.SciChartPieSurface = SciChartPieSurface;
/**
 * @ignore
 * @description Create sector path string
 * @param x - circle x coordinate
 * @param y - circle y coordinate
 * @param outerRadius - circle radius
 * @param a1 - angleFrom in degrees
 * @param a2 - angleTo in degrees
 * @param delta - sector shift, is used for selected sectors
 */
var getSectorPath = function (x, y, outerRadius, a1, a2, delta) {
    var bigArc = Math.abs(a2 - a1) > 180 ? 1 : 0;
    var deltaAngle = (a1 + a2) / 2;
    var deltaX = Math.cos(DEG_TO_RAD * deltaAngle) * delta;
    var deltaY = Math.sin(DEG_TO_RAD * deltaAngle) * delta;
    var cx1 = Math.cos(DEG_TO_RAD * a2) * outerRadius + x + deltaX;
    var cy1 = Math.sin(DEG_TO_RAD * a2) * outerRadius + y + deltaY;
    var cx2 = Math.cos(DEG_TO_RAD * a1) * outerRadius + x + deltaX;
    var cy2 = Math.sin(DEG_TO_RAD * a1) * outerRadius + y + deltaY;
    if (Math.abs(cx1 - cx2) < 0.0001) {
        cx2 += 0.001;
    }
    return "M".concat(x + deltaX, " ").concat(y + deltaY, " ").concat(cx1, " ").concat(cy1, " A").concat(outerRadius, " ").concat(outerRadius, " 0 ").concat(bigArc, " 0 ").concat(cx2, " ").concat(cy2, "Z");
};
/**
 * @ignore
 * @description Create donut sector path string
 * @param x - circle x coordinate
 * @param y - circle y coordinate
 * @param outerR - circle outer radius
 * @param innerR - circle inner radius
 * @param a1 - angleFrom in degrees
 * @param a2 - angleTo in degrees
 * @param delta - sector shift, is used for selected sectors
 */
var getDonutSectorPath = function (x, y, outerR, innerR, a1, a2, delta) {
    var bigArc = Math.abs(a2 - a1) > 180 ? 1 : 0;
    var deltaAngle = (a1 + a2) / 2;
    var deltaX = Math.cos(DEG_TO_RAD * deltaAngle) * delta;
    var deltaY = Math.sin(DEG_TO_RAD * deltaAngle) * delta;
    var outerX1 = Math.cos(DEG_TO_RAD * a2) * outerR + x + deltaX;
    var outerY1 = Math.sin(DEG_TO_RAD * a2) * outerR + y + deltaY;
    var outerX2 = Math.cos(DEG_TO_RAD * a1) * outerR + x + deltaX;
    var outerY2 = Math.sin(DEG_TO_RAD * a1) * outerR + y + deltaY;
    var innerX1 = Math.cos(DEG_TO_RAD * a2) * innerR + x + deltaX;
    var innerY1 = Math.sin(DEG_TO_RAD * a2) * innerR + y + deltaY;
    var innerX2 = Math.cos(DEG_TO_RAD * a1) * innerR + x + deltaX;
    var innerY2 = Math.sin(DEG_TO_RAD * a1) * innerR + y + deltaY;
    return "M".concat(outerX1, " ").concat(outerY1, " A").concat(outerR, " ").concat(outerR, " 0 ").concat(bigArc, " 0 ").concat(outerX2, " ").concat(outerY2, " L").concat(innerX2, " ").concat(innerY2, " A").concat(innerR, " ").concat(innerR, " 0 ").concat(bigArc, " 1 ").concat(innerX1, " ").concat(innerY1, "Z");
};
/** @ignore */
var isListenerBlocked = false;
/** @ignore */
var addEventListenerToPieSegment = function (ps, el, animate) {
    var eventListener = function (e) {
        if (!animate) {
            ps.isSelected = !ps.isSelected;
            return;
        }
        // ANIMATE
        if (!isListenerBlocked) {
            var ROUNDS_1 = 10;
            var directionDown = ps.isSelected;
            var start_1 = directionDown ? ps.delta : 0;
            var d_1 = directionDown ? -ps.delta / ROUNDS_1 : ps.delta / ROUNDS_1;
            isListenerBlocked = true;
            ps.isSelected = !ps.isSelected;
            (function myLoop(k) {
                setTimeout(function () {
                    ps.shift = start_1 + d_1 * k;
                    if (k === ROUNDS_1) {
                        isListenerBlocked = false;
                    }
                    if (++k <= ROUNDS_1)
                        myLoop(k);
                }, 20);
            })(1);
        }
    };
    el.addEventListener("click", eventListener);
    return {
        eventListener: eventListener,
        eventType: "click",
        element: el,
        delete: function () { return el.removeEventListener("click", eventListener); }
    };
};
exports.addEventListenerToPieSegment = addEventListenerToPieSegment;
