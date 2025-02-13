"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeriesInfo3D = void 0;
/**
 * SeriesInfo3D is a data-structure which provides enriched information about a hit-test operation in SciChart 3D.
 * It's derived by calling {@link BaseRenderableSeries3D.hitTest}. There is a class hierachy for {@link SeriesInfo3D} which
 * is a different class depending on series type, e.g. 3D Scatter series has {@link XyzSeriesInfo3D},
 * 3D Surface mesh series has {@link SurfaceMeshSeriesInfo3D} etc.
 */
var SeriesInfo3D = /** @class */ (function () {
    function SeriesInfo3D(series, hitTestInfo) {
        var _a;
        /**
         * When true, the {@link SeriesInfo3D} is empty
         */
        this.isEmpty = false;
        this.renderableSeries = series;
        this.dataSeriesName = (_a = series === null || series === void 0 ? void 0 : series.dataSeries) === null || _a === void 0 ? void 0 : _a.dataSeriesName;
        this.isHit = hitTestInfo.isHit;
        this.hitTestInfo = hitTestInfo;
    }
    /**
     * The default empty {@link HitTestInfo3D} instance
     */
    SeriesInfo3D.empty = function () {
        var si = new SeriesInfo3D(undefined, undefined);
        si.isEmpty = true;
        return si;
    };
    return SeriesInfo3D;
}());
exports.SeriesInfo3D = SeriesInfo3D;
