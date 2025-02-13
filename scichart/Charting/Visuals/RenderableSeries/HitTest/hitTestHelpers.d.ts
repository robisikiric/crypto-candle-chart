import { SCRTDoubleVector, TSciChart } from "../../../../types/TSciChart";
import { BaseDataSeries } from "../../../Model/BaseDataSeries";
import { IDataSeries } from "../../../Model/IDataSeries";
import { NonUniformHeatmapDataSeries } from "../../../Model/NonUniformHeatmapDataSeries";
import { OhlcDataSeries } from "../../../Model/OhlcDataSeries";
import { UniformHeatmapDataSeries } from "../../../Model/UniformHeatmapDataSeries";
import { XyDataSeries } from "../../../Model/XyDataSeries";
import { XyyDataSeries } from "../../../Model/XyyDataSeries";
import { CoordinateCalculatorBase } from "../../../Numerics/CoordinateCalculators/CoordinateCalculatorBase";
import { BaseOhlcRenderableSeries } from "../BaseOhlcRenderableSeries";
import { FastColumnRenderableSeries } from "../FastColumnRenderableSeries";
import { FastErrorBarsRenderableSeries } from "../FastErrorBarsRenderableSeries";
import { FastImpulseRenderableSeries } from "../FastImpulseRenderableSeries";
import { IRenderableSeries } from "../IRenderableSeries";
import { HitTestInfo } from "./HitTestInfo";
export declare const hitTestHelpers: {
    createHitTestInfo: (renderableSeries: IRenderableSeries, xCoordinateCalculator: CoordinateCalculatorBase, yCoordinateCalculator: CoordinateCalculatorBase, isVerticalChart: boolean, dataSeries: BaseDataSeries, xNativeValues: SCRTDoubleVector, yNativeValues: SCRTDoubleVector, xHitCoord: number, yHitCoord: number, nearestPointIndex: number, hitTestRadius: number, distance?: number) => HitTestInfo;
    getNearestPoint: (webassemblyContext: TSciChart, xCoordinateCalculator: CoordinateCalculatorBase, yCoordinateCalculator: CoordinateCalculatorBase, xValues: SCRTDoubleVector, yValues: SCRTDoubleVector, isSorted: boolean, xHitCoord: number, yHitCoord: number, hitTestRadius: number) => {
        nearestPointIndex: number;
        distance: number;
    };
    getNearestXPoint: (webAssemblyContext: TSciChart, xCoordinateCalculator: CoordinateCalculatorBase, dataSeries: IDataSeries, xHitCoord: number, isSorted: boolean) => number;
    getNearestXyPoint: (webassemblyContext: TSciChart, xCoordinateCalculator: CoordinateCalculatorBase, yCoordinateCalculator: CoordinateCalculatorBase, dataSeries: IDataSeries, xHitCoord: number, yHitCoord: number, hitTestRadius: number) => {
        nearestPointIndex: number;
        distance: number;
    };
    getNearestXyyPoint: (webassemblyContext: TSciChart, xCoordinateCalculator: CoordinateCalculatorBase, yCoordinateCalculator: CoordinateCalculatorBase, dataSeries: XyyDataSeries, xHitCoord: number, yHitCoord: number, hitTestRadius: number) => {
        nearestPointIndex: number;
        distance: number;
    };
    getNearestUniformHeatmapPoint: (xCoordinateCalculator: CoordinateCalculatorBase, yCoordinateCalculator: CoordinateCalculatorBase, heatmapDataSeries: UniformHeatmapDataSeries, xHitCoord: number, yHitCoord: number) => {
        xIndex: number;
        yIndex: number;
        zValue: number;
    };
    getNearestNonUniformHeatmapPoint: (xCoordinateCalculator: CoordinateCalculatorBase, yCoordinateCalculator: CoordinateCalculatorBase, heatmapDataSeries: NonUniformHeatmapDataSeries, xHitCoord: number, yHitCoord: number) => {
        xIndex: number;
        yIndex: number;
        zValue: number;
    };
    testIsHitForPoint: (xCoordinateCalculator: CoordinateCalculatorBase, yCoordinateCalculator: CoordinateCalculatorBase, xValues: SCRTDoubleVector, yValues: SCRTDoubleVector, pointIndex: number, xHitCoord: number, yHitCoord: number, hitTestRadius: number, dataSeries: BaseDataSeries) => boolean;
    testIsHitForLine: (xCoordinateCalculator: CoordinateCalculatorBase, yCoordinateCalculator: CoordinateCalculatorBase, xValues: SCRTDoubleVector, yValues: SCRTDoubleVector, pointIndex: number, xHitCoord: number, yHitCoord: number, hitTestRadius: number, dataSeries: BaseDataSeries) => {
        isHit: boolean;
        secondPointIndex: number;
    };
    testIsHitForBand: (isDigitalLine: boolean, xCoordinateCalculator: CoordinateCalculatorBase, yCoordinateCalculator: CoordinateCalculatorBase, xValues: SCRTDoubleVector, getYValue: (index: number) => number, getY1Value: (index: number) => number, pointIndex: number, xHitCoord: number, yHitCoord: number, dataSeries: BaseDataSeries) => {
        isHit: boolean;
        secondPointIndex: number;
    };
    testIsHitForColumn: (xCoordinateCalculator: CoordinateCalculatorBase, yCoordinateCalculator: CoordinateCalculatorBase, renderableSeries: FastColumnRenderableSeries, xValues: SCRTDoubleVector, yValues: SCRTDoubleVector, pointIndex: number, xHitCoord: number, yHitCoord: number) => boolean;
    testIsHitForOHLC: (xCoordinateCalculator: CoordinateCalculatorBase, yCoordinateCalculator: CoordinateCalculatorBase, renderableSeries: FastColumnRenderableSeries | BaseOhlcRenderableSeries, dataSeries: OhlcDataSeries, pointIndex: number, xHitCoord: number, yHitCoord: number, hitTestRadius: number) => {
        isHit: boolean;
        openValue: number;
        highValue: number;
        lowValue: number;
        closeValue: number;
    };
    testIsHitForMountain: (isDigitalLine: boolean, xCoordinateCalculator: CoordinateCalculatorBase, yCoordinateCalculator: CoordinateCalculatorBase, dataSeries: XyDataSeries, zeroLineY: number, pointIndex: number, xHitCoord: number, yHitCoord: number) => {
        isHit: boolean;
        secondPointIndex: number;
    };
    testIsHitForErrorBars: (xCoordinateCalculator: CoordinateCalculatorBase, yCoordinateCalculator: CoordinateCalculatorBase, renderableSeries: FastErrorBarsRenderableSeries, xValues: SCRTDoubleVector, yValues: SCRTDoubleVector, pointIndex: number, xHitCoord: number, yHitCoord: number) => {
        isHit: boolean;
        highValue: number;
        lowValue: number;
    };
    testIsHitForImpulse: (xCoordinateCalculator: CoordinateCalculatorBase, yCoordinateCalculator: CoordinateCalculatorBase, renderableSeries: FastImpulseRenderableSeries, xValues: SCRTDoubleVector, yValues: SCRTDoubleVector, pointIndex: number, xHitCoord: number, yHitCoord: number, hitTestRadius: number) => boolean;
};
