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
exports.DataLabelProvider = void 0;
var Guard_1 = require("../../../../Core/Guard");
var Point_1 = require("../../../../Core/Point");
var Rect_1 = require("../../../../Core/Rect");
var TextPosition_1 = require("../../../../types/TextPosition");
var DataLabelProviderType_1 = require("../../../../types/DataLabelProviderType");
var DataLabelSkipMode_1 = require("../../../../types/DataLabelSkipMode");
var NumericFormat_1 = require("../../../../types/NumericFormat");
var number_1 = require("../../../../utils/number");
var NativeObject_1 = require("../../Helpers/NativeObject");
var BaseDataLabelProvider_1 = require("./BaseDataLabelProvider");
var DataLabelState_1 = require("./DataLabelState");
var performanceWarnings_1 = require("../../../../constants/performanceWarnings");
/**
 * This is the standard DataLabelProvider which provides a number of options for configuring data labels.
 * It defines a much richer api than BaseDataLabelProvider and is intended to be used as a base for doing small changes to data label behaviour
 * generateDataLabels calls the following functions which you can override parts of the behaviour
 * {@link ySelector} to pick the desired yValues from the pointSeries.
 * {@link shouldGenerate} to determine if any labels should be generated so you can enable labels depending on zoom or data level.
 * Then for each data point:
 *  {@link getText} Build in behaviour can get text from metadata using {@link metaDataSelector} or format the y values using {@link numericFormat} and {@link precision}
 *  {@link getPosition} By default return the x and y coordinate of the data point.  Series-specific DataLabelProviders eg {@link LineSeriesDataLabelProvider} have logic to adjust text position based on the series
 *  {@link getColor} Returns the color from the text style. Use {@link parseColorToUIntArgb} to turn color string to the required numeric value if overriding.
 *  {@link shouldSkipLabel} Decides whether to keep or ship the generated label based on the {@link }
 */
