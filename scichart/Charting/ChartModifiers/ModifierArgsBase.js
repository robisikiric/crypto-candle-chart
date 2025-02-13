"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifierArgsBase = void 0;
/**
 * The base class for arguments passed to {@link ChartModifierBase} methods
 */
var ModifierArgsBase = /** @class */ (function () {
    function ModifierArgsBase() {
        /**
         * Gets or sets whether the event is handled
         * @remarks
         * Set handled to true if you want to prevent the event from propagating to subsequent modifiers in the
         * parent {@link SciChartSurfaceBase.chartModifiers} collection
         *
         * If handled is true, the events no longer propagate. To override this behaviour set {@link ChartModifierBase.receiveHandledEvents} to true
         */
        this.handled = false;
    }
    return ModifierArgsBase;
}());
exports.ModifierArgsBase = ModifierArgsBase;
