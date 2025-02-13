"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TickProvider = void 0;
/**
 * @summary The TickProvider is a base class for calculating ticks (interval between major and minor gridlines, ticks and labels).
 * @description TickProviders are responsible for calculating the interval between major and minor gridlines, ticks and labels.
 *
 * The method {@getMajorTicks} returns an array of major ticks (data-values values where SciChart will place labels and major gridlines).
 * The method {@getMinorTicks} returns an array of minor ticks (data-values values where SciChart will place minor gridlines).
 * The method {@attachedToAxis} is called when the TickProvider is attached to an {@link AxisCore | Axis}.
 *
 * Override these methods to create custom implementations of Tick intervals in SciChart or use our built-in {@link NumericTickProvider}
 * @remarks
 * TickProviders are shared between 2D & 3D Charts.
 * See also {@link NumericTickProvider} for a concrete implementation.
 */
var TickProvider = /** @class */ (function () {
    function TickProvider() {
    }
    /**
     * Called when the TickProvider is attached to an {@link AxisCore | Axis}
     * @param axis
     */
    TickProvider.prototype.attachedToAxis = function (axis) {
        this.parentAxis = axis;
    };
    /**
     * Called when the TickProvider is attached from an {@link AxisCore | Axis}
     * @param axis
     */
    TickProvider.prototype.detachedFromAxis = function () {
        this.parentAxis = undefined;
    };
    return TickProvider;
}());
exports.TickProvider = TickProvider;
