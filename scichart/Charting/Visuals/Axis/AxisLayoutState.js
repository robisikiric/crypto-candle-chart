"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxisLayoutState = void 0;
/**
 * Properties to describe axis layout state
 */
var AxisLayoutState = /** @class */ (function () {
    function AxisLayoutState() {
        this.axisSize = 0;
        // Additional horizontal size required by axis for correct rendering
        this.additionalLeftSize = 0;
        this.additionalRightSize = 0;
        // Additional vertical size required by axis for correct rendering
        this.additionalTopSize = 0;
        this.additionalBottomSize = 0;
    }
    AxisLayoutState.prototype.clear = function () {
        this.axisSize = 0;
        this.additionalLeftSize = 0;
        this.additionalRightSize = 0;
        this.additionalTopSize = 0;
        this.additionalBottomSize = 0;
    };
    return AxisLayoutState;
}());
exports.AxisLayoutState = AxisLayoutState;
