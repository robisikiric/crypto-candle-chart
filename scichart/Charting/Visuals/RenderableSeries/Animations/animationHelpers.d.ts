import { AnimationFiniteStateMachine, IAnimation, SeriesAnimationFiniteStateMachine } from "../../../../Core/Animations/AnimationFiniteStateMachine";
import { SCRTDoubleVector, TSciChart } from "../../../../types/TSciChart";
import { CrossPointMarker } from "../../PointMarkers/CrossPointMarker";
import { EllipsePointMarker } from "../../PointMarkers/EllipsePointMarker";
import { SpritePointMarker } from "../../PointMarkers/SpritePointMarker";
import { SquarePointMarker } from "../../PointMarkers/SquarePointMarker";
import { TrianglePointMarker } from "../../PointMarkers/TrianglePointMarker";
import { XPointMarker } from "../../PointMarkers/XPointMarker";
import { BasePointMarkerStyle } from "./BasePointMarkerStyle";
export declare const animationHelpers: {
    checkCanDraw: (animationFSM: AnimationFiniteStateMachine) => boolean;
    checkIsAnimationRunning: (animationQueue: IAnimation[], animationFSM: AnimationFiniteStateMachine) => boolean;
    animationUpdate: (animationFSM: SeriesAnimationFiniteStateMachine, timeElapsed: number, beforeAnimationStart: () => void, afterAnimationComplete: () => void, updateAnimationProperties: (progress: number, animationFSM: SeriesAnimationFiniteStateMachine) => void) => void;
    createPointMarker: (wasmContext: TSciChart, pointMarkerStyle: BasePointMarkerStyle) => EllipsePointMarker | SpritePointMarker | CrossPointMarker | XPointMarker | SquarePointMarker | TrianglePointMarker;
    interpolateNumber: (from: number, to: number, progress: number) => number;
    interpolateColor: (from: number, to: number, progress: number) => number;
    copyVector: (sourceVector: SCRTDoubleVector, targetVector: SCRTDoubleVector) => void;
};
