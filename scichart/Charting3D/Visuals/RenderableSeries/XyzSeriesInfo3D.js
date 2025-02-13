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
exports.XyzSeriesInfo3D = void 0;
var BaseDataSeries3D_1 = require("../../Model/DataSeries/BaseDataSeries3D");
var Vector3_1 = require("../../Vector3");
var SeriesInfo3D_1 = require("./SeriesInfo3D");
/**
 * XyzSeriesInfo3D is a data-structure which provides enriched information about a hit-test operation on an XYZ series in SciChart 3D.
 * It's derived by calling {@link BaseRenderableSeries3D.hitTest}.
 */
var XyzSeriesInfo3D = /** @class */ (function (_super) {
    __extends(XyzSeriesInfo3D, _super);
    function XyzSeriesInfo3D(series, hitTestInfo) {
        var _this = _super.call(this, series, hitTestInfo) || this;
        _this.dataSeriesType = BaseDataSeries3D_1.EDataSeriesType3D.Xyz3D;
        _this.enrichSeriesInfo();
        return _this;
    }
    XyzSeriesInfo3D.prototype.enrichSeriesInfo = function () {
        if (!this.isHit || !this.renderableSeries)
            return;
        this.dataSeriesIndex = this.hitTestInfo.selectionIndex - 1;
        var xyzDataSeries = this.renderableSeries.dataSeries;
        if (xyzDataSeries) {
            this.xValue = xyzDataSeries.getNativeXValues().get(this.dataSeriesIndex);
            this.yValue = xyzDataSeries.getNativeYValues().get(this.dataSeriesIndex);
            this.zValue = xyzDataSeries.getNativeZValues().get(this.dataSeriesIndex);
            var metadatas = xyzDataSeries.getMetadataValues();
            if (metadatas && metadatas.length > this.dataSeriesIndex) {
                this.pointMetadata = metadatas[this.dataSeriesIndex];
            }
            var scs = this.renderableSeries.parentSurface;
            if (scs) {
                var xOffset = scs.worldDimensions.x * 0.5;
                var zOffset = scs.worldDimensions.z * 0.5;
                var x = scs.xAxis.getCurrentCoordinateCalculator().getCoordinate(this.xValue) - xOffset;
                var y = scs.yAxis.getCurrentCoordinateCalculator().getCoordinate(this.yValue);
                var z = scs.zAxis.getCurrentCoordinateCalculator().getCoordinate(this.zValue) - zOffset;
                this.hitWorldCoords = new Vector3_1.Vector3(x, y, z);
            }
        }
    };
    return XyzSeriesInfo3D;
}(SeriesInfo3D_1.SeriesInfo3D));
exports.XyzSeriesInfo3D = XyzSeriesInfo3D;
