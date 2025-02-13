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
exports.StaticTickCoordinatesProvider = void 0;
var DefaultTickCoordinatesProvider_1 = require("./DefaultTickCoordinatesProvider");
var StaticTickCoordinatesProvider = /** @class */ (function (_super) {
    __extends(StaticTickCoordinatesProvider, _super);
    function StaticTickCoordinatesProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritDoc
     */
    StaticTickCoordinatesProvider.prototype.getTickCoordinates = function (majorTicks, minorTicks) {
        var visibleRangeChanged = !this.parentAxis.visibleRange.equals(this.prevRange);
        var axisSizeChanged = this.parentAxis.getAxisSize() !== this.prevSize;
        var coordinateCalculator = this.parentAxis.getCurrentCoordinateCalculator();
        var majorTickOverrides;
        var minorTickOverRides;
        if (this.tickCoords === undefined || axisSizeChanged) {
            if (majorTicks === undefined) {
                return {
                    majorTickCoords: undefined,
                    minorTickCoords: undefined,
                    majorTickOverrides: undefined,
                    minorTickOverRides: undefined
                };
            }
            var majorTickCoords = majorTicks.map(function (t) { return coordinateCalculator.getCoordinate(t); });
            var minorTickCoords = minorTicks.map(function (t) { return coordinateCalculator.getCoordinate(t); });
            this.tickCoords = { majorTickCoords: majorTickCoords, minorTickCoords: minorTickCoords, majorTicks: majorTicks, minorTicks: minorTicks, majorTickLabels: undefined };
        }
        else if (visibleRangeChanged) {
            this.OverrideTickValues(this.tickCoords);
            (majorTickOverrides = this.tickCoords.majorTicks), (minorTickOverRides = this.tickCoords.minorTicks);
        }
        else {
            this.OverrideTickCoordinates(this.tickCoords);
        }
        this.prevRange = this.parentAxis.visibleRange;
        this.prevSize = this.parentAxis.getAxisSize();
        //console.log(this.tickCoords.majorTickCoords, this.tickCoords.majorTicks);
        return {
            majorTickCoords: this.tickCoords.majorTickCoords.map(function (t) { return Math.round(t + 0.5); }),
            minorTickCoords: this.tickCoords.minorTickCoords.map(function (t) { return Math.round(t + 0.5); }),
            majorTickOverrides: majorTickOverrides,
            minorTickOverRides: minorTickOverRides
        };
    };
    /** Update the static tick positions to correspond with the current calculated tick values */
    StaticTickCoordinatesProvider.prototype.forceRecalculateCoords = function () {
        this.tickCoords = undefined;
    };
    StaticTickCoordinatesProvider.prototype.OverrideTickValues = function (tickCoords) {
        var coordinateCalculator = this.parentAxis.getCurrentCoordinateCalculator();
        if (coordinateCalculator != null) {
            tickCoords.minorTickCoords.forEach(function (t, i) { return (tickCoords.minorTicks[i] = coordinateCalculator.getDataValue(t)); });
            tickCoords.majorTickCoords.forEach(function (t, i) { return (tickCoords.majorTicks[i] = coordinateCalculator.getDataValue(t)); });
        }
    };
    StaticTickCoordinatesProvider.prototype.OverrideTickCoordinates = function (tickCoords) {
        var coordinateCalculator = this.parentAxis.getCurrentCoordinateCalculator();
        if (coordinateCalculator != null) {
            if (coordinateCalculator != null) {
                tickCoords.minorTicks.forEach(function (t, i) { return (tickCoords.minorTickCoords[i] = coordinateCalculator.getCoordinate(t)); });
                tickCoords.majorTicks.forEach(function (t, i) { return (tickCoords.majorTickCoords[i] = coordinateCalculator.getCoordinate(t)); });
            }
        }
    };
    return StaticTickCoordinatesProvider;
}(DefaultTickCoordinatesProvider_1.DefaultTickCoordinatesProvider));
exports.StaticTickCoordinatesProvider = StaticTickCoordinatesProvider;
