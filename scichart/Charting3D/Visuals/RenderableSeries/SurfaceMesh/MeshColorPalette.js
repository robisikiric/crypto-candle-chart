"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeshColorPalette = void 0;
var EventHandler_1 = require("../../../../Core/EventHandler");
var PropertyChangedEventArgs_1 = require("../../../../Core/PropertyChangedEventArgs");
/**
 * Provides a base class for color palettes which may be applied to the {@link SurfaceMeshRenderableSeries3D.meshColorPalette} property
 * @remarks See concrete types {@link SolidColorBrushPalette} and {@link GradientColorPalette} for more details.
 */
var MeshColorPalette = /** @class */ (function () {
    /**
     * Creates an instance of a {@link MeshColorPalette}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context}
     * containing native methods and access to our WebGL2 Engine and WebAssembly numerical methods
     */
    function MeshColorPalette(webAssemblyContext) {
        this.webAssemblyContext = webAssemblyContext;
        this.propertyChanged = new EventHandler_1.EventHandler();
    }
    /**
     * Notifies subscribers of {@link propertyChanged}
     * @param propertyName The property name which changed
     */
    MeshColorPalette.prototype.notifyPropertyChanged = function (propertyName) {
        var _a;
        (_a = this.propertyChanged) === null || _a === void 0 ? void 0 : _a.raiseEvent(new PropertyChangedEventArgs_1.PropertyChangedEventArgs(propertyName));
    };
    return MeshColorPalette;
}());
exports.MeshColorPalette = MeshColorPalette;
