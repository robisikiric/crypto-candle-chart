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
exports.SurfaceMeshSceneEntity = exports.SurfaceMeshSceneEntityState = void 0;
var Deleter_1 = require("../../../Core/Deleter");
var Guard_1 = require("../../../Core/Guard");
var NumberRange_1 = require("../../../Core/NumberRange");
var Point_1 = require("../../../Core/Point");
var SceneEntityType_1 = require("../../../types/SceneEntityType");
var parseColor_1 = require("../../../utils/parseColor");
var tsrExtensions_1 = require("../../../utils/tsrExtensions");
var BaseDataSeries3D_1 = require("../../Model/DataSeries/BaseDataSeries3D");
var Constants_1 = require("../RenderableSeries/Constants");
var HitTestInfo3D_1 = require("../RenderableSeries/HitTestInfo3D");
var SurfaceMeshRenderableSeries3D_1 = require("../RenderableSeries/SurfaceMesh/SurfaceMeshRenderableSeries3D");
var RenderableSeriesSceneEntity_1 = require("./RenderableSeriesSceneEntity");
var RenderableSeriesSceneEntityState_1 = require("./RenderableSeriesSceneEntityState");
// tslint:disable:max-classes-per-file
/** @ignore */
var EGridDrawingFeatures;
(function (EGridDrawingFeatures) {
    EGridDrawingFeatures[EGridDrawingFeatures["SCRT_GRID_DRAWING_FEATURES_SOLID"] = 1] = "SCRT_GRID_DRAWING_FEATURES_SOLID";
    EGridDrawingFeatures[EGridDrawingFeatures["SCRT_GRID_DRAWING_FEATURES_WIREFRAME"] = 2] = "SCRT_GRID_DRAWING_FEATURES_WIREFRAME";
    EGridDrawingFeatures[EGridDrawingFeatures["SCRT_GRID_DRAWING_FEATURES_CONTOURS"] = 4] = "SCRT_GRID_DRAWING_FEATURES_CONTOURS";
    EGridDrawingFeatures[EGridDrawingFeatures["SCRT_GRID_DRAWING_FEATURES_SKIRT"] = 8] = "SCRT_GRID_DRAWING_FEATURES_SKIRT";
})(EGridDrawingFeatures || (EGridDrawingFeatures = {}));
/** @ignore */
function toString(tsrVector) {
    return "xyzw= (".concat(tsrVector.x, " ").concat(tsrVector.y, " ").concat(tsrVector.z, " ").concat(tsrVector.w, ")");
}
/** @ignore */
function toStringRange(r) {
    return "(min=".concat(r.m_fMin.toFixed(2), ", max=").concat(r.m_fMax.toFixed(2), ")");
}
/** @ignore */
function debugProps(props) {
    // console.log(` m_fLightingAmount ${props.m_fLightingAmount}`);
    // console.log(` m_fShininess ${props.m_fShininess}`);
    // console.log(` m_fHighlight ${props.m_fHighlight}`);
    // console.log(` m_fHardNormals ${props.m_fHardNormals}`);
    // // console.log(` m_vContourColor ${toString(props.m_vContourColor)}`);
    // // console.log(` m_vWireframeStroke ${toString(props.m_vWireframeStroke)}`);
    // console.log(` m_fContourOffset ${props.m_fContourOffset}`);
    // console.log(` m_fContourInterval ${props.m_fContourInterval}`);
    // console.log(` m_fContourThickness ${props.m_fContourThickness}`);
    // console.log(` m_bUseSolidCells ${props.m_bUseSolidCells}`);
    // console.log(` m_bUseGradient ${props.m_bUseGradient}`);
    // console.log(` m_bDrawBackSide ${props.m_bDrawBackSide}`);
    // console.log(` m_eDrawMeshAs ${props.m_eDrawMeshAs}`);
    // console.log(` m_fStrokeThickness ${props.m_fStrokeThickness}`);
}
/**
 * State object for {@link SurfaceMeshSceneEntity}
 */
