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
exports.TrianglePointMarker = void 0;
var Point_1 = require("../../../Core/Point");
var PointMarkerType_1 = require("../../../types/PointMarkerType");
var BasePointMarker_1 = require("./BasePointMarker");
/**
 * @summary Point-marker type which renders a triangle at each x-y datapoint location
 * @remarks
 * To apply the TrianglePointMarker to a {@link IRenderableSeries}, use the following code:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const wasmContext: TSciChart;
 * sciChartSurface.renderableSeries.add(new FastLineRenderableSeries(wasmContext, {
 *              pointMarker: new TrianglePointMarker(wasmContext, {
 *                  width: 9,
 *                  height: 9,
 *                  fill: "#FF0000",
 *                  stroke: "#0000FF",
 *                  strokeThickness: 1
 *              })
 * }));
 * ```
 */
var TrianglePointMarker = /** @class */ (function (_super) {
    __extends(TrianglePointMarker, _super);
    /**
     * Creates an instance of the {@link TrianglePointMarker}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options Optional parameters of type {@link IPointMarkerOptions} used to configure the point-marker at instantiation time
     */
    function TrianglePointMarker(webAssemblyContext, options) {
        var _this = _super.call(this, webAssemblyContext, options) || this;
        /**
         * @inheritDoc
         */
        _this.type = PointMarkerType_1.EPointMarkerType.Triangle;
        return _this;
    }
    /**
     * @inheritDoc
     */
    TrianglePointMarker.prototype.drawSprite = function (context, spriteWidth, spriteHeight, stroke, strokeThickness, fill) {
        var centerX = context.canvas.width / 2;
        var centerY = context.canvas.height / 2;
        var halfHeight = spriteHeight / 2;
        var halfWidth = spriteWidth / 2;
        var halfStroke = strokeThickness / 2;
        var centerTop = new Point_1.Point(centerX, centerY - halfHeight + halfStroke);
        var rightBottom = new Point_1.Point(centerX + halfWidth - halfStroke, centerY + halfHeight - halfStroke);
        var leftBottom = new Point_1.Point(centerX - halfWidth + halfStroke, centerY + halfHeight - halfStroke);
        context.fillStyle = fill;
        context.beginPath();
        context.moveTo(centerTop.x, centerTop.y);
        context.lineTo(rightBottom.x, rightBottom.y);
        context.lineTo(leftBottom.x, leftBottom.y);
        context.lineTo(centerTop.x, centerTop.y);
        context.closePath();
        context.fill();
        if (strokeThickness > 0) {
            context.strokeStyle = stroke;
            context.lineWidth = strokeThickness;
            context.stroke();
        }
    };
    return TrianglePointMarker;
}(BasePointMarker_1.BasePointMarker));
exports.TrianglePointMarker = TrianglePointMarker;
