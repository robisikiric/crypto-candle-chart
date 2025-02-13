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
exports.SurfaceMeshRenderableSeries3D = exports.EMeshResolution = exports.EMeshPaletteMode = exports.EDrawMeshAs = void 0;
var Size_1 = require("../../../../types/Size");
var SurfaceMeshSceneEntity_1 = require("../../Primitives/SurfaceMeshSceneEntity");
var BaseRenderableSeries3D_1 = require("../BaseRenderableSeries3D");
var Constants_1 = require("../Constants");
var ESeriesType_1 = require("../ESeriesType");
/**
 * Enumeration constants which define how a {@link SurfaceMeshRenderableSeries3D | Surface Mesh Plot} is drawn
 */
var EDrawMeshAs;
(function (EDrawMeshAs) {
    /**
     * Draws the SurfaceMesh as wireframe only
     */
    EDrawMeshAs["WIREFRAME"] = "WIREFRAME";
    /**
     * Draws the SurfaceMesh as a solid shape with wireframe
     */
    EDrawMeshAs["SOLID_WIREFRAME"] = "SOLID_WIREFRAME";
    /**
     * Draws the SurfaceMesh as a solid shape with wireframe and contours
     */
    EDrawMeshAs["SOLID_WIREFRAME_WITH_CONTOURS"] = "SOLID_WIREFRAME_WITH_CONTOURS";
    /**
     * Draws the SurfaceMesh as a solid shape only
     */
    EDrawMeshAs["SOLID_MESH"] = "SOLID_MESH";
    /**
     * Draws the SurfaceMesh as a solid shape with contours
     */
    EDrawMeshAs["SOLID_WITH_CONTOURS"] = "SOLID_WITH_CONTOURS";
    /**
     * Draws the SurfaceMesh as contours only
     */
    EDrawMeshAs["CONTOURS"] = "CONTOURS";
})(EDrawMeshAs = exports.EDrawMeshAs || (exports.EDrawMeshAs = {}));
/**
 * Enumeration constants which define a {@link SurfaceMeshRenderableSeries3D | Surface Mesh Plot} mesh palette mode
 */
var EMeshPaletteMode;
(function (EMeshPaletteMode) {
    /**
     * The Height Map is linear interpolated
     */
    EMeshPaletteMode["HEIGHT_MAP_INTERPOLATED"] = "HEIGHT_MAP_INTERPOLATED";
    /**
     * The Height Map has steps between cells
     */
    EMeshPaletteMode["HEIGHT_MAP_SOLID_CELLS"] = "HEIGHT_MAP_SOLID_CELLS";
    /**
     * The Height Map is ignored and applied as a texture instead
     */
    EMeshPaletteMode["TEXTURED_SOLID_CELLS"] = "TEXTURED_SOLID_CELLS";
})(EMeshPaletteMode = exports.EMeshPaletteMode || (exports.EMeshPaletteMode = {}));
/**
 * Enumeration constants which define a {@link SurfaceMeshRenderableSeries3D | Surface Mesh Plot} mesh resolution
 */
