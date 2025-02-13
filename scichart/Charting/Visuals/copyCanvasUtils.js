"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyToCanvas = void 0;
var logger_1 = require("../../utils/logger");
/** @ignore */
var copyToCanvas = function (sourceCanvas, getDestinationById) { return function (destinationId) {
    logger_1.Logger.debug("copyToCanvas");
    var destination = getDestinationById(destinationId);
    var sciChartSurface = destination === null || destination === void 0 ? void 0 : destination.sciChartSurface;
    var destinationCanvas = destination === null || destination === void 0 ? void 0 : destination.sciChartSurface.domCanvas2D;
    if (destinationCanvas) {
        var destinationCanvasContext = destinationCanvas.getContext("2d");
        destinationCanvasContext.clearRect(0, 0, destinationCanvasContext.canvas.width, destinationCanvasContext.canvas.height);
        destinationCanvasContext.drawImage(sourceCanvas, 0, 0);
        // destinationCanvasContext.drawImage(sourceCanvas,
        //     0, 0,
        //     sourceCanvas.width,
        //     sourceCanvas.height,
        //     0, 0,
        //     destinationCanvas.clientWidth, destinationCanvas.clientHeight);
        sciChartSurface.rendered.raiseEvent(sciChartSurface.isInvalidated);
    }
}; };
exports.copyToCanvas = copyToCanvas;
