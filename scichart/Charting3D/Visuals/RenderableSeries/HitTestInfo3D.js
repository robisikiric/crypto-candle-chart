"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HitTestInfo3D = void 0;
/**
 * A non-enriched Hit-Test result (intermediate step) when calling {@link BaseRenderableSeries3D.hitTest}.
 * See {@link SeriesInfo3D} for the enriched result.
 */
var HitTestInfo3D = /** @class */ (function () {
    function HitTestInfo3D(renderableSeries, isEmpty) {
        if (isEmpty === void 0) { isEmpty = false; }
        this.isEmpty = isEmpty;
        this.associatedSeries = renderableSeries;
    }
    /**
     * The default empty {@link HitTestInfo3D} instance
     */
    HitTestInfo3D.empty = function () {
        return new HitTestInfo3D(undefined, true);
    };
    return HitTestInfo3D;
}());
exports.HitTestInfo3D = HitTestInfo3D;
