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
exports.ScatterPointsSceneEntity = void 0;
var Deleter_1 = require("../../../Core/Deleter");
var SceneEntityType_1 = require("../../../types/SceneEntityType");
var parseColor_1 = require("../../../utils/parseColor");
var BaseDataSeries3D_1 = require("../../Model/DataSeries/BaseDataSeries3D");
var BasePointMarker3D_1 = require("../PointMarkers/BasePointMarker3D");
var Constants_1 = require("../RenderableSeries/Constants");
var RenderableSeriesSceneEntity_1 = require("./RenderableSeriesSceneEntity");
var RenderableSeriesSceneEntityState_1 = require("./RenderableSeriesSceneEntityState");
/**
 * @summary {@link BaseSceneEntity3D} type for drawing 3D Scatter or Bubble series in SciChart's High Performance
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @remarks See related type {@link ScatterRenderableSeries3D} which should be added to {@link SciChart3DSurface.renderableSeries}
 * along with data from an {@link XyzDataSeries3D} to create a 3D Scatter or Bubble chart
 */
var ScatterPointsSceneEntity = /** @class */ (function (_super) {
    __extends(ScatterPointsSceneEntity, _super);
    /**
     * Creates an instance of {@link ScatterPointsSceneEntity}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries The parent {@link BaseRenderableSeries3D} which this entity maps to
     */
    function ScatterPointsSceneEntity(webAssemblyContext, parentSeries) {
        var _this = _super.call(this, webAssemblyContext, parentSeries, new RenderableSeriesSceneEntityState_1.RenderableSeriesSceneEntityState()) || this;
        /**
         * @inheritDoc
         */
        _this.type = SceneEntityType_1.ESceneEntityType.ScatterPointsSceneEntity;
        _this.setNativeEntity(webAssemblyContext.SCRTPoint3DSceneEntity.implement(_this));
        return _this;
    }
    /**
     * @inheritDoc
     */
    ScatterPointsSceneEntity.prototype.delete = function () {
        this.pointColors = (0, Deleter_1.deleteSafe)(this.pointColors);
        this.pointScales = (0, Deleter_1.deleteSafe)(this.pointScales);
        _super.prototype.delete.call(this);
    };
    /**
     * @inheritDoc
     */
    ScatterPointsSceneEntity.prototype.Render = function () {
        this.nativeEntity.SetOpacity(this.parentSeries.opacity);
        _super.prototype.Render.call(this);
    };
    /**
     * @inheritDoc
     * @param propertyName
     */
    ScatterPointsSceneEntity.prototype.notifySeriesPropertyChanged = function (propertyName) {
        // Pass flags down to child entities
        if (propertyName === Constants_1.PROPERTY.POINT_MARKER3D) {
            this.updateSeries();
        }
        _super.prototype.notifySeriesPropertyChanged.call(this, propertyName);
    };
    /**
     * @inheritDoc
     */
    ScatterPointsSceneEntity.prototype.hitTest = function (screenPoint) {
        return _super.prototype.hitTestXyz.call(this, screenPoint);
    };
    /**
     * @inheritDoc
     */
    ScatterPointsSceneEntity.prototype.updateSeries = function () {
        var dataSeries = this.parentSeries.dataSeries;
        if (!dataSeries || !this.currentRenderPassData) {
            return;
        }
        if (dataSeries.type !== BaseDataSeries3D_1.EDataSeriesType3D.Xyz3D) {
            throw new Error("DataSeries type for a ScatterRenderableSeries3D must be XyzDataSeries3D");
        }
        var pointMarker = this.parentSeries.pointMarker;
        if (!pointMarker) {
            throw new Error("To render 3D Scatter, bubble or point-clouds, you must provider a PointMarker on BaseRenderableSeries3D");
        }
        var eSCRTPointMarkerType = this.webAssemblyContext.eSCRT_POINT_MARKER_TYPE;
        var defaultColor = (0, parseColor_1.parseColorToUIntArgb)(pointMarker.fill);
        switch (pointMarker.markerType) {
            case BasePointMarker3D_1.EMarkerType.Pixel:
                this.nativeEntity.SetPointMarkerType(eSCRTPointMarkerType.SCRT_POINT_MARKER_TYPE_PIXEL);
                this.nativeEntity.SetPointSize(0);
                this.nativeEntity.SetPointColor(defaultColor);
                break;
            case BasePointMarker3D_1.EMarkerType.TexturedQuad:
                var textureMarker = pointMarker;
                if (!textureMarker.pointsTexture) {
                    throw new Error("Expected a BaseTexturePointMarker3D.pointsTexture on 3D pointmarker of type TexturedQuad");
                }
                this.nativeEntity.SetPointMarkerType(eSCRTPointMarkerType.SCRT_POINT_MARKER_TYPE_TEXTURED_QUAD);
                this.nativeEntity.SetPointSize(pointMarker.size);
                this.nativeEntity.SetPointColor(defaultColor);
                this.nativeEntity.SetPointMarkerTexture(textureMarker.pointsTexture);
                break;
            case BasePointMarker3D_1.EMarkerType.InstancedMesh:
                var meshMarker = pointMarker;
                if (!meshMarker.pointsMesh) {
                    throw new Error("Expected a BaseMeshPointMarker3D.pointsMesh on 3D pointmarker of type InstancedMesh");
                }
                this.nativeEntity.SetPointMarkerType(eSCRTPointMarkerType.SCRT_POINT_MARKER_TYPE_INSTANCED_MESH);
                this.nativeEntity.SetPointSize(pointMarker.size);
                this.nativeEntity.SetPointColor(defaultColor);
                this.nativeEntity.SetPointMarkerMesh(meshMarker.pointsMesh);
                break;
            default:
                throw new Error("Unknown pointMarker.markerType " + pointMarker.markerType);
        }
        var xValues = dataSeries.getNativeXValues();
        var yValues = dataSeries.getNativeYValues();
        var zValues = dataSeries.getNativeZValues();
        var meta = dataSeries.getMetadataValues();
        var count = dataSeries.count();
        var _a = this.rebuildPointMetadata(meta, count, defaultColor), colors = _a.colors, scales = _a.scales;
        var args;
        try {
            args = new this.webAssemblyContext.SCRTPoint3DSceneEntityParams();
            args.useDefaultColors = false;
            args.useDefaultScale = false;
            args.SetCoordinateCalculators(this.currentRenderPassData.xCalc.nativeCalculator, this.currentRenderPassData.yCalc.nativeCalculator, this.currentRenderPassData.zCalc.nativeCalculator);
            this.nativeEntity.UpdateMeshesVec(xValues, yValues, zValues, colors, scales, args);
        }
        finally {
            (0, Deleter_1.deleteSafe)(args);
        }
    };
    ScatterPointsSceneEntity.prototype.rebuildPointMetadata = function (metadata, count, defaultColor) {
        var _this = this;
        if (!this.pointColors) {
            this.pointColors = new this.webAssemblyContext.UIntVector();
        }
        if (!this.pointScales) {
            this.pointScales = new this.webAssemblyContext.FloatVector();
        }
        // Default color, size
        this.pointColors.resize(count, defaultColor);
        this.pointScales.resize(count, 1.0);
        // metadata will always be non-null but individual metadata items may be undefined
        // as its implemented as a non-sparse array
        metadata.forEach(function (meta, index) {
            var _a;
            if (meta) {
                // [SCJS-1566] Renamed vertexColorAbgr to vertexColor. Preserved backward compatibility
                var vertexColor = (_a = meta.vertexColorAbgr) !== null && _a !== void 0 ? _a : meta.vertexColor;
                if (vertexColor) {
                    _this.pointColors.set(index, vertexColor);
                }
                if (meta.pointScale) {
                    _this.pointScales.set(index, meta.pointScale);
                }
            }
        });
        return { colors: this.pointColors, scales: this.pointScales };
    };
    return ScatterPointsSceneEntity;
}(RenderableSeriesSceneEntity_1.RenderableSeriesSceneEntity));
exports.ScatterPointsSceneEntity = ScatterPointsSceneEntity;
