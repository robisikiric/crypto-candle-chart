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
exports.WebGlRenderContext2D = exports.ELineDrawMode = exports.calculateAbsoluteRenderLayer = void 0;
var app_1 = require("../../constants/app");
var Guard_1 = require("../../Core/Guard");
var parseColor_1 = require("../../utils/parseColor");
var createNativeRect_1 = require("../Visuals/Helpers/createNativeRect");
var NativeObject_1 = require("../Visuals/Helpers/NativeObject");
var WebGlBrush_1 = require("./WebGlBrush");
var WebGlPen_1 = require("./WebGlPen");
var DeletableEntity_1 = require("../../Core/DeletableEntity");
/**
 *
 * @param step specifies the capacity of layers that could be potentially added between the default chart layers
 * @param offset layer z-order offset of the surface
 * @param relativeRenderLayer layer number relative to the specific surface layers
 * @returns absolute order of the layer on the chart (considering parent chart and previous subChart surface layers)
 */
var calculateAbsoluteRenderLayer = function (offset, step, relativeRenderLayer) {
    return offset + relativeRenderLayer * step;
};
exports.calculateAbsoluteRenderLayer = calculateAbsoluteRenderLayer;
/**
 * Defines enumeration constants for Line Drawing modes
 */
var ELineDrawMode;
(function (ELineDrawMode) {
    /**
     * Points provided define a poly-line (continuous line)
     */
    ELineDrawMode[ELineDrawMode["PolyLine"] = 0] = "PolyLine";
    /**
     * Points provided define discontinuous lines, e.g. x1y1 x2y2  is one line, x3y3 x4y4 is the next
     */
    ELineDrawMode[ELineDrawMode["DiscontinuousLine"] = 1] = "DiscontinuousLine";
})(ELineDrawMode = exports.ELineDrawMode || (exports.ELineDrawMode = {}));
/**
 * The WebGlRenderContext2D provides methods for drawing to a WebGL2 / WebAssembly canvas powered by SciChart's Visual Xccelerator engine.
 * This context class is used in SciChart's High Performance Realtime {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * to draw shapes, lines, fills, images and more
 */
