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
exports.PointerEventsMediatorModifier = void 0;
var classFactory_1 = require("../../Builder/classFactory");
var ChartModifierBase2D_1 = require("../../Charting/ChartModifiers/ChartModifierBase2D");
var EventHandler_1 = require("../../Core/EventHandler");
var BaseType_1 = require("../../types/BaseType");
var HoverMode_1 = require("../../types/HoverMode");
var MousePosition_1 = require("../../types/MousePosition");
var translate_1 = require("../../utils/translate");
var PointerEventsMediatorModifier = /** @class */ (function (_super) {
    __extends(PointerEventsMediatorModifier, _super);
    function PointerEventsMediatorModifier(options) {
        var _this = this;
        var _a, _b, _c, _d;
        _this = _super.call(this, options) || this;
        _this.notifyOutEvent = true;
        _this.notifyPositionUpdate = false;
        _this.hoverChanged = new EventHandler_1.EventHandler();
        _this.previousHoveredEntities = [];
        _this.mousePosition = MousePosition_1.EMousePosition.OutOfCanvas;
        _this.enableHoverProperty = false;
        _this.hoverModeProperty = HoverMode_1.EHoverMode.AbsoluteTopmost;
        _this.enableHoverProperty = (_a = options === null || options === void 0 ? void 0 : options.enableHover) !== null && _a !== void 0 ? _a : _this.enableHoverProperty;
        _this.hoverModeProperty = (_b = options === null || options === void 0 ? void 0 : options.hoverMode) !== null && _b !== void 0 ? _b : _this.hoverModeProperty;
        _this.notifyOutEvent = (_c = options === null || options === void 0 ? void 0 : options.notifyOutEvent) !== null && _c !== void 0 ? _c : _this.notifyOutEvent;
        _this.notifyPositionUpdate = (_d = options === null || options === void 0 ? void 0 : options.notifyPositionUpdate) !== null && _d !== void 0 ? _d : _this.notifyPositionUpdate;
        if (options === null || options === void 0 ? void 0 : options.onHover) {
            if (typeof options.onHover === "string") {
                _this.typeMap.set("onHover", options.onHover);
                options.onHover = (0, classFactory_1.getFunction)(BaseType_1.EBaseType.OptionFunction, options.onHover);
            }
            _this.hoverChanged.subscribe(options === null || options === void 0 ? void 0 : options.onHover);
        }
        if (options === null || options === void 0 ? void 0 : options.targets) {
            if (Array.isArray(options.targets) && typeof options.targets[0] !== "string") {
                // Treat as array of refs
                _this.targets = options.targets;
            }
            else if (Array.isArray(options.targets) && typeof options.targets[0] === "string") {
                // Treat as array of ids
                var targetIds = options.targets;
                _this.includeList = new Map(targetIds.map(function (id) { return [id, true]; }));
                _this.targetsSelector = function () { return _this.getAllTargets().filter(function (entity) { return _this.includeList.get(entity.id); }); };
            }
            else if (typeof options.targets === "string") {
                _this.typeMap.set("targetsSelector", options.targets);
                options.targets = (0, classFactory_1.getFunction)(BaseType_1.EBaseType.OptionFunction, options.targets);
                _this.targetsSelector = options.targets;
            }
            else {
                _this.targetsSelector = options.targets;
            }
        }
        return _this;
    }
    Object.defineProperty(PointerEventsMediatorModifier.prototype, "hoverMode", {
        /**
         * The mode defining the rules for detecting a hover event
         */
        get: function () {
            return this.hoverModeProperty;
        },
        /**
         * The mode defining the rules for detecting a hover event
         */
        set: function (value) {
            this.hoverModeProperty = value;
        },
        enumerable: false,
        configurable: true
    });
    PointerEventsMediatorModifier.prototype.toJSON = function () {
        var _a;
        var inheritedOptions = _super.prototype.toJSON.call(this).options;
        var ownOptions = {
            hoverMode: this.hoverMode,
            enableHover: this.enableHoverProperty,
            notifyOutEvent: this.notifyOutEvent,
            notifyPositionUpdate: this.notifyPositionUpdate,
            onHover: this.typeMap.get("onHover"),
            targets: this.includeList
                ? Array.from(this.includeList)
                    .filter(function (_a) {
                    var _ = _a[0], value = _a[1];
                    return value;
                })
                    .map(function (_a) {
                    var key = _a[0];
                    return key;
                })
                : this.typeMap.get("targetsSelector") || ((_a = this.targets) === null || _a === void 0 ? void 0 : _a.map(function (_a) {
                    var id = _a.id;
                    return id;
                }))
        };
        return {
            type: this.type,
            options: __assign(__assign({}, inheritedOptions), ownOptions)
        };
    };
    /**
     * @inheritDoc
     */
    PointerEventsMediatorModifier.prototype.modifierMouseMove = function (args) {
        // If this is on a subchart, only respond to events from the active subchart
        if (this.parentSurface.isSubSurface && !args.isActiveSubChartEvent)
            return;
        this.activePointerEvents.set(args.pointerId, args);
        _super.prototype.modifierMouseMove.call(this, args);
        var translatedMousePoint;
        if (!this.mousePoint) {
            this.mousePosition = MousePosition_1.EMousePosition.OutOfCanvas;
            return;
        }
        else {
            translatedMousePoint = (0, translate_1.translateFromCanvasToSeriesViewRect)(this.mousePoint, this.parentSurface.seriesViewRect);
            if (!translatedMousePoint) {
                this.mousePosition = MousePosition_1.EMousePosition.AxisArea;
            }
            else {
                this.mousePosition = MousePosition_1.EMousePosition.SeriesArea;
            }
        }
        var isActionAllowed = this.getIsActionAllowed(args);
        if (isActionAllowed) {
            if (this.enableHoverProperty) {
                this.performHoverAction(args);
            }
        }
    };
    /**
     * @inheritDoc
     */
    PointerEventsMediatorModifier.prototype.modifierMouseLeave = function (args) {
        _super.prototype.modifierMouseLeave.call(this, args);
        this.mousePosition = MousePosition_1.EMousePosition.OutOfCanvas;
        if (this.enableHoverProperty) {
            // TODO extract into a method
            var includedTargets = this.getIncludedTargets();
            var size = includedTargets.length;
            var currentTarget = null;
            var isHovered = false;
            for (var i = size - 1; i > -1; --i) {
                currentTarget = includedTargets[i];
                this.performHoverOnEntity(currentTarget, args, isHovered);
            }
            var shouldNotifyUnhover = this.previousHoveredEntities.length > 0;
            if (shouldNotifyUnhover) {
                this.hoverChanged.raiseEvent({
                    sender: this,
                    mouseArgs: args,
                    hoveredEntities: [],
                    includedEntities: includedTargets,
                    unhoveredEntities: this.previousHoveredEntities,
                    previousHoveredEntities: this.previousHoveredEntities
                });
            }
            this.previousHoveredEntities = [];
        }
    };
    /** @inheritDoc */
    PointerEventsMediatorModifier.prototype.modifierPointerCancel = function (args) {
        this.modifierMouseLeave(args);
    };
    PointerEventsMediatorModifier.prototype.getIncludedTargets = function () {
        var _a, _b, _c;
        return (_c = (_a = this.targets) !== null && _a !== void 0 ? _a : (_b = this.targetsSelector) === null || _b === void 0 ? void 0 : _b.call(this, this)) !== null && _c !== void 0 ? _c : this.getAllTargets();
    };
    PointerEventsMediatorModifier.prototype.performHoverAction = function (args) {
        var _this = this;
        var includedEntities = this.getIncludedTargets();
        var currentlyHoveredEntities = [];
        var unhoveredEntities = [];
        if (this.hoverMode === HoverMode_1.EHoverMode.TopmostIncluded) {
            var size = includedEntities.length;
            for (var i = size - 1; i > -1; --i) {
                var currentTarget = includedEntities[i];
                var isHovered = currentTarget.checkIsWithinBounds(args);
                if (isHovered) {
                    currentlyHoveredEntities.push(currentTarget);
                    this.performHoverOnEntity(currentTarget, args, isHovered);
                    break;
                }
            }
            // reset hover state
            this.previousHoveredEntities.forEach(function (target) {
                if (target !== currentlyHoveredEntities[0]) {
                    unhoveredEntities.push(target);
                    _this.performHoverOnEntity(target, args, false);
                }
            });
        }
        else if (this.hoverMode === HoverMode_1.EHoverMode.AbsoluteTopmost) {
            var allTargets = this.getAllTargets();
            var size = allTargets.length;
            var _loop_1 = function (i) {
                var currentTarget = allTargets[i];
                var isHovered = currentTarget.checkIsWithinBounds(args);
                if (isHovered) {
                    var isIncluded = includedEntities.find(function (entity) { return entity === currentTarget; });
                    if (isIncluded) {
                        currentlyHoveredEntities.push(currentTarget);
                        this_1.performHoverOnEntity(currentTarget, args, isHovered);
                    }
                    return "break";
                }
            };
            var this_1 = this;
            for (var i = size - 1; i > -1; --i) {
                var state_1 = _loop_1(i);
                if (state_1 === "break")
                    break;
            }
            // reset hover state
            this.previousHoveredEntities.forEach(function (target) {
                if (target !== currentlyHoveredEntities[0]) {
                    unhoveredEntities.push(target);
                    _this.performHoverOnEntity(target, args, false);
                }
            });
        }
        else if (this.hoverMode === HoverMode_1.EHoverMode.Multi) {
            var size = includedEntities.length;
            for (var i = size - 1; i > -1; --i) {
                var currentTarget = includedEntities[i];
                var isHovered = currentTarget.checkIsWithinBounds(args);
                var wasHovered = currentTarget.isHovered;
                if (isHovered) {
                    currentlyHoveredEntities.push(currentTarget);
                    this.performHoverOnEntity(currentTarget, args, isHovered);
                }
                else if (wasHovered) {
                    unhoveredEntities.push(currentTarget);
                    // reset hover state if was hovered
                    this.performHoverOnEntity(currentTarget, args, isHovered);
                }
            }
        }
        var shouldNotifyHover = currentlyHoveredEntities.length > this.previousHoveredEntities.length ||
            (unhoveredEntities.length && currentlyHoveredEntities.length === this.previousHoveredEntities.length);
        var shouldNotifyUnhover = this.notifyOutEvent && unhoveredEntities.length;
        // mouse moved
        var shouldNotifyPositionUpdate = this.notifyPositionUpdate && currentlyHoveredEntities.length;
        // execute callback only if any of entities were/are hovered
        if (shouldNotifyHover || shouldNotifyPositionUpdate || shouldNotifyUnhover) {
            this.hoverChanged.raiseEvent({
                sender: this,
                mouseArgs: args,
                hoveredEntities: currentlyHoveredEntities,
                previousHoveredEntities: this.previousHoveredEntities,
                includedEntities: includedEntities,
                unhoveredEntities: unhoveredEntities
            });
        }
        this.previousHoveredEntities = currentlyHoveredEntities;
    };
    PointerEventsMediatorModifier.prototype.performHoverOnEntity = function (target, args, isHovered) {
        target.hover({
            args: args,
            isHovered: isHovered,
            notifyOutEvent: this.notifyOutEvent,
            notifyPositionUpdate: this.notifyPositionUpdate
        });
    };
    return PointerEventsMediatorModifier;
}(ChartModifierBase2D_1.ChartModifierBase2D));
exports.PointerEventsMediatorModifier = PointerEventsMediatorModifier;
