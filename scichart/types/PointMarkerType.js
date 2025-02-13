"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EPointMarkerType = void 0;
/**
 * Enumeration constants to define the type of {@link BasePointMarker}
 */
var EPointMarkerType;
(function (EPointMarkerType) {
    /**
     * The EllipsePointMarker
     */
    EPointMarkerType["Ellipse"] = "Ellipse";
    /**
     * The CrossPointMarker
     */
    EPointMarkerType["Cross"] = "Cross";
    /**
     * The SpritePointMarker
     */
    EPointMarkerType["Sprite"] = "Sprite";
    /**
     * The SquarePointMarker
     */
    EPointMarkerType["Square"] = "Square";
    /**
     * The TrianglePointMarker
     */
    EPointMarkerType["Triangle"] = "Triangle";
    /**
     * The XPointMarker
     */
    EPointMarkerType["X"] = "X";
    /** A user defined custom point marker.  Use customType in the definition to specify the name */
    EPointMarkerType["Custom"] = "Custom";
})(EPointMarkerType = exports.EPointMarkerType || (exports.EPointMarkerType = {}));
