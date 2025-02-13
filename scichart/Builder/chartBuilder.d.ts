import { SciChartPieSurface } from "../Charting/Visuals/SciChartPieSurface/SciChartPieSurface";
import { SciChartSurface, TWebAssemblyChart } from "../Charting/Visuals/SciChartSurface";
import { SciChartSurfaceBase } from "../Charting/Visuals/SciChartSurfaceBase";
import { ESciChartSurfaceType } from "../types/SciChartSurfaceType";
import { TSciChart } from "../types/TSciChart";
import { TSciChart3D } from "../types/TSciChart3D";
import { ISciChart2DDefinition, ISciChartPieDefinition } from "./buildSurface";
export declare type TSurfaceDefinition = ISciChart2DDefinition | {
    type?: ESciChartSurfaceType.Default2D;
    options?: ISciChart2DDefinition;
} | {
    type?: ESciChartSurfaceType.Pie2D;
    options?: ISciChartPieDefinition;
};
/**
 * The reviver function needed when parsing definitions to JSON
 */
export declare function chartReviver(key: string, value: any): any;
/**
 * Builds an entire chart from a definition that can be pure data.
 * @param divElementId The Div Element ID where the {@link SciChartSurface} will reside
 * @param definition a {@link TSurfaceDefinition } or a string which will be parsed to it.
 * @returns
 */
export declare const buildChart: (divElementId: string | HTMLDivElement, definition: string | TSurfaceDefinition) => Promise<TWebAssemblyChart | SciChartPieSurface>;
/**
 * Configures an existing surface using a definition.
 * This is useful if you need to use the wasmContext in methods or classes you use in your definition
 * @param sciChartSurface
 * @param wasmContext The webassemply context.  Pass undefined for a pie surface.
 * @param definition
 */
export declare const configureChart: (sciChartSurface: SciChartSurfaceBase, wasmContext: TSciChart, definition: string | TSurfaceDefinition) => void;
/**
 * This is just something to call to ensure that all the registrations are run before a surface is created
 */
export declare const ensureRegistrations: () => void;
export declare const chartBuilder: {
    /** @inheritdoc */
    buildChart: (divElementId: string | HTMLDivElement, definition: string | TSurfaceDefinition) => Promise<TWebAssemblyChart | SciChartPieSurface>;
    /** @inheritdoc */
    chartReviver: typeof chartReviver;
    /** @inheritdoc */
    build2DChart: (divElementId: string | HTMLDivElement, definition: string | ISciChart2DDefinition) => Promise<{
        wasmContext: TSciChart;
        sciChartSurface: SciChartSurface;
    }>;
    /** @inheritdoc */
    buildPieChart: (divElementId: string | HTMLDivElement, definition: string | ISciChartPieDefinition) => Promise<SciChartPieSurface>;
    /** @inheritdoc */
    configureChart: (sciChartSurface: SciChartSurfaceBase, wasmContext: TSciChart, definition: string | TSurfaceDefinition) => void;
    /** @inheritdoc */
    buildSeries: (wasmContext: TSciChart, definition: import("./buildSeries").TSeriesDefinition | import("./buildSeries").TSeriesDefinition[], sharedData?: import("./buildDataSeries").TSharedDataDefinition) => import("..").IRenderableSeries[];
    /** @inheritdoc */
    buildDataSeries: (wasmContext: TSciChart, dataSeriesDefinition: import("./buildDataSeries").TDataSeriesDefinition, sharedData?: import("./buildDataSeries").TSharedDataDefinition, originalDataSeries?: import("..").IDataSeries) => import("..").IDataSeries;
    /** @inheritdoc */
    buildModifiers: (definition: import("./buildModifiers").TModifierDefinition | import("./buildModifiers").TModifierDefinition[]) => import("..").ChartModifierBase2D[];
    /** @inheritdoc */
    buildAxes: (wasmContext: TSciChart, definition: import("./buildAxis").TAxisDefinition | import("./buildAxis").TAxisDefinition[]) => import("..").AxisBase2D[];
    /** @inheritdoc */
    buildAnnotations: (definition: import("./buildAnnotations").TAnnotationDefinition | import("./buildAnnotations").TAnnotationDefinition[]) => any[];
    /** @inheritdoc */
    registerType: <T extends object>(baseType: import("..").EBaseType, type: string, constructor: (options?: any) => T, overWrite?: boolean) => void;
    /** @inheritdoc */
    registerWasmType: <T_1 extends object>(baseType: import("..").EBaseType, type: string, constructor: (wasmContext: TSciChart | TSciChart3D, options?: any) => T_1, overWrite?: boolean) => void;
    /** @inheritdoc */
    registerFunction: <T_2 extends Function>(baseType: import("..").EBaseType, type: string, constructor: T_2, overWrite?: boolean) => void;
};
