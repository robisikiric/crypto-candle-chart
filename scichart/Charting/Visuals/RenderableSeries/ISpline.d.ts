import { SCRTDoubleVector } from "../../../types/TSciChart";
export interface ISpline {
    /**
     * X spline values
     */
    xSplineValues: SCRTDoubleVector;
    /**
     * Y spline values
     */
    ySplineValues: SCRTDoubleVector;
    /**
     * the interpolationPoints being used for the Spline
     */
    interpolationPoints: number;
    /**
     * it returns true for splines
     */
    isSpline: boolean;
    /**
     * Updates spline values
     */
    updateSplineValues(): void;
    /** Called if the spline cannot be calculated.  By default it falls back to the original data */
    onSplineFailure(): void;
}
