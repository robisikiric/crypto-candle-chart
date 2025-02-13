"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradientParams = void 0;
/**
 * A class used to define gradients by a number of gradient stops, with a start and end point
 */
var GradientParams = /** @class */ (function () {
    /**
     * @description Creates gradient brush params.
     * @param startPoint x and y values should be from 0 to 1, 0 - start of the viewRect and 1 - end of the viewRect
     * @param endPoint x and y values should be from 0 to 1
     * @param gradientStops 2 or more gradient stop point with color
     */
    function GradientParams(startPoint, endPoint, gradientStops) {
        this.gradientStops = [];
        if (gradientStops.length < 2) {
            throw Error("At least two gradient point should be provided");
        }
        if (startPoint.x < 0 || startPoint.y < 0 || startPoint.x > 1 || startPoint.y > 1) {
            throw Error("startPoint values should be within [0,1]");
        }
        if (endPoint.x < 0 || endPoint.y < 0 || endPoint.x > 1 || endPoint.y > 1) {
            throw Error("endPoint values should be within [0,1]");
        }
        gradientStops.forEach(function (el) {
            if (el.offset < 0 || el.offset > 1) {
                throw Error("gradientStops offset should be within [0,1]");
            }
        });
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.gradientStops = gradientStops;
    }
    return GradientParams;
}());
exports.GradientParams = GradientParams;
