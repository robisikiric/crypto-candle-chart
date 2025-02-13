import { Rect } from "../../../../Core/Rect";
import { TGradientStop } from "../../../../types/TGradientStop";
import { TSciChart, UIntVector } from "../../../../types/TSciChart";
import { TextureCache } from "../../../Drawing/TextureCache";
export interface IGetColorDataParams {
    xStartInd: number;
    textureWidth: number;
    xInc: number;
    yStartInd: number;
    textureHeight: number;
    yInc: number;
    zValues: number[][];
    webAssemblyContext: TSciChart;
    colorMap: number[];
    opacity: number;
    horCellCount: number;
    vertCellCount: number;
    horCellOffsets: number[];
    vertCellOffsets: number[];
    colorMin: number;
    colorMax: number;
    arrayWidth: number;
    arrayHeight: number;
    fillValuesOutOfRange: boolean;
    useInterpolation: boolean;
}
export declare const getColorDataForTexture: (params: IGetColorDataParams, _colorData: UIntVector, precision: number) => UIntVector;
export declare const getColor: (yIndex: number, xIndex: number, colorPalette: number[], opacity: number, zValues: number[][], webAssemblyContext: TSciChart, colorMin: number, colorMax: number, arrayWidth: number, arrayHeight: number, fillValuesOutOfRange: boolean, precision: number) => number;
/** @ignore */
export declare const getCellColor: (value: number, _colorMap: number[], colorMin: number, colorMax: number, fillValuesOutOfRange: boolean, webAssemblyContext: TSciChart, precision: number) => number;
export declare const createColorMap: (originalGradientStops: TGradientStop[], precision: number) => any[];
export declare const calculateOffsets: (heatmapRect: Rect, isVerticalChart: boolean, xCellSizes: number[], yCellSizes: number[], horStartInd: number, horCellCount: number, horInc: number, vertStartInd: number, vertCellCount: number, vertInc: number, seriesViewRect: Rect) => {
    horCellOffsets: any[];
    vertCellOffsets: any[];
};
/**
 * Calculates absolute coordinates of the heatmap cells
 * @param inputArr relative cell sizes
 * @param dimension texture size
 * @param startInd
 * @param count
 * @param inc
 * @param offset
 * @returns
 */
export declare const calculateCellCoordinates: (inputArr: number[], dimension: number, startInd: number, count: number, inc: number, offset: number) => any[];
export declare const calculateHeatmapTexture: (colorDataParams: IGetColorDataParams, intVector: UIntVector, heatTextureCache: TextureCache, precision: number) => import("../../../../types/TSciChart").TSRTexture;
