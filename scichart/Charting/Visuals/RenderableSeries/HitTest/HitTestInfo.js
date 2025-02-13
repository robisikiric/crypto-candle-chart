"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HitTestInfo = void 0;
/**
 * The HitTestInfo class contains properties about the data-point under the mouse when a Hit-Test operation is performed
 */
var HitTestInfo = /** @class */ (function () {
    function HitTestInfo(renderableSeries, isEmpty) {
        if (isEmpty === void 0) { isEmpty = false; }
        this.isEmpty = isEmpty;
        this.associatedSeries = renderableSeries;
    }
    /**
     * The default empty {@link HitTestInfo} instance
     */
    HitTestInfo.empty = function () {
        return new HitTestInfo(undefined, true);
    };
    /**
     * Euclidean distance between the hitTestPoint and the nearest data-point
     */
    HitTestInfo.prototype.getEuclideanDistance = function () {
        var _a, _b;
        var dx = ((_a = this.hitTestPoint) === null || _a === void 0 ? void 0 : _a.x) - this.xCoord;
        var dy = ((_b = this.hitTestPoint) === null || _b === void 0 ? void 0 : _b.y) - this.yCoord;
        return Math.sqrt(dx * dx + dy * dy);
    };
    Object.defineProperty(HitTestInfo.prototype, "distance", {
        /** The distance from the hitTest coordinate to the point */
        get: function () {
            if (this.distanceProperty !== undefined)
                return this.distanceProperty;
            return this.getEuclideanDistance();
        },
        set: function (value) {
            this.distanceProperty = value;
        },
        enumerable: false,
        configurable: true
    });
    return HitTestInfo;
}());
exports.HitTestInfo = HitTestInfo;