var EMeshResolution;
(function (EMeshResolution) {
    /**
     * Mesh resolution is 1:1 between data cells and mesh cells
     */
    EMeshResolution[EMeshResolution["MESH_RESOLUTION_X1"] = 1] = "MESH_RESOLUTION_X1";
    /**
     * Twice the number of mesh cells for each data-cell
     */
    EMeshResolution[EMeshResolution["MESH_RESOLUTION_X2"] = 2] = "MESH_RESOLUTION_X2";
    /**
     * 4x the number of mesh cells for each data-cell
     */
    EMeshResolution[EMeshResolution["MESH_RESOLUTION_X4"] = 4] = "MESH_RESOLUTION_X4";
})(EMeshResolution = exports.EMeshResolution || (exports.EMeshResolution = {}));
/**
 * @summary A JavaScript 3D Surface Mesh or Surface Plot chart type rendering a 2-dimensional array of data as color and height values
 * SciChart's High Performance Real-time {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Chart Library}
 * @description
 * Surface meshes are a 3D representation of 2-dimensional arrays of data, rendered as a height-map with optional colors on the chart.
 * The {@link SurfaceMeshRenderableSeries3D} assumes the cells are equal size, and spaced along the X,Z axis according to properties on the
 * {@link UniformGridDataSeries3D}.
 *
 * For a code sample how to initialize a surface mesh, see below
 *
 * ```ts
 * // Create an empty 2D array using the helper function zeroArray2D
 * const heightMapArray: number[][] = zeroArray2D([height, width]);
 * // todo: fill the zValues 2d array with values
 *
 * // Create a UniformGridDataSeries3D passing in height values
 * const dataSeries = new UniformGridDataSeries3D(wasmContext, {
 *       yValues: heightmapArray,
 *       xStep: 1,
 *       zStep: 1,
 *       dataSeriesName: "Uniform Surface Mesh"
 *   });
 *
 * // Create a color map with gradient colors
 * const colorMap = new GradientColorPalette(wasmContext, {
 *        gradientStops: [
 *            { offset: 1, color: "#8B0000" },
 *            { offset: 0.9, color: "#FF0000" },
 *            { offset: 0.7, color: "#FF0000" },
 *            { offset: 0.5, color: "#ADFF2F" },
 *            { offset: 0.3, color: "#00FFFF" },
 *            { offset: 0.1, color: "#0000FF" },
 *            { offset: 0, color: "#1D2C6B" }
 *        ]
 *    });
 *
 * // Create a SurfaceMeshRenderableSeries3D
 * const series = new SurfaceMeshRenderableSeries3D(wasmContext, {
 *        dataSeries,
 *        minimum: 0,
 *        maximum: 0.5,
 *        opacity: 0.9,
 *        cellHardnessFactor: 1.0,
 *        shininess: 0,
 *        lightingFactor: 0.8,
 *        highlight: 1.0,
 *        stroke: "rgba(24,139,34,0.5)",
 *        strokeThickness: 2.0,
 *        contourStroke: "rgba(24,139,34,0.5)",
 *        contourInterval: 2,
 *        contourOffset: 0,
 *        contourStrokeThickness: 2,
 *        drawSkirt: false,
 *        drawMeshAs: EDrawMeshAs.SOLID_WIREFRAME,
 *        meshColorPalette: colorMap,
 *        isVisible: true
 *    });
 *
 * // Add the Surface Mesh to the chart
 * sciChart3DSurface.renderableSeries.add(series);
 * ```
 */
