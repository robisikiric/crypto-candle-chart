"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewportManager3DBase = void 0;
var AutoRange_1 = require("../../types/AutoRange");
/**
 * The Viewport Manager performs certain functions such as axis ranging and viewport manipulation
 * on a {@link SciChart3DSurface}
 */
var ViewportManager3DBase = /** @class */ (function () {
    function ViewportManager3DBase(width, height) {
        this.width = width;
        this.height = height;
    }
    ViewportManager3DBase.prototype.setSize = function (width, height) {
        this.width = width;
        this.height = height;
    };
    /**
     * Called when attached to a {@link SciChart3DSurface}
     * @param scs The {@link SciChart3DSurface}
     */
    ViewportManager3DBase.prototype.attachSciChartSurface = function (scs) {
        if (this.isAttached) {
            throw Error("This ViewportManager instance is already attached to a SciChart3DSurface. Detach it before attaching to another");
        }
        this.parentSurface = scs;
        this.isAttached = true;
    };
    /**
     * Called when detached from a {@link SciChart3DSurface}
     */
    ViewportManager3DBase.prototype.detachSciChartSurface = function () {
        this.isAttached = false;
        this.parentSurface = undefined;
    };
    /**
     * Calculates the visibleRange for an {@link AxisBase3D} depending on the current parameters
     * such as {@link AxisCore.autoRange} and data on the axis.
     * @param axis The {@link AxisBase3D} we are calculating for
     * @returns The auto-fitted range
     */
    ViewportManager3DBase.prototype.calculateAutoRange = function (axis) {
        if (axis.autoRange === AutoRange_1.EAutoRange.Always || axis.autoRange === AutoRange_1.EAutoRange.Once) {
            var newRange = axis.getMaximumRange();
            if (newRange && newRange.isDefined) {
                return newRange;
            }
        }
        return axis.visibleRange;
    };
    return ViewportManager3DBase;
}());
exports.ViewportManager3DBase = ViewportManager3DBase;
