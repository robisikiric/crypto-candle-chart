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
exports.CategoryAxis = void 0;
var AxisType_1 = require("../../../types/AxisType");
var CategoryAxisBase_1 = require("./CategoryAxisBase");
var DateLabelProvider_1 = require("./LabelProvider/DateLabelProvider");
/**
 * @summary A 2D Chart Category Axis type
 * @description A category axis uses the X-index not the X-value to measure data-points on the XAxis.
 * For example this can be used in stock chart applications to ensure weekend or overnight gaps are collapsed
 * and each data-point is spaced equidistantly
 * @remarks
 * Set a {@link CategoryAxis} on the {@link SciChartSurface.xAxes} property. This axis type is not valid for YAxis
 */
var CategoryAxis = /** @class */ (function (_super) {
    __extends(CategoryAxis, _super);
    /**
     * Creates an instance of a {@link CategoryAxis}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options Optional parameters of type {@link ICategoryAxisOptions} used to configure the axis at instantiation time
     */
    function CategoryAxis(webAssemblyContext, options) {
        var _this = this;
        var _a;
        _this = _super.call(this, webAssemblyContext, options) || this;
        _this.type = AxisType_1.EAxisType.CategoryAxis;
        _this.labelProvider =
            (_a = options === null || options === void 0 ? void 0 : options.labelProvider) !== null && _a !== void 0 ? _a : new DateLabelProvider_1.DateLabelProvider(options);
        return _this;
    }
    return CategoryAxis;
}(CategoryAxisBase_1.CategoryAxisBase));
exports.CategoryAxis = CategoryAxis;
