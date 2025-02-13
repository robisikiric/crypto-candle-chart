"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderSurface = void 0;
var app_1 = require("../../constants/app");
var WebGlHelper_1 = require("../../Core/WebGlHelper");
var WebGlRenderContext2D_1 = require("./WebGlRenderContext2D");
/**
 * @ignore
 */
var RenderSurface = /** @class */ (function () {
    function RenderSurface(webAssemblyContext, size, canvasId) {
        this.webAssemblyContext = webAssemblyContext;
        this.viewportSize = size;
        this.canvasId = canvasId;
    }
    RenderSurface.prototype.getRenderContext = function () {
        if (!this.renderContextProperty) {
            this.renderContextProperty = new WebGlRenderContext2D_1.WebGlRenderContext2D(this.webAssemblyContext, this.viewportSize, this.canvasId);
        }
        return this.renderContextProperty;
    };
    // Step_2: Something is changed and it calls invalidateElement
    RenderSurface.prototype.invalidateElement = function (canvasId) {
        var _a;
        if (app_1.IS_TEST_ENV) {
            // Don't try and draw in tests
            return;
        }
        //console.log("Invalidate");
        // Prevent drawing request when WebGL context is lost
        if ((_a = WebGlHelper_1.WebGlHelper.getContext(this.webAssemblyContext.canvas)) === null || _a === void 0 ? void 0 : _a.isContextLost()) {
            return;
        }
        this.webAssemblyContext.TSRRequestCanvasDraw(canvasId);
    };
    // Step_3: TRSEngine call draw
    RenderSurface.prototype.onRenderTimeElapsed = function () {
        this.handleDraw();
        this.renderContextProperty = undefined;
    };
    return RenderSurface;
}());
exports.RenderSurface = RenderSurface;
