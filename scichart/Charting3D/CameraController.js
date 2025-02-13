"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraController = exports.ECameraProjectionMode = void 0;
var EventHandler_1 = require("../Core/EventHandler");
var Guard_1 = require("../Core/Guard");
var PropertyChangedEventArgs_1 = require("../Core/PropertyChangedEventArgs");
var Vector3_1 = require("./Vector3");
var Constants_1 = require("./Visuals/Constants");
/**
 * Defines the Project Mode the {@link CameraController} set on SciChart's
 * {@link https://www.scichart.com/javascript-chart-features | Javascript 3D Chart}
 */
var ECameraProjectionMode;
(function (ECameraProjectionMode) {
    /**
     * The {@link CameraController.projectionMode} is Perspective
     */
    ECameraProjectionMode["Perspective"] = "Perspective";
    /**
     * The {@link CameraController.projectionMode} is Orthogonal
     */
    ECameraProjectionMode["Orthogonal"] = "Orthogonal";
})(ECameraProjectionMode = exports.ECameraProjectionMode || (exports.ECameraProjectionMode = {}));
var CameraController = /** @class */ (function () {
    /**
     * Creates an instance of the {@link CameraController}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context}
     * containing native methods and access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options optional parameters of type {@link ICameraOptions} passed to the constructor
     */
    function CameraController(webAssemblyContext, options) {
        var _a;
        this.aspectRatioProperty = 1.5;
        this.idProperty = "Default";
        this.farClipProperty = 4000;
        this.fieldOfViewProperty = 60;
        this.nearClipProperty = 1;
        this.orbitalPitchProperty = 0;
        this.orbitalYawProperty = 0;
        this.orthoHeightProperty = 400;
        this.orthoWidthProperty = 600;
        this.positionProperty = Vector3_1.Vector3.zero;
        this.projectionModeProperty = ECameraProjectionMode.Perspective;
        this.targetProperty = Vector3_1.Vector3.zero;
        this.webAssemblyContext = webAssemblyContext;
        this.propertyChanged = new EventHandler_1.EventHandler();
        this.resetToDefaults();
        this.position = (options === null || options === void 0 ? void 0 : options.position) || this.position;
        this.target = (options === null || options === void 0 ? void 0 : options.target) || this.target;
        this.id = (options === null || options === void 0 ? void 0 : options.id) || this.id;
        this.debugPositionsProperty = (_a = options === null || options === void 0 ? void 0 : options.debugPositions) !== null && _a !== void 0 ? _a : false;
    }
    Object.defineProperty(CameraController.prototype, "id", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.idProperty;
        },
        /**
         * @inheritDoc
         */
        set: function (value) {
            this.idProperty = value;
            this.notifyPropertyChanged(Constants_1.PROPERTY.CAMERA_ID);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CameraController.prototype, "orthoHeight", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.orthoHeightProperty;
        },
        /**
         * @inheritDoc
         */
        set: function (value) {
            if (this.orthoHeightProperty === value) {
                return;
            }
            this.orthoHeightProperty = value;
            this.notifyPropertyChanged(Constants_1.PROPERTY.CAMERA_ORTHOHEIGHT);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CameraController.prototype, "orthoWidth", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.orthoWidthProperty;
        },
        /**
         * @inheritDoc
         */
        set: function (value) {
            if (this.orthoWidthProperty === value) {
                return;
            }
            this.orthoWidthProperty = value;
            this.notifyPropertyChanged(Constants_1.PROPERTY.CAMERA_ORTHOWIDTH);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CameraController.prototype, "projectionMode", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.projectionModeProperty;
        },
        /**
         * @inheritDoc
         */
        set: function (value) {
            if (this.projectionModeProperty === value) {
                return;
            }
            this.projectionModeProperty = value;
            this.notifyPropertyChanged(Constants_1.PROPERTY.CAMERA_PROJECTIONMODE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CameraController.prototype, "aspectRatio", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.aspectRatioProperty;
        },
        /**
         * @inheritDoc
         */
        set: function (value) {
            if (this.aspectRatioProperty === value) {
                return;
            }
            this.aspectRatioProperty = value;
            this.orthoWidth = this.orthoHeight * this.aspectRatioProperty;
            this.notifyPropertyChanged(Constants_1.PROPERTY.CAMERA_ASPECTRATIO);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CameraController.prototype, "isAttached", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.isAttachedProperty;
        },
        /**
         * @inheritDoc
         */
        set: function (value) {
            this.isAttachedProperty = value;
            this.notifyPropertyChanged(Constants_1.PROPERTY.CAMERA_ISATTACHED);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CameraController.prototype, "radius", {
        /**
         * @inheritDoc
         */
        get: function () {
            var distanceToTarget = this.target.subtract(this.position).length;
            return distanceToTarget;
        },
        /**
         * @inheritDoc
         */
        set: function (value) {
            if (value <= 1.0) {
                value = 1.0;
            }
            if (this.radius === value) {
                return;
            }
            this.position = this.target.subtract(this.forward.scalarMultiply(value));
            this.notifyPropertyChanged(Constants_1.PROPERTY.CAMERA_RADIUS);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CameraController.prototype, "orbitalPitch", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.orbitalPitchProperty;
        },
        /**
         * @inheritDoc
         */
        set: function (value) {
            if (this.orbitalPitchProperty === value) {
                return;
            }
            this.orbitalPitchProperty = value > 90.0 ? 89.9 : value < -90 ? -89.9 : value;
            var forwardTsr = this.webAssemblyContext.Math3D.PitchAndYawToDirection(this.orbitalPitchProperty, this.orbitalYawProperty);
            try {
                var forward = new Vector3_1.Vector3(forwardTsr.x, forwardTsr.y, forwardTsr.z);
                forward = forward.scalarMultiply(this.radius);
                this.position = this.target.subtract(forward);
                this.notifyPropertyChanged(Constants_1.PROPERTY.CAMERA_ORBITALPITCH);
            }
            finally {
                forwardTsr === null || forwardTsr === void 0 ? void 0 : forwardTsr.delete();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CameraController.prototype, "orbitalYaw", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.orbitalYawProperty;
        },
        /**
         * @inheritDoc
         */
        set: function (value) {
            if (this.orbitalYawProperty === value) {
                return;
            }
            this.orbitalYawProperty = value;
            var forwardTsr = this.webAssemblyContext.Math3D.PitchAndYawToDirection(this.orbitalPitchProperty, this.orbitalYawProperty);
            try {
                var forward = new Vector3_1.Vector3(forwardTsr.x, forwardTsr.y, forwardTsr.z);
                forward = forward.scalarMultiply(this.radius);
                this.position = this.target.subtract(forward);
                this.notifyPropertyChanged(Constants_1.PROPERTY.CAMERA_ORBITALYAW);
            }
            finally {
                forwardTsr === null || forwardTsr === void 0 ? void 0 : forwardTsr.delete();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CameraController.prototype, "farClip", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.farClipProperty;
        },
        /**
         * @inheritDoc
         */
        set: function (value) {
            this.farClipProperty = value;
            this.notifyPropertyChanged(Constants_1.PROPERTY.CAMERA_FARCLIP);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CameraController.prototype, "nearClip", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.nearClipProperty;
        },
        /**
         * @inheritDoc
         */
        set: function (value) {
            this.nearClipProperty = value;
            this.notifyPropertyChanged(Constants_1.PROPERTY.CAMERA_NEARCLIP);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CameraController.prototype, "fieldOfView", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.fieldOfViewProperty;
        },
        /**
         * @inheritDoc
         */
        set: function (value) {
            this.fieldOfViewProperty = value;
            this.notifyPropertyChanged(Constants_1.PROPERTY.CAMERA_FIELDOFVIEW);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CameraController.prototype, "upGlobal", {
        /**
         * @inheritDoc
         */
        get: function () {
            return new Vector3_1.Vector3(0, 1, 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CameraController.prototype, "side", {
        /**
         * @inheritDoc
         */
        get: function () {
            var forward = this.forward;
            var up = forward.crossProduct(this.upGlobal).crossProduct(forward);
            var side = up.crossProduct(forward);
            side.normalize();
            return side;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CameraController.prototype, "forward", {
        /**
         * @inheritDoc
         */
        get: function () {
            var forward = this.target.subtract(this.position);
            forward.normalize();
            return forward;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CameraController.prototype, "up", {
        /**
         * @inheritDoc
         */
        get: function () {
            var forward = this.forward;
            var up = forward.crossProduct(this.upGlobal).crossProduct(forward);
            up.normalize();
            return up;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CameraController.prototype, "target", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.targetProperty;
        },
        /**
         * @inheritDoc
         */
        set: function (value) {
            if (this.targetProperty === value) {
                return;
            }
            this.targetProperty = value;
            var forwardTsr;
            var py;
            try {
                forwardTsr = this.forward.toTsrVector3(this.webAssemblyContext);
                py = this.webAssemblyContext.Math3D.DirectionToPitchAndYaw(forwardTsr);
                this.orbitalPitchProperty = py.pitch;
                this.orbitalYawProperty = py.yaw;
                this.notifyPropertyChanged(Constants_1.PROPERTY.CAMERA_TARGET);
            }
            finally {
                forwardTsr === null || forwardTsr === void 0 ? void 0 : forwardTsr.delete();
                py === null || py === void 0 ? void 0 : py.delete();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CameraController.prototype, "position", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.positionProperty;
        },
        /**
         * @inheritDoc
         */
        set: function (value) {
            if (this.positionProperty === value) {
                return;
            }
            this.positionProperty = value;
            var forwardTsr;
            var py;
            try {
                forwardTsr = this.forward.toTsrVector3(this.webAssemblyContext);
                py = this.webAssemblyContext.Math3D.DirectionToPitchAndYaw(forwardTsr);
                this.orbitalPitchProperty = py.pitch;
                this.orbitalYawProperty = py.yaw;
                this.notifyPropertyChanged(Constants_1.PROPERTY.CAMERA_POSITION);
            }
            finally {
                forwardTsr === null || forwardTsr === void 0 ? void 0 : forwardTsr.delete();
                py === null || py === void 0 ? void 0 : py.delete();
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    CameraController.prototype.toOrthogonal = function () {
        if (this.projectionModeProperty === ECameraProjectionMode.Orthogonal) {
            return;
        }
        this.projectionModeProperty = ECameraProjectionMode.Orthogonal;
        this.orthoWidthProperty = this.radius;
        this.orthoHeightProperty = this.orthoWidth / this.aspectRatio;
        this.notifyPropertyChanged(Constants_1.PROPERTY.CAMERA_PROJECTIONMODE);
    };
    /**
     * @inheritDoc
     */
    CameraController.prototype.toPerspective = function () {
        if (this.projectionModeProperty === ECameraProjectionMode.Perspective) {
            return;
        }
        this.projectionModeProperty = ECameraProjectionMode.Perspective;
        this.radius = this.orthoWidth;
        this.notifyPropertyChanged(Constants_1.PROPERTY.CAMERA_PROJECTIONMODE);
    };
    /**
     * @inheritDoc
     */
    CameraController.prototype.resetToDefaults = function () {
        this.positionProperty = new Vector3_1.Vector3(-1000, 1000, -1000);
        this.targetProperty = new Vector3_1.Vector3(0, 0, 0);
        this.fieldOfViewProperty = 60;
        this.nearClipProperty = 1;
        this.farClipProperty = 4000;
        this.projectionModeProperty = ECameraProjectionMode.Perspective;
        this.aspectRatioProperty = 1.5;
        this.orthoWidthProperty = 600;
        this.orthoHeightProperty = 400;
        var forwardTsr;
        var orbitalPitchYaw;
        try {
            forwardTsr = this.forward.toTsrVector3(this.webAssemblyContext);
            orbitalPitchYaw = this.webAssemblyContext.Math3D.DirectionToPitchAndYaw(forwardTsr);
            this.orbitalPitch = orbitalPitchYaw.pitch;
            this.orbitalYaw = orbitalPitchYaw.yaw;
        }
        finally {
            orbitalPitchYaw === null || orbitalPitchYaw === void 0 ? void 0 : orbitalPitchYaw.delete();
            forwardTsr === null || forwardTsr === void 0 ? void 0 : forwardTsr.delete();
        }
    };
    /**
     * @inheritDoc
     */
    CameraController.prototype.updateEngineCamera = function (tsrCamera) {
        Guard_1.Guard.notNull(tsrCamera, "tsrCamera");
        var locTsr;
        var atTsr;
        var upTsr;
        try {
            locTsr = this.position.toTsrVector3(this.webAssemblyContext);
            atTsr = this.target.toTsrVector3(this.webAssemblyContext);
            upTsr = this.up.toTsrVector3(this.webAssemblyContext);
            tsrCamera.SetLoc(locTsr);
            tsrCamera.SetAt(atTsr);
            tsrCamera.SetFarClip(this.farClip);
            tsrCamera.SetNearClip(this.nearClip);
            tsrCamera.SetFovAngle(this.webAssemblyContext.Math3D.DegToRad(this.fieldOfView));
            tsrCamera.SetProjectionMode(this.projectionMode === ECameraProjectionMode.Perspective
                ? this.webAssemblyContext.eTSRCameraProjectionMode.CAMERA_PROJECTIONMODE_PERSPECTIVE
                : this.webAssemblyContext.eTSRCameraProjectionMode.CAMERA_PROJECTIONMODE_ORTHOGONAL);
            tsrCamera.SetOrthoWidth(this.orthoWidth);
            tsrCamera.SetOrthoHeight(this.orthoHeight);
            tsrCamera.SetAspectRatio(this.aspectRatio);
            tsrCamera.SetYaw(this.webAssemblyContext.Math3D.DegToRad(this.orbitalYaw));
            tsrCamera.SetPitch(this.webAssemblyContext.Math3D.DegToRad(this.orbitalPitch));
            tsrCamera.SetUp(upTsr);
        }
        finally {
            locTsr === null || locTsr === void 0 ? void 0 : locTsr.delete();
            atTsr === null || atTsr === void 0 ? void 0 : atTsr.delete();
            upTsr === null || upTsr === void 0 ? void 0 : upTsr.delete();
        }
    };
    /**
     * Notifies subscribers of {@link propertyChanged} that a property has changed and the scene needs updating
     * @param propertyName
     */
    CameraController.prototype.notifyPropertyChanged = function (propertyName) {
        var _a;
        if (this.debugPositionsProperty &&
            (propertyName === Constants_1.PROPERTY.CAMERA_POSITION || propertyName === Constants_1.PROPERTY.CAMERA_TARGET)) {
            console.log("SciChart.js Camera P=".concat(this.position.toString(), ", T=").concat(this.target.toString()));
        }
        (_a = this.propertyChanged) === null || _a === void 0 ? void 0 : _a.raiseEvent(new PropertyChangedEventArgs_1.PropertyChangedEventArgs(propertyName));
    };
    /**
     * @inheritDoc
     */
    CameraController.prototype.debugOutput = function () {
        var debugOutput = [
            "Camera id='".concat(this.id, "': "),
            "  position: ".concat(this.position.toString()),
            "  target: ".concat(this.target.toString()),
            "  pitch: ".concat(this.orbitalPitch.toFixed(2), " degrees"),
            "  yaw: ".concat(this.orbitalYaw.toFixed(2), " degrees"),
            "  up Vector: ".concat(this.up.toString()),
            "  forward Vector: ".concat(this.forward.toString()),
            "  projectionMode: ".concat(this.projectionMode)
        ];
        if (this.projectionMode === ECameraProjectionMode.Orthogonal) {
            debugOutput.push("  orthoWidth: ".concat(this.orthoWidth.toFixed(2)));
            debugOutput.push("  orthoHeight: ".concat(this.orthoHeight.toFixed(2)));
        }
        else {
            debugOutput.push("  radius: ".concat(this.radius.toFixed(2)));
            debugOutput.push("  fieldOfView: ".concat(this.fieldOfView.toFixed(2), " degrees"));
        }
        debugOutput.forEach(function (line) { return console.log(line); });
        return debugOutput;
    };
    return CameraController;
}());
exports.CameraController = CameraController;
