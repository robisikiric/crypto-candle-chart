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
exports.SeriesAnimationFiniteStateMachine = exports.AnimationFiniteStateMachine = exports.EAnimationStateTransition = exports.EAnimationState = void 0;
var NumberUtil_1 = require("../NumberUtil");
var EAnimationState;
(function (EAnimationState) {
    EAnimationState["InitialState"] = "InitialState";
    EAnimationState["Delayed"] = "Delayed";
    EAnimationState["Running"] = "Running";
    EAnimationState["Completed"] = "Completed";
})(EAnimationState = exports.EAnimationState || (exports.EAnimationState = {}));
var EAnimationStateTransition;
(function (EAnimationStateTransition) {
    EAnimationStateTransition["NoChange"] = "NoChange";
    EAnimationStateTransition["InitialState_Delayed"] = "InitialState_Delayed";
    EAnimationStateTransition["InitialState_Running"] = "InitialState_Running";
    EAnimationStateTransition["InitialState_Completed"] = "InitialState_Completed";
    EAnimationStateTransition["Delayed_Running"] = "Delayed_Running";
    EAnimationStateTransition["Running_Completed"] = "Running_Completed";
})(EAnimationStateTransition = exports.EAnimationStateTransition || (exports.EAnimationStateTransition = {}));
var AnimationFiniteStateMachine = /** @class */ (function () {
    function AnimationFiniteStateMachine(animation) {
        this.stateProperty = EAnimationState.InitialState;
        this.animationProperty = animation;
    }
    Object.defineProperty(AnimationFiniteStateMachine.prototype, "state", {
        /**
         * Gets the current state
         */
        get: function () {
            return this.stateProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnimationFiniteStateMachine.prototype, "animation", {
        /**
         * Gets the animation property
         */
        get: function () {
            return this.animationProperty;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Checks the current state
     * @param states
     */
    AnimationFiniteStateMachine.prototype.is = function (states) {
        return states.includes(this.stateProperty);
    };
    /**
     * Updates the state
     * @param timeElapsed
     */
    AnimationFiniteStateMachine.prototype.update = function (timeElapsed) {
        if (this.stateProperty === EAnimationState.InitialState) {
            if (this.animationProperty.delay) {
                this.toDelayed();
                return EAnimationStateTransition.InitialState_Delayed;
            }
            if (!this.animationProperty.duration) {
                this.toCompleted();
                return EAnimationStateTransition.InitialState_Completed;
            }
            this.toRunning();
            return EAnimationStateTransition.InitialState_Running;
        }
        if (this.stateProperty === EAnimationState.Delayed) {
            return this.updateDelayedState(timeElapsed);
        }
        if (this.stateProperty === EAnimationState.Running) {
            return this.updateRunningState(timeElapsed);
        }
        return EAnimationStateTransition.NoChange;
    };
    Object.defineProperty(AnimationFiniteStateMachine.prototype, "animationProgress", {
        /**
         * Gets the animation progress, the value from 0 to 1
         */
        get: function () {
            if (this.stateProperty === EAnimationState.Running) {
                var progressionFactor = NumberUtil_1.NumberUtil.constrain(this.animationElapsed / this.animationProperty.duration, 0, 1);
                return this.animationProperty.ease(progressionFactor);
            }
            else if (this.stateProperty === EAnimationState.Completed) {
                return 1;
            }
            else {
                return 0;
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Changes the state to Completed
     */
    AnimationFiniteStateMachine.prototype.toCompleted = function () {
        this.stateProperty = EAnimationState.Completed;
    };
    AnimationFiniteStateMachine.prototype.validate = function (from, to) {
        if (!from.includes(this.stateProperty)) {
            throw Error("Transition from state ".concat(this.stateProperty, " to ").concat(to, " if forbidden"));
        }
    };
    AnimationFiniteStateMachine.prototype.toDelayed = function () {
        this.animationDelayStartTimestamp = Date.now();
        this.animationDelayElapsed = 0;
        this.stateProperty = EAnimationState.Delayed;
    };
    AnimationFiniteStateMachine.prototype.toRunning = function () {
        this.animationStartTimestamp = Date.now();
        this.animationElapsed = 0;
        this.stateProperty = EAnimationState.Running;
    };
    AnimationFiniteStateMachine.prototype.updateDelayedState = function (timeElapsed) {
        this.animationDelayElapsed += timeElapsed;
        if (this.animationDelayElapsed >= this.animationProperty.delay) {
            this.toRunning();
            return EAnimationStateTransition.Delayed_Running;
        }
        return EAnimationStateTransition.NoChange;
    };
    AnimationFiniteStateMachine.prototype.updateRunningState = function (timeElapsed) {
        this.animationElapsed += timeElapsed;
        if (this.animationElapsed >= this.animationProperty.duration) {
            this.toCompleted();
            return EAnimationStateTransition.Running_Completed;
        }
        return EAnimationStateTransition.NoChange;
    };
    return AnimationFiniteStateMachine;
}());
exports.AnimationFiniteStateMachine = AnimationFiniteStateMachine;
// tslint:disable-next-line: max-classes-per-file
var SeriesAnimationFiniteStateMachine = /** @class */ (function (_super) {
    __extends(SeriesAnimationFiniteStateMachine, _super);
    function SeriesAnimationFiniteStateMachine(animation, renderableSeries) {
        var _this = _super.call(this, animation) || this;
        if (renderableSeries) {
            _this.initialStylesProperty = animation.getSeriesStyle(renderableSeries);
        }
        return _this;
    }
    Object.defineProperty(SeriesAnimationFiniteStateMachine.prototype, "animation", {
        /**
         * Gets the animation property
         */
        get: function () {
            return this.animationProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SeriesAnimationFiniteStateMachine.prototype, "initialStyles", {
        /**
         * Gets the initial styles for the animation
         */
        get: function () {
            return this.initialStylesProperty;
        },
        enumerable: false,
        configurable: true
    });
    return SeriesAnimationFiniteStateMachine;
}(AnimationFiniteStateMachine));
exports.SeriesAnimationFiniteStateMachine = SeriesAnimationFiniteStateMachine;