var SurfaceMeshRenderableSeries3D = /** @class */ (function (_super) {
    __extends(SurfaceMeshRenderableSeries3D, _super);
    /**
     * Creates an instance of a {@link SurfaceMeshRenderableSeries3D}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context}
     * containing native methods and access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options
     */
    function SurfaceMeshRenderableSeries3D(webAssemblyContext, options) {
        var _this = _super.call(this, webAssemblyContext, options) || this;
        _this.drawMeshAsProperty = (options === null || options === void 0 ? void 0 : options.drawMeshAs) || EDrawMeshAs.SOLID_WIREFRAME;
        _this.strokeThicknessProperty = (options === null || options === void 0 ? void 0 : options.strokeThickness) !== undefined ? options === null || options === void 0 ? void 0 : options.strokeThickness : 1;
        _this.drawSkirtProperty = (options === null || options === void 0 ? void 0 : options.drawSkirt) !== undefined ? options === null || options === void 0 ? void 0 : options.drawSkirt : true;
        _this.meshColorPaletteProperty = options === null || options === void 0 ? void 0 : options.meshColorPalette;
        _this.minimumProperty = (options === null || options === void 0 ? void 0 : options.minimum) !== undefined ? options === null || options === void 0 ? void 0 : options.minimum : 0;
        _this.maximumProperty = (options === null || options === void 0 ? void 0 : options.maximum) !== undefined ? options === null || options === void 0 ? void 0 : options.maximum : 1;
        _this.meshPaletteModeProperty = (options === null || options === void 0 ? void 0 : options.meshPaletteMode) || EMeshPaletteMode.HEIGHT_MAP_INTERPOLATED;
        _this.colorMapTextureSizeProperty = (options === null || options === void 0 ? void 0 : options.colorMapTextureSize) || new Size_1.Size(1024, 1);
        _this.heightScaleFactorProperty = (options === null || options === void 0 ? void 0 : options.heightScaleFactor) !== undefined ? options === null || options === void 0 ? void 0 : options.heightScaleFactor : 1;
        _this.meshResolutionProperty = (options === null || options === void 0 ? void 0 : options.meshResolution) || EMeshResolution.MESH_RESOLUTION_X1;
        _this.yOffsetProperty = (options === null || options === void 0 ? void 0 : options.yOffset) !== undefined ? options === null || options === void 0 ? void 0 : options.yOffset : 0;
        _this.cellHardnessFactorProperty = (options === null || options === void 0 ? void 0 : options.cellHardnessFactor) !== undefined ? options === null || options === void 0 ? void 0 : options.cellHardnessFactor : 1;
        _this.lightingFactorProperty = (options === null || options === void 0 ? void 0 : options.lightingFactor) !== undefined ? options === null || options === void 0 ? void 0 : options.lightingFactor : 0.8;
        _this.contourStrokeThicknessProperty =
            (options === null || options === void 0 ? void 0 : options.contourStrokeThickness) !== undefined ? options === null || options === void 0 ? void 0 : options.contourStrokeThickness : 2;
        _this.contourIntervalProperty = (options === null || options === void 0 ? void 0 : options.contourInterval) !== undefined ? options === null || options === void 0 ? void 0 : options.contourInterval : 20.0;
        _this.contourOffsetProperty = (options === null || options === void 0 ? void 0 : options.contourOffset) !== undefined ? options.contourOffset : 0.1;
        _this.contourStrokeProperty = (options === null || options === void 0 ? void 0 : options.contourStroke) || "#FFFFFF";
        _this.highlightProperty = (options === null || options === void 0 ? void 0 : options.highlight) !== undefined ? options === null || options === void 0 ? void 0 : options.highlight : 0.05;
        _this.setSceneEntity(new SurfaceMeshSceneEntity_1.SurfaceMeshSceneEntity(webAssemblyContext, _this));
        return _this;
    }
    Object.defineProperty(SurfaceMeshRenderableSeries3D.prototype, "type", {
        /**
         * @inheritDoc
         */
        get: function () {
            return ESeriesType_1.ESeriesType3D.SurfaceMeshRenderableSeries3D;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SurfaceMeshRenderableSeries3D.prototype, "colorMapTextureSize", {
        /**
         * Gets or sets the Colormap texture size.
         * @remarks This defaults to [1024,1] and simply sets the resolution of color mapping. Leave default in normal operation
         */
        get: function () {
            return this.colorMapTextureSizeProperty;
        },
        /**
         * Gets or sets the Colormap texture size.
         * @remarks This defaults to [1024,1] and simply sets the resolution of color mapping. Leave default in normal operation
         */
        set: function (colorMapTextureSize) {
            this.colorMapTextureSizeProperty = colorMapTextureSize;
            this.notifyPropertyChanged(Constants_1.PROPERTY.COLOR_MAP_TEXTURE_SIZE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SurfaceMeshRenderableSeries3D.prototype, "drawMeshAs", {
        /**
         * Gets or sets the {@link EDrawMeshAs}, whether the mesh is drawn as wireframe, solid, with or without contours etc...
         * @remarks Default value is SOLID_WIREFRAME. For contours, choose SOLID_WITH_CONTOURS
         */
        get: function () {
            return this.drawMeshAsProperty;
        },
        /**
         * Gets or sets the {@link EDrawMeshAs}, whether the mesh is drawn as wireframe, solid, with or without contours etc...
         * @remarks Default value is SOLID_WIREFRAME. For contours, choose SOLID_WITH_CONTOURS
         */
        set: function (drawMeshAs) {
            this.drawMeshAsProperty = drawMeshAs;
            this.notifyPropertyChanged(Constants_1.PROPERTY.DRAW_MESH_AS);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SurfaceMeshRenderableSeries3D.prototype, "strokeThickness", {
        /**
         * Gets or sets the stroke thickness of mesh wireframe lines on the {@link SurfaceMeshRenderableSeries3D}
         */
        get: function () {
            return this.strokeThicknessProperty;
        },
        /**
         * Gets or sets the stroke thickness of mesh wireframe lines on the {@link SurfaceMeshRenderableSeries3D}
         */
        set: function (strokeThickness) {
            this.strokeThicknessProperty = strokeThickness;
            this.notifyPropertyChanged(Constants_1.PROPERTY.STROKE_THICKNESS);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SurfaceMeshRenderableSeries3D.prototype, "drawSkirt", {
        /**
         * When true, draws a skirt from the edge of the mesh to zero (solid walls on the left, right, top, bottom side)
         */
        get: function () {
            return this.drawSkirtProperty;
        },
        /**
         * When true, draws a skirt from the edge of the mesh to zero (solid walls on the left, right, top, bottom side)
         */
        set: function (drawSkirt) {
            this.drawSkirtProperty = drawSkirt;
            this.notifyPropertyChanged(Constants_1.PROPERTY.DRAW_SKIRT);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SurfaceMeshRenderableSeries3D.prototype, "meshColorPalette", {
        /**
         * Gets or sets the {@link MeshColorPalette}, which defines how values in the {@link SurfaceMeshRenderableSeries3D.dataSeries} map to colours
         * @remarks See concrete types {@link SolidColorBrushPalette} and {@link GradientColorPalette} plus our examples for more information.
         */
        get: function () {
            return this.meshColorPaletteProperty;
        },
        /**
         * Gets or sets the {@link MeshColorPalette}, which defines how values in the {@link SurfaceMeshRenderableSeries3D.dataSeries} map to colours
         * @remarks See concrete types {@link SolidColorBrushPalette} and {@link GradientColorPalette} plus our examples for more information.
         */
        set: function (meshColorPalette) {
            this.meshColorPaletteProperty = meshColorPalette;
            this.notifyPropertyChanged(Constants_1.PROPERTY.MESH_COLOR_PALETTE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SurfaceMeshRenderableSeries3D.prototype, "minimum", {
        /**
         * Gets or sets the minimum value in the {@link SurfaceMeshRenderableSeries3D.dataSeries} that we want to map to colours in the
         * {@link SurfaceMeshRenderableSeries3D.meshColorPalette}
         * @remarks For example, if data contains values 0..100, and the meshColorPalette is a {@link GradientColorPalette} from red to blue, and you want
         * 0=red and blue=100 then you should set {@link SurfaceMeshRenderableSeries3D.minimum} = 0 and {@link SurfaceMeshRenderableSeries3D.maximum} = 1
         */
        get: function () {
            return this.minimumProperty;
        },
        /**
         * Gets or sets the minimum value in the {@link SurfaceMeshRenderableSeries3D.dataSeries} that we want to map to colours in the
         * {@link SurfaceMeshRenderableSeries3D.meshColorPalette}
         * @remarks For example, if data contains values 0..100, and the meshColorPalette is a {@link GradientColorPalette} from red to blue, and you want
         * 0=red and blue=100 then you should set {@link SurfaceMeshRenderableSeries3D.minimum} = 0 and {@link SurfaceMeshRenderableSeries3D.maximum} = 1
         */
        set: function (minimum) {
            this.minimumProperty = minimum;
            this.notifyPropertyChanged(Constants_1.PROPERTY.MINIMUM);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SurfaceMeshRenderableSeries3D.prototype, "maximum", {
        /**
         * Gets or sets the maximum value in the {@link SurfaceMeshRenderableSeries3D.dataSeries} that we want to map to colours in the
         * {@link SurfaceMeshRenderableSeries3D.meshColorPalette}
         * @remarks For example, if data contains values 0..100, and the meshColorPalette is a {@link GradientColorPalette} from red to blue, and you want
         * 0=red and blue=100 then you should set {@link SurfaceMeshRenderableSeries3D.minimum} = 0 and {@link SurfaceMeshRenderableSeries3D.maximum} = 1
         */
        get: function () {
            return this.maximumProperty;
        },
        /**
         * Gets or sets the maximum value in the {@link SurfaceMeshRenderableSeries3D.dataSeries} that we want to map to colours in the
         * {@link SurfaceMeshRenderableSeries3D.meshColorPalette}
         * @remarks For example, if data contains values 0..100, and the meshColorPalette is a {@link GradientColorPalette} from red to blue, and you want
         * 0=red and blue=100 then you should set {@link SurfaceMeshRenderableSeries3D.minimum} = 0 and {@link SurfaceMeshRenderableSeries3D.maximum} = 1
         */
        set: function (maximum) {
            this.maximumProperty = maximum;
            this.notifyPropertyChanged(Constants_1.PROPERTY.MAXIMUM);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SurfaceMeshRenderableSeries3D.prototype, "meshPaletteMode", {
        /**
         * Gets or sets the {@link EMeshPaletteMode}, which defines how heightmaps are treated.
         * @remarks Defaults to HEIGHT_MAP_INTERPOLATED
         */
        get: function () {
            return this.meshPaletteModeProperty;
        },
        /**
         * Gets or sets the {@link EMeshPaletteMode}, which defines how heightmaps are treated.
         * @remarks Defaults to HEIGHT_MAP_INTERPOLATED
         */
        set: function (meshPaletteMode) {
            this.meshPaletteModeProperty = meshPaletteMode;
            this.notifyPropertyChanged(Constants_1.PROPERTY.MESH_PALETTE_MODE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SurfaceMeshRenderableSeries3D.prototype, "heightScaleFactor", {
        /**
         * Gets or sets the height scale factor for the {@link SurfaceMeshRenderableSeries3D}.
         * @remarks Default value is 1. A height scale factor of 0 makes the mesh flat, and 0.5 means all heights are multiplied by 0.5 etc...
         */
        get: function () {
            return this.heightScaleFactorProperty;
        },
        /**
         * Gets or sets the height scale factor for the {@link SurfaceMeshRenderableSeries3D}.
         * @remarks Default value is 1. A height scale factor of 0 makes the mesh flat, and 0.5 means all heights are multiplied by 0.5 etc...
         */
        set: function (heightScaleFactor) {
            this.heightScaleFactorProperty = heightScaleFactor;
            this.notifyPropertyChanged(Constants_1.PROPERTY.HEIGHT_SCALE_FACTOR);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SurfaceMeshRenderableSeries3D.prototype, "meshResolution", {
        /**
         * Gets or sets the {@link EMeshResolution}, the amount of oversampling when creating a mesh.
         * @remarks Defaults to 1x.
         */
        get: function () {
            return this.meshResolutionProperty;
        },
        /**
         * Gets or sets the {@link EMeshResolution}, the amount of oversampling when creating a mesh.
         * @remarks Defaults to 1x.
         */
        set: function (meshResolution) {
            this.meshResolutionProperty = meshResolution;
            this.notifyPropertyChanged(Constants_1.PROPERTY.MESH_RESOLUTION);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SurfaceMeshRenderableSeries3D.prototype, "yOffset", {
        /**
         * Gets or sets a Y-offset or height-offset in world coordinates.
         * @remarks Defaults to 0. When setting to a value such as 10, the entire {@link SurfaceMeshRenderableSeries3D} will be offset to height=10
         */
        get: function () {
            return this.yOffsetProperty;
        },
        /**
         * Gets or sets a Y-offset or height-offset in world coordinates.
         * @remarks Defaults to 0. When setting to a value such as 10, the entire {@link SurfaceMeshRenderableSeries3D} will be offset to height=10
         */
        set: function (yOffset) {
            this.yOffsetProperty = yOffset;
            this.notifyPropertyChanged(Constants_1.PROPERTY.Y_OFFSET);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SurfaceMeshRenderableSeries3D.prototype, "cellHardnessFactor", {
        /**
         * Gets or sets the cell hardness factor, a number used to calculate lighting effects.
         * @remarks Defaults to 1
         */
        get: function () {
            return this.cellHardnessFactorProperty;
        },
        /**
         * Gets or sets the cell hardness factor, a number used to calculate lighting effects.
         * @remarks Defaults to 1
         */
        set: function (cellHardnessFactor) {
            this.cellHardnessFactorProperty = cellHardnessFactor;
            this.notifyPropertyChanged(Constants_1.PROPERTY.CELL_HARDNESS_FACTOR);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SurfaceMeshRenderableSeries3D.prototype, "lightingFactor", {
        /**
         * Gets or sets the lighting factor, a number used to calculate lighting effects.
         * @remarks Defaults to 0.8
         */
        get: function () {
            return this.lightingFactorProperty;
        },
        /**
         * Gets or sets the lighting factor, a number used to calculate lighting effects.
         * @remarks Defaults to 0.8
         */
        set: function (lightingFactor) {
            this.lightingFactorProperty = lightingFactor;
            this.notifyPropertyChanged(Constants_1.PROPERTY.LIGHTING_FACTOR);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SurfaceMeshRenderableSeries3D.prototype, "contourStrokeThickness", {
        /**
         * Gets or sets the stroke thickness of contour lines on the {@link SurfaceMeshRenderableSeries3D}
         */
        get: function () {
            return this.contourStrokeThicknessProperty;
        },
        /**
         * Gets or sets the stroke thickness of contour lines on the {@link SurfaceMeshRenderableSeries3D}
         */
        set: function (contourStrokeThickness) {
            this.contourStrokeThicknessProperty = contourStrokeThickness;
            this.notifyPropertyChanged(Constants_1.PROPERTY.CONTOUR_STROKE_THICKNESS);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SurfaceMeshRenderableSeries3D.prototype, "contourInterval", {
        /**
         * Gets or sets the contour interval, a value for the spacing between contour lines.
         * @description For example, if you have data in the {@link SurfaceMeshRenderableSeries3D.dataSeries} ranging from 0-100.0, and you
         * want to display contour lines every 1/10th then set {@link SurfaceMeshRenderableSeries3D.contourInterval} = 10
         * @remarks Defaults to 20, but must be set according to your data in the {@link SurfaceMeshRenderableSeries3D.dataSeries}
         */
        get: function () {
            return this.contourIntervalProperty;
        },
        /**
         * Gets or sets the contour interval, a value for the spacing between contour lines.
         * @description For example, if you have data in the {@link SurfaceMeshRenderableSeries3D.dataSeries} ranging from 0-100.0, and you
         * want to display contour lines every 1/10th then set {@link SurfaceMeshRenderableSeries3D.contourInterval} = 10
         * @remarks Defaults to 20, but must be set according to your data in the {@link SurfaceMeshRenderableSeries3D.dataSeries}
         */
        set: function (contourInterval) {
            this.contourIntervalProperty = contourInterval;
            this.notifyPropertyChanged(Constants_1.PROPERTY.CONTOUR_INTERVAL);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SurfaceMeshRenderableSeries3D.prototype, "contourOffset", {
        /**
         * Gets or sets the contour offset, a value for the offsetting contour lines
         * @description For example, if you have data in the {@link SurfaceMeshRenderableSeries3D.dataSeries} ranging from 0-100.0, and you
         * want to display the first contour line at value = 5, then set {@link SurfaceMeshRenderableSeries3D.contourOffset} = 5
         * @remarks Defaults to 0.1, but must be set according to your data in the {@link SurfaceMeshRenderableSeries3D.dataSeries}
         */
        get: function () {
            return this.contourOffsetProperty;
        },
        /**
         * Gets or sets the contour offset, a value for the offsetting contour lines
         * @description For example, if you have data in the {@link SurfaceMeshRenderableSeries3D.dataSeries} ranging from 0-100.0, and you
         * want to display the first contour line at value = 5, then set {@link SurfaceMeshRenderableSeries3D.contourOffset} = 5
         * @remarks Defaults to 0.1, but must be set according to your data in the {@link SurfaceMeshRenderableSeries3D.dataSeries}
         */
        set: function (contourOffset) {
            this.contourOffsetProperty = contourOffset;
            this.notifyPropertyChanged(Constants_1.PROPERTY.CONTOUR_OFFSET);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SurfaceMeshRenderableSeries3D.prototype, "contourStroke", {
        /**
         * Gets or sets the contour stroke as an HTML Color Code
         */
        get: function () {
            return this.contourStrokeProperty;
        },
        /**
         * Gets or sets the contour stroke as an HTML Color Code
         */
        set: function (contourStroke) {
            this.contourStrokeProperty = contourStroke;
            this.notifyPropertyChanged(Constants_1.PROPERTY.CONTOUR_STROKE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SurfaceMeshRenderableSeries3D.prototype, "highlight", {
        /**
         * Gets or sets the highlight factor, a number used to calculate lighting effects.
         * @remarks Defaults to 0.05
         */
        get: function () {
            return this.highlightProperty;
        },
        /**
         * Gets or sets the highlight factor, a number used to calculate lighting effects.
         * @remarks Defaults to 0.05
         */
        set: function (highlight) {
            this.highlightProperty = highlight;
            this.notifyPropertyChanged(Constants_1.PROPERTY.HIGHLIGHT);
        },
        enumerable: false,
        configurable: true
    });
    return SurfaceMeshRenderableSeries3D;
}(BaseRenderableSeries3D_1.BaseRenderableSeries3D));
exports.SurfaceMeshRenderableSeries3D = SurfaceMeshRenderableSeries3D;
