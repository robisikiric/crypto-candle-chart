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
exports.EllipsePointMarker = void 0;
var PointMarkerType_1 = require("../../../types/PointMarkerType");
var BasePointMarker_1 = require("./BasePointMarker");
/**
 * @summary Point-marker type which renders an ellipse at each x-y datapoint location
 * @remarks
 * To apply the EllipsePointMarker to a {@link IRenderableSeries}, use the following code:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const wasmContext: TSciChart;
 * sciChartSurface.renderableSeries.add(new FastLineRenderableSeries(wasmContext, {
 *              pointMarker: new EllipsePointMarker(wasmContext, {
 *                  width: 9,
 *                  height: 9,
 *                  fill: "#FF0000",
 *                  stroke: "#0000FF",
 *                  strokeThickness: 1
 *              })
 * }));
 * ```
 */
var EllipsePointMarker = /** @class */ (function (_super) {
    __extends(EllipsePointMarker, _super);
    /**
     * Creates an instance of the {@link EllipsePointMarker}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options Optional parameters of type {@link IPointMarkerOptions} used to configure the point-marker at instantiation time
     */
    function EllipsePointMarker(webAssemblyContext, options) {
        var _this = _super.call(this, webAssemblyContext, options) || this;
        /**
         * @inheritDoc
         */
        _this.type = PointMarkerType_1.EPointMarkerType.Ellipse;
        return _this;
    }
    /**
     * @inheritDoc
     */
    EllipsePointMarker.prototype.drawSprite = function (context, spriteWidth, spriteHeight, stroke, strokeThickness, fill) {
        var centerX = context.canvas.width / 2;
        var centerY = context.canvas.height / 2;
        var halfStroke = strokeThickness / 2;
        var radiusX = spriteWidth / 2 - halfStroke < 0 ? 0 : spriteWidth / 2 - halfStroke;
        var radiusY = spriteHeight / 2 - halfStroke < 0 ? 0 : spriteHeight / 2 - halfStroke;
        context.fillStyle = fill;
        context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI, false);
        context.fill();
        if (strokeThickness > 0) {
            context.strokeStyle = stroke;
            context.lineWidth = strokeThickness;
            context.stroke();
        }
    };
    return EllipsePointMarker;
}(BasePointMarker_1.BasePointMarker));
exports.EllipsePointMarker = EllipsePointMarker;
