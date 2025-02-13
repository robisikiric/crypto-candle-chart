"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceDebugHelper = exports.EPerformanceMarkType = void 0;
var guid_1 = require("./guid");
/**
 * Performance debugging checkpoints enum
 */
var EPerformanceMarkType;
(function (EPerformanceMarkType) {
    /**
     * A surface creation start.
     * @remarks used internally
     */
    EPerformanceMarkType["InitializationStart"] = "InitializationStart";
    /**
     * A surface creation end.
     * @remarks used internally
     */
    EPerformanceMarkType["InitializationEnd"] = "InitializationEnd";
    /**
     * WASM engine fetching and initialization start.
     * @remarks used internally.
     */
    EPerformanceMarkType["EngineInitStart"] = "EngineInitStart";
    /**
     * WASM engine fetching and initialization end.
     * @remarks used internally.
     */
    EPerformanceMarkType["EngineInitEnd"] = "EngineInitEnd";
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
    EPerformanceMarkType["LeadingInvalidate"] = "LeadingInvalidate";
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
    EPerformanceMarkType["Invalidate"] = "Invalidate";
    /**
     * DataSeries update start.
     * @description
     * Appending, inserting, removing data in DataSeries.
     * @remarks used internally.
     */
    EPerformanceMarkType["DataUpdateStart"] = "DataUpdateStart";
    /**
     * DataSeries update end.
     * @remarks used internally.
     */
    EPerformanceMarkType["DataUpdateEnd"] = "DataUpdateEnd";
    /**
     * Chart rendering start.
     * @remarks used internally.
     */
    EPerformanceMarkType["RenderStart"] = "RenderStart";
    /**
     * Chart rendering end.
     * @remarks used internally.
     */
    EPerformanceMarkType["RenderEnd"] = "RenderEnd";
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
    EPerformanceMarkType["Rendered"] = "Rendered";
    /**
     * Chart rendered.
     * @description
     * Represents a chart being rendered to a complete state.
     * In this state the surface is NOT invalidated.
     * Next render will happen after invalidation is triggered.
     * @remarks used internally.
     */
    EPerformanceMarkType["FullStateRendered"] = "FullStateRendered";
    /**
     * Chart element resizing.
     * @remarks used internally.
     */
    EPerformanceMarkType["Resize"] = "Resize";
    /**
     * Browser zoom change.
     * @remarks used internally.
     */
    EPerformanceMarkType["DpiChange"] = "DpiChange";
    /**
     * Chart initialization.
     * @remarks
     * used internally in `chartBuilder`.
     * Otherwise, it is supposed to be used explicitly after the surface is created.
     */
    EPerformanceMarkType["SetupStart"] = "SetupStart";
    /**
     * Chart initialization.
     * @remarks
     * used internally in `chartBuilder`.
     * Otherwise, it is supposed to be used explicitly after the surface is created.
     */
    EPerformanceMarkType["SetupEnd"] = "SetupEnd";
})(EPerformanceMarkType = exports.EPerformanceMarkType || (exports.EPerformanceMarkType = {}));
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
var PerformanceDebugHelper = /** @class */ (function () {
    function PerformanceDebugHelper() {
    }
    PerformanceDebugHelper.mark = function (type, options) {
        var _a;
        if (PerformanceDebugHelper.enableDebug) {
            var groupId = (_a = options === null || options === void 0 ? void 0 : options.relatedId) !== null && _a !== void 0 ? _a : (0, guid_1.generateGuid)();
            return performance.mark("".concat(type, "_").concat(groupId), {
                detail: { relatedId: groupId, contextId: options === null || options === void 0 ? void 0 : options.contextId }
            });
        }
        return null;
    };
    PerformanceDebugHelper.outputLogs = function () {
        performance.getEntriesByType("mark").forEach(function (entry) {
            console.log(entry.name, entry.startTime);
        });
    };
    PerformanceDebugHelper.enableDebug = false;
    return PerformanceDebugHelper;
}());
exports.PerformanceDebugHelper = PerformanceDebugHelper;
