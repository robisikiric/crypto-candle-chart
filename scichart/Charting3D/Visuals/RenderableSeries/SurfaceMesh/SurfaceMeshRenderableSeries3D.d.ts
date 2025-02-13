import { Size } from "../../../../types/Size";
import { TSciChart3D } from "../../../../types/TSciChart3D";
import { BaseRenderableSeries3D, IBaseRenderableSeries3DOptions } from "../BaseRenderableSeries3D";
import { ESeriesType3D } from "../ESeriesType";
import { MeshColorPalette } from "./MeshColorPalette";
/**
 * Options passed to a {@link SurfaceMeshRenderableSeries3D} constructor
 */
export interface ISurfaceMeshRenderableSeries3DOptions extends IBaseRenderableSeries3DOptions {
    /**
     * Gets or sets the Colormap texture size.
     * @remarks This defaults to [1024,1] and simply sets the resolution of color mapping. Leave default in normal operation
     */
    colorMapTextureSize?: Size;
    /**
     * Gets or sets the {@link EMeshResolution}, the amount of oversampling when creating a mesh.
     * @remarks Defaults to 1x.
     */
    meshResolution?: EMeshResolution;
    /**
     * Gets or sets the stroke thickness of mesh wireframe lines on the {@link SurfaceMeshRenderableSeries3D}
     */
    strokeThickness?: number;
    /**
     * Gets or sets the stroke thickness of contour lines on the {@link SurfaceMeshRenderableSeries3D}
     */
    contourStrokeThickness?: number;
    /**
     * Gets or sets the {@link EMeshPaletteMode}, which defines how heightmaps are treated.
     * @remarks Defaults to HEIGHT_MAP_INTERPOLATED
     */
    meshPaletteMode?: EMeshPaletteMode;
    /**
     * Gets or sets the height scale factor for the {@link SurfaceMeshRenderableSeries3D}.
     * @remarks Default value is 1. A height scale factor of 0 makes the mesh flat, and 0.5 means all heights are multiplied by 0.5 etc...
     */
    heightScaleFactor?: number;
    /**
     * Gets or sets the contour stroke as an HTML Color Code
     */
    contourStroke?: string;
    /**
     * Gets or sets the {@link EDrawMeshAs}, whether the mesh is drawn as wireframe, solid, with or without contours etc...
     * @remarks Default value is SOLID_WIREFRAME. For contours, choose SOLID_WITH_CONTOURS
     */
    drawMeshAs?: EDrawMeshAs;
    /**
     * When true, draws a skirt from the edge of the mesh to zero (solid walls on the left, right, top, bottom side)
     */
    drawSkirt?: boolean;
    /**
     * Gets or sets the {@link MeshColorPalette}, which defines how values in the {@link SurfaceMeshRenderableSeries3D.dataSeries} map to colours
     * @remarks See concrete types {@link SolidColorBrushPalette} and {@link GradientColorPalette} plus our examples for more information.
     */
    meshColorPalette?: MeshColorPalette;
    /**
     * Gets or sets the minimum value in the {@link SurfaceMeshRenderableSeries3D.dataSeries} that we want to map to colours in the
     * {@link SurfaceMeshRenderableSeries3D.meshColorPalette}
     * @remarks For example, if data contains values 0..100, and the meshColorPalette is a {@link GradientColorPalette} from red to blue, and you want
     * 0=red and blue=100 then you should set {@link SurfaceMeshRenderableSeries3D.minimum} = 0 and {@link SurfaceMeshRenderableSeries3D.maximum} = 1
     */
    minimum?: number;
    /**
     * Gets or sets the maximum value in the {@link SurfaceMeshRenderableSeries3D.dataSeries} that we want to map to colours in the
     * {@link SurfaceMeshRenderableSeries3D.meshColorPalette}
     * @remarks For example, if data contains values 0..100, and the meshColorPalette is a {@link GradientColorPalette} from red to blue, and you want
     * 0=red and blue=100 then you should set {@link SurfaceMeshRenderableSeries3D.minimum} = 0 and {@link SurfaceMeshRenderableSeries3D.maximum} = 1
     */
    maximum?: number;
    /**
     * Gets or sets a Y-offset or height-offset in world coordinates.
     * @remarks Defaults to 0. When setting to a value such as 10, the entire {@link SurfaceMeshRenderableSeries3D} will be offset to height=10
     */
    yOffset?: number;
    /**
     * Gets or sets the cell hardness factor, a number used to calculate lighting effects.
     * @remarks Defaults to 1
     */
    cellHardnessFactor?: number;
    /**
     * Gets or sets the lighting factor, a number used to calculate lighting effects.
     * @remarks Defaults to 0.8
     */
    lightingFactor?: number;
    /**
     * Gets or sets the contour interval, a value for the spacing between contour lines.
     * @description For example, if you have data in the {@link SurfaceMeshRenderableSeries3D.dataSeries} ranging from 0-100.0, and you
     * want to display contour lines every 1/10th then set {@link SurfaceMeshRenderableSeries3D.contourInterval} = 10
     * @remarks Defaults to 20, but must be set according to your data in the {@link SurfaceMeshRenderableSeries3D.dataSeries}
     */
    contourInterval?: number;
    /**
     * Gets or sets the contour offset, a value for the offsetting contour lines
     * @description For example, if you have data in the {@link SurfaceMeshRenderableSeries3D.dataSeries} ranging from 0-100.0, and you
     * want to display the first contour line at value = 5, then set {@link SurfaceMeshRenderableSeries3D.contourOffset} = 5
     * @remarks Defaults to 0.1, but must be set according to your data in the {@link SurfaceMeshRenderableSeries3D.dataSeries}
     */
    contourOffset?: number;
    /**
     * Gets or sets the highlight factor, a number used to calculate lighting effects.
     * @remarks Defaults to 0.05
     */
    highlight?: number;
}
/**
 * Enumeration constants which define how a {@link SurfaceMeshRenderableSeries3D | Surface Mesh Plot} is drawn
 */
