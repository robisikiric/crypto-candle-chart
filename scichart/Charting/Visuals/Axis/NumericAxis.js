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
exports.NumericAxis = void 0;
var AxisType_1 = require("../../../types/AxisType");
var FlippedNumericCoordinateCalculator_1 = require("../../Numerics/CoordinateCalculators/FlippedNumericCoordinateCalculator");
var NumericCoordinateCalculator_1 = require("../../Numerics/CoordinateCalculators/NumericCoordinateCalculator");
var NumericTickProvider_1 = require("../../Numerics/TickProviders/NumericTickProvider");
var AxisBase2D_1 = require("./AxisBase2D");
var NumericDeltaCalculator_1 = require("./DeltaCalculator/NumericDeltaCalculator");
var NumericLabelProvider_1 = require("./LabelProvider/NumericLabelProvider");
/**
 * @summary A 2D Chart Numeric / Value Axis type
 * @description A Numeric axis uses the X-value to measure data-points on the XAxis.
 * This is contrary to a {@link CategoryAxis} which uses X-index.
 * @remarks
 * Set a {@link NumericAxis} on the {@link SciChartSurface.xAxes} or {@link SciChartSurface.yAxes} property.
 */
var NumericAxis = /** @class */ (function (_super) {
    __extends(NumericAxis, _super);
    /**
     * Creates an instance of a {@link NumericAxis}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options Optional parameters of type {@link INumericAxisOptions} used to configure the axis at instantiation time
     */
    function NumericAxis(webAssemblyContext, options) {
        var _this = this;
        var _a;
        _this = _super.call(this, webAssemblyContext, options) || this;
        _this.type = AxisType_1.EAxisType.NumericAxis;
        _this.tickProvider = new NumericTickProvider_1.NumericTickProvider(_this.webAssemblyContext2D);
        _this.labelProvider =
            (_a = options === null || options === void 0 ? void 0 : options.labelProvider) !== null && _a !== void 0 ? _a : new NumericLabelProvider_1.NumericLabelProvider(options);
        _this.deltaCalculator = new NumericDeltaCalculator_1.NumericDeltaCalculator(_this.webAssemblyContext2D);
        return _this;
    }
    /**
     * @inheritDoc
     */
    NumericAxis.prototype.getCurrentCoordinateCalculatorInternal = function () {
        var min = this.visibleRange.min;
        var max = this.visibleRange.max;
        var offset = this.offset;
        var size = this.axisLength;
        return this.isXAxis !== this.flippedCoordinates
            ? new FlippedNumericCoordinateCalculator_1.FlippedNumericCoordinateCalculator(this.webAssemblyContext2D, size, min, max, offset, this.allowFastMath)
            : new NumericCoordinateCalculator_1.NumericCoordinateCalculator(this.webAssemblyContext2D, size, min, max, offset, this.allowFastMath);
    };
    return NumericAxis;
}(AxisBase2D_1.AxisBase2D));
exports.NumericAxis = NumericAxis;
