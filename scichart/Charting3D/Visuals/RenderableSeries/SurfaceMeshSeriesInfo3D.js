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
exports.SurfaceMeshSeriesInfo3D = void 0;
var pointUtil_1 = require("../../../utils/pointUtil");
var BaseDataSeries3D_1 = require("../../Model/DataSeries/BaseDataSeries3D");
var Vector3_1 = require("../../Vector3");
var SeriesInfo3D_1 = require("./SeriesInfo3D");
var SurfaceMeshSeriesInfo3D = /** @class */ (function (_super) {
    __extends(SurfaceMeshSeriesInfo3D, _super);
    function SurfaceMeshSeriesInfo3D(series, hitTestInfo) {
        var _this = _super.call(this, series, hitTestInfo) || this;
        _this.dataSeriesType = BaseDataSeries3D_1.EDataSeriesType3D.UniformGrid3D;
        _this.enrichSeriesInfo();
        return _this;
    }
    SurfaceMeshSeriesInfo3D.prototype.enrichSeriesInfo = function () {
        // We know the cell that was hit. We need to get the four corners of the cell in
        // data space. Then convert to world space. Then convert to screen space
        // Using this, figure out which corner the pointer was closest to and report that
        // as the hit-test value
        if (!this.isHit || !this.renderableSeries) {
            // console.log(`not a hit apparently`);
            return;
        }
        var ds = this.renderableSeries.dataSeries;
        if (!ds)
            return;
        // Get the x0z0 index of the cell that was hit
        var x0z0 = { x: this.hitTestInfo.selectionIjIndices.x, z: this.hitTestInfo.selectionIjIndices.y };
        // Convert x0z0 and four corners of quad-hit to data-values
        // nomenclature: d (data values at), x0 (x index + 0), z0 (z index + 0)
        var dx0z0 = { x: ds.getX(x0z0.x), y: ds.getYValue(x0z0.z, x0z0.x), z: ds.getZ(x0z0.z) };
        var dx1z0 = { x: ds.getX(x0z0.x + 1), y: ds.getYValue(x0z0.z, x0z0.x + 1), z: ds.getZ(x0z0.z) };
        var dx0z1 = { x: ds.getX(x0z0.x), y: ds.getYValue(x0z0.z + 1, x0z0.x), z: ds.getZ(x0z0.z + 1) };
        var dx1z1 = { x: ds.getX(x0z0.x + 1), y: ds.getYValue(x0z0.z + 1, x0z0.x + 1), z: ds.getZ(x0z0.z + 1) };
        var scs = this.renderableSeries.parentSurface;
        if (!scs || !scs.xAxis || !scs.yAxis || !scs.zAxis)
            return;
        var xCalc = scs.xAxis.getCurrentCoordinateCalculator();
        var yCalc = scs.yAxis.getCurrentCoordinateCalculator();
        var zCalc = scs.zAxis.getCurrentCoordinateCalculator();
        // convert data-values to world coordinates
        // nomenclature: w (world coord at), x0 (x index + 0), y, z0 (z index + 0)
        var wx0z0 = new Vector3_1.Vector3(xCalc.getCoordinate(dx0z0.x), yCalc.getCoordinate(dx0z0.y), zCalc.getCoordinate(dx0z0.z));
        var wx1z0 = new Vector3_1.Vector3(xCalc.getCoordinate(dx1z0.x), yCalc.getCoordinate(dx1z0.y), zCalc.getCoordinate(dx1z0.z));
        var wx0z1 = new Vector3_1.Vector3(xCalc.getCoordinate(dx0z1.x), yCalc.getCoordinate(dx0z1.y), zCalc.getCoordinate(dx0z1.z));
        var wx1z1 = new Vector3_1.Vector3(xCalc.getCoordinate(dx1z1.x), yCalc.getCoordinate(dx1z1.y), zCalc.getCoordinate(dx1z1.z));
        // Transform all to screen space
        // nomenclature: s (screenspace 2d coordinate) for data at x0 (x index + 0), z0 (z index + 0)
        var sx0z0 = scs.worldToScreenCoord(wx0z0);
        var sx1z0 = scs.worldToScreenCoord(wx1z0);
        var sx0z1 = scs.worldToScreenCoord(wx0z1);
        var sx1z1 = scs.worldToScreenCoord(wx1z1);
        // calculate euclidean distance from hit-test point to each corner in screen space
        var x0z0distance = (0, pointUtil_1.calcDistance)(sx0z0.x, sx0z0.y, this.hitTestInfo.hitTestPoint.x, this.hitTestInfo.hitTestPoint.y);
        var x1z0distance = (0, pointUtil_1.calcDistance)(sx1z0.x, sx1z0.y, this.hitTestInfo.hitTestPoint.x, this.hitTestInfo.hitTestPoint.y);
        var x0z1distance = (0, pointUtil_1.calcDistance)(sx0z1.x, sx0z1.y, this.hitTestInfo.hitTestPoint.x, this.hitTestInfo.hitTestPoint.y);
        var x1z1distance = (0, pointUtil_1.calcDistance)(sx1z1.x, sx1z1.y, this.hitTestInfo.hitTestPoint.x, this.hitTestInfo.hitTestPoint.y);
        var xOffset = scs.worldDimensions.x * 0.5;
        var zOffset = scs.worldDimensions.z * 0.5;
        var minDistance = Math.min(x0z0distance, x1z0distance, x0z1distance, x1z1distance);
        if (minDistance === x0z0distance) {
            this.xIndex = x0z0.x;
            this.zIndex = x0z0.z;
            this.xValue = dx0z0.x;
            this.yValue = dx0z0.y;
            this.zValue = dx0z0.z;
            this.hitWorldCoords = new Vector3_1.Vector3(wx0z0.x - xOffset, wx0z0.y, wx0z0.z - zOffset);
        }
        if (minDistance === x0z1distance) {
            this.xIndex = x0z0.x;
            this.zIndex = x0z0.z + 1;
            this.xValue = dx0z1.x;
            this.yValue = dx0z1.y;
            this.zValue = dx0z1.z;
            this.hitWorldCoords = new Vector3_1.Vector3(wx0z1.x - xOffset, wx0z1.y, wx0z1.z - zOffset);
        }
        if (minDistance === x1z0distance) {
            this.xIndex = x0z0.x + 1;
            this.zIndex = x0z0.z;
            this.xValue = dx1z0.x;
            this.yValue = dx1z0.y;
            this.zValue = dx1z0.z;
            this.hitWorldCoords = new Vector3_1.Vector3(wx1z0.x - xOffset, wx1z0.y, wx1z0.z - zOffset);
        }
        if (minDistance === x1z1distance) {
            this.xIndex = x0z0.x + 1;
            this.zIndex = x0z0.z + 1;
            this.xValue = dx1z1.x;
            this.yValue = dx1z1.y;
            this.zValue = dx1z1.z;
            this.hitWorldCoords = new Vector3_1.Vector3(wx1z1.x - xOffset, wx1z1.y, wx1z1.z - zOffset);
        }
    };
    return SurfaceMeshSeriesInfo3D;
}(SeriesInfo3D_1.SeriesInfo3D));
exports.SurfaceMeshSeriesInfo3D = SurfaceMeshSeriesInfo3D;
