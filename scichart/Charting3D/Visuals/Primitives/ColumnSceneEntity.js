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
exports.ColumnSceneEntity = void 0;
var Deleter_1 = require("../../../Core/Deleter");
var SceneEntityType_1 = require("../../../types/SceneEntityType");
var parseColor_1 = require("../../../utils/parseColor");
var BaseDataSeries3D_1 = require("../../Model/DataSeries/BaseDataSeries3D");
var Constants_1 = require("../RenderableSeries/Constants");
var RenderableSeriesSceneEntity_1 = require("./RenderableSeriesSceneEntity");
var RenderableSeriesSceneEntityState_1 = require("./RenderableSeriesSceneEntityState");
/**
 * @summary {@link BaseSceneEntity3D} type for drawing 3D Column series in SciChart's High Performance
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @remarks See related type {@link ColumnRenderableSeries3D} which should be added to {@link SciChart3DSurface.renderableSeries}
 * along with data from an {@link XyzDataSeries3D} to create a 3D Column chart
 */
var ColumnSceneEntity = /** @class */ (function (_super) {
    __extends(ColumnSceneEntity, _super);
    /**
     * Creates an instance of {@link ColumnSceneEntity}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries The parent {@link BaseRenderableSeries3D} which this entity maps to
     */
    function ColumnSceneEntity(webAssemblyContext, parentSeries) {
        var _this = _super.call(this, webAssemblyContext, parentSeries, new RenderableSeriesSceneEntityState_1.RenderableSeriesSceneEntityState()) || this;
        /** @inheritDoc */
        _this.type = SceneEntityType_1.ESceneEntityType.ColumnSceneEntity;
        _this.setNativeEntity(webAssemblyContext.SCRTColumnsSceneEntity.implement(_this));
        return _this;
    }
    /** @inheritDoc */
    ColumnSceneEntity.prototype.delete = function () {
        this.instanceColors = (0, Deleter_1.deleteSafe)(this.instanceColors);
        this.instanceScales = (0, Deleter_1.deleteSafe)(this.instanceScales);
        _super.prototype.delete.call(this);
    };
    /** @inheritDoc */
    ColumnSceneEntity.prototype.Render = function () {
        _super.prototype.Render.call(this);
    };
    /**
     * @inheritDoc
     * @param propertyName
     */
    ColumnSceneEntity.prototype.notifySeriesPropertyChanged = function (propertyName) {
        if (propertyName === Constants_1.PROPERTY.POINT_MARKER3D ||
            propertyName === Constants_1.PROPERTY.USE_METADATA_COLORS ||
            propertyName === Constants_1.PROPERTY.FILL) {
            this.updateSeries();
        }
        else if (propertyName === Constants_1.PROPERTY.OPACITY) {
            this.nativeEntity.SetOpacity(this.parentSeries.opacity);
        }
        else if (propertyName === Constants_1.PROPERTY.DATA_POINT_WIDTH_X || propertyName === Constants_1.PROPERTY.DATA_POINT_WIDTH_Z) {
            this.updateSeries();
        }
        _super.prototype.notifySeriesPropertyChanged.call(this, propertyName);
    };
    /** @inheritDoc */
    ColumnSceneEntity.prototype.hitTest = function (screenPoint) {
        return _super.prototype.hitTestXyz.call(this, screenPoint);
    };
    /** @inheritDoc */
    ColumnSceneEntity.prototype.updateSeries = function () {
        var dataSeries = this.parentSeries.dataSeries;
        if (!dataSeries || !this.currentRenderPassData) {
            return;
        }
        if (dataSeries.type !== BaseDataSeries3D_1.EDataSeriesType3D.Xyz3D) {
            throw new Error("DataSeries type for a ColumnRenderableSeries3D must be XyzDataSeries3D");
        }
        var pointMarker3D = this.parentSeries.pointMarker;
        if (!pointMarker3D) {
            throw new Error("To render 3D Columns you must provider a PointMarker on BaseRenderableSeries3D");
        }
        if (this.parentSeries.fill) {
            pointMarker3D.fill = this.parentSeries.fill;
        }
        this.nativeEntity.SetInstanceSize(this.parentSeries.getDataPointWidth(this.currentRenderPassData, this.parentSeries.dataPointWidthX, this.parentSeries.dataPointWidthZ));
        this.nativeEntity.SetInstanceMesh(pointMarker3D.pointsMesh);
        var colorInt = (0, parseColor_1.parseColorToUIntArgb)(pointMarker3D.fill);
        this.nativeEntity.SetColor(colorInt);
        var xValues = dataSeries.getNativeXValues();
        var yValues = dataSeries.getNativeYValues();
        var zValues = dataSeries.getNativeZValues();
        var meta = dataSeries.getMetadataValues();
        var count = dataSeries.count();
        var _a = this.rebuildPointMetadata(meta, count, colorInt), colors = _a.colors, scales = _a.scales;
        var args;
        try {
            args = new this.webAssemblyContext.SCRTColumnsSceneEntityParams();
            args.m_bUseDefaultColors = !this.parentSeries.useMetadataColors;
            args.m_bUseDefaultScale = false;
            args.SetCoordinateCalculators(this.currentRenderPassData.xCalc.nativeCalculator, this.currentRenderPassData.yCalc.nativeCalculator, this.currentRenderPassData.zCalc.nativeCalculator);
            this.nativeEntity.UpdateMeshesVec(xValues, yValues, zValues, scales, colors, args);
            this.nativeEntity.SetOpacity(this.parentSeries.opacity);
        }
        finally {
            (0, Deleter_1.deleteSafe)(args);
        }
    };
    ColumnSceneEntity.prototype.rebuildPointMetadata = function (metadata, count, defaultColor) {
        var _this = this;
        if (!this.instanceColors) {
            this.instanceColors = new this.webAssemblyContext.UIntVector();
        }
        if (!this.instanceScales) {
            this.instanceScales = new this.webAssemblyContext.FloatVector();
        }
        // Default color, size
        this.instanceColors.resize(count, defaultColor);
        this.instanceScales.resize(count, 1.0);
        // metadata will always be non-null but individual metadata items may be undefined
        // as its implemented as a non-sparse array
        metadata.forEach(function (meta, index) {
            if (meta) {
                var vertexColor = meta.vertexColor;
                if (vertexColor) {
                    _this.instanceColors.set(index, vertexColor);
                }
                if (meta.pointScale) {
                    _this.instanceScales.set(index, meta.pointScale);
                }
            }
        });
        return { colors: this.instanceColors, scales: this.instanceScales };
    };
    return ColumnSceneEntity;
}(RenderableSeriesSceneEntity_1.RenderableSeriesSceneEntity));
exports.ColumnSceneEntity = ColumnSceneEntity;
