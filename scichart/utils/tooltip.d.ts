import { TTooltipProps } from "../Charting/ChartModifiers/RolloverModifier";
import { Rect } from "../Core/Rect";
export declare enum ESize {
    width = "width",
    height = "height"
}
export declare enum ECoord {
    xCoord = "xCoord",
    yCoord = "yCoord"
}
export declare enum EShift {
    xCoordShift = "xCoordShift",
    yCoordShift = "yCoordShift"
}
declare type TSize = ESize.width | ESize.height;
declare type TCoord = ECoord.xCoord | ECoord.yCoord;
declare type TShift = EShift.xCoordShift | EShift.yCoordShift;
export declare type TPositionPoperties = {
    sizePropertyName: TSize;
    coordPropertyName: TCoord;
    shiftPropertyName: TShift;
};
/** @ignore */
export declare const spreadTooltips: (tooltipArray: TTooltipProps[], pixelRatio: number, positionProperties: TPositionPoperties, spacing: number, seriesViewRect: Rect) => Map<number, number>;
/** @ignore */
export declare const checkHasOverlap: (tooltipArray: TTooltipProps[], spacing: number, pixelRatio: number, positionProperties: TPositionPoperties) => boolean;
/** @ignore */
export declare const getTotalSize: (tooltipArray: TTooltipProps[], sizePropertyName: TSize) => number;
/** @ignore */
export declare const getTotalSpacing: (tooltipArray: TTooltipProps[], spacing: number) => number;
/** @ignore */
export declare const getStartPoint: (coord: number, shift: number, pixelRatio: number) => number;
/** @ignore */
export declare const getEndPoint: (coord: number, shift: number, pixelRatio: number, size: number) => number;
/** @ignore */
export declare const getUpdatedPoints: (startPoint: number, endPoint: number, totalBoxModel: number, size: number) => {
    start: number;
    end: number;
};
/** @ignore */
export declare const getTooltipPositionProperties: (isVerticalChart: boolean) => TPositionPoperties;
export {};
