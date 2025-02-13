"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TickCoordinatesProvider = void 0;
/**
 * A base class for Tick Coordinate Providers, which convert arrays of major and minor ticks (data values) into pixel coordinates.
 */
var TickCoordinatesProvider = /** @class */ (function () {
    function TickCoordinatesProvider() {
    }
    /**
     * Called when the {@link TickCoordinatesProvider} is attached to an {@link AxisCore | Axis}
     * @param axis The Axis we are attached to.
     */
    TickCoordinatesProvider.prototype.attachedToAxis = function (axis) {
        this.parentAxis = axis;
    };
    /**
     * Called when the {@link TickCoordinatesProvider} is detached from an {@link AxisCore | Axis}
     * @param axis The Axis we are attached to.
     */
    TickCoordinatesProvider.prototype.detachedFromAxis = function () {
        this.parentAxis = undefined;
    };
    return TickCoordinatesProvider;
}());
exports.TickCoordinatesProvider = TickCoordinatesProvider;
