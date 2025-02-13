"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderableSeriesSceneEntityState = void 0;
/**
 * State object for a 3D {@link RenderableSeriesSceneEntity} that contains a set of boolean flags and other state types
 * (e.g. TAxisCubeState) that determine whether underlying graphics resources of the Scene Entity are up-to-date and reflect
 * the current state of its properties and the date it visualizes.
 */
var RenderableSeriesSceneEntityState = /** @class */ (function () {
    function RenderableSeriesSceneEntityState(isInitialStateProperty, isDataSeriesModifiedProperty, isRenderableSeriesPropertyChangedProperty, isAxisCubeStateChangedProperty, axisCubeState) {
        if (isInitialStateProperty === void 0) { isInitialStateProperty = true; }
        if (isDataSeriesModifiedProperty === void 0) { isDataSeriesModifiedProperty = true; }
        if (isRenderableSeriesPropertyChangedProperty === void 0) { isRenderableSeriesPropertyChangedProperty = true; }
        if (isAxisCubeStateChangedProperty === void 0) { isAxisCubeStateChangedProperty = true; }
        if (axisCubeState === void 0) { axisCubeState = {
            xVisibleMin: 0,
            xVisibleMax: 0,
            yVisibleMin: 0,
            yVisibleMax: 0,
            zVisibleMin: 0,
            zVisibleMax: 0,
            xWorldDimension: 0,
            yWorldDimension: 0,
            zWorldDimension: 0
        }; }
        this.isInitialStateProperty = isInitialStateProperty;
        this.isDataSeriesModifiedProperty = isDataSeriesModifiedProperty;
        this.isRenderableSeriesPropertyChangedProperty = isRenderableSeriesPropertyChangedProperty;
        this.isAxisCubeStateChangedProperty = isAxisCubeStateChangedProperty;
        this.axisCubeState = axisCubeState;
    }
    Object.defineProperty(RenderableSeriesSceneEntityState.prototype, "isInitialState", {
        /**
         * Gets whether the Scene Entity is in the initial state, meaning all the underlying resources must be (re-)created.
         */
        get: function () {
            return this.isInitialStateProperty;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Sets whether the Scene Entity is in the initial state, meaning all the underlying resources must be (re-)created.
     */
    RenderableSeriesSceneEntityState.prototype.setInitialState = function () {
        this.isInitialStateProperty = true;
    };
    Object.defineProperty(RenderableSeriesSceneEntityState.prototype, "isDataSeriesModified", {
        /**
         * Gets whether the Data Series has been modified since last update.
         */
        get: function () {
            return this.isDataSeriesModifiedProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderableSeriesSceneEntityState.prototype, "isRenderableSeriesPropertyChanged", {
        /**
         * Gets whether a property of the Renderable Series has been changed since last update.
         */
        get: function () {
            return this.isRenderableSeriesPropertyChangedProperty;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Sets whether a property of the Renderable Series has been changed.
     */
    RenderableSeriesSceneEntityState.prototype.setRenderableSeriesPropertyChanged = function () {
        this.isRenderableSeriesPropertyChangedProperty = true;
    };
    Object.defineProperty(RenderableSeriesSceneEntityState.prototype, "isAxisCubeStateChanged", {
        /**
         * Gets whether an Axis Cube state has been changed since last update.
         */
        get: function () {
            return this.isAxisCubeStateChangedProperty;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Checks if a state of the Renderable Series and a state of other objects in the Render Pass (e.g. Axis Cube)
     * has been changed. Sets corresponding flags, if any.
     * @param rs The Rendrable Series to check
     * @param rpi The current {@link RenderPassInfo3D} to check
     */
    RenderableSeriesSceneEntityState.prototype.validate = function (rs, rpi) {
        this.isDataSeriesModifiedProperty = rs.dataSeries.isModified;
        var fpTolerance = 0.001;
        this.isAxisCubeStateChangedProperty =
            Math.abs(this.axisCubeState.xVisibleMin - rpi.xCalc.visibleMin) > fpTolerance ||
                Math.abs(this.axisCubeState.xVisibleMax - rpi.xCalc.visibleMax) > fpTolerance ||
                Math.abs(this.axisCubeState.yVisibleMin - rpi.yCalc.visibleMin) > fpTolerance ||
                Math.abs(this.axisCubeState.yVisibleMax - rpi.yCalc.visibleMax) > fpTolerance ||
                Math.abs(this.axisCubeState.zVisibleMin - rpi.zCalc.visibleMin) > fpTolerance ||
                Math.abs(this.axisCubeState.zVisibleMax - rpi.zCalc.visibleMax) > fpTolerance ||
                Math.abs(this.axisCubeState.xWorldDimension - rpi.worldDimensions.x) > fpTolerance ||
                Math.abs(this.axisCubeState.yWorldDimension - rpi.worldDimensions.y) > fpTolerance ||
                Math.abs(this.axisCubeState.zWorldDimension - rpi.worldDimensions.z) > fpTolerance;
        return (!this.isInitialState &&
            !this.isDataSeriesModified &&
            !this.isDataSeriesModified &&
            !this.isAxisCubeStateChanged);
    };
    /**
     * Resets all the state changed flags and saves the current state of Rederable Series
     * and state of other objects in the Render Pass (e.g. Axis Cube).
     * @param rs The Rendrable Series, whose state gets save
     * @param rpi The current {@link RenderPassInfo3D}, whose state gets save
     */
    RenderableSeriesSceneEntityState.prototype.reset = function (rs, rpi) {
        // Reset all flags
        this.isInitialStateProperty = false;
        this.isDataSeriesModifiedProperty = false;
        this.isRenderableSeriesPropertyChangedProperty = false;
        this.isAxisCubeStateChangedProperty = false;
        // Update Axis Cube State
        this.axisCubeState = {
            xVisibleMin: rpi.xCalc.visibleMin,
            xVisibleMax: rpi.xCalc.visibleMax,
            yVisibleMin: rpi.yCalc.visibleMin,
            yVisibleMax: rpi.yCalc.visibleMax,
            zVisibleMin: rpi.zCalc.visibleMin,
            zVisibleMax: rpi.zCalc.visibleMax,
            xWorldDimension: rpi.worldDimensions.x,
            yWorldDimension: rpi.worldDimensions.y,
            zWorldDimension: rpi.worldDimensions.z
        };
        // Reset isModified flag of the Data Series
        // TODO: consider a better place for that
        rs.dataSeries.resetModified();
    };
    return RenderableSeriesSceneEntityState;
}());
exports.RenderableSeriesSceneEntityState = RenderableSeriesSceneEntityState;
