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
exports.ChartModifierBase = exports.EModifierType = void 0;
var DeletableEntity_1 = require("../../Core/DeletableEntity");
var ExecuteOn_1 = require("../../types/ExecuteOn");
var guid_1 = require("../../utils/guid");
var SciChartSurfaceBase_1 = require("../Visuals/SciChartSurfaceBase");
var constants_1 = require("./constants");
var EModifierType;
(function (EModifierType) {
    EModifierType["Chart2DModifier"] = "2D Chart Modifier";
    EModifierType["Chart3DModifier"] = "3D Chart Modifier";
    EModifierType["MultiChart2DModifier"] = "Multiple 2D Chart Modifier";
})(EModifierType = exports.EModifierType || (exports.EModifierType = {}));
/**
 * Defines a base class to a Chart Modifier - a class which provides Zoom, Pan, Tooltip or interaction behavior
 * to SciChart - High Performance Realtime {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 */
var ChartModifierBase = /** @class */ (function (_super) {
    __extends(ChartModifierBase, _super);
    function ChartModifierBase(options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this) || this;
        _this.isEnabledProperty = true;
        _this.executeOnProperty = ExecuteOn_1.EExecuteOn.MouseLeftButton;
        /**
         * Stores info about active pointerdown events
         */
        _this.activePointerEvents = new Map();
        _this.id = (_a = options === null || options === void 0 ? void 0 : options.id) !== null && _a !== void 0 ? _a : (0, guid_1.generateGuid)();
        _this.executeOnProperty = (_b = options === null || options === void 0 ? void 0 : options.executeOn) !== null && _b !== void 0 ? _b : _this.executeOn;
        return _this;
    }
    /** @inheritDoc */
    ChartModifierBase.prototype.applyTheme = function (themeProvider) {
        // TODO: override to apply theme
    };
    Object.defineProperty(ChartModifierBase.prototype, "parentSurface", {
        /** @inheritDoc */
        get: function () {
            return this.parentSurfaceProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartModifierBase.prototype, "isEnabled", {
        /** @inheritDoc */
        get: function () {
            return this.isEnabledProperty;
        },
        /** @inheritDoc */
        set: function (isEnabled) {
            this.isEnabledProperty = isEnabled;
            this.notifyPropertyChanged(constants_1.PROPERTY.IS_ENABLED);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartModifierBase.prototype, "isAttached", {
        /** @inheritDoc */
        get: function () {
            return this.isAttachedProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartModifierBase.prototype, "receiveHandledEvents", {
        /** @inheritDoc */
        get: function () {
            return this.receiveHandledEventsProperty;
        },
        /** @inheritDoc */
        set: function (receiveHandledEvents) {
            this.receiveHandledEventsProperty = receiveHandledEvents;
            this.notifyPropertyChanged(constants_1.PROPERTY.RECEIVE_HANDLED_EVENTS);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartModifierBase.prototype, "executeOn", {
        /** @inheritDoc */
        get: function () {
            return this.executeOnProperty;
        },
        /** @inheritDoc */
        set: function (operationType) {
            this.executeOnProperty = operationType;
            this.notifyPropertyChanged(constants_1.PROPERTY.EXECUTE_ON);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartModifierBase.prototype, "canReceiveMouseEvents", {
        /** @inheritDoc */
        get: function () {
            return this.isEnabled && this.isAttached && this.parentSurfaceProperty !== undefined;
        },
        enumerable: false,
        configurable: true
    });
    /** @inheritDoc */
    ChartModifierBase.prototype.onAttach = function () {
        // Override in derived class to be notified of attached
    };
    /** @inheritDoc */
    ChartModifierBase.prototype.onDetach = function () {
        // Override in derived class to be notified of detached
    };
    /** @inheritDoc */
    ChartModifierBase.prototype.onAttachSeries = function (rs) {
        // Override in derived class to be notified of attached
    };
    /** @inheritDoc */
    ChartModifierBase.prototype.onDetachSeries = function (rs) {
        // Override in derived class to be notified of detached
    };
    /** @inheritDoc */
    ChartModifierBase.prototype.onAttachSubSurface = function (subChart) {
        // Override in derived class to be notified of attached
    };
    /** @inheritDoc */
    ChartModifierBase.prototype.onDetachSubSurface = function (subChart) {
        // Override in derived class to be notified of detached
    };
    /** @inheritDoc */
    ChartModifierBase.prototype.onParentSurfaceRendered = function () {
        // Override in derived class to be notified when render pass is finished
    };
    /** @inheritDoc */
    ChartModifierBase.prototype.modifierMouseDown = function (args) {
        // Override in derived class to be notified of mouse down
        if (this.executeOn === ExecuteOn_1.EExecuteOn.MouseMiddleButton) {
            // Don't scroll browser if middle button is being used for the modifier
            args.nativeEvent.preventDefault();
        }
        var isTouchEvent = args.pointerType === "touch" || args.pointerType === "pen";
        if (isTouchEvent) {
            this.activePointerEvents.set(args.pointerId, args);
        }
    };
    /** @inheritDoc */
    ChartModifierBase.prototype.modifierMouseMove = function (args) {
        this.updatePointerInfo(args);
        // Override in derived class to be notified of mouse move
    };
    /** @inheritDoc */
    ChartModifierBase.prototype.modifierMouseUp = function (args) {
        var isTouchEvent = args.pointerType === "touch" || args.pointerType === "pen";
        if (isTouchEvent) {
            this.activePointerEvents.delete(args.pointerId);
        }
        // Override in derived class to be notified of mouse up
    };
    /** @inheritDoc */
    ChartModifierBase.prototype.modifierMouseWheel = function (args) {
        // Override in derived class to be notified of mouse wheel
    };
    /** @inheritDoc */
    ChartModifierBase.prototype.modifierDoubleClick = function (args) {
        // Override in derived class to be notified of mouse double click
    };
    /** @inheritDoc */
    ChartModifierBase.prototype.modifierMouseEnter = function (args) {
        // Override in derived class to be notified of mouse enter
    };
    /** @inheritDoc */
    ChartModifierBase.prototype.modifierMouseLeave = function (args) {
        this.activePointerEvents.delete(args.pointerId);
        // Override in derived class to be notified of mouse leave
    };
    /** @inheritDoc */
    ChartModifierBase.prototype.modifierDrop = function (args) {
        // Override in derived class to be notified of drop event
    };
    /** @inheritDoc */
    ChartModifierBase.prototype.modifierPointerCancel = function (args) {
        this.activePointerEvents.delete(args.pointerId);
        // Override in derived class to be notified of mouse leave
    };
    /** @inheritDoc */
    ChartModifierBase.prototype.setParentSurface = function (parentSurface) {
        if (!parentSurface) {
            this.parentSurfaceProperty = undefined;
        }
        else {
            if (parentSurface.surfaceType === SciChartSurfaceBase_1.ESurfaceType.SciChartSurfaceType &&
                this.modifierType === EModifierType.Chart3DModifier) {
                throw new Error("A 3D Chart Modifier cannot be added to a 2D SciChartSurface. Please check surfaceType and ModifierType properties for modifierType");
            }
            if (parentSurface.surfaceType === SciChartSurfaceBase_1.ESurfaceType.SciChart3DSurfaceType &&
                this.modifierType === EModifierType.Chart2DModifier) {
                throw new Error("A 2D Chart Modifier cannot be added to a 3D SciChartSurface. Please check surfaceType and ModifierType properties for modifierType");
            }
            this.parentSurfaceProperty = parentSurface;
        }
        this.isAttachedProperty = this.parentSurfaceProperty !== undefined;
        this.notifyPropertyChanged(constants_1.PROPERTY.PARENT_SURFACE);
    };
    /** @inheritDoc */
    ChartModifierBase.prototype.delete = function () {
        // Override in child class
    };
    /**
     * Notifies the parent surface that a property has changed by calling {@link invalidateParentCallback}
     * @param propertyName the property name which has changed
     */
    ChartModifierBase.prototype.notifyPropertyChanged = function (propertyName) {
        if (this.invalidateParentCallback) {
            this.invalidateParentCallback();
        }
    };
    ChartModifierBase.prototype.updatePointerInfo = function (args) {
        var _a;
        // store position of primary pointer
        // activePointerEvents are set on mousedown/mouseup if this is a touch event.  In this case only track the first one
        if (this.activePointerEvents.size === 0 || this.activePointerEvents.keys().next().value === args.pointerId) {
            this.mousePoint = args.mousePoint;
        }
        // get previous coordinates of the current pointer
        this.previousPoint = (_a = this.activePointerEvents.get(args.pointerId)) === null || _a === void 0 ? void 0 : _a.mousePoint;
        // update saved pointer coordinates
        if (this.activePointerEvents.has(args.pointerId)) {
            this.activePointerEvents.set(args.pointerId, args);
        }
    };
    /**
     * Checks if event conditions should trigger the modifier action
     * @param args current event info as {@link ModifierMouseArgs}
     *
     * @remarks Can be used in some of the modifiers to add/override constraints
     */
    ChartModifierBase.prototype.getIsActionAllowed = function (args) {
        return true;
    };
    return ChartModifierBase;
}(DeletableEntity_1.DeletableEntity));
exports.ChartModifierBase = ChartModifierBase;
