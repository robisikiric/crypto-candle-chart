import { Rect } from "../../Core/Rect";
import { TBorder } from "../../types/TBorder";
import { CoordinateCalculatorBase } from "../Numerics/CoordinateCalculators/CoordinateCalculatorBase";
import { AxisBase2D } from "../Visuals/Axis/AxisBase2D";
import { AxisLayoutState } from "../Visuals/Axis/AxisLayoutState";
import { ChartLayoutState } from "./ChartLayoutState";
import { EInnerAxisPlacementCoordinateMode } from "./EInnerAxisPlacementCoordinateMode";
export declare type TAxisViewRects = {
    axisRendererViewRect: Rect;
    axisTitleRendererViewRect: Rect;
};
export declare type TLayoutAxisPartsWithStrategyFunc = (axisRendererWidth: number, axisRendererHeight: number, axisTitleRendererWidth: number, axisTitleRendererHeight: number, axisRect: Rect, border: TBorder) => TAxisViewRects;
export declare function updateAxisLayoutState(axis: AxisBase2D): void;
export declare function layoutAxisParts(axis: AxisBase2D, layoutFunc: TLayoutAxisPartsWithStrategyFunc): void;
export declare function layoutAxisPartsLeftStrategy(axisRendererWidth: number, axisRendererHeight: number, axisTitleRendererWidth: number, axisTitleRendererHeight: number, containerBounds: Rect): TAxisViewRects;
export declare function layoutAxisPartsRightStrategy(axisRendererWidth: number, axisRendererHeight: number, axisTitleRendererWidth: number, axisTitleRendererHeight: number, containerBounds: Rect): TAxisViewRects;
export declare function layoutAxisPartsTopStrategy(axisRendererWidth: number, axisRendererHeight: number, axisTitleRendererWidth: number, axisTitleRendererHeight: number, containerBounds: Rect): TAxisViewRects;
export declare function layoutAxisPartsBottomStrategy(axisRendererWidth: number, axisRendererHeight: number, axisTitleRendererWidth: number, axisTitleRendererHeight: number, containerBounds: Rect): TAxisViewRects;
export declare function getHorizontalAxisRequiredSize(axisLayoutState: AxisLayoutState): number;
export declare function getVerticalAxisRequiredSize(axisLayoutState: AxisLayoutState): number;
export declare function updateLeftAndRightChartLayoutState(chartLayoutState: ChartLayoutState, additionalLeftSize?: number, additionalRightSize?: number): void;
export declare function updateTopAndBottomChartLayoutState(chartLayoutState: ChartLayoutState, additionalTopSize?: number, additionalBottomSize?: number): void;
/**
 * Converts a pixel coordinate back to a value
 * @param value - coordinate or dataValue to convert
 * @param calculator the {@link CoordinateCalculatorBase} which will do the transformation
 * @param coordinateMode the {@link ECoordinateMode} to apply
 * @returns the data-value or value
 */
export declare const getValueWithCoordinateMode: (value: number, calculator: CoordinateCalculatorBase, coordinateMode: EInnerAxisPlacementCoordinateMode) => number;
/**
 * Converts a value into a pixel coordinate accordingly to the coordinate mode
 * @param value - the value to convert
 * @param calculator the {@link CoordinateCalculatorBase} which will do the transformation
 * @param coordinateMode the {@link ECoordinateMode} to apply
 * @returns the pixel coordinate
 */
export declare const getCoordinateWithCoordinateMode: (value: number, calculator: CoordinateCalculatorBase, coordinateMode: EInnerAxisPlacementCoordinateMode) => number;
export declare const testLayoutManager: {
    updateAxisLayoutState: typeof updateAxisLayoutState;
    layoutAxisPartsLeftStrategy: typeof layoutAxisPartsLeftStrategy;
    layoutAxisPartsRightStrategy: typeof layoutAxisPartsRightStrategy;
    layoutAxisPartsTopStrategy: typeof layoutAxisPartsTopStrategy;
    layoutAxisPartsBottomStrategy: typeof layoutAxisPartsBottomStrategy;
};