var SurfaceMeshSceneEntityState = /** @class */ (function (_super) {
    __extends(SurfaceMeshSceneEntityState, _super);
    function SurfaceMeshSceneEntityState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SurfaceMeshSceneEntityState.prototype, "isColorMapTextureInvalid", {
        /**
         * Gets or sets whether the color map texture is valid
         */
        get: function () {
            return this.isColorMapTextureInvalidProperty;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Gets or sets whether the color map texture is valid
     */
    SurfaceMeshSceneEntityState.prototype.setColorMapTextureInvalid = function () {
        this.isColorMapTextureInvalidProperty = true;
    };
    /**
     * @inheritDoc
     */
    SurfaceMeshSceneEntityState.prototype.validate = function (rs, rpi) {
        return _super.prototype.validate.call(this, rs, rpi) && this.isColorMapTextureInvalid;
    };
    /**
     * @inheritDoc
     */
    SurfaceMeshSceneEntityState.prototype.reset = function (rs, rpi) {
        _super.prototype.reset.call(this, rs, rpi);
        this.isColorMapTextureInvalidProperty = false;
    };
    return SurfaceMeshSceneEntityState;
}(RenderableSeriesSceneEntityState_1.RenderableSeriesSceneEntityState));
exports.SurfaceMeshSceneEntityState = SurfaceMeshSceneEntityState;
/**
 * @summary {@link BaseSceneEntity3D} type for drawing 3D Surface Plot or Surface Mesh with optional Contours in
 * SciChart's High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @remarks See related type {@link SurfaceMeshRenderableSeries3D} which should be added to {@link SciChart3DSurface.renderableSeries}
 * along with data from an {@link UniformGridDataSeries3D} to create a 3D Surface Mesh or Surface Plot
 */
var SurfaceMeshSceneEntity = /** @class */ (function (_super) {
    __extends(SurfaceMeshSceneEntity, _super);
    /**
     * Creates an instance of {@link SurfaceMeshSceneEntity}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries The parent {@link BaseRenderableSeries3D} which this entity maps to
     */
    function SurfaceMeshSceneEntity(webAssemblyContext, parentSeries) {
        var _this = this;
        var _a;
        _this = _super.call(this, webAssemblyContext, parentSeries, new SurfaceMeshSceneEntityState()) || this;
        /**
         * @inheritDoc
         */
        _this.type = SceneEntityType_1.ESceneEntityType.SurfaceMeshSceneEntity;
        _this.setNativeEntity(webAssemblyContext.SCRTGridMeshEntity.implement(_this));
        _this.colorMapTexture = (0, Deleter_1.deleteSafe)(_this.colorMapTexture);
        _this.colorMapTexture = (_a = _this.parentSeries.meshColorPalette) === null || _a === void 0 ? void 0 : _a.getTexture(_this.parentSeries.colorMapTextureSize);
        return _this;
    }
    /**
     * @inheritDoc
     */
    SurfaceMeshSceneEntity.prototype.notifySeriesPropertyChanged = function (propertyName) {
        if (propertyName === Constants_1.PROPERTY.MESH_COLOR_PALETTE ||
            propertyName === Constants_1.PROPERTY.MESH_PALETTE_MODE ||
            propertyName === Constants_1.PROPERTY.MESH_RESOLUTION ||
            propertyName === Constants_1.PROPERTY.COLOR_MAP_TEXTURE_SIZE) {
            this.state.setColorMapTextureInvalid();
        }
        _super.prototype.notifySeriesPropertyChanged.call(this, propertyName);
    };
    /**
     * @inheritDoc
     */
    SurfaceMeshSceneEntity.prototype.delete = function () {
        _super.prototype.delete.call(this);
        this.colorMapTexture = (0, Deleter_1.deleteSafe)(this.colorMapTexture);
    };
    SurfaceMeshSceneEntity.prototype.hitTest = function (screenPoint) {
        var _a;
        var x = Math.round(screenPoint.x);
        var y = Math.round(screenPoint.y);
        var selectionInfo = this.webAssemblyContext.SCRTGetSelectionInfo(x, y);
        var result = new HitTestInfo3D_1.HitTestInfo3D(this.parentSeries, false);
        result.isHit = ((_a = selectionInfo.GetEntity()) === null || _a === void 0 ? void 0 : _a.GetEntityId()) === this.entityId;
        result.selectionIjIndices = result.isHit
            ? new Point_1.Point(selectionInfo.m_uiHeightMapIndexI, selectionInfo.m_uiHeightMapIndexJ)
            : undefined;
        result.hitTestPoint = screenPoint;
        return result;
    };
    /**
     * @inheritDoc
     */
    SurfaceMeshSceneEntity.prototype.Render = function () {
        if (!this.currentRenderPassData) {
            return;
        }
        if (!this.colorMapTexture || !this.parentSeries.dataSeries) {
            console.log("Cannot draw a SurfaceMeshRenderableSeries3D without a meshColorPalette or dataSeries!");
            return;
        }
        // Set opacity
        this.nativeEntity.SetOpacity(this.parentSeries.opacity);
        // Setup Properties for grid mesh
        //
        var props;
        try {
            props = new this.webAssemblyContext.SCRTGridDrawingProperties();
            var features = 0;
            if (this.hasFlag(this.parentSeries.drawMeshAs, [
                SurfaceMeshRenderableSeries3D_1.EDrawMeshAs.SOLID_WIREFRAME,
                SurfaceMeshRenderableSeries3D_1.EDrawMeshAs.SOLID_WIREFRAME,
                SurfaceMeshRenderableSeries3D_1.EDrawMeshAs.SOLID_WIREFRAME_WITH_CONTOURS
            ])) {
                features |= EGridDrawingFeatures.SCRT_GRID_DRAWING_FEATURES_WIREFRAME;
            }
            if (this.hasFlag(this.parentSeries.drawMeshAs, [
                SurfaceMeshRenderableSeries3D_1.EDrawMeshAs.SOLID_WIREFRAME,
                SurfaceMeshRenderableSeries3D_1.EDrawMeshAs.SOLID_MESH,
                SurfaceMeshRenderableSeries3D_1.EDrawMeshAs.SOLID_WITH_CONTOURS,
                SurfaceMeshRenderableSeries3D_1.EDrawMeshAs.SOLID_WIREFRAME_WITH_CONTOURS
            ])) {
                features |= EGridDrawingFeatures.SCRT_GRID_DRAWING_FEATURES_SOLID;
            }
            if (this.hasFlag(this.parentSeries.drawMeshAs, [
                SurfaceMeshRenderableSeries3D_1.EDrawMeshAs.CONTOURS,
                SurfaceMeshRenderableSeries3D_1.EDrawMeshAs.SOLID_WITH_CONTOURS,
                SurfaceMeshRenderableSeries3D_1.EDrawMeshAs.SOLID_WIREFRAME_WITH_CONTOURS
            ])) {
                features |= EGridDrawingFeatures.SCRT_GRID_DRAWING_FEATURES_CONTOURS;
            }
            if (this.parentSeries.drawSkirt) {
                features |= EGridDrawingFeatures.SCRT_GRID_DRAWING_FEATURES_SKIRT;
            }
            var useGradient = this.hasFlag(this.parentSeries.meshPaletteMode, [
                SurfaceMeshRenderableSeries3D_1.EMeshPaletteMode.HEIGHT_MAP_INTERPOLATED,
                SurfaceMeshRenderableSeries3D_1.EMeshPaletteMode.HEIGHT_MAP_SOLID_CELLS
            ]);
            var useSolidCells = this.hasFlag(this.parentSeries.meshPaletteMode, [
                SurfaceMeshRenderableSeries3D_1.EMeshPaletteMode.HEIGHT_MAP_SOLID_CELLS,
                SurfaceMeshRenderableSeries3D_1.EMeshPaletteMode.TEXTURED_SOLID_CELLS
            ]);
            // console.log(`features: ${features}`);
            props.SetDrawMeshAsInteger(features);
            props.m_bUseGradient = useGradient;
            props.m_bUseSolidCells = useSolidCells;
            props.m_fStrokeThickness = this.parentSeries.strokeThickness;
            props.m_fContourThickness = this.parentSeries.contourStrokeThickness;
            props.m_fContourInterval = this.parentSeries.contourInterval;
            props.m_fContourOffset = this.parentSeries.contourOffset;
            if (this.parentSeries.stroke) {
                var sc = (0, parseColor_1.parseColorToTArgb)(this.parentSeries.stroke);
                (0, tsrExtensions_1.updateTsrVector4)(sc, props.GetWireframeStrokePtr());
            }
            if (this.parentSeries.contourStroke) {
                (0, tsrExtensions_1.updateTsrVector4)((0, parseColor_1.parseColorToTArgb)(this.parentSeries.contourStroke), props.GetContourColorPtr());
            }
            props.m_fHardNormals = this.parentSeries.cellHardnessFactor;
            props.m_fHighlight = this.parentSeries.highlight;
            props.m_fShininess = this.parentSeries.shininess;
            props.m_fLightingAmount = this.parentSeries.lightingFactor;
            debugProps(props);
            this.nativeEntity.SetGridDrawingProperties(props);
        }
        finally {
            (0, Deleter_1.deleteSafe)(props);
        }
        // Setup Range and Offset
        var xCalc = this.currentRenderPassData.xCalc;
        var yCalc = this.currentRenderPassData.yCalc;
        var zCalc = this.currentRenderPassData.zCalc;
        var meshRangeX;
        var meshRangeY;
        var meshRangeZ;
        var visibleRangeX;
        var visibleRangeY;
        var visibleRangeZ;
        try {
            var yRange = new NumberRange_1.NumberRange(this.parentSeries.minimum, this.parentSeries.maximum);
            meshRangeX = this.rangeToSCRTAxisRange(this.webAssemblyContext, xCalc, this.parentSeries.dataSeries.xRange);
            meshRangeY = this.rangeToSCRTAxisRange(this.webAssemblyContext, yCalc, yRange);
            meshRangeZ = this.rangeToSCRTAxisRange(this.webAssemblyContext, zCalc, this.parentSeries.dataSeries.zRange);
            // console.log(
            //     `meshRange: x=${toStringRange(meshRangeX)} y=${toStringRange(meshRangeY)} z=${toStringRange(
            //         meshRangeZ
            //     )}`
            // );
            this.nativeEntity.SetMeshRange(meshRangeX, meshRangeY, meshRangeZ);
            visibleRangeX = this.toSCRTAxisRange(this.webAssemblyContext, xCalc, xCalc.visibleMin, xCalc.visibleMax);
            visibleRangeY = this.toSCRTAxisRange(this.webAssemblyContext, yCalc, yCalc.visibleMin, yCalc.visibleMax);
            visibleRangeZ = this.toSCRTAxisRange(this.webAssemblyContext, zCalc, zCalc.visibleMin, zCalc.visibleMax);
            // console.log(
            //     `visibleRange: x=${toStringRange(visibleRangeX)} y=${toStringRange(visibleRangeY)} z=${toStringRange(
            //         visibleRangeZ
            //     )}`
            // );
            // console.log(
            //     `Viewport dimensions: ${xCalc.viewportDimension}, ${yCalc.viewportDimension}, ${zCalc.viewportDimension}`
            // );
            this.nativeEntity.SetVisibleRange(visibleRangeX, visibleRangeY, visibleRangeZ);
        }
        finally {
            (0, Deleter_1.deleteSafe)(meshRangeX);
            (0, Deleter_1.deleteSafe)(meshRangeY);
            (0, Deleter_1.deleteSafe)(meshRangeZ);
            (0, Deleter_1.deleteSafe)(visibleRangeX);
            (0, Deleter_1.deleteSafe)(visibleRangeY);
            (0, Deleter_1.deleteSafe)(visibleRangeZ);
        }
        var yOffset = this.parentSeries.yOffset ? yCalc.getCoordinate(this.parentSeries.yOffset) : 0;
        // console.log(`heightScaleFactor, yOffset ${this.parentSeries.heightScaleFactor} ${yOffset}`);
        this.nativeEntity.SetHeightmapScaleOffset(this.parentSeries.heightScaleFactor, yOffset);
        // console.log(`ColormapTexture ${this.colorMapTexture}`);
        this.nativeEntity.SetTexture(this.colorMapTexture.getTexture());
        _super.prototype.Render.call(this);
    };
    /**
     * @inheritDoc
     */
    SurfaceMeshSceneEntity.prototype.updateSeries = function () {
        var _a;
        var gridDataSeries = this.parentSeries.dataSeries;
        if (gridDataSeries) {
            Guard_1.Guard.isTrue(gridDataSeries.type === BaseDataSeries3D_1.EDataSeriesType3D.UniformGrid3D ||
                gridDataSeries.type === BaseDataSeries3D_1.EDataSeriesType3D.NonUniformGrid3D, "SurfaceMeshSceneEntity dataSeries must be type UniformGrid3D or NonUniformGrid3D");
            var gridWidth = gridDataSeries.xSize;
            var gridHeight = gridDataSeries.zSize;
            Guard_1.Guard.notNull(this.currentRenderPassData, "SurfaceMeshSceneEntity.currentRenderPassData");
            // SCJS-1562 2 DAYS to find the source of the crash! Don't recreate every frame.
            if (this.state.isColorMapTextureInvalid) {
                this.colorMapTexture = (0, Deleter_1.deleteSafe)(this.colorMapTexture);
                this.colorMapTexture = (_a = this.parentSeries.meshColorPalette) === null || _a === void 0 ? void 0 : _a.getTexture(this.parentSeries.colorMapTextureSize);
            }
            var needUpdateMesh = this.state.isInitialState;
            var needUpdateHeights = this.state.isDataSeriesModified;
            if (needUpdateMesh) {
                var scrtMeshRes = void 0;
                switch (this.parentSeries.meshResolution) {
                    case SurfaceMeshRenderableSeries3D_1.EMeshResolution.MESH_RESOLUTION_X1:
                        scrtMeshRes = this.webAssemblyContext.eSCRTGridMeshResolution.SCRT_GRID_MESH_RES_X1;
                        break;
                    case SurfaceMeshRenderableSeries3D_1.EMeshResolution.MESH_RESOLUTION_X2:
                        scrtMeshRes = this.webAssemblyContext.eSCRTGridMeshResolution.SCRT_GRID_MESH_RES_X2;
                        break;
                    case SurfaceMeshRenderableSeries3D_1.EMeshResolution.MESH_RESOLUTION_X4:
                        scrtMeshRes = this.webAssemblyContext.eSCRTGridMeshResolution.SCRT_GRID_MESH_RES_X4;
                        break;
                    default:
                        throw Error("Unknown SurfaceMeshSceneEntity.meshResolution " + this.parentSeries.meshResolution);
                }
                var heightCoords = new this.webAssemblyContext.FloatVector();
                var zOffsets = new this.webAssemblyContext.FloatVector();
                var cellColors = new this.webAssemblyContext.UIntVector();
                heightCoords.resize(gridWidth * gridHeight, 0);
                zOffsets.resize(gridWidth * gridHeight, 0);
                cellColors.resize(gridWidth * gridHeight, 0);
                // console.log(`UpdateMeshesVec ${gridWidth} ${gridHeight}`);
                this.nativeEntity.UpdateMeshesVec(heightCoords, zOffsets, cellColors, gridWidth, gridHeight, scrtMeshRes);
                (0, Deleter_1.deleteSafe)(heightCoords);
                (0, Deleter_1.deleteSafe)(zOffsets);
                (0, Deleter_1.deleteSafe)(cellColors);
            }
            if (needUpdateHeights) {
                // console.log(`UpdateHeightCoordinatesVec ${gridWidth} ${gridHeight}`);
                var heightCoords = new this.webAssemblyContext.FloatVector();
                var size = gridWidth * gridHeight;
                heightCoords.reserve(size);
                var yCalc = this.currentRenderPassData.yCalc;
                // console.log(`yCalc: ${yCalc.visibleMin}, ${yCalc.visibleMax}, ${yCalc.viewportDimension}`);
                for (var z = 0; z < gridDataSeries.zSize; z++) {
                    for (var x = 0; x < gridDataSeries.xSize; x++) {
                        heightCoords.push_back(yCalc.getCoordinate(gridDataSeries.getYValue(z, x)));
                    }
                }
                this.nativeEntity.UpdateHeightCoordinatesVec(heightCoords, gridWidth, gridHeight);
                (0, Deleter_1.deleteSafe)(heightCoords);
            }
        }
    };
    SurfaceMeshSceneEntity.prototype.hasFlag = function (theFlag, matchList) {
        return matchList.some(function (item) { return item === theFlag; });
    };
    SurfaceMeshSceneEntity.prototype.toSCRTAxisRange = function (webAssemblyContext, calc, min, max) {
        var scrtAxisRange = new webAssemblyContext.SCRTAxisRange();
        scrtAxisRange.m_fMin = calc ? calc.getCoordinate(min) : min;
        scrtAxisRange.m_fMax = calc ? calc.getCoordinate(max) : max;
        scrtAxisRange.m_fDiff = calc ? calc.getCoordinate(max - min) : max - min;
        return scrtAxisRange;
    };
    SurfaceMeshSceneEntity.prototype.rangeToSCRTAxisRange = function (webAssemblyContext, calc, tsRange) {
        return this.toSCRTAxisRange(webAssemblyContext, calc, tsRange.min, tsRange.max);
    };
    return SurfaceMeshSceneEntity;
}(RenderableSeriesSceneEntity_1.RenderableSeriesSceneEntity));
exports.SurfaceMeshSceneEntity = SurfaceMeshSceneEntity;
