"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutStrategyAxes = void 0;
/**
 * @ignore
 */
var LayoutStrategyAxes = /** @class */ (function () {
    function LayoutStrategyAxes() {
        this.topInnerAxes = [];
        this.bottomInnerAxes = [];
        this.leftInnerAxes = [];
        this.rightInnerAxes = [];
        this.topOuterAxes = [];
        this.bottomOuterAxes = [];
        this.leftOuterAxes = [];
        this.rightOuterAxes = [];
    }
    LayoutStrategyAxes.prototype.clear = function () {
        this.topInnerAxes = [];
        this.bottomInnerAxes = [];
        this.leftInnerAxes = [];
        this.rightInnerAxes = [];
        this.topOuterAxes = [];
        this.bottomOuterAxes = [];
        this.leftOuterAxes = [];
        this.rightOuterAxes = [];
    };
    return LayoutStrategyAxes;
}());
exports.LayoutStrategyAxes = LayoutStrategyAxes;
