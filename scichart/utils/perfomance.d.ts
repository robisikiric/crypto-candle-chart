/**
 * Performance debugging checkpoints enum
 */
export declare enum EPerformanceMarkType {
    /**
     * A surface creation start.
     * @remarks used internally
     */
    InitializationStart = "InitializationStart",
    /**
     * A surface creation end.
     * @remarks used internally
     */
    InitializationEnd = "InitializationEnd",
    /**
     * WASM engine fetching and initialization start.
     * @remarks used internally.
     */
    EngineInitStart = "EngineInitStart",
    /**
     * WASM engine fetching and initialization end.
     * @remarks used internally.
     */
    EngineInitEnd = "EngineInitEnd",
    /**
     * First surface invalidation in a sequence.
     *
     * @description
     * Surface invalidation is triggered implicitly on data or property changes.
     * Invalidating a surface means that it should rerender.
     * Multiple calls of {@link SciChartSurfaceBase.invalidateElement} are batched based on the timing.
     *
     * @remarks used internally
     */
    LeadingInvalidate = "LeadingInvalidate",
    /**
     * Subsequent surface invalidation.
     *
     * @description
     * The subsequent surface invalidation shouldn't affect rerender
     * since it is enough to have a single `invalidate` call ({@link LeadingInvalidate})
     * But it may be used to see the time and number of updates occurring.
     *
     * @remarks used internally.
     */
    Invalidate = "Invalidate",
    /**
     * DataSeries update start.
     * @description
     * Appending, inserting, removing data in DataSeries.
     * @remarks used internally.
     */
    DataUpdateStart = "DataUpdateStart",
    /**
     * DataSeries update end.
     * @remarks used internally.
     */
    DataUpdateEnd = "DataUpdateEnd",
    /**
     * Chart rendering start.
     * @remarks used internally.
     */
    RenderStart = "RenderStart",
    /**
     * Chart rendering end.
     * @remarks used internally.
     */
    RenderEnd = "RenderEnd",
    /**
     * Chart rendered.
     * @description
     * Represents a chart being rendered to an in between state that will be followed by another render.
     * (In some rare cases it could mean that the resulting image may be ito be incomplete incorrect, outdated,
     * or require another render iteration to make related calculations.)
     *
     * In this state the surface is invalidated, thus another render call is expected to follow.
     * @remarks used internally.
     */
    Rendered = "Rendered",
    /**
     * Chart rendered.
     * @description
     * Represents a chart being rendered to a complete state.
     * In this state the surface is NOT invalidated.
     * Next render will happen after invalidation is triggered.
     * @remarks used internally.
     */
    FullStateRendered = "FullStateRendered",
    /**
     * Chart element resizing.
     * @remarks used internally.
     */
    Resize = "Resize",
    /**
     * Browser zoom change.
     * @remarks used internally.
     */
    DpiChange = "DpiChange",
    /**
     * Chart initialization.
     * @remarks
     * used internally in `chartBuilder`.
     * Otherwise, it is supposed to be used explicitly after the surface is created.
     */
    SetupStart = "SetupStart",
    /**
     * Chart initialization.
     * @remarks
     * used internally in `chartBuilder`.
     * Otherwise, it is supposed to be used explicitly after the surface is created.
     */
    SetupEnd = "SetupEnd"
}
declare type TPerformanceDetailType = {
    relatedId?: string;
    contextId?: string;
};
interface TSciChartPerformanceMark extends PerformanceMark {
    detail: TPerformanceDetailType;
}
/**
 * @experimental
 * An util used for adding performance checkpoints which can be then used for analyzing the chart performance.
 * The checkpoints are created via the [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
 * @remarks
 * By default it is disabled, to make use of the utils set {@link PerformanceDebugHelper.enableDebug}.
 * Some checkpoints are set implicitly.
 * Custom checkpoints could be set using {@link PerformanceDebugHelper.mark}.
 * To output the results use {@link PerformanceDebugHelper.outputLogs}.
 */
export declare class PerformanceDebugHelper {
    static enableDebug: boolean;
    static mark(type: EPerformanceMarkType | string, options?: {
        relatedId?: string;
        contextId?: string;
    }): TSciChartPerformanceMark;
    static outputLogs(): void;
}
export {};
