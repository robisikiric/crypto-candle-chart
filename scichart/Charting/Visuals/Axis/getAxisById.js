"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAxis3dById = exports.getAxisById = void 0;
var Guard_1 = require("../../../Core/Guard");
function getAxisById(axes, axisId) {
    return getAxisGeneric(axes, axisId);
}
exports.getAxisById = getAxisById;
function getAxis3dById(axes, axisId) {
    return getAxisGeneric(axes, axisId);
}
exports.getAxis3dById = getAxis3dById;
function getAxisGeneric(axes, axisId) {
    Guard_1.Guard.notNull(axes, "axes");
    for (var i = 0; i < axes.size(); i++) {
        var axis = axes.get(i);
        if (axis.id === axisId) {
            return axis;
        }
    }
    console.warn("scichart getAxisGeneric(): Axis with Id '".concat(axisId, "' was not found"));
    return undefined;
}