export declare enum EDrawMeshAs {
    /**
     * Draws the SurfaceMesh as wireframe only
     */
    WIREFRAME = "WIREFRAME",
    /**
     * Draws the SurfaceMesh as a solid shape with wireframe
     */
    SOLID_WIREFRAME = "SOLID_WIREFRAME",
    /**
     * Draws the SurfaceMesh as a solid shape with wireframe and contours
     */
    SOLID_WIREFRAME_WITH_CONTOURS = "SOLID_WIREFRAME_WITH_CONTOURS",
    /**
     * Draws the SurfaceMesh as a solid shape only
     */
    SOLID_MESH = "SOLID_MESH",
    /**
     * Draws the SurfaceMesh as a solid shape with contours
     */
    SOLID_WITH_CONTOURS = "SOLID_WITH_CONTOURS",
    /**
     * Draws the SurfaceMesh as contours only
     */
    CONTOURS = "CONTOURS"
}
/**
 * Enumeration constants which define a {@link SurfaceMeshRenderableSeries3D | Surface Mesh Plot} mesh palette mode
 */
export declare enum EMeshPaletteMode {
    /**
     * The Height Map is linear interpolated
     */
    HEIGHT_MAP_INTERPOLATED = "HEIGHT_MAP_INTERPOLATED",
    /**
     * The Height Map has steps between cells
     */
    HEIGHT_MAP_SOLID_CELLS = "HEIGHT_MAP_SOLID_CELLS",
    /**
     * The Height Map is ignored and applied as a texture instead
     */
    TEXTURED_SOLID_CELLS = "TEXTURED_SOLID_CELLS"
}
/**
 * Enumeration constants which define a {@link SurfaceMeshRenderableSeries3D | Surface Mesh Plot} mesh resolution
 */
