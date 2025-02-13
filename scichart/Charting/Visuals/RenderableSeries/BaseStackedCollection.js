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
exports.BaseStackedCollection = void 0;
var AnimationFiniteStateMachine_1 = require("../../../Core/Animations/AnimationFiniteStateMachine");
var DeletableEntity_1 = require("../../../Core/DeletableEntity");
var Deleter_1 = require("../../../Core/Deleter");
var NumberRange_1 = require("../../../Core/NumberRange");
var ObservableArray_1 = require("../../../Core/ObservableArray");
var SearchMode_1 = require("../../../types/SearchMode");
var YRangeMode_1 = require("../../../types/YRangeMode");
var guid_1 = require("../../../utils/guid");
var MemoryUsageHelper_1 = require("../../../utils/MemoryUsageHelper");
var BaseDataSeries_1 = require("../../Model/BaseDataSeries");
var AxisCore_1 = require("../Axis/AxisCore");
var animationHelpers_1 = require("./Animations/animationHelpers");
var constants_1 = require("./constants");
/**
 * A base class for stacked collections, which are used to create stacked mountain or column chart types.
 * Concrete types are {@link StackedColumnCollection} and {@link StackedMountainCollection}
 */
var BaseStackedCollection = /** @class */ (function (_super) {
    __extends(BaseStackedCollection, _super);
    /**
     * Creates an instance of the {@link BaseStackedCollection}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options Optional parameters of type {@link IBaseStackedCollectionOptions} to configure the series
     */
    function BaseStackedCollection(webAssemblyContext, options) {
        var _this = this;
        var _a, _b, _c, _d, _e;
        _this = _super.call(this) || this;
        /** @inheritDoc */
        _this.id = (0, guid_1.generateGuid)();
        /** @inheritDoc */
        _this.isStacked = true;
        /** @inheritDoc */
        _this.supportsResampling = false;
        /** @inheritDoc */
        _this.isSpline = false;
        /** @inheritDoc */
        _this.enableDrawingOptimisations = true;
        _this.isAccumulatedVectorDirty = true;
        _this.firstAnimationRender = false;
        _this.isVisibleProperty = true;
        _this.xAxisIdProperty = AxisCore_1.AxisCore.DEFAULT_AXIS_ID;
        _this.yAxisIdProperty = AxisCore_1.AxisCore.DEFAULT_AXIS_ID;
        _this.isOneHundredPercentProperty = false;
        _this.animationQueue = [];
        _this.yRangeModeProperty = YRangeMode_1.EYRangeMode.Drawn;
        _this.webAssemblyContext = webAssemblyContext;
        _this.isVisibleProperty = (_a = options === null || options === void 0 ? void 0 : options.isVisible) !== null && _a !== void 0 ? _a : _this.isVisibleProperty;
        _this.xAxisIdProperty = (_b = options === null || options === void 0 ? void 0 : options.xAxisId) !== null && _b !== void 0 ? _b : _this.xAxisIdProperty;
        _this.yAxisIdProperty = (_c = options === null || options === void 0 ? void 0 : options.yAxisId) !== null && _c !== void 0 ? _c : _this.yAxisIdProperty;
        _this.isOneHundredPercentProperty = (_d = options === null || options === void 0 ? void 0 : options.isOneHundredPercent) !== null && _d !== void 0 ? _d : _this.isOneHundredPercentProperty;
        _this.yRangeModeProperty = (_e = options === null || options === void 0 ? void 0 : options.yRangeMode) !== null && _e !== void 0 ? _e : _this.yRangeModeProperty;
        _this.updateAnimationProperties = _this.updateAnimationProperties.bind(_this);
        _this.notifyPropertyChanged = _this.notifyPropertyChanged.bind(_this);
        _this.getParentSurface = _this.getParentSurface.bind(_this);
        _this.beforeAnimationStart = _this.beforeAnimationStart.bind(_this);
        _this.afterAnimationComplete = _this.afterAnimationComplete.bind(_this);
        _this.updateAnimationProperties = _this.updateAnimationProperties.bind(_this);
        _this.accumulatedValues0 = new _this.webAssemblyContext.SCRTDoubleVector();
        _this.accumulatedFinalAnimationValues0 = new _this.webAssemblyContext.SCRTDoubleVector();
        try {
            if (process.env.NODE_ENV !== "production") {
                if (MemoryUsageHelper_1.MemoryUsageHelper.isMemoryUsageDebugEnabled) {
                    return (0, DeletableEntity_1.createTrackableProxy)(_this);
                }
            }
        }
        catch (err) {
            console.warn(err);
        }
        return _this;
    }
    Object.defineProperty(BaseStackedCollection.prototype, "isVisibleChanged", {
        /** @inheritDoc */
        get: function () {
            throw new Error("getting visibleChanged event is not supported for BaseStackedCollection");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "selected", {
        /** @inheritDoc */
        get: function () {
            throw new Error("getting selected event is not supported for BaseStackedCollection");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "hovered", {
        /** @inheritDoc */
        get: function () {
            throw new Error("getting hovered event is not supported for BaseStackedCollection");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "isSelected", {
        /** @inheritDoc */
        get: function () {
            return false;
        },
        /** @inheritDoc */
        set: function (isSelected) {
            throw new Error("Setting isSelected is not supported for BaseStackedCollection");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "isHovered", {
        /** @inheritDoc */
        get: function () {
            return false;
        },
        /** @inheritDoc */
        set: function (isHovered) {
            throw new Error("Setting isHovered is not supported for BaseStackedCollection");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "isDigitalLine", {
        /** @inheritDoc */
        get: function () {
            throw new Error("Setting or getting isDigitalLine is not supported for BaseStackedCollection");
        },
        /** @inheritDoc */
        set: function (isDigitalLine) {
            throw new Error("Setting or getting isDigitalLine is not supported for BaseStackedCollection");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "isVisible", {
        /** @inheritDoc */
        get: function () {
            return this.isVisibleProperty;
        },
        /** @inheritDoc */
        set: function (isVisible) {
            this.isVisibleProperty = isVisible;
            this.notifyPropertyChanged(constants_1.PROPERTY.IS_VISIBLE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "xAxis", {
        /** @inheritDoc */
        get: function () {
            var _this = this;
            return this.parentSurface.xAxes.asArray().find(function (el) { return el.id === _this.xAxisId; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "xAxisId", {
        /** @inheritDoc */
        get: function () {
            return this.xAxisIdProperty;
        },
        /**
         * @inheritDoc
         */
        set: function (id) {
            this.xAxisIdProperty = id;
            this.notifyPropertyChanged(constants_1.PROPERTY.XAXIS_ID);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "yAxis", {
        /** @inheritDoc */
        get: function () {
            var _this = this;
            return this.parentSurface.yAxes.asArray().find(function (el) { return el.id === _this.yAxisId; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "yAxisId", {
        /** @inheritDoc */
        get: function () {
            return this.yAxisIdProperty;
        },
        /** @inheritDoc */
        set: function (id) {
            this.yAxisIdProperty = id;
            this.notifyPropertyChanged(constants_1.PROPERTY.YAXIS_ID);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "isOneHundredPercent", {
        /**
         * Gets or sets 100% mode. When true, the stacked group becomes a 100% stacked chart
         */
        get: function () {
            return this.isOneHundredPercentProperty;
        },
        /**
         * Gets or sets 100% mode. When true, the stacked group becomes a 100% stacked chart
         */
        set: function (value) {
            this.isOneHundredPercentProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.IS_ONE_HUNDRED_PERCENT);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "yRangeMode", {
        /** @inheritDoc */
        get: function () {
            return this.yRangeModeProperty;
        },
        set: function (value) {
            if (this.yRangeModeProperty !== value) {
                this.yRangeModeProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.YRANGEMODE);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "dataSeries", {
        // PROPERTIES END
        // Un-Supported PROPERTIES
        /**
         * dataSeries property is not supported for BaseStackedCollection
         */
        get: function () {
            throw Error("dataSeries property is not supported for BaseStackedCollection");
        },
        /**
         * dataSeries property is not supported for BaseStackedCollection
         */
        set: function (value) {
            throw Error("dataSeries property is not supported for BaseStackedCollection");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "drawNaNAs", {
        /**
         * drawNaNAs property is not supported for BaseStackedCollection
         */
        get: function () {
            throw Error("drawNaNAs property is not supported for BaseStackedCollection");
        },
        /**
         * drawNaNAs property is not supported for BaseStackedCollection
         */
        set: function (value) {
            throw Error("drawNaNAs property is not supported for BaseStackedCollection");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "drawingProviders", {
        /**
         * drawingProviders property is not supported for BaseStackedCollection
         */
        get: function () {
            throw Error("drawingProviders property is not supported for BaseStackedCollection");
        },
        /**
         * drawingProviders property is not supported for BaseStackedCollection
         */
        set: function (value) {
            throw Error("drawingProviders property is not supported for BaseStackedCollection");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "hitTestProvider", {
        /**
         * hitTestProvider property is not supported for BaseStackedCollection
         */
        get: function () {
            throw Error("hitTestProvider property is not supported for BaseStackedCollection, call hitTestProvider on BaseStackedRenderableSeries instead");
        },
        /**
         * hitTestProvider property is not supported for BaseStackedCollection
         */
        set: function (value) {
            throw Error("hitTestProvider property is not supported for BaseStackedCollection, call hitTestProvider on BaseStackedRenderableSeries instead");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "paletteProvider", {
        /**
         * paletteProvider property is not supported for BaseStackedCollection
         */
        get: function () {
            throw Error("paletteProvider property is not supported for BaseStackedCollection");
        },
        /**
         * paletteProvider property is not supported for BaseStackedCollection
         */
        set: function (value) {
            throw Error("paletteProvider property is not supported for BaseStackedCollection");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "pointMarker", {
        /**
         * pointMarker property is not supported for BaseStackedCollection
         */
        get: function () {
            throw Error("pointMarker property is not supported for BaseStackedCollection");
        },
        /**
         * pointMarker property is not supported for BaseStackedCollection
         */
        set: function (value) {
            throw Error("pointMarker property is not supported for BaseStackedCollection");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "rolloverModifierProps", {
        /**
         * rolloverModifierProps property is not supported for BaseStackedCollection
         */
        get: function () {
            throw Error("rolloverModifierProps property is not supported for BaseStackedCollection");
        },
        /**
         * rolloverModifierProps property is not supported for BaseStackedCollection
         */
        set: function (value) {
            throw Error("rolloverModifierProps property is not supported for BaseStackedCollection");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "stroke", {
        /**
         * stroke property is not supported for BaseStackedCollection
         */
        get: function () {
            throw Error("stroke property is not supported for BaseStackedCollection");
        },
        /**
         * stroke property is not supported for BaseStackedCollection
         */
        set: function (value) {
            throw Error("stroke property is not supported for BaseStackedCollection");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "strokeThickness", {
        /**
         * strokeThickness property is not supported for BaseStackedCollection
         */
        get: function () {
            throw Error("strokeThickness property is not supported for BaseStackedCollection");
        },
        /**
         * strokeThickness property is not supported for BaseStackedCollection
         */
        set: function (value) {
            throw Error("strokeThickness property is not supported for BaseStackedCollection");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "effect", {
        /**
         * effect property is not supported for BaseStackedCollection
         */
        get: function () {
            throw Error("effect property is not supported for BaseStackedCollection");
        },
        /**
         * effect property is not supported for BaseStackedCollection
         */
        set: function (effect) {
            throw Error("effect property is not supported for BaseStackedCollection");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "opacity", {
        /**
         * opacity property is not supported for BaseStackedCollection
         */
        get: function () {
            throw Error("opacity property is not supported for BaseStackedCollection");
        },
        /**
         * opacity property is not supported for BaseStackedCollection
         */
        set: function (value) {
            throw Error("effect property is not supported for BaseStackedCollection");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "rolloverModifierProps1", {
        /**
         * rolloverModifierProps1() is not supported for BaseStackedCollection
         */
        get: function () {
            throw Error("rolloverModifierProps1() method is not supported for BaseStackedCollection");
        },
        /**
         * rolloverModifierProps1() is not supported for BaseStackedCollection
         */
        set: function (value) {
            throw Error("rolloverModifierProps1() method is not supported for BaseStackedCollection");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "resamplingMode", {
        /**
         * resamplingMode property is not supported for BaseStackedCollection
         */
        get: function () {
            throw Error("resamplingMode property is not supported for BaseStackedCollection");
        },
        set: function (value) {
            throw Error("resamplingMode property is not supported for BaseStackedCollection");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "resamplingPrecision", {
        /**
         * resamplingPrecision property is not supported for BaseStackedCollection
         */
        get: function () {
            throw Error("resamplingPrecision property is not supported for BaseStackedCollection");
        },
        set: function (value) {
            throw Error("resamplingPrecision property is not supported for BaseStackedCollection");
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Notify the collection that the accumulated values need to be recalculated
     */
    BaseStackedCollection.prototype.setAccumulatedValuesDirty = function () {
        this.isAccumulatedVectorDirty = true;
    };
    /** @inheritDoc */
    BaseStackedCollection.prototype.getIndicesRange = function (xRange) {
        throw Error("getIndicesRange() method is not supported for BaseStackedCollection");
    };
    Object.defineProperty(BaseStackedCollection.prototype, "canDraw", {
        get: function () {
            return animationHelpers_1.animationHelpers.checkCanDraw(this.animationFSM);
        },
        enumerable: false,
        configurable: true
    });
    /** @inheritDoc */
    BaseStackedCollection.prototype.pushPalettedColors = function (color, palettingState) {
        throw new Error("Method not implemented.");
    };
    /** @inheritDoc */
    BaseStackedCollection.prototype.getSeriesInfo = function (hitTestInfo) {
        throw new Error("Method not implemented.");
    };
    /** @inheritDoc */
    BaseStackedCollection.prototype.applyTheme = function (themeProvider) {
        this.asArray().forEach(function (rs) {
            rs.applyTheme(themeProvider);
        });
    };
    /** @inheritDoc */
    BaseStackedCollection.prototype.delete = function () {
        this.accumulatedValues0 = (0, Deleter_1.deleteSafe)(this.accumulatedValues0);
        this.accumulatedFinalAnimationValues0 = (0, Deleter_1.deleteSafe)(this.accumulatedFinalAnimationValues0);
        this.dataLabelProviderProperty = (0, Deleter_1.deleteSafe)(this.dataLabelProvider);
        this.asArray().forEach(function (series) {
            series.delete();
        });
    };
    /** @inheritDoc */
    BaseStackedCollection.prototype.notifyPropertyChanged = function (propertyName) {
        this.invalidateParent();
    };
    /** @inheritDoc */
    BaseStackedCollection.prototype.onDpiChanged = function (args) {
        this.asArray().forEach(function (rs) { return rs.onDpiChanged(args); });
    };
    /** @inheritDoc */
    BaseStackedCollection.prototype.getBaseXValues = function () {
        // TODO: find out do we need this method at all
        return [];
    };
    /** @inheritDoc */
    BaseStackedCollection.prototype.getDataSeriesName = function () {
        // TODO: come up with some better name
        return "Stacked Collection";
    };
    /** @inheritDoc */
    BaseStackedCollection.prototype.getDataSeriesValuesCount = function () {
        if (!this.getNativeXValues()) {
            return undefined;
        }
        return this.getNativeXValues().size();
    };
    /** @inheritDoc */
    BaseStackedCollection.prototype.getNativeXValues = function () {
        var _a;
        if (this.size() === 0) {
            return undefined;
        }
        return (_a = this.get(0).dataSeries) === null || _a === void 0 ? void 0 : _a.getNativeXValues();
    };
    /** @inheritDoc */
    BaseStackedCollection.prototype.getYRange = function (xVisibleRange, isXCategoryAxis) {
        var _this = this;
        if (!this.isEnoughDataToDraw()) {
            return new NumberRange_1.NumberRange();
        }
        var maxRange;
        this.getVisibleSeries().forEach(function (rs) {
            if (rs.accumulatedValues.size() === _this.getNativeXValues().size()) {
                // TODO: calc isSorted flag
                var range = (0, BaseDataSeries_1.getWindowedYRange)(_this.webAssemblyContext, _this.getNativeXValues(), rs.accumulatedValues, xVisibleRange, true, isXCategoryAxis, true, _this.yRangeMode === YRangeMode_1.EYRangeMode.Visible ? SearchMode_1.ESearchMode.RoundUp : SearchMode_1.ESearchMode.RoundDown, _this.yRangeMode === YRangeMode_1.EYRangeMode.Visible ? SearchMode_1.ESearchMode.RoundDown : SearchMode_1.ESearchMode.RoundUp);
                if (range) {
                    maxRange = maxRange ? maxRange.union(range) : range;
                }
            }
        });
        if (maxRange)
            return maxRange;
        return new NumberRange_1.NumberRange();
    };
    /** @inheritDoc */
    BaseStackedCollection.prototype.hasDataSeries = function () {
        return !!this.getNativeXValues();
    };
    /** @inheritDoc */
    BaseStackedCollection.prototype.hasStrokePaletteProvider = function () {
        // TODO: implement
        return false;
    };
    /** @inheritDoc */
    BaseStackedCollection.prototype.hasFillPaletteProvider = function () {
        // TODO: implement
        return false;
    };
    /** @inheritDoc */
    BaseStackedCollection.prototype.hasPointMarkerPaletteProvider = function () {
        // TODO: implement
        return false;
    };
    /** @inheritDoc */
    BaseStackedCollection.prototype.onAttach = function (scs) {
        this.parentSurface = scs;
        if (this.invalidateParentCallback) {
            throw new Error("Invalid operation in sciChartSurface.attachSeries, this series has already been attached to a SciChartSurface. Please detach it from a SciChartSurface before attaching to another");
        }
        this.invalidateParentCallback = scs.invalidateElement;
    };
    /** @inheritDoc */
    BaseStackedCollection.prototype.onDetach = function () {
        this.invalidateParentCallback = undefined;
        this.parentSurface = undefined;
    };
    /**
     * Gets visible renderable series array
     */
    BaseStackedCollection.prototype.getVisibleSeries = function () {
        return this.asArray().filter(function (el) { return el.isVisible; });
    };
    /** @inheritDoc */
    BaseStackedCollection.prototype.enqueueAnimation = function (animation) {
        this.animationQueue.push(animation);
        this.invalidateParent();
    };
    /** @inheritDoc */
    BaseStackedCollection.prototype.runAnimation = function (animation) {
        this.animationQueue = [];
        this.animationFSM.toCompleted();
        this.afterAnimationComplete();
    };
    Object.defineProperty(BaseStackedCollection.prototype, "animation", {
        /**
         * Sets a start up animation class, a child class for {@link BaseAnimation}
         */
        set: function (value) {
            if (value) {
                this.animationQueue.push(value);
            }
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseStackedCollection.prototype, "isRunningAnimation", {
        /** @inheritDoc */
        get: function () {
            if (animationHelpers_1.animationHelpers.checkIsAnimationRunning(this.animationQueue, this.animationFSM)) {
                return true;
            }
            if (this.getVisibleSeries().some(function (s) { return s.isRunningAnimation; })) {
                return true;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    /** @inheritDoc */
    BaseStackedCollection.prototype.onAnimate = function (timeElapsed) {
        var _a;
        if (!this.animationFSM || ((_a = this.animationFSM) === null || _a === void 0 ? void 0 : _a.is([AnimationFiniteStateMachine_1.EAnimationState.Completed]))) {
            if (this.animationQueue.length >= 1) {
                var animation = this.animationQueue.shift();
                this.animationFSM = new AnimationFiniteStateMachine_1.SeriesAnimationFiniteStateMachine(animation, undefined);
            }
            else {
                this.animationFSM = undefined;
            }
        }
        this.getVisibleSeries().forEach(function (rs) {
            if (rs.isRunningAnimation) {
                rs.onAnimate(timeElapsed);
            }
        });
        if (!this.animationFSM)
            return;
        animationHelpers_1.animationHelpers.animationUpdate(this.animationFSM, timeElapsed, this.beforeAnimationStart, this.afterAnimationComplete, this.updateAnimationProperties);
    };
    /**
     * checkIsOutOfDataRange() is not supported for BaseStackedCollection
     * @param xValue
     * @param yValue
     */
    BaseStackedCollection.prototype.checkIsOutOfDataRange = function (xValue, yValue) {
        throw Error("checkIsOutOfDataRange() method is not supported for BaseStackedCollection");
    };
    /** @inheritDoc */
    BaseStackedCollection.prototype.toPointSeries = function (resamplingParams) {
        // not used for BaseStackedCollection
        return undefined;
    };
    /**
     * getCurrentRenderPassData method is not supported for BaseStackedCollection
     */
    BaseStackedCollection.prototype.getCurrentRenderPassData = function () {
        return this.currentRenderPassData;
    };
    /** @inheritDoc */
    BaseStackedCollection.prototype.setCurrentRenderPassData = function (renderPassData) {
        this.currentRenderPassData = renderPassData;
    };
    /** @inheritDoc */
    BaseStackedCollection.prototype.getResamplingParams = function () {
        return undefined;
    };
    Object.defineProperty(BaseStackedCollection.prototype, "dataLabelProvider", {
        /** @inheritDoc */
        get: function () {
            return this.dataLabelProviderProperty;
        },
        /** @inheritDoc */
        set: function (provider) {
            this.dataLabelProviderProperty = provider;
            provider.onAttach(this.webAssemblyContext, this);
            this.notifyPropertyChanged(constants_1.PROPERTY.SERIES_TEXT_PROVIDER);
        },
        enumerable: false,
        configurable: true
    });
    /** @inheritDoc */
    BaseStackedCollection.prototype.toJSON = function (excludeData) {
        var _a;
        if (excludeData === void 0) { excludeData = false; }
        var series = [];
        for (var _i = 0, _b = this.asArray(); _i < _b.length; _i++) {
            var subSeries = _b[_i];
            series.push(subSeries.toJSON(excludeData));
        }
        var options = {
            isVisible: this.isVisible,
            isOneHundredPercent: this.isOneHundredPercent,
            xAxisId: this.xAxisId,
            yAxisId: this.yAxisId,
            yRangeMode: this.yRangeMode,
            // @ts-ignore
            dataLabelProvider: (_a = this.dataLabelProvider) === null || _a === void 0 ? void 0 : _a.toJSON()
        };
        // @ts-ignore
        return { type: this.type, series: series, options: options };
    };
    /** @inheritDoc */
    BaseStackedCollection.prototype.resolveAutoColors = function (index, maxSeries, theme) {
        for (var i = 0; i < this.size(); i++) {
            var rs = this.get(i);
            rs.resolveAutoColors(index + i, maxSeries, theme);
        }
    };
    /** @inheritDoc */
    BaseStackedCollection.prototype.adjustAutoColor = function (propertyName, color) {
        return color;
    };
    BaseStackedCollection.prototype.isAllDataSeriesSet = function () {
        var isDataSeriesSet = true;
        this.asArray().forEach(function (el) {
            if (!el.dataSeries) {
                isDataSeriesSet = false;
            }
        });
        return isDataSeriesSet;
    };
    /**
     * notifies listeners to {@link invalidateParentCallback} and redraws the {@link SciChartSurface}
     */
    BaseStackedCollection.prototype.invalidateParent = function () {
        if (this.invalidateParentCallback) {
            this.invalidateParentCallback();
        }
    };
    /**
     * Gets the first series in the collection, else undefined
     */
    BaseStackedCollection.prototype.getFirstSeries = function () {
        if (this.size() === 0) {
            return undefined;
        }
        return this.get(0);
    };
    /**
     * Gets the parent {@link SciChartSurface}
     */
    BaseStackedCollection.prototype.getParentSurface = function () {
        return this.parentSurface;
    };
    /**
     * Runs before the animation starts
     * @protected
     */
    BaseStackedCollection.prototype.beforeAnimationStart = function () {
        this.updateAccumulatedVectors();
        var size = this.accumulatedValues0.size();
        this.accumulatedFinalAnimationValues0.resize(size, 0);
        for (var i = 0; i < size; i++) {
            this.accumulatedFinalAnimationValues0.set(i, this.accumulatedValues0.get(i));
        }
        this.getVisibleSeries().forEach(function (rs) {
            rs.beforeAnimationStart();
        });
    };
    /**
     * Runs after the animation is complete
     * @protected
     */
    BaseStackedCollection.prototype.afterAnimationComplete = function () {
        this.getVisibleSeries().forEach(function (rs) {
            rs.afterAnimationComplete();
        });
    };
    /**
     * Internal method that runs on each animation tick
     * @param progress The current animation progress, a value from 0 to 1
     * @param animationFSM The animation finite state machine
     * @protected
     */
    BaseStackedCollection.prototype.updateAnimationProperties = function (progress, animationFSM) {
        if (this.isAllDataSeriesSet()) {
            animationFSM.animation.calculateAnimationValues(this.webAssemblyContext, this.accumulatedFinalAnimationValues0, this.accumulatedValues0, progress);
            this.getVisibleSeries().forEach(function (rs) {
                rs.updateAnimationProperties(progress, animationFSM);
            });
        }
        if (this.invalidateParentCallback) {
            this.invalidateParentCallback();
        }
    };
    BaseStackedCollection.prototype.updateHitTestProviders = function (renderPassData) {
        this.getVisibleSeries().forEach(function (el) {
            var _a;
            (_a = el.hitTestProvider) === null || _a === void 0 ? void 0 : _a.update(renderPassData);
        });
    };
    BaseStackedCollection.prototype.isEnoughDataToDraw = function () {
        var stackedSeriesCount = this.getVisibleSeries().length;
        if (stackedSeriesCount < 1) {
            return false;
        }
        // All renderableSeries should have dataSeries property
        for (var i = 0; i < stackedSeriesCount; i++) {
            if (!this.get(i).dataSeries) {
                return false;
            }
        }
        // All dataSeries should have some values
        for (var i = 0; i < stackedSeriesCount; i++) {
            if (this.get(i).dataSeries.count() === 0) {
                return false;
            }
        }
        return true;
    };
    return BaseStackedCollection;
}(ObservableArray_1.ObservableArray));
exports.BaseStackedCollection = BaseStackedCollection;
