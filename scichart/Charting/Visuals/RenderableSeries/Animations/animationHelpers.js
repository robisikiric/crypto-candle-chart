"use strict";
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.animationHelpers = void 0;
var AnimationFiniteStateMachine_1 = require("../../../../Core/Animations/AnimationFiniteStateMachine");
var PointMarkerType_1 = require("../../../../types/PointMarkerType");
var colorUtil_1 = require("../../../../utils/colorUtil");
var CrossPointMarker_1 = require("../../PointMarkers/CrossPointMarker");
var EllipsePointMarker_1 = require("../../PointMarkers/EllipsePointMarker");
var SpritePointMarker_1 = require("../../PointMarkers/SpritePointMarker");
var SquarePointMarker_1 = require("../../PointMarkers/SquarePointMarker");
var TrianglePointMarker_1 = require("../../PointMarkers/TrianglePointMarker");
var XPointMarker_1 = require("../../PointMarkers/XPointMarker");
/**
 * Checks if can draw, is used not to draw when {@link BaseAnimation} has delay
 * @param animationFSM
 */
var checkCanDraw = function (animationFSM) {
    return animationFSM ? animationFSM.is([AnimationFiniteStateMachine_1.EAnimationState.Running, AnimationFiniteStateMachine_1.EAnimationState.Completed]) : true;
};
/**
 * Checks if the animation is running
 * @param animationQueue The animation queue
 * @param animationFSM The animation finate state machine
 */
var checkIsAnimationRunning = function (animationQueue, animationFSM) {
    if (animationQueue.length > 0) {
        return true;
    }
    if (!animationFSM) {
        return false;
    }
    return !animationFSM.is([AnimationFiniteStateMachine_1.EAnimationState.Completed]);
};
/**
 * Runs update for the animation
 * @param animationFSM
 * @param timeElapsed
 * @param beforeAnimationStart
 * @param afterAnimationComplete
 * @param updateAnimationProperties
 */
var animationUpdate = function (animationFSM, timeElapsed, beforeAnimationStart, afterAnimationComplete, updateAnimationProperties) {
    var transition = animationFSM.update(timeElapsed);
    if (animationFSM.animation.isOnStartAnimation && transition === AnimationFiniteStateMachine_1.EAnimationStateTransition.InitialState_Delayed) {
        beforeAnimationStart();
        updateAnimationProperties(0, animationFSM);
    }
    if (transition === AnimationFiniteStateMachine_1.EAnimationStateTransition.InitialState_Running ||
        (!animationFSM.animation.isOnStartAnimation && transition === AnimationFiniteStateMachine_1.EAnimationStateTransition.Delayed_Running)) {
        beforeAnimationStart();
    }
    if (animationFSM.is([AnimationFiniteStateMachine_1.EAnimationState.Running, AnimationFiniteStateMachine_1.EAnimationState.Completed])) {
        updateAnimationProperties(animationFSM.animationProgress, animationFSM);
    }
    if ([AnimationFiniteStateMachine_1.EAnimationStateTransition.Running_Completed, AnimationFiniteStateMachine_1.EAnimationStateTransition.InitialState_Completed].includes(transition)) {
        if (animationFSM.animation.onCompleted)
            animationFSM.animation.onCompleted();
    }
    if (transition === AnimationFiniteStateMachine_1.EAnimationStateTransition.Running_Completed) {
        afterAnimationComplete();
    }
};
/**
 * Creates the point marker
 * @param wasmContext
 * @param pointMarkerStyle
 */
var createPointMarker = function (wasmContext, pointMarkerStyle) {
    if (!pointMarkerStyle)
        return undefined;
    if (pointMarkerStyle.type === PointMarkerType_1.EPointMarkerType.Sprite) {
        var _a = pointMarkerStyle, type = _a.type, options = __rest(_a, ["type"]);
        return new SpritePointMarker_1.SpritePointMarker(wasmContext, __assign({}, options));
    }
    else {
        var _b = pointMarkerStyle, type = _b.type, options = __rest(_b, ["type"]);
        switch (type) {
            case PointMarkerType_1.EPointMarkerType.Cross:
                return new CrossPointMarker_1.CrossPointMarker(wasmContext, __assign({}, options));
            case PointMarkerType_1.EPointMarkerType.Ellipse:
                return new EllipsePointMarker_1.EllipsePointMarker(wasmContext, __assign({}, options));
            case PointMarkerType_1.EPointMarkerType.X:
                return new XPointMarker_1.XPointMarker(wasmContext, __assign({}, options));
            case PointMarkerType_1.EPointMarkerType.Square:
                return new SquarePointMarker_1.SquarePointMarker(wasmContext, __assign({}, options));
            case PointMarkerType_1.EPointMarkerType.Triangle:
                return new TrianglePointMarker_1.TrianglePointMarker(wasmContext, __assign({}, options));
        }
    }
    return undefined;
};
/**
 * Interpolates numbers
 * @param from
 * @param to
 * @param progress
 */
var interpolateNumber = function (from, to, progress) {
    if (progress < 0)
        return from;
    if (progress > 1)
        return to;
    return from + (to - from) * progress;
};
/**
 * Interpolates colors
 * @param from
 * @param to
 * @param progress
 */
var interpolateColor = function (from, to, progress) {
    if (progress < 0)
        return from;
    if (progress > 1)
        return to;
    return (0, colorUtil_1.uintArgbColorLerp)(from, to, progress);
};
/** @deprecated Use copyDoubleVector instead */
var copyVector = function (sourceVector, targetVector) {
    var size = sourceVector.size();
    targetVector.resize(size, 0);
    for (var i = 0; i < size; i++) {
        targetVector.set(i, sourceVector.get(i));
    }
};
exports.animationHelpers = {
    checkCanDraw: checkCanDraw,
    checkIsAnimationRunning: checkIsAnimationRunning,
    animationUpdate: animationUpdate,
    createPointMarker: createPointMarker,
    interpolateNumber: interpolateNumber,
    interpolateColor: interpolateColor,
    copyVector: copyVector
};
