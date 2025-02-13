"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMousePosition = void 0;
/**
 * Defines the MousePosition enum constants, used by the {@link CursorModifier} and {@link RolloverModifier}
 */
var EMousePosition;
(function (EMousePosition) {
    /**
     * The mouse position is outside the main canvas
     */
    EMousePosition["OutOfCanvas"] = "OutOfCanvas";
    /**
     * The mouse position is in the Axis area
     */
    EMousePosition["AxisArea"] = "AxisArea";
    /**
     * The mouse position is in the Series area
     */
    EMousePosition["SeriesArea"] = "SeriesArea";
})(EMousePosition = exports.EMousePosition || (exports.EMousePosition = {}));
