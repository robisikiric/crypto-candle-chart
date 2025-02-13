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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifierMouseArgs = void 0;
var Guard_1 = require("../../Core/Guard");
var Point_1 = require("../../Core/Point");
var DpiHelper_1 = require("../Visuals/TextureManager/DpiHelper");
var ModifierArgsBase_1 = require("./ModifierArgsBase");
/**
 * Mouse arguments passed to {@link ChartModifierBase} methods
 */
var ModifierMouseArgs = /** @class */ (function (_super) {
    __extends(ModifierMouseArgs, _super);
    /**
     * Creates an instance of {@link ModifierMouseArgs}
     * @param mousePoint the mouse point as an X,Y location
     * @param options optional parameters to configure the args
     */
    function ModifierMouseArgs(mousePoint, options) {
        var _this = this;
        var _a;
        _this = _super.call(this) || this;
        /**
         * Identifies if the event comes from an active sub chart
         * Useful for SubChartSurfaces with modifierGroups
         * for SciChartSurface returns always True
         */
        _this.isActiveSubChartEvent = true;
        _this.mousePoint = mousePoint;
        _this.button = options === null || options === void 0 ? void 0 : options.button;
        _this.mouseWheelDelta = (_a = options === null || options === void 0 ? void 0 : options.mouseWheelDelta) !== null && _a !== void 0 ? _a : 0;
        _this.pointerId = options === null || options === void 0 ? void 0 : options.pointerId;
        _this.pointerType = options === null || options === void 0 ? void 0 : options.pointerType;
        _this.target = options === null || options === void 0 ? void 0 : options.target;
        _this.isMaster = options === null || options === void 0 ? void 0 : options.isMaster;
        _this.modifierGroup = options === null || options === void 0 ? void 0 : options.modifierGroup;
        _this.shiftKey = options === null || options === void 0 ? void 0 : options.shiftKey;
        _this.altKey = options === null || options === void 0 ? void 0 : options.altKey;
        _this.ctrlKey = options === null || options === void 0 ? void 0 : options.ctrlKey;
        _this.nativeEvent = options === null || options === void 0 ? void 0 : options.nativeEvent;
        return _this;
    }
    /**
     * Creates a {@link ModifierMouseArgs} instance from Javascript {@link MouseEvent}
     * @param mouseEvent the Javascript {@link MouseEvent}
     */
    ModifierMouseArgs.fromMouseEvent = function (mouseEvent) {
        Guard_1.Guard.notNull(mouseEvent, "mouseEvent");
        var mousePoint = new Point_1.Point(mouseEvent.offsetX * DpiHelper_1.DpiHelper.PIXEL_RATIO, mouseEvent.offsetY * DpiHelper_1.DpiHelper.PIXEL_RATIO);
        var options = {
            target: mouseEvent.target,
            isMaster: true,
            shiftKey: mouseEvent.shiftKey,
            ctrlKey: mouseEvent.ctrlKey,
            altKey: mouseEvent.altKey,
            nativeEvent: mouseEvent
        };
        return new ModifierMouseArgs(mousePoint, options);
    };
    /**
     * Creates a {@link ModifierMouseArgs} instance from Javascript {@link WheelEvent}
     * @param wheelEvent the Javascript {@link WheelEvent}
     */
    ModifierMouseArgs.fromWheelEvent = function (wheelEvent) {
        Guard_1.Guard.notNull(wheelEvent, "wheelEvent");
        var mousePoint = new Point_1.Point(wheelEvent.offsetX * DpiHelper_1.DpiHelper.PIXEL_RATIO, wheelEvent.offsetY * DpiHelper_1.DpiHelper.PIXEL_RATIO);
        var options = {
            mouseWheelDelta: wheelEvent.deltaY,
            target: wheelEvent.target,
            isMaster: true,
            shiftKey: wheelEvent.shiftKey,
            ctrlKey: wheelEvent.ctrlKey,
            altKey: wheelEvent.altKey,
            nativeEvent: wheelEvent
        };
        return new ModifierMouseArgs(mousePoint, options);
    };
    /**
     * Creates a {@link ModifierMouseArgs} instance from Javascript {@link PointerEvent}
     * @param pointerEvent the Javascript {@link PointerEvent}
     */
    ModifierMouseArgs.fromPointerEvent = function (pointerEvent) {
        Guard_1.Guard.notNull(pointerEvent, "pointerEvent");
        var mousePoint = new Point_1.Point(pointerEvent.offsetX * DpiHelper_1.DpiHelper.PIXEL_RATIO, pointerEvent.offsetY * DpiHelper_1.DpiHelper.PIXEL_RATIO);
        var options = {
            button: pointerEvent.button,
            pointerId: pointerEvent.pointerId,
            pointerType: pointerEvent.pointerType,
            target: pointerEvent.target,
            isMaster: true,
            shiftKey: pointerEvent.shiftKey,
            ctrlKey: pointerEvent.ctrlKey,
            altKey: pointerEvent.altKey,
            nativeEvent: pointerEvent
        };
        return new ModifierMouseArgs(mousePoint, options);
    };
    /**
     * Copies or clones a {@link ModifierMouseArgs}
     * @param args the {@link ModifierMouseArgs} instance
     * @param modifierGroup the Modifier Group / string ID for sharing mouse events
     * @param masterViewport the master viewport or parent chart issuing mouse events
     * @param slaveViewport the slave viewport or child chart receiving mouse events
     */
    ModifierMouseArgs.copy = function (args, modifierGroup, masterViewport, slaveViewport, masterData) {
        var mousePoint = args.mousePoint;
        if (masterViewport && slaveViewport) {
            var sourceX = args.mousePoint.x - masterViewport.x;
            var sourceY = args.mousePoint.y - masterViewport.y;
            var scaleX = slaveViewport.width / masterViewport.width;
            var scaleY = slaveViewport.height / masterViewport.height;
            mousePoint = new Point_1.Point(slaveViewport.x + sourceX * scaleX, slaveViewport.y + sourceY * scaleY);
        }
        return __assign(__assign({}, args), { isMaster: false, masterData: masterData, handled: false, modifierGroup: modifierGroup, mousePoint: mousePoint });
    };
    ModifierMouseArgs.copyForSubChart = function (args, modifierGroup, masterViewport, slaveViewport, masterData) {
        var mousePoint = args.mousePoint;
        if (masterViewport && slaveViewport) {
            var scaleX = slaveViewport.width / masterViewport.width;
            var scaleY = slaveViewport.height / masterViewport.height;
            mousePoint = new Point_1.Point((args.mousePoint.x - masterViewport.x) * scaleX + slaveViewport.x, (args.mousePoint.y - masterViewport.y) * scaleY + slaveViewport.y);
        }
        return __assign(__assign({}, args), { isMaster: false, masterData: masterData, handled: false, modifierGroup: modifierGroup, mousePoint: mousePoint });
    };
    return ModifierMouseArgs;
}(ModifierArgsBase_1.ModifierArgsBase));
exports.ModifierMouseArgs = ModifierMouseArgs;
