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
exports.RenderContextAnnotationBase = void 0;
var AnnotationBase_1 = require("./AnnotationBase");
var constants_1 = require("./constants");
/**
 * The Base class for an {@link AnnotationBase | Annotation} which draws using SciChart's built-in WebGL2
 * WebAssembly {@link WebGL2RenderingContext | RenderContext}, enabling fast drawing at expense of
 * having lots of customisation like the {@link SvgAnnotationBase} provides.
 */
var RenderContextAnnotationBase = /** @class */ (function (_super) {
    __extends(RenderContextAnnotationBase, _super);
    /**
     * Creates an instance of the RenderContextAnnotationBase
     * @param options optional parameters of type {@link IAnnotationBaseOptions} which configure the annotation at construction time
     */
    function RenderContextAnnotationBase(options) {
        var _this = _super.call(this, options) || this;
        /** @inheritDoc */
        _this.isSvgAnnotation = false;
        return _this;
    }
    Object.defineProperty(RenderContextAnnotationBase.prototype, "parentSurface", {
        /** @inheritDoc */
        get: function () {
            return this.parentSurfaceProperty;
        },
        /** @inheritDoc */
        set: function (parentSurface) {
            if (this.parentSurfaceProperty !== parentSurface) {
                this.parentSurfaceProperty = parentSurface;
                this.notifyPropertyChanged(constants_1.PROPERTY.PARENT_SURFACE);
            }
        },
        enumerable: false,
        configurable: true
    });
    return RenderContextAnnotationBase;
}(AnnotationBase_1.AnnotationBase));
exports.RenderContextAnnotationBase = RenderContextAnnotationBase;
