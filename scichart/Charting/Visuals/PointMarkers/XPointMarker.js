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
exports.XPointMarker = void 0;
var PointMarkerType_1 = require("../../../types/PointMarkerType");
var BasePointMarker_1 = require("./BasePointMarker");
/**
 * @summary Point-marker type which renders an 'x' at each x-y datapoint location
 * @remarks
 * To apply the XPointMarker to a {@link IRenderableSeries}, use the following code:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const wasmContext: TSciChart;
 * sciChartSurface.renderableSeries.add(new FastLineRenderableSeries(wasmContext, {
 *              pointMarker: new XPointMarker(wasmContext, {
 *                  width: 9,
 *                  height: 9,
 *                  fill: "#FF0000",
 *                  stroke: "#0000FF",
 *                  strokeThickness: 1
 *              })
 * }));
 * ```
 */
var XPointMarker = /** @class */ (function (_super) {
    __extends(XPointMarker, _super);
    /**
     * Creates an instance of the {@link XPointMarker}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options Optional parameters of type {@link IPointMarkerOptions} used to configure the point-marker at instantiation time
     */
    function XPointMarker(webAssemblyContext, options) {
        var _this = _super.call(this, webAssemblyContext, options) || this;
        /**
         * @inheritDoc
         */
        _this.type = PointMarkerType_1.EPointMarkerType.X;
        return _this;
    }
    /**
     * @inheritDoc
     */
    XPointMarker.prototype.drawSprite = function (context, spriteWidth, spriteHeight, stroke, strokeThickness, fill) {
        var centerX = context.canvas.width / 2;
        var centerY = context.canvas.height / 2;
        var halfHeight = spriteHeight / 2;
        var halfWidth = spriteWidth / 2;
        var quarterStroke = strokeThickness / 4;
        if (strokeThickness > 0) {
            context.strokeStyle = stroke;
            context.lineWidth = strokeThickness * 1.5; // For some reason 'X' shape appears smaller
            context.beginPath();
            context.moveTo(centerX - halfWidth + quarterStroke, centerY - halfHeight + quarterStroke);
            context.lineTo(centerX + halfWidth - quarterStroke, centerY + halfHeight - quarterStroke);
            context.stroke();
            context.beginPath();
            context.moveTo(centerX + halfWidth - quarterStroke, centerY - halfHeight + quarterStroke);
            context.lineTo(centerX - halfWidth + quarterStroke, centerY + halfHeight - quarterStroke);
            context.stroke();
        }
    };
    return XPointMarker;
}(BasePointMarker_1.BasePointMarker));
exports.XPointMarker = XPointMarker;
