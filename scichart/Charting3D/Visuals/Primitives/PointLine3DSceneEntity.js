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
exports.PointLine3DSceneEntity = void 0;
var Deleter_1 = require("../../../Core/Deleter");
var SceneEntityType_1 = require("../../../types/SceneEntityType");
var parseColor_1 = require("../../../utils/parseColor");
var BaseDataSeries3D_1 = require("../../Model/DataSeries/BaseDataSeries3D");
var Constants_1 = require("../RenderableSeries/Constants");
var BasePointMarker3D_1 = require("../PointMarkers/BasePointMarker3D");
var RenderableSeriesSceneEntity_1 = require("./RenderableSeriesSceneEntity");
var RenderableSeriesSceneEntityState_1 = require("./RenderableSeriesSceneEntityState");
/**
 * @summary {@link BaseSceneEntity3D} type for drawing 3D Scatter or Bubble series in SciChart's High Performance
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @remarks See related type {@link ScatterRenderableSeries3D} which should be added to {@link SciChart3DSurface.renderableSeries}
 * along with data from an {@link XyzDataSeries3D} to create a 3D Scatter or Bubble chart
 */
var PointLine3DSceneEntity = /** @class */ (function (_super) {
    __extends(PointLine3DSceneEntity, _super);
    /**
     * Creates an instance of {@link ScatterPointsSceneEntity}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries The parent {@link BaseRenderableSeries3D} which this entity maps to
     */
    function PointLine3DSceneEntity(webAssemblyContext, parentSeries) {
        var _this = _super.call(this, webAssemblyContext, parentSeries, new RenderableSeriesSceneEntityState_1.RenderableSeriesSceneEntityState()) || this;
        /**
         * @inheritDoc
         */
        _this.type = SceneEntityType_1.ESceneEntityType.PointLine3DSceneEntity;
        _this.setNativeEntity(webAssemblyContext.SCRTPointLine3DSceneEntity.implement(_this));
        return _this;
    }
    /**
     * @inheritDoc
     */
    PointLine3DSceneEntity.prototype.delete = function () {
        this.pointColors = (0, Deleter_1.deleteSafe)(this.pointColors);
        this.pointScales = (0, Deleter_1.deleteSafe)(this.pointScales);
        _super.prototype.delete.call(this);
    };
    /**
     * @inheritDoc
     */
    PointLine3DSceneEntity.prototype.Render = function () {
        this.nativeEntity.SetOpacity(this.parentSeries.opacity);
        _super.prototype.Render.call(this);
    };
    /**
     * @inheritDoc
     * @param propertyName
     */
    PointLine3DSceneEntity.prototype.notifySeriesPropertyChanged = function (propertyName) {
        // Pass flags down to child entities
        if (propertyName === Constants_1.PROPERTY.STROKE_THICKNESS) {
            this.nativeEntity.SetLineStrokeThickness(this.parentSeries.strokeThickness);
        }
        if (propertyName === Constants_1.PROPERTY.STROKE) {
            this.nativeEntity.SetStrokeColor((0, parseColor_1.parseColorToUIntArgb)(this.parentSeries.stroke));
        }
        if (propertyName === Constants_1.PROPERTY.POINT_MARKER3D) {
            this.updateSeries();
        }
        _super.prototype.notifySeriesPropertyChanged.call(this, propertyName);
    };
    /**
     * @inheritDoc
     */
    PointLine3DSceneEntity.prototype.hitTest = function (screenPoint) {
        return _super.prototype.hitTestXyz.call(this, screenPoint);
    };
    /**
     * @inheritDoc
     */
    PointLine3DSceneEntity.prototype.updateSeries = function () {
        var dataSeries = this.parentSeries.dataSeries;
        if (!dataSeries || !this.currentRenderPassData) {
            return;
        }
        if (dataSeries.type !== BaseDataSeries3D_1.EDataSeriesType3D.Xyz3D) {
            throw new Error("DataSeries type for a PointLineRenderableSeries3D must be XyzDataSeries3D");
        }
        var strokeArgb = (0, parseColor_1.parseColorToUIntArgb)(this.parentSeries.stroke);
        this.nativeEntity.SetLineStrokeThickness(this.parentSeries.strokeThickness);
        this.nativeEntity.SetIsLineStrips(this.parentSeries.isLineStrip);
        this.nativeEntity.SetIsLineAntialiased(this.parentSeries.isAntiAliased);
        this.nativeEntity.SetStrokeColor(strokeArgb);
        this.updatePointMarker(this.parentSeries.pointMarker);
        var xValues = dataSeries.getNativeXValues();
        var yValues = dataSeries.getNativeYValues();
        var zValues = dataSeries.getNativeZValues();
        var meta = dataSeries.getMetadataValues();
        var count = dataSeries.count();
        var _a = this.rebuildPointMetadata(meta, count, strokeArgb), lineColors = _a.lineColors, pointColors = _a.pointColors, scales = _a.scales, hasDefaultColors = _a.hasDefaultColors, hasDefaultScales = _a.hasDefaultScales;
        var args;
        try {
            args = new this.webAssemblyContext.SCRTPointLines3DSceneEntityParams();
            args.useDefaultColors = hasDefaultColors;
            args.useDefaultScale = hasDefaultScales;
            args.SetCoordinateCalculators(this.currentRenderPassData.xCalc.nativeCalculator, this.currentRenderPassData.yCalc.nativeCalculator, this.currentRenderPassData.zCalc.nativeCalculator);
            this.nativeEntity.UpdateMeshesVec(xValues, yValues, zValues, pointColors, lineColors, scales, args);
        }
        finally {
            (0, Deleter_1.deleteSafe)(args);
        }
    };
    PointLine3DSceneEntity.prototype.updatePointMarker = function (pointMarker) {
        var eSCRTPointMarkerType = this.webAssemblyContext.eSCRT_POINT_MARKER_TYPE;
        if (pointMarker === undefined || pointMarker.markerType === BasePointMarker3D_1.EMarkerType.Pixel) {
            this.nativeEntity.SetPointMarkerType(eSCRTPointMarkerType.SCRT_POINT_MARKER_TYPE_PIXEL);
            this.nativeEntity.SetPointSize(0);
        }
        else if (pointMarker.markerType === BasePointMarker3D_1.EMarkerType.InstancedMesh) {
            var meshMarker = pointMarker;
            if (!meshMarker.pointsMesh) {
                throw new Error("Expected a BaseMeshPointMarker3D.pointsMesh on 3D pointmarker of type InstancedMesh");
            }
            this.nativeEntity.SetPointMarkerType(eSCRTPointMarkerType.SCRT_POINT_MARKER_TYPE_INSTANCED_MESH);
            this.nativeEntity.SetPointSize(pointMarker.size);
            this.nativeEntity.SetPointMarkerMesh(meshMarker.pointsMesh);
        }
        else if (pointMarker.markerType === BasePointMarker3D_1.EMarkerType.TexturedQuad) {
            var textureMarker = pointMarker;
            if (!textureMarker.pointsTexture) {
                throw new Error("Expected a BaseTexturePointMarker3D.pointsTexture on 3D pointmarker of type TexturedQuad");
            }
            this.nativeEntity.SetPointMarkerType(eSCRTPointMarkerType.SCRT_POINT_MARKER_TYPE_TEXTURED_QUAD);
            this.nativeEntity.SetPointSize(pointMarker.size);
            this.nativeEntity.SetPointMarkerTexture(textureMarker.pointsTexture);
        }
        else {
            throw new Error("PointLine3DSceneEntity: Unknown pointMarker.markerType " + pointMarker.markerType);
        }
    };
    PointLine3DSceneEntity.prototype.rebuildPointMetadata = function (metadata, count, defaultColor) {
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
        var hasDefaultScales = true;
        var hasDefaultColors = true;
        // metadata will always be non-null but individual metadata items may be undefined
        // as its implemented as a non-sparse array
        metadata.forEach(function (meta, index) {
            var _a;
            if (meta) {
                var vertexColor = (_a = meta.vertexColorAbgr) !== null && _a !== void 0 ? _a : meta.vertexColor;
                if (vertexColor) {
                    hasDefaultColors = false;
                    _this.pointColors.set(index, vertexColor);
                }
                if (meta.pointScale) {
                    hasDefaultScales = false;
                    _this.pointScales.set(index, meta.pointScale);
                }
            }
        });
        return {
            lineColors: this.pointColors,
            pointColors: this.pointColors,
            scales: this.pointScales,
            hasDefaultScales: hasDefaultScales,
            hasDefaultColors: hasDefaultColors
        };
    };
    return PointLine3DSceneEntity;
}(RenderableSeriesSceneEntity_1.RenderableSeriesSceneEntity));
exports.PointLine3DSceneEntity = PointLine3DSceneEntity;