export declare enum EMeshResolution {
    /**
     * Mesh resolution is 1:1 between data cells and mesh cells
     */
    MESH_RESOLUTION_X1 = 1,
    /**
     * Twice the number of mesh cells for each data-cell
     */
    MESH_RESOLUTION_X2 = 2,
    /**
     * 4x the number of mesh cells for each data-cell
     */
    MESH_RESOLUTION_X4 = 4
}
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
export declare class SurfaceMeshRenderableSeries3D extends BaseRenderableSeries3D {
    private drawMeshAsProperty;
    private strokeThicknessProperty;
    private drawSkirtProperty;
    private meshColorPaletteProperty;
    private minimumProperty;
    private maximumProperty;
    private meshPaletteModeProperty;
    private heightScaleFactorProperty;
    private meshResolutionProperty;
    private yOffsetProperty;
    private cellHardnessFactorProperty;
    private lightingFactorProperty;
    private contourStrokeThicknessProperty;
    private contourIntervalProperty;
    private contourOffsetProperty;
    private highlightProperty;
    private contourStrokeProperty;
    private colorMapTextureSizeProperty;
    /**
     * Creates an instance of a {@link SurfaceMeshRenderableSeries3D}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context}
     * containing native methods and access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options
     */
    constructor(webAssemblyContext: TSciChart3D, options?: ISurfaceMeshRenderableSeries3DOptions);
    /**
     * @inheritDoc
     */
    get type(): ESeriesType3D;
    /**
     * Gets or sets the Colormap texture size.
     * @remarks This defaults to [1024,1] and simply sets the resolution of color mapping. Leave default in normal operation
     */
    get colorMapTextureSize(): Size;
    /**
     * Gets or sets the Colormap texture size.
     * @remarks This defaults to [1024,1] and simply sets the resolution of color mapping. Leave default in normal operation
     */
    set colorMapTextureSize(colorMapTextureSize: Size);
    /**
     * Gets or sets the {@link EDrawMeshAs}, whether the mesh is drawn as wireframe, solid, with or without contours etc...
     * @remarks Default value is SOLID_WIREFRAME. For contours, choose SOLID_WITH_CONTOURS
     */
    get drawMeshAs(): EDrawMeshAs;
    /**
     * Gets or sets the {@link EDrawMeshAs}, whether the mesh is drawn as wireframe, solid, with or without contours etc...
     * @remarks Default value is SOLID_WIREFRAME. For contours, choose SOLID_WITH_CONTOURS
     */
    set drawMeshAs(drawMeshAs: EDrawMeshAs);
    /**
     * Gets or sets the stroke thickness of mesh wireframe lines on the {@link SurfaceMeshRenderableSeries3D}
     */
    get strokeThickness(): number;
    /**
     * Gets or sets the stroke thickness of mesh wireframe lines on the {@link SurfaceMeshRenderableSeries3D}
     */
    set strokeThickness(strokeThickness: number);
    /**
     * When true, draws a skirt from the edge of the mesh to zero (solid walls on the left, right, top, bottom side)
     */
    get drawSkirt(): boolean;
    /**
     * When true, draws a skirt from the edge of the mesh to zero (solid walls on the left, right, top, bottom side)
     */
    set drawSkirt(drawSkirt: boolean);
    /**
     * Gets or sets the {@link MeshColorPalette}, which defines how values in the {@link SurfaceMeshRenderableSeries3D.dataSeries} map to colours
     * @remarks See concrete types {@link SolidColorBrushPalette} and {@link GradientColorPalette} plus our examples for more information.
     */
    get meshColorPalette(): MeshColorPalette;
    /**
     * Gets or sets the {@link MeshColorPalette}, which defines how values in the {@link SurfaceMeshRenderableSeries3D.dataSeries} map to colours
     * @remarks See concrete types {@link SolidColorBrushPalette} and {@link GradientColorPalette} plus our examples for more information.
     */
    set meshColorPalette(meshColorPalette: MeshColorPalette);
    /**
     * Gets or sets the minimum value in the {@link SurfaceMeshRenderableSeries3D.dataSeries} that we want to map to colours in the
     * {@link SurfaceMeshRenderableSeries3D.meshColorPalette}
     * @remarks For example, if data contains values 0..100, and the meshColorPalette is a {@link GradientColorPalette} from red to blue, and you want
     * 0=red and blue=100 then you should set {@link SurfaceMeshRenderableSeries3D.minimum} = 0 and {@link SurfaceMeshRenderableSeries3D.maximum} = 1
     */
    get minimum(): number;
    /**
     * Gets or sets the minimum value in the {@link SurfaceMeshRenderableSeries3D.dataSeries} that we want to map to colours in the
     * {@link SurfaceMeshRenderableSeries3D.meshColorPalette}
     * @remarks For example, if data contains values 0..100, and the meshColorPalette is a {@link GradientColorPalette} from red to blue, and you want
     * 0=red and blue=100 then you should set {@link SurfaceMeshRenderableSeries3D.minimum} = 0 and {@link SurfaceMeshRenderableSeries3D.maximum} = 1
     */
    set minimum(minimum: number);
    /**
     * Gets or sets the maximum value in the {@link SurfaceMeshRenderableSeries3D.dataSeries} that we want to map to colours in the
     * {@link SurfaceMeshRenderableSeries3D.meshColorPalette}
     * @remarks For example, if data contains values 0..100, and the meshColorPalette is a {@link GradientColorPalette} from red to blue, and you want
     * 0=red and blue=100 then you should set {@link SurfaceMeshRenderableSeries3D.minimum} = 0 and {@link SurfaceMeshRenderableSeries3D.maximum} = 1
     */
    get maximum(): number;
    /**
     * Gets or sets the maximum value in the {@link SurfaceMeshRenderableSeries3D.dataSeries} that we want to map to colours in the
     * {@link SurfaceMeshRenderableSeries3D.meshColorPalette}
     * @remarks For example, if data contains values 0..100, and the meshColorPalette is a {@link GradientColorPalette} from red to blue, and you want
     * 0=red and blue=100 then you should set {@link SurfaceMeshRenderableSeries3D.minimum} = 0 and {@link SurfaceMeshRenderableSeries3D.maximum} = 1
     */
    set maximum(maximum: number);
    /**
     * Gets or sets the {@link EMeshPaletteMode}, which defines how heightmaps are treated.
     * @remarks Defaults to HEIGHT_MAP_INTERPOLATED
     */
    get meshPaletteMode(): EMeshPaletteMode;
    /**
     * Gets or sets the {@link EMeshPaletteMode}, which defines how heightmaps are treated.
     * @remarks Defaults to HEIGHT_MAP_INTERPOLATED
     */
    set meshPaletteMode(meshPaletteMode: EMeshPaletteMode);
    /**
     * Gets or sets the height scale factor for the {@link SurfaceMeshRenderableSeries3D}.
     * @remarks Default value is 1. A height scale factor of 0 makes the mesh flat, and 0.5 means all heights are multiplied by 0.5 etc...
     */
    get heightScaleFactor(): number;
    /**
     * Gets or sets the height scale factor for the {@link SurfaceMeshRenderableSeries3D}.
     * @remarks Default value is 1. A height scale factor of 0 makes the mesh flat, and 0.5 means all heights are multiplied by 0.5 etc...
     */
    set heightScaleFactor(heightScaleFactor: number);
    /**
     * Gets or sets the {@link EMeshResolution}, the amount of oversampling when creating a mesh.
     * @remarks Defaults to 1x.
     */
    get meshResolution(): EMeshResolution;
    /**
     * Gets or sets the {@link EMeshResolution}, the amount of oversampling when creating a mesh.
     * @remarks Defaults to 1x.
     */
    set meshResolution(meshResolution: EMeshResolution);
    /**
     * Gets or sets a Y-offset or height-offset in world coordinates.
     * @remarks Defaults to 0. When setting to a value such as 10, the entire {@link SurfaceMeshRenderableSeries3D} will be offset to height=10
     */
    get yOffset(): number;
    /**
     * Gets or sets a Y-offset or height-offset in world coordinates.
     * @remarks Defaults to 0. When setting to a value such as 10, the entire {@link SurfaceMeshRenderableSeries3D} will be offset to height=10
     */
    set yOffset(yOffset: number);
    /**
     * Gets or sets the cell hardness factor, a number used to calculate lighting effects.
     * @remarks Defaults to 1
     */
    get cellHardnessFactor(): number;
    /**
     * Gets or sets the cell hardness factor, a number used to calculate lighting effects.
     * @remarks Defaults to 1
     */
    set cellHardnessFactor(cellHardnessFactor: number);
    /**
     * Gets or sets the lighting factor, a number used to calculate lighting effects.
     * @remarks Defaults to 0.8
     */
    get lightingFactor(): number;
    /**
     * Gets or sets the lighting factor, a number used to calculate lighting effects.
     * @remarks Defaults to 0.8
     */
    set lightingFactor(lightingFactor: number);
    /**
     * Gets or sets the stroke thickness of contour lines on the {@link SurfaceMeshRenderableSeries3D}
     */
    get contourStrokeThickness(): number;
    /**
     * Gets or sets the stroke thickness of contour lines on the {@link SurfaceMeshRenderableSeries3D}
     */
    set contourStrokeThickness(contourStrokeThickness: number);
    /**
     * Gets or sets the contour interval, a value for the spacing between contour lines.
     * @description For example, if you have data in the {@link SurfaceMeshRenderableSeries3D.dataSeries} ranging from 0-100.0, and you
     * want to display contour lines every 1/10th then set {@link SurfaceMeshRenderableSeries3D.contourInterval} = 10
     * @remarks Defaults to 20, but must be set according to your data in the {@link SurfaceMeshRenderableSeries3D.dataSeries}
     */
    get contourInterval(): number;
    /**
     * Gets or sets the contour interval, a value for the spacing between contour lines.
     * @description For example, if you have data in the {@link SurfaceMeshRenderableSeries3D.dataSeries} ranging from 0-100.0, and you
     * want to display contour lines every 1/10th then set {@link SurfaceMeshRenderableSeries3D.contourInterval} = 10
     * @remarks Defaults to 20, but must be set according to your data in the {@link SurfaceMeshRenderableSeries3D.dataSeries}
     */
    set contourInterval(contourInterval: number);
    /**
     * Gets or sets the contour offset, a value for the offsetting contour lines
     * @description For example, if you have data in the {@link SurfaceMeshRenderableSeries3D.dataSeries} ranging from 0-100.0, and you
     * want to display the first contour line at value = 5, then set {@link SurfaceMeshRenderableSeries3D.contourOffset} = 5
     * @remarks Defaults to 0.1, but must be set according to your data in the {@link SurfaceMeshRenderableSeries3D.dataSeries}
     */
    get contourOffset(): number;
    /**
     * Gets or sets the contour offset, a value for the offsetting contour lines
     * @description For example, if you have data in the {@link SurfaceMeshRenderableSeries3D.dataSeries} ranging from 0-100.0, and you
     * want to display the first contour line at value = 5, then set {@link SurfaceMeshRenderableSeries3D.contourOffset} = 5
     * @remarks Defaults to 0.1, but must be set according to your data in the {@link SurfaceMeshRenderableSeries3D.dataSeries}
     */
    set contourOffset(contourOffset: number);
    /**
     * Gets or sets the contour stroke as an HTML Color Code
     */
    get contourStroke(): string;
    /**
     * Gets or sets the contour stroke as an HTML Color Code
     */
    set contourStroke(contourStroke: string);
    /**
     * Gets or sets the highlight factor, a number used to calculate lighting effects.
     * @remarks Defaults to 0.05
     */
    get highlight(): number;
    /**
     * Gets or sets the highlight factor, a number used to calculate lighting effects.
     * @remarks Defaults to 0.05
     */
    set highlight(highlight: number);
}
