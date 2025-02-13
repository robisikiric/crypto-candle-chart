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
exports.BaseDataSeries3D = exports.EDataSeriesType3D = void 0;
var DeletableEntity_1 = require("../../../Core/DeletableEntity");
var EventHandler_1 = require("../../../Core/EventHandler");
/**
 * Defines {@link BaseDataSeries3D | DataSeries} types available within SciChart's
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 */
var EDataSeriesType3D;
(function (EDataSeriesType3D) {
    /**
     * Defines an {@link XyzDataSeries3D}
     */
    EDataSeriesType3D["Xyz3D"] = "Xyz";
    /**
     * Defines an {@link UniformGridDataSeries3D}
     */
    EDataSeriesType3D["UniformGrid3D"] = "UniformGrid3D";
    /**
     * Defines a NonUniformGridDataSeries3D
     */
    EDataSeriesType3D["NonUniformGrid3D"] = "NonUniformGrid3D";
})(EDataSeriesType3D = exports.EDataSeriesType3D || (exports.EDataSeriesType3D = {}));
/**
 * The base class for DataSeries in SciChart's {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @remarks
 * A DataSeries stores the data to render. This is independent from the {@link IRenderableSeries3D | RenderableSeries}
 * which defines how that data should be rendered.
 *
 * See derived types of {@link BaseDataSeries3D} to find out what data-series are available.
 * See derived types of {@link IRenderableSeries3D} to find out what 3D JavaScript Chart types are available.
 */
var BaseDataSeries3D = /** @class */ (function (_super) {
    __extends(BaseDataSeries3D, _super);
    /**
     * Creates an instance of the {@link BaseDataSeries3D}
     * @param webAssemblyContext the {@link TSciChart3D | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 rendering engine
     * @param options optional parameters of type {@link IBaseDataSeries3DOptions} to configure the series
     */
    function BaseDataSeries3D(webAssemblyContext, options) {
        var _this = this;
        var _a;
        _this = _super.call(this) || this;
        _this.webAssemblyContext = webAssemblyContext;
        _this.dataSeriesNameProperty = (_a = options === null || options === void 0 ? void 0 : options.dataSeriesName) !== null && _a !== void 0 ? _a : _this.dataSeriesNameProperty;
        _this.dataChanged = new EventHandler_1.EventHandler();
        _this.isModifiedProperty = true;
        return _this;
    }
    Object.defineProperty(BaseDataSeries3D.prototype, "dataSeriesName", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.dataSeriesNameProperty;
        },
        /**
         * @inheritDoc
         */
        set: function (dataSeriesName) {
            this.dataSeriesNameProperty = dataSeriesName;
            this.notifyDataChanged();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseDataSeries3D.prototype, "isModified", {
        /**
         * Determines whether the Data Series has been modified since last resetModified() call.
         */
        get: function () {
            return this.isModifiedProperty;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns true if this DataSeries has been deleted and native memory destroyed
     */
    BaseDataSeries3D.prototype.getIsDeleted = function () {
        return this.isDeleted;
    };
    /**
     * @inheritDoc
     */
    BaseDataSeries3D.prototype.delete = function () {
        this.isDeleted = true;
        this.webAssemblyContext = undefined;
    };
    /**
     * Call this method to notify subscribers of {@link dataChanged} that the data has changed
     * and {@link https://www.scichart.com/javascript-chart-features | 3D JavaScript Chart}
     * needs redrawing
     */
    BaseDataSeries3D.prototype.notifyDataChanged = function () {
        this.isModifiedProperty = true;
        this.dataChanged.raiseEvent();
    };
    /**
     * Resets the modified flag.
     */
    BaseDataSeries3D.prototype.resetModified = function () {
        this.isModifiedProperty = false;
    };
    return BaseDataSeries3D;
}(DeletableEntity_1.DeletableEntity));
exports.BaseDataSeries3D = BaseDataSeries3D;