var WebGlRenderContext2D = /** @class */ (function (_super) {
    __extends(WebGlRenderContext2D, _super);
    /**
     * Creates an instance of the WebGlRenderContext2D
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing native methods and access to our WebGL2 Engine
     * @param viewportSize The Viewport {@link Size}
     */
    function WebGlRenderContext2D(webAssemblyContext, viewportSize, canvasId) {
        var _this = _super.call(this) || this;
        _this.layers = {};
        _this.effects = [];
        _this.webAssemblyContext = webAssemblyContext;
        _this.viewportSize = viewportSize;
        _this.canvasId = canvasId;
        return _this;
    }
    /**
     * Get the native {@link SCRTRenderContext} for direct access to SciChart's WebAssembly Visual Xccelerator engine
     */
    WebGlRenderContext2D.prototype.getNativeContext = function () {
        if (!this.nativeContext) {
            this.nativeContext = this.webAssemblyContext.SCRTGetMainRenderContext2D();
        }
        return this.nativeContext;
    };
    /**
     * Draw lines: grid lines, etc.
     * @param vertices
     * @param pen
     * @param lineDrawMode
     * @param left - offset in pixels from left, typically used for axes
     * @param top - offset in pixels from top, typically used for axes
     */
    WebGlRenderContext2D.prototype.drawLinesNative = function (vertices, pen, lineDrawMode, left, top) {
        if (left === void 0) { left = 0; }
        if (top === void 0) { top = 0; }
        var isStrips = lineDrawMode === ELineDrawMode.PolyLine;
        var nativeContext = this.getNativeContext();
        nativeContext.PushMatrix();
        nativeContext.Translate(left, top);
        nativeContext.DrawLinesBatchVec(isStrips, vertices, pen);
        nativeContext.PopMatrix();
    };
    /**
     * Draw rectangles: grid bands, etc.
     * @param vertices
     * @param brush
     * @param left - offset in pixels from left, typically used for axes
     * @param top - offset in pixels from top, typically used for axes
     */
    WebGlRenderContext2D.prototype.drawRects = function (vertices, brush, left, top) {
        if (left === void 0) { left = 0; }
        if (top === void 0) { top = 0; }
        var anchorParams = (0, NativeObject_1.getVector4)(this.webAssemblyContext, 0, 0, 0, 0);
        var nativeContext = this.getNativeContext();
        nativeContext.PushMatrix();
        nativeContext.Translate(left, top);
        nativeContext.DrawRectsBatchVec(vertices, brush, anchorParams);
        nativeContext.PopMatrix();
    };
    /**
     * Enqueues a draw operation to the specified layer. Use in combination with {@link drawLayers} to flush layered draws
     * @param drawFunction the {@link TDrawFunction | Draw Function} to enqueue
     * @param layer the {@link ERenderLayer | Layer} to draw to
     */
    WebGlRenderContext2D.prototype.enqueueLayeredDraw = function (drawFunction, layer) {
        if (!this.layers[layer]) {
            this.layers[layer] = [];
        }
        this.layers[layer].push(drawFunction);
    };
    /**
     * Flushes the {@link layers} which have been enqueued with drawing operations in order.
     * Use this in combination with {@link enqueueLayeredDraw} to draw in layers
     */
    WebGlRenderContext2D.prototype.drawLayers = function () {
        Object.values(this.layers).forEach(function (layerDrawFunctions) {
            layerDrawFunctions.forEach(function (drawFunc) { return drawFunc(); });
        });
    };
    /**
     * Applies a {@link ShaderEffect} to the rendering pipeline. Calling {@link WebGL2RenderingContext.popShaderEffect} pops the effect from the stack
     * reverting to normal drawing
     * @param effect the {@link ShaderEffect} to apply to subsequent draw operations
     */
    WebGlRenderContext2D.prototype.pushShaderEffect = function (effect) {
        if (effect) {
            this.effects.push(effect);
            if (!app_1.IS_TEST_ENV) {
                this.getNativeContext().AddSeriesEffect(effect.getNativeEffect());
            }
        }
    };
    /**
     * Pops a {@link ShaderEffect} from the rendering pipeline. Call {@link WebGL2RenderingContext.pushShaderEffect} to apply an effect
     */
    WebGlRenderContext2D.prototype.popShaderEffect = function () {
        var effect = this.effects.pop();
        if (effect && !app_1.IS_TEST_ENV) {
            this.getNativeContext().RemoveSeriesEffect(effect.getNativeEffect());
        }
    };
    /**
     * @inheritDoc
     */
    WebGlRenderContext2D.prototype.createPen = function (stroke, strokeThickness, strokeDashArray, antiAliased) {
        if (strokeDashArray === void 0) { strokeDashArray = []; }
        if (antiAliased === void 0) { antiAliased = true; }
        throw new Error("Use Pen2DCache for creating pens instead!");
        if (app_1.IS_TEST_ENV || !stroke) {
            return undefined;
        }
        var colorInt = (0, parseColor_1.parseColorToUIntArgb)(stroke);
        if (isNaN(colorInt)) {
            throw new Error("Color code ".concat(stroke, " cannot be converted to an ARGB integer"));
        }
        var strokeDashFloatVector = new this.webAssemblyContext.FloatVector();
        if (strokeDashArray.length) {
            strokeDashArray.forEach(function (item) { return strokeDashFloatVector.push_back(item); });
        }
        return new WebGlPen_1.WebGlPen(this.webAssemblyContext.SCRTCreateDahedPen(colorInt, strokeThickness, antiAliased, strokeDashFloatVector));
    };
    /**
     * @inheritDoc
     */
    WebGlRenderContext2D.prototype.createSolidBrush = function (fill, opacity) {
        throw new Error("Use BrushCache for creating brushes instead!");
        if (app_1.IS_TEST_ENV || !fill) {
            return undefined;
        }
        var colorInt = (0, parseColor_1.parseColorToUIntArgb)(fill, opacity);
        var isTransparent = true;
        if (isNaN(colorInt)) {
            throw new Error("Color code ".concat(fill, " cannot be converted to an ARGB integer"));
        }
        return new WebGlBrush_1.WebGlBrush(new this.webAssemblyContext.SCRTSolidBrush(colorInt, isTransparent));
    };
    /**
     * @inheritDoc
     */
    WebGlRenderContext2D.prototype.delete = function () {
        // Todo: Any cached items delete here
    };
    /**
     * @inheritDoc
     */
    WebGlRenderContext2D.prototype.drawLine = function (x1, y1, x2, y2, pen, viewRect) {
        if (!x1 && !y1 && !x2 && !y2) {
            return;
        }
        // TODO: pass left and top from seriesViewRect
        var left = 0;
        var top = 0;
        Guard_1.Guard.notNull(pen, "pen");
        Guard_1.Guard.isTrue(pen.getPenType() === "WasmPen", "pen must be an instance of WasmPen to be used with the WasmRenderContext");
        var scrtPen = pen.scrtPen;
        Guard_1.Guard.notNull(scrtPen, "WasmPen.scrtPen");
        var isStrips = false;
        var nativeContext = this.getNativeContext();
        var vertices = (0, NativeObject_1.getVectorColorVertex)(this.webAssemblyContext);
        var vertex0 = (0, NativeObject_1.getVertex)(this.webAssemblyContext, x1, y1);
        vertices.push_back(vertex0);
        var vertex1 = (0, NativeObject_1.getVertex)(this.webAssemblyContext, x2, y2);
        vertices.push_back(vertex1);
        nativeContext.PushMatrix();
        nativeContext.PushState();
        nativeContext.Translate(viewRect.x, viewRect.y);
        nativeContext.SetClipRect(viewRect.x, viewRect.y, viewRect.width, viewRect.height);
        nativeContext.DrawLinesBatchVec(isStrips, vertices, scrtPen);
        nativeContext.PopMatrix();
        nativeContext.PopState();
    };
    /**
     * @inheritDoc
     */
    WebGlRenderContext2D.prototype.drawLines = function (xyValues, strokePen, viewRect, lineDrawMode) {
        if (lineDrawMode === void 0) { lineDrawMode = ELineDrawMode.PolyLine; }
        Guard_1.Guard.notNull(strokePen, "pen");
        Guard_1.Guard.notNull(xyValues, "xyValues");
        Guard_1.Guard.isTrue(strokePen.getPenType() === "WasmPen", "pen must be an instance of WasmPen to be used with the WasmRenderContext");
        Guard_1.Guard.isTrue(xyValues.length > 0 && xyValues.length % 2 === 0, "xyValues length must be a multiple of 2, values arranged as x0y0 x1y1 x2y2...");
        var scrtPen = strokePen.scrtPen;
        Guard_1.Guard.notNull(scrtPen, "WebGlPen.scrtPen");
        var isStrips = lineDrawMode === ELineDrawMode.PolyLine;
        var nativeContext = this.getNativeContext();
        var vertices = (0, NativeObject_1.getVectorColorVertex)(this.webAssemblyContext);
        for (var i = 0; i < xyValues.length; i += 2) {
            var vertex = (0, NativeObject_1.getVertex)(this.webAssemblyContext, xyValues[i], xyValues[i + 1]);
            vertex.m_vPosition.z = 0;
            vertices.push_back(vertex);
        }
        nativeContext.PushMatrix();
        nativeContext.PushState();
        nativeContext.Translate(viewRect.x, viewRect.y);
        nativeContext.SetClipRect(viewRect.x, viewRect.y, viewRect.width, viewRect.height);
        nativeContext.DrawLinesBatchVec(isStrips, vertices, scrtPen);
        nativeContext.PopMatrix();
        nativeContext.PopState();
    };
    /**
     * @inheritDoc
     */
    WebGlRenderContext2D.prototype.drawRect = function (rect, viewRect, strokePen, fillBrush) {
        if (fillBrush) {
            var nativeContext = this.getNativeContext();
            var scrtBrush = fillBrush.scrtBrush;
            Guard_1.Guard.notNull(scrtBrush, "WebGlBrush.scrtBrush");
            var vertices = (0, NativeObject_1.getVectorRectVertex)(this.webAssemblyContext);
            var anchorParams = (0, NativeObject_1.getVector4)(this.webAssemblyContext, 0, 0, 0, 0);
            var nativeRect = (0, createNativeRect_1.createNativeRect)(this.webAssemblyContext, rect.x, rect.y, rect.right, rect.bottom);
            vertices.push_back(nativeRect);
            nativeContext.PushMatrix();
            nativeContext.PushState();
            nativeContext.Translate(viewRect.x, viewRect.y);
            nativeContext.SetClipRect(viewRect.x, viewRect.y, viewRect.width, viewRect.height);
            nativeContext.DrawRectsBatchVec(vertices, scrtBrush, anchorParams);
            nativeContext.PopMatrix();
            nativeContext.PopState();
        }
        if (strokePen) {
            this.drawLines([
                rect.right,
                rect.top,
                rect.right,
                rect.bottom,
                rect.left,
                rect.bottom,
                rect.left,
                rect.top,
                rect.right,
                rect.top
            ], strokePen, viewRect, ELineDrawMode.PolyLine);
        }
    };
    WebGlRenderContext2D.prototype.printBlendMode = function () {
        var blendMode = this.getNativeContext().GetBlendMode();
        switch (blendMode) {
            case this.webAssemblyContext.eSCRTBlendMode.BlendDefault:
                console.log("BlendDefault");
                break;
            case this.webAssemblyContext.eSCRTBlendMode.BlendAdditiveOneAlpha:
                console.log("BlendAdditiveOneAlpha");
                break;
            case this.webAssemblyContext.eSCRTBlendMode.BlendAdditiveColor:
                console.log("BlendAdditiveColor");
                break;
            case this.webAssemblyContext.eSCRTBlendMode.BlendAdditiveAlpha:
                console.log("BlendAdditiveAlpha");
                break;
            case this.webAssemblyContext.eSCRTBlendMode.BlendDisabled:
                console.log("BlendDisabled");
                break;
            default:
                throw new Error("Unhandled blendmode ");
        }
    };
    /**
     * Get a native font.  Fonts are cached and shared within webassembly so there is no need to cache them in JS.
     * Set advanced: true if you are planning to rotate or scale the text.
     * Set drawEarly: true if you are planning to call font.End() early.  Otherwise all native text will be drawn at the end of the render cycle.
     */
    WebGlRenderContext2D.prototype.getFont = function (labelStyle, advanced, drawEarly) {
        var _this = this;
        if (advanced === void 0) { advanced = false; }
        if (drawEarly === void 0) { drawEarly = false; }
        var fontKey = (0, NativeObject_1.getFontKey)(this.webAssemblyContext, labelStyle, advanced, drawEarly);
        var nativeContext = this.getNativeContext();
        var nativeFont = nativeContext.AquireFont(fontKey);
        if (!nativeFont) {
            throw new Error("Could not create font " + fontKey.m_strName);
        }
        else {
            if (!nativeFont.m_isDrawing) {
                nativeFont.Begin();
            }
        }
        var currentFontName = nativeFont.GetFaceName();
        if (currentFontName === "SCRT_Loading") {
            setTimeout(function () { var _a; return _this.webAssemblyContext.TSRRequestCanvasDraw((_a = _this.canvasId) !== null && _a !== void 0 ? _a : "undefinedCanvasId"); }, 100);
        }
        else if (currentFontName !== fontKey.m_strName) {
            // @ts-ignore
            if (!fontKey.warned) {
                console.warn("Font ".concat(fontKey.m_strName, " could not be found on the server and has not been registered. Falling back to Arial.\n                Use await scichartSurface.registerFont if you need to load the font from a remote url"));
                // @ts-ignore
                fontKey.warned = true;
            }
        }
        return nativeFont;
    };
    /** End all fonts, causing text to be drawn */
    WebGlRenderContext2D.prototype.endFonts = function (force) {
        if (force === void 0) { force = false; }
        var nativeContext = this.getNativeContext();
        var keys = (0, NativeObject_1.getAllFontKeys)(this.webAssemblyContext);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var fontKey = keys_1[_i];
            var nativeFont = nativeContext.AquireFont(fontKey);
            if (nativeFont && nativeFont.m_isDrawing) {
                nativeFont.End();
            }
        }
    };
    /**
     * Should store references to all cached WebGlResources {@link ICacheable}
     * Is used to invalidate the resources when the WebGL context is lost.
     */
    WebGlRenderContext2D.webGlResourcesRefs = new Set();
    return WebGlRenderContext2D;
}(DeletableEntity_1.DeletableEntity));
exports.WebGlRenderContext2D = WebGlRenderContext2D;
