"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTickCoordinatesProvider = void 0;
var TickCoordinatesProvider_1 = require("./TickCoordinatesProvider");
var DefaultTickCoordinatesProvider = /** @class */ (function (_super) {
    __extends(DefaultTickCoordinatesProvider, _super);
    function DefaultTickCoordinatesProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritDoc
     */
    DefaultTickCoordinatesProvider.prototype.getTickCoordinates = function (majorTicks, minorTicks) {
        if (majorTicks === undefined)
            return {
                majorTickCoords: undefined,
                minorTickCoords: undefined,
                majorTickOverrides: undefined,
                minorTickOverRides: undefined
            };
        var coordinateCalculator = this.parentAxis.getCurrentCoordinateCalculator();
        // Rounding and +0.5 required to have lines on exact pixel boundaries.
        var majorTickCoords = majorTicks.map(function (t) { return Math.round(coordinateCalculator.getCoordinate(t)) + 0.5; });
        var minorTickCoords = minorTicks.map(function (t) { return Math.round(coordinateCalculator.getCoordinate(t)) + 0.5; });
        return { majorTickCoords: majorTickCoords, minorTickCoords: minorTickCoords, majorTickOverrides: majorTicks, minorTickOverRides: minorTicks };
    };
    return DefaultTickCoordinatesProvider;
}(TickCoordinatesProvider_1.TickCoordinatesProvider));
exports.DefaultTickCoordinatesProvider = DefaultTickCoordinatesProvider;
