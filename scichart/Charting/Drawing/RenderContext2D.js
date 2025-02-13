"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderContext2D = void 0;
/**
 * The RenderContext2D provides methods for drawing to an {@link HTMLCanvasElement | Html5 Canvas}
 * This context class is used in SciChart's High Performance Realtime {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * to draw shapes, lines, fills, images and more
 */
var RenderContext2D = /** @class */ (function () {
    /**
     * Creates an instance of the RenderContext2D
     * @param canvas2D the {@link HTMLCanvasElement} we are drawing to
     */
    function RenderContext2D(canvas2D) {
        this.canvas2D = canvas2D;
        this.ctx2D = canvas2D.getContext("2d");
    }
    /**
     * Draws a rectangle to the specified location and with provided Htmlcolor string
     * @param x the X-location of the rectangle
     * @param y the Y-location of the rectangle
     * @param width the width of the rectangle
     * @param height the height of the rectangle
     * @param htmlColor the Html color code to fill the rectangle
     */
    RenderContext2D.prototype.drawRect = function (x, y, width, height, htmlColor) {
        if (htmlColor === void 0) { htmlColor = "rgba(211,211,211,0.5)"; }
        this.clear();
        this.ctx2D.fillStyle = htmlColor;
        this.ctx2D.fillRect(x, y, width, height);
    };
    /**
     * Draws a circle to the specified location and with provided Htmlcolor string
     * @param x the X-location of the rectangle
     * @param y the Y-location of the rectangle
     * @param radius the radius of the circle
     * @param fillHtmlColor the Html color code to fill the circle
     */
    RenderContext2D.prototype.drawCircle = function (x, y, radius, fillHtmlColor) {
        var strokeWidth = 0;
        var strokeHtmlColor = fillHtmlColor;
        this.clear();
        this.ctx2D.beginPath();
        this.ctx2D.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.ctx2D.fillStyle = fillHtmlColor;
        this.ctx2D.fill();
        this.ctx2D.lineWidth = strokeWidth;
        this.ctx2D.strokeStyle = strokeHtmlColor;
        this.ctx2D.stroke();
    };
    /**
     * Clears the backing canvas element
     */
    RenderContext2D.prototype.clear = function () {
        this.ctx2D.clearRect(0, 0, this.canvas2D.width, this.canvas2D.height);
    };
    return RenderContext2D;
}());
exports.RenderContext2D = RenderContext2D;
