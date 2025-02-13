"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericAnimation = void 0;
var guid_1 = require("../../utils/guid");
var AnimationFiniteStateMachine_1 = require("./AnimationFiniteStateMachine");
var EasingFunctions_1 = require("./EasingFunctions");
/**
 * @summary Defines Animations that can be applied directly to a {@link SciChartSurface} in SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * When creating the animation, use the options to specify what to update
 */
var GenericAnimation = /** @class */ (function () {
    function GenericAnimation(options) {
        var _a, _b, _c, _d;
        /**
         * The animation delay
         */
        this.delay = 0;
        /**
         * The animation duration
         */
        this.duration = 1000;
        /**
         * Sets the animation easing function
         */
        this.ease = EasingFunctions_1.easing.linear;
        this.id = (_a = options === null || options === void 0 ? void 0 : options.id) !== null && _a !== void 0 ? _a : (0, guid_1.generateGuid)();
        this.delay = (_b = options === null || options === void 0 ? void 0 : options.delay) !== null && _b !== void 0 ? _b : this.delay;
        this.duration = (_c = options === null || options === void 0 ? void 0 : options.duration) !== null && _c !== void 0 ? _c : this.duration;
        if ((options === null || options === void 0 ? void 0 : options.ease) && typeof options.ease === "string") {
            options.ease = EasingFunctions_1.easing[options.ease];
        }
        this.ease = (_d = options === null || options === void 0 ? void 0 : options.ease) !== null && _d !== void 0 ? _d : this.ease;
        this.from = options.from;
        this.to = options.to;
        this.onAnimate = options.onAnimate;
        this.onCompleted = options === null || options === void 0 ? void 0 : options.onCompleted;
        this.animationFSM = new AnimationFiniteStateMachine_1.AnimationFiniteStateMachine(this);
        // Set initial progress now
        if (options === null || options === void 0 ? void 0 : options.setInitialValueImmediately)
            this.onAnimate(this.from, this.to, 0);
    }
    Object.defineProperty(GenericAnimation.prototype, "isComplete", {
        get: function () {
            return this.animationFSM.is([AnimationFiniteStateMachine_1.EAnimationState.Completed]);
        },
        enumerable: false,
        configurable: true
    });
    /** Reset the animation to its initial state.
     * If reset while running or onCompleted, the animation will remain in the list and run again.
     */
    GenericAnimation.prototype.reset = function () {
        this.animationFSM = new AnimationFiniteStateMachine_1.AnimationFiniteStateMachine(this);
    };
    /** Advance the animation according to the time elapsed since the last frame */
    GenericAnimation.prototype.update = function (timeElapsed) {
        var transition = this.animationFSM.update(timeElapsed);
        if ([AnimationFiniteStateMachine_1.EAnimationStateTransition.InitialState_Running, AnimationFiniteStateMachine_1.EAnimationStateTransition.Delayed_Running].includes(transition)) {
            this.onAnimate(this.from, this.to, 0);
        }
        if (this.animationFSM.is([AnimationFiniteStateMachine_1.EAnimationState.Running, AnimationFiniteStateMachine_1.EAnimationState.Completed])) {
            this.onAnimate(this.from, this.to, this.animationFSM.animationProgress);
        }
        if ([AnimationFiniteStateMachine_1.EAnimationStateTransition.Running_Completed, AnimationFiniteStateMachine_1.EAnimationStateTransition.InitialState_Completed].includes(transition)) {
            if (this.onCompleted)
                this.onCompleted();
        }
    };
    /** Cancel the animation.  onCompleted will not be called */
    GenericAnimation.prototype.cancel = function () {
        this.animationFSM.toCompleted();
    };
    return GenericAnimation;
}());
exports.GenericAnimation = GenericAnimation;