var DataLabelProvider = /** @class */ (function (_super) {
    __extends(DataLabelProvider, _super);
    /**
     * Creates an instance of the {@link DataLabelProvider}
     */
    function DataLabelProvider(options) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        _this = _super.call(this, options) || this;
        _this.type = DataLabelProviderType_1.EDataLabelProviderType.Default;
        /**
         * The text to draw, along with the sizes and positions.  Usually generated, but can be set or updated before final drawing
         */
        _this.dataLabels = [];
        /**
         * Whether the label text should update when the label position is animating. Default false.
         */
        _this.updateTextInAnimation = false;
        _this.pointGapThresholdProperty = 0;
        _this.pointCountThresholdProperty = Infinity;
        _this.numericFormatProperty = NumericFormat_1.ENumericFormat.Decimal;
        _this.engineeringPrefixProperty = {};
        _this.precisionProperty = 1;
        _this.skipModeProperty = DataLabelSkipMode_1.EDataLabelSkipMode.SkipIfOverlapPrevious;
        _this.skipNumberProperty = 0;
        _this.horizontalTextPositionProperty = TextPosition_1.EHorizontalTextPosition.Right;
        _this.verticalTextPositionProperty = TextPosition_1.EVerticalTextPosition.Above;
        _this.isEnabledProperty = true;
        _this.pointGapThresholdProperty = (_a = options === null || options === void 0 ? void 0 : options.pointGapThreshold) !== null && _a !== void 0 ? _a : _this.pointGapThresholdProperty;
        _this.pointCountThresholdProperty = (_b = options === null || options === void 0 ? void 0 : options.pointCountThreshold) !== null && _b !== void 0 ? _b : _this.pointCountThresholdProperty;
        _this.numericFormatProperty = (_c = options === null || options === void 0 ? void 0 : options.numericFormat) !== null && _c !== void 0 ? _c : _this.numericFormatProperty;
        _this.engineeringPrefixProperty = (_d = options === null || options === void 0 ? void 0 : options.engineeringPrefix) !== null && _d !== void 0 ? _d : _this.engineeringPrefixProperty;
        _this.precision = (_e = options === null || options === void 0 ? void 0 : options.precision) !== null && _e !== void 0 ? _e : _this.precisionProperty;
        _this.skipNumberProperty = (_f = options === null || options === void 0 ? void 0 : options.skipNumber) !== null && _f !== void 0 ? _f : _this.skipNumberProperty;
        _this.skipModeProperty = (_g = options === null || options === void 0 ? void 0 : options.skipMode) !== null && _g !== void 0 ? _g : _this.skipModeProperty;
        _this.metaDataSelector = options === null || options === void 0 ? void 0 : options.metaDataSelector;
        _this.ySelector = (_h = options === null || options === void 0 ? void 0 : options.ySelector) !== null && _h !== void 0 ? _h : (function (ps) { return ps.yValues; });
        _this.updateTextInAnimation = (_j = options === null || options === void 0 ? void 0 : options.updateTextInAnimation) !== null && _j !== void 0 ? _j : _this.updateTextInAnimation;
        _this.horizontalTextPositionProperty = (_k = options === null || options === void 0 ? void 0 : options.horizontalTextPosition) !== null && _k !== void 0 ? _k : _this.horizontalTextPosition;
        _this.verticalTextPositionProperty = (_l = options === null || options === void 0 ? void 0 : options.verticalTextPosition) !== null && _l !== void 0 ? _l : _this.verticalTextPosition;
        _this.isEnabledProperty = (_m = options === null || options === void 0 ? void 0 : options.isEnabled) !== null && _m !== void 0 ? _m : _this.isEnabledProperty;
        return _this;
    }
    /**
     * @inheritDoc
     */
    DataLabelProvider.prototype.onAttach = function (webAssemblyContext, parentSeries) {
        Guard_1.Guard.notNull(webAssemblyContext, "webAssemblyContext");
        Guard_1.Guard.notNull(parentSeries, "parentSeries");
        this.webAssemblyContext = webAssemblyContext;
        this.parentSeries = parentSeries;
    };
    Object.defineProperty(DataLabelProvider.prototype, "pointGapThreshold", {
        /**
         * Gets or sets the zoom threshold above which label drawing will start. Default 0.
         * This is expressed as the gap between the first points divided by the size of the first text
         * If data is unevenly spaced, consider {@link pointCountThreshold} or override shouldDrawText
         */
        get: function () {
            return this.pointGapThresholdProperty;
        },
        /**
         * Gets or sets the zoom threshold above which label drawing will start. Default 0.
         * This is expressed as the gap between the first points divided by the size of the first text
         * If data is unevenly spaced, consider {@link pointCountThreshold} or override shouldDrawText
         */
        set: function (value) {
            this.pointGapThresholdProperty = value;
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataLabelProvider.prototype, "pointCountThreshold", {
        /**
         * Gets or sets the number of points below which drawing will start.  Default Infinity
         * This can be used instead of {@link pointGapThreshold} when data is unevenly spaced or has large y variation
         */
        get: function () {
            return this.pointCountThresholdProperty;
        },
        /**
         * Gets or sets the number of points below which drawing will start. Default Infinity
         * This can be used instead of {@link pointGapThreshold} when data is unevenly spaced or has large y variation
         */
        set: function (value) {
            this.pointCountThresholdProperty = value;
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataLabelProvider.prototype, "skipMode", {
        /**
         * How do decide whether to keep or skip a label once generated.
         * Override {@link shouldSkipLabel} for more control
         */
        get: function () {
            return this.skipModeProperty;
        },
        /**
         * How do decide whether to keep or skip a label once generated.
         * Override {@link shouldSkipLabel} for more control
         */
        set: function (value) {
            this.skipModeProperty = value;
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataLabelProvider.prototype, "skipNumber", {
        /**
         * The number of points to skip while generating labels. Default 0 = no skip.  1 = skip every other.
         * When creating text with many data points, it will help performance to skip points rather than creating and checking overlap for every data point.
         */
        get: function () {
            return this.skipNumberProperty;
        },
        /**
         * The number of points to skip while generating labels. Default 0 = no skip.  1 = skip every other.
         * When creating text with many data points, it will help performance to skip points rather than creating and checking overlap for every data point.
         */
        set: function (value) {
            this.skipNumberProperty = value;
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataLabelProvider.prototype, "numericFormat", {
        /**
         * Gets or sets numeric format to use when formatting values to text. For a list of values, see {@link ENumericFormat}
         * For more control, override getText
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
    Object.defineProperty(DataLabelProvider.prototype, "engineeringPrefix", {
        /**
         * Gets the engineering prefixes to use when formatting values to text.
         */
        get: function () {
            return this.engineeringPrefixProperty;
        },
        /**
         * Gets or sets the engineering prefixes to use when formatting values to text.
         * Default - `['K','M','B','T']` for "large" prefixes, `['m','u','n','p']` for small prefixes
         * @remarks Only works when {@link ENumericFormat.Engineering} is selected
         */
        set: function (value) {
            this.engineeringPrefixProperty = value;
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataLabelProvider.prototype, "precision", {
        /**
         * Gets or sets the precision to use when formatting values to text
         * For more control, override getText
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
    Object.defineProperty(DataLabelProvider.prototype, "horizontalTextPosition", {
        /**
         * Gets or sets the horizontal text position for the label
         * For more control, override getPosition
         */
        get: function () {
            return this.horizontalTextPositionProperty;
        },
        set: function (value) {
            this.horizontalTextPositionProperty = value;
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataLabelProvider.prototype, "verticalTextPosition", {
        /**
         * Gets or sets the vertical text position for the label
         * For more control, override getPosition
         */
        get: function () {
            return this.verticalTextPositionProperty;
        },
        set: function (value) {
            this.verticalTextPositionProperty = value;
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataLabelProvider.prototype, "isEnabled", {
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
    DataLabelProvider.prototype.getText = function (state) {
        var _a;
        if (this.metaDataSelector) {
            return this.metaDataSelector(state.getMetaData());
        }
        var usefinal = !this.updateTextInAnimation && state.parentSeries.isRunningAnimation;
        var yval = usefinal ? state.yValAfterAnimation() : state.yVal();
        if (yval === yval) { //isNaN check
            if (this.engineeringPrefix) {
                return (0, number_1.formatNumber)(yval, this.numericFormat, this.precision, this.engineeringPrefixProperty);
            }
            else {
                return (0, number_1.formatNumber)(yval, (_a = this.numericFormat) !== null && _a !== void 0 ? _a : NumericFormat_1.ENumericFormat.Decimal, this.precision);
            }
        }
        else {
            return undefined;
        }
    };
    /**
     * Called at the start of generateDataLabels.  If false, no labels will be generated.
     * Checks {@link pointCountThreshold} then {@link pointGapThreshold}
     * @param state
     * @returns
     */
    DataLabelProvider.prototype.shouldGenerate = function (state) {
        var _a, _b;
        if (state.pointCount > this.pointCountThresholdProperty)
            return false;
        var firstlabel = this.getText(state);
        var bounds = (0, NativeObject_1.getTextBounds)(this.webAssemblyContext);
        state.font.CalculateStringBounds(firstlabel !== null && firstlabel !== void 0 ? firstlabel : "", bounds, (_b = (_a = this.style) === null || _a === void 0 ? void 0 : _a.lineSpacing) !== null && _b !== void 0 ? _b : 2);
        return state.pointGap >= bounds.m_fWidth * this.pointGapThreshold;
    };
    DataLabelProvider.prototype.getPosition = function (state, textBounds) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var x = state.xCoord();
        if (this.horizontalTextPosition === TextPosition_1.EHorizontalTextPosition.Center) {
            x -= textBounds.m_fWidth / 2;
        }
        else if (this.horizontalTextPosition === TextPosition_1.EHorizontalTextPosition.Left) {
            x -= textBounds.m_fWidth + ((_b = (_a = this.style.padding) === null || _a === void 0 ? void 0 : _a.right) !== null && _b !== void 0 ? _b : 0);
        }
        else {
            x += (_d = (_c = this.style.padding) === null || _c === void 0 ? void 0 : _c.left) !== null && _d !== void 0 ? _d : 0;
        }
        var yOffset = textBounds.m_fHeight - textBounds.GetLineBounds(0).m_fHeight;
        var y = state.yCoord() - yOffset;
        if (this.verticalTextPosition === TextPosition_1.EVerticalTextPosition.Center) {
            y += textBounds.m_fHeight / 2;
        }
        else if (this.verticalTextPosition === TextPosition_1.EVerticalTextPosition.Below) {
            y += textBounds.m_fHeight + ((_f = (_e = this.style.padding) === null || _e === void 0 ? void 0 : _e.top) !== null && _f !== void 0 ? _f : 0);
        }
        else {
            y -= (_h = (_g = this.style.padding) === null || _g === void 0 ? void 0 : _g.bottom) !== null && _h !== void 0 ? _h : 0;
        }
        return new Point_1.Point(x, y);
    };
    DataLabelProvider.prototype.getColor = function (state, text) {
        return state.color;
    };
    DataLabelProvider.prototype.shouldSkipLabel = function (state, label) {
        var _a;
        // Skip if out of bounds
        var svr = state.parentSeries.parentSurface.seriesViewRect;
        // const yMax = state.renderPassData.isVerticalChart ? svr.width : svr.height;
        if (label.rect.y < 0 || label.rect.bottom > svr.height)
            return true;
        // const xMax = state.renderPassData.isVerticalChart ? svr.height : svr.width;
        if (label.rect.x < 0 || label.rect.right > svr.width)
            return true;
        switch (this.skipModeProperty) {
            case DataLabelSkipMode_1.EDataLabelSkipMode.SkipIfOverlapPrevious:
                return this.skipIfOverlapPrevious(state, label);
            case DataLabelSkipMode_1.EDataLabelSkipMode.SkipIfOverlapNext:
                return this.skipIfOverlapNext(state, label);
            case DataLabelSkipMode_1.EDataLabelSkipMode.SkipIfSame:
                return ((_a = state.lastLabel) === null || _a === void 0 ? void 0 : _a.text) === label.text;
            case DataLabelSkipMode_1.EDataLabelSkipMode.ShowAll:
                return false;
            default:
                return false;
        }
    };
    /** Generates labels using getText, getPosition, getColor.  Overrides manually set labels. */
    DataLabelProvider.prototype.generateDataLabels = function (renderContext, renderPassData) {
        var _a, _b;
        // clear any previous labels
        this.dataLabels = [];
        if (!this.isEnabled || !this.style || !this.style.fontFamily || !this.style.fontSize) {
            return;
        }
        var yValues = this.ySelector(renderPassData.pointSeries);
        if (!yValues || yValues.size() === 0)
            return;
        this.state = new DataLabelState_1.DataLabelState(renderContext, renderPassData, this.style, this.color, yValues, this.parentSeries);
        var _c = this.parentSeries.dataSeries, fifoCapacity = _c.fifoCapacity, fifoSweeping = _c.fifoSweeping, fifoSweepingGap = _c.fifoSweepingGap, fifoStartIndex = _c.fifoStartIndex;
        var bounds = (0, NativeObject_1.getTextBounds)(this.webAssemblyContext);
        if (!this.shouldGenerate(this.state))
            return;
        var skipCount = 0;
        var skipNum = Math.max(0, this.skipNumberProperty);
        for (var i = this.state.indexStart; i <= this.state.indexEnd; i += skipNum + 1) {
            this.state.index =
                this.skipModeProperty === DataLabelSkipMode_1.EDataLabelSkipMode.SkipIfOverlapNext
                    ? this.state.indexEnd - (i - this.state.indexStart)
                    : i;
            if (fifoSweeping &&
                this.state.pointCount === fifoCapacity &&
                this.state.index >= fifoStartIndex &&
                this.state.index < fifoStartIndex + fifoSweepingGap)
                continue;
            var text = this.getText(this.state);
            if (!text)
                continue;
            this.state.font.CalculateStringBounds(text !== null && text !== void 0 ? text : "", bounds, (_b = (_a = this.style) === null || _a === void 0 ? void 0 : _a.lineSpacing) !== null && _b !== void 0 ? _b : 2);
            // console.log(text, bounds.m_fHeight, bounds.GetLinesCount());
            var position = this.getPosition(this.state, bounds);
            var color = this.getColor(this.state, text);
            var firstLineHeight = bounds.GetLineBounds(0).m_fHeight;
            var label = {
                text: text,
                position: position,
                rect: new Rect_1.Rect(position.x, position.y - firstLineHeight, bounds.m_fWidth, bounds.m_fHeight),
                color: color,
                dataX: this.state.xCoord(),
                dataY: this.state.yCoord()
            };
            if (!this.shouldSkipLabel(this.state, label)) {
                this.state.dataLabels.push(label);
            }
            else {
                skipCount++;
            }
        }
        if (skipCount > 100 && skipCount / (this.state.indexEnd - this.state.indexStart) > 0.8) {
            performanceWarnings_1.performanceWarnings.dataLabelsSkippingMany.warn();
        }
        this.dataLabels = this.state.dataLabels;
    };
    DataLabelProvider.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            numericFormat: this.numericFormat,
            pointGapThreshold: this.pointGapThreshold,
            precision: this.precision,
            pointCountThreshold: this.pointCountThreshold,
            skipNumber: this.skipNumber,
            skipMode: this.skipMode,
            updateTextInAnimation: this.updateTextInAnimation,
            horizontalTextPosition: this.horizontalTextPosition,
            verticalTextPosition: this.verticalTextPosition,
            isEnabled: this.isEnabled,
            engineeringPrefix: this.engineeringPrefixProperty
        };
        Object.assign(json.options, options);
        return json;
    };
    DataLabelProvider.prototype.skipIfOverlapPrevious = function (state, label) {
        var previous = state.lastLabel;
        if (!previous)
            // First label
            return false;
        if (previous.rect.right + state.xPadding < label.rect.left)
            // x space
            return false;
        if (Math.abs(previous.rect.y - label.rect.y) > label.rect.height + state.yPadding)
            // y space
            return false;
        return true;
    };
    DataLabelProvider.prototype.skipIfOverlapNext = function (state, label) {
        // For this case, we generate the labels right to left, so last is the next to the right.
        var next = state.lastLabel;
        if (!next)
            // First label
            return false;
        if (label.rect.right + state.xPadding < next.rect.left)
            // x space
            return false;
        if (Math.abs(next.rect.y - label.rect.y) > label.rect.height + state.yPadding)
            // y space
            return false;
        return true;
    };
    return DataLabelProvider;
}(BaseDataLabelProvider_1.BaseDataLabelProvider));
exports.DataLabelProvider = DataLabelProvider;
